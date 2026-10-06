/*
 * Unit 6 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word it is counted with), price? (what one usually costs,
 * in dollars), phoneme? (true: tools/tts.mjs reads the jyutping exactly),
 * plus n (the amount in dollars) and cash? ('coin' or 'note', with a
 * picture) on prices.
 *
 * Prices come from Canto.price and sentences from Units.sentences, at the
 * bottom of this file; never type them out.
 */
Units.add(6, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '平半西',

  money: [
    { id: 'cin', hanzi: '錢', jyutping: 'cin2', english: 'money', img: false, phoneme: true,
      note: 'cin4 in writing; everyday speech says cin2, as in 幾多錢.' },
    { id: 'man', hanzi: '蚊', jyutping: 'man1', english: 'dollar', img: false,
      note: 'The spoken word for a dollar. Price tags write $ or 元.' },
    { id: 'hou4', hanzi: '毫', jyutping: 'hou4', english: 'ten cents', img: false,
      note: 'Also 毫子. 五毫 is 50 cents; Hong Kong has no smaller coin.' },
    { id: 'bun3', hanzi: '半', jyutping: 'bun3', english: 'half', img: false,
      note: 'After 蚊 it means 50 cents: 三蚊半, $3.50.' },
    { id: 'zaau', hanzi: '找', jyutping: 'zaau2', english: 'to give change', img: false },
  ],

  words: [
    { id: 'maai5', hanzi: '買', jyutping: 'maai5', english: 'to buy', img: false,
      note: 'Low rising tone 5. 買嘢 is "to go shopping".' },
    { id: 'maai6', hanzi: '賣', jyutping: 'maai6', english: 'to sell', img: false,
      note: 'Low level tone 6: only the tone tells buy and sell apart.' },
    { id: 'jiu', hanzi: '要', jyutping: 'jiu3', english: 'to want; I\'ll take', img: false,
      note: '我要 is how you ask for something in a shop. 唔要, "don\'t want".' },
    { id: 'peng', hanzi: '平', jyutping: 'peng4', english: 'cheap', img: false, phoneme: true,
      note: 'peng4 in speech; ping4 in words like 和平 (peace).' },
    { id: 'gwai', hanzi: '貴', jyutping: 'gwai3', english: 'expensive', img: false },
    { id: 'hou', hanzi: '好', jyutping: 'hou2', english: 'very; good', img: false,
      note: 'Before an adjective: 好貴, very expensive. An adjective needs no 係.' },
    { id: 'dak', hanzi: '得', jyutping: 'dak1', english: 'OK; can do', img: false,
      note: '得唔得？ asks "is that OK?". Answer 得 (yes) or 唔得 (no).' },
  ],

  // Things to buy: `price` is roughly what one costs. More come from units
  // 5 and 1 below.
  things: [
    { id: 'orange', measure: 'go', price: 3.5, hanzi: '橙', jyutping: 'caang2', english: 'orange', counted: ['an orange', 'oranges'] },
    { id: 'egg', measure: 'zek', price: 2.2, hanzi: '雞蛋', jyutping: 'gai1 daan2', english: 'egg', counted: ['an egg', 'eggs'], phoneme: true,
      note: '蛋 is daan6, but 雞蛋 changes to daan2. Eggs take 隻.' },
    { id: 'watermelon', measure: 'go', price: 45, hanzi: '西瓜', jyutping: 'sai1 gwaa1', english: 'watermelon', note: 'Literally "western melon".' },
    { id: 'bread', measure: 'go', price: 8.5, hanzi: '麵包', jyutping: 'min6 baau1', english: 'bread roll',
      note: '麵包 is any bread; a roll or bun takes 個.' },
  ],
});

// Borrowed: the measure words (個 from unit 4, the rest from unit 5), things
// from unit 5 and unit 1's 魚, each with a usual price; and the words that
// make the sentences.
(V => {
  V.measures = [Units.word(4, 'go'), ...['zek', 'bun', 'tiu', 'zi', 'gin', 'deoi'].map(id => Units.word(5, id))];
  const PRICES = { apple: 5, ball: 120, book: 88, pen: 12, flower: 20, shirt: 150, cake: 28, trousers: 250, shoes: 380, chopsticks: 15 };
  V.things.push(
    ...Object.entries(PRICES).map(([id, price]) => ({ ...Units.word(5, id), price })),
    { ...Units.word(1, 'fish'), measure: 'tiu', price: 68 },
  );
  V.borrowed = [
    ...['ngo', 'nei', 'm', 'aa'].map(id => Units.word(3, id)),
    ...['loeng', 'gei-do'].map(id => Units.word(4, id)),
    ...['ni', 'go2', 'di'].map(id => Units.word(5, id)),
    Units.word(2, 'no-need'),
  ];
})(window.VOCAB);

