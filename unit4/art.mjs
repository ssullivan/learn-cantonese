/*
 * Unit 4 illustrations: 0–10 as counters on a ten frame, two rows of five,
 * so 6 is a full row and one more. Run `node tools/draw.mjs` after editing
 * to rewrite img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';

const CELL = 24, X = 4, Y = 40;

const frame = `<rect x="${X}" y="${Y}" width="${5 * CELL}" height="${2 * CELL}" rx="5" fill="#fbf8f1" stroke="#6f8796" stroke-width="3"/>
<path d="${[1, 2, 3, 4].map(i => `M${X + i * CELL} ${Y} V${Y + 2 * CELL}`).join(' ')} M${X} ${Y + CELL} H${X + 5 * CELL}" stroke="#6f8796" stroke-width="2"/>`;

// The i-th counter fills the top row left to right, then the bottom row.
function counter(i) {
  const cx = X + (i % 5 + 0.5) * CELL, cy = Y + (Math.floor(i / 5) + 0.5) * CELL;
  return `<circle cx="${cx}" cy="${cy}" r="9.5" fill="#d6453a" stroke="#8e2a22" stroke-width="2"/>
<circle cx="${cx - 3}" cy="${cy - 3}" r="2.6" fill="#f2a097"/>`;
}

const count = n => svg(n === 0 ? '0: an empty ten frame' : `${n}: ${n} counter${n > 1 ? 's' : ''} on a ten frame`,
  `${frame}\n${Array.from({ length: n }, (_, i) => counter(i)).join('\n')}`);

export default Object.fromEntries(Array.from({ length: 11 }, (_, n) => [`n${n}`, count(n)]));
