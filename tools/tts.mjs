#!/usr/bin/env node
/*
 * tts.mjs — generate unit<N>/audio/<id>.mp3 from unit<N>/vocab.js with
 * Azure Speech (zh-HK neural voices).
 *
 *   node tools/tts.mjs [unit1 ...] [--force] [--only id,id]
 *
 * With no units given, every unit<N>/vocab.js is processed. A clip is only
 * regenerated when its voice or text changes (tracked in
 * audio/manifest.json), unless --force.
 *
 * Credentials: AZURE_SPEECH_KEY and AZURE_SPEECH_REGION from the
 * environment, or from ~/.config/learning-cantonese/config.env. Never
 * commit the key.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { ROOT, unitDirs, loadVocab, entries, own } from './site.mjs';

const CONFIG = join(homedir(), '.config/learning-cantonese/config.env');
const FORMAT = 'audio-24khz-48kbitrate-mono-mp3';

const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyIdx = args.indexOf('--only');
const only = onlyIdx >= 0 ? new Set(args[onlyIdx + 1].split(',')) : null;
let units = args.filter((a, i) => !a.startsWith('--') && (onlyIdx < 0 || i !== onlyIdx + 1));
if (!units.length) units = unitDirs().filter(loadVocab);

function loadConfig() {
  if (existsSync(CONFIG)) {
    for (const line of readFileSync(CONFIG, 'utf8').split('\n')) {
      const m = line.match(/^\s*(?:export\s+)?([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  }
  const { AZURE_SPEECH_KEY: key, AZURE_SPEECH_REGION: region } = process.env;
  if (!key || !region) {
    console.error(`Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION (env or ${CONFIG}).`);
    process.exit(1);
  }
  return { key, region };
}

const xml = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));

// phoneme: true reads the entry's jyutping exactly, as Azure sapi phones
// ("sei3 aa6" → "sei 3 aa 6"), for words the voice reads in the wrong tone.
const phoneme = e => `<phoneme alphabet="sapi" ph="${e.jyutping.replace(/([a-z]+)([1-6])/g, '$1 $2')}">${xml(e.hanzi)}</phoneme>`;

function ssmlFor(entry, voice) {
  const body = entry.ssml ?? (entry.phoneme ? phoneme(entry) : xml(entry.say ?? entry.hanzi));
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

const cfg = loadConfig();
let made = 0, skipped = 0;

for (const unit of units) {
  const dir = join(ROOT, unit);
  const vocab = loadVocab(unit);
  const audioDir = join(dir, 'audio');
  mkdirSync(audioDir, { recursive: true });
  const manifestPath = join(audioDir, 'manifest.json');
  const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

  const mine = entries(vocab).filter(e => own(e, unit)); // borrowed words have audio in their own unit
  if (!only) for (const id of Object.keys(manifest)) if (!mine.some(e => e.id === id)) delete manifest[id];

  for (const entry of mine) {
    if (only && !only.has(entry.id)) continue;
    const voice = entry.voice ?? vocab.voice;
    const ssml = ssmlFor(entry, voice);
    const hash = createHash('sha1').update(ssml).digest('hex').slice(0, 12);
    const file = join(audioDir, `${entry.id}.mp3`);
    if (!force && manifest[entry.id] === hash && existsSync(file)) { skipped++; continue; }

    writeFileSync(file, await synth(cfg, ssml));
    manifest[entry.id] = hash;
    made++;
    console.log(`${unit}/audio/${entry.id}.mp3  ${entry.hanzi}`);
    await sleep(300);
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort());
  writeFileSync(manifestPath, JSON.stringify(sorted, null, 2) + '\n');
}

console.log(`${made} generated, ${skipped} unchanged.`);
