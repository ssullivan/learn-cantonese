#!/usr/bin/env node
/*
 * pitch.test.mjs — tests shared/pitch.js on synthetic voices with known
 * pitch. Run by tools/check.mjs; exits 1 on failure.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT } from './site.mjs';

const sb = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'shared/pitch.js'), 'utf8'), sb);
const { track, contour } = sb.window.Pitch;
const SR = 16000;
// Voice-like: harmonics with falling amplitude, frequency following f(t)
function voice(dur, f, { harm = 8, noise = 0.02 } = {}) {
  const n = Math.round(dur * SR), x = new Float32Array(n);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    ph += 2 * Math.PI * f(i / SR / dur) / SR;
    let v = 0; for (let h = 1; h <= harm; h++) v += Math.sin(h * ph) / h;
    const env = Math.min(1, i / 400, (n - i) / 400);
    x[i] = 0.3 * env * v + noise * (Math.random() * 2 - 1);
  }
  return x;
}
const silence = s => new Float32Array(Math.round(s * SR));
const cat = (...a) => { const o = new Float32Array(a.reduce((s, x) => s + x.length, 0)); let k = 0; for (const x of a) { o.set(x, k); k += x.length; } return o; };
const hz = fr => fr.map(f => f.hz);
const avg = a => a.reduce((s, v) => s + v, 0) / a.length;
let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info) => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };

let fr = track(voice(0.5, () => 200), SR);
ok('level 200Hz', fr.length > 30 && Math.abs(avg(hz(fr)) - 200) < 3, `mean ${avg(hz(fr)).toFixed(1)}Hz, ${fr.length} frames`);

fr = track(voice(0.5, () => 110, { harm: 20 }), SR);
ok('low buzzy 110Hz (no octave error)', fr.length > 30 && hz(fr).every(h => Math.abs(h - 110) < 6), `range ${Math.min(...hz(fr)).toFixed(1)}–${Math.max(...hz(fr)).toFixed(1)}Hz`);

let c = contour(track(voice(0.5, t => 150 + 100 * t), SR));
let s = c.flat();
ok('rising contour', c.length === 1 && s.at(-1).st - s[0].st > 6, `start ${s[0].st.toFixed(1)}st end ${s.at(-1).st.toFixed(1)}st`);

c = contour(track(voice(0.5, t => 220 - 70 * t), SR));
s = c.flat();
ok('falling contour', s.at(-1).st - s[0].st < -4, `start ${s[0].st.toFixed(1)}st end ${s.at(-1).st.toFixed(1)}st`);

c = contour(track(cat(voice(0.3, () => 240), silence(0.15), voice(0.3, () => 160)), SR));
ok('two syllables → 2 segments, high then low', c.length === 2 && avg(c[0].map(p => p.st)) > avg(c[1].map(p => p.st)) + 4,
  `${c.length} segments, means ${c.map(g => avg(g.map(p => p.st)).toFixed(1)).join(' / ')}st`);

ok('silence → no contour', contour(track(silence(0.5), SR)).length === 0, '');
const t = performance.now(); track(voice(2, () => 180), SR);
ok('speed (2s of audio)', performance.now() - t < 500, `${(performance.now() - t).toFixed(0)}ms`);
process.exit(fail ? 1 : 0);
