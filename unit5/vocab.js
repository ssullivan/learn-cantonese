/*
 * Unit 5 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
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
    { id: 'zek', hanzi: '隻', jyutping: 'zek3', english: 'for animals', img: false,
      note: 'Almost every animal: 一隻貓, 一隻狗. Also one of a pair, like one shoe.' },
    { id: 'bun', hanzi: '本', jyutping: 'bun2', english: 'for books', img: false,
      note: 'Anything bound like a book: books, notebooks, magazines.' },
    { id: 'zoeng', hanzi: '張', jyutping: 'zoeng1', english: 'for flat things', img: false,
      note: 'Things with a flat surface: paper, photos, tickets, and tables, chairs and beds.' },
    { id: 'tiu', hanzi: '條', jyutping: 'tiu4', english: 'for long, thin things', img: false,
      note: 'Long and bendy: fish, snakes, roads, trousers, rivers.' },
    { id: 'zi', hanzi: '枝', jyutping: 'zi1', english: 'for sticks', img: false,
      note: 'Long and stiff: pens, flowers, bottles.' },
    { id: 'gaa', hanzi: '架', jyutping: 'gaa3', english: 'for vehicles and machines', img: false,
      note: 'Cars, planes, bikes, and machines like cameras.' },
    { id: 'gin', hanzi: '件', jyutping: 'gin6', english: 'for tops and pieces', img: false,
      note: 'Clothes for the top half (a shirt, a jacket) and pieces, like a slice of cake.' },
    { id: 'bui', hanzi: '杯', jyutping: 'bui1', english: 'a cup of', dish: 'cup', img: false,
      note: 'A container can be a measure word: 一杯茶, a cup of tea.' },
    { id: 'wun', hanzi: '碗', jyutping: 'wun2', english: 'a bowl of', dish: 'bowl', img: false,
      note: 'For what comes in a bowl: 一碗飯, a bowl of rice.' },
    { id: 'deoi', hanzi: '對', jyutping: 'deoi3', english: 'a pair of', img: false,
      note: 'Things that come in twos: shoes, socks, chopsticks.' },
  ],

  // Borrowed below: 魚 車 水 雞 牛 from unit 1 (with their measure added).
  things: [
    { id: 'apple', measure: 'go', hanzi: '蘋果', jyutping: 'ping4 gwo2', english: 'apple', counted: ['an apple', 'apples'] },
    { id: 'ball', measure: 'go', hanzi: '波', jyutping: 'bo1', english: 'ball', note: 'From the English "ball".' },
    { id: 'cat', measure: 'zek', hanzi: '貓', jyutping: 'maau1', english: 'cat' },
    { id: 'dog', measure: 'zek', hanzi: '狗', jyutping: 'gau2', english: 'dog' },
    { id: 'book', measure: 'bun', hanzi: '書', jyutping: 'syu1', english: 'book' },
    { id: 'paper', measure: 'zoeng', hanzi: '紙', jyutping: 'zi2', english: 'paper', counted: ['a sheet of paper', 'sheets of paper'] },
    { id: 'table', measure: 'zoeng', hanzi: '枱', jyutping: 'toi2', english: 'table', phoneme: true,
      note: 'Usually toi2. A table counts as flat.' },
    { id: 'trousers', measure: 'tiu', hanzi: '褲', jyutping: 'fu3', english: 'trousers', counted: ['a pair of trousers', 'pairs of trousers'],
      note: 'One 條, not a pair: long legs make trousers long and thin.' },
    { id: 'pen', measure: 'zi', hanzi: '筆', jyutping: 'bat1', english: 'pen' },
    { id: 'flower', measure: 'zi', hanzi: '花', jyutping: 'faa1', english: 'flower', note: 'One flower on its stalk.' },
    { id: 'plane', measure: 'gaa', hanzi: '飛機', jyutping: 'fei1 gei1', english: 'plane', note: 'Literally "flying machine".' },
    { id: 'shirt', measure: 'gin', hanzi: '衫', jyutping: 'saam1', english: 'shirt', note: '衫 is any top: shirt, T-shirt, jumper.' },
    { id: 'cake', measure: 'gin', hanzi: '蛋糕', jyutping: 'daan6 gou1', english: 'cake', counted: ['a piece of cake', 'pieces of cake'],
      note: 'Literally "egg cake". A slice is 一件.' },
    { id: 'tea', measure: 'bui', hanzi: '茶', jyutping: 'caa4', english: 'tea', counted: ['a cup of tea', 'cups of tea'] },
    { id: 'rice', measure: 'wun', hanzi: '飯', jyutping: 'faan6', english: 'rice', counted: ['a bowl of rice', 'bowls of rice'],
      note: 'Cooked rice, and a meal in general: 食飯, to eat.' },
    { id: 'noodles', measure: 'wun', hanzi: '麵', jyutping: 'min6', english: 'noodles', counted: ['a bowl of noodles', 'bowls of noodles'] },
    { id: 'shoes', measure: 'deoi', hanzi: '鞋', jyutping: 'haai4', english: 'shoes', counted: ['a pair of shoes', 'pairs of shoes'] },
    { id: 'chopsticks', measure: 'deoi', hanzi: '筷子', jyutping: 'faai3 zi2', english: 'chopsticks', counted: ['a pair of chopsticks', 'pairs of chopsticks'] },
  ],

  words: [
    { id: 'di', hanzi: '啲', jyutping: 'di1', english: 'some; the (more than one)', img: false,
      note: 'The measure word for more than one, or an amount: 啲書, the books. No number before it.' },
    { id: 'ni', hanzi: '呢', jyutping: 'ni1', english: 'this', img: false, phoneme: true,
      note: 'Before a measure word: 呢隻貓, this cat. Not the ne1 of 你呢？' },
    { id: 'go2', hanzi: '嗰', jyutping: 'go2', english: 'that', img: false,
      note: 'Before a measure word: 嗰本書, that book.' },
    { id: 'jau', hanzi: '有', jyutping: 'jau5', english: 'to have; there is', img: false },
  ],
});

// Borrowed: 個 (unit 4) is the everyday measure word; five of the nouns come
// from unit 1; the numbers, 兩 and 幾多 (unit 4) and the people and question
// words (unit 3) make the sentences. Things stay in measure-word order.
(V => {
  V.measures.unshift({ ...Units.word(4, 'go'), english: 'the everyday one',
    note: 'People, round things, and anything without its own measure word. When unsure, 個 is the safe guess.' });
  V.things.push(
    { ...Units.word(1, 'chicken'), measure: 'zek', note: undefined },
    { ...Units.word(1, 'cow'), measure: 'zek', note: 'Farm animals too: 一隻牛.' },
    { ...Units.word(1, 'fish'), measure: 'tiu', note: 'A fish is long and thin, so 一條魚.' },
    { ...Units.word(1, 'car'), measure: 'gaa', note: undefined },
    { ...Units.word(1, 'water'), measure: 'bui', counted: ['a glass of water', 'glasses of water'], note: undefined },
  );
  const order = V.measures.map(m => m.id);
  V.things.sort((a, b) => order.indexOf(a.measure) - order.indexOf(b.measure));
  V.borrowed = [
    ...['ngo', 'nei', 'keoi', 'ngo-dei', 'hai', 'mat-je', 'aa'].map(id => Units.word(3, id)),
    ...['n1', 'n3', 'loeng', 'gei-do'].map(id => Units.word(4, id)),
  ];
})(window.VOCAB);

// Derived: phrases for every noun, and sentences. Audio is generated like
// any entry. A phrase is read from its jyutping when its noun is.
(V => {
  const byId = Object.fromEntries(Object.values(V).filter(Array.isArray).flat().map(e => [e.id, e]));
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
