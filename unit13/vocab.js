/*
 * Unit 13 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), phoneme? (true:
 * tools/tts.mjs reads the jyutping exactly), plus n on temperatures,
 * adj and degree on "very hot" phrases (好熱, 太凍), and for on advice
 * (the weather it is for: the first is its picture in Forecast, the
 * rest are weathers it suits too).
 *
 * Temperatures come from Canto.number, and degree phrases, advice and
 * sentences from the words, at the bottom of this file; never type them
 * out.
 */
Units.add(13, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '大天雨',

  basics: [
    { id: 'tin-hei', hanzi: '天氣', jyutping: 'tin1 hei3', english: 'weather',
      note: 'Literally "sky air".' },
    { id: 'tin-man-toi', hanzi: '天文台', jyutping: 'tin1 man4 toi4', english: 'the Hong Kong Observatory', img: false,
      note: 'Literally "astronomy tower": it gives the forecast and hoists the typhoon signals.' },
    { id: 'taai-joeng', hanzi: '太陽', jyutping: 'taai3 joeng4', english: 'the sun' },
    { id: 'wan', hanzi: '雲', jyutping: 'wan4', english: 'cloud' },
    { id: 'jyu', hanzi: '雨', jyutping: 'jyu5', english: 'rain', img: false },
    { id: 'syut', hanzi: '雪', jyutping: 'syut3', english: 'snow', img: false },
    { id: 'fung', hanzi: '風', jyutping: 'fung1', english: 'wind', img: false },
    { id: 'daa', hanzi: '打', jyutping: 'daa2', english: 'to hit; to strike', img: false,
      note: 'As in 打風, a typhoon "strikes".' },
  ],

  // What the sky is doing. 落雨, 落雪 and 打風 are made from the words
  // above, at the bottom of this file.
  weather: [
    { id: 'tin-cing', hanzi: '天晴', jyutping: 'tin1 cing4', english: 'sunny; fine',
      note: 'The sky is clear.' },
    { id: 'jam-tin', hanzi: '陰天', jyutping: 'jam1 tin1', english: 'cloudy; overcast',
      note: '陰 is shade.' },
    { id: 'daai-fung', hanzi: '大風', jyutping: 'daai6 fung1', english: 'windy; a strong wind',
      note: '"Big wind": 今日好大風, it\'s very windy today.' },
    { id: 'haang-leoi', hanzi: '行雷', jyutping: 'haang4 leoi4', english: 'to thunder; a thunderstorm',
      note: 'Literally "the thunder walks". 行 as in 行路 (Unit 11).' },
  ],

  // How it feels. 熱 and 凍 come from Unit 8 below.
  feel: [
    { id: 'nyun', hanzi: '暖', jyutping: 'nyun5', english: 'warm', img: false },
    { id: 'loeng4', hanzi: '涼', jyutping: 'loeng4', english: 'cool (pleasantly)', img: false,
      note: 'Nice and cool: 今日好涼. 沖涼 is to take a shower.' },
    { ...Units.word(7, 'baked'), english: 'hot and stuffy; muggy',
      note: 'Hot, humid and still, like an oven: 焗 is to bake.' },
    { id: 'sap', hanzi: '濕', jyutping: 'sap1', english: 'damp; humid', img: false,
      note: 'In spring the walls drip: 回南天, when the south wind comes back.' },
    { id: 'gon', hanzi: '乾', jyutping: 'gon1', english: 'dry', img: false },
  ],

  seasons: [
    { id: 'gwai-zit', hanzi: '季節', jyutping: 'gwai3 zit3', english: 'season' },
    { id: 'ceon-tin', hanzi: '春天', jyutping: 'ceon1 tin1', english: 'spring',
      note: 'Warm, grey and 濕: March and April.' },
    { id: 'haa-tin', hanzi: '夏天', jyutping: 'haa6 tin1', english: 'summer',
      note: 'Hot, 焗 and rainy, with typhoons: May to September.' },
    { id: 'cau-tin', hanzi: '秋天', jyutping: 'cau1 tin1', english: 'autumn',
      note: 'Sunny and dry: the best weather of the year.' },
    { id: 'dung-tin', hanzi: '冬天', jyutping: 'dung1 tin1', english: 'winter',
      note: '冬 dung1, high and level; 凍 dung3 (cold) is mid.' },
  ],

  // How much: 好 and 幾 come from Units 6 and 9 below.
  grammar: [
    { id: 'taai', hanzi: '太', jyutping: 'taai3', english: 'too (much)', img: false,
      note: 'Before an adjective: 太熱, too hot.' },
    { id: 'wui', hanzi: '會', jyutping: 'wui5', english: 'will; is going to', img: false,
      note: 'Before the verb: 聽日會落雨, it will rain tomorrow.' },
    { id: 'laa1', hanzi: '啦', jyutping: 'laa1', english: '(softens advice: go on, do)', img: false,
      note: 'At the end of a suggestion: 帶遮啦！ Take an umbrella!' },
    { id: 'laa3', hanzi: '喇', jyutping: 'laa3', english: '(now; it has changed)', img: false,
      note: 'Something new has happened: 落雨喇！ It\'s started raining!' },
  ],

  things: [
    { id: 'umbrella', hanzi: '遮', jyutping: 'ze1', english: 'umbrella',
      note: 'For rain and for sun.' },
    { id: 'daai-bring', hanzi: '帶', jyutping: 'daai3', english: 'to bring; to take along', img: false,
      note: 'Sounds just like 戴 (wear, Unit 12).' },
  ],
});

