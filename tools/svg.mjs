/*
 * svg.mjs — shared pieces for the illustrations in unit<N>/art.mjs.
 * Every drawing is 128×128, transparent, fixed colors (works on light
 * and dark pages).
 *
 *   svg(title, body)   complete SVG file; `title` is read by screen readers
 *
 * People (unit 3's pronouns, unit 10's family trees):
 *   person(x, y, shirt, s = 1, look?)
 *                      a person from the chest up, head centred on x, y,
 *                      scaled by s. `shirt`: a SHIRT colour name, or null
 *                      for a grey bystander. Without `look`, short dark
 *                      hair when coloured and none when grey. `look`:
 *                      { hair: 'short' | 'long' | 'bun' | 'none', old } draws
 *                      that hair (white when old) on grey people too
 *   SHIRT              { red, blue, green, gold } shirt colours
 *   LINE               stroke attributes for outlines
 *   arrow(x, y)        gold arrow pointing down at x, y (marks who is meant)
 *   bubble             speech bubble in the top-left corner
 *   floor              a line along the bottom
 *
 * Food:
 *   steamer(food)      bamboo steamer with `food` sitting inside it
 *   plate(food, { cy, rx, ry })   white plate with `food` on top
 *   teapot(), teacup() blue-and-white Chinese teapot (spout at the right,
 *                      around 110,46) and a small cup at 104,108
 *   bowl(food)         blue-and-white rice bowl filled with `food`
 *                      (drawn inside the rim, around y 56–64)
 *   cup(drink, { glass })  a handleless blue-and-white teacup (rim at
 *                      y 46), or a tall glass (rim at y 18), filled with
 *                      the color `drink`
 * Faces, figures and places (unit 10's house, unit 14's body, unit 15's day,
 * unit 17's feelings):
 *   face({ mouth, eyes, brows, pained, coat, extra })
 *                      a face close up with shoulders, filling the picture
 *                      (eyes at 51,58 and 77,58, mouth at 64,83, chin at
 *                      94). mouth: smile, frown, open (teeth showing), ow,
 *                      grin, flat, wavy, teeth (clenched); eyes: open,
 *                      wide, half (heavy lids), closed, happy (curved up);
 *                      brows: calm, angry, worried, up; pained: angry
 *                      brows; coat: fill and stroke attributes for the
 *                      shoulders (a blue top unless given); extra: drawn on top
 *   figure({ behind, pained })
 *                      a whole person facing us (or from behind), head at
 *                      64,20, hands at 37,73 and 91,73, feet at y 117
 *   inBed              a bed across the lower half, someone lying in it
 *                      with their head on the pillow at the left (34,66)
 *   zzz                zzz rising above the middle
 *   drop(x, y, s = 1)  a drop of water, its tip at x, y, 10·s tall
 *   puff(x, y, r)      a white puff: a cough, a bubble, foam
 *   house              a house with a red roof, the door at 54–76, 80–116
 *   shadow(cx, cy, rx) a soft shadow on the ground
 *   walker(x, y, { flip, bag })
 *                      a small person walking right (left when flip), feet
 *                      at x, y, head at y − 50; bag: 'work' (a briefcase),
 *                      'school' (a backpack) or none
 * Transport (unit 1's car, unit 5's plane, unit 11's taxi and airport):
 *   car                a red car side on, wheels on y 92, roof at y 38
 *   plane              a plane climbing to the right, across the middle
 *
 *   pineappleBun       a pineapple bun with its crackly top, about 48
 *                      wide, centred on 0,0 (place it with a transform)
 *
 * steamer(), plate(), bowl() and cup() tag their output data-dish so
 * tools/check.mjs can match the picture to the dish's measure word.
 */

