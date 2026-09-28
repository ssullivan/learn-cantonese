/*
 * Unit 1 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), say? (text to
 * speak if not hanzi), ssml? (SSML inside <voice> to force a reading
 * the voice gets wrong).
 */
window.VOCAB = {
  voice: 'zh-HK-HiuMaanNeural',

  basics: [
    { id: 'cantonese', hanzi: '廣東話', jyutping: 'gwong2 dung1 waa2', english: 'Cantonese', img: false,
      note: '話 on its own is waa6. In 廣東話 it changes to waa2.' },
    { id: 'jyutping', hanzi: '粵拼', jyutping: 'jyut6 ping3', english: 'Jyutping', img: false,
      note: 'The spelling system used on this site. Every syllable ends in its tone number.' },
    { id: 'tone', hanzi: '聲調', jyutping: 'sing1 diu6', english: 'tone', img: false },
  ],

  // Three syllables, each in all six tones. The ids are the jyutping, so
  // lessons can find a syllable's set and a tone's examples.
  sets: [
    { id: 'si1', hanzi: '詩', jyutping: 'si1', english: 'poem', img: false },
    { id: 'si2', hanzi: '史', jyutping: 'si2', english: 'history', img: false },
    { id: 'si3', hanzi: '試', jyutping: 'si3', english: 'to try', img: false },
    { id: 'si4', hanzi: '時', jyutping: 'si4', english: 'time', img: false },
    { id: 'si5', hanzi: '市', jyutping: 'si5', english: 'market', img: false },
    { id: 'si6', hanzi: '事', jyutping: 'si6', english: 'matter, thing', img: false },

    { id: 'fu1', hanzi: '夫', jyutping: 'fu1', english: 'husband', img: false },
    { id: 'fu2', hanzi: '苦', jyutping: 'fu2', english: 'bitter', img: false },
    { id: 'fu3', hanzi: '富', jyutping: 'fu3', english: 'rich', img: false },
    { id: 'fu4', hanzi: '扶', jyutping: 'fu4', english: 'to help up', img: false },
    { id: 'fu5', hanzi: '婦', jyutping: 'fu5', english: 'woman', img: false },
    { id: 'fu6', hanzi: '父', jyutping: 'fu6', english: 'father', img: false },

    { id: 'fan1', hanzi: '分', jyutping: 'fan1', english: 'to share out', img: false },
    { id: 'fan2', hanzi: '粉', jyutping: 'fan2', english: 'powder, rice noodles', img: false },
    { id: 'fan3', hanzi: '瞓', jyutping: 'fan3', english: 'to sleep', img: false },
    { id: 'fan4', hanzi: '墳', jyutping: 'fan4', english: 'grave', img: false },
    { id: 'fan5', hanzi: '憤', jyutping: 'fan5', english: 'anger', img: false },
    { id: 'fan6', hanzi: '份', jyutping: 'fan6', english: 'portion, share', img: false },
  ],

  // Everyday words whose Jyutping letters don't sound like English.
  spelling: [
    { id: 'fish', hanzi: '魚', jyutping: 'jyu4', english: 'fish',
      note: 'j sounds like English "y". yu is "ee" said with rounded lips, like German ü.' },
    { id: 'cow', hanzi: '牛', jyutping: 'ngau4', english: 'cow',
      note: 'ng can start a syllable: the sound at the end of "sing", moved to the front.' },
    { id: 'ng', hanzi: '吳', jyutping: 'ng4', english: 'Ng (a family name)', img: false,
      note: 'ng can even be a whole syllable, hummed through the nose.' },
    { id: 'congee', hanzi: '粥', jyutping: 'zuk1', english: 'congee (rice porridge)',
      note: 'z is like "dz" with no puff of air. A final k is stopped, not said out loud.' },
    { id: 'car', hanzi: '車', jyutping: 'ce1', english: 'car',
      note: 'c is like "ts" or "ch" with a puff of air.' },
    { id: 'water', hanzi: '水', jyutping: 'seoi2', english: 'water',
      note: 'eoi starts like "er" with rounded lips and slides to "ee".' },
    { id: 'hong-kong', hanzi: '香港', jyutping: 'hoeng1 gong2', english: 'Hong Kong', img: false,
      note: 'oe is like the "ur" in "fur" with rounded lips.' },
    { id: 'chicken', hanzi: '雞', jyutping: 'gai1', english: 'chicken',
      note: 'A single a is short, like the "u" in "but".' },
    { id: 'street', hanzi: '街', jyutping: 'gaai1', english: 'street', img: false,
      note: 'aa is long, like "ah". 雞 gai1 and 街 gaai1 differ only in vowel length.' },
  ],
};

// Derived: set entries in the given tones, e.g. VOCAB.inTones(2, 5). Set
// entries are one syllable, so the tone is the last character.
(V => {
  V.inTones = (...tones) => V.sets.filter(e => tones.includes(+e.jyutping.slice(-1)));
})(window.VOCAB);
