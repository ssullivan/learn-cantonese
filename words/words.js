/*
 * The dictionary: every word on the site, once, grouped by the unit that
 * teaches it. Its audio is words/audio/<id>.mp3 (tools/tts.mjs) and its
 * picture words/img/<id>.svg (from words/art.mjs, tools/draw.mjs).
 *
 *   Words.add(n, [entries])   the words unit n teaches (each gets taught: n)
 *
 * A unit's vocab.js takes the words it uses with Words.get(id) or
 * Words.list('a b c'), adding its own fields, and builds its phrases and
 * sentences from them. Entry fields are in tools/vocab-fields.mjs; an id
 * is unique on the site (when two words would share one, one gets its
 * tone number: 大 daai6). shared/units.js documents Words.
 */
Words.voice = 'zh-HK-HiuMaanNeural';

// Unit 1 · Sounds & Tones 聲調
Words.add(1, [
  // basics
  { id: 'cantonese', hanzi: '廣東話', jyutping: 'gwong2 dung1 waa2', english: 'Cantonese', img: false,
    note: '話 on its own is waa6. In 廣東話 it changes to waa2.' },
  { id: 'jyutping', hanzi: '粵拼', jyutping: 'jyut6 ping3', english: 'Jyutping', img: false,
    note: 'The spelling system used on this site. Every syllable ends in its tone number.' },
  { id: 'tone', hanzi: '聲調', jyutping: 'sing1 diu6', english: 'tone', img: false },
  // sets: the six-tone sets are read by WanLung (a man's voice). The
  // site's voice, HiuMaan, says tones 2 and 5 almost alike (婦 fu5 rises
  // like 苦 fu2) and 3 and 6 close together; a native speaker heard it, and
  // audio-lang-tools measured it. Telling HiuMaan the tones with phonemes
  // doesn't help: it is how the voice speaks. WanLung keeps all six apart
  // best of the Azure voices.
  { id: 'si1', hanzi: '詩', jyutping: 'si1', english: 'poem', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si2', hanzi: '史', jyutping: 'si2', english: 'history', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si3', hanzi: '試', jyutping: 'si3', english: 'to try', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si4', hanzi: '時', jyutping: 'si4', english: 'time', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si5', hanzi: '市', jyutping: 'si5', english: 'market', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si6', hanzi: '事', jyutping: 'si6', english: 'matter, thing', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu1', hanzi: '夫', jyutping: 'fu1', english: 'husband', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu2', hanzi: '苦', jyutping: 'fu2', english: 'bitter', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu3', hanzi: '富', jyutping: 'fu3', english: 'rich', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu4', hanzi: '扶', jyutping: 'fu4', english: 'to help up', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu5', hanzi: '婦', jyutping: 'fu5', english: 'woman', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu6', hanzi: '父', jyutping: 'fu6', english: 'father', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan1', hanzi: '分', jyutping: 'fan1', english: 'to share out', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan2', hanzi: '粉', jyutping: 'fan2', english: 'powder, rice noodles', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan3', hanzi: '瞓', jyutping: 'fan3', english: 'to sleep', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan4', hanzi: '墳', jyutping: 'fan4', english: 'grave', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan5', hanzi: '憤', jyutping: 'fan5', english: 'anger', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan6', hanzi: '份', jyutping: 'fan6', english: 'portion, share', img: false, voice: 'zh-HK-WanLungNeural' },
  // spelling
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
  // praise
  { id: 'hou-lek', hanzi: '好叻呀！', jyutping: 'hou2 lek1 aa3', english: 'Well done! (literally "so clever!")', img: false,
    note: '叻 lek1 means clever or good at something. You\'ll hear this in the games when you get a whole level right.' },
]);
