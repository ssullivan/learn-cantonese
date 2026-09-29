/*
 * Unit 15 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), phoneme? (true:
 * tools/tts.mjs reads the jyutping exactly), plus at ([hour, minute] on a
 * 24-hour clock: when it usually happens), ing and done (the English
 * "…ing" and "has …") on activities, act (the activity) and form (zo,
 * gan, mei, ask) on their 咗 / 緊 / 未 forms, first and then (activity
 * ids, in the order they happen) on sentences saying what comes first,
 * and item (the thing tried), answers (ids: yes, no) and pic (the picture
 * that shows it) on 過 questions.
 *
 * Activities are a verb and a thing (返 + 工), so 緊, 咗 and 過 can go
 * between them (返緊工). They, their forms, the routine's times (from Unit
 * 9, made by Canto.time) and sentences are derived at the bottom of this
 * file, never typed out.
 */
Units.add(15, {
  voice: 'zh-HK-HiuMaanNeural',

  // The verbs of the day. 食 飲 睇 著 瞓 去 搭 are borrowed below.
  verbs: [
    { id: 'hei', hanzi: '起', jyutping: 'hei2', english: 'to rise; to get up', img: false },
    { id: 'caat', hanzi: '刷', jyutping: 'caat3', english: 'to brush', img: false,
      note: 'Often said caat2 too.' },
    { id: 'sai', hanzi: '洗', jyutping: 'sai2', english: 'to wash', img: false },
    { id: 'cung', hanzi: '沖', jyutping: 'cung1', english: 'to rinse; to pour water over', img: false },
    { id: 'faan', hanzi: '返', jyutping: 'faan1', english: 'to go back; to go (to work, school)', img: false,
      note: 'Where you go every day: 返工, 返學, 返屋企.' },
    { id: 'fong', hanzi: '放', jyutping: 'fong3', english: 'to let go; to finish (work, school)', img: false },
    { id: 'zyu', hanzi: '煮', jyutping: 'zyu2', english: 'to cook; to boil', img: false },
    { id: 'zou6', hanzi: '做', jyutping: 'zou6', english: 'to do; to make', img: false },
  ],

  // What they are done to. 牙 手 衫 書 飯 屋企 are borrowed below.
  things: [
    { id: 'san', hanzi: '身', jyutping: 'san1', english: 'body', img: false,
      note: 'As in 身體 (Unit 14). 起身 is "raise the body".' },
    { id: 'min', hanzi: '面', jyutping: 'min6', english: 'face', img: false,
      note: 'Also a side, as in 前面 and 對面 (Unit 11).' },
    { id: 'gung', hanzi: '工', jyutping: 'gung1', english: 'work; a job', img: false },
    { id: 'hok', hanzi: '學', jyutping: 'hok6', english: 'school; to learn', img: false },
    { id: 'zou-caan', hanzi: '早餐', jyutping: 'zou2 caan1', english: 'breakfast', img: false,
      note: '早 is early, as in 早晨 (Unit 2).' },
    { id: 'aan', hanzi: '晏', jyutping: 'aan3', english: 'lunch (in 食晏)', img: false,
      note: '晏 is midday, as in 晏晝 (Unit 9).' },
    { id: 'maan-faan', hanzi: '晚飯', jyutping: 'maan5 faan6', english: 'dinner', img: false },
    { id: 'din-si', hanzi: '電視', jyutping: 'din6 si6', english: 'television', img: false,
      note: '電 is electric, as in 電車 (Unit 11).' },
    { id: 'gaau', hanzi: '覺', jyutping: 'gaau3', english: 'a sleep', img: false,
      note: 'Read gaau3 in 瞓覺, but gok3 in 感覺 (a feeling).' },
    { id: 'je', hanzi: '嘢', jyutping: 'je5', english: 'things; stuff', img: false,
      note: 'As in 乜嘢 (Unit 3). 做嘢 is "do things": to work.' },
  ],

  grammar: [
    { id: 'gan', hanzi: '緊', jyutping: 'gan2', english: '(-ing; happening now)', img: false,
      note: 'Straight after the verb, like 咗: 食緊飯, eating.' },
    { id: 'gwo', hanzi: '過', jyutping: 'gwo3', english: '(ever; have done before)', img: false,
      note: 'Straight after the verb: 去過, have been.' },
  ],

  // How often, and what comes first.
  order: [
    { id: 'tung-soeng', hanzi: '通常', jyutping: 'tung1 soeng4', english: 'usually', img: false },
    { id: 'sin', hanzi: '先', jyutping: 'sin1', english: 'first', img: false,
      note: 'Before the verb: 我先刷牙.' },
    { id: 'jin-hau', hanzi: '然後', jyutping: 'jin4 hau6', english: 'then; after that', img: false },
    { id: 'zi-cin', hanzi: '之前', jyutping: 'zi1 cin4', english: 'before', img: false,
      note: 'After what it is before: 瞓覺之前, before bed.' },
    { id: 'zi-hau', hanzi: '之後', jyutping: 'zi1 hau6', english: 'after', img: false,
      note: 'After what it is after: 放工之後, after work.' },
  ],
});

