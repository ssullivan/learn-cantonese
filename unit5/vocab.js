/*
 * Unit 5 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 5 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word it is counted with; a measure with a `dish` must
 * match the picture's cup or bowl, which tools/check.mjs verifies),
 * counted? ([one, many] English when "a <english>" / "<english>s" is
 * wrong), phoneme? (true: tools/tts.mjs reads the jyutping exactly).
 *
 * Phrases (一隻貓, 兩隻貓, 呢隻貓) and sentences are derived at the bottom
 * of this file, never typed out; counts come from Canto.number.
 */
Units.add(5, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '本杯有',

  // 個 is taught in unit 4 and borrowed below (it is added to this list).
  measures: [
    ...Words.list('zek bun zoeng tiu zi gaa gin bui wun deoi'),
  ],

  // Borrowed below: 魚 車 水 雞 牛 from unit 1 (with their measure added).
  things: [
    ...Words.list('apple ball cat dog book paper table trousers pen flower plane shirt cake tea rice noodles'),
    ...Words.list('shoes chopsticks'),
  ],

  words: [
    ...Words.list('di ni go2 jau'),
  ],
});

// Borrowed: 個 (unit 4) is the everyday measure word; five of the nouns come
// from unit 1; the numbers, 兩 and 幾多 (unit 4) and the people and question
// words (unit 3) make the sentences. Things stay in measure-word order.
(V => {
  V.measures.unshift({ ...Words.get('go'), english: 'the everyday one',
    note: 'People, round things, and anything without its own measure word. When unsure, 個 is the safe guess.' });
  V.things.push(
    { ...Words.get('chicken'), measure: 'zek', note: undefined },
    { ...Words.get('cow'), measure: 'zek', note: 'Farm animals too: 一隻牛.' },
    { ...Words.get('fish'), measure: 'tiu', note: 'A fish is long and thin, so 一條魚.' },
    { ...Words.get('car'), measure: 'gaa', note: undefined },
    { ...Words.get('water'), measure: 'bui', counted: ['a glass of water', 'glasses of water'], note: undefined },
  );
  const order = V.measures.map(m => m.id);
  V.things.sort((a, b) => order.indexOf(a.measure) - order.indexOf(b.measure));
  V.borrowed = [
    ...Words.list('ngo nei keoi ngo-dei hai mat-je aa'),
    ...['n1', 'n3', 'loeng', 'gei-do'].map(id => Units.word(4, id)),
  ];
})(window.VOCAB);

// Derived: phrases for every noun, and sentences. Audio is generated like
// any entry. A phrase is read from its jyutping when its noun is.
(V => {
  const byId = Units.byId(V);
  const one = t => t.counted?.[0] ?? `a ${t.english}`;
  const many = t => t.counted?.[1] ?? `${t.english}s`;
  const bare = t => one(t).replace(/^an? /, '');
  const phrase = (id, t, [hanzi, jyutping], english, extra) => ({
    id: `${id}-${t.id}`, thing: t.id, hanzi: hanzi + t.hanzi, jyutping: `${jyutping} ${t.jyutping}`,
    english, img: false, ...(t.phoneme && { phoneme: true }), ...extra,
  });
  const m = t => byId[t.measure];
  const count = (n, t) => {
    const { hanzi, jyutping } = Canto.number(n, { measure: m(t) });
    return phrase(n === 1 ? 'one' : n === 2 ? 'two' : `n${n}`, t, [hanzi, jyutping], n === 1 ? one(t) : `${n} ${many(t)}`, { n });
  };

  V.ones = V.things.map(t => count(1, t));
  // Measure + noun on its own means "the": 隻貓, the cat.
  V.the = V.things.map(t => phrase('the', t, [m(t).hanzi, m(t).jyutping], `the ${bare(t)}`));
  // 兩 for every noun, and one bigger count each (3 to 9, in turn).
  V.counts = V.things.flatMap((t, i) => [count(2, t), count(3 + i % 7, t)]);
  V.thisThat = V.things.flatMap(t => [
    phrase('this', t, [`呢${m(t).hanzi}`, `ni1 ${m(t).jyutping}`], `this ${bare(t)}`, { near: true }),
    phrase('that', t, [`嗰${m(t).hanzi}`, `go2 ${m(t).jyutping}`], `that ${bare(t)}`, { near: false }),
  ]);

  // Sentences (Units.sentences): `words` lists their ids in order, which
  // Count It turns into tiles.
  const say = Units.sentences(V);
  V.sentences = [
    say('ngo jau loeng zek cat', 'I have two cats.', { note: '兩隻, never 二隻.' }),
    say('keoi jau n1 gaa car', 'He / she has a car.'),
    say('ngo jau n3 bun book', 'I have three books.'),
    say('keoi jau n1 deoi shoes', 'He / she has a pair of shoes.'),
    say('ngo-dei jau loeng bui tea', 'We have two cups of tea.'),
    say('nei jau gei-do zek dog aa', 'How many dogs do you have?', { note: '幾多 takes the measure word too: 幾多隻.' }),
    say('nei jau gei-do bun book aa', 'How many books do you have?'),
    say('ni go hai mat-je aa', 'What is this?', { note: '呢個 on its own: "this one".' }),
    say('go2 go hai mat-je aa', 'What is that?'),
    say('ni di hai mat-je aa', 'What are these?', { note: '呢啲, these; 嗰啲, those.' }),
  ];
})(window.VOCAB);
