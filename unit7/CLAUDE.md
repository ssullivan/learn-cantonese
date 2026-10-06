# Unit 7 · Dim Sum 點心

Dishes (steamed, fried and baked, sweet, 粥粉麵飯), 一籠 / 一碟 / 一碗, ordering, 埋單. Grammar point: ordering, 我要 + number + measure + dish. Was unit 1 before the roadmap was renumbered.

## Pages
- `learn.html`, `lessons.js` (`u7-learn`): **the template** for learn pages.
- `trolley.html`, `trolley.js` (`u7-trolley`): Trolley Rush: hear customers' orders (唔該，一籠蝦餃！) and serve the right dishes. **The template** for games. Each level's `labels` sets the picture answers' labels (`'both'`, then `'hanzi'`, then none), dropping them as levels get harder.
- `build.html` (`u7-build`): Build & Say: `Tiles.round` with `say: true`, build an order from tiles, then say it.
- `tones.html`, `say.html`; `sheet.html`, `write.html`: writes 小心米.

## Words
Groups: `basics`, `groups` (steamed, fried...), `measures` (籠 碟, with 碗 borrowed from unit 5), `items` (each dish with its `group` and `measure`), `phrases`, and the derived `portions` (一籠蝦餃), `orderWords`, `orders`. A dish's `measure` must match its picture's dish: 籠 ↔ `steamer()`, 碟 ↔ `plate()`, 碗 ↔ `bowl()`; chicken feet, spare ribs, lo mai gai and beef tripe come in a basket (籠).

## Audio
`beef-ho-fun` has an `ssml` override; the orders read their numbers with `phoneme`.

## Drawings
`steamer`, `plate`, `bowl`, `teapot`, `teacup`, `pineappleBun` from `svg.mjs`. Fried rice is a dome of separate grains (so it can't pass for an omelette); beef tripe is creamy white, not grey.

## Borrowed by later units
`bill` (埋單) and `sweet` (unit 8), `yum-cha` (unit 9), `har-gow` and `lung` (unit 15), `baked` (unit 21).
