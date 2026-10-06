/*
 * Unit 12 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word it is counted with), phoneme? (true: tools/tts.mjs
 * reads the jyutping exactly), plus fill and line (its colours) on
 * colours, and on clothes in a colour (紅色嘅衫): garment, colour, slot
 * (where it goes on the body: head, top, bottom, feet) and fit.
 *
 * fit { cx, cy, s } places a garment on the standing figure drawn by
 * art.mjs (打扮): its picture is the garment drawn on the figure, centred
 * on cx, cy and enlarged s times; Dress Up puts it back on the figure
 * from the same numbers.
 *
 * Clothes in colours, wearing sentences and sentences are derived at the
 * bottom of this file, never typed out.
 */
Units.add(12, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '白色紅',

  basics: [
    { id: 'ngaan-sik', hanzi: '顏色', jyutping: 'ngaan4 sik1', english: 'colour',
      note: 'Every colour ends in 色: 紅色, 藍色.' },
    { id: 'daa-baan', hanzi: '打扮', jyutping: 'daa2 baan6', english: 'to dress up; to get ready',
      note: 'Choosing what to wear.' },
    { id: 'zoek', hanzi: '著', jyutping: 'zoek3', english: 'to wear (clothes, shoes)', img: false,
      note: 'For what you put your body into: 著衫, 著褲, 著鞋.' },
    { id: 'daai', hanzi: '戴', jyutping: 'daai3', english: 'to wear (a hat, glasses)', img: false,
      note: 'For what you put on: 戴帽, 戴眼鏡, 戴手錶 (a watch).' },
    { id: 'leng', hanzi: '靚', jyutping: 'leng3', english: 'pretty; nice-looking', img: false,
      note: 'For people and things: 好靚.' },
  ],

  // fill and line: the colour and its outline, for pictures.
  colours: [
    { id: 'hung', hanzi: '紅色', jyutping: 'hung4 sik1', english: 'red', fill: '#d6453a', line: '#8f2a22' },
    { id: 'caang', hanzi: '橙色', jyutping: 'caang2 sik1', english: 'orange', fill: '#ef8a2c', line: '#a8561a',
      note: 'The colour of 橙 (Unit 6).' },
    { id: 'wong', hanzi: '黃色', jyutping: 'wong4 sik1', english: 'yellow', fill: '#f2c94c', line: '#9a7a1a' },
    { id: 'luk', hanzi: '綠色', jyutping: 'luk6 sik1', english: 'green', fill: '#3a9a6e', line: '#26684a' },
    { id: 'laam', hanzi: '藍色', jyutping: 'laam4 sik1', english: 'blue', fill: '#3f7cc0', line: '#24507f' },
    { id: 'zi', hanzi: '紫色', jyutping: 'zi2 sik1', english: 'purple', fill: '#8a5cc0', line: '#5a3a86' },
    { id: 'fan-hung', hanzi: '粉紅色', jyutping: 'fan2 hung4 sik1', english: 'pink', fill: '#f29bb8', line: '#b0587a',
      note: '"Powder red".' },
    { id: 'fe', hanzi: '啡色', jyutping: 'fe1 sik1', english: 'brown', fill: '#8a5a34', line: '#5a3a1e',
      note: 'The colour of 咖啡, coffee.' },
    { id: 'hak', hanzi: '黑色', jyutping: 'hak1 sik1', english: 'black', fill: '#2e2e33', line: '#101014' },
    { id: 'baak', hanzi: '白色', jyutping: 'baak6 sik1', english: 'white', fill: '#f7f7f5', line: '#8a9aa5' },
    { id: 'fui', hanzi: '灰色', jyutping: 'fui1 sik1', english: 'grey', fill: '#9aa3aa', line: '#5f6a72',
      note: '灰 is ash.' },
  ],

  // More clothes; 衫, 褲 and 鞋 come from Unit 5 below.
  clothes: [
    { id: 'hat', measure: 'deng', hanzi: '帽', jyutping: 'mou2', english: 'hat; cap',
      note: 'mou2 in speech. Worn with 戴: 戴帽.' },
    { id: 'coat', measure: 'gin', hanzi: '外套', jyutping: 'ngoi6 tou3', english: 'coat; jacket',
      note: 'Literally "outer cover". A top, so 件.' },
    { id: 'skirt', measure: 'tiu', hanzi: '裙', jyutping: 'kwan4', english: 'skirt; dress',
      note: 'Long like trousers, so 條.' },
    { id: 'glasses', measure: 'fu', hanzi: '眼鏡', jyutping: 'ngaan5 geng2', english: 'glasses',
      note: '鏡 is geng3, but geng2 here. Worn with 戴.' },
  ],

  measures: [
    { id: 'deng', hanzi: '頂', jyutping: 'deng2', english: 'for hats', img: false,
      note: '頂 is the top: 一頂帽.' },
    { id: 'fu', hanzi: '副', jyutping: 'fu3', english: 'a pair of (glasses)', img: false,
      note: 'For a set that goes together: 一副眼鏡.' },
  ],
});

