/*
 * Unit 16 illustrations: a picture for each hobby (reading and TV are
 * Unit 15's). Run `node tools/draw.mjs` after editing to rewrite
 * img/<id>.svg.
 */
import { svg, face, drop, shadow, walker } from '../tools/svg.mjs';

const SKIN = 'fill="#f2c9a0" stroke="#b07a52" stroke-width="1.5"';
const HAIR = '#3b2f2a';
const DARK = 'fill="#3a4148" stroke="#1d2226" stroke-width="2.5" stroke-linejoin="round"';

// A music note, its head at x, y.
const note = (x, y, c = '#e0a526') => `<ellipse cx="${x}" cy="${y}" rx="5" ry="4" transform="rotate(-20 ${x} ${y})" fill="${c}"/>
<path d="M${x + 4.5} ${y - 1} V${y - 18} q6 3 8 9" stroke="${c}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;

// A screen showing hills and a sun, inside x, y, w, h.
const scene = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#7fb2e0"/>
<path d="M${x} ${y + h} L${x + w * .28} ${y + h * .42} L${x + w * .48} ${y + h * .75} L${x + w * .66} ${y + h * .5} L${x + w} ${y + h} Z" fill="#3a9a6e"/>
<circle cx="${x + w * .82}" cy="${y + h * .28}" r="${h * .13}" fill="#f7d35c"/>`;

// A cinema: the screen between curtains, seen from the seats.
const seat = x => `<path d="M${x} 128 V104 Q${x} 96 ${x + 8} 96 H${x + 32} Q${x + 40} 96 ${x + 40} 104 V128 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2" stroke-linejoin="round"/>`;
const curtain = x => `<path d="M${x} 6 V76 Q${x + (x < 64 ? 14 : -14)} 70 ${x + (x < 64 ? 16 : -16)} 76 V6 Z" fill="#b8322a" stroke="#8f2a22" stroke-width="2" stroke-linejoin="round"/>`;
const cinema = `<rect x="16" y="10" width="96" height="60" ${DARK}/>
${scene(20, 14, 88, 52)}
${curtain(4)}${curtain(124)}
<path d="M2 6 H126" stroke="#8f2a22" stroke-width="5" stroke-linecap="round"/>
${seat(4)}${seat(44)}${seat(84)}
<circle cx="24" cy="90" r="12" fill="${HAIR}" stroke="#7a6558" stroke-width="1.5"/><circle cx="64" cy="88" r="12" fill="${HAIR}" stroke="#7a6558" stroke-width="1.5"/>
<path d="M94 84 L98 110 H114 L118 84 Z" fill="#ffffff" stroke="#8f2a22" stroke-width="2" stroke-linejoin="round"/>
<path d="M99 84 L101 110 M106 84 V110 M113 84 L111 110" stroke="#d6453a" stroke-width="3"/>
<circle cx="98" cy="82" r="4.5" fill="#fbe7b8" stroke="#c9a25a" stroke-width="1.2"/><circle cx="106" cy="79" r="5" fill="#fbe7b8" stroke="#c9a25a" stroke-width="1.2"/><circle cx="114" cy="82" r="4.5" fill="#fbe7b8" stroke="#c9a25a" stroke-width="1.2"/>`;

