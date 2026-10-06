/*
 * Unit 20 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 20 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word it is counted with), counted? ([one, many] English),
 * phoneme? (true: tools/tts.mjs reads the jyutping exactly), plus kind
 * ('fruit' or 'veg') and catty (dollars for one 斤 at the market) on
 * the produce, n (catties) on weights, n (dollars) on prices, and thing,
 * weight and total (ids) on orders.
 *
 * Weights come from Canto.number and prices from Canto.price (borrowed
 * from unit 6 where it has them); phrases and sentences are derived at
 * the bottom of this file, never typed out.
 */
Units.add(20, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '斤新共',

  // Fruit and vegetables new in this unit. Each has a picture.
  fruit: [
    { ...Words.get('banana'), kind: 'fruit', catty: 12 },
    { ...Words.get('grapes'), kind: 'fruit', catty: 30 },
    { ...Words.get('strawberry'), kind: 'fruit', catty: 35 },
    { ...Words.get('mango'), kind: 'fruit', catty: 20 },
    { ...Words.get('pineapple'), kind: 'fruit', catty: 15 },
    { ...Words.get('pear'), kind: 'fruit', catty: 18 },
  ],
  veg: [
    { ...Words.get('choy-sum'), kind: 'veg', catty: 15 },
    { ...Words.get('bok-choy'), kind: 'veg', catty: 10 },
    { ...Words.get('tomato'), kind: 'veg', catty: 13 },
    { ...Words.get('potato'), kind: 'veg', catty: 8 },
    { ...Words.get('carrot'), kind: 'veg', catty: 6 },
  ],

  words: [
    ...Words.list('saang-gwo coi gaai-si gan1 jat-gung san-sin syun'),
  ],

  // Measure words for fruit and vegetables. 個 and 條 are borrowed below.
  measures: [
    { ...Words.get('nap'), english: 'for small round things',
      note: 'Grapes, strawberries, sweets: 一粒提子.' },
    Words.get('po'),
  ],
});

// Borrowed: 蘋果 橙 西瓜 with their pictures, 個 條 and 啲 (units 4 and 5),
// 我 你 係 唔 呀 (unit 3), 買 要 錢 好 平 貴 半 and prices (unit 6), 甜
// (unit 7), 食 and 定 (unit 8), 去 (unit 11), 鍾意 and 想 (unit 16), and
// 最 (unit 18). The market adds its price per 斤.
(V => {
  const CATTY = { apple: 13, orange: 12, watermelon: 8 };
  V.fruit.push(...Object.entries(CATTY).map(([id, catty]) => ({ ...Units.word(6, id), kind: 'fruit', catty, price: undefined })));
  V.measures.push(Words.get('go'), Words.get('tiu'));
  V.ones = Object.keys(CATTY).map(id => Units.word(6, `one-${id}`));
  V.borrowed = [
    ...Words.list('ngo nei hai m aa'),
    Words.get('gei-do'),
    { ...Words.get('di'), english: 'some; the (more than one)', note: 'Before a noun: 買啲生果, buy some fruit.' },
    Words.get('ni'),
    ...Words.list('maai5 jiu cin2 hou peng gwai'),
    Words.get('sweet'),
    ...Words.list('sik6 ding'),
    Words.get('heoi'),
    ...Words.list('zung-ji soeng'),
    Words.get('zeoi'),
  ];
})(window.VOCAB);

