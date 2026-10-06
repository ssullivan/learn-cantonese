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
    ...Words.list('mouse tiger rabbit dragon snake horse sheep monkey pig bird panda'),
  ],

  words: [
    ...Words.list('dung-mat dung-mat-jyun bin suk saang-ciu nin'),
  ],

  // What animals can do.
  verbs: [
    ...Words.list('fei paa-syu'),
    { ...Units.word(8, 'zau'), english: 'to run',
      note: 'In Cantonese 走 is run (or leave); walk is 行.' },
  ],

  // Zodiac names that differ from the everyday word. The other eight are
  // the animal's own word.
  signs: [
    { ...Words.get('z-syu'), animal: 'mouse' },
    { ...Words.get('z-fu'), animal: 'tiger' },
    { ...Words.get('z-tou'), animal: 'rabbit' },
    { ...Words.get('z-hau'), animal: 'monkey' },
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
  for (const e of [...V.ones, ...V.counts]) if (Units.teaches(V, e) && byId[e.thing].phoneme) e.phoneme = true;
})(window.VOCAB);