export const svg = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" role="img">
<title>${title}</title>
${body}
</svg>
`;

const SKIN = '#f2c9a0', SKIN_LINE = '#b07a52';
const GREY = 'fill="#c9d3da" stroke="#8a9aa5"';
export const SHIRT = { red: '#d6453a', blue: '#3f7cc0', green: '#3a9a6e', gold: '#e0a526' };
export const LINE = 'stroke-width="2.5" stroke-linejoin="round"';

// Hair, drawn over the head (front) and, for long hair and buns, behind it.
const HAIR = {
  short: { front: 'M-11 -2 C-12 -14 -4 -17 0 -17 C8 -17 12 -12 11 -2 C8 -9 -6 -10 -11 -2 Z' },
  long: { back: 'M-13 -2 C-14 -18 14 -18 13 -2 L15 20 C6 24 -6 24 -15 20 Z',
    front: 'M-12 -1 C-12 -14 -4 -17 0 -17 C8 -17 12 -14 12 -1 C8 -10 -6 -11 -12 -1 Z' },
  bun: { back: 'M-6 -19 A7 6 0 1 1 6 -19 A7 6 0 1 1 -6 -19 Z',
    front: 'M-11 -1 C-12 -14 -4 -16 0 -16 C8 -16 12 -14 11 -1 C8 -9 -6 -10 -11 -1 Z' },
};
const hairColour = (shirt, old) => !shirt ? '#8a9aa5' : old ? '#e4e7ea" stroke="#9aa5ad" stroke-width="1.5' : '#3b2f2a';

export function person(x, y, shirt, s = 1, look) {
  const body = shirt ? `fill="${SHIRT[shirt]}" stroke="#4a3a33"` : GREY;
  const head = shirt ? `fill="${SKIN}" stroke="${SKIN_LINE}"` : GREY;
  const hair = (look ? HAIR[look.hair] : shirt && HAIR.short) ?? {};
  const fill = look ? hairColour(shirt, look.old) : '#3b2f2a';
  return `<g transform="translate(${x} ${y}) scale(${s})">
<path d="M-17 44 V30 C-17 20 -10 16 0 16 C10 16 17 20 17 30 V44 Z" ${body} ${LINE}/>
${hair.back ? `<path d="${hair.back}" fill="${fill}"/>\n` : ''}<circle r="12" ${head} ${LINE}/>
${hair.front ? `<path d="${hair.front}" fill="${fill}"/>` : ''}
</g>`;
}

export const arrow = (x, y) => `<path d="M${x - 7} ${y - 10} H${x + 7} L${x} ${y} Z" fill="#e0a526" stroke="#9a6c0e" stroke-width="1.5" stroke-linejoin="round"/>`;
export const bubble = `<path d="M6 8 H44 Q50 8 50 14 V26 Q50 32 44 32 H26 L18 40 L20 32 H6 Q0 32 0 26 V14 Q0 8 6 8 Z" fill="#ffffff" stroke="#6f8796" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M10 17 H40 M10 24 H32" stroke="#9fb0bb" stroke-width="3" stroke-linecap="round"/>`;
export const floor = '<path d="M4 124 H124" stroke="#9fb0bb" stroke-width="3" stroke-linecap="round"/>';

export const steamer = food => `<g data-dish="steamer">
<ellipse cx="64" cy="74" rx="52" ry="15" fill="#9c6528" stroke="#7d4f1e" stroke-width="2"/>
<ellipse cx="64" cy="75" rx="45" ry="11" fill="#f1e3bd"/>
${food}
<path d="M12 74 A52 15 0 0 0 116 74 L112 104 A48 13 0 0 1 16 104 Z" fill="#dcaa5e" stroke="#7d4f1e" stroke-width="2" stroke-linejoin="round"/>
<path d="M14 90 A50 14 0 0 0 114 90" fill="none" stroke="#b07a35" stroke-width="2"/>
<path d="M13 76 A51 15 0 0 0 115 76" fill="none" stroke="#f2cf8a" stroke-width="2.5"/>
</g>`;

