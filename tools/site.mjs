/*
 * site.mjs — helpers shared by the tools/ scripts.
 *
 *   ROOT             repo root
 *   unitDirs()       ["unit1", ...] in number order
 *   loadVocab(unit)  unit<N>/vocab.js's vocab, or null if none. Runs
 *                    shared/units.js, shared/numbers.js and every earlier
 *                    unit's vocab.js first, as a page would, so
 *                    Units.word() and Canto.number() work
 *   entries(vocab)   every entry from every list, in file order
 *   own(entry, unit) true unless the entry is borrowed from another unit
 *   loadArt(unit)    unit<N>/art.mjs's { id: svg }, or null if none
 *   azureConfig()    { key, region } for Azure Speech, from the environment
 *                    or ~/.config/learning-cantonese/config.env; exits if
 *                    missing (tts.mjs, audio-check.mjs)
 *   minimaxConfig()  { key } for MiniMax (MINIMAX_KEY), the same way (tts.mjs)
 *   secrets()        { azureKey, azureRegion, minimaxKey }, undefined when
 *                    not set, without exiting (check.mjs, to make sure no
 *                    file holds a key)
 *   langTools(args, input)
 *                    runs audio-lang-tools' `altools <args>` (the separate
 *                    repo at $AUDIO_LANG_TOOLS or ~/audio-lang-tools, with
 *                    uv) with `input` as JSON on stdin and the Azure key in
 *                    its environment; returns its JSON output (audio-check.mjs)
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
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
  run(join(ROOT, 'shared/numbers.js'));
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

const CONFIG = join(homedir(), '.config/learning-cantonese/config.env');

// Keys from the environment, or from CONFIG (never from the repo), or
// undefined when not set.
export function secrets() {
  if (existsSync(CONFIG)) {
    for (const line of readFileSync(CONFIG, 'utf8').split('\n')) {
      const m = line.match(/^\s*(?:export\s+)?([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  }
  const env = process.env;
  return { azureKey: env.AZURE_SPEECH_KEY, azureRegion: env.AZURE_SPEECH_REGION, minimaxKey: env.MINIMAX_API_KEY || env.MINIMAX_KEY };
}

export function azureConfig() {
  const { azureKey: key, azureRegion: region } = secrets();
  if (!key || !region) {
    console.error(`Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION (env or ${CONFIG}).`);
    process.exit(1);
  }
  return { key, region };
}

export function minimaxConfig() {
  const { minimaxKey: key } = secrets();
  if (!key) {
    console.error(`Set MINIMAX_KEY (env or ${CONFIG}).`);
    process.exit(1);
  }
  return { key };
}

export function langTools(args, input) {
  const dir = process.env.AUDIO_LANG_TOOLS ?? join(homedir(), 'audio-lang-tools');
  if (!existsSync(join(dir, 'pyproject.toml'))) {
    console.error(`audio-lang-tools not found at ${dir}: clone it there or set AUDIO_LANG_TOOLS.`);
    process.exit(1);
  }
  const { key, region } = azureConfig();
  const r = spawnSync('uv', ['run', '--quiet', '--project', dir, 'altools', ...args], {
    input: JSON.stringify(input), encoding: 'utf8', maxBuffer: 1e9,
    stdio: ['pipe', 'pipe', 'inherit'],
    env: { ...process.env, AZURE_SPEECH_KEY: key, AZURE_SPEECH_REGION: region },
  });
  if (r.status !== 0) {
    console.error(`altools ${args.join(' ')} failed (${r.error?.message ?? `exit ${r.status}`})`);
    process.exit(1);
  }
  return JSON.parse(r.stdout);
}
