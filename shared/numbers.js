/*
 * numbers.js — Cantonese numbers from 0 to 99,999,999, so units derive
 * numbers, prices, counts and times instead of listing them. Load it
 * after core.js and before any vocab.js that uses it (tools/check.mjs
 * verifies this); tools/site.mjs loads it in Node too.
 *
 *   Canto.number(n, { measure?, short? })  { hanzi, jyutping }
 *     measure   an entry { hanzi, jyutping } to count with: it follows the
 *               number, and a bare 2 becomes 兩 (兩個; but 十二個)
 *     short     fast-speech forms: 卅一 saa1 aa6 jat1, and 四十五 read
 *               sei3 aa6 ng5 (41–99 keep 十 in writing)
 *
 * Forms: 十一 at the start of a number but 一百一十 inside one; 廿 jaa6 for
 * 21–29 (a round 20 is 二十); 兩 loeng5 for a leading 2 before 百, 千 or 萬
 * (兩百, 兩萬二千, but 二十萬); one 零 for any gap (一千零一十, 一萬零二百).
 */
(function (root) {
  const DIGIT = [['零', 'ling4'], ['一', 'jat1'], ['二', 'ji6'], ['三', 'saam1'], ['四', 'sei3'],
    ['五', 'ng5'], ['六', 'luk6'], ['七', 'cat1'], ['八', 'baat3'], ['九', 'gau2']];
  const TEN = ['十', 'sap6'], HUNDRED = ['百', 'baak3'], THOUSAND = ['千', 'cin1'], WAN = ['萬', 'maan6'];
  const LOENG = ['兩', 'loeng5'], JAA = ['廿', 'jaa6'], SAA = ['卅', 'saa1 aa6'], AA = ['十', 'aa6'];

  // 1–99. `lead`: nothing comes before it, so 10–19 drop the 一.
  function tens(n, lead, short) {
    const t = Math.floor(n / 10), u = n % 10;
    const unit = u ? [DIGIT[u]] : [];
    if (t === 0) return unit;
    if (t === 1) return [...(lead ? [] : [DIGIT[1]]), TEN, ...unit];
    if (t === 2 && u) return [JAA, ...unit];
    if (short && u) return t === 3 ? [SAA, ...unit] : [DIGIT[t], AA, ...unit];
    return [DIGIT[t], TEN, ...unit];
  }

  // 1–9999. `first`: this group starts the whole number (兩, and 十 not 一十).
  function group(n, first, short) {
    const out = [];
    let started = false, gap = false; // gap: a zero digit since the last one said
    for (const [value, unit] of [[1000, THOUSAND], [100, HUNDRED]]) {
      const d = Math.floor(n / value) % 10;
      if (!d) { gap = started; continue; }
      out.push(d === 2 && first && !started ? LOENG : DIGIT[d], unit);
      started = true;
      gap = false;
    }
    const rest = n % 100;
    if (rest) {
      if (gap || (started && rest < 10)) out.push(DIGIT[0]);
      out.push(...tens(rest, first && !started, short));
    }
    return out;
  }

  function number(n, { measure, short = false } = {}) {
    if (!Number.isInteger(n) || n < 0 || n > 99999999) throw new RangeError(`Canto.number: ${n} is not a whole number from 0 to 99,999,999`);
    let parts;
    if (n === 0) parts = [DIGIT[0]];
    else if (n === 2 && measure) parts = [LOENG];
    else {
      const high = Math.floor(n / 10000), low = n % 10000;
      parts = [];
      if (high) parts.push(...(high === 2 ? [LOENG] : group(high, true, short)), WAN);
      if (low) {
        if (high && low < 1000) parts.push(DIGIT[0]);
        parts.push(...group(low, !high, short));
      }
    }
    if (measure) parts.push([measure.hanzi, measure.jyutping]);
    return { hanzi: parts.map(p => p[0]).join(''), jyutping: parts.map(p => p[1]).join(' ') };
  }

  (root.Canto = root.Canto || {}).number = number;
})(typeof window !== 'undefined' ? window : globalThis);
