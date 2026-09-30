#!/usr/bin/env node
/*
 * strokes.test.mjs — tests the stroke-order data: stroke-check.mjs's
 * matching on synthetic masks (tools/stroke-data.mjs: segment, fit,
 * assign, verdictFor), records and strokes/<hex>.json building, and
 * shared/strokes.js's drawing. Run by tools/check.mjs; exits 1 on failure.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT } from './site.mjs';
import { G, segment, fit, assign, verdictFor, recordProblem, usable, drawable, build } from './stroke-data.mjs';

let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };
const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

// Masks: rectangles of ink on the G×G grid.
const blank = () => new Uint8Array(G * G);
const rect = (x0, y0, x1, y1, m = blank()) => { for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) m[y * G + x] = 1; return m; };
const or = (...ms) => ms.reduce((u, m) => u.map((v, i) => v | m[i]));

// --- segment: an animation with a frame line that is always there, a
// horizontal stroke drawn over 5 frames, a pause, a vertical stroke that
// crosses it, a pause, then the ink cleared for the next loop.
{
  const frameLine = rect(0, 0, G, 1);
  const across = rect(8, 30, 56, 34), down = rect(30, 8, 34, 56);
  const frames = [frameLine];
  for (let t = 1; t <= 5; t++) frames.push(or(frameLine, rect(8, 30, 8 + t * 48 / 5, 34)));
  for (let t = 0; t < 6; t++) frames.push(or(frameLine, across));
  for (let t = 1; t <= 4; t++) frames.push(or(frameLine, across, rect(30, 8, 34, 8 + t * 12)));
  for (let t = 0; t < 6; t++) frames.push(or(frameLine, across, down));
  // the next loop: a stroke and a pause, which must not count
  frames.push(frameLine, frameLine, ...Array(6).fill(or(frameLine, rect(8, 30, 20, 34))));
  const strokes = segment(frames);
  ok('segment finds each burst of ink as a stroke', strokes.length === 2, `${strokes.length} strokes`);
  ok('segment: the first stroke is all its ink, without the frame line', same(strokes[0], across));
  const downOnly = down.map((v, i) => v && !across[i] ? 1 : 0);
  ok('segment: the second stroke is only its new ink', same(strokes[1], downOnly));
  ok('segment stops where the ink is cleared', strokes.length === 2);
  // A stroke at the very end, with no pause after it, still counts.
  ok('segment keeps a last stroke with no pause', segment(frames.slice(0, 16)).length === 2);
}

// --- fit: the matrix stretches Make Me a Hanzi's ink box onto EDB's.
{
  const S = G / 1024;
  const at = (m, [x, y]) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
  // Points whose BASE drawing lands on the corners of mmBox [4, 6, 24, 30].
  const corner = (gx, gy) => [gx / S, 900 - gy / S];
  const m = fit([10, 12, 50, 60], [4, 6, 24, 30]);
  const [p, q] = [at(m, corner(4, 6)), at(m, corner(24, 30))];
  const near = (a, b) => Math.abs(a - b) < 1e-9;
  ok('fit maps the top-left of the box', near(p[0], 10) && near(p[1], 12), JSON.stringify(p));
  ok('fit maps the bottom-right of the box', near(q[0], 50) && near(q[1], 60), JSON.stringify(q));
}

// --- assign: pairs EDB's strokes with Make Me a Hanzi's.
{
  const a = rect(8, 10, 56, 14), b = rect(30, 20, 34, 60), c = rect(8, 50, 24, 54);
  const r = assign([a, b, c], [a, b, c]);
  ok('assign: same strokes, same order', same(r.order, [0, 1, 2]) && r.scores.every(s => s === 1), JSON.stringify(r));
  const swapped = assign([a, c, b], [a, b, c]);
  ok('assign: Hong Kong writes the last two the other way round', same(swapped.order, [0, 2, 1]), JSON.stringify(swapped.order));
  // The two fonts don't line up exactly: shift EDB's strokes by 2 cells.
  const shift = m => { const out = blank(); m.forEach((v, i) => { if (v && i + 2 * G + 2 < G * G) out[i + 2 * G + 2] = 1; }); return out; };
  const shifted = assign([shift(b), shift(a), shift(c)], [a, b, c]);
  ok('assign tolerates a small offset', same(shifted.order, [1, 0, 2]) && Math.min(...shifted.scores) > 0.9, JSON.stringify(shifted));
  // Both of EDB's strokes lie closest to Make Me a Hanzi's first: each is still used once.
  const crowded = assign([a, rect(8, 11, 56, 15)], [a, rect(8, 18, 56, 22)]);
  ok('assign uses each stroke once', same(crowded.order, [0, 1]), JSON.stringify(crowded.order));
  const far = assign([rect(0, 0, 4, 4)], [rect(50, 50, 54, 54)]);
  ok('assign scores a stroke with nothing near it as 0', far.scores[0] === 0, JSON.stringify(far));
}

// --- verdictFor
ok('verdict: another stroke count is "differs"', verdictFor(4, 3, []) === 'differs');
ok('verdict: a weak stroke is "look"', verdictFor(3, 3, [1, 0.46, 1]) === 'look');
ok('verdict: all strong is "ok"', verdictFor(3, 3, [1, 0.77, 0.98]) === 'ok');

// --- records
{
  const good = { edb: '1001-2000/1293', strokes: 5, order: [0, 1, 2, 4, 3], scores: [1, 1, 1, 1, 1], fit: 0.72, verdict: 'ok', checked: '2026-09-30' };
  ok('a good record passes', recordProblem('必', good) === null);
  ok('an order repeating a stroke fails', recordProblem('必', { ...good, order: [0, 1, 2, 3, 3] }) !== null);
  ok('an order of the wrong length fails', recordProblem('必', { ...good, order: [0, 1, 2, 3] }) !== null);
  ok('an unknown verdict fails', recordProblem('必', { ...good, verdict: 'fine' }) !== null);
  ok('a record needs a date', recordProblem('必', { ...good, checked: 'today' }) !== null);
  ok('a missing record needs no order', recordProblem('咗', { edb: null, verdict: 'missing', note: "not in EDB's list", checked: '2026-09-30' }) === null);
  const look = { ...good, verdict: 'look' };
  ok('a look record is drawn but not usable', drawable(look) && !usable(look));
  ok('a confirmed look record is usable', usable({ ...look, confirmed: '2026-10-01' }));
  ok('a differs record is neither', !drawable({ verdict: 'differs' }) && !usable({ verdict: 'differs' }));

  const raw = { strokes: ['s0', 's1', 's2', 's3', 's4'], medians: [[[0, 0]], [[1, 1]], [[2, 2]], [[3, 3]], [[4, 4]]] };
  const built = build('必', raw, good);
  ok('build puts the strokes in the Hong Kong order', same(built.strokes, ['s0', 's1', 's2', 's4', 's3']), JSON.stringify(built.strokes));
  ok('build moves the centre lines with them', built.medians[3][0][0] === 4 && built.medians[4][0][0] === 3);
  ok('build says how the file was changed (Arphic Public License)', /Arphic Public License/.test(built.notice) && built.notice.includes(good.checked));
  let threw = false;
  try { build('必', { strokes: raw.strokes.slice(1), medians: raw.medians.slice(1) }, good); } catch { threw = true; }
  ok('build refuses data with another stroke count', threw);
}

// --- shared/strokes.js
{
  const sb = vm.createContext({});
  sb.window = sb;
  vm.runInContext(readFileSync(join(ROOT, 'shared/strokes.js'), 'utf8'), sb);
  const { Strokes } = sb;
  const data = { char: '十', strokes: ['M 0 0 Z', 'M 1 1 Z'], medians: [[[100, 400], [900, 400]], [[500, 800], [500, 0]]] };
  const count = (svg, re) => (svg.match(re) ?? []).length;
  ok('src names the file by code point', Strokes.src('十') === '../strokes/5341.json', Strokes.src('十'));
  const all = Strokes.svg(data);
  ok('svg draws every stroke in ink', count(all, /class="ink"/g) === 2 && !all.includes('class="num"'));
  const first = Strokes.svg(data, { upto: 1, mark: true, numbers: true });
  ok('svg upto: 1 draws one stroke, marked', count(first, /<path class="(ink|new|ghost)"/g) === 1 && count(first, /class="new"/g) === 1);
  ok('svg numbers only the drawn strokes', count(first, /class="num"/g) === 1 && first.includes('>1</text>'));
  const trace = Strokes.svg(data, { upto: 1, ghost: true });
  ok('svg ghost shows the rest faintly', count(trace, /class="ghost"/g) === 1 && count(trace, /class="ink"/g) === 1);
  ok('svg grid lines by default, none with grid: false', all.includes('class="mid"') && !Strokes.svg(data, { grid: false }).includes('class="mid"'));
  // Stroke 1 starts at (100, 400) going right: its number sits just left of it, on screen y = 900 - 400.
  const [, x, y] = first.match(/<circle cx="([\d.]+)" cy="([\d.]+)"/) ?? [];
  ok('svg puts a number just before its stroke starts', +x < 100 && +x >= 64 && +y === 500, `${x}, ${y}`);
}

if (fail) { console.log(`${fail} failed`); process.exit(1); }
if (!quiet) console.log('all passed');
