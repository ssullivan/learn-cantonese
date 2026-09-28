#!/usr/bin/env node
/*
 * core.test.mjs — tests the pure helpers in shared/core.js. Run by
 * tools/check.mjs; exits 1 on failure.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT } from './site.mjs';

const sb = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'shared/core.js'), 'utf8'), sb);
const { tones, toneChart } = sb.window.Canto;
let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

let t = tones('si1');
ok('one syllable', same(t, [1]), JSON.stringify(t));
t = tones('gwong2 dung1 waa2');
ok('several syllables', same(t, [2, 1, 2]), JSON.stringify(t));
t = tones('ng5 m4 jyut6');
ok('syllabic ng / m, -t ending', same(t, [5, 4, 6]), JSON.stringify(t));
const rows = toneChart().match(/<tr>/g)?.length;
ok('tone chart has six rows', rows === 6, `${rows} rows`);
process.exit(fail ? 1 : 0);