// Borrowed: 水 and 香港 (unit 1), people, 係 唔 呀 (unit 3), 幾多 (unit 4),
// 有 啲 件 衫 (unit 5), 好 (unit 6), 熱 凍 飲 多 (unit 8), 幾 點, the days
// and weekdays (unit 9), 落 出 度 出街 (unit 11), and 著 戴 帽 外套 (unit 12),
// with the measure words of the clothes, 件 and 頂.
(V => {
  V.feel.unshift(
    { ...Units.word(8, 'jit'), note: 'Hot weather, food or drinks: 今日好熱.' },
    { ...Units.word(8, 'dung'), english: 'cold', note: 'dung3, mid and level: 冬 dung1 (winter) is high.' },
  );
  V.grammar.unshift(
    { ...Units.word(6, 'hou'), english: 'very', note: 'Before an adjective: 好熱. It\'s there even when it\'s only a bit hot.' },
    { ...Units.word(9, 'gei'), english: 'quite; fairly', note: 'Before an adjective: 幾熱, quite hot. In 幾點 (Unit 9) it asks which.' },
  );
  V.days = ['kam-jat', 'gam-jat', 'ting-jat', 'hau-jat'].map(id => Units.word(9, id));
  V.weekdays = [1, 2, 3, 4, 5, 6, 7].map(n => Units.word(9, `wk${n}`));
  V.measures = [Units.word(5, 'gin'), Units.word(12, 'deng')];
  V.borrowed = [
    ...['water', 'hong-kong'].map(id => Units.word(1, id)),
    ...['ngo', 'nei', 'hai', 'm', 'aa'].map(id => Units.word(3, id)),
    Units.word(4, 'gei-do'),
    ...['jau', 'di', 'shirt'].map(id => Units.word(5, id)),
    ...['jam2', 'do'].map(id => Units.word(8, id)),
    { ...Units.word(9, 'dim'), english: 'how', note: 'As in 最近點呀？ (Unit 2).' },
    ...['lok', 'ceot', 'ceot-street'].map(id => Units.word(11, id)),
    { ...Units.word(11, 'dou6'), english: 'degree(s)', note: 'After the number: 三十度. In 呢度 (Unit 11) it is a place.' },
    ...['zoek', 'daai', 'hat', 'coat'].map(id => Units.word(12, id)),
  ];
})(window.VOCAB);

