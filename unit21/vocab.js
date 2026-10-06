/*
 * Unit 21 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 21 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word it is counted with), phoneme? (true: tools/tts.mjs
 * reads the jyutping exactly), plus task (the id of what it is used
 * for) on appliances, tool (the appliance's id) on tasks, uses and
 * questions, and mins (minutes) on durations and how-long sentences.
 *
 * Tasks are a verb and a thing (煲 + 水), like Unit 16's hobbies. They,
 * durations (Canto.number with 分鐘) and sentences are derived at the
 * bottom of this file, never typed out.
 */
Units.add(21, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '用入電',

  // Appliances. Each has a picture.
  appliances: [
    ...Words.list('fridge microwave oven'),
    // Read from jyutping: from characters, 煤 sounds like mui6.
    ...Words.list('stove rice-cooker kettle toaster dishwasher'),
  ],

  words: [
    ...Words.list('kitchen din-hei gei-noi fan-zung'),
  ],

  // Kitchen verbs. 煮 洗 放 焗 開 are borrowed below.
  verbs: [
    ...Words.list('jung ding1 bou1 caau2 zing2 jap6 lo2 saan1 waai6'),
  ],

  // Measure words. 個 is borrowed below.
  measures: [
    Words.get('bou6'),
  ],
});

// Borrowed: 水 (unit 1), 我 你 唔 乜嘢 呀 (unit 3), 個 (unit 4), 飯 蛋糕 碗
// 啲 有 (unit 5), 橙 要 (unit 6), 焗 (unit 7), 多士 and 熱 凍 (unit 8), six
// o'clock (unit 9), 屋企 (unit 10), 出 嚟 (unit 11), 雪 (unit 13), 咗 冇
// 未 (unit 14), 煮 洗 放 (unit 15) and 開 (unit 17). Food is borrowed
// without its measure word.
(V => {
  const food = id => ({ ...Words.get(id), measure: undefined });
  V.measures.push(Words.get('go'));
  V.food = ['rice', 'cake', 'orange', 'toast'].map(food);
  V.borrowed = [
    Words.get('water'),
    ...Words.list('ngo nei m mat-je aa'),
    { ...Words.get('wun'), english: 'a bowl; the dishes', note: '洗碗 is washing up: bowls, plates and all.' },
    ...Words.list('di jau'),
    Words.get('jiu'),
    { ...Words.get('baked'), english: 'to bake' },
    ...Words.list('jit dung'),
    Units.word(9, 't0600'),
    Words.get('home'),
    { ...Words.get('ceot'), english: 'out' },
    Words.get('lai'),
    { ...Words.get('syut'), english: 'to chill; snow', note: 'Snow (Unit 13), as a verb: 雪凍, chill in the fridge.' },
    ...Words.list('zo2 mou mei'),
    Words.get('zyu2'),
    Words.get('sai'),
    { ...Words.get('fong'), english: 'to put; to let go' },
    { ...Words.get('hoi'), english: 'to open; to turn on', note: '開雪櫃 opens the fridge; 開焗爐 turns the oven on.' },
  ];
})(window.VOCAB);

