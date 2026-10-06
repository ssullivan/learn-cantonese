/*
 * Unit 14 illustrations. Body parts are drawn on a face (close up) or a
 * whole figure, with the part ringed in gold; an ache (頭痛) is the same
 * picture with the ring in red, "ouch" lines and a pained face. Symptoms,
 * the doctor and prescriptions (a box of pills for each time a day) are
 * built from the same parts, which are in words/art.mjs (unit 14's
 * section, with the body parts). Run `node tools/draw.mjs` after editing
 * to rewrite img/<id>.svg.
 */
import { svg, face, drop } from '../tools/svg.mjs';
import { loadVocab } from '../tools/site.mjs';
import { unit14 } from '../words/art.mjs';

const V = loadVocab('unit14');
const { part, prescription } = unit14;

const art = {
  'lau-nose-water': svg('A runny nose', face({ mouth: 'frown', pained: true, extra: `${drop(60, 72, 0.9)}${drop(69, 74, 1.1)}` })),
};
for (const e of V.aches) art[e.id] = svg(e.english[0].toUpperCase() + e.english.slice(1), part(e.part, true));
for (const e of V.rx) art[e.id] = svg(`${e.times} boxes of ${e.pills} pill${e.pills > 1 ? 's' : ''}`, prescription(e.times, e.pills));
export default art;
