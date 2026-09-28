#!/usr/bin/env node
/*
 * review.mjs — AUDIO-REVIEW.md: every clip on the site in a table (unit,
 * Chinese, Jyutping, English, a link that plays it), for a native speaker
 * to listen through. Generated from the vocab: never edit it by hand.
 * tools/tts.mjs rewrites it after every run, and tools/check.mjs fails if
 * it is out of date. The review page (review/) shows the same rows, with
 * play buttons and marks.
 *
 *   node tools/review.mjs          rewrite AUDIO-REVIEW.md
 *
 *   reviewMarkdown()   the file's contents
 *   REVIEW_FILE        its path
 *   voiceName(entry, vocab)
 *                      short name of an entry's voice when it isn't the
 *                      unit's own ("WanLung", "MiniMax"), else ''
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, unitDirs, loadVocab, entries, own } from './site.mjs';

const SITE = 'https://ssullivan.github.io/learn-cantonese/';
export const REVIEW_FILE = join(ROOT, 'AUDIO-REVIEW.md');

export function voiceName(e, vocab) {
  const v = e.voice ?? vocab.voice;
  if (v === vocab.voice) return '';
  return v.startsWith('minimax:') ? 'MiniMax' : v.replace(/^zh-HK-|Neural$/g, '');
}

const cell = s => String(s).replace(/\|/g, '\\|');

export function reviewMarkdown() {
  const units = unitDirs().map(u => [u, loadVocab(u)]).filter(([, v]) => v);
  const count = units.reduce((n, [u, v]) => n + entries(v).filter(e => own(e, u)).length, 0);
  const out = [
    '# Audio review',
    '',
    `Every clip on the site (${count}), unit by unit. **Listen on the [review page](${SITE}review/)**, where you can mark each clip and copy your notes; the links below play one clip each.`,
    '',
    'Generated from each unit\'s `vocab.js` by `tools/review.mjs`: don\'t edit this file by hand.',
    '',
  ];
  for (const [u, vocab] of units) {
    const mine = entries(vocab).filter(e => own(e, u));
    out.push(`## Unit ${u.slice(4)}`, '', '| # | Chinese | Jyutping | English | Audio |', '|---|---|---|---|---|');
    mine.forEach((e, i) => {
      const voice = voiceName(e, vocab);
      out.push(`| ${i + 1} | ${cell(e.hanzi)} | ${cell(e.jyutping)} | ${cell(e.english)}${voice ? ` _(${voice} voice)_` : ''} | [▶ play](${SITE}${u}/audio/${e.id}.mp3) |`);
    });
    out.push('');
  }
  return out.join('\n');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  writeFileSync(REVIEW_FILE, reviewMarkdown());
  console.log('Wrote AUDIO-REVIEW.md');
}
