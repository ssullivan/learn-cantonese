#!/usr/bin/env node
/*
 * tts.mjs — generate unit<N>/audio/<id>.mp3 from unit<N>/vocab.js with
 * Azure Speech (zh-HK neural voices), or MiniMax for a word whose voice
 * is 'minimax:<voice id>'.
 *
 *   node tools/tts.mjs [unit1 ...] [--force] [--only id,id]
 *
 * With no units given, every unit<N>/vocab.js is processed. A clip is only
 * regenerated when its voice or text changes (tracked in
 * audio/manifest.json), unless --force.
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
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, unitDirs, loadVocab, entries, own, azureConfig, minimaxConfig } from './site.mjs';

const FORMAT = 'audio-24khz-48kbitrate-mono-mp3';

const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyIdx = args.indexOf('--only');
const only = onlyIdx >= 0 ? new Set(args[onlyIdx + 1].split(',')) : null;
let units = args.filter((a, i) => !a.startsWith('--') && (onlyIdx < 0 || i !== onlyIdx + 1));
if (!units.length) units = unitDirs().filter(loadVocab);

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
  for (let attempt = 0; ; attempt++) {
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
    if ((res.status === 429 || res.status >= 500) && attempt < 5) {
      await sleep(2000 * 2 ** attempt);
      continue;
    }
    throw new Error(`Azure TTS ${res.status}: ${await res.text()}`);
  }
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
  for (let attempt = 0; ; attempt++) {
    const res = await fetch('https://api.minimax.io/v1/t2a_v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(request),
    });
    const out = res.ok ? await res.json() : null;
    if (out?.base_resp?.status_code === 0) return Buffer.from(out.data.audio, 'hex');
    if ((!res.ok && (res.status === 429 || res.status >= 500)) && attempt < 5) {
      await sleep(2000 * 2 ** attempt);
      continue;
    }
    throw new Error(`MiniMax TTS ${res.status} ${out?.base_resp?.status_code ?? ''}: ${out?.base_resp?.status_msg ?? await res.text()}`);
  }
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

const cfg = azureConfig();
let mmCfg;
let made = 0, skipped = 0;

for (const unit of units) {
  const dir = join(ROOT, unit);
  const vocab = loadVocab(unit);
  const audioDir = join(dir, 'audio');
  mkdirSync(audioDir, { recursive: true });
  const manifestPath = join(audioDir, 'manifest.json');
  const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

  const byId = Object.fromEntries(entries(vocab).map(e => [e.id, e]));
  const mine = entries(vocab).filter(e => own(e, unit)); // borrowed words have audio in their own unit
  if (!only) for (const id of Object.keys(manifest)) if (!mine.some(e => e.id === id)) delete manifest[id];

  for (const entry of mine) {
    if (only && !only.has(entry.id)) continue;
    const voice = entry.voice ?? vocab.voice;
    const viaMinimax = voice.startsWith(MINIMAX);
    const request = viaMinimax ? JSON.stringify(minimaxRequest(entry, voice.slice(MINIMAX.length))) : ssmlFor(entry, voice, byId);
    const hash = createHash('sha1').update(request).digest('hex').slice(0, 12);
    const file = join(audioDir, `${entry.id}.mp3`);
    if (!force && manifest[entry.id] === hash && existsSync(file)) { skipped++; continue; }

    let how = '';
    if (viaMinimax) {
      const { take, issues } = await minimaxTakes(unit, entry, voice, file);
      how = issues ? `  MiniMax take ${take} of ${TAKES}, none passed: ${issues.join('; ')}` : `  MiniMax take ${take} passed`;
    } else {
      writeFileSync(file, await synth(cfg, request));
    }
    manifest[entry.id] = hash;
    made++;
    console.log(`${unit}/audio/${entry.id}.mp3  ${entry.hanzi}${how}`);
    await sleep(300);
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort());
  writeFileSync(manifestPath, JSON.stringify(sorted, null, 2) + '\n');
}

console.log(`${made} generated, ${skipped} unchanged.`);

// Keep the review table in step with the vocab.
const { reviewMarkdown, REVIEW_FILE } = await import('./review.mjs');
writeFileSync(REVIEW_FILE, reviewMarkdown());
