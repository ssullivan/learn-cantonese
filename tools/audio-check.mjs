#!/usr/bin/env node
/*
 * audio-check.mjs — machine checks on generated clips, so a human listener
 * only needs to hear the doubtful ones. The checking is done by
 * audio-lang-tools, a separate repo (~/audio-lang-tools, or
 * $AUDIO_LANG_TOOLS; see its CLAUDE.md for setup); this is the site's
 * adapter. Not part of check.mjs.
 *
 *   node tools/audio-check.mjs unit9 [--only id,id] [--all] [--json out.json]
 *   node tools/audio-check.mjs --words out.json
 *       every unit's own words as [{ id, text, jyutping, plain }], for
 *       `altools bench make --words` (plain: made from its characters,
 *       with no phoneme, ssml, say or voice)
 *
 * Also a module: checkClip(unit, entry, voice, file?) checks one clip
 * (tts.mjs uses it to pick a good take from a voice that varies).
 *
 * For each clip, audio-lang-tools:
 *   1. decodes it (ffmpeg): broken, silent, clipped, too short or long
 *   2. transcribes it with Azure speech-to-text (no hint) and compares the
 *      syllables with the entry's jyutping, ignoring tone
 *   3. finds each syllable by forced alignment (MMS), tracks its pitch
 *      (CREPE), and gives the probability of each tone with a classifier
 *      trained on this voice. A clearly unlikely tone is CHECK, a doubtful
 *      one LISTEN. A voice it wasn't trained on (MiniMax) can't be judged
 *      on pitch height, so its doubts are only LISTEN.
 * Its benchmark (`altools bench score`) measures how often it is right.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, unitDirs, loadVocab, entries, own, langTools } from './site.mjs';

const clip = (u, id) => join(ROOT, u, 'audio', `${id}.mp3`);
const item = (e, voice, path) => ({ id: e.id, path, text: e.hanzi, jyutping: e.jyutping, voice });

// Check several clips at once (the models load once): [{ unit, entry,
// voice, file? }] → results { id, secs, heard, tones, problems: [...],
// notes: [...] }: problems are likely wrong, notes worth a listen.
export function checkClips(list) {
  return langTools(['check'], list.map(({ unit, entry, voice, file }) => item(entry, voice, file ?? clip(unit, entry.id))));
}

export async function checkClip(unit, e, voice, file) {
  return checkClips([{ unit, entry: e, voice, file }])[0];
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const flag = name => { const i = args.indexOf(name); return i < 0 ? null : args[i + 1]; };

  if (flag('--words')) {
    const words = unitDirs().filter(loadVocab).flatMap(u =>
      entries(loadVocab(u)).filter(e => own(e, u)).map(e => ({ id: `${u}/${e.id}`, text: e.hanzi, jyutping: e.jyutping,
        // plain: read from its characters, as the voice reads them by default
        plain: !(e.phoneme || e.ssml || e.say || e.voice) })));
    writeFileSync(flag('--words'), JSON.stringify(words));
    console.log(`${words.length} words`);
    process.exit(0);
  }

  const only = flag('--only') && new Set(flag('--only').split(','));
  const showAll = args.includes('--all');
  const jsonOut = flag('--json');
  const unit = args.find((a, i) => /^unit\d+$/.test(a) && !['--only', '--json'].includes(args[i - 1]));
  if (!unit) { console.error('usage: node tools/audio-check.mjs unit<N> [--only id,id] [--all] [--json out.json] | --words out.json'); process.exit(1); }

  const vocab = loadVocab(unit);
  const list = entries(vocab).filter(e => own(e, unit) && (!only || only.has(e.id)));
  const report = checkClips(list.map(entry => ({ unit, entry, voice: entry.voice ?? vocab.voice })));

  // 女2 when the tone is as expected; 媽4→1 when another is likelier; with
  // the expected tone's probability when it is in doubt.
  const tonesText = r => (r.tones ?? []).map(t => `${t.char}${t.want}${t.heard === t.want ? '' : `→${t.heard}`}${t.p < 0.5 ? ` (${t.p.toFixed(2)})` : ''}`).join(' ');
  const flagged = report.filter(r => r.problems.length || r.notes.length);
  for (const [i, r] of report.entries()) {
    if (!showAll && !flagged.includes(r)) continue;
    const e = list[i];
    console.log(`${r.problems.length ? 'CHECK' : r.notes.length ? 'LISTEN' : 'ok'}  ${r.id}  ${e.hanzi} ${e.jyutping}  [${tonesText(r)}]${r.calibrated === false ? '  (other voice: shape only)' : ''}`);
    for (const p of r.problems) console.log(`      problem: ${p}`);
    for (const p of r.notes) console.log(`      ${p}`);
  }
  const bad = report.filter(r => r.problems.length).length, listen = flagged.length - bad;
  console.log(`\n${unit}: ${report.length} clips; ${bad} with problems, ${listen} worth a listen, ${report.length - flagged.length} ok.`);
  const unheard = report.filter(r => r.words === false).length;
  if (unheard) console.log(`${unheard} clips had no word check: speech-to-text was unavailable (Azure quota?). Rerun later.`);
  if (jsonOut) writeFileSync(jsonOut, JSON.stringify(report, null, 1));
}
