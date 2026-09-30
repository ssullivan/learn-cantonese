#!/usr/bin/env node
/*
 * strokes.mjs — write strokes/<hex>.json for every character a unit
 * teaches to write (the `write` string in its vocab.js): Make Me a
 * Hanzi's stroke shapes put in the Hong Kong order from
 * tools/strokes-hk.json (see tools/stroke-data.mjs).
 *
 *   node tools/strokes.mjs [--force]
 *
 * Only characters whose record changed are fetched again (--force: all).
 * A character without an ok or look record stops it: run
 * tools/stroke-check.mjs first. Never edit strokes/*.json by hand;
 * tools/check.mjs fails if they are out of date.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { readRecords, drawable, taught, strokeFile, meta, build, fetchRaw } from './stroke-data.mjs';

const force = process.argv.includes('--force');
const records = readRecords();
const stuck = [];
let wrote = 0;
for (const { unit, char } of taught()) {
  const r = records[char];
  if (!drawable(r)) { stuck.push(`${unit} ${char}: ${r ? `${r.verdict}${r.note ? ` (${r.note})` : ''}` : 'no record (run node tools/stroke-check.mjs)'}`); continue; }
  const file = strokeFile(char);
  if (!force && existsSync(file)) {
    const { strokes, medians, ...old } = JSON.parse(readFileSync(file, 'utf8'));
    if (JSON.stringify(old) === JSON.stringify(meta(char, r))) continue;
  }
  const raw = await fetchRaw(char);
  if (!raw) { stuck.push(`${unit} ${char}: no Make Me a Hanzi data`); continue; }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(build(char, raw, r)) + '\n');
  wrote++;
}
console.log(`Wrote ${wrote} stroke file(s).`);
if (stuck.length) {
  console.log(`Can't draw:\n  ${stuck.join('\n  ')}`);
  process.exit(1);
}
