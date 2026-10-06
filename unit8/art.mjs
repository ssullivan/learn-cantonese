/*
 * Unit 8 illustrations: every drink as served in vocab.js, hot in a cup
 * (with steam) or iced in a glass (with ice cubes), by drink() in
 * words/art.mjs (unit 8's section, which draws the drinks themselves hot).
 * Run `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { loadVocab } from '../tools/site.mjs';
import { unit8 } from '../words/art.mjs';

const { drink } = unit8;

const art = {};
for (const e of loadVocab('unit8').served) art[e.id] = drink(e.drink, e.temp === 'dung');
export default art;
