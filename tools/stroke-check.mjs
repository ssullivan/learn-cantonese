#!/usr/bin/env node
/*
 * stroke-check.mjs — checks characters' stroke order against Hong Kong's
 * standard: the Education Bureau's 《香港小學學習字詞表》 stroke animations
 * (EDB). Writes the verdicts to tools/strokes-hk.json, which
 * tools/strokes.mjs builds strokes/ from. Needs Playwright (see
 * tools/site.mjs's browser()). Not part of check.mjs.
 *
 *   node tools/stroke-check.mjs              every character a unit teaches
 *                                            to write that has no record yet
 *                                            (and isn't composed from parts:
 *                                            tools/strokes-composed.mjs)
 *   node tools/stroke-check.mjs unit4        that unit's characters, again
 *   node tools/stroke-check.mjs 之菜         these characters (candidates too)
 *   node tools/stroke-check.mjs --confirm 點 a person watched EDB's animation
 *                                            and the order is right: a "look"
 *                                            record becomes usable
 *
 * For each character it:
 *   1. finds its animation on EDB's site (not there: "missing"; Cantonese
 *      characters like 咗 aren't in its list);
 *   2. plays the animation in headless Chrome frame by frame and takes
 *      each stroke's new ink (stroke-data.mjs's segment);
 *   3. draws Make Me a Hanzi's strokes stretched onto EDB's glyph, and
 *      pairs each EDB stroke with the one it overlaps most (assign).
 * The pairing is the Hong Kong order. A different stroke count is
 * "differs"; a weak pair is "look", for a person to compare.
 *
 * Only these facts are kept (order, counts, scores), never EDB's drawings.
 */
import { pathToFileURL } from 'node:url';
import { browser, unitDirs, loadVocab } from './site.mjs';
import {
  G, BASE, fetchRaw, edbUrl, readRecords, writeRecords, taught, COMPOSED,
  segment, bbox, fit, iou, assign, verdictFor,
} from './stroke-data.mjs';

const today = () => new Date().toISOString().slice(0, 10);
const decode = b64 => Uint8Array.from(Buffer.from(b64, 'base64'));