// Borrowed: 香港 and 瞓 (unit 1), people, 乜嘢 and 呀 (unit 3), 衫 書 飯 and
// 有 (unit 5), 要 (unit 6), 蝦餃 (unit 7), 食 飲 and café food (unit 8),
// 而家 幾點 and times (unit 9), 屋企 (unit 10), 去 搭 places and transport
// (unit 11), 著 (unit 12), 涼 and 喇 (unit 13), and 牙 手 睇 每 日 咗 冇 未 (unit 14),
// with the measure words those nouns are counted with.
(V => {
  // The measure words of the borrowed nouns.
  V.measures = [
    Units.word(4, 'go'),
    ...['zek', 'bun', 'gaa', 'gin', 'bui', 'wun'].map(id => Units.word(5, id)),
    Units.word(7, 'lung'),
  ];
  V.borrowed = [
    ...['hong-kong', 'fan3'].map(id => Units.word(1, id)),
    ...['ngo', 'nei', 'keoi', 'mat-je', 'aa'].map(id => Units.word(3, id)),
    ...['shirt', 'book', 'rice', 'plane', 'jau'].map(id => Units.word(5, id)),
    Units.word(6, 'jiu'),
    Units.word(7, 'har-gow'),
    ...['sik6', 'jam2', 'milk-tea', 'yuenyeung', 'pineapple-butter', 'spam-egg-noodles'].map(id => Units.word(8, id)),
    ...['ji-gaa', 'gei', 'dim', 'sik-faan'].map(id => Units.word(9, id)),
    Units.word(10, 'home'),
    ...['heoi', 'daap', 'airport', 'hospital', 'park', 'tram', 'minibus'].map(id => Units.word(11, id)),
    Units.word(12, 'zoek'),
    ...['loeng', 'laa3'].map(id => Units.word(13, id)),
    ...['tooth', 'hand', 'tai', 'mui', 'jat6', 'zo', 'mou', 'mei'].map(id => Units.word(14, id)),
  ];
})(window.VOCAB);

