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
 *   - img/*.svg match art.mjs exactly (else run node tools/draw.mjs)
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, extname } from 'node:path';
import vm from 'node:vm';
import { ROOT, unitDirs, loadVocab, entries, loadArt } from './site.mjs';
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
    if (!existsSync(join(dir, 'audio', `${e.id}.mp3`))) bad(vocabFile, `${e.id} has no audio (run node tools/tts.mjs ${unit})`);
    if (e.img !== false && !art[e.id]) bad(vocabFile, `${e.id} has no drawing in art.mjs`);
  }
  const withImg = new Set(all.filter(e => e.img !== false).map(e => e.id));
  for (const id of Object.keys(art)) {
    if (!withImg.has(id)) bad(join(dir, 'art.mjs'), `${id} has no vocab entry with a picture`);
    const svg = join(dir, 'img', `${id}.svg`);
    if (!existsSync(svg) || readFileSync(svg, 'utf8') !== art[id]) bad(svg, 'out of date (run node tools/draw.mjs)');
  }
  const list = sub => existsSync(join(dir, sub)) ? readdirSync(join(dir, sub)) : [];
  for (const f of list('audio')) if (f.endsWith('.mp3') && !ids.has(f.slice(0, -4))) bad(join(dir, 'audio', f), 'orphan (no vocab entry)');
  for (const f of list('img')) if (f.endsWith('.svg') && !art[f.slice(0, -4)]) bad(join(dir, 'img', f), 'orphan (not in art.mjs)');
}

if (fixed) console.log(`Updated ${fixed} cache stamp(s).`);
if (problems.length) {
  console.log(problems.join('\n'));
  console.log(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log('All checks passed.');
