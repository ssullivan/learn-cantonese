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
