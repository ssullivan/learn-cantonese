/*
 * Unit 3 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 3 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
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
    ...Words.list('ngo nei keoi ngo-dei nei-dei keoi-dei'),
  ],

  words: [
    ...Words.list('hai m giu meng sik gong dou aa-ming'),
  ],

  things: [
    ...Words.list('lou-si hok-saang pang-jau hoeng-gong-jan jing-gwok-jan mei-gwok-jan'),
    Words.get('cantonese'),
    Words.get('jing-man'),
  ],

  // Question words stay where the answer goes: 佢係邊個？ 佢係阿明。
  asking: [
    ...Words.list('bin-go mat-je maa aa ne siu-siu hai-mai'),
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
