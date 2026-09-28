#!/usr/bin/env node
/*
 * check.mjs — sanity checks for the whole site. Exits 1 on any problem.
 *
 *   node tools/check.mjs          report problems
 *   node tools/check.mjs --fix    also rewrite ?v=<hash> cache stamps
 *
 * Checks:
 *   - every href/src in every .html is relative and points at a file
 *   - local .css/.js links carry ?v=<first 8 of sha1(file)>
 *   - every .js file compiles
 *   - each unit<N>/vocab.js: unique ids, tone numbers in jyutping,
 *     audio/<id>.mp3 for every entry, a drawing in art.mjs for every
 *     entry without img:false, and no orphan .mp3 files or drawings
 *   - a word borrowed with Units.word(n, ...) has its audio and picture
 *     checked in unit n, and every page that loads a borrowing vocab.js
 *     (its own, or another unit's, like the review page) loads
 *     shared/units.js and unit n's vocab.js before it
 *   - pages load shared/numbers.js before any vocab.js using Canto.number
 *   - an entry's measure word matches its picture (in its own unit if
 *     borrowed): a measure with dish "steamer" needs a steamer() drawing,
 *     "plate" a plate(), and so on; one without a dish, none of them
 *   - img/*.svg match art.mjs exactly (else run node tools/draw.mjs)
 *   - audio/check.json (audio-check's verdicts) names only vocab entries
 *   - AUDIO-REVIEW.md matches the vocab (else run node tools/review.mjs),
 *     and review/index.html loads every unit's vocab.js
 *   - every tools/*.test.mjs passes
 *   - no file holds the Azure Speech or MiniMax key (when set on this
 *     machine): keys must never be committed
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, extname } from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { ROOT, unitDirs, loadVocab, entries, own, loadArt, secrets } from './site.mjs';
const fix = process.argv.includes('--fix');
const problems = [];
const bad = (file, msg) => problems.push(`${relative(ROOT, file)}: ${msg}`);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === 'node_modules') continue;
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const stamp = file => createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 8);

// Links and cache stamps
let fixed = 0;
for (const html of files.filter(f => f.endsWith('.html'))) {
  const src = readFileSync(html, 'utf8');
  const out = src.replace(/\b(href|src)="([^"]*)"/g, (whole, attr, url) => {
    if (/^(https?:|mailto:|data:|#)/.test(url)) return whole;
    if (url.startsWith('/')) { bad(html, `absolute link ${url} (use a relative link)`); return whole; }
    const [path, query = ''] = url.split('#')[0].split('?');
    let target = join(dirname(html), path || '.');
    if (url.endsWith('/') || path === '' || (existsSync(target) && statSync(target).isDirectory())) target = join(target, 'index.html');
    if (!existsSync(target)) { bad(html, `broken link ${url}`); return whole; }
    if (!['.css', '.js'].includes(extname(target))) return whole;
    const want = stamp(target);
    if (query === `v=${want}`) return whole;
    if (fix) { fixed++; return `${attr}="${path}?v=${want}"`; }
    bad(html, `stale cache stamp on ${url} (want ?v=${want}; run with --fix)`);
    return whole;
  });
  if (out !== src) writeFileSync(html, out);
}

// API keys must never be in the repo. Checked against the keys on this
// machine, never printed.
const { azureKey, minimaxKey } = secrets();
for (const [name, secret] of [['Azure Speech', azureKey], ['MiniMax', minimaxKey]]) {
  if (!secret) continue;
  for (const file of files) {
    if (readFileSync(file).includes(secret)) bad(file, `contains the ${name} key: remove it, never commit it`);
  }
}

// JavaScript compiles
for (const js of files.filter(f => f.endsWith('.js'))) {
  try { new vm.Script(readFileSync(js, 'utf8'), { filename: js }); }
  catch (e) { bad(js, `syntax error: ${e.message}`); }
}

// Unit vocab and assets
for (const unit of unitDirs()) {
  const dir = join(ROOT, unit);
  const vocabFile = join(dir, 'vocab.js');
  let vocab, art;
  try { vocab = loadVocab(unit); } catch (e) { bad(vocabFile, e.message); continue; }
  try { art = (await loadArt(unit)) ?? {}; } catch (e) { bad(join(dir, 'art.mjs'), e.message); continue; }
  if (!vocab) continue;
  const all = entries(vocab);
  const ids = new Set();
  for (const e of all) {
    if (ids.has(e.id)) bad(vocabFile, `duplicate id ${e.id}`);
    ids.add(e.id);
    for (const f of ['id', 'hanzi', 'jyutping', 'english']) if (!e[f]) bad(vocabFile, `${e.id ?? '?'} is missing ${f}`);
    if (e.jyutping && !/^[a-z]+[1-6]( [a-z]+[1-6])*$/.test(e.jyutping)) bad(vocabFile, `${e.id}: jyutping "${e.jyutping}" needs a tone number on every syllable`);
    if (!own(e, unit)) continue;
    if (!existsSync(join(dir, 'audio', `${e.id}.mp3`))) bad(vocabFile, `${e.id} has no audio (run node tools/tts.mjs ${unit})`);
    if (e.img !== false && !art[e.id]) bad(vocabFile, `${e.id} has no drawing in art.mjs`);
  }
  const measures = Object.fromEntries((vocab.measures ?? []).map(m => [m.id, m]));
  for (const e of all.filter(e => e.measure)) {
    const m = measures[e.measure];
    if (!m) { bad(vocabFile, `${e.id}: unknown measure ${e.measure}`); continue; }
    const pic = own(e, unit) ? art[e.id] : (await loadArt(`unit${e.unit}`))?.[e.id];
    const dish = /data-dish="(\w+)"/.exec(pic ?? '')?.[1];
    if (dish !== m.dish) bad(vocabFile, `${e.id}: ordered by ${m.hanzi} (${m.dish}) but drawn on a ${dish ?? 'nothing'}`);
  }
  const withImg = new Set(all.filter(e => e.img !== false && own(e, unit)).map(e => e.id));
  for (const id of Object.keys(art)) {
    if (!withImg.has(id)) bad(join(dir, 'art.mjs'), `${id} has no vocab entry with a picture`);
    const svg = join(dir, 'img', `${id}.svg`);
    if (!existsSync(svg) || readFileSync(svg, 'utf8') !== art[id]) bad(svg, 'out of date (run node tools/draw.mjs)');
  }
  const list = sub => existsSync(join(dir, sub)) ? readdirSync(join(dir, sub)) : [];
  for (const f of list('audio')) if (f.endsWith('.mp3') && !ids.has(f.slice(0, -4))) bad(join(dir, 'audio', f), 'orphan (no vocab entry)');
  for (const f of list('img')) if (f.endsWith('.svg') && !art[f.slice(0, -4)]) bad(join(dir, 'img', f), 'orphan (not in art.mjs)');
  const verdicts = join(dir, 'audio', 'check.json');
  if (existsSync(verdicts)) {
    for (const id of Object.keys(JSON.parse(readFileSync(verdicts, 'utf8')))) if (!ids.has(id)) bad(verdicts, `${id} is not in vocab.js (rerun node tools/audio-check.mjs ${unit})`);
  }
}

// The review table, and the review page, which lists every unit's clips
{
  const page = join(ROOT, 'review/index.html');
  const html = existsSync(page) ? readFileSync(page, 'utf8') : '';
  for (const u of unitDirs().filter(u => existsSync(join(ROOT, u, 'vocab.js')))) {
    if (!html.includes(`src="../${u}/vocab.js`)) bad(page, `load ../${u}/vocab.js (the review page lists every unit)`);
  }
  const { reviewMarkdown, REVIEW_FILE } = await import('./review.mjs');
  if (!existsSync(REVIEW_FILE) || readFileSync(REVIEW_FILE, 'utf8') !== reviewMarkdown()) bad(REVIEW_FILE, 'out of date (run node tools/review.mjs)');
}

// Pages load shared/units.js before any vocab.js, the vocab of every unit a
// vocab.js borrows from before it, and shared/numbers.js before any vocab
// that uses Canto.number. This covers every vocab.js a page loads: its own,
// and other units' (the review page loads them all).
for (const html of files.filter(f => f.endsWith('.html'))) {
  const srcs = [...readFileSync(html, 'utf8').matchAll(/<script src="([^"?]+)/g)].map(m => m[1]);
  const at = src => srcs.indexOf(src);
  const vocabs = srcs.filter(s => /^(\.\.\/unit\d+\/)?vocab\.js$/.test(s));
  const unitsAt = srcs.findIndex(s => s.endsWith('shared/units.js'));
  const numbersAt = srcs.findIndex(s => s.endsWith('shared/numbers.js'));
  // The unit a vocab src belongs to, and the src another unit's vocab has here.
  const unitOf = v => v === 'vocab.js' ? relative(ROOT, dirname(html)) : v.split('/')[1];
  const srcFor = n => vocabs.find(v => unitOf(v) === `unit${n}`);
  for (const v of vocabs) {
    const src = readFileSync(join(dirname(html), v), 'utf8');
    if (unitsAt < 0 || unitsAt > at(v)) bad(html, `load ../shared/units.js before ${v}`);
    for (const n of new Set([...src.matchAll(/Units\.word\((\d+)/g)].map(m => m[1]))) {
      const need = srcFor(n);
      if (!need || at(need) > at(v)) bad(html, `${v} borrows from unit ${n}: load ../unit${n}/vocab.js before it`);
    }
    if (src.includes('Canto.number') && (numbersAt < 0 || numbersAt > at(v))) bad(html, `${v} uses Canto.number: load ../shared/numbers.js before it`);
  }
}

// Tests
for (const test of readdirSync(join(ROOT, 'tools')).filter(f => f.endsWith('.test.mjs'))) {
  const r = spawnSync(process.execPath, [join(ROOT, 'tools', test), '--quiet'], { encoding: 'utf8' });
  if (r.status !== 0) bad(join(ROOT, 'tools', test), `failed:\n${r.stdout}${r.stderr}`);
}

if (fixed) console.log(`Updated ${fixed} cache stamp(s).`);
if (problems.length) {
  console.log(problems.join('\n'));
  console.log(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log('All checks passed.');