// A basketball flying at the hoop.
const hoop = `<rect x="30" y="6" width="68" height="46" rx="3" fill="#ffffff" stroke="#6f8796" stroke-width="2.5"/>
<rect x="52" y="24" width="24" height="18" fill="none" stroke="#d6453a" stroke-width="2.5"/>
<path d="M46 52 L52 76 H76 L82 52 M53 52 L57 76 M60 52 L62 76 M68 52 L66 76 M75 52 L71 76 M48 60 H80 M50 68 H78" stroke="#9fb0bb" stroke-width="1.8" fill="none" stroke-linejoin="round"/>
<path d="M42 50 H86" stroke="#e0702c" stroke-width="5" stroke-linecap="round"/>`;
const basketball = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#e0702c" stroke="#a84a18" stroke-width="2"/>
<path d="M${cx - r} ${cy} H${cx + r} M${cx} ${cy - r} V${cy + r} M${cx - r * .66} ${cy - r * .75} Q${cx - r * .1} ${cy} ${cx - r * .66} ${cy + r * .75} M${cx + r * .66} ${cy - r * .75} Q${cx + r * .1} ${cy} ${cx + r * .66} ${cy + r * .75}" stroke="#6e3210" stroke-width="2" fill="none"/>`;

// A football in front of a goal.
const pent = (cx, cy, r) => Array.from({ length: 5 }, (_, i) => {
  const a = (-90 + i * 72) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)].map(n => n.toFixed(1));
});
const football = (cx, cy, r) => {
  const inner = pent(cx, cy, r * .38), outer = pent(cx, cy, r);
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="#26323c" stroke-width="2.5"/>
<path d="${inner.map((p, i) => `M${p.join(' ')} L${outer[i].join(' ')}`).join(' ')}" stroke="#26323c" stroke-width="2"/>
<path d="M${inner.map(p => p.join(' ')).join(' L')} Z" fill="#26323c"/>`;
};
const goal = `<path d="M18 24 H110 M18 24 V92 M110 24 V92 ${[34, 50, 66, 82, 98].map(x => `M${x} 26 V92`).join(' ')} ${[40, 56, 72, 88].map(y => `M20 ${y} H108`).join(' ')}" stroke="#c9d3da" stroke-width="1.5"/>
<path d="M14 94 V20 H114 V94" stroke="#6f8796" stroke-width="7" fill="none" stroke-linejoin="round"/>
<path d="M14 94 V20 H114 V94" stroke="#ffffff" stroke-width="4" fill="none" stroke-linejoin="round"/>
<rect x="4" y="96" width="120" height="10" rx="5" fill="#8cc97a"/>`;

// A games controller under a screen with a game on it.
const games = `<rect x="32" y="6" width="64" height="40" rx="3" ${DARK}/>
<rect x="36" y="10" width="56" height="32" fill="#26323c"/>
<path d="M36 36 H92" stroke="#3a9a6e" stroke-width="4"/>
<rect x="46" y="24" width="8" height="10" fill="#e0a526"/><rect x="47" y="20" width="6" height="4" fill="#f2c9a0"/>
<circle cx="66" cy="22" r="2.5" fill="#f7d35c"/><circle cx="74" cy="22" r="2.5" fill="#f7d35c"/><circle cx="82" cy="22" r="2.5" fill="#f7d35c"/>
<path d="M24 56 C12 56 6 70 6 86 C6 104 14 112 22 112 C30 112 34 102 42 94 H86 C94 102 98 112 106 112 C114 112 122 104 122 86 C122 70 116 56 104 56 Z" fill="#5f6a72" stroke="#3a4148" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M26 68 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8 Z" fill="#26323c"/>
<circle cx="98" cy="70" r="5" fill="#3a9a6e"/><circle cx="108" cy="80" r="5" fill="#d6453a"/><circle cx="98" cy="90" r="5" fill="#3f7cc0"/><circle cx="88" cy="80" r="5" fill="#e0a526"/>
<rect x="52" y="74" width="9" height="4" rx="2" fill="#c9d3da"/><rect x="67" y="74" width="9" height="4" rx="2" fill="#c9d3da"/>`;

