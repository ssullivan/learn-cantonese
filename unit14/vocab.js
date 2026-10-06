/*
 * Unit 14 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 14 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word it is counted with), phoneme? (true: tools/tts.mjs
 * reads the jyutping exactly), plus part (the body part) on aches (頭痛),
 * about (the symptom or thing to do asked about) and answers (ids: yes,
 * no) on the doctor's questions, pic (the picture that shows it) on
 * things to do, and times and pills on prescriptions.
 *
 * Aches, questions, answers, prescriptions (from Canto.number) and
 * sentences are derived at the bottom of this file, never typed out.
 */
Units.add(14, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '口耳身',

  // Body parts. 隻 for one of a pair (and teeth), 個 for the rest, 條 for
  // the long throat.
  body: [
    ...Words.list('body head eye ear nose mouth tooth throat hand foot stomach back'),
  ],

  health: [
    ...Words.list('tung3 ji-sang tai joek cold lau syu-fuk jau-sik hou-faan bou-zung zou'),
  ],

  // What's wrong. 流鼻水 is made at the bottom of this file.
  symptoms: [
    ...Words.list('fever cough'),
  ],

  grammar: [
    ...Words.list('zo2 mou mei'),
  ],

  // Counting doses: 一日三次，每次兩粒.
  counting: [
    ...Words.list('jat6 ci nap mui'),
  ],
});

// Borrowed: 水 (unit 1), people, 唔 and 呀 (unit 3), 個 (unit 4), 有 啲 隻 條
// 碗 and 飯 (unit 5), 要 and 好 (unit 6), 食 飲 and 多 (unit 8), 今日 (unit 9),
// 醫院 去 邊度 (unit 11), and 啦 有啲 (unit 13).
(V => {
  V.measures = [
    Words.get('go'),
    { ...Words.get('zek'), english: 'for animals; one of a pair', note: 'One hand, one eye, one ear, one foot: 一隻手. And teeth.' },
    { ...Words.get('tiu'), note: 'For long, thin things: 一條褲, and 條喉嚨.' },
    Words.get('wun'),
  ];
  V.borrowed = [
    Words.get('water'),
    ...Words.list('ngo nei keoi m aa'),
    ...Words.list('jau di rice'),
    ...Words.list('jiu hou'),
    ...Words.list('sik6 jam2 do'),
    Words.get('gam-jat'),
    ...Words.list('hospital heoi bin-dou'),
    ...['laa1', 'jau-di'].map(id => Units.word(13, id)),
  ];
})(window.VOCAB);

