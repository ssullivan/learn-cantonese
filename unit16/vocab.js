/*
 * Unit 16 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), phoneme? (true:
 * tools/tts.mjs reads the jyutping exactly), plus ing (the English
 * "…ing"), out (true: you go out for it, so 想去 + it) and skill (true: a
 * thing you learn, so 識 + it) on hobbies, hobby (its id) and yes (true:
 * 鍾意 or 識; false: 唔鍾意 or 唔識) on likes and cans, and hobby, kind
 * (like, can, want) and answers (ids: yes, no) on questions.
 *
 * Hobbies are a verb and a thing (游 + 水), like Unit 15's day, so 過 and
 * 緊 still go between them (游過水). They, likes, cans, questions and
 * sentences are derived at the bottom of this file, never typed out.
 */
Units.add(16, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '山相想',

  // The verbs of free time. 打 睇 做 are borrowed below.
  verbs: [
    { id: 'coeng', hanzi: '唱', jyutping: 'coeng3', english: 'to sing', img: false },
    { id: 'teng', hanzi: '聽', jyutping: 'teng1', english: 'to listen (to)', img: false,
      note: 'teng1 when you speak; 聽日 (tomorrow, Unit 9) is ting1.' },
    { id: 'jau4', hanzi: '游', jyutping: 'jau4', english: 'to swim', img: false },
    { id: 'haang', hanzi: '行', jyutping: 'haang4', english: 'to walk', img: false,
      note: 'As in 行路 (Unit 11).' },
    { id: 'tek', hanzi: '踢', jyutping: 'tek3', english: 'to kick', img: false },
    { id: 'tiu', hanzi: '跳', jyutping: 'tiu3', english: 'to jump', img: false },
    { id: 'jing', hanzi: '影', jyutping: 'jing2', english: 'to take (a photo)', img: false },
    { id: 'waak', hanzi: '畫', jyutping: 'waak6', english: 'to draw; to paint', img: false,
      note: 'The verb is waak6; the picture you make is waa2.' },
    { id: 'caai', hanzi: '踩', jyutping: 'caai2', english: 'to step on; to pedal', img: false },
  ],

  // What they are done to. 波 水 are borrowed below.
  things: [
    { id: 'hei3', hanzi: '戲', jyutping: 'hei3', english: 'a film; a show', img: false },
    { id: 'gei1', hanzi: '機', jyutping: 'gei1', english: 'a machine; a games console', img: false,
      note: 'As in 機場 (Unit 11), "machine place".' },
    { id: 'kei', hanzi: 'K', jyutping: 'kei1', english: 'karaoke (in 唱K)', img: false,
      note: 'The English letter K, from "karaoke".' },
    { id: 'go1', hanzi: '歌', jyutping: 'go1', english: 'a song', img: false },
    { id: 'saan', hanzi: '山', jyutping: 'saan1', english: 'a hill; a mountain', img: false },
    { id: 'gaai', hanzi: '街', jyutping: 'gaai1', english: 'a street', img: false },
    { id: 'mou5', hanzi: '舞', jyutping: 'mou5', english: 'a dance', img: false },
    { id: 'soeng2', hanzi: '相', jyutping: 'soeng2', english: 'a photo', img: false },
    { id: 'waa', hanzi: '畫', jyutping: 'waa2', english: 'a picture; a painting', img: false,
      note: 'The same character as the verb 畫 waak6: 畫畫 is waak6 waa2.' },
    { id: 'daan-ce', hanzi: '單車', jyutping: 'daan1 ce1', english: 'a bicycle', img: false,
      note: '"Single car": 車 as in Unit 1.' },
  ],

  grammar: [
    { id: 'zung-ji', hanzi: '鍾意', jyutping: 'zung1 ji3', english: 'to like', img: false,
      note: 'Before a verb or a thing: 鍾意游水, 鍾意貓. Also written 中意.' },
    { id: 'zung', hanzi: '鍾', jyutping: 'zung1', english: '(the first half of 鍾意)', img: false,
      note: 'Asking A唔A, only the first half comes twice: 鍾唔鍾意.' },
    { id: 'soeng', hanzi: '想', jyutping: 'soeng2', english: 'to want to; would like to', img: false,
      note: 'Before the verb: 想去, want to go.' },
  ],

  talk: [
    { id: 'hing-ceoi', hanzi: '興趣', jyutping: 'hing3 ceoi3', english: 'an interest; a hobby', img: false },
    { id: 'dak-haan', hanzi: '得閒', jyutping: 'dak1 haan4', english: 'free (not busy)', img: false,
      note: 'Busy is 唔得閒.' },
    { id: 'zau-mut', hanzi: '周末', jyutping: 'zau1 mut6', english: 'the weekend', img: false },
    { id: 'jat-cai', hanzi: '一齊', jyutping: 'jat1 cai4', english: 'together', img: false,
      note: 'Before the verb: 一齊去, go together.' },
  ],
});