// Derived: 一條香蕉, weights (半斤 to 三斤), prices per 斤, orders and what
// they cost, 啲, and sentences. Audio is generated like any entry.
(V => {
  let byId = Units.byId(V);
  const produce = [...V.fruit, ...V.veg];
  const one = t => t.counted?.[0] ?? `a ${t.english}`;
  const many = t => t.counted?.[1] ?? `${t.english}s`;

  // 一條香蕉 for Measures.round (unit 6 has 一個蘋果, 一個橙, 一個西瓜).
  V.ones.push(...produce.filter(t => Units.teaches(V, t)).map(t => {
    const { hanzi, jyutping } = Canto.number(1, { measure: byId[t.measure] });
    return { id: `one-${t.id}`, thing: t.id, hanzi: hanzi + t.hanzi, jyutping: `${jyutping} ${t.jyutping}`, english: one(t), img: false };
  }));

  // Weights: 半斤, 一斤, 斤半, 兩斤, 三斤.
  const cattyText = n => n === 0.5 ? 'half a catty' : `${n === 1.5 ? '1½' : n} ${n > 1 ? 'catties' : 'catty'}`;
  V.weights = [0.5, 1, 1.5, 2, 3].map(n => ({
    id: `w${String(n).replace('.', '')}`, n, ...Canto.number(n, { measure: byId.gan1, clip: true }), english: cattyText(n), img: false,
    ...(n === 1.5 && { note: '一斤半, said 斤半, like 百五 (Unit 4).' }),
    ...(n === 0.5 && { note: '半 (Unit 6) before the 斤: half a catty.' }),
  }));

  // Prices: unit 6's clip where it has one, else a new one.
  const dollars = n => `$${n % 1 ? n.toFixed(2) : n}`;
  const price = n => {
    const id = `p${Math.round(n * 100)}`;
    try { return Units.word(6, id); } catch { return { id, n, ...Canto.price(n), english: dollars(n), img: false }; }
  };
  const amounts = new Set(produce.map(t => t.catty));
  // What each thing's order costs: a weight each, in turn.
  const WEIGHT = [2, 1, 3, 0.5, 1.5];
  const orderWeight = produce.map((t, i) => [t, V.weights.find(w => w.n === WEIGHT[i % WEIGHT.length])]);
  for (const [t, w] of orderWeight) amounts.add(t.catty * w.n);
  V.prices = [...amounts].sort((a, b) => a - b).map(price);

  byId = Units.byId(V);
  let say = Units.sentences(V);
  const priceOf = n => byId[`p${Math.round(n * 100)}`];
  // 十二蚊一斤: what a stall's sign says.
  V.perCatty = [...new Set(produce.map(t => t.catty))].sort((a, b) => a - b)
    .map(n => say(`${priceOf(n).id} w1`, `${dollars(n)} a catty`, { n }));
  V.perCatty[0].note = 'Price first, then 一斤: "six dollars one catty".';
  // 香蕉幾多錢一斤呀？
  V.asks = produce.map(t => say(`${t.id} gei-do cin2 w1 aa`, `How much is a catty of ${many(t)}?`, { thing: t.id }));
  V.asks[0].note = '幾多錢一斤: "how much money a catty".';
  // 我要兩斤香蕉, and what it comes to.
  V.orders = orderWeight.map(([t, w]) => say(`ngo jiu ${w.id} ${t.id}`, `I'd like ${w.english} of ${many(t)}.`,
    { thing: t.id, weight: w.id, total: priceOf(t.catty * w.n).id }));
  V.orders[0].note = 'The weight goes where a number and measure word would: 兩斤香蕉, like 兩個橙.';

  say = Units.sentences(V);
  // 啲: some, or "the" for more than one.
  V.some = [
    say('ngo soeng maai5 di saang-gwo', 'I want to buy some fruit.', { note: '啲 before a noun: some.' }),
    say('jiu m jiu di grapes aa', 'Would you like some grapes?'),
    say('ngo jiu di choy-sum', 'I\'ll have some choy sum.'),
    say('di strawberry hou sweet', 'The strawberries are very sweet.', { note: '啲 at the start: "the" (Unit 5).' }),
    say('di banana hou san-sin', 'The bananas are very fresh.'),
  ];

  V.sentences = [
    say('ngo heoi gaai-si maai5 coi', 'I\'m going to the market to buy vegetables.', { note: '去 + place + what for.' }),
    say('jat-gung gei-do cin2 aa', 'How much is it altogether?', { note: '一共: in total. Ask it when you pay.' }),
    say('ni di mango hou sweet', 'These mangoes are very sweet.', { note: '呢啲: these.' }),
    say('ni di orange hou syun', 'These oranges are very sour.'),
    say('tomato hai saang-gwo ding hai coi aa', 'Is a tomato a fruit or a vegetable?', { note: '定係 (Unit 8): or, in a question.' }),
    say('ngo zeoi zung-ji sik6 mango', 'Mangoes are my favourite.', { note: '最鍾意 (Unit 18): like best.' }),
  ];

  // Read from their jyutping: 錢 (cin2 in speech) and 平, as in Unit 6,
  // and 棵 (po1 in speech; the voice reads the dictionary's fo2), with
  // every 一棵 phrase.
  Units.phonemes(V, ['cin2', 'peng', 'po']);
  byId = Units.byId(V);
  for (const e of V.ones) if (Units.teaches(V, e) && byId[byId[e.thing].measure].phoneme) e.phoneme = true;
})(window.VOCAB);
