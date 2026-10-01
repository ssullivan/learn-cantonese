/*
 * Unit 21 illustrations: kitchen appliances, white or steel with grey
 * outlines, each with a hint of what it does (a glow in the microwave,
 * flames on the stove, toast popping up), and a kitchen made of them.
 * Run `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg, shadow, puff } from '../tools/svg.mjs';

const BODY = 'fill="#f4f6f8" stroke="#8a9aa5" stroke-width="2.5" stroke-linejoin="round"';
const STEEL = 'fill="#c8ced3" stroke="#6f8796" stroke-width="2.5" stroke-linejoin="round"';
const GLASS = 'fill="#3a4148" stroke="#1d2226" stroke-width="2"';
const DARK = '#3a4148', HANDLE = '#6f8796';  // HANDLE shows on a dark page too
const steam = (...xs) => xs.map(x => `<path d="M${x} 30 q-5 -7 0 -13 t0 -13" stroke="#9fb0bb" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('');
const knob = (x, y, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${DARK}"/><path d="M${x} ${y} v-${r}" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>`;
// A gas flame: blue tongues on a ring, centred on x, y.
const flame = (x, y) => `<path d="M${x - 16} ${y} Q${x - 14} ${y - 10} ${x - 9} ${y - 4} Q${x - 6} ${y - 16} ${x} ${y - 6} Q${x + 6} ${y - 16} ${x + 9} ${y - 4} Q${x + 14} ${y - 10} ${x + 16} ${y} Z" fill="#3f7cc0" stroke="#24507f" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M${x - 9} ${y} Q${x - 4} ${y - 8} ${x} ${y - 3} Q${x + 4} ${y - 8} ${x + 9} ${y} Z" fill="#8ec5f0"/>`;
const toastUp = (x, y) => `<path d="M${x - 13} ${y + 14} V${y - 6} Q${x - 13} ${y - 15} ${x} ${y - 15} Q${x + 13} ${y - 15} ${x + 13} ${y - 6} V${y + 14} Z" fill="#b8742c" stroke="#7d4f1e" stroke-width="2" stroke-linejoin="round"/>
<path d="M${x - 9} ${y + 14} V${y - 4} Q${x - 9} ${y - 11} ${x} ${y - 11} Q${x + 9} ${y - 11} ${x + 9} ${y - 4} V${y + 14} Z" fill="#f2c774"/>`;

// Each appliance on its own, drawn to fill the 128 square. The kitchen
// places them smaller.
const fridge = `<rect x="34" y="8" width="60" height="108" rx="7" ${BODY}/>
<path d="M34 44 H94" stroke="#8a9aa5" stroke-width="2.5"/>
<path d="M84 20 V34 M84 54 V80" stroke="${DARK}" stroke-width="4.5" stroke-linecap="round"/>
<circle cx="48" cy="62" r="5" fill="#d6453a"/><rect x="45" y="70" width="12" height="9" rx="1.5" fill="#f7d35c" transform="rotate(-6 51 74)"/>
<path d="M40 116 v4 M88 116 v4" stroke="#6f8796" stroke-width="4" stroke-linecap="round"/>`;

const microwave = `<rect x="10" y="32" width="108" height="66" rx="6" ${BODY}/>
<rect x="18" y="41" width="68" height="48" rx="4" ${GLASS}/>
<rect x="22" y="45" width="60" height="40" rx="3" fill="#f7d35c" opacity=".35"/>
<path d="M30 80 Q52 88 74 80" stroke="#f7d35c" stroke-width="2" fill="none" opacity=".8"/>
<path d="M38 78 C38 68 66 68 66 78 Z" fill="#ffffff" stroke="#3f7cc0" stroke-width="2"/>
<rect x="93" y="41" width="18" height="10" rx="1.5" fill="#1d2226"/><path d="M96 46 h4 M102 46 h6" stroke="#5fd17a" stroke-width="2.5" stroke-linecap="round"/>
<g fill="#8a9aa5">${[56, 64, 72].flatMap(y => [97, 107].map(x => `<rect x="${x - 3}" y="${y - 2.5}" width="7" height="5" rx="1"/>`)).join('')}</g>
${knob(102, 85, 5)}
<path d="M20 98 v4 M108 98 v4" stroke="#6f8796" stroke-width="4" stroke-linecap="round"/>`;

const oven = `<rect x="20" y="16" width="88" height="102" rx="5" ${BODY}/>
<path d="M20 34 H108" stroke="#8a9aa5" stroke-width="2.5"/>
${knob(34, 25)}${knob(48, 25)}${knob(94, 25)}
<rect x="66" y="21" width="16" height="8" rx="1.5" fill="#1d2226"/><path d="M69 25 h10" stroke="#f08a2c" stroke-width="2.5" stroke-linecap="round"/>
<path d="M32 44 H96" stroke="${DARK}" stroke-width="4.5" stroke-linecap="round"/>
<rect x="30" y="52" width="68" height="54" rx="4" ${GLASS}/>
<path d="M36 98 q6 -4 12 0 t12 0 t12 0 t12 0 t8 0" stroke="#f08a2c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M44 86 V76 Q64 66 84 76 V86 Z" fill="#c98a4a" stroke="#7d4f1e" stroke-width="2" stroke-linejoin="round"/><path d="M44 76 Q64 66 84 76" stroke="#f7f2e8" stroke-width="3" fill="none"/>`;

const stove = `<path d="M8 66 H120 L116 102 H12 Z" ${STEEL}/>
<rect x="8" y="58" width="112" height="10" rx="2" fill="#5f6a72" stroke="#3a4148" stroke-width="2"/>
<path d="M14 84 H114" stroke="#6f8796" stroke-width="2"/>
${knob(38, 93, 5)}${knob(90, 93, 5)}
${[38, 90].map(x => `<ellipse cx="${x}" cy="58" rx="20" ry="5" fill="${DARK}"/>${flame(x, 56)}`).join('')}
<path d="M18 102 v6 M110 102 v6" stroke="#5f6a72" stroke-width="4" stroke-linecap="round"/>`;

const riceCooker = `<path d="M30 60 C28 82 30 100 36 108 H92 C98 100 100 82 98 60 Z" ${BODY}/>
<path d="M26 60 C30 40 98 40 102 60 Z" fill="#e7ebef" stroke="#8a9aa5" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M52 42 Q64 32 76 42" stroke="${HANDLE}" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M36 72 Q64 66 92 72" stroke="#d6453a" stroke-width="3" fill="none"/>
<rect x="52" y="78" width="24" height="16" rx="3" fill="#e7ebef" stroke="#8a9aa5" stroke-width="2"/><circle cx="64" cy="86" r="3.5" fill="#f08a2c"/>
${steam(58, 70)}`;

const kettle = `<path d="M42 40 L22 26 Q16 24 17 31 L40 64 Z" ${BODY}/>
<path d="M40 30 H88 L94 104 H34 Z" ${BODY}/>
<path d="M88 40 Q112 40 110 68 Q108 92 92 94" stroke="${HANDLE}" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M44 28 H84 Q84 20 64 18 Q44 20 44 28 Z" fill="${HANDLE}"/>
<rect x="44" y="48" width="8" height="40" rx="3" fill="#bfe0f5" stroke="#3f7cc0" stroke-width="1.5"/><rect x="46" y="64" width="4" height="22" rx="1.5" fill="#3f7cc0"/>
<path d="M26 104 H102 L98 114 H30 Z" fill="#5f6a72" stroke="#3a4148" stroke-width="2" stroke-linejoin="round"/><circle cx="64" cy="109" r="2.5" fill="#5fd17a"/>
${steam(19)}`;

const toaster = `${toastUp(48, 50)}${toastUp(80, 46)}
<rect x="16" y="54" width="96" height="58" rx="14" ${STEEL}/>
<path d="M34 58 H62 M66 58 H94" stroke="${DARK}" stroke-width="5" stroke-linecap="round"/>
<path d="M28 72 Q64 66 100 72" stroke="#ffffff" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>
<rect x="104" y="72" width="12" height="7" rx="2" fill="${DARK}"/>${knob(64, 94, 5)}
<path d="M28 112 v4 M100 112 v4" stroke="#5f6a72" stroke-width="4" stroke-linecap="round"/>`;

const plateUp = x => `<ellipse cx="${x}" cy="50" rx="6" ry="16" fill="#ffffff" stroke="#3f7cc0" stroke-width="2"/>`;
const dishwasher = `<rect x="22" y="8" width="84" height="84" rx="4" ${BODY}/>
<rect x="22" y="8" width="84" height="12" rx="4" fill="#e7ebef" stroke="#8a9aa5" stroke-width="2.5"/>
<circle cx="88" cy="14" r="2.5" fill="#5fd17a"/><circle cx="96" cy="14" r="2.5" fill="#8a9aa5"/>
<rect x="30" y="26" width="68" height="62" rx="2" fill="#5f6a72"/>
${[42, 56, 70, 84].map(plateUp).join('')}
<path d="M32 66 H96 M32 74 H96" stroke="#c8ced3" stroke-width="2.5"/>
${puff(40, 32, 5)}${puff(78, 30, 4)}${puff(90, 38, 3)}
<path d="M22 92 H106 L118 118 H10 Z" ${BODY}/>
<path d="M44 102 H84" stroke="${DARK}" stroke-width="4" stroke-linecap="round"/>`;

const art = {
  fridge: svg('A fridge', `${shadow(64, 120, 36)}${fridge}`),
  microwave: svg('A microwave, glowing as it heats a bowl', `${shadow(64, 104, 56)}${microwave}`),
  oven: svg('An oven with a cake baking inside', `${shadow(64, 120, 48)}${oven}`),
  stove: svg('A gas stove with two blue flames', `${shadow(64, 110, 56)}${stove}`),
  'rice-cooker': svg('A rice cooker, steaming', `${shadow(64, 110, 40)}${riceCooker}`),
  kettle: svg('An electric kettle, steaming', `${shadow(64, 116, 42)}${kettle}`),
  toaster: svg('A toaster with toast popping up', `${shadow(64, 118, 50)}${toaster}`),
  dishwasher: svg('A dishwasher, open, with plates inside', `${dishwasher}`),

  kitchen: svg('A kitchen: a fridge beside a counter with a gas stove and a kettle', `
<rect x="40" y="8" width="84" height="18" rx="2" fill="#c98a4a" stroke="#7d4f1e" stroke-width="2"/>
<path d="M82 8 V26" stroke="#7d4f1e" stroke-width="2"/><path d="M66 18 h8 M90 18 h8" stroke="#7d4f1e" stroke-width="2.5" stroke-linecap="round"/>
<g transform="translate(-14 4) scale(.9)">${fridge}</g>
<rect x="44" y="84" width="80" height="34" fill="#c98a4a" stroke="#7d4f1e" stroke-width="2.5"/>
<path d="M84 84 V118 M60 98 h8 M100 98 h8" stroke="#7d4f1e" stroke-width="2.5" stroke-linecap="round"/>
<rect x="42" y="78" width="84" height="7" rx="1.5" fill="#e7ebef" stroke="#8a9aa5" stroke-width="2"/>
<g transform="translate(46 34) scale(.42)">${stove}</g>
<g transform="translate(92 38) scale(.32)">${kettle}</g>
<path d="M4 120 H124" stroke="#9fb0bb" stroke-width="3" stroke-linecap="round"/>`),
};
export default art;