// Karaoke: a microphone under the words on the screen, lit as they're sung.
const karaoke = `<rect x="10" y="6" width="108" height="50" rx="4" ${DARK}/>
<path d="M22 24 H66" stroke="#f7d35c" stroke-width="5" stroke-linecap="round"/><path d="M74 24 H106" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
<path d="M30 40 H98" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
<path d="M70 90 L50 124" stroke="#5f6a72" stroke-width="10" stroke-linecap="round"/>
<circle cx="76" cy="80" r="13" fill="#c0c8d0" stroke="#5f6a72" stroke-width="2"/>
<path d="M66 74 L86 86 M64 82 L80 92 M70 69 L88 79 M70 90 L86 74 M65 84 L80 70 M76 93 L89 81" stroke="#8a9aa5" stroke-width="1.2"/>
<ellipse cx="59" cy="108" rx="9" ry="8" ${SKIN}/>
${note(24, 90)}${note(108, 104, '#3f7cc0')}`;

// Headphones on, and music.
const headphones = face({ extra: `<path d="M26 60 C20 2 108 2 102 60" stroke="#26323c" stroke-width="6" fill="none" stroke-linecap="round"/>
<rect x="17" y="46" width="17" height="28" rx="7" fill="#d6453a" stroke="#8f2a22" stroke-width="2"/>
<rect x="94" y="46" width="17" height="28" rx="7" fill="#d6453a" stroke="#8f2a22" stroke-width="2"/>
${note(10, 34)}${note(112, 40, '#3f7cc0')}` });

// Swimming: a head in a cap and goggles, and an arm reaching forward
// over the water, elbow high, into a splash.
const arm = 'M36 78 L54 38 Q58 32 64 36 L100 80';
const swim = `<path d="${arm}" stroke="#b07a52" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${arm}" stroke="#f2c9a0" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M28 80 Q36 70 46 78" fill="#3f7cc0" stroke="#24507f" stroke-width="1.5"/>
<circle cx="52" cy="70" r="13" ${SKIN}/>
<path d="M39 68 A13 13 0 0 1 65 68 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="1.5"/>
<path d="M40 71 H64" stroke="#26323c" stroke-width="2"/><ellipse cx="60" cy="71" rx="4.5" ry="3.5" fill="#3f7cc0" stroke="#26323c" stroke-width="1.5"/>
<path d="M0 74 Q8 68 16 74 T32 74 T48 74 T64 74 T80 74 T96 74 T112 74 T128 74 V120 Q64 128 0 120 Z" fill="#7fb2e0" stroke="#3f7cc0" stroke-width="2" stroke-linejoin="round"/>
<path d="M10 92 q8 -5 16 0 t16 0 M56 100 q8 -5 16 0 t16 0 M90 88 q8 -5 16 0 t16 0 M20 110 q8 -5 16 0" stroke="#bfe0f2" stroke-width="2.5" fill="none" stroke-linecap="round"/>
${drop(108, 58)}${drop(116, 66, .8)}${drop(94, 52, .7)}`;

// Hiking: a walker with a backpack below a hill trail to the top.
const tree = (x, y) => `<path d="M${x} ${y - 20} L${x + 8} ${y - 4} H${x - 8} Z" fill="#256b4a"/><path d="M${x} ${y - 4} V${y}" stroke="#7d4f1e" stroke-width="2.5"/>`;
const hike = `<path d="M0 110 L22 76 L40 88 L84 24 L128 84 V110 Z" fill="#8cc97a" stroke="#3a8a4e" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M40 104 Q76 96 62 76 T84 26" stroke="#f4e6c8" stroke-width="3" fill="none" stroke-dasharray="5 4" stroke-linecap="round"/>
<path d="M84 26 V6" stroke="#6f8796" stroke-width="2"/><path d="M84 7 H98 L94 12 L98 17 H84 Z" fill="#d6453a"/>
${tree(106, 76)}${tree(116, 88)}${tree(22, 96)}
${walker(30, 118, { bag: 'school' })}`;

