/*
 * Unit 1 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture),
 * say? (text to speak if not hanzi), ssml? (SSML inside <voice> to
 * force a reading the voice gets wrong).
 */
window.VOCAB = {
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
    { id: 'sweet', hanzi: '甜', jyutping: 'tim4', english: 'sweet', img: false },
  ],

  items: [
    { id: 'har-gow', group: 'steamed', hanzi: '蝦餃', jyutping: 'haa1 gaau2', english: 'shrimp dumpling',
      note: 'See-through wrapper with a whole shrimp inside. Chefs are judged by these.' },
    { id: 'siu-mai', group: 'steamed', hanzi: '燒賣', jyutping: 'siu1 maai2', english: 'pork & shrimp dumpling',
      note: 'Open-topped and yellow, with a dot of orange roe on top.' },
    { id: 'char-siu-bao', group: 'steamed', hanzi: '叉燒包', jyutping: 'caa1 siu1 baau1', english: 'BBQ pork bun',
      note: 'A fluffy bun that splits open to show sweet barbecued pork.' },
    { id: 'cheung-fun', group: 'steamed', hanzi: '腸粉', jyutping: 'coeng2 fan2', english: 'rice noodle roll',
      note: 'Silky rolls with sweet soy sauce. 腸 is usually coeng4; here it changes to coeng2.' },
    { id: 'chicken-feet', group: 'steamed', hanzi: '鳳爪', jyutping: 'fung6 zaau2', english: 'chicken feet',
      note: 'Literally "phoenix claws", steamed in black bean sauce.' },
    { id: 'spare-ribs', group: 'steamed', hanzi: '排骨', jyutping: 'paai4 gwat1', english: 'steamed spare ribs',
      note: 'Bite-size ribs with black beans, garlic and chili.' },
    { id: 'lo-mai-gai', group: 'steamed', hanzi: '糯米雞', jyutping: 'no6 mai5 gai1', english: 'sticky rice in lotus leaf',
      note: 'Sticky rice with chicken and mushroom. Unwrap it; the leaf is not eaten.' },
    { id: 'spring-roll', group: 'fried', hanzi: '春卷', jyutping: 'ceon1 gyun2', english: 'spring roll',
      note: 'Crispy and golden. 春 means spring.' },
    { id: 'turnip-cake', group: 'fried', hanzi: '蘿蔔糕', jyutping: 'lo4 baak6 gou1', english: 'turnip cake',
      note: 'White radish (蘿蔔) and rice flour, sliced and pan-fried.' },
    { id: 'egg-tart', group: 'sweet', hanzi: '蛋撻', jyutping: 'daan6 taat1', english: 'egg tart',
      note: '撻 is borrowed from the English word "tart".' },
    { id: 'lai-wong-bao', group: 'sweet', hanzi: '流沙包', jyutping: 'lau4 saa1 baau1', english: 'custard lava bun',
      note: '"Flowing sand bun": salted egg-yolk custard runs out when you bite it.' },
    { id: 'ma-lai-go', group: 'sweet', hanzi: '馬拉糕', jyutping: 'maa5 laai1 gou1', english: 'Malay sponge cake',
      note: 'A tall, fluffy, brown-sugar sponge cake, steamed.' },
    { id: 'pineapple-bun', group: 'sweet', hanzi: '菠蘿包', jyutping: 'bo1 lo4 baau1', english: 'pineapple bun',
      note: 'No pineapple inside! The crackly sugar top just looks like pineapple skin.' },
  ],

  phrases: [
    { id: 'm-goi', hanzi: '唔該', jyutping: 'm4 goi1', english: 'please / thank you (for a service)', img: false,
      note: 'Use it to get a server\'s attention and to thank them.' },
    { id: 'order-har-gow', hanzi: '我要一籠蝦餃', jyutping: 'ngo5 jiu3 jat1 lung4 haa1 gaau2', english: 'I\'d like a basket of har gow', img: false,
      note: '籠 (lung4) is a steamer basket. Swap in any dish.' },
    { id: 'more-water', hanzi: '唔該加水', jyutping: 'm4 goi1 gaa1 seoi2', english: 'more hot water, please', img: false,
      note: 'Or just leave the teapot lid tilted open, and staff will refill it.' },
    { id: 'bill', hanzi: '唔該埋單', jyutping: 'm4 goi1 maai4 daan1', english: 'the bill, please', img: false,
      note: 'Staff tally your order on a card stamped at each table.' },
  ],
};
