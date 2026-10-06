# Unit 1 · Sounds & Tones 聲調

How to read Jyutping and hear the six tones. Grammar point: tone numbers 1–6 only (no 7/8/9), and tone changes.

## Pages
- `learn.html` (`u1-learn`): Jyutping, the six tones on si / fu / fan, spelling traps (j, z, c, eo, oe, yu, aa vs a, ng).
- `tones.html` (`u1-tones`): Tone Detective is the unit's only game, from high-or-low up to all six tones. No Say It Back.
- `sheet.html`, `write.html` (`u1-write`): writes 水牛好.

## Words
Its words are in the dictionary (`words/words.js`, unit 1). `sets` holds si / fu / fan in all six tones; their ids are the jyutping (`si1`…`fan6`), so lessons can find a syllable's set and a tone's examples. `basics`, `spelling` (an example word per trap), `praise`; `V.inTones` is a helper for lessons.

## Audio
- The six-tone sets are read by WanLung (`zh-HK-WanLungNeural`, the `voice` of each in `words/words.js`); everything else by the site's voice, HiuMaan.
- Why: a native speaker heard HiuMaan's tones merge (5 almost like 2, 3 close to 6). Which pairs they meant is still open; WanLung keeps all six apart best of the Azure voices. The machine check can't judge this: it asks whether each tone is the voice's own, not whether two sound apart. Tone-contrast clips need a listener.

## Drawings
Unit 1's section of `words/art.mjs` draws one picture per word with a picture (fish, car, water, cow, chicken...), from `svg.mjs` parts (`bowl`, `cup`, `car`).

## Used by later units
魚 車 水 雞 牛 (`fish`, `car`, `water`, `chicken`, `cow`): unit 5 gives them a `measure`, and later units take them from unit 5 or here. Unit 8 borrows `fan6` (份, a portion). 廣東話 (`cantonese`, unit 3), 粥 (`congee`, unit 7's bowl of congee) and 街 (`street`, unit 16).
