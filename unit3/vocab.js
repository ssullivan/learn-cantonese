/*
 * Unit 3 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), say? (text to
 * speak if not hanzi), ssml? (SSML inside <voice> to force a reading
 * the voice gets wrong), phoneme? (true: tools/tts.mjs reads the
 * jyutping exactly).
 *
 * Sentences are derived from the words, never typed out: see the bottom
 * of this file. Each keeps its word ids in `words`, which Question
 * Builder (builder.js) turns into tiles.
 */
Units.add(3, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '人我名',

  // Pictures: the speaker has the speech bubble, the listener faces them,
  // and a third person stands behind. The one(s) meant are highlighted.
  people: [
    { id: 'ngo', hanzi: '我', jyutping: 'ngo5', english: 'I; me' },
    { id: 'nei', hanzi: '你', jyutping: 'nei5', english: 'you' },
    { id: 'keoi', hanzi: '佢', jyutping: 'keoi5', english: 'he; she; it',
      note: 'One word for he, she and it.' },
    { id: 'ngo-dei', hanzi: '我哋', jyutping: 'ngo5 dei6', english: 'we; us',
      note: 'Add 哋 to make any of the three plural.' },
    { id: 'nei-dei', hanzi: '你哋', jyutping: 'nei5 dei6', english: 'you (more than one)' },
    { id: 'keoi-dei', hanzi: '佢哋', jyutping: 'keoi5 dei6', english: 'they; them' },
  ],

  words: [
    { id: 'hai', hanzi: '係', jyutping: 'hai6', english: 'am; is; are', img: false,
      note: 'Links two nouns: 我係學生, I am a student. Never before an adjective.' },
    { id: 'm', hanzi: '唔', jyutping: 'm4', english: 'not', img: false,
      note: 'Goes right before the verb: 唔係, 唔識.' },
    { id: 'giu', hanzi: '叫', jyutping: 'giu3', english: 'to be called', img: false },
    { id: 'meng', hanzi: '名', jyutping: 'meng2', english: 'name', img: false, phoneme: true,
      note: 'meng4 in writing, but meng2 when you ask a name.' },
    { id: 'sik', hanzi: '識', jyutping: 'sik1', english: 'to know how to; can', img: false,
      note: 'For skills you have learned, like a language.' },
    { id: 'gong', hanzi: '講', jyutping: 'gong2', english: 'to speak; to say', img: false },
    { id: 'dou', hanzi: '都', jyutping: 'dou1', english: 'also; too', img: false,
      note: 'Goes before the verb: 我都係, me too.' },
    { id: 'aa-ming', hanzi: '阿明', jyutping: 'aa3 ming4', english: 'Ah Ming (a name)', img: false,
      note: '阿 before one syllable of a name is friendly, like a nickname.' },
  ],

  things: [
    { id: 'lou-si', hanzi: '老師', jyutping: 'lou5 si1', english: 'teacher' },
    { id: 'hok-saang', hanzi: '學生', jyutping: 'hok6 saang1', english: 'student' },
    { id: 'pang-jau', hanzi: '朋友', jyutping: 'pang4 jau5', english: 'friend' },
    { id: 'hoeng-gong-jan', hanzi: '香港人', jyutping: 'hoeng1 gong2 jan4', english: 'Hongkonger',
      note: '人 after a place makes a person from there.' },
    { id: 'jing-gwok-jan', hanzi: '英國人', jyutping: 'jing1 gwok3 jan4', english: 'British person', img: false },
    { id: 'mei-gwok-jan', hanzi: '美國人', jyutping: 'mei5 gwok3 jan4', english: 'American', img: false },
    Units.word(1, 'cantonese'),
    { id: 'jing-man', hanzi: '英文', jyutping: 'jing1 man2', english: 'English', img: false, phoneme: true },
  ],

  // Question words stay where the answer goes: 佢係邊個？ 佢係阿明。
  asking: [
    { id: 'bin-go', hanzi: '邊個', jyutping: 'bin1 go3', english: 'who', img: false },
    { id: 'mat-je', hanzi: '乜嘢', jyutping: 'mat1 je5', english: 'what', img: false },
    { id: 'maa', hanzi: '嗎', jyutping: 'maa3', english: '(turns a sentence into a yes/no question)', img: false, phoneme: true,
      note: 'Add it to the end of a sentence. Never with 邊個, 乜嘢 or A唔A.' },
    { id: 'aa', hanzi: '呀', jyutping: 'aa3', english: '(softens a question or an answer)', img: false, phoneme: true,
      note: 'Questions without it can sound blunt.' },
    { id: 'ne', hanzi: '呢', jyutping: 'ne1', english: 'and ...? (what about)', img: false, phoneme: true,
      note: 'After a person: 你呢？, and you?' },
    { id: 'siu-siu', hanzi: '少少', jyutping: 'siu2 siu2', english: 'a little', img: false },
    { id: 'hai-mai', hanzi: '係咪', jyutping: 'hai6 mai6', english: 'is it? (short for 係唔係)', img: false,
      note: 'Fast speech squeezes 係唔係 into 係咪. You will hear it everywhere.' },
  ],
});

