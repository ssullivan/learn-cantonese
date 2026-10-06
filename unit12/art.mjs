/*
 * Unit 12 illustrations: the clothes in each colour (紅色嘅衫), drawn by
 * unit 12's section of words/art.mjs, with the swatches, the figure (打扮)
 * and the plain clothes. Each garment is drawn in the figure's
 * own coordinates, so it fits the figure; its picture is that drawing
 * centred on the entry's fit (cx, cy) and enlarged fit.s times. Dress Up
 * puts the pictures back on the figure with the same numbers. Run
 * `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';
import { loadVocab } from '../tools/site.mjs';
import { unit12 } from '../words/art.mjs';

const V = loadVocab('unit12');
const { byId, alone, GARMENT } = unit12;

const art = {};
for (const e of V.coloured) {
  const c = byId[e.colour];
  art[e.id] = svg(e.english[0].toUpperCase() + e.english.slice(1), alone(e.fit, GARMENT[e.garment](c.fill, c.line)));
}
export default art;
