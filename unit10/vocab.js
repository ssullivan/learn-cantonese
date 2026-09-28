/*
 * Unit 10 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), measure? (id of
 * the measure word it is counted with), phoneme? (true: tools/tts.mjs
 * reads the jyutping exactly), member (true: one person on the family
 * tree, for Family Tree and the listening quiz), and means (the id of
 * the member) on the 嘅 chains in `relations`.
 *
 * Family members are drawn as a small family tree with the one meant
 * marked (art.mjs). Phrases and sentences are derived at the bottom of
 * this file, never typed out.
 */
Units.add(10, {
  voice: 'zh-HK-HiuMaanNeural',

  parents: [
    { id: 'home', hanzi: '屋企', jyutping: 'uk1 kei2', english: 'home; family',
      note: '企 is kei5 on its own, but kei2 here.' },
    { id: 'family', hanzi: '屋企人', jyutping: 'uk1 kei2 jan4', english: 'family (the people)',
      note: 'Literally "home people".' },
    { id: 'dad', hanzi: '爸爸', jyutping: 'baa4 baa1', english: 'dad; father',
      note: 'Low, then high. Casually 老豆 lou5 dau6.' },
    { id: 'mum', hanzi: '媽媽', jyutping: 'maa4 maa1', english: 'mum; mother',
      note: 'Low, then high, like 爸爸. Casually 阿媽 aa3 maa1.' },
  ],

  // Older and younger always get different words.
  siblings: [
    { id: 'elder-brother', hanzi: '哥哥', jyutping: 'go4 go1', english: 'older brother',
      note: 'Casually 大佬 daai6 lou2, "big guy".' },
    { id: 'elder-sister', hanzi: '家姐', jyutping: 'gaa1 ze1', english: 'older sister',
      note: '姐 is ze2 on its own, but ze1 here.' },
    { id: 'younger-brother', hanzi: '細佬', jyutping: 'sai3 lou2', english: 'younger brother',
      note: '細 is small, as in 細路 (child).' },
    { id: 'younger-sister', hanzi: '細妹', jyutping: 'sai3 mui2', english: 'younger sister',
      note: '妹 is mui6 on its own, but mui2 here.' },
    { id: 'siblings', hanzi: '兄弟姊妹', jyutping: 'hing1 dai6 zi2 mui6', english: 'brothers and sisters',
      note: 'Four words in one: older and younger brothers, older and younger sisters.' },
  ],

  // Dad's parents and mum's parents have different names.
  grandparents: [
    { id: 'dads-dad', hanzi: '爺爺', jyutping: 'je4 je2', english: 'grandpa (dad\'s dad)' },
    { id: 'dads-mum', hanzi: '嫲嫲', jyutping: 'maa4 maa4', english: 'grandma (dad\'s mum)',
      note: 'Low and falling twice, unlike 媽媽 maa4 maa1.' },
    { id: 'mums-dad', hanzi: '公公', jyutping: 'gung4 gung1', english: 'grandpa (mum\'s dad)',
      note: '公 is gung1, but the first one drops to tone 4.' },
    { id: 'mums-mum', hanzi: '婆婆', jyutping: 'po4 po2', english: 'grandma (mum\'s mum)',
      note: 'Also a polite word for any old lady.' },
  ],

  own: [
    { id: 'husband', hanzi: '老公', jyutping: 'lou5 gung1', english: 'husband' },
    { id: 'wife', hanzi: '老婆', jyutping: 'lou5 po4', english: 'wife' },
    { id: 'son', measure: 'go', hanzi: '仔', jyutping: 'zai2', english: 'son',
      note: 'Counted with 個: 我個仔, my son.' },
    // Azure says 女 on its own as neoi5 whatever it's told, so MiniMax makes it.
    { id: 'daughter', measure: 'go', hanzi: '女', jyutping: 'neoi2', english: 'daughter', voice: 'minimax:Cantonese_ProfessionalHost（F)',
      note: '女 is neoi5 (female), but neoi2 for a daughter: 我個女.' },
    { id: 'children', hanzi: '仔女', jyutping: 'zai2 neoi2', english: 'children (sons and daughters)' },
  ],

  words: [
    { id: 'ge', hanzi: '嘅', jyutping: 'ge3', english: '\'s; of (makes "my", "whose")', img: false,
      note: 'After a person: 我嘅書, my book. On its own at the end: 係我嘅, it\'s mine.' },
    { id: 'tung', hanzi: '同', jyutping: 'tung4', english: 'and; with', img: false,
      note: 'Joins people: 爸爸同媽媽. Before a verb it means "with": 我同佢住.' },
    { id: 'zyu', hanzi: '住', jyutping: 'zyu6', english: 'to live (somewhere)', img: false },
    { id: 'seoi', hanzi: '歲', jyutping: 'seoi3', english: 'years old', img: false,
      note: 'No 係 needed: 佢三歲, he / she is three.' },
  ],
});

