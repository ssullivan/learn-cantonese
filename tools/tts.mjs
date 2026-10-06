#!/usr/bin/env node
/*
 * tts.mjs — generate unit<N>/audio/<id>.mp3 from unit<N>/vocab.js with
 * Azure Speech (zh-HK neural voices), or MiniMax for a word whose voice
 * is 'minimax:<voice id>'.
 *
 *   node tools/tts.mjs [unit1 ...] [--force] [--only id,id]
 *
 *   node tools/tts.mjs words ...    the dictionary (words/words.js)
 *
 * With none given, the dictionary and every unit<N>/vocab.js are
 * processed. A clip is only regenerated when its voice or text changes
 * (tracked in audio/manifest.json), unless --force. A run without --only
 * also tidies every audio dir (whichever homes it makes clips for): an
 * entry renamed or moved (from a unit to the dictionary) takes its old
 * clip with the same text and voice, and its audio-check verdict, and
 * clips of entries that are gone are deleted (site.mjs clipMoves).
 *
 * Azure is the site's voice. MiniMax is only for the few words Azure
 * can't say (it reads 年 nin2 as nin4 whatever the SSML says): MiniMax is
 * told the jyutping of every syllable, but it varies from take to take
 * and sometimes adds a syllable, so up to TAKES takes are made and the
 * first that passes audio-check.mjs is kept (the best one, with a
 * warning, if none does).
 *
 * Afterwards it rewrites AUDIO-REVIEW.md (tools/review.mjs).
 *
 * Credentials: AZURE_SPEECH_KEY, AZURE_SPEECH_REGION and (for MiniMax)
 * MINIMAX_KEY from the environment, or from
 * ~/.config/learning-cantonese/config.env (read by site.mjs). Never commit
 * a key.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, homes, loadVocab, entries, own, clipMoves, azureConfig, minimaxConfig, retrying, shouldRetryAzure } from './site.mjs';

const FORMAT = 'audio-24khz-48kbitrate-mono-mp3';
// Every clip so far was made in this format, before the format counted
// in a clip's hash. It adds nothing to the hash, so those clips stay up to
// date; any other format is hashed, so changing FORMAT remakes every clip.
const FIRST_FORMAT = 'audio-24khz-48kbitrate-mono-mp3';

const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyIdx = args.indexOf('--only');
const only = onlyIdx >= 0 ? new Set(args[onlyIdx + 1].split(',')) : null;
const named = args.filter((a, i) => !a.startsWith('--') && (onlyIdx < 0 || i !== onlyIdx + 1));
const units = named.length ? named : homes().filter(loadVocab);
const unknown = named.filter(home => !homes().includes(home));
if (unknown.length) { console.error(`No such home: ${unknown.join(' ')} (words, or unit1 to ${homes().at(-1)})`); process.exit(1); }

const xml = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));

// phoneme: true reads the entry's jyutping exactly, as Azure sapi phones
// ("sei3 aa6" → "sei 3 aa 6"), for words the voice reads in the wrong tone.
// On an entry made of `words`, phoneme: [ids] reads only those words that
// way and the rest as text, so the phrase keeps its natural reading.
const phoneme = e => `<phoneme alphabet="sapi" ph="${e.jyutping.replace(/([a-z]+)([1-6])/g, '$1 $2')}">${xml(e.hanzi)}</phoneme>`;
const someWords = (e, byId) => e.words.map(id => e.phoneme.includes(id) ? phoneme(byId[id]) : xml(byId[id].say ?? byId[id].hanzi)).join('')
  + (e.hanzi.endsWith('？') ? '？' : '');

function ssmlFor(entry, voice, byId) {
  const body = entry.ssml ?? (Array.isArray(entry.phoneme) ? someWords(entry, byId)
    : entry.phoneme ? phoneme(entry) : xml(entry.say ?? entry.hanzi));
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-HK"><voice name="${voice}">${body}</voice></speak>`;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function synth({ key, region }, ssml) {
  return retrying(async () => {
    const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': FORMAT,
        'User-Agent': 'learn-cantonese-tts',
      },
      body: ssml,
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    throw Object.assign(new Error(`Azure TTS ${res.status}: ${await res.text()}`), { status: res.status });
  }, shouldRetryAzure);
}

// MiniMax: Cantonese with the jyutping of every syllable (without it the
// voice drifts to Mandarin tones: 時 rises).
const MINIMAX = 'minimax:', MINIMAX_MODEL = 'speech-2.8-hd', TAKES = 5;
const minimaxRequest = (entry, voiceId) => ({
  model: MINIMAX_MODEL, text: entry.hanzi, stream: false, language_boost: 'Chinese,Yue', output_format: 'hex',
  voice_setting: { voice_id: voiceId, speed: 1, vol: 1, pitch: 0 },
  pronunciation_dict: { tone: [`${entry.hanzi.replace(/[？！。，]/g, '')}/${entry.jyutping.split(' ').map(s => `(${s})`).join('')}`] },
  audio_setting: { sample_rate: 24000, bitrate: 64000, format: 'mp3', channel: 1 },
});

async function minimax({ key }, request) {
  return retrying(async () => {
    const res = await fetch('https://api.minimax.io/v1/t2a_v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(request),
    });
    const out = res.ok ? await res.json() : null;
    if (out?.base_resp?.status_code === 0) return Buffer.from(out.data.audio, 'hex');
    const msg = `MiniMax TTS ${res.status} ${out?.base_resp?.status_code ?? ''}: ${out?.base_resp?.status_msg ?? await res.text()}`;
    throw Object.assign(new Error(msg), { status: res.ok ? undefined : res.status });
  }, (error, failures) => (error.status === 429 || error.status >= 500) && failures < 5);
}

// Make MiniMax takes until one passes audio-check; keep the best.
async function minimaxTakes(unit, entry, voice, file) {
  const { checkClip } = await import('./audio-check.mjs');
  const request = minimaxRequest(entry, voice.slice(MINIMAX.length));
  let best = null;
  for (let take = 1; take <= TAKES; take++) {
    const audio = await minimax(mmCfg ??= minimaxConfig(), request);
    writeFileSync(file, audio);
    const r = await checkClip(unit, entry, voice);
    const issues = [...r.problems, ...r.notes];
    if (!issues.length) return { take };
    if (!best || issues.length < best.issues.length) best = { audio, issues, take };
  }
  writeFileSync(file, best.audio);
  return { take: best.take, issues: best.issues };
}

const readJson = path => existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null;
const writeJson = (path, value, indent) => writeFileSync(path, JSON.stringify(Object.fromEntries(Object.entries(value).sort()), null, indent) + '\n');

// Each home's clips: the entries whose audio is there, what to send for
// each, and its hash; with the manifest of the clips it has.
// Every home, so a clip moving between homes is found whichever is named.
const runs = homes().filter(loadVocab).map(home => {
  const vocab = loadVocab(home);
  const audioDir = join(ROOT, home, 'audio');
  mkdirSync(audioDir, { recursive: true });
  const manifestPath = join(audioDir, 'manifest.json');
  const byId = Object.fromEntries(entries(vocab).map(e => [e.id, e]));
  const clips = entries(vocab).filter(e => own(e, home)).map(entry => {
    const voice = entry.voice ?? vocab.voice;
    const viaMinimax = voice.startsWith(MINIMAX);
    const request = viaMinimax ? JSON.stringify(minimaxRequest(entry, voice.slice(MINIMAX.length))) : ssmlFor(entry, voice, byId);
    const hashed = viaMinimax || FORMAT === FIRST_FORMAT ? request : request + FORMAT;  // MiniMax's request has its format
    return { entry, voice, viaMinimax, request, hash: createHash('sha1').update(hashed).digest('hex').slice(0, 12) };
  });
  const manifest = readJson(manifestPath) ?? {};
  // Saved after every clip, so a run that fails partway keeps what it made.
  return { home, audioDir, clips, manifest, save: () => writeJson(manifestPath, manifest, 2) };
});

// Renamed or moved entries take their old clips, and gone entries lose
// theirs, with their audio-check verdicts (audio/check.json). Clips are
// named "<home>/<id>" here, so one can move between homes.
function tidy() {
  const byHome = Object.fromEntries(runs.map(r => [r.home, r]));
  const mp3 = name => { const [home, id] = name.split('/'); return join(byHome[home].audioDir, `${id}.mp3`); };
  const saved = {}, wanted = {};
  for (const { home, manifest, clips } of runs) {
    for (const [id, hash] of Object.entries(manifest)) {
      if (existsSync(mp3(`${home}/${id}`))) saved[`${home}/${id}`] = hash; else delete manifest[id];
    }
    for (const { entry, hash } of clips) wanted[`${home}/${entry.id}`] = hash;
  }
  const verdicts = Object.fromEntries(runs.map(r => [r.home, readJson(join(r.audioDir, 'check.json'))]));
  const take = name => {
    const [home, id] = name.split('/');
    const verdict = verdicts[home]?.[id];
    delete byHome[home].manifest[id];
    if (verdicts[home]) delete verdicts[home][id];
    return verdict;
  };
  const { moves, dropped } = clipMoves(saved, wanted);
  for (const name of dropped) {
    rmSync(mp3(name));
    take(name);
    console.log(`${name.replace('/', '/audio/')}.mp3  deleted (no entry)`);
  }
  // Through temporary names, so a clip can move to a name another is leaving.
  const moving = moves.map(([from, to]) => ({ from, to, hash: saved[from], verdict: take(from) }));
  for (const { from } of moving) renameSync(mp3(from), `${mp3(from)}.moving`);
  for (const { from, to, hash, verdict } of moving) {
    renameSync(`${mp3(from)}.moving`, mp3(to));
    const [home, id] = to.split('/');
    byHome[home].manifest[id] = hash;
    if (verdict) (verdicts[home] ??= {})[id] = verdict;
    console.log(`${from.replace('/', '/audio/')}.mp3 → ${to.replace('/', '/audio/')}.mp3`);
  }
  for (const r of runs) {
    r.save();
    if (verdicts[r.home]) writeJson(join(r.audioDir, 'check.json'), verdicts[r.home], 1);
  }
}

const cfg = azureConfig();
let mmCfg;
let made = 0, skipped = 0;

if (!only) tidy();

for (const { home, audioDir, clips, manifest, save } of runs.filter(r => units.includes(r.home))) {
  for (const { entry, voice, viaMinimax, request, hash } of clips) {
    if (only && !only.has(entry.id)) continue;
    const file = join(audioDir, `${entry.id}.mp3`);
    if (!force && manifest[entry.id] === hash && existsSync(file)) { skipped++; continue; }

    let how = '';
    if (viaMinimax) {
      const { take, issues } = await minimaxTakes(home, entry, voice, file);
      how = issues ? `  MiniMax take ${take} of ${TAKES}, none passed: ${issues.join('; ')}` : `  MiniMax take ${take} passed`;
    } else {
      writeFileSync(file, await synth(cfg, request));
    }
    manifest[entry.id] = hash;
    save();
    made++;
    console.log(`${home}/audio/${entry.id}.mp3  ${entry.hanzi}${how}`);
    await sleep(300);
  }
  save();
}

console.log(`${made} generated, ${skipped} unchanged.`);

// Keep the review table in step with the vocab.
const { reviewMarkdown, REVIEW_FILE } = await import('./review.mjs');
writeFileSync(REVIEW_FILE, reviewMarkdown());
