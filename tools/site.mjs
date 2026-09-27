/*
 * site.mjs — helpers shared by the tools/ scripts.
 *
 *   ROOT             repo root
 *   unitDirs()       ["unit1", ...] in number order
 *   loadVocab(unit)  unit<N>/vocab.js's window.VOCAB, or null if none
 *   entries(vocab)   every entry from every list, in file order
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
  const path = join(ROOT, unit, 'vocab.js');
  if (!existsSync(path)) return null;
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(path, 'utf8'), sandbox, { filename: path });
  return sandbox.window.VOCAB;
}

export const entries = vocab => Object.values(vocab).filter(Array.isArray).flat();

export async function loadArt(unit) {
  const path = join(ROOT, unit, 'art.mjs');
  return existsSync(path) ? (await import(pathToFileURL(path))).default : null;
}
