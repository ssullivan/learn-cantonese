/*
 * Unit 17 illustrations: a face for each feeling, and for 唔開心. Run
 * `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg, face, drop, zzz } from '../tools/svg.mjs';

const RED = '#d6453a';

// Rosy cheeks, under the eyes.
const cheeks = `<circle cx="42" cy="72" r="6" fill="#e0706a" opacity=".4"/><circle cx="86" cy="72" r="6" fill="#e0706a" opacity=".4"/>`;

// A four-pointed sparkle centred on x, y.
const sparkle = (x, y, r) => `<path d="M${x} ${y - r} Q${x + r * .2} ${y - r * .2} ${x + r} ${y} Q${x + r * .2} ${y + r * .2} ${x} ${y + r} Q${x - r * .2} ${y + r * .2} ${x - r} ${y} Q${x - r * .2} ${y - r * .2} ${x} ${y - r} Z" fill="#f7d35c" stroke="#c9961a" stroke-width="1.2" stroke-linejoin="round"/>`;

// The comic-book anger mark, and a red flush.
const cross = (x, y) => `<path d="M${x - 8} ${y - 3} Q${x - 3} ${y - 3} ${x - 3} ${y - 8} M${x + 3} ${y - 8} Q${x + 3} ${y - 3} ${x + 8} ${y - 3} M${x + 8} ${y + 3} Q${x + 3} ${y + 3} ${x + 3} ${y + 8} M${x - 3} ${y + 8} Q${x - 3} ${y + 3} ${x - 8} ${y + 3}" stroke="${RED}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
const flush = `<ellipse cx="64" cy="66" rx="30" ry="26" fill="${RED}" opacity=".18"/>`;

// Fear: blue lines down the forehead, and shaking at the sides.
const fear = `<path d="M54 35 V43 M60 33 V42 M66 33 V42 M72 35 V43" stroke="#3f7cc0" stroke-width="2" stroke-linecap="round" opacity=".75"/>
<path d="M14 44 l-6 5 l6 5 l-6 5 M114 44 l6 5 l-6 5 l6 5" stroke="#6f8796" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

// Tired: shadows under the eyes.
const bags = '<path d="M45 65 Q51 68 57 65 M71 65 Q77 68 83 65" stroke="#9a7fb0" stroke-width="2" fill="none" stroke-linecap="round"/>';

// A thought bubble in the top-right corner, with `inside` drawn around 108,20.
const thought = inside => `<circle cx="90" cy="44" r="3" fill="#ffffff" stroke="#8a9aa5" stroke-width="1.5"/>
<circle cx="97" cy="37" r="4.5" fill="#ffffff" stroke="#8a9aa5" stroke-width="1.5"/>
<ellipse cx="108" cy="19" rx="19" ry="17" fill="#ffffff" stroke="#8a9aa5" stroke-width="2"/>
${inside}`;
const riceBowl = `<path d="M96 17 Q108 5 120 17" fill="#ffffff" stroke="#b8c2c9" stroke-width="1.5"/>
<path d="M95 17 H121 Q119 30 108 30 Q97 30 95 17 Z" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2" stroke-linejoin="round"/>
<path d="M98 22 H118" stroke="#2e5a88" stroke-width="1.5"/>
<path d="M110 13 L124 3 M113 14 L126 7" stroke="#9c6528" stroke-width="2" stroke-linecap="round"/>`;
const water = `<path d="M100 6 L103 32 H113 L116 6 Z" fill="#ffffff" stroke="#6f8796" stroke-width="2" stroke-linejoin="round"/>
<path d="M101.5 15 L103.8 30.5 H112.2 L114.5 15 Z" fill="#7fb2e0"/>
<path d="M104 18 L105.5 28" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>`;

// Boredom: a trailing "…".
const dots = `<circle cx="100" cy="24" r="3" fill="#8a9aa5"/><circle cx="110" cy="24" r="3" fill="#8a9aa5"/><circle cx="120" cy="24" r="3" fill="#8a9aa5"/>`;

const art = {
  'hoi-sam': svg('A happy face, grinning', face({ mouth: 'grin', eyes: 'happy', extra: cheeks })),
  'm-hoi-sam': svg('An unhappy face', face({ mouth: 'frown', brows: 'worried' })),
  'soeng-sam': svg('A sad face, crying', face({ mouth: 'frown', brows: 'worried', eyes: 'closed',
    extra: `${drop(45, 62, 1.1)}${drop(83, 64, 1.3)}${drop(42, 78, 0.8)}` })),
  'hing-fan': svg('An excited face, with sparkles', face({ mouth: 'grin', eyes: 'wide', brows: 'up',
    extra: `${cheeks}${sparkle(14, 28, 10)}${sparkle(112, 24, 12)}${sparkle(116, 60, 7)}${sparkle(10, 66, 6)}` })),
  nau: svg('An angry face', face({ mouth: 'teeth', brows: 'angry', extra: `${flush}${cross(98, 22)}` })),
  geng: svg('A scared face, shaking', face({ mouth: 'ow', eyes: 'wide', brows: 'worried', extra: fear })),
  'gan-zoeng': svg('A nervous face, sweating', face({ mouth: 'wavy', brows: 'worried',
    extra: `${drop(100, 30, 1.4)}${drop(26, 38, 1.1)}` })),
  gui: svg('A tired face', face({ mouth: 'frown', eyes: 'half', extra: `${bags}${drop(92, 40, 1.2)}` })),
  'ngaan-fan': svg('A sleepy face, yawning', face({ mouth: 'ow', eyes: 'closed',
    extra: `<g transform="translate(68 0) scale(.6)">${zzz}</g>` })),
  mun: svg('A bored face', face({ mouth: 'flat', eyes: 'half', extra: dots })),
  'tou-ngo': svg('A hungry face, thinking of a bowl of rice', face({ mouth: 'ow', brows: 'worried', extra: thought(riceBowl) })),
  'geng-hot': svg('A thirsty face, thinking of a glass of water', face({ mouth: 'ow', eyes: 'half', extra: thought(water) })),
};
export default art;
