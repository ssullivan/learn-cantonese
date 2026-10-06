/*
 * Unit 1 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), say? (text to
 * speak if not hanzi), ssml? (SSML inside <voice> to force a reading
 * the voice gets wrong).
 */
Units.add(1, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '水牛好',

  basics: [
    ...Words.list('cantonese jyutping tone'),
  ],

  // Three syllables, each in all six tones. The ids are the jyutping, so
  // lessons can find a syllable's set and a tone's examples.
  sets: [
    ...Words.list('si1 si2 si3 si4 si5 si6 fu1 fu2 fu3 fu4 fu5 fu6 fan1 fan2 fan3 fan4 fan5 fan6'),
  ],

  // Everyday words whose Jyutping letters don't sound like English.
  spelling: [
    ...Words.list('fish cow ng congee car water hong-kong chicken street'),
  ],

  // What every game says when a whole level is right (shared/game.js plays
  // it from here, as CHEER).
  praise: [
    Words.get('hou-lek'),
  ],
});

// Derived: set entries in the given tones, e.g. VOCAB.inTones(2, 5). Set
// entries are one syllable, so the tone is the last character.
(V => {
  V.inTones = (...tones) => V.sets.filter(e => tones.includes(+e.jyutping.slice(-1)));
})(window.VOCAB);
