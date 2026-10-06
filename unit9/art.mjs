/*
 * Unit 9 illustrations: a clock for every time in vocab.js (entries with
 * h and m), drawn by the clock in words/art.mjs (unit 9's section, with 鐘).
 * Run `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { loadVocab, entries } from '../tools/site.mjs';
import { unit9 } from '../words/art.mjs';

const { clock } = unit9;

const art = {};
for (const e of entries(loadVocab('unit9')).filter(e => e.h)) art[e.id] = clock(e.h, e.m);
export default art;