// Shopping: a walker with bags between two shops.
const shop = (x, awning) => `<rect x="${x}" y="30" width="40" height="80" fill="#f4e6c8" stroke="#9c6528" stroke-width="2"/>
<rect x="${x + 6}" y="54" width="28" height="22" fill="#bfe0f2" stroke="#9c6528" stroke-width="1.5"/>
<path d="M${x - 2} 30 H${x + 42} L${x + 40} 44 H${x} Z" fill="#ffffff" stroke="${awning}" stroke-width="2" stroke-linejoin="round"/>
<path d="M${x + 6} 30 V44 M${x + 16} 30 V44 M${x + 26} 30 V44 M${x + 36} 30 V44" stroke="${awning}" stroke-width="5"/>`;
const bag = (x, y, fill, stroke) => `<path d="M${x + 3} ${y} Q${x + 8} ${y - 8} ${x + 13} ${y}" stroke="${stroke}" stroke-width="1.8" fill="none"/>
<rect x="${x}" y="${y}" width="16" height="18" rx="1.5" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const shopping = `${shop(2, '#d6453a')}${shop(86, '#3a9a6e')}
${walker(62, 118)}
${bag(66, 94, '#e0a526', '#9a6c0e')}${bag(40, 95, '#d6453a', '#8f2a22')}`;

// Dancing: arms up, one leg out, and music.
const dance = `${shadow(56, 120, 18)}
<path d="M54 40 L40 26 L32 8 M74 40 L90 30 L104 16" stroke="#f2c9a0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<circle cx="32" cy="8" r="4.5" ${SKIN}/><circle cx="104" cy="16" r="4.5" ${SKIN}/>
<path d="M59 68 L54 92 L50 114 M69 68 L84 84 L104 88" stroke="#5f6a72" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<ellipse cx="46" cy="117" rx="8" ry="4" fill="${HAIR}"/><ellipse cx="110" cy="88" rx="4" ry="7" fill="${HAIR}"/>
<path d="M52 34 H76 L78 70 H50 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="60" y="30" width="8" height="5" ${SKIN}/>
<circle cx="64" cy="20" r="11" ${SKIN}/>
<path d="M53 18 C52 8 59 7 64 7 C70 7 76 9 75 18 C72 12 58 11 53 18 Z" fill="${HAIR}"/>
<path d="M59 19 q2 -2 4 0 M65 19 q2 -2 4 0" stroke="${HAIR}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<path d="M59 24 Q64 29 69 24" stroke="#8f2a22" stroke-width="1.8" fill="none" stroke-linecap="round"/>
${note(18, 66)}${note(106, 58, '#3f7cc0')}${note(96, 118, '#3a9a6e')}`;

// A camera, flashing.
const camera = `<path d="M40 40 L46 28 H78 L84 40 Z" ${DARK}/>
<rect x="92" y="32" width="16" height="8" rx="2" fill="#d6453a" stroke="#8f2a22" stroke-width="1.5"/>
<rect x="10" y="40" width="108" height="70" rx="10" ${DARK}/>
<rect x="20" y="48" width="16" height="10" rx="2" fill="#f7e27a" stroke="#9a6c0e" stroke-width="1.5"/>
<circle cx="64" cy="76" r="26" fill="#c0c8d0" stroke="#1d2226" stroke-width="2.5"/>
<circle cx="64" cy="76" r="18" fill="#26323c"/><circle cx="64" cy="76" r="10" fill="#3f7cc0"/>
<circle cx="59" cy="71" r="4" fill="#ffffff" opacity=".8"/>
<path d="M28 34 L22 22 M18 38 L6 32 M34 30 L34 16" stroke="#e0a526" stroke-width="3" stroke-linecap="round"/>`;

// Painting: a picture on an easel, a brush, and a palette.
const painting = `<path d="M42 124 L56 70 M86 124 L72 70 M64 76 V114" stroke="#9c6528" stroke-width="5" stroke-linecap="round"/>
<rect x="28" y="10" width="72" height="60" fill="#ffffff" stroke="#9c6528" stroke-width="3"/>
${scene(33, 15, 62, 50)}
<path d="M30 76 H98" stroke="#7d4f1e" stroke-width="5" stroke-linecap="round"/>
<path d="M98 94 C92 86 106 80 116 84 C126 88 128 104 118 112 C110 118 94 114 96 106 C104 104 104 98 98 94 Z" fill="#f2cf86" stroke="#b9802c" stroke-width="2"/>
<circle cx="108" cy="92" r="3.5" fill="#d6453a"/><circle cx="118" cy="96" r="3.5" fill="#3f7cc0"/><circle cx="116" cy="106" r="3.5" fill="#3a9a6e"/><circle cx="106" cy="108" r="3" fill="#f7d35c"/>
<path d="M8 120 L24 92" stroke="#9c6528" stroke-width="4" stroke-linecap="round"/>
<path d="M22 95 L26 88" stroke="#9aa3aa" stroke-width="5"/><path d="M25 89 L30 80 L28 88 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="1.5" stroke-linejoin="round"/>`;

