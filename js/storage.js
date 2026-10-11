'use strict';
/* storage + link encoding */
/* ---------- storage ---------- */
var KEY='miag:v1',mem=null;
function store(){if(mem)return mem;var d=null;try{d=JSON.parse(localStorage.getItem(KEY))}catch(e){}mem={gifts:(d&&Array.isArray(d.gifts))?d.gifts:[]};return mem}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(mem));return true}catch(e){return false}}
function saveGift(g){
  var s=store(),copy=JSON.parse(JSON.stringify(g));copy.updatedAt=Date.now();
  var i=s.gifts.findIndex(function(x){return x.id===g.id});if(i>-1)s.gifts[i]=copy;else s.gifts.unshift(copy);
  return persist();
}
function findGift(id){return store().gifts.filter(function(g){return g.id===id})[0]}

/* ---------- link encoding (the gift travels inside the link) ---------- */
function b64u(bytes){var s='',i;for(i=0;i<bytes.length;i+=8000)s+=String.fromCharCode.apply(null,bytes.subarray(i,i+8000));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function unb64u(s){s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';var b=atob(s),a=new Uint8Array(b.length),i;for(i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a}
async function pipe(bytes,stream){var w=stream.writable.getWriter();w.write(bytes).catch(function(){});w.close().catch(function(){});return new Uint8Array(await new Response(stream.readable).arrayBuffer())}
function linkData(g){var c=JSON.parse(JSON.stringify(g));delete c.photo;delete c.gallery;delete c.status;delete c.createdAt;delete c.updatedAt;delete c.autoTheme;return c}
async function encodeGift(g){
  var bytes=new TextEncoder().encode(JSON.stringify(linkData(g)));
  if(window.CompressionStream){try{return 'z'+b64u(await pipe(bytes,new CompressionStream('deflate-raw')))}catch(e){}}
  return 'p'+b64u(bytes);
}
async function decodeGift(p){
  var kind=p[0],bytes=unb64u(p.slice(1));
  if(kind==='z'){if(!window.DecompressionStream)throw new Error('unsupported');bytes=await pipe(bytes,new DecompressionStream('deflate-raw'))}
  return sanitize(JSON.parse(new TextDecoder().decode(bytes)));
}
function baseURL(){return location.href.split('#')[0]}
