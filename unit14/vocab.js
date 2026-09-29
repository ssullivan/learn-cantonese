/*
 * Unit 14 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
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

  // Body parts. 隻 for one of a pair (and teeth), 個 for the rest, 條 for
  // the long throat.
  body: [
    { id: 'body', hanzi: '身體', jyutping: 'san1 tai2', english: 'body; health',
      note: 'Also your health: 身體好 is being healthy.' },
    { id: 'head', measure: 'go', hanzi: '頭', jyutping: 'tau4', english: 'head' },
    { id: 'eye', measure: 'zek', hanzi: '眼', jyutping: 'ngaan5', english: 'eye',
      note: 'As in 眼鏡, glasses (Unit 12).' },
    { id: 'ear', measure: 'zek', hanzi: '耳仔', jyutping: 'ji5 zai2', english: 'ear',
      note: '仔 makes it small and friendly, as in 雀仔 (little bird).' },
    { id: 'nose', measure: 'go', hanzi: '鼻', jyutping: 'bei6', english: 'nose',
      note: 'Also 鼻哥 bei6 go1.' },
    { id: 'mouth', hanzi: '口', jyutping: 'hau2', english: 'mouth' },
    { id: 'tooth', measure: 'zek', hanzi: '牙', jyutping: 'ngaa4', english: 'tooth; teeth' },
    { id: 'throat', measure: 'tiu', hanzi: '喉嚨', jyutping: 'hau4 lung4', english: 'throat',
      note: 'Long and thin, so 條: 我條喉嚨.' },
    { id: 'hand', measure: 'zek', hanzi: '手', jyutping: 'sau2', english: 'hand; arm',
      note: 'The whole arm, too.' },
    { id: 'foot', measure: 'zek', hanzi: '腳', jyutping: 'goek3', english: 'foot; leg',
      note: 'The whole leg, too.' },
    { id: 'stomach', measure: 'go', hanzi: '肚', jyutping: 'tou5', english: 'stomach; belly' },
    { id: 'back', hanzi: '背脊', jyutping: 'bui3 zek3', english: 'back',
      note: '脊 is zek3 in speech.' },
  ],

  health: [
    { id: 'tung', hanzi: '痛', jyutping: 'tung3', english: 'to hurt; pain', img: false,
      note: 'After the body part: 頭痛, a headache.' },
    { id: 'ji-sang', hanzi: '醫生', jyutping: 'ji1 sang1', english: 'doctor',
      note: '醫 as in 醫院, hospital (Unit 11).' },
    { id: 'tai', hanzi: '睇', jyutping: 'tai2', english: 'to look at; to see', img: false,
      note: 'Also to read or watch: 睇書, 睇戲.' },
    { id: 'joek', hanzi: '藥', jyutping: 'joek6', english: 'medicine',
      note: 'You "eat" medicine: 食藥, even a syrup.' },
    { id: 'cold', hanzi: '感冒', jyutping: 'gam2 mou6', english: 'a cold; the flu', img: false,
      note: 'Catching one takes 咗: 我感冒咗.' },
    { id: 'lau', hanzi: '流', jyutping: 'lau4', english: 'to flow; to run', img: false },
    { id: 'syu-fuk', hanzi: '舒服', jyutping: 'syu1 fuk6', english: 'comfortable; well', img: false,
      note: '唔舒服: unwell, not feeling good.' },
    { id: 'jau-sik', hanzi: '休息', jyutping: 'jau1 sik1', english: 'to rest' },
    { id: 'hou-faan', hanzi: '好返', jyutping: 'hou2 faan1', english: 'to get better', img: false,
      note: '返 is "back": good again.' },
    { id: 'bou-zung', hanzi: '保重', jyutping: 'bou2 zung6', english: 'take care!', img: false },
    { id: 'zou', hanzi: '早', jyutping: 'zou2', english: 'early; soon', img: false,
      note: 'As in 早晨 (Unit 2), "early morning".' },
  ],

  // What's wrong. 流鼻水 is made at the bottom of this file.
  symptoms: [
    { id: 'fever', hanzi: '發燒', jyutping: 'faat3 siu1', english: 'to have a fever',
      note: 'Literally "put out heat".' },
    { id: 'cough', hanzi: '咳', jyutping: 'kat1', english: 'to cough',
      note: 'Also 咳嗽 kat1 sau3.' },
  ],

  grammar: [
    { id: 'zo', hanzi: '咗', jyutping: 'zo2', english: '(done; has happened)', img: false,
      note: 'Straight after the verb: 食咗藥, took the medicine.' },
    { id: 'mou', hanzi: '冇', jyutping: 'mou5', english: 'not have; there isn\'t', img: false,
      note: 'The opposite of 有. Never 唔有.' },
    { id: 'mei', hanzi: '未', jyutping: 'mei6', english: 'not yet', img: false,
      note: 'Asks "yet?" at the end: 食咗未呀？ Answers "not yet" on its own.' },
  ],

  // Counting doses: 一日三次，每次兩粒.
  counting: [
    { id: 'jat6', hanzi: '日', jyutping: 'jat6', english: 'day (counted)', img: false,
      note: 'Counted without a measure word: 一日, 兩日.' },
    { id: 'ci', hanzi: '次', jyutping: 'ci3', english: 'time(s); occasion', img: false,
      note: 'Counts how often: 三次, three times.' },
    { id: 'nap', hanzi: '粒', jyutping: 'nap1', english: 'for pills, sweets, grains', img: false,
      note: 'A measure word for small round things: 兩粒藥.' },
    { id: 'mui', hanzi: '每', jyutping: 'mui5', english: 'every; each', img: false },
  ],
});

// Borrowed: 水 (unit 1), people, 唔 and 呀 (unit 3), 個 (unit 4), 有 啲 隻 條
// 碗 and 飯 (unit 5), 要 and 好 (unit 6), 食 飲 and 多 (unit 8), 今日 (unit 9),
// 醫院 去 邊度 (unit 11), and 啦 有啲 (unit 13).
(V => {
  V.measures = [
    Units.word(4, 'go'),
    { ...Units.word(5, 'zek'), english: 'for animals; one of a pair', note: 'One hand, one eye, one ear, one foot: 一隻手. And teeth.' },
    { ...Units.word(5, 'tiu'), note: 'For long, thin things: 一條褲, and 條喉嚨.' },
    Units.word(5, 'wun'),
  ];
  V.borrowed = [
    Units.word(1, 'water'),
    ...['ngo', 'nei', 'keoi', 'm', 'aa'].map(id => Units.word(3, id)),
    ...['jau', 'di', 'rice'].map(id => Units.word(5, id)),
    ...['jiu', 'hou'].map(id => Units.word(6, id)),
    ...['sik6', 'jam2', 'do'].map(id => Units.word(8, id)),
    Units.word(9, 'gam-jat'),
    ...['hospital', 'heoi', 'bin-dou'].map(id => Units.word(11, id)),
    ...['laa1', 'jau-di'].map(id => Units.word(13, id)),
  ];
})(window.VOCAB);

// Derived: aches, 我隻手, what's wrong, the doctor's questions and their
// answers, prescriptions and sentences. Audio is generated like any entry;
// art.mjs draws the aches and prescriptions.
(V => {
  const byId = Object.fromEntries(Object.values(V).filter(Array.isArray).flat().map(e => [e.id, e]));
  let say = Units.sentences(V);

  // 頭痛: the part, then 痛.
  const ACHE = { head: 'a headache', eye: 'sore eyes', ear: 'an earache', tooth: 'a toothache', throat: 'a sore throat',
    hand: 'a sore hand', foot: 'a sore foot', stomach: 'a stomach ache', back: 'a backache' };
  V.aches = Object.entries(ACHE).map(([part, english]) => say(`${part} tung`, english, { part, img: undefined }));
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
  const ASK = { fever: 'a fever', cough: 'a cough', 'lau-nose-water': 'a runny nose', 'head-tung': 'a headache', 'throat-tung': 'a sore throat', 'stomach-tung': 'a stomach ache' };
  V.asks = Object.entries(ASK).map(([s, english]) => say(`nei jau mou ${s} aa`, `Do you have ${english}?`, { about: s, answers: ['jau', 'mou'] }));
  V.asks[0].note = 'Answer 有 (yes) or 冇 (no).';

  // Asked about things to do (休息 too), answered 食咗, 睇咗... or 未.
  const todo = [...V.todo, byId['jau-sik']];
  const DONE = { sik6: 'Yes, I have (eaten it).', tai: 'Yes, I have (seen them).', jam2: 'Yes, I have (drunk it).', 'jau-sik': 'Yes, I have (rested).' };
  V.done = Object.entries(DONE).map(([verb, english]) => say(`${verb} zo`, english));
  V.done[0].note = 'Answer with the verb and 咗, or 未 for "not yet".';
  V.asks.push(...todo.map(t => {
    const [verb, ...rest] = t.words ?? [t.id];
    return say(['nei', verb, 'zo', ...rest, 'mei', 'aa'].join(' '), `Have you ${{
      'sik6-joek': 'taken your medicine', 'tai-ji-sang': 'seen a doctor', 'jam2-water': 'drunk some water', 'sik6-rice': 'eaten', 'jau-sik': 'rested',
    }[t.id]} yet?`, { about: t.id, answers: [`${verb}-zo`, 'mei'] });
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
    say('nei bin-dou tung aa', 'Where does it hurt?'),
    say('ngo head-tung', 'I have a headache.'),
    say('ngo go head hou tung', 'My head really hurts.', { note: '我個頭: the measure word says whose, as in Unit 10.' }),
    say('ngo zek foot hou tung', 'My foot really hurts.'),
    say('ngo tiu throat hou tung', 'My throat is really sore.'),
    say('ngo jau-di fever', 'I have a bit of a fever.'),
    say('ngo cold zo', 'I\'ve caught a cold.', { note: '咗: it has happened.' }),
    say('ngo mou fever', 'I don\'t have a fever.', { note: '冇 before a verb: "didn\'t", "don\'t".' }),
    say('ngo sik6 zo joek', 'I\'ve taken my medicine.', { note: '咗 right after the verb: 食咗藥, not 食藥咗.' }),
    say('ngo mei sik6 joek', 'I haven\'t taken my medicine yet.', { note: '未 before the verb: not yet.' }),
    say('ngo gam-jat tai zo ji-sang', 'I saw a doctor today.'),
    say('nei jiu sik6 joek', 'You need to take medicine.'),
    say('nei jiu do di jau-sik', 'You need to rest more.', { note: '多啲 before the verb: more.' }),
    say('ngo jiu heoi hospital', 'I need to go to hospital.'),
    say('zou di hou-faan laa1', 'Get well soon!', { note: '"Get better a bit sooner".' }),
  ];

  // 返 is faan2 in writing; the voice reads it that way unless told.
  Units.phonemes(V, ['hou-faan', 'laa1']);
})(window.VOCAB);
