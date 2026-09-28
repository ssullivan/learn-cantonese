#!/usr/bin/env node
/*
 * audio-check.mjs — machine checks on generated clips, so a human listener
 * only needs to hear the doubtful ones. Needs ffmpeg and the Azure Speech
 * key (see tts.mjs); not part of check.mjs.
 *
 *   node tools/audio-check.mjs unit9 [--only id,id] [--all] [--json out.json]
 *
 * For each of the unit's own entries it:
 *   1. decodes audio/<id>.mp3 with ffmpeg: fails on a broken, silent or
 *      clipped file, or one too short or long for its syllable count
 *   2. transcribes it with Azure speech-to-text (zh-HK, no hint of the
 *      expected text) and compares what it heard with the entry: the
 *      same characters, or the same syllables ignoring tone (a homophone:
 *      tones are step 3's job), read with to-jyutping
 *   3. times each syllable with Azure pronunciation assessment (reference
 *      text spaced out character by character), tracks pitch in each one
 *      (shared/pitch.js), and compares its shape with the voice's own six
 *      tones, measured on unit 1's si fu fan clips
 *
 * Pronunciation assessment always scores the reference text highly, even
 * for the wrong word (琴日 read against 今日 scores 100), so it is used
 * only for timing, never as proof. Speech-to-text is biased towards
 * common words (都 → 刀, 毫 → 號), so a mismatch means "listen", not
 * "wrong". Tones are only flagged when the shape clearly disagrees.
 *
 * Setup, once: npm install --prefix ~/.cache/learning-cantonese to-jyutping
 * (outside the repo, which has no dependencies).
 *
 * Azure results are cached by clip hash in ~/.cache/learning-cantonese/,
 * so a rerun only calls Azure for new or changed clips. Prints the clips
 * worth a listen (all clips with --all); exits 0 either way.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { ROOT, loadVocab, entries, own, azureConfig } from './site.mjs';

const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf(name); return i < 0 ? null : args[i + 1]; };
const only = flag('--only') && new Set(flag('--only').split(','));
const showAll = args.includes('--all');
const jsonOut = flag('--json');
const unit = args.find((a, i) => /^unit\d+$/.test(a) && !['--only', '--json'].includes(args[i - 1]));
if (!unit) { console.error('usage: node tools/audio-check.mjs unit<N> [--only id,id] [--all] [--json out.json]'); process.exit(1); }

const HOME_CACHE = join(homedir(), '.cache/learning-cantonese');
const CACHE = join(HOME_CACHE, 'audio-check');
mkdirSync(CACHE, { recursive: true });
const { key: KEY, region: REGION } = azureConfig();

const sb = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'shared/pitch.js'), 'utf8'), sb);
const { track } = sb.window.Pitch;

// to-jyutping (npm), kept outside the repo: reads what speech-to-text
// heard as jyutping, so a homophone (分 for 墳) isn't a mismatch.
const TO_JYUTPING = join(HOME_CACHE, 'node_modules/to-jyutping/dist/index.mjs');
if (!existsSync(TO_JYUTPING)) { console.error(`Install to-jyutping first: npm install --prefix ${HOME_CACHE} to-jyutping`); process.exit(1); }
const { getJyutpingList } = await import(pathToFileURL(TO_JYUTPING));
const toneless = jp => jp.replace(/[1-6]/g, '');

const RATE = 16000;
const clip = (u, id) => join(ROOT, u, 'audio', `${id}.mp3`);
const hanziOf = s => [...s].filter(c => /\p{Script=Han}/u.test(c)).join('');

// ffmpeg → mono 16 kHz float samples, and the same as a WAV for Azure.
function decode(file) {
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-ac', '1', '-ar', String(RATE), '-f', 'f32le', '-'], { maxBuffer: 1e8 });
  return new Float32Array(raw.buffer, raw.byteOffset, raw.length / 4);
}
const wav = file => execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-ac', '1', '-ar', String(RATE), '-f', 'wav', '-'], { maxBuffer: 1e8 });

// Azure short-audio recognition; `reference` turns on pronunciation
// assessment. Cached by clip and request.
async function azure(file, reference) {
  const key = createHash('sha1').update(readFileSync(file)).update(reference ?? '').digest('hex');
  const cached = join(CACHE, `${key}.json`);
  if (existsSync(cached)) return JSON.parse(readFileSync(cached, 'utf8'));
  const headers = { 'Ocp-Apim-Subscription-Key': KEY, 'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000', Accept: 'application/json' };
  if (reference) headers['Pronunciation-Assessment'] = Buffer.from(JSON.stringify({ ReferenceText: reference, GradingSystem: 'HundredMark', Granularity: 'Word' })).toString('base64');
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://${REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=zh-HK&format=detailed`,
      { method: 'POST', headers, body: wav(file) });
    if (res.ok) {
      const out = await res.json();
      writeFileSync(cached, JSON.stringify(out));
      return out;
    }
    // Azure now and then answers 401 to a burst of requests; retry that too.
    if ((res.status === 401 || res.status === 429 || res.status >= 500) && attempt < 5) { await new Promise(r => setTimeout(r, 2000 * 2 ** attempt)); continue; }
    throw new Error(`Azure STT ${res.status}: ${await res.text()}`);
  }
}

// 1. The file itself.
function basics(x, syllables) {
  const problems = [];
  let peak = 0, clipped = 0;
  for (const v of x) { const a = Math.abs(v); if (a > peak) peak = a; if (a > 0.999) clipped++; }
  // Speech runs from the first to the last 10 ms window above 5% of the
  // peak; Azure pads clips with silence.
  const win = RATE / 100, loud = [];
  for (let s = 0; s + win <= x.length; s += win) {
    let m = 0;
    for (let i = s; i < s + win; i++) m = Math.max(m, Math.abs(x[i]));
    if (m > peak * 0.05) loud.push(s);
  }
  const secs = loud.length ? (loud[loud.length - 1] - loud[0] + win) / RATE : 0;
  if (peak < 0.05) problems.push('nearly silent');
  if (clipped > 20) problems.push(`${clipped} clipped samples`);
  const perSyl = secs / syllables;
  if (perSyl < 0.12) problems.push(`too short: ${secs.toFixed(2)} s for ${syllables} syllables`);
  if (perSyl > 0.6) problems.push(`too long: ${secs.toFixed(2)} s for ${syllables} syllables`);
  return { secs, problems };
}

// Pitch shape of one stretch of audio: start and end in semitones from
// 100 Hz, from the steady middle of its voiced frames.
function shape(frames) {
  const med = l => l.slice().sort((a, b) => a - b)[Math.floor(l.length / 2)];
  // The tracker sometimes jumps up or down a lot for a few frames (at a
  // stop, or creak); a voice can't move 4 semitones in 20 ms, so frames
  // that far from the syllable's median are dropped, then a median of 3
  // smooths what's left.
  const all = frames.map(f => 12 * Math.log2(f.hz / 100));
  const mid = med(all);
  const raw = all.filter(v => Math.abs(v - mid) <= 4);
  if (raw.length < 5) return null;
  const st = raw.map((_, k) => med(raw.slice(Math.max(0, k - 1), k + 2)));
  const cut = Math.floor(st.length * 0.25);
  const core = st.slice(cut, st.length - cut);
  const third = Math.max(1, Math.floor(core.length / 3));
  return { start: med(core.slice(0, third)), end: med(core.slice(-third)) };
}

// The voice's six tones, from unit 1's one-syllable clips.
function referenceTones() {
  const u1 = loadVocab('unit1');
  const sums = Array.from({ length: 7 }, () => ({ start: 0, end: 0, n: 0 }));
  for (const e of entries(u1).filter(e => /^(si|fu|fan)[1-6]$/.test(e.id))) {
    const s = shape(track(decode(clip('unit1', e.id)), RATE));
    if (!s) continue;
    const t = +e.id.slice(-1);
    sums[t].start += s.start; sums[t].end += s.end; sums[t].n++;
  }
  return sums.map(s => s.n && { start: s.start / s.n, end: s.end / s.n });
}

// A syllable clashes with its tone only when it clearly can't be it.
// Measured on this voice's unit 1 clips (semitones, end minus start):
// tone 2 rises 2–5, tone 5 only 0.5, tone 4 falls about 2, and the level
// tones move less than 1. Tone 1 sits about 5 above tones 4, 5 and 6.
// A piece under 100 ms (a short syllable ending in p, t or k) is too
// short to have a shape, so only its height is checked.
function clash(want, s, refs, offset, alone) {
  const slope = s.short ? 0 : s.end - s.start, mid = (s.start + s.end) / 2 - offset;
  const high = (refs[1].start + refs[1].end) / 2;
  // Next to other syllables a tone 2 can rise only a little (五點), so
  // there it is flagged only when it doesn't rise at all.
  if (want === 2 && !s.short && slope < (alone ? 1 : -0.5)) return 'should rise';
  if (want === 5 && slope < -1) return 'should rise a little, not fall';
  if (want === 4 && slope > 0.5) return 'should fall';
  if ([1, 3, 6].includes(want) && Math.abs(slope) > 3) return 'should be level';
  if (want === 1 && mid < high - 3) return 'too low for tone 1';
  if ([4, 5, 6].includes(want) && mid > high - 1.5) return `too high for tone ${want}`;
  return null;
}

function nearest(refs, s, offset) {
  let best = 0, dist = Infinity;
  for (let t = 1; t <= 6; t++) {
    const d = Math.hypot(refs[t].start - (s.start - offset), refs[t].end - (s.end - offset));
    if (d < dist) { dist = d; best = t; }
  }
  return best;
}

// 3. Tones: syllable timings from pronunciation assessment, pitch per syllable.
async function tones(file, x, e, refs) {
  const chars = [...hanziOf(e.hanzi)];
  const want = e.jyutping.split(' ').map(s => +s.slice(-1));
  if (chars.length !== want.length) return { note: 'hanzi and jyutping differ in length; tones not checked' };
  const pa = await azure(file, chars.join(' '));
  const words = pa.NBest?.[0]?.Words ?? [];
  if (words.length !== chars.length) return { note: `could not time each syllable (${words.map(w => w.Word).join(' ')})` };
  // Assessment's syllable times often run a little late, so a window can
  // catch the start of the next syllable. Cut the window's voiced frames
  // where the pitch drops out (the closure of a consonant) and keep the
  // longest piece: that is the syllable's own vowel. A piece that starts
  // in the back half of the window and runs on past it is the next
  // syllable starting early (十 in 十一 is nearly unvoiced), so skip it.
  const frames = track(x, RATE);
  const voiced = new Set(frames.map(f => f.i));
  const syllables = e.jyutping.split(' ');
  const shapes = words.map((w, i) => {
    const a = w.Offset / 1e7, b = a + w.Duration / 1e7;
    const pieces = [];
    for (const f of frames.filter(f => f.t >= a && f.t <= b)) {
      const last = pieces.at(-1)?.at(-1);
      if (last && f.i - last.i <= 2) pieces.at(-1).push(f); else pieces.push([f]);
    }
    const early = p => p[0].t > (a + b) / 2 && voiced.has(p.at(-1).i + 1) && p.at(-1).t >= b - 0.011;
    const piece = pieces.filter(p => !early(p)).sort((p, q) => q.length - p.length)[0] ?? [];
    // A syllable ending in p, t or k closes with a glottal catch that
    // throws the pitch tracker (十 sap6 reads 17 then 23): judge only the
    // height at its start.
    const checked = /[ptk][1-6]$/.test(syllables[i]);
    const s = piece.length >= 6 && shape(piece);
    if (s && checked) s.end = s.start;
    return s && { ...s, short: checked || piece.length < 10 };
  });
  // A sentence (4+ syllables) drifts higher or lower as a whole; line it
  // up with the references on its level tones before comparing heights.
  // Shorter clips are compared as they are: this is the references' own
  // voice, and a shift would hide a whole word said too low (琴日 for 今日).
  const levels = shapes.map((s, i) => s && [1, 3, 6].includes(want[i]) ? (s.start + s.end) / 2 - (refs[want[i]].start + refs[want[i]].end) / 2 : null).filter(v => v != null);
  const offset = chars.length >= 4 && levels.length ? levels.reduce((a, b) => a + b) / levels.length : 0;
  const per = shapes.map((s, i) => {
    if (!s) return { char: chars[i], want: want[i], heard: '?' };
    return { char: chars[i], want: want[i], heard: nearest(refs, s, offset), shape: `${s.start.toFixed(1)}→${s.end.toFixed(1)}`, clash: clash(want[i], s, refs, offset, chars.length === 1) };
  });
  return { per };
}

const vocab = loadVocab(unit);
const list = entries(vocab).filter(e => own(e, unit) && (!only || only.has(e.id)));
const refs = referenceTones();
const report = [];
let n = 0;
for (const e of list) {
  const file = clip(unit, e.id);
  const r = { id: e.id, hanzi: e.hanzi, jyutping: e.jyutping, problems: [], notes: [] };
  report.push(r);
  if (!existsSync(file)) { r.problems.push('no audio file'); continue; }
  let x;
  try { x = decode(file); } catch (err) { r.problems.push(`ffmpeg can't decode it: ${err.message.split('\n')[0]}`); continue; }
  const syllables = e.jyutping.split(' ').length;
  const b = basics(x, syllables);
  r.secs = +b.secs.toFixed(2);
  r.problems.push(...b.problems);

  const stt = await azure(file);
  r.heard = stt.NBest?.[0]?.Lexical?.replace(/ /g, '') ?? `(${stt.RecognitionStatus})`;
  r.heardJyutping = getJyutpingList(r.heard).map(([c, jp]) => jp ?? c).join(' ');
  if (hanziOf(r.heard) !== hanziOf(e.hanzi) && toneless(r.heardJyutping) !== toneless(e.jyutping)) {
    r.notes.push(`speech-to-text heard ${r.heard || 'nothing'} ${r.heardJyutping}`);
  }

  const t = await tones(file, x, e, refs);
  if (t.note) r.notes.push(t.note);
  r.tones = t.per;
  // Syllable timing and coarticulation make tones in a longer clip less
  // certain: a clash there is worth a listen, in a word it's a problem.
  const clashes = (t.per ?? []).filter(p => p.clash);
  if (clashes.length) (syllables > 3 ? r.notes : r.problems).push(`tone shape: ${clashes.map(p => `${p.char} tone ${p.want} ${p.clash} (measured ${p.shape})`).join('; ')}`);
  process.stderr.write(`\r${++n}/${list.length}`);
}
process.stderr.write('\n');

const tonesText = r => (r.tones ?? []).map(p => `${p.char}${p.want}${p.heard === p.want ? '' : `(~${p.heard})`}`).join(' ');
const flagged = report.filter(r => r.problems.length || r.notes.length);
for (const r of showAll ? report : flagged) {
  console.log(`${r.problems.length ? 'CHECK' : r.notes.length ? 'LISTEN' : 'ok'}  ${r.id}  ${r.hanzi} ${r.jyutping}  [${tonesText(r)}]`);
  for (const p of r.problems) console.log(`      problem: ${p}`);
  for (const p of r.notes) console.log(`      ${p}`);
}
const bad = report.filter(r => r.problems.length).length, listen = flagged.length - bad;
console.log(`\n${unit}: ${report.length} clips; ${bad} with problems, ${listen} worth a listen, ${report.length - flagged.length} ok.`);
console.log('Tones in [ ]: expected tone, (~n) where the nearest of the voice\'s own tones differs; a hint only.');
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(report, null, 1));
