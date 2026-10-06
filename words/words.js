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
