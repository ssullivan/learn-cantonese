/*
 * numbers.js — Cantonese numbers from 0 to 99,999,999, so units derive
 * numbers, prices, counts and times instead of listing them. Load it
 * after core.js and before any vocab.js that uses it (tools/check.mjs
 * verifies this); tools/site.mjs loads it in Node too.
 *
 *   Canto.number(n, { measure?, short?, clip? })  { hanzi, jyutping }
 *     measure   an entry { hanzi, jyutping } to count with: it follows the
 *               number, and a bare 2 becomes 兩 (兩個; but 十二個). With a
 *               measure, n can end in a half: 半斤, 兩斤半, 十二斤半
 *     short     fast-speech forms: 卅一 saa1 aa6 jat1, and 四十五 read
 *               sei3 aa6 ng5 (41–99 keep 十 in writing)
 *     clip      everyday round numbers drop their last unit, and a leading
 *               一 with it: 百五 for 150, 兩百五 for 250, 千二 for 1200,
 *               萬二 for 12,000 (but 一千零五十 and 十二萬 stay whole),
 *               and 斤半 for one and a half
 *   Canto.price(dollars)   { hanzi, jyutping } for an amount of Hong Kong
 *               money in steps of 10 cents: 五蚊, 兩蚊, 三蚊半 ($3.50),
 *               三蚊二 ($3.20), 五毫 ($0.50), 百五蚊 ($150, clipped)
 *   Canto.near(n)          numbers easy to mix up with n: reversed digits
 *               (13 / 31, 3.5 / 5.3), ±1, ±10, ×10, ÷10, 十四 / 四十
 *   Canto.time(h, m, { fen? })   { hanzi, jyutping } for a clock time,
 *               h 1–12, m 0–59: 三點鐘, 兩點 (兩 before 點), 三點半, and
 *               in 字 (five minutes) 三點兩個字 for 3:10. fen (or a minute
 *               that isn't a multiple of 5) counts 分 instead: 三點零五分,
 *               三點十五分, 三點半 as 三點三十分
 *   Canto.nearTime(h, m)   [[h, m], ...] times easy to mix up with h:m:
 *               hour and 字 swapped (3:20 / 4:15), ±1 hour, ±5 minutes,
 *               ±30 minutes (點 / 半)
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
    // A half, after the measure word: 半斤, 三斤半, and clipped 斤半 for 1.5.
    if (measure && n > 0 && n % 1 === 0.5) {
      const whole = Math.floor(n);
      const w = !whole ? { hanzi: '', jyutping: '' } : clip && whole === 1 ? { ...measure } : number(whole, { measure, short });
      return whole ? { hanzi: `${w.hanzi}半`, jyutping: `${w.jyutping} bun3` } : { hanzi: `半${measure.hanzi}`, jyutping: `bun3 ${measure.jyutping}` };
    }
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

  const DIM = { hanzi: '點', jyutping: 'dim2' }, GO = { hanzi: '個', jyutping: 'go3' };
  const ZI = ['字', 'zi6'], FAN = ['分', 'fan1'], ZUNG = ['鐘', 'zung1'];

  function time(h, m, { fen = false } = {}) {
    if (!Number.isInteger(h) || h < 1 || h > 12 || !Number.isInteger(m) || m < 0 || m > 59) throw new RangeError(`Canto.time: ${h}:${m} is not a time from 1:00 to 12:59`);
    const hour = number(h, { measure: DIM });
    const join = (...rest) => ({ hanzi: hour.hanzi + rest.map(r => r[0]).join(''), jyutping: [hour.jyutping, ...rest.map(r => r[1])].join(' ') });
    if (!m) return join(ZUNG);
    if (m % 5 || fen) {
      const min = number(m);
      return m < 10 ? join(DIGIT[0], [min.hanzi, min.jyutping], FAN) : join([min.hanzi, min.jyutping], FAN);
    }
    if (m === 30) return join(BUN);
    const zi = number(m / 5, { measure: GO });
    return join([zi.hanzi, zi.jyutping], ZI);
  }

  function nearTime(h, m) {
    const at = t => { const x = ((t % 720) + 720) % 720; return [Math.floor(x / 60) || 12, x % 60]; };
    const t = (h % 12) * 60 + m, out = [];
    if (m % 5 === 0 && m && h <= 11) out.push([m / 5 || 12, h * 5]);
    out.push(...[60, -60, 5, -5, 30, -30].map(d => at(t + d)));
    const seen = new Set([`${h}:${m}`]);
    return out.filter(([a, b]) => { const k = `${a}:${b}`; if (seen.has(k)) return false; seen.add(k); return true; });
  }

  Object.assign(root.Canto = root.Canto || {}, { number, price, near, time, nearTime });
})(typeof window !== 'undefined' ? window : globalThis);
