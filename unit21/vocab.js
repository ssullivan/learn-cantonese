/*
 * Unit 21 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
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
    { id: 'fridge', measure: 'bou6', hanzi: '雪櫃', jyutping: 'syut3 gwai6', english: 'fridge',
      note: '"Snow cupboard": 雪 as in Unit 13.' },
    { id: 'microwave', measure: 'bou6', hanzi: '微波爐', jyutping: 'mei4 bo1 lou4', english: 'microwave',
      note: '"Tiny wave stove". Its bell gives the verb 叮.' },
    { id: 'oven', hanzi: '焗爐', jyutping: 'guk6 lou4', english: 'oven',
      note: '"Bake stove": 焗 as in Unit 7\'s baked dim sum.' },
    // Read from jyutping: from characters, 煤 sounds like mui6.
    { id: 'stove', phoneme: true, hanzi: '煤氣爐', jyutping: 'mui4 hei3 lou4', english: 'gas stove',
      note: '"Gas stove": most Hong Kong kitchens cook on gas.' },
    { id: 'rice-cooker', measure: 'go', hanzi: '電飯煲', jyutping: 'din6 faan6 bou1', english: 'rice cooker',
      note: '"Electric rice pot".' },
    { id: 'kettle', measure: 'go', hanzi: '水煲', jyutping: 'seoi2 bou1', english: 'kettle',
      note: '"Water pot". An electric one is 電水煲.' },
    { id: 'toaster', measure: 'go', hanzi: '多士爐', jyutping: 'do1 si2 lou4', english: 'toaster',
      note: '"Toast stove": 多士 as in Unit 8.' },
    { id: 'dishwasher', measure: 'bou6', hanzi: '洗碗機', jyutping: 'sai2 wun2 gei1', english: 'dishwasher',
      note: '"Wash bowl machine": 洗 (Unit 15), 碗 (Unit 5), 機 (Unit 16).' },
  ],

  words: [
    { id: 'kitchen', hanzi: '廚房', jyutping: 'cyu4 fong2', english: 'kitchen' },
    { id: 'din-hei', hanzi: '電器', jyutping: 'din6 hei3', english: 'electrical appliance', img: false,
      note: '電 is electric, as in 電車 (Unit 11) and 電視 (Unit 15).' },
    { id: 'gei-noi', hanzi: '幾耐', jyutping: 'gei2 noi6', english: 'how long', img: false,
      note: 'Ask it after the verb: 叮幾耐？' },
    { id: 'fan-zung', hanzi: '分鐘', jyutping: 'fan1 zung1', english: 'minute (how long)', img: false,
      note: 'A length of time. 分 alone is a minute on the clock (Unit 9).' },
  ],

  // Kitchen verbs. 煮 洗 放 焗 開 are borrowed below.
  verbs: [
    { id: 'jung', hanzi: '用', jyutping: 'jung6', english: 'to use', img: false,
      note: '用 + a thing, then the verb: 用水煲煲水, boil water with the kettle.' },
    { id: 'ding1', hanzi: '叮', jyutping: 'ding1', english: 'to microwave', img: false,
      note: 'The sound of the bell: 叮 when it\'s done.' },
    { id: 'bou1', hanzi: '煲', jyutping: 'bou1', english: 'to boil; a pot', img: false,
      note: 'Boil water or cook rice; also the pot itself, as in 水煲.' },
    { id: 'caau2', hanzi: '炒', jyutping: 'caau2', english: 'to stir-fry', img: false,
      note: 'As in 炒飯 (Unit 7).' },
    { id: 'zing2', hanzi: '整', jyutping: 'zing2', english: 'to make; to fix', img: false },
    { id: 'jap6', hanzi: '入', jyutping: 'jap6', english: 'in; into', img: false,
      note: 'After a verb: 放入雪櫃, put into the fridge.' },
    { id: 'lo2', hanzi: '攞', jyutping: 'lo2', english: 'to take; to get', img: false },
    { id: 'saan1', hanzi: '閂', jyutping: 'saan1', english: 'to close; to turn off', img: false,
      note: 'The opposite of 開: 閂門 shut the door, 閂燈 turn off the light.' },
    { id: 'waai6', hanzi: '壞', jyutping: 'waai6', english: 'broken', img: false,
      note: 'With 咗 (Unit 14): 壞咗, it\'s broken.' },
  ],

  // Measure words. 個 is borrowed below.
  measures: [
    { id: 'bou6', hanzi: '部', jyutping: 'bou6', english: 'for machines', img: false,
      note: 'Machines: 一部雪櫃, 一部洗碗機. Small things, like a 水煲, take 個.' },
  ],
});

// Borrowed: 水 (unit 1), 我 你 唔 乜嘢 呀 (unit 3), 個 (unit 4), 飯 蛋糕 碗
// 啲 有 (unit 5), 橙 要 (unit 6), 焗 (unit 7), 多士 and 熱 凍 (unit 8), six
// o'clock (unit 9), 屋企 (unit 10), 出 嚟 (unit 11), 雪 (unit 13), 咗 冇
// 未 (unit 14), 煮 洗 放 (unit 15) and 開 (unit 17). Food is borrowed
// without its measure word.
(V => {
  const food = (n, id) => ({ ...Units.word(n, id), measure: undefined });
  V.measures.push(Units.word(4, 'go'));
  V.food = [food(5, 'rice'), food(5, 'cake'), food(6, 'orange'), food(8, 'toast')];
  V.borrowed = [
    Units.word(1, 'water'),
    ...['ngo', 'nei', 'm', 'mat-je', 'aa'].map(id => Units.word(3, id)),
    { ...Units.word(5, 'wun'), english: 'a bowl; the dishes', note: '洗碗 is washing up: bowls, plates and all.' },
    ...['di', 'jau'].map(id => Units.word(5, id)),
    Units.word(6, 'jiu'),
    { ...Units.word(7, 'baked'), english: 'to bake' },
    ...['jit', 'dung'].map(id => Units.word(8, id)),
    Units.word(9, 't0600'),
    Units.word(10, 'home'),
    { ...Units.word(11, 'ceot'), english: 'out' },
    Units.word(11, 'lai'),
    { ...Units.word(13, 'syut'), english: 'to chill; snow', note: 'Snow (Unit 13), as a verb: 雪凍, chill in the fridge.' },
    ...['zo', 'mou', 'mei'].map(id => Units.word(14, id)),
    Units.word(15, 'zyu'),
    Units.word(15, 'sai'),
    { ...Units.word(15, 'fong'), english: 'to put; to let go' },
    { ...Units.word(17, 'hoi'), english: 'to open; to turn on', note: '開雪櫃 opens the fridge; 開焗爐 turns the oven on.' },
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
  V.borrowed.push(Units.word(20, 'coi'));
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
    say('saan1 zo stove mei aa', 'Have you turned off the gas stove?', { note: '咗…未呀？ (Unit 14): done yet?' }),
  ];

  V.sentences = [
    say('fridge waai6 zo', 'The fridge is broken.', { note: '壞咗: it has broken.' }),
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
