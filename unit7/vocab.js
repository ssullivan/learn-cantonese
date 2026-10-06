/*
 * Unit 7 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 7 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word used to order it; must match its picture's steamer
 * plate or bowl, which tools/check.mjs verifies),
 * say? (text to speak if not hanzi), ssml? (SSML inside <voice> to
 * force a reading the voice gets wrong).
 */
Units.add(7, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '小心米',

  basics: [
    ...Words.list('yum-cha dim-sum'),
  ],

  groups: [
    ...Words.list('steamed fried baked sweet rice-noodles'),
  ],

  // Measure words for ordering: 一籠 (steamer basket), 一碟 (plate), and
  // 一碗 (bowl), borrowed from unit 5 below.
  measures: [
    ...Words.list('lung dip'),
  ],

  items: [
    { ...Words.get('har-gow'), group: 'steamed' },
    { ...Words.get('siu-mai'), group: 'steamed' },
    { ...Words.get('char-siu-bao'), group: 'steamed' },
    { ...Words.get('cheung-fun'), group: 'steamed' },
    { ...Words.get('chicken-feet'), group: 'steamed' },
    { ...Words.get('spare-ribs'), group: 'steamed' },
    { ...Words.get('lo-mai-gai'), group: 'steamed' },
    { ...Words.get('xiao-long-bao'), group: 'steamed' },
    { ...Words.get('beef-tripe'), group: 'steamed' },
    { ...Words.get('zaa-loeng'), group: 'steamed' },
    { ...Words.get('spring-roll'), group: 'fried' },
    { ...Words.get('turnip-cake'), group: 'fried' },
    { ...Words.get('ham-sui-gok'), group: 'fried' },
    { ...Words.get('char-siu-sou'), group: 'baked' },
    { ...Words.get('egg-tart'), group: 'sweet' },
    { ...Words.get('lai-wong-bao'), group: 'sweet' },
    { ...Words.get('ma-lai-go'), group: 'sweet' },
    { ...Words.get('pineapple-bun'), group: 'sweet' },
    { ...Words.get('fried-rice'), group: 'rice-noodles' },
    { ...Words.get('seafood-noodles'), group: 'rice-noodles' },
    { ...Words.get('beef-ho-fun'), group: 'rice-noodles' },
    { ...Words.get('congee'), measure: 'wun', group: 'rice-noodles', english: 'congee',
      note: 'Smooth rice porridge, often with century egg and pork. It comes in a bowl: 一碗粥.' },
  ],

  phrases: [
    ...Words.list('more-water bill'),
  ],
});

// Borrowed: 碗 is taught in unit 5; congee comes in a bowl.
window.VOCAB.measures.push({ ...Words.get('wun'), english: 'bowl',
  note: 'For anything that comes in a bowl: 一碗粥.' });

// Derived: "one basket/plate/bowl of X" for every dish (一籠蝦餃), used for
// orders in the trolley game. Audio is generated like any other entry.
(V => {
  const m = Units.byId(V.measures);
  V.portions = V.items.map(i => ({
    id: `one-${i.id}`,
    hanzi: `一${m[i.measure].hanzi}${i.hanzi}`,
    jyutping: `jat1 ${m[i.measure].jyutping} ${i.jyutping}`,
    english: `${i.english} (1 ${m[i.measure].english})`,
    item: i.id,
    img: false,
    // A dish the voice misreads (its ssml) is read from jyutping in the
    // order: audio-check found that best for 一碟乾炒牛河.
    ...(i.ssml && { phoneme: true }),
  }));
})(window.VOCAB);

// Borrowed: 唔該 is taught in unit 2; the trolley game says it before every order.
window.VOCAB.phrases.unshift(Units.word(2, 'm-goi'));

// Derived: orders built from words, for Build & Say (Tiles.round):
// 我要 + number + measure + dish, for every dish. `step` is the level:
// "one" (一), "count" (two to five; two is 兩 before a measure, with 二 as
// a wrong tile), "please" (唔該 first, with 多謝 as a wrong tile). The
// first, a basket of har gow, is kept with the phrases for the learn page.
// They are read from their jyutping: audio-check flagged a third fewer
// clips than reading the characters (tone 5 said like 2 in 我 兩 五).
(V => {
  V.orderWords = [Words.get('ngo'), Words.get('jiu'), Units.word(2, 'thanks'),
    Words.get('loeng'), ...[1, 2, 3, 4, 5].map(n => Units.word(4, `n${n}`))];
  const say = Units.sentences(V);
  const NUM = ['', 'one', 'two', 'three', 'four', 'five'];
  const count = n => n === 2 ? 'loeng' : `n${n}`;
  const order = (i, n, step) => {
    const please = step === 'please';
    const e = say(`${please ? 'm-goi ' : ''}ngo jiu ${count(n)} ${i.measure} ${i.id}`,
      `${please ? 'Excuse me! ' : ''}I'd like ${NUM[n]} order${n > 1 ? 's' : ''} of ${i.english}`,
      { step, phoneme: true, decoys: [...(n === 2 ? ['n2'] : []), ...(please ? ['thanks'] : [])] });
    if (please) e.hanzi = e.hanzi.replace('唔該', '唔該，');
    return e;
  };
  const [first, ...orders] = V.items.flatMap((i, k) => [
    order(i, 1, 'one'),
    order(i, 2 + k % 4, 'count'),
    order(i, 2 + (k + 2) % 4, 'please'),
  ]);
  V.phrases.splice(1, 0, { ...first, note: '籠 (lung4) is a steamer basket. Swap in any dish.' });
  V.orders = orders;
})(window.VOCAB);
