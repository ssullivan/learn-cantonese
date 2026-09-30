/*
 * stroke-data.mjs — the site's stroke-order data, shared by
 * tools/stroke-check.mjs, tools/strokes.mjs, tools/check.mjs and
 * tools/strokes.test.mjs.
 *
 * Where it comes from:
 *   shapes     Make Me a Hanzi, as packaged by hanzi-writer-data (DATA):
 *              each stroke's outline and centre line in a 1024 box, y up,
 *              in mainland (PRC) stroke order. Arphic Public License
 *              (strokes/ARPHICPL.TXT).
 *   the order  Hong Kong's standard, the Education Bureau's
 *              《香港小學學習字詞表》 stroke animations (EDB).
 *              tools/stroke-check.mjs compares each animation with the
 *              shapes and records the result in tools/strokes-hk.json.
 *
 * A unit lists the characters it teaches to write as a string in its
 * vocab: write: '一二三十'. Each needs a usable record, and
 * tools/strokes.mjs writes its strokes/<hex>.json: the shapes in the Hong
 * Kong order.
 *
 * Records (tools/strokes-hk.json, keyed by character):
 *   { edb: "0001-1000/0001" (its EDB animation) or null,
 *     strokes (EDB's count), mmah (Make Me a Hanzi's, when different),
 *     order: [Make Me a Hanzi's stroke index for each Hong Kong stroke],
 *     scores: [how well each pair matched, 0–1], fit (the glyphs' overlap),
 *     verdict, note?, checked: "YYYY-MM-DD",
 *     confirmed?: "YYYY-MM-DD" (a person compared it with EDB's animation) }
 *   verdict  "ok"       every stroke matched well
 *            "look"     one matched weakly: usable once a person confirms it
 *            "differs"  EDB has a different number of strokes (之: Hong Kong
 *                       writes 4, Make Me a Hanzi 3), so reordering can't give
 *                       the Hong Kong form
 *            "missing"  not in EDB's list, or no Make Me a Hanzi data
 *
 *   DATA, dataUrl(char)     the stroke shapes' package and one character's URL
 *   fetchRaw(char)          { strokes, medians } from DATA, or null
 *   edbUrl(record)          the record's EDB animation page
 *   RECORDS, readRecords(), writeRecords(records)
 *   recordProblem(char, r)  why a record is malformed, or null
 *   drawable(record)        ok or look: tools/strokes.mjs writes its file (a
 *                           look record's too, so review/strokes.html shows it)
 *   usable(record)          ok, or look and confirmed: a unit can teach it
 *   taught()                [{ unit, char }] from every unit's `write`
 *   strokeFile(char)        strokes/<hex>.json (absolute path)
 *   meta(char, record)      everything strokes/<hex>.json holds but the shapes
 *   build(char, raw, record) the strokes/<hex>.json object
 *
 * Composed characters (tools/strokes-composed.mjs: 咗 is 口 + 左):
 *   COMPOSED                { char: recipe }
 *   sources(recipe)         the characters its parts come from or fit into
 *   composedProblem(char, recipe, records)
 *                           why it can't be built (a source not usable, a
 *                           range out of bounds, parts not adding up), or null
 *   composedMeta(char, recipe, records)
 *   compose(recipe, hk)     { strokes, medians } from its sources' data in
 *                           Hong Kong order ({ char: { strokes, medians } })
 *   movePath(d, f), pathBox(paths)
 *                           move every point of a path; the box around paths
 *
 * Matching (G×G masks: Uint8Array of 0/1, row by row):
 *   G, segment(frames), bbox(mask), fit(edbBox, mmBox), dilate(mask, r),
 *   iou(a, b), assign(edb, mm), verdictFor(edbCount, mmCount, scores)
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, unitDirs, loadVocab } from './site.mjs';
import COMPOSED from './strokes-composed.mjs';

export { COMPOSED };

export const DATA = 'hanzi-writer-data@2.0.1';
export const dataUrl = char => `https://cdn.jsdelivr.net/npm/${DATA}/${encodeURIComponent(char)}.json`;

export async function fetchRaw(char) {
  const r = await fetch(dataUrl(char));
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`${dataUrl(char)}: HTTP ${r.status}`);
  const { strokes, medians } = await r.json();
  return { strokes, medians };
}

export const edbUrl = record => `https://www.edbchinese.hk/EmbziciwebRes/stkdemo_js/${record.edb}.html?lang=ch`;

// --- records

export const RECORDS = join(ROOT, 'tools', 'strokes-hk.json');

export const readRecords = () => existsSync(RECORDS) ? JSON.parse(readFileSync(RECORDS, 'utf8')) : {};

// One character per line, in code point order, so a diff shows what changed.
export function writeRecords(records) {
  const chars = Object.keys(records).sort((a, b) => a.codePointAt(0) - b.codePointAt(0));
  writeFileSync(RECORDS, `{\n${chars.map(c => `  ${JSON.stringify(c)}: ${JSON.stringify(records[c])}`).join(',\n')}\n}\n`);
}

const VERDICTS = ['ok', 'look', 'differs', 'missing'];
const DAY = /^\d{4}-\d{2}-\d{2}$/;

export function recordProblem(char, r) {
  if ([...char].length !== 1) return 'key must be one character';
  if (!VERDICTS.includes(r.verdict)) return `unknown verdict ${r.verdict}`;
  if (!DAY.test(r.checked ?? '')) return 'checked must be a date';
  if (r.confirmed !== undefined && !DAY.test(r.confirmed)) return 'confirmed must be a date';
  if (r.verdict === 'ok' || r.verdict === 'look') {
    const n = r.strokes;
    if (!Array.isArray(r.order) || r.order.length !== n) return `order needs ${n} strokes`;
    if (new Set(r.order).size !== n || r.order.some(j => !Number.isInteger(j) || j < 0 || j >= n)) return `order must use each of 0–${n - 1} once`;
    if (typeof r.edb !== 'string') return 'edb must name its animation';
  }
  return null;
}

export const drawable = r => r?.verdict === 'ok' || r?.verdict === 'look';
export const usable = r => !!r && (r.verdict === 'ok' || (r.verdict === 'look' && !!r.confirmed));

export function taught() {
  return unitDirs().flatMap(unit => [...(loadVocab(unit)?.write ?? '')].map(char => ({ unit, char })));
}

// --- strokes/<hex>.json

export const strokeFile = char => join(ROOT, 'strokes', `${char.codePointAt(0).toString(16)}.json`);

export function meta(char, r) {
  return {
    char,
    notice: `${NOTICE}strokes put in the Hong Kong order (Education Bureau) checked on ${r.checked}.`,
    order: r.order,
    hk: { edb: r.edb, verdict: r.verdict, checked: r.checked, ...(r.confirmed && { confirmed: r.confirmed }) },
  };
}

const NOTICE = `Stroke shapes from Make Me a Hanzi (${DATA}), under the Arphic Public License (ARPHICPL.TXT in this folder). Changed by tools/strokes.mjs: `;

export function build(char, raw, r) {
  if (raw.strokes.length !== r.order.length) throw new Error(`${char}: ${raw.strokes.length} strokes in ${DATA}, ${r.order.length} in its record`);
  return { ...meta(char, r), strokes: r.order.map(j => raw.strokes[j]), medians: r.order.map(j => raw.medians[j]) };
}

// --- composed characters

export const sources = recipe => [...new Set(recipe.parts.flatMap(p => [p.from, ...(p.into ? [p.into[0]] : [])]))];

export function composedProblem(char, recipe, records) {
  const bad = sources(recipe).filter(c => !usable(records[c]));
  if (bad.length) return `its parts come from ${bad.join(' ')}, which need a usable stroke-order record (run node tools/stroke-check.mjs ${bad.join('')})`;
  const inRange = (c, [a, b]) => Number.isInteger(a) && Number.isInteger(b) && 0 <= a && a < b && b <= records[c].strokes;
  let n = 0;
  for (const { from, take = [0, records[from].strokes], into } of recipe.parts) {
    if (!inRange(from, take)) return `take ${JSON.stringify(take)} is outside ${from}'s ${records[from].strokes} strokes`;
    if (into && !inRange(into[0], into.slice(1))) return `into ${JSON.stringify(into)} is outside ${into[0]}'s strokes`;
    n += take[1] - take[0];
  }
  return n === recipe.strokes ? null : `its parts have ${n} strokes, not ${recipe.strokes}`;
}

export function composedMeta(char, recipe, records) {
  const from = Object.fromEntries(sources(recipe).map(c => [c, { edb: records[c].edb, checked: records[c].checked }]));
  return {
    char,
    notice: `${NOTICE}composed from parts of ${Object.keys(from).join(' ')}, each in the Hong Kong order (Education Bureau) checked on the date given.`,
    order: null,
    hk: { verdict: 'composed', parts: recipe.parts, from },
  };
}

// Every x y pair in a path through f. Make Me a Hanzi's paths use only
// absolute commands (M L Q C Z), so every number is half of a point.
export function movePath(d, f) {
  const out = [];
  let pair = [];
  for (const t of d.trim().split(/\s+/)) {
    if (/^[A-Za-z]$/.test(t)) { out.push(t); continue; }
    pair.push(+t);
    if (pair.length === 2) { out.push(...f(pair).map(v => Math.round(v * 10) / 10)); pair = []; }
  }
  return out.join(' ');
}

export function pathBox(paths) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const d of paths) movePath(d, ([x, y]) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); return [x, y]; });
  return [x0, y0, x1, y1];
}

export function compose(recipe, hk) {
  const strokes = [], medians = [];
  for (const { from, take = [0, hk[from].strokes.length], into } of recipe.parts) {
    let s = hk[from].strokes.slice(...take), m = hk[from].medians.slice(...take);
    if (into) {
      const [c, a, b] = into;
      const [t0, u0, t1, u1] = pathBox(hk[c].strokes.slice(a, b)), [x0, y0, x1, y1] = pathBox(s);
      const f = ([x, y]) => [t0 + (x - x0) * (t1 - t0) / (x1 - x0), u0 + (y - y0) * (u1 - u0) / (y1 - y0)];
      s = s.map(d => movePath(d, f));
      m = m.map(line => line.map(p => f(p).map(Math.round)));
    }
    strokes.push(...s);
    medians.push(...m);
  }
  return { strokes, medians };
}

// --- matching EDB's animation with Make Me a Hanzi's strokes

export const G = 64;
const count = m => m.reduce((a, v) => a + v, 0);

// Frames of the animation (frames[0] before any stroke) → one mask per
// stroke: its new ink. A stroke is a burst of new ink followed by a pause
// of `pause` frames; the files' stroke numbers can't be trusted (先 never
// shows a 6). Stops where the ink is cleared for the next loop.
export function segment(frames, pause = 4) {
  const base = frames[0], ends = [];
  const own = m => m.map((v, i) => v && !base[i] ? 1 : 0);
  let prev = base, drawing = false, still = 0, peak = 0;
  for (const now of frames.slice(1)) {
    const n = count(own(now));
    if (n < peak * 0.5) break;
    peak = Math.max(peak, n);
    if (now.some((v, i) => v && !prev[i])) { drawing = true; still = 0; }
    else if (drawing && ++still >= pause) { ends.push(prev); drawing = false; }
    prev = now;
  }
  if (drawing) ends.push(prev);
  return ends.map((m, k) => m.map((v, i) => v && !base[i] && !(k && ends[k - 1][i]) ? 1 : 0));
}

// [x0, y0, x1, y1) of the ink, in cells.
export function bbox(m) {
  let x0 = G, y0 = G, x1 = 0, y1 = 0;
  m.forEach((v, i) => {
    if (!v) return;
    const x = i % G, y = (i / G) | 0;
    x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x + 1); y1 = Math.max(y1, y + 1);
  });
  return [x0, y0, x1, y1];
}

// Make Me a Hanzi's box is 1024 wide with y up from a baseline at 900.
// BASE draws it into the grid; fit() is the canvas matrix [a, b, c, d, e,
// f] (in grid cells) that stretches its drawing, whose ink covers mmBox
// under BASE, onto EDB's glyph box.
const S = G / 1024;
export const BASE = [S, 0, 0, -S, 0, 900 * S];
export function fit([e0, f0, e1, f1], [a0, b0, a1, b1]) {
  const sx = (e1 - e0) / (a1 - a0), sy = (f1 - f0) / (b1 - b0);
  return [S * sx, 0, 0, -S * sy, e0 - a0 * sx, f0 + (900 * S - b0) * sy];
}

export function dilate(m, r = 1) {
  for (let k = 0; k < r; k++) {
    m = m.map((v, i) => v || (i % G && m[i - 1]) || ((i + 1) % G && m[i + 1]) || m[i - G] || m[i + G] ? 1 : 0);
  }
  return m;
}

export function iou(a, b) {
  let both = 0, either = 0;
  for (let i = 0; i < a.length; i++) { both += a[i] & b[i]; either += a[i] | b[i]; }
  return either ? both / either : 0;
}

// Pair each EDB stroke with one Make Me a Hanzi stroke: score each pair by
// how much of each lies near the other (within 3 cells, so the two fonts
// needn't line up exactly), then take the best pairs first. Returns
// { order: [mm index for each EDB stroke], scores }.
export function assign(edb, mm) {
  const near = m => dilate(m, 3);
  const cover = (a, b) => { let n = 0, hit = 0; for (let i = 0; i < a.length; i++) if (a[i]) { n++; hit += b[i]; } return n ? hit / n : 0; };
  const mmNear = mm.map(near), edbNear = edb.map(near);
  const pairs = edb.flatMap((e, k) => mm.map((m, j) => [(cover(e, mmNear[j]) + cover(m, edbNear[k])) / 2, k, j]))
    .sort((a, b) => b[0] - a[0]);
  const order = edb.map(() => null), scores = edb.map(() => 0), used = new Set();
  for (const [s, k, j] of pairs) {
    if (order[k] !== null || used.has(j)) continue;
    order[k] = j; scores[k] = +s.toFixed(2); used.add(j);
  }
  return { order, scores };
}

export const LOOK = 0.6;
export function verdictFor(edbCount, mmCount, scores) {
  if (edbCount !== mmCount) return 'differs';
  return Math.min(...scores) < LOOK ? 'look' : 'ok';
}
