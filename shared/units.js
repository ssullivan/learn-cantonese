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

  root.Units = { add, word, sentences };
})(typeof window !== 'undefined' ? window : globalThis);
