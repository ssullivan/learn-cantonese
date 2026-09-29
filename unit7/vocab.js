/*
 * Unit 7 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word used to order it; must match its picture's steamer
 * plate or bowl, which tools/check.mjs verifies),
 * say? (text to speak if not hanzi), ssml? (SSML inside <voice> to
 * force a reading the voice gets wrong).
 */
Units.add(7, {
  voice: 'zh-HK-HiuMaanNeural',

  basics: [
    { id: 'yum-cha', hanzi: '飲茶', jyutping: 'jam2 caa4', english: 'yum cha (go for dim sum)',
      note: 'Literally "drink tea". The tea comes first, and the dim sum comes with it.' },
    { id: 'dim-sum', hanzi: '點心', jyutping: 'dim2 sam1', english: 'dim sum', img: false,
      note: 'The small dishes you eat at yum cha, usually shared, often in bamboo steamers.' },
  ],

  groups: [
    { id: 'steamed', hanzi: '蒸', jyutping: 'zing1', english: 'steamed', img: false },
    { id: 'fried', hanzi: '煎炸', jyutping: 'zin1 zaa3', english: 'pan-fried & deep-fried', img: false },
    { id: 'baked', hanzi: '焗', jyutping: 'guk6', english: 'baked', img: false },
    { id: 'sweet', hanzi: '甜', jyutping: 'tim4', english: 'sweet', img: false },
    { id: 'rice-noodles', hanzi: '粥粉麵飯', jyutping: 'zuk1 fan2 min6 faan6', english: 'congee, noodles & rice', img: false,
      note: 'Congee (粥), rice noodles (粉), noodles (麵) and rice (飯): the bigger dishes, on the menu under this heading.' },
  ],

  // Measure words for ordering: 一籠 (steamer basket), 一碟 (plate), and
  // 一碗 (bowl), borrowed from unit 5 below.
  measures: [
    { id: 'lung', hanzi: '籠', jyutping: 'lung4', english: 'basket', dish: 'steamer', img: false,
      note: 'For anything that comes in a bamboo steamer: 一籠蝦餃.' },
    { id: 'dip', hanzi: '碟', jyutping: 'dip6', english: 'plate', dish: 'plate', img: false,
      note: 'For anything that comes on a plate: 一碟腸粉.' },
  ],

  items: [
    { id: 'har-gow', measure: 'lung', group: 'steamed', hanzi: '蝦餃', jyutping: 'haa1 gaau2', english: 'shrimp dumpling',
      note: 'See-through wrapper with a whole shrimp inside. Chefs are judged by these.' },
    { id: 'siu-mai', measure: 'lung', group: 'steamed', hanzi: '燒賣', jyutping: 'siu1 maai2', english: 'pork & shrimp dumpling',
      note: 'Open-topped and yellow, with a dot of orange roe on top.' },
    { id: 'char-siu-bao', measure: 'lung', group: 'steamed', hanzi: '叉燒包', jyutping: 'caa1 siu1 baau1', english: 'BBQ pork bun',
      note: 'A fluffy bun that splits open to show sweet barbecued pork.' },
    { id: 'cheung-fun', measure: 'dip', group: 'steamed', hanzi: '腸粉', jyutping: 'coeng2 fan2', english: 'rice noodle roll',
      note: 'Silky rolls with sweet soy sauce. 腸 is usually coeng4; here it changes to coeng2.' },
    { id: 'chicken-feet', measure: 'dip', group: 'steamed', hanzi: '鳳爪', jyutping: 'fung6 zaau2', english: 'chicken feet',
      note: 'Literally "phoenix claws", steamed in black bean sauce.' },
    { id: 'spare-ribs', measure: 'dip', group: 'steamed', hanzi: '排骨', jyutping: 'paai4 gwat1', english: 'steamed spare ribs',
      note: 'Bite-size ribs with black beans, garlic and chili.' },
    { id: 'lo-mai-gai', measure: 'dip', group: 'steamed', hanzi: '糯米雞', jyutping: 'no6 mai5 gai1', english: 'sticky rice in lotus leaf',
      note: 'Sticky rice with chicken and mushroom. Unwrap it; the leaf is not eaten.' },
    { id: 'xiao-long-bao', measure: 'lung', group: 'steamed', hanzi: '小籠包', jyutping: 'siu2 lung4 baau1', english: 'soup dumpling',
      note: 'From Shanghai: a "little basket bun" with hot soup inside. Bite a small hole and sip the soup first.' },
    { id: 'beef-tripe', measure: 'dip', group: 'steamed', hanzi: '牛柏葉', jyutping: 'ngau4 paak3 jip6', english: 'beef tripe',
      note: 'Steamed with ginger and spring onion. Its thin folds look like leaves (葉). Also written 牛百葉.' },
    { id: 'zaa-loeng', measure: 'dip', group: 'steamed', hanzi: '炸兩', jyutping: 'zaa3 loeng2', english: 'fried dough in rice noodle roll',
      note: 'A crispy fried dough stick rolled up in 腸粉. 兩 is usually loeng5; here it changes to loeng2.' },
    { id: 'spring-roll', measure: 'dip', group: 'fried', hanzi: '春卷', jyutping: 'ceon1 gyun2', english: 'spring roll',
      note: 'Crispy and golden. 春 means spring.' },
    { id: 'turnip-cake', measure: 'dip', group: 'fried', hanzi: '蘿蔔糕', jyutping: 'lo4 baak6 gou1', english: 'turnip cake',
      note: 'White radish (蘿蔔) and rice flour, sliced and pan-fried.' },
    { id: 'ham-sui-gok', measure: 'dip', group: 'fried', hanzi: '鹹水角', jyutping: 'haam4 seoi2 gok3', english: 'fried sticky rice dumpling',
      note: 'A chewy, slightly sweet sticky-rice shell around savory pork, deep-fried. 角 is also said gok2.' },
    { id: 'char-siu-sou', measure: 'dip', group: 'baked', hanzi: '叉燒酥', jyutping: 'caa1 siu1 sou1', english: 'BBQ pork puff',
      note: 'Flaky pastry (酥) around sweet barbecued pork, baked golden.' },
    { id: 'egg-tart', measure: 'dip', group: 'sweet', hanzi: '蛋撻', jyutping: 'daan6 taat1', english: 'egg tart',
      note: '撻 is borrowed from the English word "tart".' },
    { id: 'lai-wong-bao', measure: 'lung', group: 'sweet', hanzi: '流沙包', jyutping: 'lau4 saa1 baau1', english: 'custard lava bun',
      note: '"Flowing sand bun": salted egg-yolk custard runs out when you bite it.' },
    { id: 'ma-lai-go', measure: 'lung', group: 'sweet', hanzi: '馬拉糕', jyutping: 'maa5 laai1 gou1', english: 'Malay sponge cake',
      note: 'A tall, fluffy, brown-sugar sponge cake, steamed.' },
    { id: 'pineapple-bun', measure: 'dip', group: 'sweet', hanzi: '菠蘿包', jyutping: 'bo1 lo4 baau1', english: 'pineapple bun',
      note: 'No pineapple inside! The crackly sugar top just looks like pineapple skin.' },
    { id: 'fried-rice', measure: 'dip', group: 'rice-noodles', hanzi: '炒飯', jyutping: 'caau2 faan6', english: 'fried rice',
      note: '炒 is stir-fry. The classic has barbecued pork, shrimp, egg and spring onion.' },
    { id: 'seafood-noodles', measure: 'dip', group: 'rice-noodles', hanzi: '海鮮炒麵', jyutping: 'hoi2 sin1 caau2 min6', english: 'seafood fried noodles',
      note: 'Crispy fried egg noodles under shrimp, squid and vegetables in a glossy sauce. 海鮮 is seafood.' },
    { id: 'beef-ho-fun', measure: 'dip', group: 'rice-noodles', hanzi: '乾炒牛河', jyutping: 'gon1 caau2 ngau4 ho2', english: 'dry-fried beef ho fun',
      ssml: '乾炒牛<phoneme alphabet="sapi" ph="ho 2">河</phoneme>',
      note: 'Wide rice noodles stir-fried "dry" (乾), with no sauce, with beef and bean sprouts. 河 is usually ho4; here it changes to ho2.' },
    { id: 'congee', measure: 'wun', group: 'rice-noodles', hanzi: '粥', jyutping: 'zuk1', english: 'congee',
      note: 'Smooth rice porridge, often with century egg and pork. It comes in a bowl: 一碗粥.' },
  ],

  phrases: [
    { id: 'more-water', hanzi: '唔該加水', jyutping: 'm4 goi1 gaa1 seoi2', english: 'more hot water, please', img: false,
      note: 'Or just leave the teapot lid tilted open, and staff will refill it.' },
    { id: 'bill', hanzi: '唔該埋單', jyutping: 'm4 goi1 maai4 daan1', english: 'the bill, please', img: false,
      note: 'Staff tally your order on a card stamped at each table.' },
  ],
});

