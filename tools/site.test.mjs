#!/usr/bin/env node
/*
 * site.test.mjs — tests tools/site.mjs's retrying, with shouldRetryAzure (when
 * tts.mjs retries Azure), on made-up failures without waiting, and
 * clipMoves (how tts.mjs keeps a renamed word's audio). Run by
 * tools/check.mjs; exits 1 on failure.
 */
import { retrying, shouldRetryAzure, clipMoves } from './site.mjs';

let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };

// A request that fails with these statuses in turn, then succeeds.
async function run(statuses) {
  let calls = 0;
  const waits = [];
  const attempt = async () => {
    const status = statuses[calls++];
    if (status === undefined) return 'audio';
    throw Object.assign(new Error(`HTTP ${status}`), { status });
  };
  try {
    return { result: await retrying(attempt, shouldRetryAzure, async ms => { waits.push(ms); }), calls, waits };
  } catch (err) {
    return { error: err.message, calls, waits };
  }
}

{
  const r = await run([]);
  ok('a request that works is made once', r.result === 'audio' && r.calls === 1 && !r.waits.length);
}
{
  const r = await run([401, 401]);
  ok('401 from a burst is retried', r.result === 'audio' && r.calls === 3, JSON.stringify(r));
  ok('waits double each time', r.waits.join() === '2000,4000', r.waits.join());
}
{
  const r = await run([401, 401, 401, 401]);
  ok('a wrong key (401 every time) fails after 3 tries', r.error === 'HTTP 401' && r.calls === 3, JSON.stringify(r));
}
{
  const r = await run([429, 503, 500, 429, 502]);
  ok('busy or failing is retried up to 5 times', r.result === 'audio' && r.calls === 6, JSON.stringify(r));
  const gave = await run([500, 500, 500, 500, 500, 500, 500]);
  ok('and then fails', gave.error === 'HTTP 500' && gave.calls === 6, JSON.stringify(gave));
}
{
  const r = await run([400]);
  ok('a bad request (400) is not retried', r.error === 'HTTP 400' && r.calls === 1);
  const net = await retrying(async () => { throw new TypeError('fetch failed'); }, shouldRetryAzure, async () => {}).catch(e => e.message);
  ok('a network error (no status) is not retried', net === 'fetch failed');
}

{
  const r = clipMoves({ maan: 'h1', zo: 'h2', 'hou-zo': 'h3', gone: 'h4', same: 'h5' },
    { maan6: 'h1', zo2: 'h2', 'hou-zo2': 'h3', same: 'h5', fresh: 'h6' });
  ok('a renamed id takes its old clip', JSON.stringify(r.moves) === JSON.stringify([['maan', 'maan6'], ['zo', 'zo2'], ['hou-zo', 'hou-zo2']]), JSON.stringify(r.moves));
  ok('an id no longer wanted is dropped', r.dropped.join() === 'gone', r.dropped.join());
  const two = clipMoves({ a: 'h' }, { b: 'h', c: 'h' });
  ok('one old clip moves to one new id only', two.moves.length === 1 && !two.dropped.length, JSON.stringify(two));
  const changed = clipMoves({ a: 'h1' }, { a: 'h2' });
  ok('a changed clip neither moves nor drops', !changed.moves.length && !changed.dropped.length, JSON.stringify(changed));
}

if (fail) { console.log(`${fail} failed`); process.exit(1); }
if (!quiet) console.log('all passed');
