/*
 * Unit 2 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 2 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
 * jyutping, english, note?, img (false = no picture), say? (text to
 * speak if not hanzi), ssml? (SSML inside <voice> to force a reading
 * the voice gets wrong), plus for Reply Match (shared/reply.js):
 * reply? (ids of good answers when someone says this to you) and
 * when? (situations where you'd say it; its picture shows the first).
 *
 * write: the characters this unit teaches to write, stroke by stroke
 * (strokes/, from tools/strokes.mjs). 冇 咗 哋 are Cantonese-only, so
 * they are composed from parts (tools/strokes-composed.mjs).
 */
Units.add(2, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '你早多冇咗哋',

  greetings: [
    { ...Words.get('hello'), reply: ['hello'] },
    { ...Words.get('good-morning'), reply: ['good-morning'], when: ['You meet a neighbour in the lift at 8 am.'] },
    { ...Words.get('good-night'), reply: ['good-night'], when: ['Your family is going to bed.'] },
    { ...Words.get('bye'), reply: ['bye', 'goodbye'], when: ['You leave a friend at the MTR station.'] },
    { ...Words.get('goodbye'), reply: ['bye', 'goodbye'] },
  ],

  howAreYou: [
    { ...Words.get('how-are-you'), reply: ['pretty-good', 'so-so'] },
    { ...Words.get('how-lately'), reply: ['pretty-good', 'so-so'] },
    ...Words.list('pretty-good so-so'),
    { ...Words.get('long-time'), reply: ['long-time'] },
    { ...Words.get('eaten-yet'), reply: ['eaten'] },
    Words.get('eaten'),
  ],

  // 唔該 or 多謝? 唔該 thanks someone for a service or a favour; 多謝
  // thanks them for a gift or a compliment.
  polite: [
    { ...Words.get('m-goi'),
      reply: ['no-need'],
      when: ['A waiter refills your tea.', 'Someone holds the door for you.', 'You want to call a waiter over.'] },
    { ...Words.get('m-goi-saai'), reply: ['no-need'] },
    { ...Words.get('thanks'), reply: ['welcome'], when: ['A friend gives you a birthday present.', 'Someone says your Cantonese is good.'] },
    ...Words.list('no-need welcome'),
    { ...Words.get('sorry'), reply: ['never-mind', 'no-problem'], when: ['You knock over a friend\'s drink.'] },
    { ...Words.get('excuse-me'),
      reply: ['never-mind'],
      when: ['You need to squeeze past someone on a crowded bus.', 'You arrive five minutes late.'] },
    ...Words.list('never-mind no-problem'),
  ],
});
