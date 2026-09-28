/*
 * numbers.js — Cantonese numbers from 0 to 99,999,999, so units derive
 * numbers, prices, counts and times instead of listing them. Load it
 * after core.js and before any vocab.js that uses it (tools/check.mjs
 * verifies this); tools/site.mjs loads it in Node too.
 *
 *   Canto.number(n, { measure?, short?, clip? })  { hanzi, jyutping }
 *     measure   an entry { hanzi, jyutping } to count with: it follows the
 *               number, and a bare 2 becomes 兩 (兩個; but 十二個)
 *     short     fast-speech forms: 卅一 saa1 aa6 jat1, and 四十五 read
 *               sei3 aa6 ng5 (41–99 keep 十 in writing)
 *     clip      everyday round numbers drop their last unit, and a leading
 *               一 with it: 百五 for 150, 兩百五 for 250, 千二 for 1200,
 *               萬二 for 12,000 (but 一千零五十 and 十二萬 stay whole)
 *   Canto.price(dollars)   { hanzi, jyutping } for an amount of Hong Kong
 *               money in steps of 10 cents: 五蚊, 兩蚊, 三蚊半 ($3.50),
 *               三蚊二 ($3.20), 五毫 ($0.50), 百五蚊 ($150, clipped)
 *   Canto.near(n)          numbers easy to mix up with n: reversed digits
 *               (13 / 31, 3.5 / 5.3), ±1, ±10, ×10, ÷10, 十四 / 四十
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

  function number(n, { measure, short = false, clip = false } = {}) {
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
      // Clip: 一百五十 → 百五. Only when the last unit follows the next
      // one up with no 零 between: [一 百 五 十], [兩 千 五 百], [一 萬 二 千].
      const up = new Map([[TEN, HUNDRED], [HUNDRED, THOUSAND], [THOUSAND, WAN]]);
      const k = parts.length;
      if (clip && k >= 3 && up.has(parts[k - 1]) && parts[k - 3] === up.get(parts[k - 1])) {
        parts.pop();
        if (parts[0] === DIGIT[1] && [HUNDRED, THOUSAND, WAN].includes(parts[1])) parts.shift();
      }
    }
    if (measure) parts.push([measure.hanzi, measure.jyutping]);
    return { hanzi: parts.map(p => p[0]).join(''), jyutping: parts.map(p => p[1]).join(' ') };
  }

  const MAN = { hanzi: '蚊', jyutping: 'man1' }, HOU = { hanzi: '毫', jyutping: 'hou4' }, BUN = ['半', 'bun3'];

  function price(dollars) {
    const dimes = Math.round(dollars * 10);
    if (!(dimes > 0) || Math.abs(dollars * 10 - dimes) > 1e-6) throw new RangeError(`Canto.price: ${dollars} is not a positive amount in 10 cents`);
    const whole = Math.floor(dimes / 10), dime = dimes % 10;
    if (!whole) return number(dime, { measure: HOU });
    const out = number(whole, { measure: MAN, clip: !dime });
    if (!dime) return out;
    const [hanzi, jyutping] = dime === 5 ? BUN : DIGIT[dime];
    return { hanzi: out.hanzi + hanzi, jyutping: `${out.jyutping} ${jyutping}` };
  }

  function near(n) {
    const tidy = x => Math.round(x * 100) / 100;
    const out = [+String(n).split('').reverse().join(''), n + 1, n - 1, n + 10, n - 10, n * 10, n / 10];
    if (n > 10 && n < 20) out.push((n - 10) * 10);
    if (n % 10 === 0 && n > 10 && n < 100) out.push(10 + n / 10);
    if (n === 4 || n === 10) out.push(14 - n);
    return [...new Set(out.map(tidy))].filter(x => x !== n && x >= 0);
  }

  Object.assign(root.Canto = root.Canto || {}, { number, price, near });
})(typeof window !== 'undefined' ? window : globalThis);
