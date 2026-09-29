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

  // Going, coming, being somewhere.
  verbs: [
    { id: 'heoi', hanzi: '去', jyutping: 'heoi3', english: 'to go (to)', img: false,
      note: 'The place follows straight after: 去機場, go to the airport. No word for "to".' },
    { id: 'lai', hanzi: '嚟', jyutping: 'lai4', english: 'to come', img: false },
    { id: 'hai2', hanzi: '喺', jyutping: 'hai2', english: 'to be at; at', img: false,
      note: 'hai2, rising: not 係 hai6 (to be). 我喺屋企, I\'m at home.' },
    { id: 'ceot', hanzi: '出', jyutping: 'ceot1', english: 'to go out', img: false,
      note: 'As in 出口 (exit) and 出年 (next year, Unit 9).' },
    { id: 'daap', hanzi: '搭', jyutping: 'daap3', english: 'to take (a bus, the MTR)', img: false,
      note: 'For any transport: 搭巴士, 搭的士, 搭港鐵.' },
    { id: 'haang-lou', hanzi: '行路', jyutping: 'haang4 lou6', english: 'to walk', img: false,
      note: 'Literally "walk road". 行 on its own is to walk, too.' },
    { id: 'lok', hanzi: '落', jyutping: 'lok6', english: 'to get off; to go down', img: false },
  ],

  where: [
    { id: 'bin-dou', hanzi: '邊度', jyutping: 'bin1 dou6', english: 'where', img: false,
      note: 'Goes where the answer goes: 你去邊度呀？ 我去機場.' },
    { id: 'dou6', hanzi: '度', jyutping: 'dou6', english: 'place (in 呢度, 嗰度)', img: false },
    { id: 'kan', hanzi: '近', jyutping: 'kan5', english: 'near; close', img: false },
    { id: 'jyun', hanzi: '遠', jyutping: 'jyun5', english: 'far', img: false },
  ],

  transport: [
    { id: 'metro', hanzi: '港鐵', jyutping: 'gong2 tit3', english: 'MTR (the metro)',
      note: 'Literally "Hong Kong rail". Also called 地鐵 dei6 tit3.' },
    { id: 'bus', hanzi: '巴士', jyutping: 'baa1 si2', english: 'bus',
      note: 'From the English "bus". Most are double-deckers.' },
    { id: 'minibus', hanzi: '小巴', jyutping: 'siu2 baa1', english: 'minibus',
      note: 'Sixteen or so seats. Call out where you want to get off.' },
    { id: 'taxi', hanzi: '的士', jyutping: 'dik1 si2', english: 'taxi',
      note: 'From the English "taxi". Hong Kong\'s city taxis are red.' },
    { id: 'tram', hanzi: '電車', jyutping: 'din6 ce1', english: 'tram',
      note: 'Literally "electric car": the narrow double-decker trams on Hong Kong Island.' },
  ],

  places: [
    { id: 'zaam', hanzi: '站', jyutping: 'zaam6', english: 'station; stop', img: false },
    { id: 'toilet', hanzi: '洗手間', jyutping: 'sai2 sau2 gaan1', english: 'toilet',
      note: 'Literally "wash hands room".' },
    { id: 'bank', hanzi: '銀行', jyutping: 'ngan4 hong4', english: 'bank',
      note: '行 is hong4 here, not haang4 (walk).' },
    { id: 'hospital', hanzi: '醫院', jyutping: 'ji1 jyun2', english: 'hospital',
      note: '院 is jyun6 on its own, but jyun2 here.' },
    { id: 'supermarket', hanzi: '超市', jyutping: 'ciu1 si5', english: 'supermarket',
      note: 'Short for 超級市場, "super market".' },
    { id: 'park', hanzi: '公園', jyutping: 'gung1 jyun2', english: 'park',
      note: '園 is jyun4 on its own, but jyun2 here.' },
    { id: 'hotel', hanzi: '酒店', jyutping: 'zau2 dim3', english: 'hotel' },
    { id: 'airport', hanzi: '機場', jyutping: 'gei1 coeng4', english: 'airport',
      note: 'Literally "machine field", 機 as in 飛機.' },
  ],

  // Directions are derived from these at the bottom of this file.
  way: [
    { id: 'zo', hanzi: '左', jyutping: 'zo2', english: 'left', img: false },
    { id: 'jau6', hanzi: '右', jyutping: 'jau6', english: 'right', img: false },
    { id: 'zo-bin', hanzi: '左邊', jyutping: 'zo2 bin1', english: 'the left (side)', img: false,
      note: '邊 is "side" here; in 邊度 it means "which".' },
    { id: 'jau-bin', hanzi: '右邊', jyutping: 'jau6 bin1', english: 'the right (side)', img: false },
    { id: 'zik-haang', hanzi: '直行', jyutping: 'zik6 haang4', english: 'go straight on', img: false,
      note: 'Literally "straight walk".' },
    { id: 'zyun', hanzi: '轉', jyutping: 'zyun3', english: 'to turn', img: false,
      note: 'Before the direction: 轉左, turn left.' },
    { id: 'cin-min', hanzi: '前面', jyutping: 'cin4 min6', english: 'ahead; in front', img: false },
    { id: 'deoi-min', hanzi: '對面', jyutping: 'deoi3 min6', english: 'opposite; across the road', img: false },
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
  const byId = Object.fromEntries(Object.values(V).filter(Array.isArray).flat().map(e => [e.id, e]));
  for (const id of ['zyun', 'hai2-zo-bin', 'bank-hai2-deoi-min']) byId[id].phoneme = true;
})(window.VOCAB);
