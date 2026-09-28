#!/usr/bin/env node
/*
 * numbers.test.mjs — tests Canto.number in shared/numbers.js. Run by
 * tools/check.mjs; exits 1 on failure.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT } from './site.mjs';

const sb = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'shared/numbers.js'), 'utf8'), sb);
const { number } = sb.window.Canto;
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
];
for (const [n, hanzi, jyutping, opts] of cases) {
  const r = number(n, opts);
  ok(`${n}${opts ? ' ' + JSON.stringify(opts) : ''}`, r.hanzi === hanzi && r.jyutping === jyutping, `${r.hanzi} ${r.jyutping}`);
}
const throws = f => { try { f(); return false; } catch { return true; } };
ok('rejects out of range', throws(() => number(-1)) && throws(() => number(1e8)) && throws(() => number(1.5)));
process.exit(fail ? 1 : 0);