// Borrowed: 水 (unit 1), 我 你 佢 唔 識 都 乜嘢 呀 (unit 3), 波 貓 有
// (unit 5), 好 (unit 6), 聽日 and the weekend (unit 9), 去 (unit 11), 打
// and 會 (unit 13), 睇 冇 未 (unit 14), and 做 過 and reading and TV
// (unit 15), with the measure words those nouns are counted with.
(V => {
  V.measures = [Units.word(4, 'go'), Units.word(5, 'zek')];
  V.borrowed = [
    Units.word(1, 'water'),
    ...['ngo', 'nei', 'keoi', 'm', 'sik', 'dou', 'mat-je', 'aa'].map(id => Units.word(3, id)),
    ...['ball', 'cat', 'jau'].map(id => Units.word(5, id)),
    Units.word(6, 'hou'),
    ...['ting-jat', 'wk6', 'wk7'].map(id => Units.word(9, id)),
    Units.word(11, 'heoi'),
    ...['daa', 'wui'].map(id => Units.word(13, id)),
    ...['tai', 'mou', 'mei'].map(id => Units.word(14, id)),
    ...['zou6', 'gwo'].map(id => Units.word(15, id)),
  ];
})(window.VOCAB);

// Derived: the hobbies, what you like and can do, questions about them,
// and sentences. Audio is generated like any entry; art.mjs draws each
// new hobby.
(V => {
  let say = Units.sentences(V);
  // Each hobby: its words (verb first), "to …", "…ing", whether you go
  // out for it (去游水) and whether you learn it (識游水).
  const OUT = 1, SKILL = 2;
  const HOBBY = [
    ['tai hei3', 'to watch a film', 'watching films', OUT],
    ['daa ball', 'to play basketball; to play ball', 'playing basketball', OUT | SKILL],
    ['tek ball', 'to play football', 'playing football', OUT | SKILL],
    ['daa gei1', 'to play video games', 'playing video games', 0],
    ['coeng kei', 'to sing karaoke', 'singing karaoke', OUT],
    ['teng go1', 'to listen to music', 'listening to music', 0],
    ['jau4 water', 'to swim', 'swimming', OUT | SKILL],
    ['haang saan', 'to go hiking', 'hiking', OUT],
    ['haang gaai', 'to go shopping; to stroll round the shops', 'going shopping', OUT],
    ['tiu mou5', 'to dance', 'dancing', OUT | SKILL],
    ['jing soeng2', 'to take photos', 'taking photos', 0],
    ['waak waa', 'to draw; to paint', 'drawing', SKILL],
    ['caai daan-ce', 'to ride a bike', 'cycling', OUT | SKILL],
  ];
  const NOTE = {
    'tai-hei3': '睇 is to watch (Unit 14); 戲 is anything on a stage or screen.',
    'daa-ball': '"Hit the ball": basketball, or any game with a ball in your hands.',
    'tek-ball': '"Kick the ball": football.',
    'daa-gei1': '"Hit the machine": video games of any kind.',
    'teng-go1': '"Listen to songs".',
    'jau4-water': '"Swim the water".',
    'haang-saan': '"Walk the hills": Hong Kong has lots of trails.',
    'haang-gaai': '"Walk the streets": shopping, or just looking.',
    'caai-daan-ce': '"Pedal the bicycle".',
  };
  V.hobbies = [
    ...HOBBY.map(([ids, english, ing, f]) => {
      const e = say(ids, english, { ing, out: !!(f & OUT), skill: !!(f & SKILL), img: undefined });
      return NOTE[e.id] ? { ...e, note: NOTE[e.id] } : e;
    }),
    // Reading and TV from Unit 15, with their pictures.
    ...['tai-book', 'tai-din-si'].map(id => ({ ...Units.word(15, id), out: false, skill: false })),
  ];
  // "to play basketball; to play ball" → "play basketball".
  const base = h => h.english.replace(/^to |;.*/g, '');
  const skills = V.hobbies.filter(h => h.skill);

  // What I like, and what I can do: 我鍾意游水, 我唔鍾意游水, 我識游水.
  say = Units.sentences(V);
  V.likes = V.hobbies.flatMap(h => [
    say(`ngo zung-ji ${h.id}`, `I like ${h.ing}.`, { hobby: h.id, yes: true }),
    say(`ngo m zung-ji ${h.id}`, `I don't like ${h.ing}.`, { hobby: h.id, yes: false }),
  ]);
  V.likes[0].note = '鍾意 goes before the activity.';
  V.likes[1].note = '唔 goes before 鍾意: don\'t like.';
  V.cans = skills.flatMap(h => [
    say(`ngo sik ${h.id}`, `I can ${base(h)}.`, { hobby: h.id, yes: true }),
    say(`ngo m sik ${h.id}`, `I can't ${base(h)}.`, { hobby: h.id, yes: false }),
  ]);
  V.cans[0].note = '識 (Unit 3): know how to, for things you learn.';

  // Short answers, and the questions they answer: A唔A, with only the
  // first half of 鍾意 twice.
  V.answers = [
    say('m zung-ji', 'No, I don\'t (like it).'),
    say('m sik', 'No, I can\'t.'),
    say('m soeng', 'No, I don\'t want to.'),
    say('hou aa', 'OK! Sure!', { note: 'The answer to an invitation.' }),
  ];
  const go = h => h.out ? `heoi ${h.id}` : h.id;
  V.asks = [
    ...V.hobbies.map(h => say(`nei zung m zung-ji ${h.id} aa`, `Do you like ${h.ing}?`,
      { hobby: h.id, kind: 'like', answers: ['zung-ji', 'm-zung-ji'] })),
    ...skills.flatMap(h => [
      say(`nei sik m sik ${h.id} aa`, `Can you ${base(h)}?`, { hobby: h.id, kind: 'can', answers: ['sik', 'm-sik'] }),
      say(`nei soeng m soeng ${go(h)} aa`, `Do you want to ${base(h)}?`, { hobby: h.id, kind: 'want', answers: ['soeng', 'm-soeng'] }),
    ]),
  ];
  V.asks[0].note = 'Only 鍾 comes twice: 鍾唔鍾意. Answer 鍾意 or 唔鍾意.';
  V.asks.find(q => q.kind === 'can').note = 'Answer 識 or 唔識.';
  V.asks.find(q => q.kind === 'want').note = '去 before the activity: go and do it. Answer 想 or 唔想.';

  say = Units.sentences(V);
  V.sentences = [
    say('nei jau mat-je hing-ceoi aa', 'What are your hobbies?', { note: '"You have what interests?"' }),
    say('nei dak-haan zou6 mat-je aa', 'What do you do in your free time?', { note: '得閒 goes before the verb, like a time.' }),
    say('ngo dak-haan zung-ji teng-go1', 'In my free time I like listening to music.'),
    say('ngo hou zung-ji tai-hei3', 'I really like watching films.', { note: '好 before 鍾意: really like.' }),
    say('ngo dou zung-ji tai-hei3', 'I like watching films too.', { note: '都 goes before the verb (Unit 3).' }),
    say('ngo zung-ji cat', 'I like cats.', { note: '鍾意 a thing, too.' }),
    say('keoi zung-ji daa-gei1', 'They like playing video games.'),
    say('nei soeng zou6 mat-je aa', 'What do you want to do?'),
    say('ngo soeng heoi haang-saan', 'I want to go hiking.', { note: '想 before the verb, and 去 before what you go out to do.' }),
    say('zau-mut jat-cai heoi coeng-kei aa', 'Let\'s go to karaoke together at the weekend!', { note: '一齊…呀: an invitation. Say 好呀！' }),
    say('ngo wk6 wui heoi jau4-water', 'I\'m going swimming on Saturday.', { note: '會 (Unit 13): will. The day goes before it.' }),
    say('nei ting-jat wui m wui heoi tek-ball aa', 'Are you going to play football tomorrow?', { note: '會唔會: will you or not?' }),
    say('ngo wui jau4-water', 'I can swim.', { note: '會 can say can too: 我會游水 is 我識游水.' }),
    say('keoi m sik tiu-mou5', 'They can\'t dance.'),
    say('nei jau mou coeng gwo kei aa', 'Have you ever been to karaoke?', { note: '過 goes after the verb (Unit 15), inside the activity: 唱過K.' }),
    say('ngo mei haang gwo saan', 'I haven\'t been hiking yet.'),
  ];

  // Read from their jyutping: 畫畫 (waak6 waa2, one character read two
  // ways; the voice says waa2 waa2), K, 相 (not soeng1 or soeng3 on its
  // own) and 識 in 識唔識.
  Units.phonemes(V, ['waak', 'waa', 'kei', 'soeng2', 'sik']);
})(window.VOCAB);
