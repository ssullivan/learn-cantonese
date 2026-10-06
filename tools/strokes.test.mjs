#!/usr/bin/env node
/*
 * strokes.test.mjs — tests the stroke-order data: stroke-check.mjs's
 * matching on synthetic masks (tools/stroke-data.mjs: segment, fit,
 * assign, verdictFor), records and strokes/<hex>.json building,
 * composing characters from parts (tools/strokes-composed.mjs),
 * shared/strokes.js's drawing, and shared/write.js's checking of drawn
 * strokes (on the real data for 三 and 十). Run by tools/check.mjs; exits 1
 * on failure.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT } from './site.mjs';
import {
  G, segment, fit, assign, verdictFor, recordProblem, usable, drawable, build,
  COMPOSED, readRecords, composedProblem, composedMeta, compose, movePath, pathBox, sources,
} from './stroke-data.mjs';

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
  // A flicker after the last stroke (a little ink that comes and goes, as in 名's animation) is not a stroke.
  const blip = rect(50, 50, 53, 53);
  const flicker = [...frames.slice(0, 22), ...Array(3).fill(or(frameLine, across, down, blip)), ...Array(6).fill(or(frameLine, across, down)), frameLine];
  ok('segment ignores ink that comes and goes after the last stroke', segment(flicker).length === 2, `${segment(flicker).length} strokes`);
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

// --- composed characters
{
  ok('movePath moves every point', movePath('M 1 2 Q 3 4 5 6 L 7 8 Z', ([x, y]) => [x * 2, y + 1]) === 'M 2 3 Q 6 5 10 7 L 14 9 Z');
  ok('pathBox spans every point', same(pathBox(['M 10 20 L 30 5 Z', 'M 0 50 Q 5 5 12 12 Z']), [0, 5, 30, 50]));

  // 口 in the left of a layout character, and a square part to fit into its right.
  const sq = (x0, y0, x1, y1) => `M ${x0} ${y0} L ${x1} ${y0} L ${x1} ${y1} L ${x0} ${y1} Z`;
  const hk = {
    L: { strokes: [sq(0, 0, 10, 10), sq(10, 0, 20, 10), sq(50, 0, 100, 100)], medians: [[[0, 0]], [[10, 0]], [[50, 0], [100, 100]]] },
    R: { strokes: [sq(0, 0, 200, 100), sq(0, 100, 200, 200)], medians: [[[0, 0], [200, 0]], [[0, 100], [200, 200]]] },
  };
  const made = compose({ strokes: 4, parts: [{ from: 'L', take: [0, 2] }, { from: 'R', into: ['L', 2, 3] }] }, hk);
  ok('compose keeps a taken part where it is', made.strokes[0] === hk.L.strokes[0] && made.strokes[1] === hk.L.strokes[1]);
  ok('compose stretches a part onto its box', same(pathBox(made.strokes.slice(2)), [50, 0, 100, 100]), JSON.stringify(pathBox(made.strokes.slice(2))));
  ok('compose moves the centre lines with it', JSON.stringify(made.medians[3]) === '[[50,50],[100,100]]', JSON.stringify(made.medians[3]));
  ok('compose puts the parts in order', made.strokes.length === 4 && made.medians.length === 4);

  const rec = (n, extra) => ({ edb: 'x/1', strokes: n, order: [...Array(n).keys()], scores: Array(n).fill(1), verdict: 'ok', checked: '2026-09-30', ...extra });
  const recipe = { strokes: 4, parts: [{ from: 'L', take: [0, 2] }, { from: 'R', into: ['L', 2, 3] }] };
  ok('a recipe from usable parts that add up is fine', composedProblem('X', recipe, { L: rec(3), R: rec(2) }) === null);
  ok('a part without a usable record is a problem', /R/.test(composedProblem('X', recipe, { L: rec(3), R: rec(2, { verdict: 'differs' }) }) ?? ''));
  ok('the box character needs a usable record too', sources(recipe).includes('L') && composedProblem('X', { strokes: 2, parts: [{ from: 'R', into: ['Q', 0, 1] }] }, { R: rec(2) }) !== null);
  ok('parts not adding up is a problem', /3 strokes, not 4/.test(composedProblem('X', { ...recipe, parts: [{ from: 'L', take: [0, 1] }, recipe.parts[1]] }, { L: rec(3), R: rec(2) }) ?? ''));
  ok('a range past the end is a problem', composedProblem('X', { strokes: 4, parts: [{ from: 'L', take: [0, 4] }] }, { L: rec(3) }) !== null);
  const m = composedMeta('X', recipe, { L: rec(3), R: rec(2) });
  ok('a composed file says it was composed, and from what', m.hk.verdict === 'composed' && Object.keys(m.hk.from).join('') === 'LR' && /composed/.test(m.notice));

  // The real recipes can all be built from today's records.
  const records = readRecords();
  const broken = Object.entries(COMPOSED).map(([c, r]) => [c, composedProblem(c, r, records)]).filter(([, p]) => p);
  ok('every recipe in tools/strokes-composed.mjs can be built', !broken.length, JSON.stringify(broken));
}

// --- shared/strokes.js
{
  const sb = vm.createContext({});
  sb.window = sb;
  for (const f of ['shared/units.js', 'shared/strokes.js']) vm.runInContext(readFileSync(join(ROOT, f), 'utf8'), sb);
  const { Strokes, Units, Words } = sb;
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
  ok('svg puts a number just before its stroke starts', +x < 100 && +x > 0 && +y === 500, `${x}, ${y}`);
  ok("svg grid: 'mi' adds the diagonals", Strokes.svg(data, { grid: 'mi' }).includes('M12 12L1012 1012') && !all.includes('M12 12L1012 1012'));

  // Eight strokes starting at the same spot (灬 and the like): no two numbers overlap.
  const crowd = { char: '點', strokes: Array(8).fill('M 0 0 Z'), medians: Array(8).fill([[500, 400], [600, 300]]) };
  const spots = [...Strokes.svg(crowd, { numbers: true }).matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="(\d+)"/g)].map(m => m.slice(1).map(Number));
  const gap = Math.min(...spots.flatMap(([x, y], i) => spots.slice(i + 1).map(([u, v]) => Math.hypot(x - u, y - v))));
  ok('svg keeps crowded numbers apart', spots.length === 8 && gap >= 2 * spots[0][2] - 0.5, `closest ${gap.toFixed(1)}`);
  ok('svg keeps numbers inside the box', spots.every(([x, y, r]) => x - r >= 0 && x + r <= 1024 && y - r >= 0 && y + r <= 1024));

  const vocab = Units.add(2, { voice: 'x', write: '三', words: [{ id: 'b', hanzi: '三', unit: 1 }, { id: 'c', hanzi: '三個' }], numbers: [{ id: 'd', hanzi: '三' }] });
  ok('word is the first own entry with the character', Strokes.word(vocab, '三')?.id === 'c');
  Words.add(1, [{ id: 'saam', hanzi: '三' }]);
  Words.add(3, [{ id: 'saam-go', hanzi: '三個' }]);
  const v3 = Units.add(3, { voice: 'x', write: '三', words: [Words.get('saam'), Words.get('saam-go')] });
  ok('word skips a dictionary word taught earlier, and finds one taught here', Strokes.word(v3, '三')?.id === 'saam-go', Strokes.word(v3, '三')?.id);
}

// --- shared/write.js: is a drawn stroke the right one?
{
  const sb = vm.createContext({});
  vm.runInContext(readFileSync(join(ROOT, 'shared/write.js'), 'utf8'), sb);
  const { Write } = sb;
  const load = hex => JSON.parse(readFileSync(join(ROOT, 'strokes', `${hex}.json`), 'utf8'));
  const three = load('4e09'), ten = load('5341');
  // A stroke drawn along a median (on screen: y down), smoothly, as a finger would.
  const along = (median, { dx = 0, dy = 0, wobble = 0 } = {}) => Write.resample(median.map(([x, y]) => [x + dx, 900 - y + dy]), 30)
    .map(([x, y], i) => [x + wobble * Math.sin(i * 0.6), y + wobble * Math.cos(i * 0.45)]);

  const r = Write.resample([[0, 0], [100, 0]], 5);
  ok('resample spaces points evenly', same(r.map(p => p[0]), [0, 25, 50, 75, 100]), JSON.stringify(r));
  ok('resample of one point repeats it', Write.resample([[5, 5]], 3).every(p => p[0] === 5));

  ok('judge: 三 stroke 1 drawn right', Write.judge(along(three.medians[0]), three, 0).ok);
  ok('judge: a wobbly hand still counts', Write.judge(along(three.medians[0], { wobble: 35 }), three, 0).ok);
  ok('judge: a little off to the side still counts', Write.judge(along(three.medians[0], { dx: 60, dy: 40 }), three, 0).ok);
  const rev = along(three.medians[0]).reverse();
  ok('judge: the right stroke written backwards is wrong', !Write.judge(rev, three, 0).ok);
  ok('judge: far from the stroke is wrong', !Write.judge(along(three.medians[0], { dy: 320 }), three, 0).ok);
  ok('judge: a tap is not a long stroke', !Write.judge([[500, 300], [505, 302]], three, 0).ok);
  const middle = Write.judge(along(three.medians[1]), three, 0, 1.3);
  ok("judge: 三's middle stroke first is out of order, even when lenient", !middle.ok && middle.other === 1, JSON.stringify(middle));
  const bottom = Write.judge(along(three.medians[2]), three, 0, 1.3);
  ok("judge: 三's bottom stroke first names stroke 3", !bottom.ok && bottom.other === 2, JSON.stringify(bottom));
  ok('judge: after stroke 1, the middle stroke is right', Write.judge(along(three.medians[1]), three, 1, 1.3).ok);
  const between = Write.judge(along(three.medians[1], { dy: -100 }), three, 0, 1.3);
  ok("judge: between 三's top and middle strokes, nearer the middle, is the middle", !between.ok && between.other === 1, JSON.stringify(between));
  // Past the end of the top stroke by 235: on average close, but ending too far off.
  const top = three.medians[0].map(([x, y]) => [x, 900 - y]);
  const over = [...top, [top.at(-1)[0] + 235, top.at(-1)[1]]];
  ok('judge: overshooting far past the end is wrong', !Write.judge(Write.resample(over, 30), three, 0).ok);
  const early = [[top[0][0] - 235, top[0][1]], ...top];
  ok('judge: starting far before the start is wrong', !Write.judge(Write.resample(early, 30), three, 0).ok);
  ok('judge: a scribble along the stroke is wrong', !Write.judge(along(three.medians[0]).map(([x, y], i) => [x, y + (i % 2 ? 45 : -45)]), three, 0).ok);
  const down = Write.judge(along(ten.medians[1]), ten, 0);
  ok('judge: 十 written down-stroke first is out of Hong Kong order', !down.ok && down.other === 1, JSON.stringify(down));
  ok('blank: every copy of the character is blanked (公公 gives nothing away)', Write.blank('公公', '公') === '＿＿');
  ok('blank: only that character', Write.blank('最近點呀？', '近') === '最＿點呀？');
  ok('judge: a finished stroke is not offered again', Write.judge(along(ten.medians[0]), ten, 1).other === null);
}

if (fail) { console.log(`${fail} failed`); process.exit(1); }
if (!quiet) console.log('all passed');
