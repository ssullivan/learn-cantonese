/*
 * Unit 8 illustrations. Drinks are drawn hot in a cup (with steam) or
 * iced in a glass (with ice cubes), for every drink as served in
 * vocab.js; the plain drink is the hot one. Run `node tools/draw.mjs`
 * after editing to rewrite img/<id>.svg.
 */
import { svg, cup, bowl, person, pineappleBun } from '../tools/svg.mjs';
import { loadVocab } from '../tools/site.mjs';

const DRINK = {
  'milk-tea': ['Milk tea', '#c99a66'],
  coffee: ['Coffee', '#6b4226'],
  yuenyeung: ['Yuenyeung, coffee with milk tea', '#c99a66'],
  'lemon-tea': ['Lemon tea', '#c8781e'],
};

const steam = `<path d="M48 38 q-6 -7 0 -14 t0 -14 M64 36 q-6 -7 0 -14 t0 -14 M80 38 q-6 -7 0 -14 t0 -14" stroke="#9fb0bb" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`;
const ice = `<g fill="#ffffff" fill-opacity=".55" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round">
<rect x="44" y="40" width="18" height="16" rx="3" transform="rotate(-12 53 48)"/>
<rect x="64" y="44" width="18" height="16" rx="3" transform="rotate(10 73 52)"/>
<rect x="52" y="58" width="16" height="14" rx="3" transform="rotate(4 60 65)"/>
</g>`;
const lemon = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f7e27a" stroke="#d9b21e" stroke-width="2"/>
<circle cx="${cx}" cy="${cy}" r="${r * 0.72}" fill="#fbf1b8"/>
<path d="M${cx - r * 0.7} ${cy} H${cx + r * 0.7} M${cx} ${cy - r * 0.7} V${cy + r * 0.7}" stroke="#e6c94a" stroke-width="1.5"/>`;

// 鴛鴦 shows its coffee and its milk tea: half and half in a cup, in
// layers in a glass.
const COFFEE = DRINK.coffee[1];
const halves = `<path d="M28 48 A36 7 0 0 0 58 54.8 Q70 48 58 41.2 A36 7 0 0 0 28 48 Z" fill="${COFFEE}"/>`;
const layers = `<path d="M38.9 78 L42 110 C42 114 86 114 86 110 L89.1 78 Q64 84 38.9 78 Z" fill="${COFFEE}" opacity=".9"/>`;

function drink(id, iced) {
  const [name, colour] = DRINK[id];
  if (iced) {
    const extra = id === 'lemon-tea' ? `${lemon(56, 84, 9)}\n${lemon(72, 94, 8)}` : id === 'yuenyeung' ? layers : '';
    return svg(`Iced ${name.toLowerCase()} in a glass`, `${cup(colour, { glass: true })}\n${ice}${extra ? `\n${extra}` : ''}`);
  }
  const extra = id === 'lemon-tea' ? `\n<ellipse cx="72" cy="48" rx="12" ry="4" fill="#f7e27a" stroke="#d9b21e" stroke-width="2"/>`
    : id === 'yuenyeung' ? `\n${halves}` : '';
  return svg(`Hot ${name.toLowerCase()} in a cup`, `${steam}\n${cup(colour)}${extra}`);
}

const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="5" fill="#9fb0bb" opacity=".35"/>`;

const butter = `<path d="M26 74 L98 66 L102 78 L30 88 Z" fill="#fff0a0" stroke="#d9b64a" stroke-width="2" stroke-linejoin="round"/>
<path d="M30 88 L102 78 L102 82 L31 92 Z" fill="#f0d676" stroke="#d9b64a" stroke-width="1.5" stroke-linejoin="round"/>`;

const noodleBroth = `<ellipse cx="64" cy="60" rx="46" ry="10" fill="#e8c27a"/>
<path d="M28 58 q5 -5 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" stroke="#f7d774" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path d="M34 64 q5 -5 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" stroke="#f7d774" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;

const toastSlice = (x, y, turn) => `<g transform="translate(${x} ${y}) rotate(${turn})">
<path d="M-26 20 L-22 -18 Q0 -30 22 -18 L26 20 Z" fill="#b8742c" stroke="#7d4f1e" stroke-width="2" stroke-linejoin="round"/>
<path d="M-20 16 L-17 -14 Q0 -23 17 -14 L20 16 Z" fill="#f2c774"/>
</g>`;

const art = {
  'cha-chaan-teng': svg('A cha chaan teng table with milk tea and a pineapple bun', `<path d="M8 84 H120 L112 96 H16 Z" fill="#3a9a6e" stroke="#26684a" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M28 96 V122 M100 96 V122" stroke="#26684a" stroke-width="5" stroke-linecap="round"/>
