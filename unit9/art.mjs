/*
 * Unit 9 illustrations: a clock for every time in vocab.js (entries with
 * h and m), and for 鐘. Run `node tools/draw.mjs` after editing to
 * rewrite img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';
import { loadVocab, entries } from '../tools/site.mjs';

const C = 64, CY = 60, R = 50;
const at = (deg, r) => {
  const a = (deg * Math.PI) / 180;
  return [(C + r * Math.sin(a)).toFixed(1), (CY - r * Math.cos(a)).toFixed(1)];
};
const hand = (deg, r, width, color) => {
  const [x, y] = at(deg, r);
  return `<line x1="${C}" y1="${CY}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
};

// A round clock face with numerals 1–12, showing h:m. The hour hand moves
// on between the hours with the minutes.
function clock(h, m, title = `Clock showing ${h}:${String(m).padStart(2, '0')}`) {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const big = i % 5 === 0;
    const [x1, y1] = at(i * 6, big ? 40 : 43), [x2, y2] = at(i * 6, 45);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${big ? '#2e5a88' : '#9fb0bb'}" stroke-width="${big ? 3 : 1.5}" stroke-linecap="round"/>`;
  }).join('\n');
  const numerals = Array.from({ length: 12 }, (_, i) => {
    const [x, y] = at((i + 1) * 30, 32);
    return `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700" fill="#26323c" text-anchor="middle" dominant-baseline="central">${i + 1}</text>`;
  }).join('\n');
  return svg(title, `<ellipse cx="64" cy="118" rx="34" ry="4" fill="#9fb0bb" opacity=".35"/>
<circle cx="${C}" cy="${CY}" r="${R}" fill="#fbf8f1" stroke="#2e5a88" stroke-width="5"/>
${ticks}
${numerals}
${hand(((h % 12) + m / 60) * 30, 22, 6, '#26323c')}
${hand(m * 6, 38, 3.5, '#26323c')}
<circle cx="${C}" cy="${CY}" r="4.5" fill="#d0453c"/>`);
}

const art = { zung: clock(10, 10, 'Clock') };
for (const e of entries(loadVocab('unit9')).filter(e => e.h)) art[e.id] = clock(e.h, e.m);
export default art;
