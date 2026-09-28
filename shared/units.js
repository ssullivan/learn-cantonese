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

  root.Units = { add, word };
})(typeof window !== 'undefined' ? window : globalThis);
