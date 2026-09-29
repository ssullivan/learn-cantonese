/*
 * Unit 18 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), phoneme? (true:
 * tools/tts.mjs reads the jyutping exactly), plus what can be compared
 * on the things and people: price (dollars, from unit 6), size (cm),
 * speed (km/h), age (years) and height (cm); n (years) on ages; and cmp
 * { a, b, scale, adj, holds } on the sentences that compare two of
 * them: a is adj-er than b (on 冇…咁, what it means: b isn't as adj as
 * a), and holds says whether the data agrees, worked out here.
 *
 * V.scales names the adjectives for each thing that can be compared:
 * more (大, 貴...) and less (細, 平...).
 *
 * Comparisons, ages, questions and sentences are derived at the bottom
 * of this file, never typed out.
 */
Units.add(18, {
  voice: 'zh-HK-HiuMaanNeural',

  // Adjectives in pairs. Each has a picture of the contrast.
  adjectives: [
    { id: 'daai', hanzi: '大', jyutping: 'daai6', english: 'big; older',
      note: 'Of people, older: 佢比我大, they\'re older than me.' },
    { id: 'sai', hanzi: '細', jyutping: 'sai3', english: 'small; younger',
      note: 'Of people, younger, as in 細佬 and 細妹 (Unit 10).' },
    { id: 'gou', hanzi: '高', jyutping: 'gou1', english: 'tall; high' },
    { id: 'ai', hanzi: '矮', jyutping: 'ai2', english: 'short (not tall)',
      note: 'Many say ngai2.' },
    { id: 'faai', hanzi: '快', jyutping: 'faai3', english: 'fast; quick' },
    { id: 'maan', hanzi: '慢', jyutping: 'maan6', english: 'slow',
      note: 'Sounds just like 萬 (Unit 4), ten thousand.' },
  ],

  talk: [
    { id: 'bei', hanzi: '比', jyutping: 'bei2', english: 'than (A 比 B)', img: false,
      note: 'A 比 B + adjective: 西瓜比蘋果貴. No 係, and no word for "more".' },
    { id: 'zeoi', hanzi: '最', jyutping: 'zeoi3', english: 'the most; -est',
      note: 'Before the adjective: 最大, the biggest.' },
    { id: 'jat-joeng', hanzi: '一樣', jyutping: 'jat1 joeng6', english: 'the same',
      note: 'A 同 B 一樣 + adjective: 我同佢一樣高, I\'m as tall as them.' },
    { id: 'caa-m-do', hanzi: '差唔多', jyutping: 'caa1 m4 do1', english: 'about the same; almost', img: false,
      note: '"Differ not much".' },
    { id: 'ngaam', hanzi: '啱', jyutping: 'ngaam1', english: 'right; correct', img: false,
      note: '啱唔啱呀？ Is that right?' },
  ],
});