export const plate = (food, { cy = 88, rx = 56, ry = 20 } = {}) => `<g data-dish="plate">
<ellipse cx="64" cy="${cy + 3}" rx="${rx}" ry="${ry}" fill="#9fb0bb" opacity=".35"/>
<ellipse cx="64" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ffffff" stroke="#9fb0bb" stroke-width="2"/>
<ellipse cx="64" cy="${cy}" rx="${rx - 11}" ry="${ry - 5}" fill="#eef3f6"/>
${food}
</g>`;

export const bowl = food => `<g data-dish="bowl">
<ellipse cx="64" cy="112" rx="24" ry="5" fill="#9fb0bb" opacity=".35"/>
<path d="M14 60 C16 92 38 108 64 108 C90 108 112 92 114 60 Z" fill="#fbf8f1" stroke="#2e5a88" stroke-width="3" stroke-linejoin="round"/>
<path d="M24 82 q10 -7 20 0 t20 0 t20 0 t20 0" stroke="#6f9bc6" stroke-width="2.5" fill="none"/>
<path d="M50 107 L52 114 H76 L78 107" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="64" cy="60" rx="50" ry="13" fill="#fbf8f1" stroke="#2e5a88" stroke-width="3"/>
${food}
</g>`;

export const cup = (drink, { glass = false } = {}) => glass ? `<g data-dish="cup">
<ellipse cx="64" cy="114" rx="28" ry="5" fill="#9fb0bb" opacity=".35"/>
<path d="M36 44 L42 110 C42 114 86 114 86 110 L92 44 Z" fill="${drink}" opacity=".85"/>
<ellipse cx="64" cy="44" rx="28" ry="6" fill="#ffffff" opacity=".35"/>
<path d="M32 18 L40 110 C40 116 88 116 88 110 L96 18" fill="none" stroke="#6f8796" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="64" cy="18" rx="32" ry="7" fill="none" stroke="#6f8796" stroke-width="3"/>
<path d="M46 56 L50 100" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".7"/>
</g>` : `<g data-dish="cup">
<ellipse cx="64" cy="112" rx="30" ry="5" fill="#9fb0bb" opacity=".35"/>
<path d="M44 100 L46 112 H82 L84 100 Z" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M22 46 C24 80 40 104 64 106 C88 104 104 80 106 46 Z" fill="#fbf8f1" stroke="#2e5a88" stroke-width="3" stroke-linejoin="round"/>
<path d="M30 70 q9 -7 17 0 t17 0 t17 0 t17 0" stroke="#2e5a88" stroke-width="2.5" fill="none"/>
<path d="M40 88 q6 -5 12 0 t12 0 t12 0 t12 0" stroke="#6f9bc6" stroke-width="2" fill="none"/>
<ellipse cx="64" cy="46" rx="42" ry="10" fill="#fbf8f1" stroke="#2e5a88" stroke-width="3"/>
<ellipse cx="64" cy="48" rx="36" ry="7" fill="${drink}"/>
</g>`;

export const teapot = () => `<path d="M22 66 C6 66 6 94 26 92" stroke="#2e5a88" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M88 76 C100 74 104 60 110 46 L118 48 C112 66 106 84 90 92 Z" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="56" cy="80" rx="36" ry="28" fill="#fbf8f1" stroke="#2e5a88" stroke-width="3"/>
<path d="M22 78 q8 -8 17 0 t17 0 t17 0 t17 0" stroke="#2e5a88" stroke-width="2.5" fill="none"/>
<path d="M28 90 q7 -6 14 0 t14 0 t14 0 t14 0" stroke="#6f9bc6" stroke-width="2" fill="none"/>
<ellipse cx="56" cy="54" rx="22" ry="6" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2.5"/>
<circle cx="56" cy="46" r="5" fill="#2e5a88"/>`;

export const teacup = () => `<path d="M92 100 L96 116 Q104 120 112 116 L116 100 Z" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="104" cy="100" rx="12" ry="3.5" fill="#c8913a" stroke="#2e5a88" stroke-width="2"/>`;