// Borrowed: 碗 is taught in unit 5; congee comes in a bowl.
window.VOCAB.measures.push({ ...Units.word(5, 'wun'), english: 'bowl',
  note: 'For anything that comes in a bowl: 一碗粥.' });

// Derived: "one basket/plate/bowl of X" for every dish (一籠蝦餃), used for
// orders in the trolley game. Audio is generated like any other entry.
(V => {
  const m = Object.fromEntries(V.measures.map(x => [x.id, x]));
  V.portions = V.items.map(i => ({
    id: `one-${i.id}`,
    hanzi: `一${m[i.measure].hanzi}${i.hanzi}`,
    jyutping: `jat1 ${m[i.measure].jyutping} ${i.jyutping}`,
    english: `${i.english} (1 ${m[i.measure].english})`,
    item: i.id,
    img: false,
    // A dish the voice misreads (its ssml) is read from jyutping in the
    // order: audio-check found that best for 一碟乾炒牛河.
    ...(i.ssml && { phoneme: true }),
  }));
})(window.VOCAB);

// Borrowed: 唔該 is taught in unit 2; the trolley game says it before every order.
window.VOCAB.phrases.unshift(Units.word(2, 'm-goi'));

// Derived: orders built from words, for Build & Say (Tiles.round):
// 我要 + number + measure + dish, for every dish. `step` is the level:
// "one" (一), "count" (two to five; two is 兩 before a measure, with 二 as
// a wrong tile), "please" (唔該 first, with 多謝 as a wrong tile). The
// first, a basket of har gow, is kept with the phrases for the learn page.
// They are read from their jyutping: audio-check flagged a third fewer
// clips than reading the characters (tone 5 said like 2 in 我 兩 五).
(V => {
  V.orderWords = [Units.word(3, 'ngo'), Units.word(6, 'jiu'), Units.word(2, 'thanks'),
    Units.word(4, 'loeng'), ...[1, 2, 3, 4, 5].map(n => Units.word(4, `n${n}`))];
  const say = Units.sentences(V);
  const NUM = ['', 'one', 'two', 'three', 'four', 'five'];
  const count = n => n === 2 ? 'loeng' : `n${n}`;
  const order = (i, n, step) => {
    const please = step === 'please';
    const e = say(`${please ? 'm-goi ' : ''}ngo jiu ${count(n)} ${i.measure} ${i.id}`,
      `${please ? 'Excuse me! ' : ''}I'd like ${NUM[n]} order${n > 1 ? 's' : ''} of ${i.english}`,
      { step, phoneme: true, decoys: [...(n === 2 ? ['n2'] : []), ...(please ? ['thanks'] : [])] });
    if (please) e.hanzi = e.hanzi.replace('唔該', '唔該，');
    return e;
  };
  const [first, ...orders] = V.items.flatMap((i, k) => [
    order(i, 1, 'one'),
    order(i, 2 + k % 4, 'count'),
    order(i, 2 + (k + 2) % 4, 'please'),
  ]);
  V.phrases.splice(1, 0, { ...first, note: '籠 (lung4) is a steamer basket. Swap in any dish.' });
  V.orders = orders;
})(window.VOCAB);