// The members: one person each on the tree (not 屋企, 屋企人, 兄弟姊妹, 仔女).
(V => {
  const groups = ['home', 'family', 'siblings', 'children'];
  for (const e of [...V.parents, ...V.siblings, ...V.grandparents, ...V.own]) if (!groups.includes(e.id)) e.member = true;
})(window.VOCAB);

// Borrowed: people and question words (unit 3), 個, 兩, 幾多 and 三 (unit 4),
// and measure words, 有, 呢 and things to own (unit 5).
(V => {
  V.measures = [Units.word(4, 'go'), ...['zek', 'bun', 'zi', 'gin'].map(id => Units.word(5, id))];
  V.things = ['cat', 'dog', 'book', 'pen', 'shirt'].map(id => Units.word(5, id));
  V.borrowed = [
    ...['ngo', 'nei', 'keoi', 'hai', 'bin-go', 'aa'].map(id => Units.word(3, id)),
    ...['loeng', 'gei-do', 'n3'].map(id => Units.word(4, id)),
    ...['jau', 'ni'].map(id => Units.word(5, id)),
  ];
})(window.VOCAB);

// Derived: phrases and sentences. Audio is generated like any entry.
(V => {
  const say = Units.sentences(V);

  // 嘅 chains that name one person on the family tree: `means` is who.
  V.relations = [
    say('dad ge dad', 'dad\'s dad', { means: 'dads-dad' }),
    say('dad ge mum', 'dad\'s mum', { means: 'dads-mum' }),
    say('mum ge dad', 'mum\'s dad', { means: 'mums-dad' }),
    say('mum ge mum', 'mum\'s mum', { means: 'mums-mum' }),
    say('dad ge wife', 'dad\'s wife', { means: 'mum' }),
    say('mum ge husband', 'mum\'s husband', { means: 'dad' }),
    say('dads-dad ge wife', 'grandpa\'s wife (dad\'s side)', { means: 'dads-mum' }),
    say('mums-mum ge husband', 'grandma\'s husband (mum\'s side)', { means: 'mums-dad' }),
    say('dads-mum ge son', 'grandma\'s son (dad\'s side)', { means: 'dad' }),
    say('mums-dad ge daughter', 'grandpa\'s daughter (mum\'s side)', { means: 'mum' }),
  ];

  // Whose: 嘅 after a person, dropped before close family.
  V.whose = [
    say('ngo ge book', 'my book', { note: '嘅 after a person makes "my", "your", "his / her".' }),
    say('nei ge pen', 'your pen'),
    say('ngo ge', 'mine'),
    say('bin-go ge', 'whose', { note: 'Literally "who\'s".' }),
    say('ngo dad', 'my dad', { note: 'Close family and friends need no 嘅: 我爸爸, 我朋友.' }),
    say('nei mum', 'your mum'),
    say('keoi elder-sister', 'his / her older sister', { phoneme: true }),
    say('ngo dad tung mum', 'my dad and mum'),
  ];

  // A person + measure word + noun: "my (particular) one". Measures.round
  // looks them up as <owner>-<measure>-<thing>.
  const OWNER = { ngo: 'my', nei: 'your', keoi: 'his / her' };
  const owned = [...V.own.filter(e => e.measure), ...V.things];
  V.mine = Object.entries(OWNER).flatMap(([who, whose]) =>
    owned.map(t => say(`${who} ${t.measure} ${t.id}`, `${whose} ${t.english}`, { thing: t.id })));
  const byId = Object.fromEntries(V.mine.map(e => [e.id, e]));
  byId['ngo-go-son'].note = 'Person + measure word + noun: 我個仔. 我嘅仔 is right too, but less usual.';
  byId['ngo-zek-cat'].note = 'The measure word does the work of 嘅: 我隻貓, my cat.';

  V.sentences = [
    say('keoi hai ngo mum', 'She is my mum.', { note: 'No 嘅 before close family: 我媽媽.' }),
    say('keoi hai ngo husband', 'He is my husband.'),
    say('ni go hai ngo elder-brother', 'This is my older brother.', { note: '呢個 points at a person too.' }),
    say('keoi hai bin-go aa', 'Who is he / she?'),
    say('ni bun book hai ngo ge', 'This book is mine.'),
    say('ni bun book hai bin-go ge aa', 'Whose book is this?', { note: '邊個嘅 goes where the answer goes: 係我嘅.' }),
    say('hai ngo ge', 'It\'s mine.'),
    say('ngo jau loeng go elder-sister', 'I have two older sisters.', { note: 'Family members are counted with 個.' }),
    say('nei jau gei-do go siblings aa', 'How many brothers and sisters do you have?'),
    say('nei go daughter gei-do seoi aa', 'How old is your daughter?', { note: '幾多歲: "how many years".' }),
    say('ngo go son n3 seoi', 'My son is three.', { note: 'No 係 before an age.' }),
    say('ngo tung family zyu', 'I live with my family.', { note: '同 before the verb: "with".' }),
  ];
})(window.VOCAB);
