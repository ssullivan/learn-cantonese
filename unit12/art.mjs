/*
 * Unit 12 illustrations: a paint swatch for every colour, a standing
 * figure (打扮), and the clothes. Each garment is drawn in the figure's
 * own coordinates, so it fits the figure; its picture is that drawing
 * centred on the entry's fit (cx, cy) and enlarged fit.s times. Dress Up
 * puts the pictures back on the figure with the same numbers. Run
 * `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';
import { loadVocab, entries } from '../tools/site.mjs';

const V = loadVocab('unit12');
const byId = Object.fromEntries(entries(V).map(e => [e.id, e]));
const SKIN = 'fill="#f2c9a0" stroke="#b07a52" stroke-width="1.5"';
const UNDER = 'fill="#dfe4e8" stroke="#8a9aa5" stroke-width="1.5"';

// The figure, facing us: head at 64, 20, shoulders at y 34, hips at 72,
// feet at 116.
const figure = `<ellipse cx="64" cy="122" rx="26" ry="4" fill="#9fb0bb" opacity=".35"/>
<path d="M48 36 L40 70 L45 71 L53 44 Z M80 36 L88 70 L83 71 L75 44 Z" ${SKIN} stroke-linejoin="round"/>
<circle cx="42" cy="72" r="4" ${SKIN}/><circle cx="86" cy="72" r="4" ${SKIN}/>
<path d="M52 82 H62 V114 H52 Z M66 82 H76 V114 H66 Z" ${SKIN}/>
<path d="M47 120 C47 114 52 113 55 113 H61 V120 Z M81 120 C81 114 76 113 73 113 H67 V120 Z" ${SKIN}/>
<rect x="60" y="28" width="8" height="7" ${SKIN}/>
<path d="M54 33 Q64 37 74 33 L80 36 L78 72 H50 L48 36 Z" ${UNDER} stroke-linejoin="round"/>
<path d="M50 70 H78 V84 H66 L64 78 L62 84 H50 Z" ${UNDER} stroke-linejoin="round"/>
<circle cx="64" cy="20" r="10" ${SKIN}/>
<path d="M54 19 C53 9 60 7 64 7 C70 7 75 10 74 19 C71 13 58 12 54 19 Z" fill="#3b2f2a"/>
<circle cx="60" cy="21" r="1.2" fill="#3b2f2a"/><circle cx="68" cy="21" r="1.2" fill="#3b2f2a"/>
<path d="M61 25 Q64 27 67 25" stroke="#b07a52" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;

// Garments in figure coordinates, in colour `f` with outline `l`.
const edge = l => `stroke="${l}" stroke-width="1.5" stroke-linejoin="round"`;
const GARMENT = {
  hat: (f, l) => `<path d="M53 14 C53 2 75 2 75 14 Z" fill="${f}" ${edge(l)}/>
<path d="M52 14 H84 Q86 18 81 18 H52 Z" fill="${f}" ${edge(l)}/>
<circle cx="64" cy="4" r="1.8" fill="${l}"/>`,
  shirt: (f, l) => `<path d="M55 32 Q64 38 73 32 L88 39 L84 50 L78 47 V74 H50 V47 L44 50 L40 39 Z" fill="${f}" ${edge(l)}/>
<path d="M57 33 Q64 38 71 33" stroke="${l}" stroke-width="1.5" fill="none"/>`,
  coat: (f, l) => `<path d="M55 32 Q64 36 73 32 L84 36 L90 70 H82 L78 50 V82 H50 V50 L46 70 H38 L44 36 Z" fill="${f}" ${edge(l)}/>
<path d="M64 36 V82 M55 32 L60 44 L64 36 L68 44 L73 32" stroke="${l}" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
<circle cx="61" cy="54" r="1.3" fill="${l}"/><circle cx="61" cy="64" r="1.3" fill="${l}"/><circle cx="61" cy="74" r="1.3" fill="${l}"/>`,
  trousers: (f, l) => `<path d="M50 70 H78 L78 112 H66.5 L64 82 L61.5 112 H50 Z" fill="${f}" ${edge(l)}/>`,
  skirt: (f, l) => `<path d="M51 70 H77 L85 98 H43 Z" fill="${f}" ${edge(l)}/>
<path d="M58 72 L55 97 M70 72 L73 97" stroke="${l}" stroke-width="1" fill="none" opacity=".6"/>`,
  shoes: (f, l) => `<path d="M46 121 C46 114 52 111 56 111 H62 V121 Z M82 121 C82 114 76 111 72 111 H66 V121 Z" fill="${f}" ${edge(l)}/>
<path d="M46 121 H62 M66 121 H82" stroke="${l}" stroke-width="2.5"/>`,
  glasses: (f, l) => `<circle cx="59" cy="20" r="4.2" fill="#bfe0f2" fill-opacity=".5" stroke="${f}" stroke-width="1.6"/>
<circle cx="69" cy="20" r="4.2" fill="#bfe0f2" fill-opacity=".5" stroke="${f}" stroke-width="1.6"/>
<path d="M63.2 20 H64.8 M54.8 19 L52 18 M73.2 19 L76 18" stroke="${f}" stroke-width="1.6" stroke-linecap="round"/>`,
};
const alone = ({ cx, cy, s }, body) => `<g transform="translate(64 64) scale(${s}) translate(${-cx} ${-cy})">\n${body}\n</g>`;

// A paint swatch.
const swatch = ({ fill, line }) => `<path d="M30 30 C44 14 84 16 100 30 C114 42 110 70 102 86 C94 104 70 112 50 104 C28 96 18 76 20 58 C21 46 24 38 30 30 Z" fill="${fill}" stroke="${line}" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 38 C48 30 62 28 70 30" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".45"/>`;

const PLAIN = { hat: 'laam', coat: 'fe', skirt: 'fan-hung', glasses: 'hak' };
const art = {
  'ngaan-sik': svg('A palette of colours', `<path d="M64 14 C98 14 118 36 118 62 C118 84 102 92 90 88 C80 85 76 92 80 100 C84 110 76 116 64 116 C34 116 10 94 10 64 C10 36 32 14 64 14 Z" fill="#f4e6c8" stroke="#9c6528" stroke-width="3" stroke-linejoin="round"/>
${[['hung', 34, 50], ['wong', 52, 32], ['luk', 76, 30], ['laam', 96, 46], ['zi', 98, 66], ['fan-hung', 30, 74], ['hak', 50, 94]]
    .map(([id, x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${byId[id].fill}" stroke="${byId[id].line}" stroke-width="2"/>`).join('\n')}`),
  'daa-baan': svg('A person, ready to dress', figure),
};
for (const c of V.colours) art[c.id] = svg(`A splash of ${c.english}`, swatch(c));
const FIT = Object.fromEntries(V.coloured.map(e => [e.garment, e.fit]));
FIT.glasses = { cx: 64, cy: 20, s: 4.5 };
for (const [id, c] of Object.entries(PLAIN)) {
  art[id] = svg(byId[id].english.replace(/;.*/, ''), alone(FIT[id], GARMENT[id](byId[c].fill, byId[c].line)));
}
for (const e of V.coloured) {
  const c = byId[e.colour];
  art[e.id] = svg(e.english[0].toUpperCase() + e.english.slice(1), alone(e.fit, GARMENT[e.garment](c.fill, c.line)));
}
export default art;
