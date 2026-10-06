# Unit 9 · Time & Dates 時間

點鐘, 個字, 半, 星期, 月, 號, 今日 / 聽日 / 琴日, parts of the day. Grammar point: time words go before the verb (我七點食飯).

## Pages
- `learn.html` (`u9-learn`).
- `clock.html`, `clock.js` (`u9-clock`): Clock: hear a time and find its clock, set the clock, say the time, work out days and dates, build sentences with the time first.
- `tones.html`, `say.html`; `sheet.html`, `write.html`: writes 日月年.

## Words
Times come from `Canto.time`, and weekdays, months and dates from `Canto.number`, at the bottom of vocab.js; never typed out. Times are `t<hhmm>` (`t0330`) with `h` and `m`; weekdays `wk<n>`, months and dates carry `n`. Groups: `clock`, `day`, `calendar`, `days`, `verbs`, `borrowed`, `times`, `minutes`, `weekdays`, `months`, `dates`, `phrases`, `sentences`.

## Audio
- 今年 舊年 出年 (`gam-nin`, `gau-nin`, `ceot-nin`) use MiniMax (`minimax:Cantonese_ProfessionalHost（F)`): Azure has no nin2 and says nin4 whatever the SSML.
- `phoneme: true` on 夜晚 (`je-maan`) and 呀.

## Drawings
A clock for every entry with `h` and `m` (and for 鐘): `art.mjs` loads vocab.js and draws them all, so a new time gets its clock from `draw.mjs`.

## Borrowed by later units
The times with their clocks (`t0330`; unit 15's planner builds ids like `t0700` in its page script, unit 21 borrows `t0600`), 點 (`dim`), 幾 (`gei`), the weekdays (`wk<n>`, unit 13), 今日 (`gam-jat`), and 返工 / 食飯.