// Borrowed: 衫 褲 鞋 and their measure words 件 條 對, with 一件衫 and the
// rest, and 呢 (unit 5); people, 係, 乜嘢, 呀 (unit 3); 要, 好, 錢 and 幾多
// (units 4 and 6); 嘅 and 同 (unit 10).
(V => {
  V.clothes.unshift(...['shirt', 'trousers', 'shoes'].map(id => Units.word(5, id)));
  V.measures.push(...['gin', 'tiu', 'deoi'].map(id => Units.word(5, id)));
  V.ones = ['shirt', 'trousers', 'shoes'].map(id => Units.word(5, `one-${id}`));
  V.borrowed = [
    ...['ngo', 'nei', 'keoi', 'hai', 'm', 'mat-je', 'aa'].map(id => Units.word(3, id)),
    Units.word(4, 'gei-do'), Units.word(5, 'ni'),
    ...['jiu', 'hou', 'cin'].map(id => Units.word(6, id)),
    ...['ge', 'tung'].map(id => Units.word(10, id)),
  ];
})(window.VOCAB);

// Derived: 一頂帽 and the rest, clothes in colours, what you wear with
// 著 or 戴, and sentences. Audio is generated like any entry.
(V => {
  const byId = Units.byId(V);
  const measure = Units.byId(V.measures);
  V.ones.push(...V.clothes.filter(t => !t.unit).map(t => {
    const m = measure[t.measure], { hanzi, jyutping } = Canto.number(1, { measure: m });
    return { id: `one-${t.id}`, thing: t.id, hanzi: hanzi + t.hanzi, jyutping: `${jyutping} ${t.jyutping}`,
      english: t.id === 'glasses' ? 'a pair of glasses' : `a ${t.english.replace(/;.*/, '')}`, img: false };
  }));

  let say = Units.sentences(V);
  V.phrases = [
    say('mat-je ngaan-sik', 'what colour?'),
    say('hung shirt', 'a red top', { note: '嘅 is often left out between a colour and a thing: 紅色衫.' }),
  ];

  // Clothes Dress Up puts on the figure: where each goes, and its fit.
  const WEAR = {
    hat: { slot: 'head', fit: { cx: 69, cy: 10, s: 3 } },
    shirt: { slot: 'top', fit: { cx: 64, cy: 53, s: 2 } },
    coat: { slot: 'top', fit: { cx: 64, cy: 57, s: 1.8 } },
    trousers: { slot: 'bottom', fit: { cx: 64, cy: 91, s: 2.2 } },
    skirt: { slot: 'bottom', fit: { cx: 64, cy: 84, s: 2.4 } },
    shoes: { slot: 'feet', fit: { cx: 64, cy: 116, s: 2.6 } },
  };
  const COLOURS = ['hung', 'caang', 'wong', 'luk', 'laam', 'fan-hung', 'hak', 'baak'];
  V.coloured = Object.entries(WEAR).flatMap(([g, where]) => COLOURS.map(c =>
    say(`${c} ge ${g}`, `${byId[c].english} ${byId[g].english.replace(/;.*| \(.*/, '')}`,
      { garment: g, colour: c, ...where, img: undefined })));
  V.coloured[0].note = 'Colour + 嘅 + thing: 紅色嘅帽, a red hat.';

  // 著 for clothes and shoes, 戴 for a hat and glasses.
  const A = { hat: 'a hat', shirt: 'a top', coat: 'a coat', skirt: 'a skirt', glasses: 'glasses', trousers: 'trousers', shoes: 'shoes' };
  V.wear = V.clothes.map(t => say(`ngo ${['hat', 'glasses'].includes(t.id) ? 'daai' : 'zoek'} ${t.id}`, `I wear ${A[t.id]}.`, { thing: t.id }));

  V.sentences = [
    say('nei gin shirt hai mat-je ngaan-sik aa', 'What colour is your top?', { note: '你件衫: your top (measure word, as in Unit 10).' }),
    say('ngo gin shirt hai laam ge', 'My top is blue.', { note: '係藍色嘅, "is a blue one", like 係我嘅 in Unit 10.' }),
    say('keoi zoek hung ge shirt', 'He / she wears a red top.'),
    say('keoi zoek laam ge trousers tung baak ge shoes', 'He / she wears blue trousers and white shoes.'),
    say('keoi daai glasses', 'He / she wears glasses.'),
    say('ngo daai hak ge hat', 'I wear a black hat.'),
    say('ngo jiu baak ge shoes', 'I\'d like the white shoes.'),
    say('ni tiu skirt hou leng', 'This skirt is very pretty.'),
    say('ni gin coat gei-do cin aa', 'How much is this coat?'),
    say('ngo m zoek coat', 'I\'m not wearing a coat.'),
  ];

  // 著 has other readings (zoek6, asleep); the voice sometimes picks it.
  Units.phonemes(V, ['zoek']);
})(window.VOCAB);