// Derived: aches, 我隻手, what's wrong, the doctor's questions and their
// answers, prescriptions and sentences. Audio is generated like any entry;
// art.mjs draws the aches and prescriptions.
(V => {
  const byId = Units.byId(V);
  let say = Units.sentences(V);

  // 頭痛: the part, then 痛.
  const ACHE = { head: 'a headache', eye: 'sore eyes', ear: 'an earache', tooth: 'a toothache', throat: 'a sore throat',
    hand: 'a sore hand', foot: 'a sore foot', stomach: 'a stomach ache', back: 'a backache' };
  V.aches = Object.entries(ACHE).map(([part, english]) => say(`${part} tung3`, english, { part, img: undefined }));
  V.aches[0].note = 'The body part, then 痛: 頭痛. No word for "have".';

  // What else is wrong: 流鼻水 (a runny nose) with 發燒 and 咳.
  V.symptoms.push(say('lau nose water', 'a runny nose', { img: undefined, note: '"Nose water flows".' }));

  // My hand, my head: person + measure word + part, as in Unit 10.
  V.mine = V.body.filter(e => e.measure).map(e => say(`ngo ${e.measure} ${e.id}`, `my ${e.english.replace(/;.*/, '')}`, { thing: e.id }));

  // Things to do (pic: the picture that shows it), and more phrases.
  V.todo = [
    say('sik6 joek', 'to take medicine', { pic: 'joek' }),
    say('tai ji-sang', 'to see a doctor', { pic: 'ji-sang', note: '"Look at the doctor".' }),
    say('jam2 water', 'to drink water', { pic: 'water' }),
    say('sik6 rice', 'to eat; to have a meal', { pic: 'rice', note: '"Eat rice": any meal.' }),
  ];
  V.phrases = [
    say('m syu-fuk', 'unwell', { note: 'Not comfortable: 我唔舒服, I don\'t feel well.' }),
    // Said as a phrase: asked, 冇 rises like mou2.
    say('jau mou', 'have or not?', { say: '有冇', note: '有 + 冇, like A唔A in Unit 3: 有冇發燒呀？' }),
  ];

  // The doctor asks 有冇 (有 or 冇), and 咗未 (done, or 未).
  say = Units.sentences(V);
  const ASK = { fever: 'a fever', cough: 'a cough', 'lau-nose-water': 'a runny nose', 'head-tung3': 'a headache', 'throat-tung3': 'a sore throat', 'stomach-tung3': 'a stomach ache' };
  V.asks = Object.entries(ASK).map(([s, english]) => say(`nei jau mou ${s} aa`, `Do you have ${english}?`, { about: s, answers: ['jau', 'mou'] }));
  V.asks[0].note = 'Answer 有 (yes) or 冇 (no).';

  // Asked about things to do (休息 too), answered 食咗, 睇咗... or 未.
  const todo = [...V.todo, byId['jau-sik']];
  const DONE = { sik6: 'Yes, I have (eaten it).', tai: 'Yes, I have (seen them).', jam2: 'Yes, I have (drunk it).', 'jau-sik': 'Yes, I have (rested).' };
  V.done = Object.entries(DONE).map(([verb, english]) => say(`${verb} zo2`, english));
  V.done[0].note = 'Answer with the verb and 咗, or 未 for "not yet".';
  V.asks.push(...todo.map(t => {
    const [verb, ...rest] = t.words ?? [t.id];
    return say(['nei', verb, 'zo2', ...rest, 'mei', 'aa'].join(' '), `Have you ${{
      'sik6-joek': 'taken your medicine', 'tai-ji-sang': 'seen a doctor', 'jam2-water': 'drunk some water', 'sik6-rice': 'eaten', 'jau-sik': 'rested',
    }[t.id]} yet?`, { about: t.id, answers: [`${verb}-zo2`, 'mei'] });
  }));
  V.asks.find(q => q.about === 'sik6-rice').note = 'Also a greeting: "have you eaten?" means "how are you?"';

  // 一日三次，每次兩粒: how often, and how many pills.
  const day = Canto.number(1, { measure: byId.jat6 });
  V.rx = [2, 3, 4].flatMap(times => [1, 2].map(pills => {
    const t = Canto.number(times, { measure: byId.ci }), p = Canto.number(pills, { measure: byId.nap });
    return { id: `rx-${times}-${pills}`, times, pills,
      hanzi: `${day.hanzi}${t.hanzi}，${byId.mui.hanzi}${byId.ci.hanzi}${p.hanzi}`,
      jyutping: `${day.jyutping} ${t.jyutping} ${byId.mui.jyutping} ${byId.ci.jyutping} ${p.jyutping}`,
      english: `${times} times a day, ${pills} pill${pills > 1 ? 's' : ''} each time` };
  }));
  V.rx[0].note = 'How often, then how many: 一日兩次 (twice a day), 每次一粒 (one pill each time).';

  say = Units.sentences(V);
  V.sentences = [
    say('nei bin-dou m syu-fuk aa', 'What\'s wrong?', { note: '"Where are you unwell?": what a doctor asks.' }),
    say('nei bin-dou tung3 aa', 'Where does it hurt?'),
    say('ngo head-tung3', 'I have a headache.'),
    say('ngo go head hou tung3', 'My head really hurts.', { note: '我個頭: the measure word says whose, as in Unit 10.' }),
    say('ngo zek foot hou tung3', 'My foot really hurts.'),
    say('ngo tiu throat hou tung3', 'My throat is really sore.'),
    say('ngo jau-di fever', 'I have a bit of a fever.'),
    say('ngo cold zo2', 'I\'ve caught a cold.', { note: '咗: it has happened.' }),
    say('ngo mou fever', 'I don\'t have a fever.', { note: '冇 before a verb: "didn\'t", "don\'t".' }),
    say('ngo sik6 zo2 joek', 'I\'ve taken my medicine.', { note: '咗 right after the verb: 食咗藥, not 食藥咗.' }),
    say('ngo mei sik6 joek', 'I haven\'t taken my medicine yet.', { note: '未 before the verb: not yet.' }),
    say('ngo gam-jat tai zo2 ji-sang', 'I saw a doctor today.'),
    say('nei jiu sik6 joek', 'You need to take medicine.'),
    say('nei jiu do di jau-sik', 'You need to rest more.', { note: '多啲 before the verb: more.' }),
    say('ngo jiu heoi hospital', 'I need to go to hospital.'),
    say('zou di hou-faan laa1', 'Get well soon!', { note: '"Get better a bit sooner".' }),
  ];

  // 返 is faan2 in writing; the voice reads it that way unless told.
  Units.phonemes(V, ['hou-faan', 'laa1']);
})(window.VOCAB);
