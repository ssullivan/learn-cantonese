# Unit 8 · Cha Chaan Teng 茶餐廳

奶茶, 鴛鴦, 凍 / 熱, 走甜, 菠蘿油, 餐蛋麵. Grammar point: modifiers 走, 少, 多 (凍奶茶少甜).

## Pages
- `learn.html` (`u8-learn`).
- `order.html`, `order.js` (`u8-order`): Order Up: hear what the customer calls and fill in the order ticket; order food with its measure word (`Measures.round`), answer the waiter, build orders from tiles.
- `tones.html`, `say.html`; `sheet.html`, `write.html`: writes 冰油走.

## Words
Groups: `basics`, `drinks`, `food`, `modifiers`, `place`, `measures`, `borrowed`, and the derived `served` (each drink hot and iced), `mods`, `orders` (with `drink`, `temp`, `sweet`, `ice`, which Order Up reads), `ones`, `tasty`, `questions` (the waiter's, with `reply`), `sentences`. Borrows $2 (`p200`) from unit 6, 埋單 and 甜 from unit 7, 份 (`fan6`) from unit 1.

## Audio
- 少 is read siu3 (young) and 士 si6 from characters, so `Units.phonemes` reads 少 (`siu`) and 多士 (`toast`, `french-toast`) from jyutping in every phrase.
- Azure has no ning2, even in phrases with sapi, so the unit teaches 檸檬茶 ning4 mung1 caa4 and notes the short form 檸茶. MiniMax takes of the 檸茶 ning2 clips, which pass audio-check's shape test, are kept unused in `audio-alt/` (its `manifest.json` has each clip's text, voice and verdict) in case the unit switches to 檸茶.

## Drawings
Each drink as served: hot in a cup with steam, iced in a glass with ice cubes; the plain drink is the hot one. `art.mjs` loads vocab.js to draw every entry in `served`.

## Borrowed by later units
凍 / 熱 (`dung`, `jit`: unit 13's weather), 飲, 食, `cha-chaan-teng` (unit 11), and the drinks with their cup and glass pictures. 走 (`zau`) is unit 19's "to run".