export const pineappleBun = `<path d="M-24 6 C-26 -8 -14 -20 0 -20 C14 -20 26 -8 24 6 C12 11 -12 11 -24 6Z" fill="#f2cf86" stroke="#b9802c" stroke-width="1.5"/>
<path d="M-23 0 C-24 -10 -13 -20 0 -20 C13 -20 24 -10 23 0 C12 4 -12 4 -23 0Z" fill="#e9ab45"/>
<path d="M-20 -6 L-16 -12 L-8 -6 L-12 1 M-8 -6 L0 -12 L6 -4 L0 3 M6 -4 L14 -12 L19 -6 M6 -4 L15 1 M-8 -6 L-2 -1 M0 -12 L-2 -19 M14 -12 L11 -18 M-16 -12 L-12 -17" stroke="#c07a22" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M-12 -15 Q-4 -19 4 -18" stroke="#f7d27f" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;

export const car = `<ellipse cx="64" cy="104" rx="52" ry="5" fill="#9fb0bb" opacity=".35"/>
<path d="M12 92 V72 C12 66 16 62 24 62 L36 60 L48 42 C50 40 52 38 56 38 H86 C90 38 92 40 94 42 L106 60 C114 62 118 66 118 72 V92 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M44 60 L54 44 H68 V60 Z M74 44 H86 L98 60 H74 Z" fill="#bfe0f2" stroke="#8f2a22" stroke-width="2" stroke-linejoin="round"/>
<path d="M14 74 H22 M108 72 H116" stroke="#f7d35c" stroke-width="5" stroke-linecap="round"/>
<path d="M60 72 h8" stroke="#8f2a22" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="36" cy="92" r="13" fill="#2a211b"/><circle cx="36" cy="92" r="5" fill="#c8ced3"/>
<circle cx="94" cy="92" r="13" fill="#2a211b"/><circle cx="94" cy="92" r="5" fill="#c8ced3"/>`;

export const plane = `<g transform="rotate(-14 64 66)">
<path d="M82 58 L58 32 H46 L60 58 Z" fill="#9fb8d0" stroke="#4a6a8a" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M18 58 L10 32 H23 L40 57 Z" fill="#2e6fd1" stroke="#1b4586" stroke-width="3" stroke-linejoin="round"/>
<path d="M14 66 C14 58 22 56 30 56 H100 C112 56 120 62 120 66 C120 70 112 74 100 74 H30 C22 74 14 72 14 66Z" fill="#f4f7fa" stroke="#4a6a8a" stroke-width="3"/>
<path d="M18 69 H114" stroke="#2e6fd1" stroke-width="2.5"/>
<g fill="#5a8fc4"><circle cx="40" cy="63" r="2.5"/><circle cx="49" cy="63" r="2.5"/><circle cx="58" cy="63" r="2.5"/><circle cx="67" cy="63" r="2.5"/><circle cx="76" cy="63" r="2.5"/><circle cx="85" cy="63" r="2.5"/><circle cx="94" cy="63" r="2.5"/></g>
<path d="M104 59 C110 59 114 61 117 64 H104 Z" fill="#5a8fc4"/>
<rect x="56" y="78" width="18" height="9" rx="4.5" fill="#c0c8d0" stroke="#4a6a8a" stroke-width="2"/>
<path d="M86 70 L58 102 H44 L60 70 Z" fill="#2e6fd1" stroke="#1b4586" stroke-width="3" stroke-linejoin="round"/>
</g>`;

// Faces and figures (unit 14's body, unit 15's day, unit 17's feelings).
const SKIN_ATTR = 'fill="#f2c9a0" stroke="#b07a52" stroke-width="2"';
const HAIR_COLOUR = '#3b2f2a';

// A face, close up, with shoulders in `coat` (a shirt unless given), and
// an expression from MOUTH, EYES and BROWS (unit 17's feelings).
const MOUTH = {
  smile: '<path d="M55 81 Q64 88 73 81" stroke="#8f2a22" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  frown: '<path d="M55 85 Q64 79 73 85" stroke="#8f2a22" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  open: '<path d="M53 79 Q64 76 75 79 Q72 92 64 92 Q56 92 53 79 Z" fill="#8f2a22" stroke="#6e1f19" stroke-width="1.5"/><path d="M55 79.5 Q64 77.5 73 79.5 V83 H55 Z" fill="#ffffff"/><path d="M61 78.5 V83 M67 78.5 V83" stroke="#c9d3da" stroke-width="1"/>',
  ow: '<ellipse cx="64" cy="84" rx="5" ry="6" fill="#8f2a22" stroke="#6e1f19" stroke-width="1.5"/>',
  grin: '<path d="M50 78 Q64 81 78 78 Q74 94 64 94 Q54 94 50 78 Z" fill="#8f2a22" stroke="#6e1f19" stroke-width="1.5" stroke-linejoin="round"/><path d="M52 78.6 Q64 81.4 76 78.6 L75 83 Q64 85 53 83 Z" fill="#ffffff"/><path d="M57 88 Q64 85 71 88 Q68 93 64 93 Q60 93 57 88 Z" fill="#e0706a"/>',
  flat: '<path d="M56 84 H72" stroke="#8f2a22" stroke-width="2.5" stroke-linecap="round"/>',
  wavy: '<path d="M53 85 q2.75 -3 5.5 0 t5.5 0 t5.5 0 t5.5 0" stroke="#8f2a22" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  teeth: '<rect x="52" y="79" width="24" height="10" rx="3" fill="#ffffff" stroke="#8f2a22" stroke-width="2"/><path d="M52 84 H76 M58 79 V89 M64 79 V89 M70 79 V89" stroke="#c9d3da" stroke-width="1"/>',
};
const BROWS = {
  calm: 'M44 48 Q51 45 58 48 M70 48 Q77 45 84 48',
  angry: 'M44 46 L57 50 M84 46 L71 50',
  worried: 'M44 49 L57 44 M84 49 L71 44',
  up: 'M44 43 Q51 37 58 43 M70 43 Q77 37 84 43',
};
// Each pair of eyes: at 51,58 and 77,58.
const pair = f => f(51) + f(77);
const EYES = {
  open: pair(x => `<ellipse cx="${x}" cy="58" rx="6" ry="4.5" fill="#ffffff" stroke="#8a9aa5" stroke-width="1"/>`)
    + '\n' + pair(x => `<circle cx="${x}" cy="58" r="2.6" fill="${HAIR_COLOUR}"/>`),
  wide: pair(x => `<ellipse cx="${x}" cy="58" rx="6.5" ry="6.5" fill="#ffffff" stroke="#8a9aa5" stroke-width="1"/><circle cx="${x}" cy="58" r="1.8" fill="${HAIR_COLOUR}"/>`),
  half: pair(x => `<ellipse cx="${x}" cy="58" rx="6" ry="4.5" fill="#ffffff" stroke="#8a9aa5" stroke-width="1"/><circle cx="${x}" cy="59.5" r="2.6" fill="${HAIR_COLOUR}"/><path d="M${x - 6.5} 58.5 Q${x} 51 ${x + 6.5} 58.5 Z" fill="#e7b48a"/><path d="M${x - 6.5} 58.5 H${x + 6.5}" stroke="${HAIR_COLOUR}" stroke-width="2" stroke-linecap="round"/>`),
  closed: pair(x => `<path d="M${x - 6} 58 Q${x} 62 ${x + 6} 58" stroke="${HAIR_COLOUR}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  happy: pair(x => `<path d="M${x - 6} 60 Q${x} 52 ${x + 6} 60" stroke="${HAIR_COLOUR}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
};
const BLUE_TOP = 'fill="#3f7cc0" stroke="#24507f" stroke-width="2.5"';
export function face({ mouth = 'smile', eyes = 'open', brows, pained = false, coat = null, extra = '' } = {}) {
  brows = BROWS[brows ?? (pained ? 'angry' : 'calm')];
  return `<path d="M20 128 C20 108 40 100 64 100 C88 100 108 108 108 128 Z" ${coat ?? BLUE_TOP} stroke-linejoin="round"/>
<rect x="54" y="84" width="20" height="20" ${SKIN_ATTR}/>
<ellipse cx="30" cy="60" rx="7" ry="10" ${SKIN_ATTR}/><ellipse cx="98" cy="60" rx="7" ry="10" ${SKIN_ATTR}/>
<ellipse cx="64" cy="58" rx="33" ry="36" ${SKIN_ATTR}/>
<path d="M31 56 C27 22 50 16 64 16 C80 16 101 22 97 56 C92 36 78 30 64 31 C50 31 37 38 31 56 Z" fill="${HAIR_COLOUR}"/>
<path d="${brows}" stroke="${HAIR_COLOUR}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
${EYES[eyes]}
<path d="M64 60 Q59 70 63 72 Q66 73 68 71" stroke="#b07a52" stroke-width="2" fill="none" stroke-linecap="round"/>
${MOUTH[mouth]}
${extra}`;
}

