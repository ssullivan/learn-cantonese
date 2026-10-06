#!/usr/bin/env node
/*
 * check.mjs — sanity checks for the whole site. Exits 1 on any problem.
 *
 *   node tools/check.mjs          report problems
 *   node tools/check.mjs --fix    also rewrite ?v=<hash> cache stamps and
 *                                 pages' vocab scripts
 *
 * Checks:
 *   - every href/src in every .html is relative and points at a file
 *   - local .css/.js links carry ?v=<first 8 of sha1(file)>
 *   - every page links the favicon (favicon.svg, the bauhinia)
 *   - every page links back: a unit's learn pages and games to its unit
 *     page (./), unit pages and review pages to all units (../)
 *   - every .js file compiles
 *   - no site script copies a shared helper (Units.byId, ctx.words,
 *     Game.pic, Game.playOnReveal) instead of using it
 *   - every vocab entry has only the fields in tools/vocab-fields.mjs, each
 *     holding its kind of value, and the ids it names (words, reply,
 *     measure, tool...) are entries
 *   - each unit<N>/vocab.js: unique ids, tone numbers in jyutping,
 *     audio/<id>.mp3 for every entry, a drawing in art.mjs for every
 *     entry without img:false, and no orphan .mp3 files or drawings
 *   - a word borrowed with Units.word(n, ...) has its audio and picture
 *     checked in unit n
 *   - each word (an entry not made of `words`) is defined once on the
 *     site: no other unit has a word with its id, or with its hanzi,
 *     jyutping and voice (borrow it instead). Phrases need only be
 *     unique in their unit
 *   - the dictionary (words/words.js) is checked like a unit: audio,
 *     drawings, orphans. Each of its words is in the vocab of the unit
 *     that teaches it, and no unit uses one taught after it
 *   - every vocab group and entry id a unit's page scripts name (V.verbs,
 *     byId['dung'], ctx.words('a', 'b'), Units.word(9, 't0600')...; see
 *     tools/page-refs.mjs) is in the vocab the page loads
 *   - pages load vocab only between the vocab markers, where --fix writes
 *     shared/numbers.js (if needed), shared/units.js and every earlier
 *     unit's vocab.js and the page's own (every unit's on the review pages)
 *   - an entry's measure word matches its picture (in its own unit if
 *     borrowed): a measure with dish "steamer" needs a steamer() drawing,
 *     "plate" a plate(), and so on; one without a dish, none of them
 *   - img/*.svg match art.mjs exactly (else run node tools/draw.mjs)
 *   - audio/check.json (audio-check's verdicts) names only vocab entries
 *   - AUDIO-REVIEW.md matches the vocab (else run node tools/review.mjs)
 *   - characters to write (a unit's `write`; see tools/stroke-data.mjs):
 *     each is in one of the unit's words and taught by one unit only, has
 *     a stroke-order record in tools/strokes-hk.json that checked out
 *     against Hong Kong's standard (or a person confirmed), or is composed
 *     (tools/strokes-composed.mjs) from parts that did, adding up to its
 *     stroke count, and has an up to date strokes/<hex>.json (else run node tools/strokes.mjs); no orphan
 *     stroke files;
 *     a unit that teaches writing has sheet.html (shared/sheet.js) and
 *     write.html (shared/write.js), with cards for them on its page
 *   - every tools/*.test.mjs passes
 *   - no file git would commit (tracked, or untracked and not ignored,
 *     dotfiles included) holds the Azure Speech or MiniMax key (when set on
 *     this machine): keys must never be committed
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, extname } from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { ROOT, unitDirs, homes, homeOf, loadVocab, entries, own, loadArt, secrets } from './site.mjs';
import { inlineScripts, pageReferences } from './page-refs.mjs';
import { entryProblems } from './vocab-fields.mjs';
import { RECORDS, readRecords, recordProblem, strokeFile, meta, COMPOSED, composedProblem, composedMeta } from './stroke-data.mjs';
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

// Vocab scripts: written, not typed. A page that loads vocab has them
// between VOCAB_START and VOCAB_END: shared/numbers.js if any of them uses
// it, shared/units.js, the dictionary (words/words.js), then every earlier
// unit's vocab.js and its own (a
// unit's page), or every unit's (the review pages), as loadVocab loads them
// in Node. Every earlier unit, not only those a vocab.js borrows from, since
// page scripts borrow too (unit 15's planner uses unit 9's clocks).
const VOCAB_START = '<!-- vocab: written by node tools/check.mjs --fix -->';
const VOCAB_END = '<!-- /vocab -->';
const vocabUnits = unitDirs().filter(u => existsSync(join(ROOT, u, 'vocab.js')));
const DICTIONARY = 'words/words.js';
// The only Canto a vocab.js has is numbers.js's (loadVocab runs it, not core.js).
const usesNumbers = path => readFileSync(join(ROOT, path), 'utf8').includes('Canto.');
function vocabScripts(html) {
  const ownUnit = relative(ROOT, html).match(/^(unit\d+)\//)?.[1];
  const loaded = ownUnit ? [...vocabUnits.filter(u => +u.slice(4) < +ownUnit.slice(4)), ownUnit] : vocabUnits;
  const script = path => `<script src="${relative(dirname(html), join(ROOT, path))}?v=${stamp(join(ROOT, path))}"></script>`;
  const vocabs = [DICTIONARY, ...loaded.map(u => `${u}/vocab.js`)];
  return [
    VOCAB_START,
    ...(vocabs.some(usesNumbers) ? [script('shared/numbers.js')] : []),
    script('shared/units.js'),
    ...vocabs.map(script),
    VOCAB_END,
  ].join('\n');
}
let vocabBlocksWritten = 0;
for (const html of files.filter(f => f.endsWith('.html'))) {
  const source = readFileSync(html, 'utf8');
  const start = source.indexOf(VOCAB_START), end = source.indexOf(VOCAB_END);
  const outside = start < 0 ? source : source.slice(0, start) + source.slice(end + VOCAB_END.length);
  if (/<script src="[^"]*(vocab|units|numbers|words)\.js/.test(outside) && /<script src="[^"]*vocab\.js/.test(source)) {
    bad(html, `load vocab only between ${VOCAB_START} and ${VOCAB_END} (see unit7/trolley.html)`);
  }
  if (start < 0) continue;
  if (end < start) { bad(html, `${VOCAB_START} needs a ${VOCAB_END} after it`); continue; }
  const want = vocabScripts(html);
  if (source.slice(start, end + VOCAB_END.length) === want) continue;
  if (fix) { writeFileSync(html, source.slice(0, start) + want + source.slice(end + VOCAB_END.length)); vocabBlocksWritten++; }
  else bad(html, 'vocab scripts out of date (run node tools/check.mjs --fix)');
}

// Links and cache stamps
let fixed = 0;
for (const html of files.filter(f => f.endsWith('.html'))) {
  const src = readFileSync(html, 'utf8');
  const icon = relative(dirname(html), join(ROOT, 'favicon.svg'));
  if (!src.includes(`<link rel="icon" href="${icon}" type="image/svg+xml">`)) bad(html, `link the favicon: <link rel="icon" href="${icon}" type="image/svg+xml">`);
  const page = relative(ROOT, html), unit = page.match(/^unit(\d+)\/(?!index\.html$)/);
  const back = unit ? `<a class="back" href="./">← Unit ${unit[1]}</a>` : `<a class="back" href="../">← All units</a>`;
  if (page !== 'index.html' && !src.includes(back)) bad(html, `link back with ${back}`);
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
// machine, never printed, in every file git would commit: tracked, or
// untracked and not ignored (dotfiles too: a copied .env, which walk()
// skips).
const { azureKey, minimaxKey } = secrets();
const committable = (() => {
  const r = spawnSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { cwd: ROOT, encoding: 'utf8' });
  if (r.status !== 0) return files;
  return r.stdout.split('\0').filter(Boolean).map(f => join(ROOT, f)).filter(f => existsSync(f) && statSync(f).isFile());
})();
for (const [name, secret] of [['Azure Speech', azureKey], ['MiniMax', minimaxKey]]) {
  if (!secret) continue;
  for (const file of committable) {
    if (readFileSync(file).includes(secret)) bad(file, `contains the ${name} key: remove it, never commit it`);
  }
}

// JavaScript compiles
for (const js of files.filter(f => f.endsWith('.js'))) {
  try { new vm.Script(readFileSync(js, 'utf8'), { filename: js }); }
  catch (e) { bad(js, `syntax error: ${e.message}`); }
}

// Shared helpers, not copies of them, in the site's scripts (each defined
// once, in the file named).
const HELPER_COPIES = [
  [/Object\.fromEntries\([^;]*?\.map\(\s*(\w+)\s*=>\s*\[\s*\1\.id\s*,\s*\1\s*\]\s*\)\s*\)/, 'Units.byId(vocab)', 'shared/units.js'],
  [/ctx\.grid\(\s*\w+\.map\(\s*ctx\.entry\s*\)\s*\)/, 'ctx.words(...ids)', 'shared/learn.js'],
  [/<img src="\$\{(?:Canto\.)?imgSrc\((\w+)\)\}" alt="\$\{(?:Canto\.)?esc\(\1\.english\)\}">/, 'Game.pic(entry)', 'shared/game.js'],
  [/ctx\.reveal = \(\) => \{\s*\w+\??\.?\(\);\s*ctx\.play\(\w+\);\s*\}/, 'Game.playOnReveal(ctx, entry)', 'shared/game.js'],
];
for (const script of files.filter(f => f.endsWith('.js') && !f.includes(`${join(ROOT, 'tools')}/`))) {
  const source = readFileSync(script, 'utf8');
  for (const [pattern, helper, definedIn] of HELPER_COPIES) {
    if (join(ROOT, definedIn) !== script && pattern.test(source)) bad(script, `use ${helper} (${definedIn}) instead of a copy of it`);
  }
}

// Unit vocab and assets
const records = readRecords();
for (const [char, r] of Object.entries(records)) {
  const p = recordProblem(char, r);
  if (p) bad(RECORDS, `${char}: ${p}`);
}
const taughtIn = {};
const wordAt = {}, soundAt = {}; // a word's id, and its hanzi, jyutping and voice: where defined
const homeIdSets = {};
const homeIds = home => homeIdSets[home] ??= new Set(entries(loadVocab(home) ?? {}).map(e => e.id));
const listedBy = {}; // unit<n>: ids of the dictionary words its vocab has
for (const unit of homes()) {
  const dir = join(ROOT, unit);
  const dictionary = unit === 'words';
  const vocabFile = dictionary ? join(ROOT, DICTIONARY) : join(dir, 'vocab.js');
  let vocab, art;
  try { vocab = loadVocab(unit); } catch (e) { bad(vocabFile, e.message); continue; }
  try { art = (await loadArt(unit)) ?? {}; } catch (e) { bad(join(dir, 'art.mjs'), e.message); continue; }
  if (!vocab) continue;
  const all = entries(vocab);
  const ids = new Set();
  for (const e of all) {
    if (ids.has(e.id)) bad(vocabFile, `duplicate id ${e.id}`);
    ids.add(e.id);
  }
  for (const e of all) {
    // A borrowed entry's ids may be its home's (unit 18's 蘋果 keeps unit 5's measure).
    const isId = id => ids.has(id) || homeIds(homeOf(e, unit)).has(id) || homeIds('words').has(id);
    for (const p of entryProblems(e, isId)) bad(vocabFile, p);
    if (e.jyutping && !/^[a-z]+[1-6]( [a-z]+[1-6])*$/.test(e.jyutping)) bad(vocabFile, `${e.id}: jyutping "${e.jyutping}" needs a tone number on every syllable`);
    if (e.taught && !dictionary) {
      if (e.taught > +unit.slice(4)) bad(vocabFile, `${e.id} is taught in unit ${e.taught}, after this one`);
      (listedBy[unit] ??= new Set()).add(e.id);
    }
    if (!own(e, unit)) continue;
    if (!e.words) {
      const sound = `${e.hanzi} ${e.jyutping} ${e.voice ?? vocab.voice}`;
      if (wordAt[e.id]) bad(vocabFile, `${e.id}: ${wordAt[e.id]} has a word with this id (give the later one its tone number: maan6)`);
      else if (soundAt[sound]) bad(vocabFile, `${e.id}: ${e.hanzi} ${e.jyutping} is ${soundAt[sound]} (borrow it with Units.word)`);
      wordAt[e.id] ??= `${unit}`;
      soundAt[sound] ??= `${unit}'s ${e.id}`;
    }
    if (!existsSync(join(dir, 'audio', `${e.id}.mp3`))) bad(vocabFile, `${e.id} has no audio (run node tools/tts.mjs ${unit})`);
    if (e.img !== false && !art[e.id]) bad(vocabFile, `${e.id} has no drawing in ${dictionary ? `unit${e.taught}/` : ''}art.mjs`);
  }
  if (vocab.write !== undefined && typeof vocab.write !== 'string') bad(vocabFile, "write must be a string of characters: write: '一二三'");
  if (vocab.write) {
    for (const [page, what] of [['sheet.html', 'writing sheet'], ['write.html', 'Write It game']]) {
      if (!existsSync(join(dir, page))) bad(vocabFile, `write: the unit needs ${page}, its ${what} (see unit4/${page})`);
      else if (!readFileSync(join(dir, 'index.html'), 'utf8').includes(`href="${page}"`)) bad(join(dir, 'index.html'), `add a card for ${page} (the unit teaches writing)`);
    }
  }
  for (const char of typeof vocab.write === 'string' ? vocab.write : '') {
    if (!/\p{Script=Han}/u.test(char)) { bad(vocabFile, `write: ${char} is not a Chinese character`); continue; }
    if (!all.some(e => e.hanzi.includes(char))) bad(vocabFile, `write: ${char} is in none of the unit's words`);
    if (taughtIn[char]) bad(vocabFile, `write: ${char} is already taught in ${taughtIn[char]}`);
    taughtIn[char] ??= unit;
    const recipe = COMPOSED[char], r = records[char];
    const say = msg => bad(vocabFile, `write: ${char} ${msg}`);
    if (recipe) {
      const p = composedProblem(char, recipe, records);
      if (p) { say(`can't be composed: ${p}`); continue; }
    } else if (!r) { say('has no stroke-order record (run node tools/stroke-check.mjs)'); continue; }
    else if (r.verdict === 'differs') { say(`has ${r.strokes} strokes in Hong Kong, ${r.mmah} in the stroke data: it can't be taught from this data`); continue; }
    else if (r.verdict === 'missing') { say(`can't be checked against Hong Kong's standard (${r.note}); compose it from parts in tools/strokes-composed.mjs?`); continue; }
    else if (r.verdict === 'look' && !r.confirmed) say(`needs a person: compare its stroke order with EDB's animation (review/strokes.html), then run node tools/stroke-check.mjs --confirm ${char}`);
    const n = recipe ? recipe.strokes : r.strokes;
    const file = strokeFile(char);
    const data = existsSync(file) && JSON.parse(readFileSync(file, 'utf8'));
    const { strokes, medians, ...rest } = data || {};
    const want = recipe ? composedMeta(char, recipe, records) : meta(char, r);
    if (!data || strokes?.length !== n || medians?.length !== n || JSON.stringify(rest) !== JSON.stringify(want)) {
      bad(file, `${char}: missing or out of date (run node tools/strokes.mjs)`);
    }
  }
  const measures = Object.fromEntries((vocab.measures ?? []).map(m => [m.id, m]));
  // A word's measure is checked in each unit that uses it, against that unit's measures.
  for (const e of dictionary ? [] : all.filter(e => e.measure)) {
    const m = measures[e.measure];
    if (!m) { bad(vocabFile, `${e.id}: unknown measure ${e.measure}`); continue; }
    const pic = own(e, unit) ? art[e.id] : (await loadArt(homeOf(e, unit)))?.[e.id];
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
    for (const id of Object.keys(JSON.parse(readFileSync(verdicts, 'utf8')))) if (!ids.has(id)) bad(verdicts, `${id} is not in ${relative(ROOT, vocabFile)} (rerun node tools/audio-check.mjs ${unit})`);
  }
}
// Each dictionary word is in the vocab of the unit that teaches it.
for (const e of entries(loadVocab('words') ?? {})) {
  if (!listedBy[`unit${e.taught}`]?.has(e.id)) bad(join(ROOT, DICTIONARY), `${e.id}: taught in unit ${e.taught}, but unit${e.taught}/vocab.js doesn't list it (Words.get('${e.id}'))`);
}

// Names page scripts take from the vocab: a misspelt group or id is
// undefined in the browser, and fails only on the step or level using it.
{
  const vocabs = {};
  const vocabOf = unit => vocabs[unit] ??= (() => {
    try { const v = loadVocab(unit); return v && { v, ids: new Set(entries(v).map(e => e.id)) }; } catch { return null; }
  })();
  for (const unit of unitDirs()) {
    const own = vocabOf(unit);
    if (!own) continue;
    const n = +unit.slice(4);
    for (const name of readdirSync(join(ROOT, unit))) {
      const file = join(ROOT, unit, name);
      const scripts = name.endsWith('.js') && name !== 'vocab.js' ? [{ source: readFileSync(file, 'utf8'), line: 1 }]
        : name.endsWith('.html') ? inlineScripts(readFileSync(file, 'utf8')) : [];
      for (const script of scripts) {
        for (const ref of pageReferences(script.source)) {
          const at = `line ${script.line + ref.line - 1}`;
          if (ref.kind === 'group' && !(ref.name in own.v)) bad(file, `${at}: V.${ref.name} is not in ${unit}/vocab.js`);
          if (ref.kind === 'id' && !own.ids.has(ref.name)) bad(file, `${at}: no entry ${ref.name} in ${unit}'s vocab`);
          if (ref.kind === 'word') {
            if (ref.unit > n) bad(file, `${at}: Units.word(${ref.unit}, ...) borrows from a later unit`);
            else if (!vocabOf(`unit${ref.unit}`)?.ids.has(ref.name)) bad(file, `${at}: unit ${ref.unit} has no word ${ref.name}`);
          }
        }
      }
    }
  }
}

// Stroke files for characters no unit teaches
for (const f of existsSync(join(ROOT, 'strokes')) ? readdirSync(join(ROOT, 'strokes')) : []) {
  if (f.endsWith('.json') && !taughtIn[String.fromCodePoint(parseInt(f, 16))]) bad(join(ROOT, 'strokes', f), 'orphan (no unit teaches it: not in any write)');
}

// The review pages list every unit (their vocab scripts are written above)
for (const page of ['review/index.html', 'review/strokes.html']) {
  if (!readFileSync(join(ROOT, page), 'utf8').includes(VOCAB_START)) bad(join(ROOT, page), `load every unit's vocab: add ${VOCAB_START} and ${VOCAB_END}`);
}

// The review table
{
  const { reviewMarkdown, REVIEW_FILE } = await import('./review.mjs');
  if (!existsSync(REVIEW_FILE) || readFileSync(REVIEW_FILE, 'utf8') !== reviewMarkdown()) bad(REVIEW_FILE, 'out of date (run node tools/review.mjs)');
}

// Tests
for (const test of readdirSync(join(ROOT, 'tools')).filter(f => f.endsWith('.test.mjs'))) {
  const r = spawnSync(process.execPath, [join(ROOT, 'tools', test), '--quiet'], { encoding: 'utf8' });
  if (r.status !== 0) bad(join(ROOT, 'tools', test), `failed:\n${r.stdout}${r.stderr}`);
}

if (vocabBlocksWritten) console.log(`Wrote the vocab scripts of ${vocabBlocksWritten} page(s).`);
if (fixed) console.log(`Updated ${fixed} cache stamp(s).`);
if (problems.length) {
  console.log(problems.join('\n'));
  console.log(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log('All checks passed.');
