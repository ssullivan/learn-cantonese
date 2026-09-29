/*
 * Unit 15 illustrations: a picture for each activity of the day. Going
 * to work or school is someone walking to the building's door, and
 * finishing is walking away from it; a sun or moon in the top-left corner
 * says when (morning, midday, evening, night). Run `node tools/draw.mjs`
 * after editing to rewrite img/<id>.svg.
 */
import { svg, plate, bowl, cup, face, inBed, zzz, drop, puff, house } from '../tools/svg.mjs';

const SKIN = 'fill="#f2c9a0" stroke="#b07a52" stroke-width="1.5"';
const HAIR = '#3b2f2a';
const GOLD = 'fill="#e0a526" stroke="#9a6c0e" stroke-width="1.5" stroke-linejoin="round"';
const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="#9fb0bb" opacity=".35"/>`;

// When: a sun or moon in the top-left corner.
const rays = (cx, cy, r1, r2, degs) => `<path d="${degs.map(deg => {
  const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  return `M${(cx + c * r1).toFixed(1)} ${(cy - s * r1).toFixed(1)} L${(cx + c * r2).toFixed(1)} ${(cy - s * r2).toFixed(1)}`;
}).join(' ')}" stroke="#d99a1a" stroke-width="2.5" stroke-linecap="round"/>`;
const HORIZON = '<path d="M2 30 H38" stroke="#9fb0bb" stroke-width="2.5" stroke-linecap="round"/>';
const SKY = {
  morning: `<path d="M8 30 A12 12 0 0 1 32 30 Z" fill="#f7c948" stroke="#d99a1a" stroke-width="2" stroke-linejoin="round"/>
${rays(20, 30, 16, 21, [20, 55, 90, 125, 160])}${HORIZON}`,
  midday: `<circle cx="20" cy="20" r="9" fill="#f7d35c" stroke="#d99a1a" stroke-width="2"/>
${rays(20, 20, 13, 17, [0, 45, 90, 135, 180, 225, 270, 315])}`,
  evening: `<path d="M8 30 A12 12 0 0 1 32 30 Z" fill="#e0702c" stroke="#a84a18" stroke-width="2" stroke-linejoin="round"/>${HORIZON}`,
  night: `<path d="M22 6 A14 14 0 1 0 34 26 A11 11 0 1 1 22 6 Z" fill="#f2e3a0" stroke="#b9a24a" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M36 8 l1.5 3.5 l3.5 1.5 l-3.5 1.5 l-1.5 3.5 l-1.5 -3.5 l-3.5 -1.5 l3.5 -1.5 Z" fill="#f2e3a0"/>`,
};

// A small person walking right (left when flip), feet at x, y, with a
// briefcase (bag: 'work') or a backpack ('school').
function walker(x, y, { flip = false, bag } = {}) {
  const pack = bag === 'school' ? '<rect x="-16" y="-39" width="10" height="18" rx="3" fill="#d6453a" stroke="#8f2a22" stroke-width="1.5"/>' : '';
  const brief = bag === 'work' ? '<path d="M9 -23 V-26 H15 V-23" stroke="#5a3a1e" stroke-width="1.5" fill="none"/><rect x="6" y="-23" width="12" height="9" rx="1.5" fill="#7d4f1e" stroke="#5a3a1e" stroke-width="1.5"/>' : '';
  return `${shadow(x, y, 13)}
<g transform="translate(${x} ${y})${flip ? ' scale(-1 1)' : ''}">
<path d="M-2 -20 L-9 -2 M2 -20 L8 -2" stroke="#4a5560" stroke-width="6" stroke-linecap="round"/>
${pack}<path d="M-4 -38 L-10 -24 M4 -38 L11 -25" stroke="#f2c9a0" stroke-width="4" stroke-linecap="round"/>
<path d="M-8 -40 Q0 -44 8 -40 L7 -18 H-7 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="1.5" stroke-linejoin="round"/>
${brief}<circle cx="0" cy="-50" r="8" ${SKIN}/>
<path d="M-8 -51 C-8 -59 -3 -60 0 -60 C5 -60 9 -58 8 -51 C5 -55 -4 -56 -8 -51 Z" fill="${HAIR}"/>
</g>`;
}

