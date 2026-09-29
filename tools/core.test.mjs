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
const { tones, toneChart, pairs, zh, tagZh } = sb.window.Canto;
let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Chinese in running text, tagged so it gets the Chinese font.
let z = tagZh('Big and small · 大 細');
ok('tagZh: each run of Chinese in a zh-HK span', z === 'Big and small · <span lang="zh-HK">大</span> <span lang="zh-HK">細</span>', z);
z = tagZh('Which one? · 邊個平啲呀？');
ok('tagZh: full-width punctuation stays with its characters', z === 'Which one? · <span lang="zh-HK">邊個平啲呀？</span>', z);
z = tagZh('Tom & <b>');
ok('tagZh: escapes, and leaves text without Chinese alone', z === 'Tom &amp; &lt;b&gt;', z);

let t = tones('si1');
ok('one syllable', same(t, [1]), JSON.stringify(t));
t = tones('gwong2 dung1 waa2');
ok('several syllables', same(t, [2, 1, 2]), JSON.stringify(t));
t = tones('ng5 m4 jyut6');
ok('syllabic ng / m, -t ending', same(t, [5, 4, 6]), JSON.stringify(t));
const rows = toneChart().match(/<tr>/g)?.length;
ok('tone chart has six rows', rows === 6, `${rows} rows`);
// Characters paired with their syllables, for Jyutping over each character.
let p = pairs('三點半', 'saam1 dim2 bun3');
ok('pairs: one syllable per character', same(p, [['三', 'saam1'], ['點', 'dim2'], ['半', 'bun3']]), JSON.stringify(p));
p = pairs('你好嗎？', 'nei5 hou2 maa3');
ok('pairs: punctuation takes no syllable', same(p, [['你', 'nei5'], ['好', 'hou2'], ['嗎', 'maa3'], ['？', null]]), JSON.stringify(p));
p = pairs('唔該，一籠', 'm4 goi1, jat1 lung4');
ok('pairs: a comma in the jyutping stays with its syllable', p?.[1][1] === 'goi1,' && p?.[2][1] === null, JSON.stringify(p));
ok('pairs: 卅 is two syllables, so no pairs', pairs('卅一', 'saa1 aa6 jat1') === null);
ok('pairs: too few syllables', pairs('三點', 'saam1') === null);
let h = zh('三點', 'saam1 dim2');
ok('zh: ruby per character, and the jyutping after the word',
  h.includes('<ruby>三<rt>saam<sup>1</sup></rt></ruby><wbr><ruby>點<rt>dim<sup>2</sup></rt></ruby>') && h.includes('<span class="jp">saam<sup>1</sup> dim<sup>2</sup></span>'), h);
h = zh('好嗎？', 'hou2 maa3');
ok('zh: no line break before punctuation', h.includes('</ruby>？') && !h.includes('<wbr>？') && !h.startsWith('<span class="zh"><span class="hanzi" lang="zh-HK"><wbr>'), h);
h = zh('卅', 'saa1 aa6');
ok('zh: unpaired words are flat, with no ruby', h.includes('zh-flat') && !h.includes('<ruby>'), h);
process.exit(fail ? 1 : 0);
