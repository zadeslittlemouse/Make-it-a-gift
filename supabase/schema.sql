-- MAKE IT A GIFT: optional backend for persistent, revocable links with photos.
-- Run in the Supabase SQL editor. Not wired into index.html yet (see README).
create extension if not exists pgcrypto;

create table gifts (
  id text primary key default encode(gen_random_bytes(9), 'hex'),      -- unguessable public id
  data jsonb not null check (octet_length(data::text) < 60000),          -- text, theme, extras
  photos text[] not null default '{}' check (cardinality(photos) <= 5),   -- storage paths
  delete_token_hash text not null,                                        -- creator proves ownership with a secret token
  owner uuid references auth.users(id) on delete set null,               -- optional sign-in; null for anonymous gifts
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '180 days'
);
alter table gifts enable row level security;
-- No public SELECT policy: gifts cannot be listed. Anyone with the id can fetch ONE gift via the function below.
create policy "owners read their gifts" on gifts for select using (owner = auth.uid());
create policy "owners delete their gifts" on gifts for delete using (owner = auth.uid());

create or replace function get_gift(p_id text) returns jsonb
language sql security definer set search_path = public stable as $$
  select jsonb_build_object('data', data, 'photos', photos) from gifts where id = p_id and expires_at > now() $$;
grant execute on function get_gift(text) to anon, authenticated;

-- Creation goes through an Edge Function (validates size, rate-limits, checks image types) using the service role.
create or replace function create_gift(p_data jsonb, p_photos text[], p_token_hash text) returns text
language plpgsql security definer set search_path = public as $$
declare new_id text;
begin
  insert into gifts (data, photos, delete_token_hash, owner) values (p_data, coalesce(p_photos,'{}'), p_token_hash, auth.uid()) returning id into new_id;
  return new_id;
end $$;
revoke all on function create_gift(jsonb,text[],text) from public, anon, authenticated;
grant execute on function create_gift(jsonb,text[],text) to service_role;

-- Anonymous deletion: the creator keeps the secret token shown once at creation.
create or replace function delete_gift(p_id text, p_token text) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  delete from gifts where id = p_id and delete_token_hash = encode(digest(p_token,'sha256'),'hex');
  return found;
end $$;
grant execute on function delete_gift(text,text) to anon, authenticated;

-- Private bucket for photos; serve them through signed URLs from get_gift's paths.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gift-photos','gift-photos',false, 1048576, array['image/jpeg','image/png','image/webp']) on conflict do nothing;

create or replace function purge_expired() returns void language sql security definer set search_path = public as $$
  delete from gifts where expires_at < now() $$;
revoke all on function purge_expired() from public, anon, authenticated;
-- Schedule purge_expired() daily with pg_cron.