// Derived: prices, "one of" phrases and sentences. Audio is generated like
// any entry.
(V => {
  const commas = s => s.replace(/\B(?=(\d{3})+$)/, ',');
  const price = (n, extra) => ({
    id: `p${Math.round(n * 100)}`, n, ...Canto.price(n),
    english: `$${n % 1 ? n.toFixed(2) : commas(String(n))}`, img: false, ...extra,
  });

  // Hong Kong coins and notes, with pictures.
  const COINS = [0.1, 0.2, 0.5, 1, 2, 5, 10], NOTES = [20, 50, 100, 500];
  V.cash = [...COINS.map(n => price(n, { cash: 'coin', img: undefined })), ...NOTES.map(n => price(n, { cash: 'note', img: undefined }))];

  // Prices to hear and say: every thing's price, and others picked to be
  // easy to mix up (3.5 / 5.3 / 35, 十三 / 三十) or to show a form (百五, 千二).
  const MORE = [0.3, 0.8, 1.5, 2.5, 3, 3.2, 4.5, 4.8, 5.3, 6, 8, 9.9, 12.5, 13, 18, 21, 25, 30, 31, 35, 38, 40, 53,
    80, 99, 128, 200, 350, 450, 880, 1200, 1500, 2500, 12000];
  const have = new Set([...COINS, ...NOTES]);
  const amounts = [...new Set([...V.things.map(t => t.price), ...MORE])].filter(n => !have.has(n)).sort((a, b) => a - b);
  const NOTE = {
    2: '兩蚊, like 兩個: 2 before 蚊 is 兩.',
    3.5: '半 is half a dollar.',
    3.2: 'The 毫 is left out: 三蚊二 is "three dollars two".',
    150: 'Round prices drop the last unit: 百五 is 一百五十.',
    250: '兩百五 is 兩百五十.',
    1200: '千二 is 一千二百.',
    12000: '萬二 is 一萬二千.',
  };
  V.prices = amounts.map(n => price(n, NOTE[n] && { note: NOTE[n] }));
  V.cash.forEach(c => { if (NOTE[c.n]) c.note = NOTE[c.n]; });

  // 一個橙: what the stallholder is selling. Unit 5 already has them for
  // its things (and 魚).
  const measure = Units.byId(V.measures);
  V.ones = V.things.map(t => {
    if (t.unit) return Units.word(5, `one-${t.id}`);
    const { hanzi, jyutping } = Canto.number(1, { measure: measure[t.measure] });
    return { id: `one-${t.id}`, thing: t.id, hanzi: hanzi + t.hanzi, jyutping: `${jyutping} ${t.jyutping}`,
      english: t.counted?.[0] ?? `a ${t.english}`, img: false, ...(t.phoneme && { phoneme: true }) };
  });

  const say = Units.sentences(V);
  // The voice reads 平 as ping4 unless told (the vowel of 評), so anything
  // with 平 is read from its jyutping.
  const PENG = { phoneme: true };
  // 好 + adjective: an adjective is the whole predicate, with no 係.
  V.adjectives = [
    say('hou peng', 'very cheap', PENG),
    say('hou gwai', 'very expensive'),
    say('m peng', 'not cheap', PENG),
    say('m gwai', 'not expensive'),
  ];
  V.sentences = [
    say('gei-do cin aa', 'How much is it?', { note: 'Literally "how much money?"' }),
    say('ni go gei-do cin aa', 'How much is this?', { note: '呢個, this one: point at it.' }),
    say('go2 go gei-do cin aa', 'How much is that one?'),
    say('ni bun book gei-do cin aa', 'How much is this book?', { note: 'Use the thing\'s own measure word: 呢本書.' }),
    say('ngo jiu ni go', 'I\'ll take this one.'),
    say('ngo m jiu go2 go', 'I don\'t want that one.'),
    say('ngo jiu loeng go orange', 'I\'d like two oranges.'),
    say('ngo maai5 ni go', 'I\'ll buy this one.'),
    say('ni go hou gwai', 'This one is expensive.', { note: 'No 係: 呢個係貴 is wrong.' }),
    say('go2 go hou peng', 'That one is cheap.', PENG),
    say('ni gin shirt m gwai', 'This shirt isn\'t expensive.'),
    say('peng di dak m dak aa', 'Can you make it cheaper?', { ...PENG, note: '平啲, "a bit cheaper"; 得唔得, "OK or not?"' }),
    say('no-need zaau', 'Keep the change.', { note: 'Literally "no need to give change".' }),
  ];
})(window.VOCAB);