// Borrowed: 我 你 佢 係 唔 呀 邊個 少少 乜嘢 (unit 3), 個 兩 (unit 4), 啲 呢
// and the measure words the things are counted with (unit 5), 平 貴 好 and
// unit 6's things with their prices, 熱 凍 多 定 食 (unit 8), 今日 琴日
// (unit 9), the family, 同 and 歲 (unit 10), transport (unit 11), 冇 (unit
// 14), 過 (unit 15), 鍾意 and 游水 (unit 16), and 咁 (unit 17). Things and
// people get what can be compared about them.
(V => {
  V.scales = {
    price: { more: 'gwai', less: 'peng' },
    size: { more: 'daai', less: 'sai' },
    speed: { more: 'faai', less: 'maan' },
    height: { more: 'gou', less: 'ai' },
    age: { more: 'daai', less: 'sai' },
  };

  // Rough sizes (cm) and speeds (km/h): only pairs that differ clearly are
  // ever compared.
  const SIZE = { watermelon: 30, apple: 8, orange: 8, egg: 5, ball: 24, book: 25, table: 120,
    cat: 45, dog: 60, car: 450, bus: 1200, plane: 4000 };
  const SPEED = { plane: 800, metro: 80, car: 60, taxi: 60, minibus: 50, bus: 40, tram: 12 };
  const add = e => ({ ...e, ...(SIZE[e.id] && { size: SIZE[e.id] }), ...(SPEED[e.id] && { speed: SPEED[e.id] }) });
  V.things = [
    ...['watermelon', 'apple', 'orange', 'egg', 'bread', 'ball', 'book', 'pen', 'flower', 'shirt', 'cake',
      'trousers', 'shoes', 'chopsticks', 'fish'].map(id => add(Units.word(6, id))),
    ...['table', 'cat', 'dog', 'plane'].map(id => add(Units.word(5, id))),
    add(Units.word(1, 'car')),
    ...['metro', 'bus', 'minibus', 'taxi', 'tram'].map(id => add(Units.word(11, id))),
  ];

  // The family, and 我: how old and how tall.
  const FAMILY = { dad: [52, 175], mum: [50, 160], 'elder-brother': [25, 182], 'elder-sister': [23, 165],
    'younger-brother': [17, 150], 'younger-sister': [15, 140] };
  V.people = [
    ...Object.entries(FAMILY).map(([id, [age, height]]) => ({ ...Units.word(10, id), age, height })),
    { ...Units.word(3, 'ngo'), age: 20, height: 170 },
  ];

  V.measures = [Units.word(4, 'go'), ...['zek', 'bun', 'zoeng', 'tiu', 'zi', 'gaa', 'gin', 'deoi'].map(id => Units.word(5, id))];
  V.borrowed = [
    ...['nei', 'keoi', 'hai', 'm', 'aa', 'siu-siu', 'mat-je'].map(id => Units.word(3, id)),
    { ...Units.word(3, 'bin-go'), english: 'who; which one', note: 'Of things too: 邊個平啲呀？ Which one is cheaper?' },
    Units.word(3, 'ngo-dei'),
    Units.word(4, 'loeng'),
    { ...Units.word(5, 'di'), english: 'a bit (-er)', note: 'After an adjective: 平啲, a bit cheaper; 大啲, bigger.' },
    Units.word(5, 'ni'),
    ...['peng', 'gwai', 'hou'].map(id => Units.word(6, id)),
    ...['jit', 'dung', 'do', 'ding', 'sik6'].map(id => Units.word(8, id)),
    ...['gam-jat', 'kam-jat'].map(id => Units.word(9, id)),
    Units.word(4, 'gei-do'),
    ...['tung', 'seoi'].map(id => Units.word(10, id)),
    Units.word(14, 'mou'),
    { ...Units.word(15, 'gwo'), english: 'than (after an adjective)',
      note: 'Adjective + 過 + B: 西瓜貴過蘋果. The everyday spoken way to say A 比 B.' },
    ...['zung-ji', 'jau4-water'].map(id => Units.word(16, id)),
    Units.word(17, 'gam3'),
  ];
})(window.VOCAB);