// Derived: 落雨 and the rest, temperatures, 好熱 and the rest, advice with
// 啦, and sentences. Audio is generated like any entry.
(V => {
  const byId = Units.byId(V);
  let say = Units.sentences(V);

  // Rain and snow "come down" (落, Unit 11); a typhoon strikes.
  V.weather.unshift(
    say('lok jyu', 'to rain', { img: undefined, note: 'Rain comes down: 落, as in 落車 (Unit 11).' }),
    say('lok syut', 'to snow', { img: undefined, note: 'Rare in Hong Kong: only on the highest hills, every few decades.' }),
    say('daa fung', 'a typhoon hits', { img: undefined, note: 'Typhoon season is summer. At signal 8, 八號風球, offices and schools close.' }),
  );

  // 5 to 35 degrees: 三十二度.
  V.temps = Array.from({ length: 31 }, (_, i) => {
    const n = i + 5, { hanzi, jyutping } = Canto.number(n, { measure: byId.dou6 });
    return { id: `c${n}`, n, hanzi, jyutping, english: `${n}°C`, img: false };
  });

  V.phrases = [
    say('tin-hei dim aa', 'how\'s the weather?'),
    // Said as a phrase: asked, it ends in a rising 度 that sounds like dou2.
    say('gei-do dou6', 'how many degrees?', { say: '幾多度' }),
    say('jau di', 'a bit', { note: 'Before an adjective, for a bit more than you\'d like: 有啲凍.' }),
    say('m hai hou', 'not very', { note: '唔係好凍, "not very cold".' }),
    say('m hou', 'don\'t', { note: '唔 + 好: 唔好出街, don\'t go out.' }),
    say('ceot taai-joeng', 'the sun comes out'),
  ];

  // How hot: 好熱 幾熱 太熱 有啲熱 唔係好熱, and the same for 凍 and 焗.
  say = Units.sentences(V);
  const DEGREE = { hou: 'very', gei: 'quite', taai: 'too', 'jau-di': 'a bit', 'm-hai-hou': 'not very' };
  const ADJ = { jit: 'hot', dung: 'cold', baked: 'muggy' };
  V.degrees = Object.entries(ADJ).flatMap(([adj, a]) => Object.entries(DEGREE).map(([degree, d]) =>
    say(`${degree} ${adj}`, `${d} ${a}`, { adj, degree, ...(degree === 'hou' && adj !== 'baked' && { img: undefined }) })));

  // Advice for the weather, softened with 啦.
  V.advice = [
    say('daai-bring umbrella laa1', 'Take an umbrella!', { for: ['lok-jyu', 'haang-leoi'] }),
    say('zoek do gin shirt laa1', 'Put on another layer!', { for: ['hou-dung'], note: '著多件衫, "wear one more piece of clothing".' }),
    say('jam2 do di water laa1', 'Drink more water!', { for: ['hou-jit', 'tin-cing'], note: '多啲 after the verb: more.' }),
    say('m-hou ceot-street laa1', 'Don\'t go out!', { for: ['daa-fung', 'haang-leoi'] }),
    say('daai hat laa1', 'Wear a hat!', { for: ['tin-cing', 'hou-jit'] }),
    say('zoek coat laa1', 'Wear a coat!', { for: ['daai-fung', 'hou-dung'] }),
  ];
  V.advice[0].note = '啦 at the end makes it friendly advice. Without it, 帶遮 sounds like an order.';

  say = Units.sentences(V);
  V.sentences = [
    say('gam-jat tin-hei dim aa', 'How\'s the weather today?'),
    say('gam-jat hou jit', 'It\'s very hot today.', { note: 'No 係 before an adjective: 今日好熱, not 今日係熱.' }),
    say('gam-jat gei dung', 'It\'s quite cold today.'),
    say('gam-jat jau di baked', 'It\'s a bit muggy today.'),
    say('gam-jat m hai hou dung', 'It isn\'t very cold today.'),
    say('taai jit laa3', 'It\'s too hot!'),
    say('gam-jat tin-hei hou hou', 'The weather is lovely today.', { note: '好好: "very good".' }),
    say('ting-jat wui lok-jyu', 'It will rain tomorrow.', { note: 'The day first, then 會 before the verb.' }),
    say('ting-jat wui daa-fung', 'A typhoon will hit tomorrow.'),
    say('ting-jat wui m wui lok-jyu aa', 'Will it rain tomorrow?', { note: '會唔會, A唔A as in Unit 3.' }),
    say('kam-jat hou daai-fung', 'It was very windy yesterday.', { note: 'No past tense: 琴日 says when.' }),
    say('lok-jyu laa3', 'It\'s started raining!', { note: '喇: it wasn\'t raining before.' }),
    say('ceot taai-joeng laa3', 'The sun\'s come out!'),
    say('gam-jat gei-do dou6 aa', 'How many degrees is it today?'),
    say('gam-jat c32', 'It\'s 32 degrees today.'),
    say('hong-kong haa-tin hou jit', 'Summer in Hong Kong is very hot.'),
    say('hong-kong dung-tin m hai hou dung', 'Winter in Hong Kong isn\'t very cold.'),
    say('ceon-tin hou sap', 'Spring is very damp.'),
  ];

  // The particles read from their jyutping, and 三十一度, whose 十 the voice
  // says high.
  Units.phonemes(V, ['laa1', 'laa3']);
  V.temps.find(t => t.n === 31).phoneme = true;
})(window.VOCAB);