// A whole figure, facing us (or from behind), in a blue top and trousers.
export function figure({ behind = false, pained = false } = {}) {
  const head = behind
    ? `<circle cx="64" cy="20" r="12" ${SKIN_ATTR}/><path d="M52 21 C51 8 58 7 64 7 C71 7 77 9 76 21 C76 27 72 30 64 30 C56 30 52 27 52 21 Z" fill="${HAIR_COLOUR}"/>`
    : `<circle cx="64" cy="20" r="12" ${SKIN_ATTR}/><path d="M53 18 C52 8 59 7 64 7 C70 7 76 9 75 18 C72 12 58 11 53 18 Z" fill="${HAIR_COLOUR}"/>
<circle cx="60" cy="20" r="1.4" fill="${HAIR_COLOUR}"/><circle cx="68" cy="20" r="1.4" fill="${HAIR_COLOUR}"/>
${pained ? '<path d="M56 15 L61 17 M72 15 L67 17" stroke="#3b2f2a" stroke-width="1.5" stroke-linecap="round"/><path d="M60 27 Q64 24 68 27"' : '<path d="M60 25 Q64 28 68 25"'} stroke="#8f2a22" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  return `<ellipse cx="64" cy="120" rx="30" ry="4" fill="#9fb0bb" opacity=".35"/>
<path d="M50 38 L38 70 M78 38 L90 70" stroke="#f2c9a0" stroke-width="8" stroke-linecap="round"/>
<circle cx="37" cy="73" r="5" ${SKIN_ATTR}/><circle cx="91" cy="73" r="5" ${SKIN_ATTR}/>
<path d="M48 76 H80 L79 112 H67 L64 88 L61 112 H49 Z" fill="#5f6a72" stroke="#3a4148" stroke-width="2" stroke-linejoin="round"/>
<path d="M44 117 C44 111 49 110 52 110 H61 V117 Z M84 117 C84 111 79 110 76 110 H67 V117 Z" fill="#3b2f2a" stroke="#1d1714" stroke-width="1.5"/>
<path d="M50 33 H78 L84 42 L78 46 L81 78 H47 L50 46 L44 42 Z" ${BLUE_TOP} stroke-linejoin="round"/>
<rect x="60" y="29" width="8" height="5" ${SKIN_ATTR}/>
${head}`;
}

// In bed, head on the pillow under a blue quilt; zzz above for sleep.
export const inBed = `<path d="M10 70 V112 M118 86 V112" stroke="#9c6528" stroke-width="6" stroke-linecap="round"/>
<rect x="10" y="88" width="108" height="14" rx="3" fill="#c98a4a" stroke="#9c6528" stroke-width="2"/>
<rect x="16" y="68" width="30" height="16" rx="7" fill="#ffffff" stroke="#8a9aa5" stroke-width="2"/>
<circle cx="34" cy="66" r="11" ${SKIN_ATTR}/><path d="M24 64 C24 54 34 52 40 56 C36 58 30 58 24 64 Z" fill="${HAIR_COLOUR}"/>
<path d="M30 68 q3 2 6 0" stroke="${HAIR_COLOUR}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<path d="M42 70 C60 62 100 64 114 76 V90 H42 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="2.5" stroke-linejoin="round"/>`;
export const zzz = '<path d="M54 24 h10 l-10 12 h10 M74 12 h8 l-8 10 h8 M90 30 h6 l-6 8 h6" stroke="#6f8796" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';

// A drop of water, its tip at x, y (s: size), and a white puff (a
// cough, a bubble, foam).
export const drop = (x, y, s = 1) => `<path d="M${x} ${y} C${x + 4 * s} ${y + 6 * s} ${x + 4 * s} ${y + 10 * s} ${x} ${y + 10 * s} C${x - 4 * s} ${y + 10 * s} ${x - 4 * s} ${y + 6 * s} ${x} ${y} Z" fill="#7fb2e0" stroke="#3f7cc0" stroke-width="1.5"/>`;
export const puff = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="#8a9aa5" stroke-width="2"/>`;

// A house with a red roof and a blue door (unit 10's 屋企).
export const house = `<ellipse cx="64" cy="118" rx="46" ry="5" fill="#9fb0bb" opacity=".35"/>
<rect x="26" y="56" width="76" height="60" fill="#fbf1dc" stroke="#7d4f1e" stroke-width="3" stroke-linejoin="round"/>
<path d="M14 60 L64 16 L114 60 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="3" stroke-linejoin="round"/>
<rect x="82" y="24" width="12" height="20" fill="#9c6528" stroke="#7d4f1e" stroke-width="2"/>
<rect x="54" y="80" width="22" height="36" rx="2" fill="#3f7cc0" stroke="#24507f" stroke-width="2.5"/>
<circle cx="71" cy="99" r="2" fill="#e0a526"/>
<rect x="34" y="70" width="14" height="14" fill="#fff6d8" stroke="#7d4f1e" stroke-width="2"/>
<rect x="84" y="70" width="12" height="14" fill="#fff6d8" stroke="#7d4f1e" stroke-width="2"/>`;

// A soft shadow on the ground, centred on cx, cy.
export const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="#9fb0bb" opacity=".35"/>`;

// A small person walking right (left when flip), feet at x, y, with a
// briefcase (bag: 'work') or a backpack ('school').
export function walker(x, y, { flip = false, bag } = {}) {
  const pack = bag === 'school' ? '<rect x="-16" y="-39" width="10" height="18" rx="3" fill="#d6453a" stroke="#8f2a22" stroke-width="1.5"/>' : '';
  const brief = bag === 'work' ? '<path d="M9 -23 V-26 H15 V-23" stroke="#5a3a1e" stroke-width="1.5" fill="none"/><rect x="6" y="-23" width="12" height="9" rx="1.5" fill="#7d4f1e" stroke="#5a3a1e" stroke-width="1.5"/>' : '';
  return `${shadow(x, y, 13)}
<g transform="translate(${x} ${y})${flip ? ' scale(-1 1)' : ''}">
<path d="M-2 -20 L-9 -2 M2 -20 L8 -2" stroke="#4a5560" stroke-width="6" stroke-linecap="round"/>
${pack}<path d="M-4 -38 L-10 -24 M4 -38 L11 -25" stroke="#f2c9a0" stroke-width="4" stroke-linecap="round"/>
<path d="M-8 -40 Q0 -44 8 -40 L7 -18 H-7 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="1.5" stroke-linejoin="round"/>
${brief}<circle cx="0" cy="-50" r="8" fill="#f2c9a0" stroke="#b07a52" stroke-width="1.5"/>
<path d="M-8 -51 C-8 -59 -3 -60 0 -60 C5 -60 9 -58 8 -51 C5 -55 -4 -56 -8 -51 Z" fill="${HAIR_COLOUR}"/>
</g>`;
}