// Derived: 好多 and 唔啱, ages (三歲), comparisons with 比 and 過, how much
// more, 冇…咁, 一樣, questions, 最, and sentences. Audio is generated like
// any entry; art.mjs draws the adjectives, 最 and 一樣.
(V => {
  let say = Units.sentences(V);
  V.words = [
    say('hou do', 'much; a lot (more)', { note: 'After the adjective: 貴好多, much more expensive.' }),
    say('m ngaam', 'wrong; not right'),
  ];

  // 一歲 to 九歲: how much older or younger.
  const seoi = V.borrowed.find(e => e.id === 'seoi');
  V.ages = Array.from({ length: 9 }, (_, i) => ({
    id: `y${i + 1}`, n: i + 1, ...Canto.number(i + 1, { measure: seoi }),
    english: `${i + 1} year${i ? 's' : ''}`, img: false,
  }));

  // English names: "the watermelon", "my dad", "I" (or "me" after "than").
  const byId = Object.fromEntries([...V.things, ...V.people].map(e => [e.id, e]));
  const name = id => byId[id].english.replace(/;.*/, '').replace(/ \(.*\)/, '');
  const the = (id, object) => id === 'ngo' ? (object ? 'me' : 'I')
    : V.people.includes(byId[id]) ? `my ${name(id)}` : `the ${name(id)}`;
  const PLURAL = ['shoes', 'trousers', 'chopsticks'];
  const is = id => id === 'ngo' ? 'am' : PLURAL.includes(id) ? 'are' : 'is';
  const ENGLISH = { gwai: ['more expensive', 'cheaper'], daai: ['bigger', 'smaller'], faai: ['faster', 'slower'],
    gou: ['taller', 'shorter'] };
  const OLDER = ['older', 'younger'];
  // "is bigger than" in English for scale and adjective.
  const er = (scale, adj) => {
    const s = V.scales[scale];
    const [more, less] = scale === 'age' ? OLDER : ENGLISH[s.more];
    return adj === s.more ? more : less;
  };
  const cap = s => s[0].toUpperCase() + s.slice(1);

  // A 比 B: pairs listed bigger first. Each pair gives a true sentence and
  // a false one, the same nouns with the other adjective; every other pair
  // puts the smaller first, so "less" sentences are true half the time.
  const PAIRS = {
    price: [['watermelon', 'apple'], ['shoes', 'shirt'], ['book', 'pen'], ['cake', 'flower'], ['fish', 'bread']],
    size: [['watermelon', 'orange'], ['table', 'book'], ['plane', 'car'], ['ball', 'egg'], ['bus', 'car']],
    speed: [['plane', 'bus'], ['metro', 'bus'], ['taxi', 'tram'], ['plane', 'metro'], ['minibus', 'tram']],
    height: [['elder-brother', 'ngo'], ['dad', 'mum'], ['ngo', 'younger-sister']],
    age: [['elder-sister', 'ngo'], ['ngo', 'younger-brother'], ['dad', 'mum']],
  };
  say = Units.sentences(V);
  // cmp: what the sentence compares, and whether it holds for the data.
  const cmp = (a, b, scale, adj) =>
    ({ a, b, scale, adj, holds: (byId[a][scale] > byId[b][scale]) === (adj === V.scales[scale].more) });
  const than = (a, b, scale, adj) => `${cap(the(a))} ${is(a)} ${er(scale, adj)} than ${the(b, true)}.`;
  const compare = (a, b, scale, adj) => say(`${a} bei ${b} ${adj}`, than(a, b, scale, adj), { cmp: cmp(a, b, scale, adj) });
  V.bei = Object.entries(PAIRS).flatMap(([scale, pairs]) => pairs.flatMap(([big, small], i) => {
    const [a, b] = i % 2 ? [small, big] : [big, small];
    return [compare(a, b, scale, V.scales[scale].more), compare(a, b, scale, V.scales[scale].less)];
  }));
  V.bei[0].note = 'A 比 B + adjective. No 係, and no word for "more".';

  // Adjective + 過: the everyday spoken form.
  const gwo = (a, adj, b, scale) => say(`${a} ${adj} gwo ${b}`, than(a, b, scale, adj), { cmp: cmp(a, b, scale, adj) });
  V.gwo = [
    gwo('watermelon', 'gwai', 'apple', 'price'),
    gwo('metro', 'faai', 'bus', 'speed'),
    gwo('elder-brother', 'gou', 'ngo', 'height'),
    gwo('elder-sister', 'daai', 'ngo', 'age'),
    gwo('plane', 'daai', 'car', 'size'),
  ];
  V.gwo[0].note = '貴過蘋果: "more expensive past the apple". Same meaning as 西瓜比蘋果貴.';

  // How much more: 好多, 少少 or an amount, after the adjective.
  say = Units.sentences(V);
  V.howMuch = [
    say('watermelon bei apple gwai hou-do', 'The watermelon is much more expensive than the apple.',
      { note: '好多 goes after the adjective: 貴好多.' }),
    say('cake bei flower gwai siu-siu', 'The cake is a little more expensive than the flower.',
      { note: '少少 (Unit 3): a little.' }),
    say('metro faai gwo bus hou-do', 'The MTR is much faster than the bus.'),
    say('elder-sister bei ngo daai y3', 'My older sister is three years older than me.',
      { note: 'The amount goes last: 大三歲.' }),
    say('younger-brother bei ngo sai y3', 'My younger brother is three years younger than me.'),
  ];

  // How much older or younger each brother or sister is: the question for
  // the ages round.
  V.howOld = ['elder-brother', 'elder-sister', 'younger-brother', 'younger-sister'].map(id => {
    const older = id.startsWith('elder');
    return say(`${id} bei ngo ${older ? 'daai' : 'sai'} gei-do seoi aa`,
      `How much ${older ? 'older' : 'younger'} than you is your ${name(id)}?`, { who: id });
  });
  V.howOld[0].note = '大幾多歲: "older by how many years".';

  // A 冇 B 咁 + adjective: A is not as ... as B; the first is the less one.
  const AS = { price: 'expensive', size: 'big', speed: 'fast' };
  V.notAs = ['price', 'size', 'speed'].flatMap(scale => PAIRS[scale].map(([big, small]) =>
    say(`${small} mou ${big} gam3 ${V.scales[scale].more}`,
      `${cap(the(small))} ${is(small) === 'are' ? 'aren\'t' : 'isn\'t'} as ${AS[scale]} as ${the(big)}.`, { cmp: cmp(big, small, scale, V.scales[scale].more) })));
  V.notAs[0].note = '冇 … 咁: "doesn\'t have the apple\'s so-much". The first one is the less one.';
  V.notAs.push(say('ngo mou elder-brother gam3 gou', 'I\'m not as tall as my older brother.'));

  // The same, or about the same.
  V.same = [
    say('ngo tung keoi jat-joeng gou', 'I\'m as tall as them.', { note: 'A 同 B 一樣 + adjective. 同 (Unit 10): and.' }),
    say('ngo-dei jat-joeng daai', 'We\'re the same age.', { note: '大 for age: "we\'re equally old".' }),
    say('orange tung apple caa-m-do daai', 'Oranges and apples are about the same size.'),
    say('ni loeng go jat-joeng gwai', 'These two cost the same.'),
  ];

  // Which one? 邊個 + adjective + 啲; 邊個最 + adjective; A 定 B.
  const ASK = { daai: 'bigger', sai: 'smaller', gou: 'taller', ai: 'shorter', faai: 'faster', maan: 'slower',
    gwai: 'more expensive', peng: 'cheaper' };
  const MOST = { daai: 'biggest', sai: 'smallest', gou: 'tallest', ai: 'shortest', faai: 'fastest', maan: 'slowest',
    gwai: 'most expensive', peng: 'cheapest' };
  V.which = Object.entries(ASK).map(([adj, english]) => say(`bin-go ${adj} di aa`, `Which one is ${english}?`, { adj }));
  V.which[0].note = '啲 after the adjective asks "which is more so": 大啲, a bit bigger.';
  V.most = Object.entries(MOST).map(([adj, english]) => say(`bin-go zeoi ${adj} aa`, `Which one is the ${english}?`, { adj }));
  V.most[0].note = '最 before the adjective: 最大, the biggest.';
  V.ding = [
    say('watermelon ding apple gwai di aa', 'Which is more expensive, the watermelon or the apple?',
      { note: '定 (Unit 8): or, in a question.' }),
    say('watermelon gwai di', 'The watermelon is more expensive.', { note: 'The answer: 貴啲 alone, with no 比.' }),
    say('metro ding bus faai di aa', 'Which is faster, the MTR or the bus?'),
    say('metro faai di', 'The MTR is faster.'),
  ];

  // 最 in sentences.
  V.best = [
    say('plane zeoi faai', 'The plane is the fastest.'),
    say('elder-brother zeoi gou', 'My older brother is the tallest.'),
    say('ngo zeoi zung-ji jau4-water', 'I like swimming best.', { note: '最鍾意: like the most.' }),
    say('nei zeoi zung-ji sik6 mat-je aa', 'What do you like to eat best?'),
  ];

  V.sentences = [
    say('gam-jat bei kam-jat jit', 'Today is hotter than yesterday.'),
    say('gam-jat bei kam-jat dung', 'Today is colder than yesterday.', { note: '今日 gam1, 琴日 kam4.' }),
    say('ngo bei nei gou', 'I\'m taller than you.'),
    say('ni go peng di', 'This one is cheaper.'),
    say('ngaam m ngaam aa', 'Is that right?'),
  ];

  // Read from their jyutping: 平, which the voice reads ping4, and 雞蛋
  // (daan2), as in Unit 6; 小巴, whose 小 came out low; and 魚, said jyu5
  // in these sentences. (比, 我, 冇, 巴士 and 港鐵 read from jyutping came
  // out the same as from characters, so the voice says them as written.)
  Units.phonemes(V, ['peng', 'egg', 'minibus', 'fish']);
})(window.VOCAB);
