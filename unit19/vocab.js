/*
 * Unit 19 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word it is counted with), counted? ([one, many] English),
 * phoneme? (true: tools/tts.mjs reads the jyutping exactly), plus
 * animal (the id of the animal) on zodiac signs and 我屬… sentences, n
 * on counts, and animal, verb and can (true or false) on 會 statements
 * and 會唔會 questions.
 *
 * V.abilities lists, for each verb, the animals that clearly can and
 * clearly can't: only those are ever asked about.
 *
 * Counts, 會 sentences, questions and sentences are derived at the
 * bottom of this file, never typed out.
 */
Units.add(19, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '羊兔虎',

  // Animals new in this unit. Each has a picture. 隻 for most; 條 for long ones.
  animals: [
    { id: 'mouse', measure: 'zek', hanzi: '老鼠', jyutping: 'lou5 syu2', english: 'mouse; rat', counted: ['a mouse', 'mice'],
      note: '老 here isn\'t "old": 老鼠, 老虎.' },
    { id: 'tiger', measure: 'zek', hanzi: '老虎', jyutping: 'lou5 fu2', english: 'tiger' },
    { id: 'rabbit', measure: 'zek', hanzi: '兔仔', jyutping: 'tou3 zai2', english: 'rabbit', note: '仔: little, as in 雀仔.' },
    { id: 'dragon', measure: 'tiu', hanzi: '龍', jyutping: 'lung4', english: 'dragon',
      note: 'Long like a snake, so 一條龍. A lucky animal: dragon boats are 龍舟.' },
    { id: 'snake', measure: 'tiu', hanzi: '蛇', jyutping: 'se4', english: 'snake', note: 'Long and thin, so 一條蛇.' },
    { id: 'horse', measure: 'zek', hanzi: '馬', jyutping: 'maa5', english: 'horse', note: 'Written 一匹馬; people say 一隻馬.' },
    { id: 'sheep', measure: 'zek', hanzi: '羊', jyutping: 'joeng4', english: 'sheep; goat', counted: ['a sheep', 'sheep'],
      note: 'Both: 綿羊 is a sheep, 山羊 a goat.' },
    { id: 'monkey', measure: 'zek', hanzi: '馬騮', jyutping: 'maa5 lau1', english: 'monkey',
      note: 'The everyday word. In writing, 猴子 hau4 zi2.' },
    { id: 'pig', measure: 'zek', hanzi: '豬', jyutping: 'zyu1', english: 'pig' },
    { id: 'bird', measure: 'zek', hanzi: '雀仔', jyutping: 'zoek3 zai2', english: 'bird', note: 'Many say zoek2 zai2.' },
    { id: 'panda', measure: 'zek', hanzi: '熊貓', jyutping: 'hung4 maau1', english: 'panda', note: '"Bear cat".' },
  ],

  words: [
    { id: 'dung-mat', hanzi: '動物', jyutping: 'dung6 mat6', english: 'animal', img: false },
    { id: 'dung-mat-jyun', hanzi: '動物園', jyutping: 'dung6 mat6 jyun4', english: 'zoo', note: '"Animal garden".' },
    { id: 'bin', hanzi: '邊', jyutping: 'bin1', english: 'which', img: false,
      note: 'With a measure word: 邊隻, which one (animal).' },
    { id: 'suk', hanzi: '屬', jyutping: 'suk6', english: 'to be born in the year of', img: false,
      note: '我屬馬: I\'m a Horse.' },
    { id: 'saang-ciu', hanzi: '生肖', jyutping: 'saang1 ciu3', english: 'Chinese zodiac sign', img: false,
      note: 'Twelve animals, one for each year in turn.' },
    { id: 'nin', hanzi: '年', jyutping: 'nin4', english: 'year', img: false, note: '馬年: the year of the Horse.' },
  ],

  // What animals can do.
  verbs: [
    { id: 'fei', hanzi: '飛', jyutping: 'fei1', english: 'to fly', img: false, note: '飛機 (Unit 5) is a "flying machine".' },
    { id: 'paa-syu', hanzi: '爬樹', jyutping: 'paa4 syu6', english: 'to climb trees', img: false, note: '爬: climb; 樹: tree.' },
    { ...Units.word(8, 'zau'), english: 'to run',
      note: 'In Cantonese 走 is run (or leave); walk is 行.' },
  ],

  // Zodiac names that differ from the everyday word. The other eight are
  // the animal's own word.
  signs: [
    { id: 'z-syu', animal: 'mouse', hanzi: '鼠', jyutping: 'syu2', english: 'Rat (zodiac)', img: false, note: 'Everyday: 老鼠.' },
    { id: 'z-fu', animal: 'tiger', hanzi: '虎', jyutping: 'fu2', english: 'Tiger (zodiac)', img: false, note: 'Everyday: 老虎.' },
    { id: 'z-tou', animal: 'rabbit', hanzi: '兔', jyutping: 'tou3', english: 'Rabbit (zodiac)', img: false, note: 'Everyday: 兔仔.' },
    { id: 'z-hau', animal: 'monkey', hanzi: '猴', jyutping: 'hau4', english: 'Monkey (zodiac)', img: false, note: 'Everyday: 馬騮.' },
  ],
});

