#!/usr/bin/env node
/*
 * numbers.test.mjs — tests Canto.number in shared/numbers.js. Run by
 * tools/check.mjs; exits 1 on failure. Also Canto.price and Canto.near.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT } from './site.mjs';

const sb = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'shared/numbers.js'), 'utf8'), sb);
const { number, price, near } = sb.window.Canto;
let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };

const go = { hanzi: '個', jyutping: 'go3' };
const cases = [
  [0, '零', 'ling4'],
  [2, '二', 'ji6'],
  [10, '十', 'sap6'],
  [11, '十一', 'sap6 jat1'],
  [12, '十二', 'sap6 ji6'],
  [20, '二十', 'ji6 sap6'],
  [21, '廿一', 'jaa6 jat1'],
  [22, '廿二', 'jaa6 ji6'],
  [30, '三十', 'saam1 sap6'],
  [31, '三十一', 'saam1 sap6 jat1'],
  [45, '四十五', 'sei3 sap6 ng5'],
  [99, '九十九', 'gau2 sap6 gau2'],
  [100, '一百', 'jat1 baak3'],
  [101, '一百零一', 'jat1 baak3 ling4 jat1'],
  [110, '一百一十', 'jat1 baak3 jat1 sap6'],
  [121, '一百廿一', 'jat1 baak3 jaa6 jat1'],
  [200, '兩百', 'loeng5 baak3'],
  [222, '兩百廿二', 'loeng5 baak3 jaa6 ji6'],
  [1000, '一千', 'jat1 cin1'],
  [1001, '一千零一', 'jat1 cin1 ling4 jat1'],
  [1010, '一千零一十', 'jat1 cin1 ling4 jat1 sap6'],
  [1200, '一千二百', 'jat1 cin1 ji6 baak3'],
  [2000, '兩千', 'loeng5 cin1'],
  [2200, '兩千二百', 'loeng5 cin1 ji6 baak3'],
  [3008, '三千零八', 'saam1 cin1 ling4 baat3'],
  [10000, '一萬', 'jat1 maan6'],
  [10200, '一萬零二百', 'jat1 maan6 ling4 ji6 baak3'],
  [12000, '一萬二千', 'jat1 maan6 ji6 cin1'],
  [20000, '兩萬', 'loeng5 maan6'],
  [22000, '兩萬二千', 'loeng5 maan6 ji6 cin1'],
  [100000, '十萬', 'sap6 maan6'],
  [200000, '二十萬', 'ji6 sap6 maan6'],
  [1000000, '一百萬', 'jat1 baak3 maan6'],
  [2000000, '兩百萬', 'loeng5 baak3 maan6'],
  [2, '兩個', 'loeng5 go3', { measure: go }],
  [12, '十二個', 'sap6 ji6 go3', { measure: go }],
  [22, '廿二個', 'jaa6 ji6 go3', { measure: go }],
  [21, '廿一', 'jaa6 jat1', { short: true }],
  [31, '卅一', 'saa1 aa6 jat1', { short: true }],
  [40, '四十', 'sei3 sap6', { short: true }],
  [45, '四十五', 'sei3 aa6 ng5', { short: true }],
  [110, '百一', 'baak3 jat1', { clip: true }],
  [150, '百五', 'baak3 ng5', { clip: true }],
  [250, '兩百五', 'loeng5 baak3 ng5', { clip: true }],
  [1200, '千二', 'cin1 ji6', { clip: true }],
  [2500, '兩千五', 'loeng5 cin1 ng5', { clip: true }],
  [12000, '萬二', 'maan6 ji6', { clip: true }],
  [22000, '兩萬二', 'loeng5 maan6 ji6', { clip: true }],
  [100, '一百', 'jat1 baak3', { clip: true }],
  [20, '二十', 'ji6 sap6', { clip: true }],
  [155, '一百五十五', 'jat1 baak3 ng5 sap6 ng5', { clip: true }],
  [1050, '一千零五十', 'jat1 cin1 ling4 ng5 sap6', { clip: true }],
  [120000, '十二萬', 'sap6 ji6 maan6', { clip: true }],
];
for (const [n, hanzi, jyutping, opts] of cases) {
  const r = number(n, opts);
  ok(`${n}${opts ? ' ' + JSON.stringify(opts) : ''}`, r.hanzi === hanzi && r.jyutping === jyutping, `${r.hanzi} ${r.jyutping}`);
}
const prices = [
  [5, '五蚊', 'ng5 man1'],
  [2, '兩蚊', 'loeng5 man1'],
  [12, '十二蚊', 'sap6 ji6 man1'],
  [22, '廿二蚊', 'jaa6 ji6 man1'],
  [3.5, '三蚊半', 'saam1 man1 bun3'],
  [3.2, '三蚊二', 'saam1 man1 ji6'],
  [2.2, '兩蚊二', 'loeng5 man1 ji6'],
  [0.5, '五毫', 'ng5 hou4'],
  [0.2, '兩毫', 'loeng5 hou4'],
  [150, '百五蚊', 'baak3 ng5 man1'],
  [100, '一百蚊', 'jat1 baak3 man1'],
  [1200, '千二蚊', 'cin1 ji6 man1'],
];
for (const [n, hanzi, jyutping] of prices) {
  const r = price(n);
  ok(`price ${n}`, r.hanzi === hanzi && r.jyutping === jyutping, `${r.hanzi} ${r.jyutping}`);
}
const has = (n, want) => want.every(m => near(n).includes(m));
ok('near 14', has(14, [41, 40, 13, 15]) && !near(14).includes(14), near(14).join(' '));
ok('near 40 has 14', has(40, [14]), near(40).join(' '));
ok('near 3.5', has(3.5, [5.3, 35, 4.5, 13.5]), near(3.5).join(' '));

const throws = f => { try { f(); return false; } catch { return true; } };
ok('rejects out of range', throws(() => number(-1)) && throws(() => number(1e8)) && throws(() => number(1.5)));
ok('price rejects cents and zero', throws(() => price(0.25)) && throws(() => price(0)));
process.exit(fail ? 1 : 0);
