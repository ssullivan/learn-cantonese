/*
 * Unit 11 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), phoneme? (true:
 * tools/tts.mjs reads the jyutping exactly), plus turn ('zik' straight
 * on, 'zo' left, 'jau' right) and side ('zo' or 'jau') on directions,
 * which Route places on its map, and place (the id of the place) on
 * "where is it?" questions.
 *
 * Stations, directions, questions and sentences are derived at the bottom
 * of this file, never typed out.
 */
Units.add(11, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '左右去',

  // Going, coming, being somewhere.
  verbs: [
    ...Words.list('heoi lai hai2 ceot daap haang-lou lok'),
  ],

  where: [
    ...Words.list('bin-dou dou6 kan jyun'),
  ],

  transport: [
    ...Words.list('metro bus minibus taxi tram'),
  ],

  places: [
    ...Words.list('zaam toilet bank hospital supermarket park hotel airport'),
  ],

  // Directions are derived from these at the bottom of this file.
  way: [
    ...Words.list('zo jau6 zo-bin jau-bin zik-haang zyun cin-min deoi-min'),
  ],
});

// Borrowed: 車 and 香港 (unit 1), 唔該 (unit 2), people and 呀 / 唔 (unit 3),
// 十 (unit 4), 呢 嗰 有 (unit 5), 好 要 (unit 6), 茶餐廳 (unit 8), 分 鐘 幾時
// 食飯 (unit 9), and 屋企 住 (unit 10).
(V => {
  V.borrowed = [
    ...['car', 'street', 'hong-kong'].map(id => Units.word(1, id)),
    Units.word(2, 'm-goi'),
    ...['ngo', 'nei', 'keoi', 'm', 'aa'].map(id => Units.word(3, id)),
    Units.word(4, 'n10'),
    ...['ni', 'go2', 'jau'].map(id => Units.word(5, id)),
    ...['hou', 'jiu'].map(id => Units.word(6, id)),
    ...['fan', 'zung', 'gei-si', 'sik-faan'].map(id => Units.word(9, id)),
    Units.word(10, 'zyu'),
  ];
  // Places on the map from earlier units, with their pictures.
  V.elsewhere = [Units.word(8, 'cha-chaan-teng'), Units.word(10, 'home')];
})(window.VOCAB);

// Derived: stations, phrases, directions, "where is it?" and sentences.
// Audio is generated like any entry.
(V => {
  let say = Units.sentences(V);

  V.stations = [
    say('metro zaam', 'MTR station', { img: undefined }),
    say('bus zaam', 'bus stop', { img: undefined }),
  ];

  V.phrases = [
    say('ceot street', 'to go out', { note: 'Literally "go out to the street": 出街 is going out anywhere.' }),
    say('ni dou6', 'here', { note: '呢 + 度, "this place".' }),
    say('go2 dou6', 'there', { note: '嗰 + 度, "that place".' }),
    say('hai2 zo-bin', 'on the left'),
    say('hai2 jau-bin', 'on the right'),
    say('zyun zo', 'turn left'),
    say('zyun jau6', 'turn right'),
    say('lok car', 'to get off', { note: '落 + 車: off any bus, tram or minibus.' }),
  ];

  // Where a place is, from the crossroads: straight on, or turn, then which
  // side of the road. Route puts one place on each.
  const TURN = { zik: ['zik-haang', 'Go straight on'], zo: ['zyun zo', 'Turn left'], jau: ['zyun jau6', 'Turn right'] };
  const SIDE = { zo: ['zo-bin', 'the left'], jau: ['jau-bin', 'the right'] };
  V.directions = Object.entries(TURN).flatMap(([turn, [tw, te]]) => Object.entries(SIDE).map(([side, [sw, se]]) => {
    const e = say(`${tw} hai2 ${sw}`, `${te}; it's on ${se}.`, { turn, side });
    return { ...e, hanzi: e.hanzi.replace('喺', '，喺') };
  }));

  // Where is it? One question for every place on the map (stations too).
  say = Units.sentences(V);
  const MAP = [...V.stations, ...V.places.filter(p => p.img !== false), ...V.elsewhere];
  V.questions = [
    say('nei heoi bin-dou aa', 'Where are you going?'),
    ...MAP.map(p => say(`${p.id} hai2 bin-dou aa`, p.id === 'home' ? 'Where is home?' : `Where is the ${p.english.replace(/ \(.*/, '')}?`, { place: p.id })),
  ];

  V.sentences = [
    say('ngo heoi airport', 'I\'m going to the airport.', { note: '去 + place: no word for "to".' }),
    say('ngo daap bus heoi airport', 'I\'m taking the bus to the airport.', { note: 'How first, then where: 搭巴士去機場.' }),
    say('ngo daap metro heoi hotel', 'I\'m taking the MTR to the hotel.'),
    say('ngo haang-lou heoi park', 'I\'m walking to the park.'),
    say('ngo hai2 bank', 'I\'m at the bank.', { note: '喺 hai2 is "be at"; 係 hai6 is "be".' }),
    say('keoi hai2 home', 'He / she is at home.'),
    say('ngo hai2 home sik-faan', 'I eat at home.', { note: '喺 + place goes before the verb, like a time does.' }),
    say('ngo hai2 hong-kong zyu', 'I live in Hong Kong.'),
    say('m-goi toilet hai2 bin-dou aa', 'Excuse me, where is the toilet?'),
    say('toilet hai2 go2 dou6', 'The toilet is over there.'),
    say('bank hai2 deoi-min', 'The bank is across the road.'),
    say('supermarket hai2 cin-min', 'The supermarket is just ahead.'),
    say('zik-haang zyun zo', 'Go straight on, then turn left.'),
    say('jyun m jyun aa', 'Is it far?', { note: 'A唔A, as in Unit 3: far or not far?' }),
    say('hou kan', 'It\'s very close.'),
    say('haang-lou jiu n10 fan zung', 'It\'s a ten-minute walk.', { note: '要 here is "takes": walking takes ten minutes.' }),
    say('nei gei-si lai aa', 'When are you coming?'),
    say('cin-min jau lok', 'Stopping just ahead, please!', { note: 'What you call out on a minibus: "ahead, there\'s getting off".' }),
  ];

  // The voice reads 士 as si6 unless told (as in unit 8's 多士) and 近 as
  // kan6. 轉 on its own comes out zyun2, and 喺 in these two like hai5:
  // they read right from their jyutping.
  Units.phonemes(V, ['bus', 'taxi', 'kan']);
  const byId = Units.byId(V);
  for (const id of ['zyun', 'hai2-zo-bin', 'bank-hai2-deoi-min']) byId[id].phoneme = true;
})(window.VOCAB);
