# MAKE IT A GIFT (dark, animated edition)

Open `index.html` in a browser, or host the folder on any static host. No build step.

## Files
- `index.html`: page shell (header, footer, modal roots) and script/style tags
- `css/base.css`: layout, buttons, forms, editor, gallery
- `css/gift-themes.css`: the six gift themes and the recipient page
- `css/dark.css`: the dark colour layer (gifts, envelopes and polaroids stay paper)
- `css/animations.css`: all motion styles
- `js/core.js`: helpers and SVG art
- `js/data.js`: occasions, themes, templates, sample messages
- `js/model.js`: gift data model and sanitising
- `js/render.js`: theme decorations and the gift renderer
- `js/viewer.js`: envelope opening, typed-in reveal, soft music
- `js/storage.js`: local saving, link encoding
- `js/ui.js`: toasts, modal, full-screen preview
- `js/pages.js`: home, explore, how it works
- `js/editor.js`: the 5-step editor, success page, My Creations
- `js/app.js`: router, click actions, start-up
- `js/animations.js`: starfield, petals, sparkles, confetti, tilt, parallax, reveals, Motion switch
- `supabase/schema.sql`: optional backend (not connected yet)

Script order in `index.html` matters: the files share one global scope, so load them top to bottom.

## Motion
Starfield and petals, cursor sparkle trail, tap-to-release hearts, confetti when an envelope opens and when a gift is created, tilting template cards, hero parallax, word-by-word headline, scroll reveals. A "Motion" button (bottom right) turns it all off; `prefers-reduced-motion` disables it automatically.

## Sharing today (no backend)
The gift travels inside the link. Photos are not included; use Download as Image. Anyone with the link can read the gift. Links can't be revoked until a backend is added (see schema.sql).