// A bicycle, moving right.
const wheel = cx => `<circle cx="${cx}" cy="88" r="22" fill="none" stroke="#3a4148" stroke-width="5"/><circle cx="${cx}" cy="88" r="19" fill="none" stroke="#c0c8d0" stroke-width="1.5"/>
<path d="M${cx - 20} 88 H${cx + 20} M${cx} 68 V108 M${cx - 14} 74 L${cx + 14} 102 M${cx + 14} 74 L${cx - 14} 102" stroke="#9aa3aa" stroke-width="1.2"/>
<circle cx="${cx}" cy="88" r="3" fill="#5f6a72"/>`;
const bike = `${shadow(64, 113, 50)}
${wheel(32)}${wheel(96)}
<path d="M32 88 H58 L50 56 Z M50 56 H84 L58 88 M84 50 L96 88" stroke="#d6453a" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round" fill="none"/>
<path d="M50 56 L48 48" stroke="#26323c" stroke-width="3.5"/><path d="M40 46 H56" stroke="#26323c" stroke-width="6" stroke-linecap="round"/>
<path d="M84 50 L82 42 H94" stroke="#26323c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<circle cx="58" cy="88" r="6" fill="#9aa3aa" stroke="#5f6a72" stroke-width="1.5"/><path d="M58 88 L66 98" stroke="#5f6a72" stroke-width="3"/><path d="M62 99 H71" stroke="#26323c" stroke-width="4" stroke-linecap="round"/>
<path d="M4 70 H14 M2 82 H10 M6 94 H14" stroke="#9fb0bb" stroke-width="2.5" stroke-linecap="round"/>`;

const art = {
  'tai-hei3': svg('At the cinema, facing the screen', cinema),
  'daa-ball': svg('A basketball and a hoop', `${hoop}\n${basketball(38, 98, 18)}\n<path d="M52 84 Q60 72 62 60" stroke="#9fb0bb" stroke-width="2.5" fill="none" stroke-dasharray="4 4" stroke-linecap="round"/>`),
  'tek-ball': svg('A football going into a goal', `${goal}\n${football(64, 100, 17)}\n<path d="M36 112 L22 116 M38 102 H22 M36 92 L22 88" stroke="#9fb0bb" stroke-width="2.5" stroke-linecap="round"/>`),
  'daa-gei1': svg('A video game controller and a game on a screen', games),
  'coeng-kei': svg('Karaoke: a microphone and the words on the screen', karaoke),
  'teng-go1': svg('Listening to music on headphones', headphones),
  'jau4-water': svg('Swimming', swim),
  'haang-saan': svg('Hiking up a hill', hike),
  'haang-street': svg('Out shopping, with bags, between two shops', shopping),
  'tiu3-mou5': svg('Dancing', dance),
  'jing-soeng2': svg('A camera taking a photo', camera),
  'waak-waa': svg('A painting on an easel, a brush and a palette', painting),
  'caai-daan-ce': svg('A bicycle', bike),
};
export default art;