// The character's animation, "0001-1000/0001", from a search on EDB's site.
async function findEdb(char) {
  const body = new URLSearchParams({ searchMethod: 'direct', searchCriteria: char, submit: '' });
  const r = await fetch('https://www.edbchinese.hk/lexlist_ch/result.jsp', { method: 'POST', body, headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!r.ok) throw new Error(`EDB search for ${char}: HTTP ${r.status}`);
  return (await r.text()).match(/stkdemo_js\/([^"']+?)\.html/)?.[1] ?? null;
}

// Every frame of one loop of the animation, as G×G ink masks (base64).
// The animation is Adobe Animate (CreateJS): rebuild it on the stage, stop
// the clock, and draw one frame per stage.update(), with the stroke
// numbers hidden and the corner they sit in ignored.
async function frames(page, edb) {
  await page.goto(edbUrl({ edb }), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.AdobeAn && window.stage && window.createjs);
  const list = await page.evaluate(G => {
    createjs.Ticker.removeAllEventListeners();
    createjs.Ticker.paused = true;
    stage.removeAllChildren();
    const lib = AdobeAn.getComposition(Object.keys(AdobeAn.compositions)[0]).getLibrary();
    const root = new lib[Object.keys(lib).find(k => /^_\d+$/.test(k))]();
    stage.addChild(root);
    const ctx = canvas.getContext('2d');
    const hide = o => { if (o instanceof createjs.Text) o.alpha = 0; (o.children || []).forEach(hide); };
    const mask = () => {
      const { width: W, height: H } = canvas, d = ctx.getImageData(0, 0, W, H).data, m = new Uint8Array(G * G);
      for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
        const i = (y * W + x) * 4;
        if (x < W * 0.1 && y < H * 0.1) continue;
        if (d[i + 3] > 128 && d[i] < 100 && d[i + 1] < 100 && d[i + 2] < 100) m[Math.floor(y * G / H) * G + Math.floor(x * G / W)] = 1;
      }
      return m;
    };
    const out = [];
    let base, peak = 0;
    for (let f = 0; f < 3000; f++) {
      hide(root);
      stage.update();
      const m = mask();
      base ??= m;
      out.push(btoa(String.fromCharCode(...m)));
      const n = m.reduce((a, v, i) => a + (v && !base[i] ? 1 : 0), 0);
      if (n < peak * 0.5) break;
      peak = Math.max(peak, n);
    }
    return out;
  }, G);
  return list.map(decode);
}

// Make Me a Hanzi strokes drawn with canvas matrix `m` (grid cells), one
// mask each, at 4× and then sampled down.
async function draw(page, paths, m) {
  const list = await page.evaluate(({ paths, m, G }) => {
    const c = document.createElement('canvas');
    c.width = c.height = G * 4;
    const ctx = c.getContext('2d');
    return paths.map(p => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.setTransform(...m.map(v => v * 4));
      ctx.fill(new Path2D(p));
      const d = ctx.getImageData(0, 0, c.width, c.height).data, out = new Uint8Array(G * G);
      for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 128) {
        const x = (i / 4) % c.width, y = ((i / 4) / c.width) | 0;
        out[((y / 4) | 0) * G + ((x / 4) | 0)] = 1;
      }
      return btoa(String.fromCharCode(...out));
    });
  }, { paths, m, G });
  return list.map(decode);
}

const union = masks => masks.reduce((u, m) => u.map((v, i) => v | m[i]), new Uint8Array(G * G));

export async function checkChar(page, char) {
  const checked = today();
  const [edb, raw] = await Promise.all([findEdb(char), fetchRaw(char)]);
  if (!edb) return { edb: null, verdict: 'missing', note: "not in EDB's list", checked };
  if (!raw) return { edb, verdict: 'missing', note: 'no Make Me a Hanzi data', checked };
  const strokes = segment(await frames(page, edb));
  const all = union(strokes);
  const m = fit(bbox(all), bbox(union(await draw(page, raw.strokes, BASE))));
  const mm = await draw(page, raw.strokes, m);
  const glyph = +iou(all, union(mm)).toFixed(2);
  if (strokes.length !== mm.length) {
    return { edb, strokes: strokes.length, mmah: mm.length, fit: glyph, verdict: 'differs', checked };
  }
  const { order, scores } = assign(strokes, mm);
  return { edb, strokes: strokes.length, order, scores, fit: glyph, verdict: verdictFor(strokes.length, mm.length, scores), checked };
}

const describe = (char, r) => {
  const same = r.order?.every((j, k) => j === k);
  const weakest = r.scores ? Math.min(...r.scores) : null;
  return `${r.verdict.toUpperCase().padEnd(7)} ${char}  ` + ({
    missing: r.note,
    differs: `EDB has ${r.strokes} strokes, Make Me a Hanzi ${r.mmah}: the Hong Kong form differs`,
  }[r.verdict] ?? `${r.strokes} strokes, ${same ? 'same order as Make Me a Hanzi' : `Hong Kong order ${JSON.stringify(r.order)}`}, `
    + `weakest stroke ${r.scores.indexOf(weakest) + 1} (${weakest}), glyph overlap ${r.fit}`);
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const records = readRecords();

  if (args[0] === '--confirm') {
    for (const char of [...(args[1] ?? '')]) {
      const r = records[char];
      if (r?.verdict !== 'look') { console.error(`${char}: only a "look" record needs confirming (it is ${r?.verdict ?? 'unchecked'})`); process.exit(1); }
      r.confirmed = today();
      console.log(`${char}: confirmed`);
    }
    writeRecords(records);
    process.exit(0);
  }

  const units = args.filter(a => /^unit\d+$/.test(a));
  const bad = units.filter(u => !unitDirs().includes(u));
  if (bad.length) { console.error(`no ${bad.join(', ')}`); process.exit(1); }
  const named = args.filter(a => !/^unit\d+$/.test(a)).flatMap(a => [...a]).filter(c => /\p{Script=Han}/u.test(c));
  const chars = [...new Set(args.length
    ? [...units.flatMap(u => [...(loadVocab(u)?.write ?? '')]), ...named]
    : taught().map(t => t.char).filter(c => !records[c] && !COMPOSED[c]))];
  if (!chars.length) { console.log('Every character taught has a record. Name a unit or characters to check again.'); process.exit(0); }

  const b = await browser();
  const page = await b.newPage();
  try {
    for (const char of chars) {
      records[char] = await checkChar(page, char);
      writeRecords(records);
      console.log(describe(char, records[char]));
    }
  } finally {
    await b.close();
  }
  const look = chars.filter(c => records[c].verdict === 'look');
  if (look.length) console.log(`\nWatch EDB's animation of ${look.join(' ')} (links on review/strokes.html), then: node tools/stroke-check.mjs --confirm ${look.join('')}`);
}
