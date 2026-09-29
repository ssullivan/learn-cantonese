/*
 * units.js — the registry of unit vocabularies, so a unit can use a word
 * that belongs to an earlier unit without copying it. Load it before any
 * vocab.js. No other dependencies; tools/site.mjs loads it in Node too.
 *
 *   Units.add(n, vocab)   register unit n's vocab (called by unit<n>/vocab.js);
 *                         also sets window.VOCAB, so the page's own unit,
 *                         loaded last, is VOCAB. Returns vocab.
 *   Units.word(n, id)     a copy of unit n's entry `id` with unit: n, so its
 *                         audio and picture load from ../unit<n>/ (see
 *                         Canto.audioSrc). Unit n's vocab.js must be loaded
 *                         first: a page lists ../unit<n>/vocab.js before its
 *                         own, which tools/check.mjs verifies.
 *   Units.sentences(vocab)
 *                         say(ids, english, extra?): a sentence entry made
 *                         of the entries with those space-separated ids
 *                         (looked up in vocab as it is when say is made):
 *                         id "a-b-c", words [ids] (for Tiles.round), hanzi
 *                         and jyutping joined, a ？ if english ends in "?",
 *                         img: false, plus extra
 *   Units.phonemes(vocab, ids)
 *                         for words the voice misreads (tools/tts.mjs):
 *                         the entries with those ids get phoneme: true
 *                         (read from their jyutping), and every entry
 *                         made of `words` that uses them gets phoneme:
 *                         [the ids it uses], so only those words are read
 *                         that way and the rest of the phrase naturally.
 *                         A phrase inside a longer one (巴士站 in 巴士站喺
 *                         邊度呀？) counts as misread too: list it first
 *   window.UNITS          { n: vocab } for every loaded unit
 */
(function (root) {
  const units = root.UNITS = root.UNITS || {};

  function add(n, vocab) {
    units[n] = vocab;
    root.VOCAB = vocab;
    return vocab;
  }

  function word(n, id) {
    if (!units[n]) throw new Error(`unit ${n}'s vocab.js is not loaded`);
    const entry = Object.values(units[n]).filter(Array.isArray).flat().find(e => e.id === id);
    if (!entry) throw new Error(`unit ${n} has no word ${id}`);
    return { ...entry, unit: n };
  }

  function sentences(vocab) {
    const byId = Object.fromEntries(Object.values(vocab).filter(Array.isArray).flat().map(e => [e.id, e]));
    return (ids, english, extra) => {
      const ws = ids.split(' ').map(id => {
        if (!byId[id]) throw new Error(`no word ${id} for "${english}"`);
        return byId[id];
      });
      return {
        id: ids.replace(/ /g, '-'), words: ws.map(w => w.id),
        hanzi: ws.map(w => w.hanzi).join('') + (english.endsWith('?') ? '？' : ''),
        jyutping: ws.map(w => w.jyutping).join(' '),
        english, img: false, ...extra,
      };
    };
  }

  function phonemes(vocab, ids) {
    const misread = new Set(ids);
    for (const e of Object.values(vocab).filter(Array.isArray).flat()) {
      if (misread.has(e.id)) e.phoneme = true;
      else if (e.words?.some(id => misread.has(id))) {
        e.phoneme = e.words.filter(id => misread.has(id));
        misread.add(e.id);
      }
    }
  }

  root.Units = { add, word, sentences, phonemes };
})(typeof window !== 'undefined' ? window : globalThis);
