/*
 * Unit 14 illustrations. Body parts are drawn on a face (close up) or a
 * whole figure, with the part ringed in gold; an ache (頭痛) is the same
 * picture with the ring in red, "ouch" lines and a pained face. Symptoms,
 * the doctor and prescriptions (a box of pills for each time a day) are
 * built from the same parts. Run `node tools/draw.mjs` after editing to
 * rewrite img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';
import { loadVocab } from '../tools/site.mjs';

const V = loadVocab('unit14');
const SKIN = 'fill="#f2c9a0" stroke="#b07a52" stroke-width="2"';
const HAIR = '#3b2f2a';
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

// A face, close up, with shoulders in `coat` (a shirt unless given).
// mouth: smile, frown, open (teeth showing), ow (a small round O).
const MOUTH = {
  smile: '<path d="M55 81 Q64 88 73 81" stroke="#8f2a22" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  frown: '<path d="M55 85 Q64 79 73 85" stroke="#8f2a22" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  open: '<path d="M53 79 Q64 76 75 79 Q72 92 64 92 Q56 92 53 79 Z" fill="#8f2a22" stroke="#6e1f19" stroke-width="1.5"/><path d="M55 79.5 Q64 77.5 73 79.5 V83 H55 Z" fill="#ffffff"/><path d="M61 78.5 V83 M67 78.5 V83" stroke="#c9d3da" stroke-width="1"/>',
  ow: '<ellipse cx="64" cy="84" rx="5" ry="6" fill="#8f2a22" stroke="#6e1f19" stroke-width="1.5"/>',
};
const SHIRT = 'fill="#3f7cc0" stroke="#24507f" stroke-width="2.5"';
function face({ mouth = 'smile', pained = false, coat = null, extra = '' } = {}) {
  const brows = pained ? 'M44 46 L57 50 M84 46 L71 50' : 'M44 48 Q51 45 58 48 M70 48 Q77 45 84 48';
  return `<path d="M20 128 C20 108 40 100 64 100 C88 100 108 108 108 128 Z" ${coat ?? SHIRT} stroke-linejoin="round"/>
<rect x="54" y="84" width="20" height="20" ${SKIN}/>
<ellipse cx="30" cy="60" rx="7" ry="10" ${SKIN}/><ellipse cx="98" cy="60" rx="7" ry="10" ${SKIN}/>
<ellipse cx="64" cy="58" rx="33" ry="36" ${SKIN}/>
<path d="M31 56 C27 22 50 16 64 16 C80 16 101 22 97 56 C92 36 78 30 64 31 C50 31 37 38 31 56 Z" fill="${HAIR}"/>
<path d="${brows}" stroke="${HAIR}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<ellipse cx="51" cy="58" rx="6" ry="4.5" fill="#ffffff" stroke="#8a9aa5" stroke-width="1"/><ellipse cx="77" cy="58" rx="6" ry="4.5" fill="#ffffff" stroke="#8a9aa5" stroke-width="1"/>
<circle cx="51" cy="58" r="2.6" fill="${HAIR}"/><circle cx="77" cy="58" r="2.6" fill="${HAIR}"/>
<path d="M64 60 Q59 70 63 72 Q66 73 68 71" stroke="#b07a52" stroke-width="2" fill="none" stroke-linecap="round"/>
${MOUTH[mouth]}
${extra}`;
}

// A whole figure, facing us (or from behind), in a blue top and trousers.
function figure({ behind = false, pained = false } = {}) {
  const head = behind
    ? `<circle cx="64" cy="20" r="12" ${SKIN}/><path d="M52 21 C51 8 58 7 64 7 C71 7 77 9 76 21 C76 27 72 30 64 30 C56 30 52 27 52 21 Z" fill="${HAIR}"/>`
    : `<circle cx="64" cy="20" r="12" ${SKIN}/><path d="M53 18 C52 8 59 7 64 7 C70 7 76 9 75 18 C72 12 58 11 53 18 Z" fill="${HAIR}"/>
<circle cx="60" cy="20" r="1.4" fill="${HAIR}"/><circle cx="68" cy="20" r="1.4" fill="${HAIR}"/>
${pained ? '<path d="M56 15 L61 17 M72 15 L67 17" stroke="#3b2f2a" stroke-width="1.5" stroke-linecap="round"/><path d="M60 27 Q64 24 68 27"' : '<path d="M60 25 Q64 28 68 25"'} stroke="#8f2a22" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  return `<ellipse cx="64" cy="120" rx="30" ry="4" fill="#9fb0bb" opacity=".35"/>
<path d="M50 38 L38 70 M78 38 L90 70" stroke="#f2c9a0" stroke-width="8" stroke-linecap="round"/>
<circle cx="37" cy="73" r="5" ${SKIN}/><circle cx="91" cy="73" r="5" ${SKIN}/>
<path d="M48 76 H80 L79 112 H67 L64 88 L61 112 H49 Z" fill="#5f6a72" stroke="#3a4148" stroke-width="2" stroke-linejoin="round"/>
<path d="M44 117 C44 111 49 110 52 110 H61 V117 Z M84 117 C84 111 79 110 76 110 H67 V117 Z" fill="#3b2f2a" stroke="#1d1714" stroke-width="1.5"/>
<path d="M50 33 H78 L84 42 L78 46 L81 78 H47 L50 46 L44 42 Z" ${SHIRT} stroke-linejoin="round"/>
<rect x="60" y="29" width="8" height="5" ${SKIN}/>
${head}`;
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

const drop = (x, y, s = 1) => `<path d="M${x} ${y} C${x + 4 * s} ${y + 6 * s} ${x + 4 * s} ${y + 10 * s} ${x} ${y + 10 * s} C${x - 4 * s} ${y + 10 * s} ${x - 4 * s} ${y + 6 * s} ${x} ${y} Z" fill="#7fb2e0" stroke="#3f7cc0" stroke-width="1.5"/>`;
const puff = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="#8a9aa5" stroke-width="2"/>`;
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

// Resting: in bed, head on the pillow, and zzz.
const rest = `<path d="M10 70 V112 M118 86 V112" stroke="#9c6528" stroke-width="6" stroke-linecap="round"/>
<rect x="10" y="88" width="108" height="14" rx="3" fill="#c98a4a" stroke="#9c6528" stroke-width="2"/>
<rect x="16" y="68" width="30" height="16" rx="7" fill="#ffffff" stroke="#8a9aa5" stroke-width="2"/>
<circle cx="34" cy="66" r="11" ${SKIN}/><path d="M24 64 C24 54 34 52 40 56 C36 58 30 58 24 64 Z" fill="${HAIR}"/>
<path d="M30 68 q3 2 6 0" stroke="${HAIR}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<path d="M42 70 C60 62 100 64 114 76 V90 H42 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M54 24 h10 l-10 12 h10 M74 12 h8 l-8 10 h8 M90 30 h6 l-6 8 h6" stroke="#6f8796" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

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