// Borrowed: animals from units 5 and 1 (貓 狗 魚 雞 牛, with their measure
// words and 一隻貓...), 隻 and 條, 我 你 係 唔 呀 乜嘢 (unit 3), 零 二 六 兩
// (unit 4), 有 (unit 5), 去 (unit 11), 會 (unit 13), 行 跳 游水 鍾意 想 (unit 16),
// and 最 比 大 快 (unit 18).
(V => {
  V.pets = ['cat', 'dog', 'fish', 'chicken', 'cow'].map(id => Units.word(5, id));
  V.pets.find(t => t.id === 'fish').counted = ['a fish', 'fish'];
  V.measures = ['zek', 'tiu'].map(id => Units.word(5, id));
  V.ones = V.pets.map(t => Units.word(5, `one-${t.id}`));
  V.verbs.push(
    Units.word(16, 'haang'),
    Units.word(16, 'tiu3'), // 跳; tiu is 條
    { ...Units.word(16, 'jau4-water'), img: false },
  );
  V.borrowed = [
    ...['ngo', 'nei', 'hai', 'm', 'aa', 'mat-je'].map(id => Units.word(3, id)),
    Units.word(5, 'jau'),
    ...['n0', 'n2', 'n6', 'loeng'].map(id => Units.word(4, id)),
    Units.word(11, 'heoi'),
    { ...Units.word(13, 'wui'), english: 'can; will',
      note: 'What an animal can do: 雀仔會飛. For a skill you learned, 識 (Unit 16) works too.' },
    ...['zung-ji', 'soeng'].map(id => Units.word(16, id)),
    ...['zeoi', 'bei', 'daai6', 'faai'].map(id => Units.word(18, id)),
  ];
})(window.VOCAB);

