#!/usr/bin/env node
/*
 * read.test.mjs — tests Read.lookalikes in shared/read.js, on unit 20's
 * fruit, vegetables and look-alikes. Run by tools/check.mjs; exits 1 on
 * failure.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT, loadVocab } from './site.mjs';

const sb = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'shared/core.js'), 'utf8'), sb);
vm.runInNewContext(`const Canto = window.Canto;\n${readFileSync(join(ROOT, 'shared/read.js'), 'utf8')}`, sb);
const { lookalikes } = sb.window.Read;
let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };

const V = loadVocab('unit20');
const pool = [...V.fruit, ...V.veg];
const extra = V.lookalikes;
const by = hanzi => [...pool, ...extra].find(e => e.hanzi === hanzi);
const names = list => list.map(e => e.hanzi).join(' ');

for (let trial = 0; trial < 50; trial++) {
  // 士多啤梨 shares two characters with 啤梨, 多士 and 西多士: those first.
  let got = lookalikes(by('士多啤梨'), pool, 3, extra);
  if (new Set(names(got).split(' ')).size !== 3 || !got.every(e => ['啤梨', '多士', '西多士'].includes(e.hanzi))) {
    ok('the words sharing the most characters come first', false, names(got)); break;
  }
  // 橙 shares a character only with 橙色; the rest are fruit and vegetables.
  got = lookalikes(by('橙'), pool, 3, extra);
  if (got[0]?.hanzi !== '橙色' || got.slice(1).some(e => !pool.includes(e))) {
    ok('then the rest of the pool, never an extra that shares nothing', false, names(got)); break;
  }
  // 番茄 shares nothing: three others from the pool, no repeats, not itself.
  got = lookalikes(by('番茄'), pool, 3, extra);
  if (got.length !== 3 || new Set(got).size !== 3 || got.some(e => !pool.includes(e) || e.hanzi === '番茄')) {
    ok('with nothing shared, others from the pool', false, names(got)); break;
  }
  if (trial === 49) ok('look-alikes: most shared first, then the pool, no repeats, never the word', true);
}

// A word listed twice (or another with its hanzi) is never offered.
const twin = { ...by('菠蘿'), id: 'pineapple-again' };
let got = lookalikes(by('菠蘿'), [...pool, twin], 20, extra);
ok('never the word itself, or another with its hanzi', !got.some(e => e.hanzi === '菠蘿'), names(got));
ok('no word offered twice', new Set(got.map(e => e.id)).size === got.length, names(got));
got = lookalikes(by('紅蘿蔔'), pool, 50, extra);
ok('every candidate when asked for more than there are', got.length === pool.length - 1 + extra.filter(e => [...e.hanzi].some(c => '紅蘿蔔'.includes(c))).length, `${got.length}`);

process.exit(fail ? 1 : 0);
