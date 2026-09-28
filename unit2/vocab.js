/*
 * Unit 2 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), say? (text to
 * speak if not hanzi), ssml? (SSML inside <voice> to force a reading
 * the voice gets wrong), plus for Reply Match (shared/reply.js):
 * reply? (ids of good answers when someone says this to you) and
 * when? (situations where you'd say it; its picture shows the first).
 */
Units.add(2, {
  voice: 'zh-HK-HiuMaanNeural',

  greetings: [
    { id: 'hello', hanzi: '你好', jyutping: 'nei5 hou2', english: 'hello', img: false, reply: ['hello'],
      note: 'Polite, a little formal. Friends often just say "hi" or "hello" in English.' },
    { id: 'good-morning', hanzi: '早晨', jyutping: 'zou2 san4', english: 'good morning', reply: ['good-morning'],
      when: ['You meet a neighbour in the lift at 8 am.'],
      note: 'Used until about noon. There is no everyday "good afternoon".' },
    { id: 'good-night', hanzi: '早唞', jyutping: 'zou2 tau2', english: 'good night', reply: ['good-night'],
      when: ['Your family is going to bed.'],
      note: 'Only when someone is going to sleep, never as "good evening".' },
    { id: 'bye', hanzi: '拜拜', jyutping: 'baai1 baai3', english: 'bye-bye', reply: ['bye', 'goodbye'],
      when: ['You leave a friend at the MTR station.'],
      note: 'From English "bye-bye". What most people say.' },
    { id: 'goodbye', hanzi: '再見', jyutping: 'zoi3 gin3', english: 'goodbye', img: false, reply: ['bye', 'goodbye'],
      note: 'Literally "see again". More formal than 拜拜.' },
  ],

  howAreYou: [
    { id: 'how-are-you', hanzi: '你好嗎？', jyutping: 'nei5 hou2 maa3', english: 'how are you?', img: false, reply: ['pretty-good', 'so-so'],
      note: 'The textbook question. Correct, but it sounds stiff.' },
    { id: 'how-lately', hanzi: '最近點呀？', jyutping: 'zeoi3 gan6 dim2 aa3', english: 'how have you been?', img: false, reply: ['pretty-good', 'so-so'],
      note: 'What people really say. 點 means "how", and 呀 makes it friendly.' },
    { id: 'pretty-good', hanzi: '幾好', jyutping: 'gei2 hou2', english: 'pretty good', img: false },
    { id: 'so-so', hanzi: '麻麻哋', jyutping: 'maa4 maa2 dei2', english: 'so-so', img: false },
    { id: 'long-time', hanzi: '好耐冇見', jyutping: 'hou2 noi6 mou5 gin3', english: 'long time no see', img: false, reply: ['long-time'] },
    { id: 'eaten-yet', hanzi: '食咗飯未呀？', jyutping: 'sik6 zo2 faan6 mei6 aa3', english: 'have you eaten yet?', img: false, reply: ['eaten'],
      note: 'A friendly greeting, not an invitation. Just answer and chat on.' },
    { id: 'eaten', hanzi: '食咗喇', jyutping: 'sik6 zo2 laa3', english: 'I have eaten', img: false },
  ],

  // 唔該 or 多謝? 唔該 thanks someone for a service or a favour; 多謝
  // thanks them for a gift or a compliment.
  polite: [
    { id: 'm-goi', hanzi: '唔該', jyutping: 'm4 goi1', english: 'thank you (for a service); excuse me', reply: ['no-need'],
      when: ['A waiter refills your tea.', 'Someone holds the door for you.', 'You want to call a waiter over.'],
      note: 'For a service or a favour, and to get someone\'s attention.' },
    { id: 'm-goi-saai', hanzi: '唔該晒', jyutping: 'm4 goi1 saai3', english: 'thanks a lot', img: false, reply: ['no-need'],
      note: '晒 means "all": thanks for everything you did.' },
    { id: 'thanks', hanzi: '多謝', jyutping: 'do1 ze6', english: 'thank you (for a gift)', reply: ['welcome'],
      when: ['A friend gives you a birthday present.', 'Someone says your Cantonese is good.'],
      note: 'For a gift or a compliment.' },
    { id: 'no-need', hanzi: '唔使', jyutping: 'm4 sai2', english: 'no need; you\'re welcome', img: false,
      note: 'The answer to 唔該: "no need to thank me".' },
    { id: 'welcome', hanzi: '唔使客氣', jyutping: 'm4 sai2 haak3 hei3', english: 'you\'re welcome', img: false,
      note: 'The answer to 多謝: "no need to be polite".' },
    { id: 'sorry', hanzi: '對唔住', jyutping: 'deoi3 m4 zyu6', english: 'sorry', reply: ['never-mind', 'no-problem'],
      when: ['You knock over a friend\'s drink.'],
      note: 'A real apology, when you did something wrong.' },
    { id: 'excuse-me', hanzi: '唔好意思', jyutping: 'm4 hou2 ji3 si3', english: 'excuse me; sorry (small)', img: false, reply: ['never-mind'],
      when: ['You need to squeeze past someone on a crowded bus.', 'You arrive five minutes late.'],
      note: 'For small things: a bump, being late, asking a stranger.' },
    { id: 'never-mind', hanzi: '唔緊要', jyutping: 'm4 gan2 jiu3', english: 'never mind; it\'s OK', img: false },
    { id: 'no-problem', hanzi: '冇問題', jyutping: 'mou5 man6 tai4', english: 'no problem', img: false },
  ],
});
