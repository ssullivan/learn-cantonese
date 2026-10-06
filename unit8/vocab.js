/*
 * Unit 8 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word it is ordered with; must match its picture's cup or
 * bowl, which tools/check.mjs verifies), phoneme? (true: tools/tts.mjs
 * reads the jyutping exactly), reply? (ids of good answers, on the
 * waiter's questions), plus drink, temp, sweet and ice on drinks as
 * ordered (凍奶茶少甜), which Order Up reads.
 *
 * Drinks as served, orders, "one of" phrases and sentences are derived
 * at the bottom of this file, never typed out.
 */
Units.add(8, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '冰油走',

  basics: [
    ...Words.list('cha-chaan-teng waiter jam2 sik6'),
  ],

  // Ordered by the cup: 一杯奶茶.
  drinks: [
    ...Words.list('milk-tea coffee yuenyeung lemon-tea'),
  ],

  food: [
    ...Words.list('pineapple-butter spam-egg-noodles macaroni toast french-toast'),
  ],

  // How you want it: hot or iced, then leave out (走), less (少) or more (多).
  modifiers: [
    ...Words.list('dung jit zau siu do bing ding gaa1 dung-jam'),
  ],

  place: [
    ...Words.list('tong-sik ling-zau'),
  ],
});

// Borrowed: measure words (個, 一 from unit 4; 杯 碗 from unit 5; 份 from
// unit 1), 甜 and 唔該埋單 (unit 7), 唔該 (unit 2), people and question
// words (unit 3), 呢 (unit 5), and 要, 好 and $2 (unit 6).
(V => {
  V.measures = [Units.word(4, 'go'), ...['bui', 'wun'].map(id => Units.word(5, id)),
    { ...Units.word(1, 'fan6'), english: 'a portion of', note: 'For a serving of food: 一份多士.' }];
  V.borrowed = [
    Units.word(4, 'n1'), Units.word(7, 'sweet'), Units.word(7, 'bill'), Units.word(2, 'm-goi'),
    ...['ngo', 'nei', 'm', 'mat-je', 'aa'].map(id => Units.word(3, id)),
    Units.word(5, 'ni'),
    ...['jiu', 'hou', 'p200'].map(id => Units.word(6, id)),
  ];
})(window.VOCAB);

// Derived: drinks as served, orders, "one of" phrases, the waiter's
// questions and sentences. Audio is generated like any entry; art.mjs
// draws every drink as served.
(V => {
  const say = Units.sentences(V);
  const TEMP = { jit: 'hot', dung: 'iced' };

  // 凍奶茶, 熱奶茶: every drink hot and iced, with a picture.
  V.served = V.drinks.flatMap(d => Object.entries(TEMP).map(([t, how]) =>
    say(`${t} ${d.id}`, `${how} ${d.english.replace(/ \(.*/, '')}`, { drink: d.id, temp: t, measure: 'bui', img: undefined })));
  V.served[0].note = 'Hot or iced goes before the drink: 熱奶茶, 凍奶茶.';

  // 走甜 少甜, 走冰 少冰 多冰: they go after the drink.
  const SWEET = { siu: 'less sweet', zau: 'no sugar' }, ICE = { siu: 'less ice', do: 'extra ice', zau: 'no ice' };
  V.mods = [
    ...Object.entries(SWEET).map(([m, english]) => say(`${m} sweet`, english, { kind: 'sweet' })),
    ...Object.entries(ICE).map(([m, english]) => say(`${m} bing`, english, { kind: 'ice' })),
  ];

  // Orders: temperature + drink + one change. Hot drinks can be less sweet
  // or sugar-free; iced ones can change the ice too.
  V.orders = V.served.flatMap(s => {
    const changes = Object.entries(SWEET).map(([m, e]) => [m, e, 'sweet']);
    if (s.temp === 'dung') changes.push(...Object.entries(ICE).map(([m, e]) => [m, e, 'ice']));
    return changes.map(([m, english, kind]) =>
      say(`${s.words.join(' ')} ${m} ${kind === 'sweet' ? 'sweet' : 'bing'}`, `${s.english}, ${english}`,
        { drink: s.drink, temp: s.temp, sweet: kind === 'sweet' ? m : '', ice: kind === 'ice' ? m : '' }));
  });
  V.orders[0].note = 'Temperature, drink, then what to change: 熱奶茶少甜.';

  // 一杯奶茶, 一個菠蘿油, 一碗餐蛋麵, 一份多士, for Measures.round.
  const measure = Units.byId(V.measures);
  V.ones = [...V.drinks, ...V.food].map(t => {
    const m = measure[t.measure], { hanzi, jyutping } = Canto.number(1, { measure: m });
    const english = t.measure === 'go' ? `a ${t.english}` : `${m.english} ${t.english.replace(/ \(.*/, '')}`;
    return { id: `one-${t.id}`, thing: t.id, words: ['n1', m.id, t.id], hanzi: hanzi + t.hanzi, jyutping: `${jyutping} ${t.jyutping}`,
      english, img: false };
  });

  // 好 before a verb: good to drink, good to eat.
  V.tasty = [
    say('hou jam2', 'tasty (to drink)', { note: '好 + verb: "good to drink".' }),
    say('hou sik6', 'tasty (to eat)', { note: '好好食 is "really tasty".' }),
  ];

  // What the waiter asks, and good answers.
  V.questions = [
    say('nei jam2 mat-je aa', 'What would you like to drink?', { reply: V.served.map(e => e.id),
      note: 'Waiters often say 飲咩呀？ 咩 me1 is short for 乜嘢.' }),
    say('nei sik6 mat-je aa', 'What would you like to eat?', { reply: V.food.map(e => e.id) }),
    say('dung ding jit aa', 'Iced or hot?', { reply: ['dung', 'jit'] }),
    say('tong-sik ding ling-zau aa', 'Eat in or take away?', { reply: ['tong-sik', 'ling-zau'] }),
  ];
  V.borrowed.find(e => e.id === 'bill').note = 'Or call 伙記，埋單！ Pay at the till on the way out.';

  V.sentences = [
    say('ngo jiu n1 bui dung milk-tea', 'I\'d like an iced milk tea.', { note: '一杯 is often left out: 我要凍奶茶.' }),
    say('m-goi dung lemon-tea siu sweet', 'An iced lemon tea, less sweet, please.'),
    say('ngo jiu n1 go pineapple-butter', 'I\'d like a pineapple bun with butter.'),
    say('ngo jiu n1 wun spam-egg-noodles', 'I\'d like the luncheon meat and egg noodles.'),
    say('n1 fan6 toast n1 bui coffee', 'A toast and a coffee.'),
    say('ngo m jiu bing', 'I don\'t want ice.'),
    say('dung-jam gaa1 p200', 'Iced drinks are $2 extra.', { note: 'Menus say 凍飲加$2.' }),
    say('ngo jiu ling-zau', 'I\'d like it to take away.'),
    say('ni bui milk-tea hou jam2', 'This milk tea is good.', { note: '呢杯: this cup of.' }),
    say('pineapple-butter hou hou sik6', 'The pineapple bun is really tasty.', { note: '好 + 好食: "very good to eat".' }),
  ];

  // The voice sometimes reads 少 as siu3 (young) and 士 as si6.
  Units.phonemes(V, ['siu', 'toast', 'french-toast']);
})(window.VOCAB);
