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
const { tones, toneChart, pairs, zh, tagZh, deck } = sb.window.Canto;
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

// A round's word: every item once before any repeats, never twice in a row.
{
  const pool = ['a', 'b', 'c', 'd', 'e'].map(id => ({ id }));
  for (let trial = 0; trial < 200; trial++) {
    const draw = deck();
    const ids = Array.from({ length: 23 }, () => draw(pool).id);
    const laps = [0, 5, 10, 15].map(i => new Set(ids.slice(i, i + 5)).size);
    const twice = ids.findIndex((id, i) => i && id === ids[i - 1]);
    if (laps.some(n => n !== 5) || twice >= 0) { ok('deck: each lap of the pool has every item, no item twice in a row', false, ids.join('')); break; }
    if (trial === 199) ok('deck: each lap of the pool has every item, no item twice in a row', true);
  }
  // Told apart by id: a pool filtered afresh (new array, same entries, or
  // copies) is the same deck.
  const draw = deck();
  const got = new Set([0, 1, 2, 3, 4].map(() => draw(pool.map(e => ({ ...e }))).id));
  ok('deck: items are told apart by id', got.size === 5, [...got].join(''));
  // Items without an id (unit 9's [-1, 'kam-jat'] pairs) are told apart by themselves.
  const pairsPool = [[-1, 'x'], [1, 'y']];
  const drawPair = deck();
  const seq = Array.from({ length: 6 }, () => drawPair(pairsPool)[1]).join('');
  ok('deck: items without an id alternate in a pool of two', seq === 'xyxyxy' || seq === 'yxyxyx', seq);
  const one = deck();
  ok('deck: a pool of one keeps giving it', [1, 2, 3].every(() => one([{ id: 'only' }]).id === 'only'));
  const shrink = deck();
  shrink(pool);
  const sub = pool.slice(0, 2);
  const s = Array.from({ length: 4 }, () => shrink(sub).id);
  ok('deck: a smaller pool is still covered before repeats', new Set(s.slice(0, 2)).size === 2 && new Set(s.slice(2, 4)).size === 2, s.join(''));
}
process.exit(fail ? 1 : 0);