<g transform="translate(6 20) scale(.62)">${steam}\n${cup(DRINK['milk-tea'][1])}</g>
<g transform="translate(88 72) scale(1.1)">${pineappleBun}</g>`),

  waiter: svg('A waiter with an apron and an order pad', `${person(58, 38, 'green', 1.7)}
<path d="M38 80 H78 V112 H38 Z" fill="#ffffff" stroke="#9fb0bb" stroke-width="2" stroke-linejoin="round"/>
<path d="M44 80 L50 70 M72 80 L66 70" stroke="#9fb0bb" stroke-width="2.5" stroke-linecap="round"/>
<rect x="88" y="64" width="26" height="34" rx="3" fill="#fff6d8" stroke="#7d4f1e" stroke-width="2.5" transform="rotate(8 101 81)"/>
<path d="M94 74 H108 M93 81 H107 M92 88 H102" stroke="#9fb0bb" stroke-width="2" stroke-linecap="round" transform="rotate(8 101 81)"/>
<path d="M112 58 L96 94" stroke="#e0a526" stroke-width="4" stroke-linecap="round"/>`),

  'pineapple-butter': svg('A pineapple bun cut open around a slab of butter', `${shadow(64, 104, 46)}
<g transform="translate(64 72) scale(2.1)">${pineappleBun}</g>
${butter}`),

  'spam-egg-noodles': svg('A bowl of noodles with luncheon meat and a fried egg', bowl(`${noodleBroth}
<path d="M30 52 l22 -6 l4 10 l-22 6 z" fill="#e79a9a" stroke="#b45f5f" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M66 50 C62 40 80 36 90 42 C102 44 100 56 90 58 C80 62 68 58 66 50 Z" fill="#ffffff" stroke="#d8d2c0" stroke-width="1.5"/>
<circle cx="82" cy="49" r="6" fill="#f2b21c"/>`)),

  macaroni: svg('A bowl of macaroni in soup with ham', bowl(`<ellipse cx="64" cy="60" rx="46" ry="10" fill="#f1e2c0"/>
<g fill="#f3cf82" stroke="#c89a3c" stroke-width="1.5">
<ellipse cx="38" cy="58" rx="5" ry="3.5"/><ellipse cx="52" cy="62" rx="5" ry="3.5"/><ellipse cx="70" cy="56" rx="5" ry="3.5"/>
<ellipse cx="84" cy="62" rx="5" ry="3.5"/><ellipse cx="96" cy="58" rx="5" ry="3.5"/><ellipse cx="62" cy="66" rx="5" ry="3.5"/>
</g>
<g fill="#c0392b" opacity=".6"><circle cx="38" cy="58" r="1.8"/><circle cx="52" cy="62" r="1.8"/><circle cx="70" cy="56" r="1.8"/><circle cx="84" cy="62" r="1.8"/><circle cx="96" cy="58" r="1.8"/><circle cx="62" cy="66" r="1.8"/></g>
<path d="M44 52 h10 v7 h-10z M76 64 h10 v7 h-10z" fill="#f0a3a3" stroke="#b45f5f" stroke-width="1.5"/>
<path d="M60 54 h4 M88 54 h4 M46 67 h4" stroke="#5c9e46" stroke-width="3" stroke-linecap="round"/>`)),

  toast: svg('Two slices of toast with butter', `${shadow(64, 110, 44)}
${toastSlice(48, 78, -8)}
${toastSlice(80, 70, 10)}
<rect x="72" y="58" width="16" height="10" rx="2" fill="#fff0a0" stroke="#d9b64a" stroke-width="1.5" transform="rotate(10 80 63)"/>`),

  'french-toast': svg('French toast with butter and syrup', `${shadow(64, 106, 46)}
<path d="M18 74 L64 58 L110 74 L64 90 Z" fill="#e0a13f" stroke="#8f5a1c" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M18 74 V88 L64 104 V90 Z" fill="#b8742c" stroke="#8f5a1c" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M64 90 V104 L110 88 V74 Z" fill="#c98a3a" stroke="#8f5a1c" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M40 72 Q58 80 78 70 Q92 66 96 76 L92 92 Q90 84 86 86 L84 96 Q80 88 74 84 Q56 88 44 78 Z" fill="#b8641a" opacity=".75"/>
<path d="M54 66 L68 62 L78 68 L64 72 Z" fill="#fff0a0" stroke="#d9b64a" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M64 72 V76 L78 72 V68 Z M54 66 V70 L64 76 V72 Z" fill="#f0d676" stroke="#d9b64a" stroke-width="1.5" stroke-linejoin="round"/>`),
};

for (const id of Object.keys(DRINK)) art[id] = drink(id, false);
for (const e of loadVocab('unit8').served) art[e.id] = drink(e.drink, e.temp === 'dung');

export default art;