// Derived: the activities and their 咗 / 緊 / 未 forms, the routine's times,
// first-and-then, 過, and sentences. Audio is generated like any entry;
// art.mjs draws each activity.
(V => {
  const pad = n => String(n).padStart(2, '0');
  let say = Units.sentences(V);

  // Each activity: its words (verb first), when it usually happens, and
  // how to say it: "to …", "…ing" (null: over in a moment, so no 緊) and
  // "has …".
  const ACT = [
    ['hei san', [7, 0], 'to get up', 'getting up', 'got up'],
    ['caat tooth', [7, 10], 'to brush your teeth', 'brushing their teeth', 'brushed their teeth'],
    ['sai min', [7, 15], 'to wash your face', 'washing their face', 'washed their face'],
    ['zoek shirt', [7, 20], 'to get dressed', 'getting dressed', 'got dressed'],
    ['sik6 zou-caan', [7, 30], 'to have breakfast', 'having breakfast', 'had breakfast'],
    ['faan hok', [8, 0], 'to go to school', 'going to school', 'gone to school'],
    ['faan gung', [8, 30], 'to go to work', 'going to work', 'gone to work'],
    ['zou6 je', [9, 0], 'to work; to do things', 'working', 'done some work'],
    ['sai hand', [12, 55], 'to wash your hands', 'washing their hands', 'washed their hands'],
    ['sik6 aan', [13, 0], 'to have lunch', 'having lunch', 'had lunch'],
    ['fong hok', [15, 30], 'to finish school', null, 'finished school'],
    ['fong gung', [18, 0], 'to finish work', null, 'finished work'],
    ['faan home', [18, 30], 'to go home', 'going home', 'gone home'],
    ['zyu rice', [18, 45], 'to cook', 'cooking', 'cooked'],
    ['sik6 maan-faan', [19, 30], 'to have dinner', 'having dinner', 'had dinner'],
    ['tai din-si', [20, 0], 'to watch TV', 'watching TV', 'watched TV'],
    ['tai book', [20, 30], 'to read', 'reading', 'read'],
    ['cung loeng', [21, 0], 'to have a shower', 'having a shower', 'had a shower'],
    ['fan3 gaau', [23, 0], 'to go to bed; to sleep', 'sleeping', 'gone to sleep'],
  ];
  const NOTE = {
    'hei-san': '"Raise the body".',
    'caat-tooth': '牙 is tooth (Unit 14).',
    'faan-gung': '返工 is in Unit 9 too: here it comes apart, 返緊工.',
    'faan-home': '屋企 is home (Unit 10).',
    'zyu-rice': '"Cook rice": cooking any meal.',
    'sik6-aan': 'Lunch is 食晏, "eat at midday". 午餐 is the written word.',
    'cung-loeng': '"Pour on cool": a shower, or a bath. 涼 is cool, as in Unit 13.',
    'fan3-gaau': '瞓 is to sleep (Unit 1); 覺 is a sleep.',
  };
  V.activities = ACT.map(([ids, at, english, ing, done]) => {
    const e = say(ids, english, { at, ing, done, img: undefined });
    return NOTE[e.id] ? { ...e, note: NOTE[e.id] } : e;
  });
  const act = Object.fromEntries(V.activities.map(a => [a.id, a]));
  // "I …": 'to brush your teeth' → 'brush my teeth'.
  const I = id => act[id].english.replace(/^to |;.*/g, '').replace('your', 'my');

  // 咗, 緊 and 未 with each: 食咗早餐 (done), 食緊早餐 (now), 未食早餐 (not
  // yet), and the question 佢食咗早餐未呀？
  say = Units.sentences(V);
  const split = a => { const [verb, ...rest] = a.words; return [verb, rest.join(' ')]; };
  V.forms = V.activities.flatMap(a => {
    const [verb, rest] = split(a);
    return [
      say(`${verb} zo ${rest}`, `${a.done} (done)`, { act: a.id, form: 'zo' }),
      a.ing && say(`${verb} gan ${rest}`, `${a.ing} (now)`, { act: a.id, form: 'gan' }),
      say(`mei ${verb} ${rest}`, `not ${a.done} yet`, { act: a.id, form: 'mei' }),
    ].filter(Boolean);
  });
  V.forms.find(f => f.form === 'gan').note = '緊 goes after the verb, inside the activity: 起緊身, not 起身緊.';
  V.asks = V.activities.map(a => {
    const [verb, rest] = split(a);
    return say(`keoi ${verb} zo ${rest} mei aa`, `Have they ${a.done} yet?`, { act: a.id, form: 'ask' });
  });

  // When: 我七點起身. The time (from Unit 9) goes before the verb.
  V.times = [...new Set(V.activities.map(a => `t${pad(a.at[0] % 12 || 12)}${pad(a.at[1])}`))].map(id => Units.word(9, id));
  say = Units.sentences(V);
  V.when = V.activities.filter(a => a.id !== 'sai-hand').map(a => {
    const [h, m] = a.at;
    return say(`ngo t${pad(h % 12 || 12)}${pad(m)} ${a.id}`, `I ${I(a.id)} at ${h % 12 || 12}:${pad(m)}.`, { act: a.id });
  });

  // What comes first: 先…然後, …之後 and …之前. first and then are in
  // the order they happen, whichever is said first.
  const then = (a, b) => say(`ngo sin ${a} jin-hau ${b}`, `First I ${I(a)}, then I ${I(b)}.`, { first: a, then: b });
  const after = (a, b) => say(`ngo ${a} zi-hau ${b}`, `After I ${I(a)}, I ${I(b)}.`, { first: a, then: b });
  const before = (a, b) => say(`ngo ${b} zi-cin ${a}`, `Before I ${I(b)}, I ${I(a)}.`, { first: a, then: b });
  V.order.push(
    { ...say('mui jat6', 'every day'), note: '每 is every (Unit 14): 每日, every day.' },
  );
  V.sequence = [
    then('hei-san', 'caat-tooth'), then('caat-tooth', 'sai-min'), then('sai-min', 'zoek-shirt'),
    then('zoek-shirt', 'sik6-zou-caan'), then('fong-gung', 'faan-home'), then('zyu-rice', 'sik6-maan-faan'),
    then('tai-din-si', 'cung-loeng'), then('cung-loeng', 'fan3-gaau'),
    after('sik6-zou-caan', 'faan-gung'), after('fong-hok', 'faan-home'), after('sik6-maan-faan', 'tai-book'), after('faan-home', 'zyu-rice'),
    before('sai-hand', 'sik6-aan'), before('caat-tooth', 'fan3-gaau'), before('zoek-shirt', 'faan-hok'), before('cung-loeng', 'fan3-gaau'),
  ];
  V.sequence[0].note = '先 first, 然後 then: in the order they happen.';
  V.sequence[8].note = '之後 comes after what happens first: 食早餐之後, after breakfast.';
  V.sequence[12].note = '之前 comes after what happens second: 食晏之前, before lunch. Listen for which one you hear.';

  // 過: ever done it? Asked 有冇…過 or …過未, answered 去過 (have), 冇去過
  // (never) or 未去過 (not yet).
  const TRIED = [
    ['heoi', 'airport', 'been to the airport'], ['heoi', 'hospital', 'been to hospital'], ['heoi', 'park', 'been to the park'],
    ['sik6', 'pineapple-butter', 'had a pineapple bun'], ['sik6', 'har-gow', 'had har gow'], ['sik6', 'spam-egg-noodles', 'had luncheon meat and egg noodles'],
    ['jam2', 'yuenyeung', 'had yuenyeung'], ['jam2', 'milk-tea', 'had milk tea'],
    ['daap', 'tram', 'been on a tram'], ['daap', 'minibus', 'been on a minibus'], ['daap', 'plane', 'been on a plane'],
  ];
  V.ever = [...new Set(TRIED.map(([verb]) => verb))].flatMap(verb => [
    say(`${verb} gwo`, 'Yes, I have.'),
    say(`mou ${verb} gwo`, 'No, never.'),
    say(`mei ${verb} gwo`, 'Not yet.'),
  ]);
  V.ever[0].note = '過 after the verb: have done it, at least once.';
  V.ever[1].note = '冇 before the verb: never have.';
  V.ever[2].note = '未 before the verb: not yet, but maybe one day.';
  V.everAsks = TRIED.flatMap(([verb, item, english]) => [
    say(`nei jau mou ${verb} gwo ${item} aa`, `Have you ever ${english}?`, { item, pic: item, answers: [`${verb}-gwo`, `mou-${verb}-gwo`] }),
    say(`nei ${verb} gwo ${item} mei aa`, `Have you ${english} yet?`, { item, pic: item, answers: [`${verb}-gwo`, `mei-${verb}-gwo`] }),
  ]);
  V.everAsks[0].note = '有冇…過: ever? Answer 去過, or 冇去過 (never).';
  V.everAsks[1].note = '…過未: yet? Answer 去過, or 未去過 (not yet).';

  say = Units.sentences(V);
  V.sentences = [
    say('nei tung-soeng gei dim hei-san aa', 'What time do you usually get up?'),
    say('ngo tung-soeng t0700 hei-san', 'I usually get up at seven.', { note: '通常 and the time both go before the verb.' }),
    say('ngo mui-jat6 t0830 faan-gung', 'I go to work at half past eight every day.'),
    say('sik-faan zi-cin jiu sai-hand', 'Wash your hands before you eat.', { note: 'No "you" needed: 要, you have to.' }),
    say('nei ji-gaa zou6 gan mat-je aa', 'What are you doing now?', { note: '做緊乜嘢: "doing what?" 緊 goes after 做.' }),
    say('keoi ji-gaa zou6 gan mat-je aa', 'What are they doing now?'),
    say('ngo sik6 gan zou-caan', 'I\'m having breakfast.'),
    say('ngo ji-gaa tai gan din-si', 'I\'m watching TV now.'),
    say('keoi fan3 gan gaau', 'They\'re asleep.', { note: '瞓緊覺: 緊 inside the activity, after the verb.' }),
    say('ngo faan gan gung', 'I\'m on my way to work.'),
    say('ngo sik6 zo zou-caan laa3', 'I\'ve had breakfast.'),
    say('ngo mei sik6 zou-caan', 'I haven\'t had breakfast yet.'),
    say('nei jau mou heoi gwo hong-kong aa', 'Have you ever been to Hong Kong?'),
    say('ngo heoi gwo hong-kong', 'I\'ve been to Hong Kong.'),
    say('ngo mou heoi gwo hong-kong', 'I\'ve never been to Hong Kong.'),
    say('ngo mei heoi gwo hong-kong', 'I haven\'t been to Hong Kong yet.', { note: '未 says you still might: not yet. 冇 says never.' }),
    say('ngo sik6 gwo pineapple-butter', 'I\'ve had a pineapple bun before.'),
    say('ngo mei daap gwo plane', 'I haven\'t been on a plane yet.'),
  ];

  // Read from their jyutping: 返 (faan2 otherwise, as in Unit 14's 好返), and
  // 著 and 喇 (Units 12, 13).
  Units.phonemes(V, ['faan', 'zoek', 'laa3']);
})(window.VOCAB);