// A gold arrow along y from x1 to x2.
const go = (x1, x2, y) => {
  const d = Math.sign(x2 - x1);
  return `<path d="M${x1} ${y} H${x2 - d * 8}" stroke="#e0a526" stroke-width="5" stroke-linecap="round"/>
<path d="M${x2} ${y} L${x2 - d * 11} ${y - 8} V${y + 8} Z" ${GOLD}/>`;
};

// Buildings on the right, each with its door around x 92, y 106.
const windows = (xs, ys, w, h, fill, stroke) => xs.flatMap(x => ys.map(y => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`)).join('');
const office = `${shadow(92, 118, 30)}
<rect x="68" y="16" width="48" height="100" fill="#c9d6e2" stroke="#4a6a8a" stroke-width="2.5"/>
${windows([74, 88, 102], [24, 36, 48, 60, 72, 84], 8, 7, '#bfe0f2', '#4a6a8a')}
<rect x="83" y="96" width="18" height="20" fill="#4a6a8a"/>`;
const school = `${shadow(91, 118, 32)}
<path d="M91 32 V8" stroke="#6f8796" stroke-width="2"/><path d="M91 9 H106 L102 14 L106 19 H91 Z" fill="#3a9a6e"/>
<rect x="62" y="54" width="58" height="62" fill="#f4e6c8" stroke="#9c6528" stroke-width="2.5"/>
<path d="M56 56 L91 30 L126 56 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="91" cy="46" r="6" fill="#ffffff" stroke="#8f2a22" stroke-width="2"/><path d="M91 42.5 V46 H94" stroke="#26323c" stroke-width="1.5" fill="none" stroke-linecap="round"/>
${windows([68, 104], [64], 11, 11, '#fff6d8', '#9c6528')}
<rect x="83" y="88" width="16" height="28" fill="#3f7cc0" stroke="#24507f" stroke-width="2"/>`;
const home = `<g transform="translate(40 36) scale(.7)">${house}</g>`;

// Walking to a building's door (go: true) or away from it.
const to = (building, when, bag) => `${SKY[when]}\n${building}\n${walker(26, 118, { bag })}\n${go(50, 80, 104)}`;
const from = (building, when, bag) => `${SKY[when]}\n${building}\n${walker(26, 118, { bag, flip: true })}\n${go(80, 46, 104)}`;

// Food.
const toast = `<path d="M34 86 C28 70 40 62 52 68 C62 62 72 72 66 86 Z" fill="#f2cf86" stroke="#b9802c" stroke-width="2"/>
<path d="M38 83 C35 73 42 68 50 72 C58 68 64 74 62 83 Z" fill="#fbe7b8"/>
<path d="M60 90 C54 74 66 66 78 72 C88 66 98 76 92 90 Z" fill="#f2cf86" stroke="#b9802c" stroke-width="2"/>
<path d="M64 87 C61 77 68 72 76 76 C84 72 90 78 88 87 Z" fill="#fbe7b8"/>
<rect x="70" y="78" width="10" height="6" rx="1" fill="#f7e27a"/>`;
// Rice heaped on a plate with char siu and greens; rice filling a bowl.
const lunch = `<path d="M24 88 C24 70 60 68 66 86 Z" fill="#fffdf5" stroke="#b9b09a" stroke-width="1.5"/>
<path d="M34 80 h3 M44 76 h3 M54 80 h3 M40 84 h3 M50 85 h3" stroke="#b9b09a" stroke-width="1.5" stroke-linecap="round"/>
<path d="M62 78 l18 -4 l2 7 l-18 4 Z M66 86 l18 -4 l2 7 l-18 4 Z" fill="#c4452f" stroke="#8f2a22" stroke-width="1.2" stroke-linejoin="round"/>
<path d="M86 82 q8 -10 16 -2 q-6 8 -16 2 Z M88 92 q8 -8 14 0 q-6 6 -14 0 Z" fill="#3a9a6e" stroke="#256b4a" stroke-width="1.2"/>`;
const rice = `<path d="M22 58 C28 36 100 36 106 58 Z" fill="#fffdf5" stroke="#b9b09a" stroke-width="2"/>
<path d="M40 50 h3 M52 45 h3 M66 43 h3 M80 46 h3 M58 52 h3 M72 51 h3 M90 52 h3 M34 55 h3" stroke="#b9b09a" stroke-width="1.5" stroke-linecap="round"/>`;
const chopsticks = '<path d="M72 8 L118 58 M84 4 L122 50" stroke="#9c6528" stroke-width="4" stroke-linecap="round"/>';

// A shirt on a hanger.
const hanger = `<path d="M64 26 V20 C64 14 72 14 72 19" stroke="#6f8796" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M64 26 L28 44 H100 Z" fill="none" stroke="#6f8796" stroke-width="3" stroke-linejoin="round"/>
<path d="M50 38 Q64 48 78 38 L106 50 L98 70 L88 65 V112 H40 V65 L30 70 L22 50 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M54 40 Q64 48 74 40" stroke="#8f2a22" stroke-width="2" fill="none"/>
<path d="M64 48 V112" stroke="#8f2a22" stroke-width="1.5"/>
<circle cx="60" cy="60" r="2" fill="#8f2a22"/><circle cx="60" cy="76" r="2" fill="#8f2a22"/><circle cx="60" cy="92" r="2" fill="#8f2a22"/>`;

// Sitting up in bed, stretching.
const wakeUp = `<path d="M10 70 V112 M118 86 V112" stroke="#9c6528" stroke-width="6" stroke-linecap="round"/>
<rect x="10" y="88" width="108" height="14" rx="3" fill="#c98a4a" stroke="#9c6528" stroke-width="2"/>
<rect x="14" y="72" width="26" height="14" rx="6" fill="#ffffff" stroke="#8a9aa5" stroke-width="2"/>
<path d="M36 58 L28 30 M52 58 L62 30" stroke="#f2c9a0" stroke-width="6" stroke-linecap="round"/>
<path d="M32 90 V62 Q44 54 56 62 V90 Z" fill="#7fb2e0" stroke="#3f7cc0" stroke-width="2" stroke-linejoin="round"/>
<circle cx="44" cy="46" r="11" ${SKIN}/><path d="M33 45 C33 34 41 33 44 33 C50 33 56 36 55 45 C52 39 38 38 33 45 Z" fill="${HAIR}"/>
<ellipse cx="44" cy="51" rx="3" ry="3.5" fill="#8f2a22"/>
<path d="M50 78 C68 70 100 72 114 80 V92 H50 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="2.5" stroke-linejoin="round"/>`;

// A wok on the flame.
const wok = `<path d="M40 112 Q46 98 50 108 Q56 94 62 108 Q68 94 74 108 Q80 98 86 112 Z" fill="#f08a2c" stroke="#c9541a" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M52 112 Q58 102 64 110 Q70 102 76 112 Z" fill="#f7d35c"/>
<path d="M22 118 H106" stroke="#5f6a72" stroke-width="4" stroke-linecap="round"/>
<path d="M16 62 Q64 116 112 62 Z" fill="#3a4148" stroke="#1d2226" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M112 64 L124 58" stroke="#1d2226" stroke-width="5" stroke-linecap="round"/>
<path d="M36 66 q8 -8 14 0 q-6 6 -14 0 Z M58 64 q8 -9 16 0 q-8 6 -16 0 Z" fill="#3a9a6e" stroke="#256b4a" stroke-width="1.2"/>
<path d="M78 62 l12 -3 l2 6 l-12 3 Z" fill="#c4452f" stroke="#8f2a22" stroke-width="1.2"/>
<path d="M94 12 L72 58" stroke="#9c6528" stroke-width="4" stroke-linecap="round"/><path d="M66 52 L78 58 L74 66 L62 60 Z" fill="#9aa3aa" stroke="#5f6a72" stroke-width="1.5"/>
<path d="M40 50 q-4 -8 0 -14 t0 -14 M56 48 q-4 -8 0 -14 t0 -14" stroke="#9fb0bb" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;

// A laptop on a desk, with a mug.
const laptop = `<path d="M6 104 H122" stroke="#9c6528" stroke-width="4" stroke-linecap="round"/>
<path d="M30 30 H98 V86 H30 Z" fill="#3a4148" stroke="#1d2226" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="36" y="36" width="56" height="44" fill="#bfe0f2"/>
<path d="M42 46 H74 M42 54 H86 M42 62 H66 M42 70 H80" stroke="#3f7cc0" stroke-width="3" stroke-linecap="round"/>
<path d="M22 102 L30 86 H98 L106 102 Z" fill="#c9d3da" stroke="#5f6a72" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M52 97 H76" stroke="#5f6a72" stroke-width="2.5" stroke-linecap="round"/>
<path d="M104 74 H118 V98 Q118 102 114 102 H108 Q104 102 104 98 Z" fill="#ffffff" stroke="#6f8796" stroke-width="2"/><path d="M118 80 q6 0 6 6 q0 6 -6 6" stroke="#6f8796" stroke-width="2" fill="none"/>`;

// A television, seen from the sofa.
const tv = `<rect x="16" y="14" width="96" height="66" rx="5" fill="#3a4148" stroke="#1d2226" stroke-width="2.5"/>
<rect x="22" y="20" width="84" height="54" fill="#7fb2e0"/>
<path d="M22 74 L48 46 L64 62 L78 50 L106 74 Z" fill="#3a9a6e"/><circle cx="88" cy="32" r="6" fill="#f7d35c"/>
<path d="M56 80 L50 90 H78 L72 80" fill="#5f6a72" stroke="#1d2226" stroke-width="2" stroke-linejoin="round"/>
<path d="M10 128 V112 Q10 102 22 102 H106 Q118 102 118 112 V128 Z" fill="#9c6528" stroke="#7d4f1e" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M44 128 C44 112 52 108 64 108 C76 108 84 112 84 128 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="2"/>
<circle cx="64" cy="96" r="12" fill="${HAIR}"/>`;

// An open book held up.
const book = `<path d="M64 88 C52 82 32 82 18 88 V122 C32 116 52 116 64 122 Z" fill="#ffffff" stroke="#8a9aa5" stroke-width="2" stroke-linejoin="round"/>
<path d="M64 88 C76 82 96 82 110 88 V122 C96 116 76 116 64 122 Z" fill="#ffffff" stroke="#8a9aa5" stroke-width="2" stroke-linejoin="round"/>
<path d="M26 94 C36 91 46 91 56 94 M26 102 C36 99 46 99 56 102 M26 110 C36 107 46 107 56 110 M72 94 C82 91 92 91 102 94 M72 102 C82 99 92 99 102 102 M72 110 C82 107 92 107 102 110" stroke="#9fb0bb" stroke-width="1.5" fill="none"/>
<path d="M16 88 V124 C32 118 52 118 64 124 C76 118 96 118 112 124 V88" stroke="#d6453a" stroke-width="3" fill="none" stroke-linejoin="round"/>
<circle cx="16" cy="108" r="7" ${SKIN}/><circle cx="112" cy="108" r="7" ${SKIN}/>`;

// A shower head pouring over someone washing their hair.
const shower = `<path d="M122 4 V16 Q122 22 116 22 H96" stroke="#9aa3aa" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M84 18 H104 L100 28 H88 Z" fill="#c0c8d0" stroke="#6f8796" stroke-width="2" stroke-linejoin="round"/>
<path d="M86 34 L78 50 M92 34 L88 52 M98 34 L98 50 M104 34 L108 50" stroke="#7fb2e0" stroke-width="2.5" stroke-linecap="round"/>
<path d="M30 128 C30 108 44 100 64 100 C84 100 98 108 98 128 Z" ${SKIN}/>
<rect x="56" y="84" width="16" height="20" ${SKIN}/>
<circle cx="64" cy="70" r="20" ${SKIN}/>
<path d="M44 66 C44 50 56 48 64 48 C74 48 84 52 84 66 C80 58 50 58 44 66 Z" fill="${HAIR}"/>
${puff(48, 54, 7)}${puff(60, 48, 8)}${puff(74, 50, 7)}${puff(84, 58, 6)}
<path d="M56 74 q3 2 6 0 M66 74 q3 2 6 0" stroke="${HAIR}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<path d="M60 82 Q64 85 68 82" stroke="#8f2a22" stroke-width="1.8" fill="none" stroke-linecap="round"/>
${drop(40, 84)}${drop(90, 80)}${drop(96, 96, .8)}`;

// Hands under a running tap, over a basin.
const handWash = `<path d="M18 22 H70 V30 H62 V40 H54 V30 H18 Z" fill="#c0c8d0" stroke="#6f8796" stroke-width="2" stroke-linejoin="round"/>
<rect x="30" y="12" width="10" height="10" rx="2" fill="#6f8796"/>
<path d="M58 42 V64" stroke="#7fb2e0" stroke-width="6" stroke-linecap="round"/>
<path d="M14 94 H114 Q110 122 64 122 Q18 122 14 94 Z" fill="#ffffff" stroke="#6f8796" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M22 64 C34 58 50 62 58 70 C62 76 56 80 48 78 L24 78 Z" ${SKIN}/>
<path d="M106 64 C94 58 74 62 62 70 C58 76 64 82 74 80 L104 80 Z" ${SKIN}/>
${puff(58, 60, 5)}${puff(50, 66, 4)}${puff(68, 66, 4)}
${drop(40, 84)}${drop(80, 86)}${drop(62, 88, .8)}`;

// Brushing: a green toothbrush in the mouth, with foam.
const brushing = face({ mouth: 'open', extra: `<path d="M68 82 L116 98" stroke="#3a9a6e" stroke-width="6" stroke-linecap="round"/>
<rect x="54" y="78" width="16" height="7" rx="2" fill="#ffffff" stroke="#8a9aa5" stroke-width="1.5"/>
<circle cx="106" cy="95" r="9" ${SKIN}/>
${puff(50, 88, 4)}${puff(46, 82, 3)}${puff(76, 90, 3.5)}` });

// Washing: hands at the cheeks, and splashes.
const faceWash = face({ extra: `<ellipse cx="34" cy="82" rx="9" ry="13" ${SKIN}/><ellipse cx="94" cy="82" rx="9" ry="13" ${SKIN}/>
${drop(20, 44)}${drop(108, 40)}${drop(14, 64, .8)}${drop(114, 60, .8)}${drop(64, 8, .9)}` });

const art = {
  'hei-san': svg('Sitting up in bed, stretching, in the morning', `${SKY.morning}\n${wakeUp}`),
  'caat-tooth': svg('Brushing teeth', brushing),
  'sai-min': svg('Washing a face', faceWash),
  'zoek-shirt': svg('A shirt on a hanger', hanger),
  'sik6-zou-caan': svg('Breakfast: toast and a cup of milk tea, in the morning', `${SKY.morning}
<g transform="translate(30 20) scale(.75)">${plate(toast)}</g>
<g transform="translate(-4 52) scale(.55)">${cup('#c8913a')}</g>`),
  'faan-hok': svg('Walking to school in the morning', to(school, 'morning', 'school')),
  'faan-gung': svg('Walking to work in the morning', to(office, 'morning', 'work')),
  'zou6-je': svg('A laptop on a desk', laptop),
  'sai-hand': svg('Washing hands under a tap', handWash),
  'sik6-aan': svg('Lunch: a plate of rice with meat and greens, at midday', `${SKY.midday}\n<g transform="translate(8 8) scale(.9)">${plate(lunch)}</g>`),
  'fong-hok': svg('Walking away from school in the afternoon', from(school, 'midday', 'school')),
  'fong-gung': svg('Walking away from work in the evening', from(office, 'evening', 'work')),
  'faan-home': svg('Walking home in the evening', to(home, 'evening')),
  'zyu-rice': svg('Cooking in a wok', wok),
  'sik6-maan-faan': svg('Dinner: a bowl of rice and chopsticks, at night', `${SKY.night}\n<g transform="translate(8 24) scale(.85)">${bowl(rice)}</g>\n${chopsticks}`),
  'tai-din-si': svg('Watching television', tv),
  'tai-book': svg('Reading a book', face({ extra: book })),
  'cung-loeng': svg('Having a shower', shower),
  'fan3-gaau': svg('Asleep in bed at night', `${SKY.night}\n${inBed}\n${zzz}`),
};
export default art;