// Derived: sentences made of the words above (Units.sentences). `words`
// lists their ids in order. Audio is generated like any entry. The sets are named by
// what Question Builder practises with them.
(V => {
  const say = Units.sentences(V);

  V.statements = [
    say('ngo hai hok-saang', 'I am a student.'),
    say('keoi hai lou-si', 'He / she is a teacher.'),
    say('keoi hai hok-saang', 'He / she is a student.'),
    say('keoi hai hoeng-gong-jan', 'He / she is a Hongkonger.'),
    say('ngo-dei hai pang-jau', 'We are friends.'),
    say('keoi hai ngo pang-jau', 'He / she is my friend.', { note: '我朋友: "my friend", with nothing in between for people close to you.' }),
    say('ngo m hai lou-si', 'I am not a teacher.'),
    say('keoi-dei m hai jing-gwok-jan', 'They are not British.'),
    say('nei-dei hai mei-gwok-jan', 'You (all) are American.'),
    say('ngo giu aa-ming', 'My name is Ah Ming.', { note: 'Literally "I am called Ah Ming".' }),
    say('ngo sik gong cantonese', 'I can speak Cantonese.'),
    say('keoi m sik gong jing-man', 'He / she can\'t speak English.'),
    say('ngo dou hai hoeng-gong-jan', 'I am a Hongkonger too.'),
  ];

  V.maa = [
    say('nei hai hok-saang maa', 'Are you a student?', { note: 'Take the sentence 你係學生 and add 嗎.' }),
    say('keoi hai lou-si maa', 'Is he / she a teacher?'),
    say('keoi hai hok-saang maa', 'Is he / she a student?'),
    say('keoi hai hoeng-gong-jan maa', 'Is he / she a Hongkonger?'),
    say('keoi-dei hai pang-jau maa', 'Are they friends?'),
    say('nei sik gong cantonese maa', 'Can you speak Cantonese?'),
  ];

  V.aNotA = [
    say('nei hai m hai hok-saang aa', 'Are you a student?', { note: '係唔係: "are or aren\'t". No 嗎 needed.' }),
    say('keoi hai m hai lou-si aa', 'Is he / she a teacher?'),
    say('keoi hai m hai hok-saang aa', 'Is he / she a student?'),
    say('keoi hai m hai hoeng-gong-jan aa', 'Is he / she a Hongkonger?'),
    say('nei-dei hai m hai mei-gwok-jan aa', 'Are you (all) American?'),
    say('nei sik m sik gong jing-man aa', 'Can you speak English?', { note: '識唔識: A唔A works with any verb.' }),
  ];

  V.wh = [
    say('keoi hai bin-go aa', 'Who is he / she?', { note: '邊個 sits where the answer goes: 佢係阿明.' }),
    say('bin-go hai lou-si aa', 'Who is the teacher?'),
    say('nei giu mat-je meng aa', 'What is your name?', { note: 'Literally "you are called what name?"' }),
    say('keoi giu mat-je meng aa', 'What is his / her name?'),
    say('nei gong mat-je aa', 'What are you saying?'),
    say('nei ne', 'And you?'),
  ];

  // Answer a yes/no question with its verb: 係 / 唔係, 識 / 唔識.
  V.answers = [
    say('hai aa', 'Yes (I am / it is).'),
    say('m hai aa', 'No (I\'m not / it isn\'t).'),
    say('sik aa', 'Yes, I can.'),
    say('m sik aa', 'No, I can\'t.'),
    say('sik siu-siu', 'A little.'),
    say('ngo dou hai', 'Me too.', { note: 'Literally "I also am".' }),
  ];
})(window.VOCAB);