// Derived: 一隻老虎, counts, 邊隻, the zodiac, 會 and 會唔會, and sentences.
// Audio is generated like any entry; art.mjs draws the animals and the zoo.
(V => {
  const byId = Units.byId(V);
  const one = t => t.counted?.[0] ?? `a ${t.english.replace(/;.*/, '')}`;
  const many = t => t.counted?.[1] ?? `${t.english.replace(/;.*/, '')}s`;
  const count = (n, t) => {
    const { hanzi, jyutping } = Canto.number(n, { measure: byId[t.measure] });
    return { id: `${n === 1 ? 'one' : `n${n}`}-${t.id}`, thing: t.id, n, hanzi: hanzi + t.hanzi, jyutping: `${jyutping} ${t.jyutping}`,
      english: n === 1 ? one(t) : `${n} ${many(t)}`, img: false };
  };
  // 一隻老虎 for Measures.round, and a count from 2 to 7 for each animal.
  V.ones.push(...V.animals.map(t => count(1, t)));
  V.counts = V.animals.map((t, i) => count(2 + i % 6, t));

  let say = Units.sentences(V);
  V.which = [
    say('bin zek', 'which one (animal)', { note: '邊 + measure word: 邊隻老虎? Which tiger?' }),
    say('bin tiu', 'which one (long animal)'),
  ];

  // The zodiac in order, from the Rat. `animal` is the picture it goes with.
  const ZODIAC = ['z-syu', 'cow', 'z-fu', 'z-tou', 'dragon', 'snake', 'horse', 'sheep', 'z-hau', 'chicken', 'dog', 'pig'];
  const ZODIAC_EN = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  say = Units.sentences(V);
  V.zodiac = ZODIAC.map((id, i) => say(`ngo suk ${id}`, `I'm ${/^[AEIOU]/.test(ZODIAC_EN[i]) ? 'an' : 'a'} ${ZODIAC_EN[i]}.`,
    { animal: byId[id].animal ?? id, order: i + 1 }));
  V.zodiac[0].note = '屬 + the zodiac animal. The zodiac says 鼠, not 老鼠.';

  // 會: what an animal can do, and what it can't. Only clear cases.
  V.abilities = {
    fei: { can: ['bird'], cant: ['pig', 'tiger', 'rabbit', 'snake', 'fish', 'dog'] },
    'jau4-water': { can: ['fish', 'dog', 'tiger', 'snake'], cant: [] },
    'paa-syu': { can: ['monkey', 'cat', 'panda'], cant: ['fish', 'pig', 'cow', 'horse'] },
    haang: { can: ['dog', 'chicken', 'panda', 'horse', 'mouse'], cant: ['fish', 'snake'] },
    tiu3: { can: ['rabbit', 'monkey', 'cat', 'horse'], cant: ['snake'] },
    zau: { can: ['horse', 'dog', 'tiger', 'rabbit'], cant: ['fish', 'snake'] },
  };
  const verb = v => byId[v].english.replace(/^to /, '');
  const Many = a => { const s = many(byId[a]); return s[0].toUpperCase() + s.slice(1); };
  say = Units.sentences(V);
  V.asks = Object.entries(V.abilities).flatMap(([v, { can, cant }]) =>
    [...can.map(a => [a, true]), ...cant.map(a => [a, false])].map(([a, yes]) =>
      say(`${a} wui m wui ${v} aa`, `Can ${many(byId[a])} ${verb(v)}?`, { animal: a, verb: v, can: yes })));
  V.asks[0].note = '會唔會: can it or not? Answer 會 or 唔會.';
  V.answers = [say('m wui', 'can\'t; won\'t', { note: 'The answer "no" to 會唔會.' })];
  V.whichCan = Object.entries(V.abilities).filter(([, { cant }]) => cant.length)
    .map(([v]) => say(`bin zek wui ${v} aa`, `Which one can ${verb(v)}?`, { verb: v }));
  V.can = [
    ['bird', 'fei'], ['fish', 'jau4-water'], ['monkey', 'paa-syu'], ['rabbit', 'tiu3'], ['tiger', 'jau4-water'], ['horse', 'zau'],
  ].map(([a, v]) => say(`${a} wui ${v}`, `${Many(a)} can ${verb(v)}.`, { animal: a, verb: v, can: true }));
  V.can[0].note = '會 + verb: can. No 係.';
  V.cant = [['fish', 'haang'], ['pig', 'fei'], ['snake', 'zau']].map(([a, v]) =>
    say(`${a} m wui ${v}`, `${Many(a)} can't ${verb(v)}.`, { animal: a, verb: v, can: false }));

  V.sentences = [
    say('dung-mat-jyun jau panda', 'The zoo has pandas.', { note: '有: there is, there are.' }),
    say('ngo soeng heoi dung-mat-jyun', 'I want to go to the zoo.'),
    say('ngo zeoi zung-ji panda', 'I like pandas best.', { note: '最鍾意 (Unit 18): like best.' }),
    say('nei zeoi zung-ji mat-je dung-mat aa', 'Which animal do you like best?', { note: '乜嘢 + noun: which, what kind of.' }),
    say('tiger bei cat daai6', 'Tigers are bigger than cats.', { note: 'A 比 B + adjective (Unit 18).' }),
    say('horse bei pig faai', 'Horses are faster than pigs.'),
    say('nei suk mat-je aa', 'What\'s your zodiac sign?', { note: '"You belong to what?"' }),
    say('n2 n0 n2 n6 nin hai horse nin', '2026 is the year of the Horse.', { note: 'Years are read digit by digit: 二零二六年. 2027 is the Goat, 羊年.' }),
    say('dung-mat-jyun jau loeng zek panda', 'The zoo has two pandas.'),
  ];

  // Read from their jyutping: 魚 (said jyu2 otherwise), 行 (haang4, not
  // hong4), 雀仔 (zoek2 otherwise) and 馬騮; and so every count of those
  // animals. (會 and 隻 read that way came out the same as from characters.)
  Units.phonemes(V, ['fish', 'haang', 'bird', 'monkey']);
  for (const e of [...V.ones, ...V.counts]) if (!e.unit && byId[e.thing].phoneme) e.phoneme = true;
})(window.VOCAB);
