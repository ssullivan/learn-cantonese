/*
 * Unit 14 illustrations. Body parts are drawn on a face (close up) or a
 * whole figure, with the part ringed in gold; an ache (頭痛) is the same
 * picture with the ring in red, "ouch" lines and a pained face. Symptoms,
 * the doctor and prescriptions (a box of pills for each time a day) are
 * built from the same parts. Run `node tools/draw.mjs` after editing to
 * rewrite img/<id>.svg.
 */
import { svg, face, figure, inBed, zzz, drop, puff } from '../tools/svg.mjs';
import { loadVocab } from '../tools/site.mjs';

const V = loadVocab('unit14');
const GOLD = '#e0a526', RED = '#d6453a';

// A ring around a part: gold to name it, red with ouch lines when it hurts.
function ring([x, y, r], pain) {
  const c = pain ? RED : GOLD;
  // Ouch: short strokes radiating from the ring, up and to each side.
  const ouch = pain ? `<path d="${[-150, -110, -70, -30].map(deg => {
    const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    return `M${(x + c * (r + 4)).toFixed(1)} ${(y + s * (r + 4)).toFixed(1)} L${(x + c * (r + 11)).toFixed(1)} ${(y + s * (r + 11)).toFixed(1)}`;
  }).join(' ')}" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>` : '';
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="3"/>${ouch}`;
}

// Where each part is: [x, y, ring radius] on the face or the figure.
const PART = {
  eye: ['face', [77, 58, 11]],
  ear: ['face', [98, 60, 13]],
  nose: ['face', [64, 66, 10]],
  mouth: ['face', [64, 83, 13]],
  tooth: ['face', [64, 83, 13], { mouth: 'open' }],
  throat: ['face', [64, 95, 11]],
  head: ['figure', [64, 20, 17]],
  hand: ['figure', [91, 73, 10]],
  foot: ['figure', [76, 114, 11]],
  stomach: ['figure', [64, 62, 13]],
  back: ['figure', [64, 52, 15], { behind: true }],
};
function part(id, pain) {
  const [view, at, opts = {}] = PART[id];
  const base = view === 'face'
    ? face({ ...opts, pained: pain, mouth: opts.mouth ?? (pain ? 'frown' : 'smile') })
    : figure({ ...opts, pained: pain });
  return `${base}\n${ring(at, pain)}`;
}

const capsule = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-9 -4.5 H0 V4.5 H-9 A4.5 4.5 0 0 1 -9 -4.5 Z" fill="${RED}" stroke="#8f2a22" stroke-width="1.5"/><path d="M0 -4.5 H9 A4.5 4.5 0 0 1 9 4.5 H0 Z" fill="#ffffff" stroke="#8f2a22" stroke-width="1.5"/></g>`;

// The doctor: a white coat, a stethoscope and a red cross.
const COAT = 'fill="#f7f7f5" stroke="#8a9aa5" stroke-width="2.5"';
const doctor = face({ coat: COAT, extra: `<path d="M56 101 L64 118 L72 101" stroke="#8a9aa5" stroke-width="2" fill="none"/>
<path d="M52 102 C44 116 50 124 60 122 M76 102 C84 114 82 122 76 124" stroke="#2e2e33" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<circle cx="76" cy="124" r="4" fill="#9aa3aa" stroke="#2e2e33" stroke-width="2"/>
<path d="M88 108 h8 M92 104 v8" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>` });

// A bottle of pills with two capsules beside it.
const medicine = `<rect x="34" y="30" width="44" height="12" rx="3" fill="#f7f7f5" stroke="#8a9aa5" stroke-width="2.5"/>
<path d="M38 42 H74 V104 Q74 110 68 110 H44 Q38 110 38 104 Z" fill="#e07a2c" stroke="#9a4a14" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="42" y="58" width="28" height="30" rx="3" fill="#ffffff" stroke="#9a4a14" stroke-width="1.5"/>
<path d="M50 73 h12 M56 67 v12" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/>
${capsule(98, 92)}${capsule(100, 108)}`;

// Resting: in bed, and zzz.
const rest = `${inBed}\n${zzz}`;

// A prescription: a box for each time a day, with that many pills in it.
function prescription(times, pills) {
  const w = 26, gap = 6, x0 = 64 - (times * w + (times - 1) * gap) / 2;
  return Array.from({ length: times }, (_, i) => {
    const x = x0 + i * (w + gap);
    const caps = Array.from({ length: pills }, (_, j) => capsule(x + w / 2, 64 + (j - (pills - 1) / 2) * 16)).join('');
    return `<rect x="${x}" y="34" width="${w}" height="60" rx="6" fill="#ffffff" stroke="#6f8796" stroke-width="2.5"/>${caps}`;
  }).join('\n');
}

const art = {
  body: svg('A person', figure()),
  'ji-sang': svg('A doctor', doctor),
  joek: svg('A bottle of pills', medicine),
  'jau-sik': svg('Resting in bed', rest),
  fever: svg('A fever: a thermometer in the mouth', face({ mouth: 'frown', pained: true, extra: `<circle cx="44" cy="72" r="6" fill="${RED}" opacity=".35"/><circle cx="84" cy="72" r="6" fill="${RED}" opacity=".35"/>
<path d="M66 84 L100 100" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/><path d="M66 84 L100 100" stroke="#8a9aa5" stroke-width="1.5" stroke-linecap="round" fill="none"/>
<circle cx="102" cy="101" r="4" fill="${RED}"/>${drop(100, 28, 1.2)}` })),
  cough: svg('Coughing', face({ mouth: 'ow', pained: true, extra: `${puff(92, 84, 5)}${puff(104, 78, 6)}${puff(112, 92, 5)}` })),
  'lau-nose-water': svg('A runny nose', face({ mouth: 'frown', pained: true, extra: `${drop(60, 72, 0.9)}${drop(69, 74, 1.1)}` })),
};
for (const id of Object.keys(PART)) art[id] = svg(V.body.find(e => e.id === id).english.replace(/;.*/, ''), part(id));
for (const e of V.aches) art[e.id] = svg(e.english[0].toUpperCase() + e.english.slice(1), part(e.part, true));
for (const e of V.rx) art[e.id] = svg(`${e.times} boxes of ${e.pills} pill${e.pills > 1 ? 's' : ''}`, prescription(e.times, e.pills));
export default art;
