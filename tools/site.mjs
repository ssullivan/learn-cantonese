/*
 * site.mjs — helpers shared by the tools/ scripts.
 *
 *   ROOT             repo root
 *   unitDirs()       ["unit1", ...] in number order
 *   loadVocab(unit)  unit<N>/vocab.js's vocab, or null if none. Runs
 *                    shared/units.js and every earlier unit's vocab.js
 *                    first, as a page would, so Units.word() works
 *   entries(vocab)   every entry from every list, in file order
 *   own(entry, unit) true unless the entry is borrowed from another unit
 *   loadArt(unit)    unit<N>/art.mjs's { id: svg }, or null if none
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const unitDirs = () => readdirSync(ROOT)
  .filter(d => /^unit\d+$/.test(d))
  .sort((a, b) => a.slice(4) - b.slice(4));

export function loadVocab(unit) {
  const vocabPath = u => join(ROOT, u, 'vocab.js');
  if (!existsSync(vocabPath(unit))) return null;
  const sandbox = vm.createContext({});
  sandbox.window = sandbox;
  const run = path => vm.runInContext(readFileSync(path, 'utf8'), sandbox, { filename: path });
  run(join(ROOT, 'shared/units.js'));
  const n = +unit.slice(4);
  for (const u of unitDirs().filter(u => u.slice(4) < n && existsSync(vocabPath(u)))) run(vocabPath(u));
  run(vocabPath(unit));
  return sandbox.UNITS[n];
}

export const entries = vocab => Object.values(vocab).filter(Array.isArray).flat();

export const own = (entry, unit) => !entry.unit || `unit${entry.unit}` === unit;

export async function loadArt(unit) {
  const path = join(ROOT, unit, 'art.mjs');
  return existsSync(path) ? (await import(pathToFileURL(path))).default : null;
}
