/*
 * Unit 4 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 4 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
 * jyutping, english, note?, img (false = no picture), say? (text to
 * speak if not hanzi), ssml? (SSML inside <voice> to force a reading
 * the voice gets wrong), phoneme? (true: tools/tts.mjs reads the
 * jyutping exactly), plus n (the value) on numbers.
 *
 * Numbers are derived with Canto.number (shared/numbers.js), never
 * typed out: see the bottom of this file.
 *
 * write: the characters this unit teaches to write, stroke by stroke
 * (strokes/, from tools/strokes.mjs; see tools/stroke-data.mjs).
 */
Units.add(4, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '一二三十',

  words: [
    ...Words.list('baak cin maan loeng go dai gei-do gei-do-go'),
  ],
});

// Derived: every number is built by Canto.number. `n` is the value;
// english is the numeral ("10,000"). Audio is generated like any entry.
(V => {
  const commas = n => String(n).replace(/\B(?=(\d{3})+$)/g, ',');
  const num = (n, extra) => ({ id: `n${n}`, n, ...Canto.number(n), english: commas(n), img: false, ...extra });
  const go = V.words.find(w => w.id === 'go');

  const NOTES = {
    0: '零 also fills gaps inside a number: 一百零一 is 101.',
    2: 'For counting and inside numbers. Before a measure word, 百, 千 or 萬, two is 兩.',
    4: 'Sounds like 死 sei2 (to die), so 4 is an unlucky number. Keep it apart from 十 sap6.',
    8: 'Rhymes with 發 faat3 (to get rich), so 8 is the lucky number.',
    9: 'Sounds like 久 gau2 (long-lasting), a good number for weddings.',
    10: '十 sap6 ends in a closed p. Don\'t mix it up with 四 sei3.',
    11: '"Ten one". Eleven to nineteen all work like this.',
    20: 'A round 20 is 二十. From 21 to 29 people say 廿 jaa6.',
    21: '廿 jaa6 means "twenty-". 二十一 is correct too, just slower.',
  };
  const BIG = {
    100: '一百, not just 百.',
    101: '零 fills the gap: "one hundred, zero, one".',
    110: 'Inside a big number, ten is 一十, not just 十.',
    200: '兩百, not 二百.',
    2000: '兩千, not 二千.',
    1200: '二百 here: 兩 is only for a 2 at the very start.',
    10000: 'Cantonese has its own word for ten thousand.',
    20000: '兩萬, not 二萬.',
    100000: '"Ten ten-thousands". Count big numbers in groups of four digits.',
    1000000: '"One hundred ten-thousands".',
  };

  V.numbers = Array.from({ length: 100 }, (_, n) => num(n, {
    ...(n <= 10 && { img: undefined }),
    ...(NOTES[n] && { note: NOTES[n] }),
  }));

  V.big = [100, 101, 110, 120, 150, 200, 250, 360, 500, 888, 999, 1000, 1001, 1010, 1200, 2000,
    2046, 3008, 3500, 5000, 9999, 10000, 12000, 20000, 25000, 50000, 100000, 1000000]
    .map(n => num(n, BIG[n] && { note: BIG[n] }));

  const ORDINAL = ['st', 'nd', 'rd'];
  V.ordinals = Array.from({ length: 10 }, (_, i) => {
    const { hanzi, jyutping } = Canto.number(i + 1);
    return { id: `dai-${i + 1}`, n: i + 1, hanzi: `第${hanzi}`, jyutping: `dai6 ${jyutping}`,
      english: `${i + 1}${ORDINAL[i] ?? 'th'}`, img: false,
      ...(i === 1 && { note: '第二, never 第兩: ordinals keep 二.' }) };
  });

  V.twos = [{ id: 'loeng-go', n: 2, ...Canto.number(2, { measure: go }), english: '2 (of something)', img: false,
    note: '兩個, not 二個. Twelve is still 十二個.' }];

  // Fast speech: 十 shrinks to aa6. Listening only. The voice reads 十 as
  // sap6, so these are read from the jyutping (phoneme: true).
  V.short = [31, 45, 58, 99].map(n => {
    const { hanzi, jyutping } = Canto.number(n, { short: true });
    return { id: `short-${n}`, n, hanzi, jyutping, english: `${n} (said fast)`, img: false, phoneme: true };
  });
})(window.VOCAB);
