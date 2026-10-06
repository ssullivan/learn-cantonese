/*
 * Unit 12 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 12 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
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
    ...Words.list('ngaan-sik daa-baan zoek daai leng'),
  ],

  // fill and line: the colour and its outline, for pictures.
  colours: [
    { ...Words.get('hung'), fill: '#d6453a', line: '#8f2a22' },
    { ...Words.get('caang'), fill: '#ef8a2c', line: '#a8561a' },
    { ...Words.get('wong'), fill: '#f2c94c', line: '#9a7a1a' },
    { ...Words.get('luk'), fill: '#3a9a6e', line: '#26684a' },
    { ...Words.get('laam'), fill: '#3f7cc0', line: '#24507f' },
    { ...Words.get('zi2'), fill: '#8a5cc0', line: '#5a3a86' },
    { ...Words.get('fan-hung'), fill: '#f29bb8', line: '#b0587a' },
    { ...Words.get('fe'), fill: '#8a5a34', line: '#5a3a1e' },
    { ...Words.get('hak'), fill: '#2e2e33', line: '#101014' },
    { ...Words.get('baak6'), fill: '#f7f7f5', line: '#8a9aa5' },
    { ...Words.get('fui'), fill: '#9aa3aa', line: '#5f6a72' },
  ],

  // More clothes; 衫, 褲 and 鞋 come from Unit 5 below.
  clothes: [
    ...Words.list('hat coat skirt glasses'),
  ],

  measures: [
    ...Words.list('deng fu'),
  ],
});

// Borrowed: 衫 褲 鞋 and their measure words 件 條 對, with 一件衫 and the
// rest, and 呢 (unit 5); people, 係, 乜嘢, 呀 (unit 3); 要, 好, 錢 and 幾多
// (units 4 and 6); 嘅 and 同 (unit 10).
(V => {
  V.clothes.unshift(...Words.list('shirt trousers shoes'));
  V.measures.push(...Words.list('gin tiu deoi'));
  V.ones = ['shirt', 'trousers', 'shoes'].map(id => Units.word(5, `one-${id}`));
  V.borrowed = [
    ...Words.list('ngo nei keoi hai m mat-je aa'),
    Words.get('gei-do'), Words.get('ni'),
    ...Words.list('jiu hou cin2'),
    ...Words.list('ge tung'),
  ];
})(window.VOCAB);

// Derived: 一頂帽 and the rest, clothes in colours, what you wear with
// 著 or 戴, and sentences. Audio is generated like any entry.
(V => {
  const byId = Units.byId(V);
  const measure = Units.byId(V.measures);
  V.ones.push(...V.clothes.filter(t => Units.teaches(V, t)).map(t => {
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
  const COLOURS = ['hung', 'caang', 'wong', 'luk', 'laam', 'fan-hung', 'hak', 'baak6'];
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
    say('keoi zoek laam ge trousers tung baak6 ge shoes', 'He / she wears blue trousers and white shoes.'),
    say('keoi daai glasses', 'He / she wears glasses.'),
    say('ngo daai hak ge hat', 'I wear a black hat.'),
    say('ngo jiu baak6 ge shoes', 'I\'d like the white shoes.'),
    say('ni tiu skirt hou leng', 'This skirt is very pretty.'),
    say('ni gin coat gei-do cin2 aa', 'How much is this coat?'),
    say('ngo m zoek coat', 'I\'m not wearing a coat.'),
  ];

  // 著 has other readings (zoek6, asleep); the voice sometimes picks it.
  Units.phonemes(V, ['zoek']);
})(window.VOCAB);