// Derived: what each appliance is for, 用 + appliance + verb, how long
// (叮兩分鐘), in and out, on and off, and sentences. Audio is generated
// like any entry.
(V => {
  let say = Units.sentences(V);

  // What each appliance is for: a verb and a thing.
  const TASK = [
    ['microwave', 'ding1 jit di rice', 'heat up the rice'],
    ['fridge', 'syut dung di orange', 'chill the oranges'],
    ['kettle', 'bou1 water', 'boil water'],
    ['rice-cooker', 'bou1 rice', 'cook rice'],
    ['oven', 'baked cake', 'bake a cake'],
    ['toaster', 'zing2 toast', 'make toast'],
    ['dishwasher', 'sai wun', 'wash the dishes'],
    ['stove', 'caau2 coi', 'stir-fry vegetables'],
  ];
  // 菜 from Unit 20, for 炒菜.
  V.borrowed.push(Words.get('coi'));
  say = Units.sentences(V);
  V.tasks = TASK.map(([tool, ids, english]) => say(ids, `to ${english}`, { tool }));
  V.tasks[0].note = '叮熱: microwave until hot.';
  V.tasks[1].note = '雪凍: chill until cold, like snow.';
  for (const a of V.appliances) a.task = V.tasks.find(t => t.tool === a.id).id;

  // 用 + appliance + verb: 我用水煲煲水.
  say = Units.sentences(V);
  const base = t => t.english.replace(/^to /, '');
  V.uses = V.tasks.filter(t => t.tool !== 'fridge').map(t =>
    say(`ngo jung ${t.tool} ${t.words.join(' ')}`, `I use the ${Units.byId(V)[t.tool].english} to ${base(t)}.`, { tool: t.tool }));
  V.uses[0].note = '用 + the thing you use comes before the verb.';
  // 用乜嘢煲水呀？
  V.asks = V.tasks.map(t => say(`jung mat-je ${t.words.join(' ')} aa`, `What do you use to ${base(t)}?`, { tool: t.tool }));
  // Read from jyutping: from characters, 飯 before 呀 sounds like faan2.
  V.asks[0].phoneme = true;

  // How long: 一分鐘 to 三十分鐘, after the verb.
  const MINS = [1, 2, 3, 5, 10, 15, 20, 30];
  V.minutes = MINS.map(n => ({
    id: `mins${n}`, mins: n, ...Canto.number(n, { measure: Units.byId(V)['fan-zung'] }),
    english: `${n} minute${n > 1 ? 's' : ''}`, img: false,
  }));
  say = Units.sentences(V);
  const HOW_LONG = [
    ['jung microwave ding1', 'Microwave it for', [1, 2, 3, 5]],
    ['jung oven baked', 'Bake it in the oven for', [10, 15, 20, 30]],
    ['caau2', 'Stir-fry it for', [2, 3, 5]],
  ];
  V.howLong = HOW_LONG.flatMap(([ids, english, mins]) => mins.map(n =>
    say(`${ids} mins${n}`, `${english} ${V.minutes.find(m => m.mins === n).english}.`, { mins: n })));
  V.howLong[0].note = 'How long goes after the verb: 叮 + 一分鐘.';
  V.howLong.push(
    say('jiu ding1 gei-noi aa', 'How long does it need in the microwave?', { note: '幾耐 goes where the answer will: after the verb.' }),
    say('ngo t0600 bou1 rice', 'I cook the rice at six.', { note: 'When goes before the verb (Unit 9); how long goes after it.' }),
  );

  // In and out, on and off.
  V.inOut = [
    say('fong di orange jap6 fridge', 'Put the oranges in the fridge.', { note: '放 + thing + 入 + place: put it into.' }),
    say('lo2 di orange ceot lai', 'Take the oranges out.', { note: '出嚟: out, towards the speaker.' }),
    say('fong go cake jap6 oven', 'Put the cake in the oven.'),
    say('hoi fridge', 'Open the fridge.'),
    say('hoi oven', 'Turn the oven on.', { note: '開 is open, and turn on.' }),
    say('saan1 stove', 'Turn off the gas stove.', { note: '閂 is close, and turn off.' }),
    say('saan1 zo2 stove mei aa', 'Have you turned off the gas stove?', { note: '咗…未呀？ (Unit 14): done yet?' }),
  ];

  V.sentences = [
    say('fridge waai6 zo2', 'The fridge is broken.', { note: '壞咗: it has broken.' }),
    say('ngo home mou oven', 'There\'s no oven at my home.', { note: 'Many Hong Kong flats have no oven: a 多士爐 or 微波爐 does instead.' }),
    // Read from jyutping: from characters, 有 sounds like jau3.
    say('kitchen jau mou dishwasher aa', 'Is there a dishwasher in the kitchen?', { note: '有冇 (Unit 14): is there?', phoneme: true }),
    say('nei jung m jung microwave aa', 'Do you use the microwave?', { note: 'A唔A, as in Unit 3: 用唔用.' }),
  ];

  // One of them: 一部雪櫃, 一個水煲.
  const byId = Units.byId(V);
  V.ones = V.appliances.filter(a => a.measure).map(a => {
    const { hanzi, jyutping } = Canto.number(1, { measure: byId[a.measure] });
    return { id: `one-${a.id}`, thing: a.id, hanzi: hanzi + a.hanzi, jyutping: `${jyutping} ${a.jyutping}`, english: `a ${a.english}`, img: false };
  });
})(window.VOCAB);
