/*
 * The dictionary's pictures: the drawing of every word with one, in
 * sections by the unit that teaches it, as in words.js. Each section is
 * a function, so its helpers (shadow, steam...) stay its own; one whose
 * unit draws its phrases with the same helpers (unit 14's aches with the
 * body parts) returns those helpers too, and the unit's art.mjs imports
 * them. Built from tools/svg.mjs parts; run `node tools/draw.mjs` after
 * editing to rewrite words/img/<id>.svg.
 */
import { svg, bowl, car, cup, teacup, teapot, bubble, arm, ring, floor, person, LINE, ball, plane, steamer, plate, pineappleBun, house, arrow, face, figure, inBed, zzz, drop, puff, shadow } from '../tools/svg.mjs';
import { loadVocab, entries } from '../tools/site.mjs';

// Unit 1 · Sounds & Tones 聲調
const unit1 = (() => {
return {
  art: {
  fish: svg('Fish', `<path d="M96 64 L122 40 L118 64 L122 88 Z" fill="#e8773a" stroke="#b5521f" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="60" cy="64" rx="44" ry="26" fill="#f39a4a" stroke="#b5521f" stroke-width="2.5"/>
<path d="M50 40 Q64 26 80 42" fill="#e8773a" stroke="#b5521f" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M58 72 Q66 84 76 76" fill="#e8773a" stroke="#b5521f" stroke-width="2"/>
<path d="M38 44 Q30 64 38 84" fill="none" stroke="#b5521f" stroke-width="2.5"/>
<path d="M54 56 q6 -4 12 0 M64 50 q6 -4 12 0 M64 62 q6 -4 12 0 M74 56 q6 -4 12 0" fill="none" stroke="#fbc98c" stroke-width="2" stroke-linecap="round"/>
<circle cx="28" cy="58" r="5" fill="#ffffff"/><circle cx="27" cy="58" r="2.8" fill="#2a211b"/>
<path d="M17 70 q4 3 8 0" fill="none" stroke="#b5521f" stroke-width="2" stroke-linecap="round"/>`),

  cow: svg('Cow', `<path d="M36 34 C26 28 22 18 26 12 C30 20 38 24 44 26 Z" fill="#efe2c8" stroke="#8a7a66" stroke-width="2" stroke-linejoin="round"/>
<path d="M92 34 C102 28 106 18 102 12 C98 20 90 24 84 26 Z" fill="#efe2c8" stroke="#8a7a66" stroke-width="2" stroke-linejoin="round"/>
<ellipse cx="22" cy="48" rx="16" ry="8" transform="rotate(-20 22 48)" fill="#ffffff" stroke="#3a2f28" stroke-width="2.5"/>
<ellipse cx="106" cy="48" rx="16" ry="8" transform="rotate(20 106 48)" fill="#ffffff" stroke="#3a2f28" stroke-width="2.5"/>
<path d="M36 30 C36 20 92 20 92 30 L96 80 C96 92 32 92 32 80 Z" fill="#ffffff" stroke="#3a2f28" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M40 28 C50 24 58 30 56 40 C54 50 42 50 38 44 Z" fill="#3a2f28"/>
<path d="M92 50 C84 48 80 56 84 62 C88 66 94 62 94 58 Z" fill="#3a2f28"/>
<circle cx="50" cy="56" r="4" fill="#2a211b"/><circle cx="78" cy="56" r="4" fill="#2a211b"/>
<ellipse cx="64" cy="90" rx="30" ry="20" fill="#f2b3b0" stroke="#3a2f28" stroke-width="2.5"/>
<ellipse cx="54" cy="90" rx="4" ry="6" fill="#b86b67"/><ellipse cx="74" cy="90" rx="4" ry="6" fill="#b86b67"/>`),

  congee: svg('Congee (rice porridge)', bowl(`<ellipse cx="64" cy="61" rx="44" ry="9" fill="#f3ecdc"/>
<ellipse cx="52" cy="59" rx="14" ry="3" fill="#ffffff" opacity=".8"/>
<path d="M60 58 h6 M74 62 h6 M44 63 h6 M84 57 h5 M68 65 h5" stroke="#5c9e46" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="80" cy="60" rx="6" ry="3" fill="#e8b04c"/>
<path d="M92 60 L118 22" stroke="#2e5a88" stroke-width="6" stroke-linecap="round"/>
<path d="M92 60 L118 22" stroke="#fbf8f1" stroke-width="3" stroke-linecap="round"/>`)),

  car: svg('Car', car),

  water: svg('A glass of water', `${cup('#8cc8ea', { glass: true })}
<circle cx="72" cy="80" r="3" fill="#ffffff" opacity=".7"/><circle cx="78" cy="64" r="2" fill="#ffffff" opacity=".7"/>`),

  chicken: svg('Chicken', `<path d="M44 104 V116 M40 116 H50 M70 104 V116 M66 116 H76" stroke="#e8923a" stroke-width="3.5" stroke-linecap="round"/>
<path d="M100 38 C112 44 116 60 108 74 C116 66 122 52 114 40 C110 34 104 34 100 38 Z" fill="#d6453a"/>
<path d="M30 42 C18 44 14 60 20 76 C28 98 52 108 74 104 C96 100 110 86 108 66 C106 54 100 48 94 50 C84 54 72 62 56 58 C50 56 48 44 42 40 Z" fill="#fbf8f1" stroke="#8a7a66" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M58 72 C66 86 84 88 94 76 C86 80 72 78 64 68 Z" fill="#efe2c8" stroke="#8a7a66" stroke-width="2" stroke-linejoin="round"/>
<path d="M26 30 C26 22 32 18 36 22 C38 16 46 16 46 24 C50 22 54 28 48 34 C44 38 30 38 26 30 Z" fill="#d6453a"/>
<path d="M18 46 L6 50 L18 54 Z" fill="#f2a93b" stroke="#c77a1e" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M20 56 C18 64 24 68 28 62 Z" fill="#d6453a"/>
<circle cx="30" cy="46" r="3" fill="#2a211b"/>`),
  },
};
})();

// Unit 2 · Greetings 打招呼
const unit2 = (() => {
return {
  art: {
  'good-morning': svg('Sunrise (good morning)', `<path d="M8 92 H120" stroke="#6f8796" stroke-width="3" stroke-linecap="round"/>
<path d="M28 92 A36 36 0 0 1 100 92 Z" fill="#f7b538" stroke="#d98c1a" stroke-width="3" stroke-linejoin="round"/>
<path d="M64 46 V30 M36 58 L26 48 M92 58 L102 48 M24 80 H10 M104 80 H118" stroke="#f2a93b" stroke-width="5" stroke-linecap="round"/>
<path d="M24 104 H56 M72 104 H104 M40 114 H88" stroke="#8cc8ea" stroke-width="4" stroke-linecap="round"/>`),

  'good-night': svg('Moon and stars (good night)', `<path d="M78 18 A44 44 0 1 0 110 90 A36 36 0 1 1 78 18 Z" fill="#f4d774" stroke="#c9a53a" stroke-width="3" stroke-linejoin="round"/>
<path d="M98 20 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 Z" fill="#f4d774" stroke="#c9a53a" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M112 52 l2 4 4 .5 -3 3 .8 4 -3.8 -2 -3.8 2 .8 -4 -3 -3 4 -.5 Z" fill="#f4d774" stroke="#c9a53a" stroke-width="1.2" stroke-linejoin="round"/>`),

  bye: svg('A waving hand (bye-bye)', `<path d="M44 112 C34 98 30 84 30 72 L30 52 C30 46 38 46 38 52 L38 70 L40 70 L40 30 C40 23 49 23 49 30 L49 64 L52 64 L52 22 C52 15 61 15 61 22 L61 64 L64 64 L64 28 C64 21 73 21 73 28 L73 70 L76 70 L76 44 C76 37 85 37 85 44 L85 82 C85 96 78 106 72 112 Z" fill="#f2c9a0" stroke="#b07a52" stroke-width="3" stroke-linejoin="round"/>
<path d="M98 30 q10 12 0 26 M108 22 q14 18 0 40" stroke="#6f9bc6" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M22 34 q-8 10 0 22" stroke="#6f9bc6" stroke-width="4" fill="none" stroke-linecap="round"/>`),

  'm-goi': svg('Tea being poured (唔該: thanks for the service)', `<g transform="translate(2 -10) scale(.8) rotate(24 56 80)">
${teapot()}
</g>
<path d="M100 53 Q105 76 104 100" stroke="#c8913a" stroke-width="4" fill="none" stroke-linecap="round"/>
${teacup()}`),

  thanks: svg('A present (多謝: thanks for the gift)', `<rect x="22" y="56" width="84" height="58" rx="4" fill="#d6453a" stroke="#8f2a22" stroke-width="3"/>
<rect x="16" y="42" width="96" height="18" rx="4" fill="#e45a4d" stroke="#8f2a22" stroke-width="3"/>
<rect x="57" y="42" width="14" height="72" fill="#f7d35c" stroke="#c9a53a" stroke-width="2"/>
<path d="M64 42 C50 22 30 24 36 36 C40 44 56 44 64 42 C72 44 88 44 92 36 C98 24 78 22 64 42 Z" fill="#f7d35c" stroke="#c9a53a" stroke-width="2.5" stroke-linejoin="round"/>`),

  sorry: svg('A knocked-over drink (對唔住: sorry)', `<path d="M20 104 C30 96 56 98 70 102 C86 106 108 100 116 108 C104 116 40 118 20 104 Z" fill="#c8913a" opacity=".8"/>
<g transform="translate(0 14) rotate(-80 64 84)">
<path d="M46 56 L50 104 C50 108 78 108 78 104 L82 56 Z" fill="#fbf8f1" stroke="#6f8796" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="64" cy="56" rx="18" ry="5" fill="#c8913a" stroke="#6f8796" stroke-width="3"/>
</g>
<path d="M88 34 l6 -10 M100 40 l10 -6 M80 30 l0 -12" stroke="#d6453a" stroke-width="4" stroke-linecap="round"/>`),
  },
};
})();

// Unit 3 · Me & You 我同你
const unit3 = (() => {
// Where each person stands: [x, y, scale]. The plurals add a partner.
const AT = {
  speaker: [[26, 80, 1]], listener: [[102, 82, 1]], third: [[76, 36, 0.8]],
  speakers: [[24, 80, 1], [54, 86, 0.9]], listeners: [[84, 88, 0.9], [110, 82, 0.9]], thirds: [[64, 36, 0.75], [94, 36, 0.75]],
};
const COLOUR = { speaker: 'red', listener: 'blue', third: 'green' };
// The speaker's pointing arm, from the right shoulder: at their own chest,
// across at the listener(s), or up at the others behind.
const POINT = {
  speaker: [[[38, 102], [46, 116], [32, 108]], [-1, -0.4]],
  listener: [[[38, 102], [52, 104], [62, 100]], [1, -0.15]],
  third: [[[38, 102], [48, 92], [54, 80]], [0.6, -1]],
};
// A child seen from behind: shoulders in a white school shirt, the back of the head.
const backOf = (x, y) => `<path d="M${x - 17} ${y + 24} V${y + 30} H${x + 17} V${y + 24} C${x + 17} ${y + 14} ${x + 10} ${y + 10} ${x} ${y + 10} C${x - 10} ${y + 10} ${x - 17} ${y + 14} ${x - 17} ${y + 24} Z" fill="#f7f5ef" stroke="#8a9aa5" ${LINE}/>
<circle cx="${x}" cy="${y}" r="11" fill="#3b2f2a"/>`;
// The ring's box around the people at `places`.
const around = places => {
  const xs = places.flatMap(([x, , s]) => [x - 22 * s, x + 22 * s]), ys = places.flatMap(([, y, s]) => [y - 23 * s, y + 46 * s]);
  return ring(Math.max(2, Math.min(...xs)), Math.max(2, Math.min(...ys)), Math.min(126, Math.max(...xs)), Math.min(126, Math.max(...ys)));
};
// The scene with `who` ("speaker"...; plural for a group) ringed.
function scene(who) {
  const role = who.replace(/s$/, '');
  const roles = ['third', 'listener', 'speaker'].map(r => r === role ? who : r);
  const draw = r => AT[r].map(([x, y, s]) =>
    person(x, y, r === who || r === 'speaker' ? COLOUR[r.replace(/s$/, '')] : null, s)).join('\n');
  const [path, finger] = POINT[role];
  // The ring goes over the grey people and under the ones it marks; the
  // speaker (the first of AT.speakers) is always in colour, their arm on top.
  const others = roles.filter(r => r !== who);
  return [floor, ...others.map(draw), around(AT[who]), draw(who), arm(path, 'red', 1, { finger }), bubble(30, 60)].join('\n');
}
return {
  art: {
  ngo: svg('我: the speaker, pointing at themself', scene('speaker')),
  nei: svg('你: the person being spoken to, pointed at', scene('listener')),
  keoi: svg('佢: someone else, pointed at', scene('third')),
  'ngo-dei': svg('我哋: the speaker and a friend, ringed together', scene('speakers')),
  'nei-dei': svg('你哋: the people being spoken to, ringed together', scene('listeners')),
  'keoi-dei': svg('佢哋: two other people, ringed together', scene('thirds')),

  'lou-si': svg('A teacher with glasses pointing at the blackboard, children watching', `<rect x="54" y="8" width="70" height="52" rx="3" fill="#2f5d4a" stroke="#7d4f1e" stroke-width="4"/>
<path d="M64 24 H84 M92 24 H112 M64 38 H100" stroke="#eef3f6" stroke-width="3" stroke-linecap="round"/>
${person(32, 46, 'purple', 1.15, { hair: 'bun' })}
<g transform="translate(32 46) scale(1.15)" fill="none" stroke="#3b2f2a" stroke-width="1.8"><circle cx="-5" cy="1" r="3.8"/><circle cx="5" cy="1" r="3.8"/><path d="M-1.2 1 H1.2"/></g>
<path d="M60 64 L88 34" stroke="#7d4f1e" stroke-width="3" stroke-linecap="round"/>
${arm([[48, 76], [56, 82], [60, 64]], 'purple', 1.15)}
${[24, 64, 104].map(x => backOf(x, 104)).join('\n')}`),

  'hok-saang': svg('A student in school uniform at a desk, hand up', `${person(56, 46, 'white', 1.3)}
<path d="M56 66 L52 72 L56 92 L60 72 Z" fill="#24507f" stroke="#1b3c60" stroke-width="1.5" stroke-linejoin="round"/>
${arm([[74, 78], [86, 62], [88, 36]], 'white', 1.3)}
<rect x="10" y="92" width="108" height="10" rx="2" fill="#b07a42" stroke="#7d4f1e" ${LINE}/>
<path d="M18 102 V124 M110 102 V124" stroke="#7d4f1e" stroke-width="5" stroke-linecap="round"/>
<path d="M26 92 L42 86 L58 92 L74 86 L90 92 Z" fill="#ffffff" stroke="#8a9aa5" stroke-width="2" stroke-linejoin="round"/>
<path d="M58 86 V92" stroke="#8a9aa5" stroke-width="2"/>`),

  'pang-jau': svg('Two friends giving each other a high five', `${person(36, 68, 'orange', 1.15, { hair: 'long' })}
${person(92, 68, 'purple', 1.15)}
${arm([[50, 94], [60, 80], [61, 56]], 'orange', 1.15)}
${arm([[78, 94], [68, 80], [67, 56]], 'purple', 1.15)}
<path d="M64 42 V32 M55 44 L50 36 M73 44 L78 36" stroke="#e0a526" stroke-width="3" stroke-linecap="round"/>`),

  'hoeng-gong-jan': svg('A person in front of the Hong Kong skyline', `<path d="M4 90 V56 H16 V70 H26 V40 H36 V70 H44 V20 L50 12 L56 20 V70 H66 V46 L74 38 L82 46 V70 H92 V30 H104 V70 H112 V58 H124 V90 Z" fill="#9fb0bb"/>
<path d="M4 94 C24 88 40 98 64 92 C88 86 104 96 124 90" stroke="#6f9bc6" stroke-width="4" fill="none" stroke-linecap="round"/>
${person(64, 76, 'red', 1.1)}`),
  },
};
})();

// Unit 5 · Measure Words 量詞
const unit5 = (() => {
const shadow = (rx = 40, cy = 114) => `<ellipse cx="64" cy="${cy}" rx="${rx}" ry="5" fill="#9fb0bb" opacity=".35"/>`;
const steam = `<path d="M50 34 c-4 -6 4 -10 0 -16 M64 30 c-4 -6 4 -10 0 -16 M78 34 c-4 -6 4 -10 0 -16" stroke="#9fb0bb" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
return {
  art: {
  // 個
  apple: svg('Apple', `${shadow(34)}
<path d="M64 42 C52 32 26 34 24 62 C22 90 42 114 56 112 C60 111 62 109 64 109 C66 109 68 111 72 112 C86 114 106 90 104 62 C102 34 76 32 64 42Z" fill="#e0342b" stroke="#a51f18" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 56 C37 64 37 72 41 80" stroke="#f47a6f" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M64 42 C64 32 66 24 70 18" stroke="#6b4423" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M68 28 C76 16 92 16 96 22 C88 32 76 32 68 28Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2" stroke-linejoin="round"/>`),

  ball: svg('Ball (a basketball)', `${shadow(32, 116)}
${ball(64, 66, 44)}`),

  // 隻
  cat: svg('Cat', `${shadow(36)}
<path d="M88 106 C110 106 114 84 104 76" stroke="#a85f1c" stroke-width="11" fill="none" stroke-linecap="round"/>
<path d="M88 106 C110 106 114 84 104 76" stroke="#f0a04b" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M36 112 C32 90 40 72 64 72 C88 72 96 90 92 112 Z" fill="#f0a04b" stroke="#a85f1c" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="64" cy="98" rx="14" ry="12" fill="#f9d3a3"/>
<path d="M54 112 v-10 M74 112 v-10" stroke="#a85f1c" stroke-width="2.5" stroke-linecap="round"/>
<path d="M40 44 L42 16 L62 32 Z M88 44 L86 16 L66 32 Z" fill="#f0a04b" stroke="#a85f1c" stroke-width="3" stroke-linejoin="round"/>
<path d="M45 36 L46 24 L55 31Z M83 36 L82 24 L73 31Z" fill="#f6b7a6"/>
<ellipse cx="64" cy="52" rx="28" ry="24" fill="#f0a04b" stroke="#a85f1c" stroke-width="3"/>
<path d="M58 30 l2 8 M64 29 v9 M70 30 l-2 8" stroke="#c7701f" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="53" cy="51" rx="4" ry="5" fill="#2a2a2a"/><ellipse cx="75" cy="51" rx="4" ry="5" fill="#2a2a2a"/>
<path d="M60 59 h8 l-4 4z" fill="#e0707a"/>
<path d="M64 63 q-4 5 -8 2 M64 63 q4 5 8 2" stroke="#6b3a14" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M44 58 l-16 -3 M44 63 l-16 2 M84 58 l16 -3 M84 63 l16 2" stroke="#6b3a14" stroke-width="1.5" stroke-linecap="round"/>`),

  dog: svg('Dog', `${shadow(36)}
<path d="M90 100 C104 96 108 84 112 74" stroke="#7a4a24" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M36 112 C32 90 40 72 64 72 C88 72 96 90 92 112 Z" fill="#c8915a" stroke="#7a4a24" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="64" cy="98" rx="14" ry="12" fill="#f1d6b0"/>
<path d="M54 112 v-10 M74 112 v-10" stroke="#7a4a24" stroke-width="2.5" stroke-linecap="round"/>
<ellipse cx="64" cy="52" rx="26" ry="24" fill="#c8915a" stroke="#7a4a24" stroke-width="3"/>
<path d="M42 34 C28 32 22 58 30 72 C40 72 44 58 46 44Z" fill="#7a4a24"/>
<path d="M86 34 C100 32 106 58 98 72 C88 72 84 58 82 44Z" fill="#7a4a24"/>
<ellipse cx="64" cy="64" rx="14" ry="10" fill="#f1d6b0"/>
<circle cx="54" cy="48" r="3.5" fill="#2a1a12"/><circle cx="74" cy="48" r="3.5" fill="#2a1a12"/>
<ellipse cx="64" cy="59" rx="6" ry="4" fill="#2a1a12"/>
<path d="M64 63 v4 M64 67 q-5 4 -9 1 M64 67 q5 4 9 1" stroke="#2a1a12" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M60 70 q4 9 8 0z" fill="#e0707a"/>`),

  // 本
  book: svg('Book', `${shadow(38)}
<rect x="32" y="18" width="70" height="92" rx="4" fill="#fbf8f1" stroke="#9fb0bb" stroke-width="2"/>
<path d="M40 104 H98 M40 100 H98" stroke="#d8dee3" stroke-width="1.5"/>
<rect x="24" y="12" width="70" height="92" rx="4" fill="#c0392b" stroke="#7d1f18" stroke-width="3"/>
<path d="M36 13 V103" stroke="#7d1f18" stroke-width="3"/>
<rect x="46" y="30" width="38" height="20" rx="2" fill="#f5d27a"/>
<path d="M51 37 h28 M51 43 h20" stroke="#a5661f" stroke-width="2.5" stroke-linecap="round"/>`),

  // 張
  paper: svg('A sheet of paper', `${shadow(36, 116)}
<path d="M30 14 H82 L100 32 V114 H30 Z" fill="#ffffff" stroke="#9fb0bb" stroke-width="3" stroke-linejoin="round"/>
<path d="M82 14 V32 H100 Z" fill="#e3eaef" stroke="#9fb0bb" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 48 H90 M40 60 H90 M40 72 H90 M40 84 H90 M40 96 H74" stroke="#9cc3e0" stroke-width="2.5" stroke-linecap="round"/>`),

  table: svg('Table', `${shadow(52, 114)}
<rect x="36" y="50" width="8" height="46" fill="#8f5632" stroke="#5e3515" stroke-width="3"/>
<rect x="106" y="46" width="8" height="46" fill="#8f5632" stroke="#5e3515" stroke-width="3"/>
<path d="M10 52 L30 36 H118 L98 52 Z" fill="#d49a5a" stroke="#5e3515" stroke-width="3" stroke-linejoin="round"/>
<path d="M30 45 H104" stroke="#e7b77e" stroke-width="2.5" stroke-linecap="round"/>
<path d="M10 52 H98 V62 H10 Z" fill="#a8683a" stroke="#5e3515" stroke-width="3" stroke-linejoin="round"/>
<path d="M98 52 L118 36 V46 L98 62 Z" fill="#8f5632" stroke="#5e3515" stroke-width="3" stroke-linejoin="round"/>
<rect x="15" y="62" width="9" height="50" fill="#a8683a" stroke="#5e3515" stroke-width="3"/>
<rect x="84" y="62" width="9" height="50" fill="#a8683a" stroke="#5e3515" stroke-width="3"/>`),

  // 條
  trousers: svg('Trousers', `<path d="M36 16 H92 L102 112 H74 L64 48 L54 112 H26 Z" fill="#3d6aa8" stroke="#22406b" stroke-width="3" stroke-linejoin="round"/>
<path d="M36 16 H92 V27 H36 Z" fill="#335a91" stroke="#22406b" stroke-width="3" stroke-linejoin="round"/>
<path d="M64 27 V46" stroke="#22406b" stroke-width="2.5"/>
<circle cx="64" cy="21.5" r="2.5" fill="#e0b64a"/>
<path d="M40 34 q8 5 15 -1 M88 34 q-8 5 -15 -1" stroke="#8fb0dc" stroke-width="2" fill="none"/>
<path d="M29 104 H53 M75 104 H99" stroke="#8fb0dc" stroke-width="2" stroke-dasharray="4 3"/>`),

  // 枝
  pen: svg('Pen', `<g transform="rotate(-45 64 64)">
<path d="M30 56 L12 64 L30 72 Z" fill="#d7dde2" stroke="#4a5560" stroke-width="3" stroke-linejoin="round"/>
<circle cx="13" cy="64" r="2" fill="#1b4586"/>
<rect x="30" y="55" width="68" height="18" rx="3" fill="#2e6fd1" stroke="#1b4586" stroke-width="3"/>
<path d="M36 60 H90" stroke="#6fa0ea" stroke-width="3" stroke-linecap="round"/>
<rect x="96" y="54" width="20" height="20" rx="4" fill="#1b4586"/>
<rect x="66" y="48" width="44" height="6" rx="3" fill="#c0c8d0" stroke="#7d8a96" stroke-width="1.5"/>
</g>`),

  flower: svg('Flower', `<path d="M64 52 C62 78 66 96 64 118" stroke="#3f7a22" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M64 98 C50 86 36 90 32 98 C42 106 56 104 64 98Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2" stroke-linejoin="round"/>
<path d="M65 84 C78 72 92 76 96 84 C86 92 72 90 65 84Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2" stroke-linejoin="round"/>
<g fill="#e84a7f" stroke="#a82356" stroke-width="2">
<ellipse cx="64" cy="27" rx="11" ry="14"/>
<ellipse cx="64" cy="27" rx="11" ry="14" transform="rotate(72 64 42)"/>
<ellipse cx="64" cy="27" rx="11" ry="14" transform="rotate(144 64 42)"/>
<ellipse cx="64" cy="27" rx="11" ry="14" transform="rotate(216 64 42)"/>
<ellipse cx="64" cy="27" rx="11" ry="14" transform="rotate(288 64 42)"/>
</g>
<circle cx="64" cy="42" r="9" fill="#f5c542" stroke="#c7951a" stroke-width="2"/>`),

  // 架
  plane: svg('Plane', plane),

  // 件
  shirt: svg('Shirt (a T-shirt)', `<path d="M44 16 C50 24 78 24 84 16 L112 30 L102 52 L90 46 V112 H38 V46 L26 52 L16 30 Z" fill="#2fa36b" stroke="#1d6b45" stroke-width="3" stroke-linejoin="round"/>
<path d="M44 16 C50 28 78 28 84 16" fill="none" stroke="#1d6b45" stroke-width="3"/>
<path d="M38 46 L34 40 M90 46 L94 40" stroke="#1d6b45" stroke-width="2.5" stroke-linecap="round"/>
<rect x="70" y="44" width="12" height="13" rx="2" fill="none" stroke="#1d6b45" stroke-width="2.5"/>`),

  cake: svg('A piece of cake', `${shadow(50, 106)}
<path d="M18 64 L112 58 V94 L18 100 Z" fill="#f2cf86" stroke="#b9802c" stroke-width="3" stroke-linejoin="round"/>
<path d="M21 76 L109 70.5 M21 88 L109 82.5" stroke="#fff4e0" stroke-width="5"/>
<path d="M21 81 L109 75.5" stroke="#e8667a" stroke-width="2.5"/>
<path d="M18 64 L90 40 C100 44 108 50 112 58 Z" fill="#fff4e0" stroke="#b9802c" stroke-width="3" stroke-linejoin="round"/>
<path d="M88 44 C82 34 90 26 96 30 C102 26 108 36 100 44 Z" fill="#e0342b" stroke="#a51f18" stroke-width="2" stroke-linejoin="round"/>
<path d="M90 30 l6 -6 l6 6 M96 24 v5" stroke="#3f7a22" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g fill="#f7d36b"><circle cx="92" cy="37" r="1"/><circle cx="98" cy="35" r="1"/><circle cx="96" cy="40" r="1"/></g>`),

  // 杯
  tea: svg('A cup of tea', `${steam}
${cup('#b5732e')}`),

  // 碗
  rice: svg('A bowl of rice', bowl(`<path d="M20 60 C24 34 104 34 108 60 C90 68 38 68 20 60Z" fill="#fdfcf7" stroke="#d8d2c0" stroke-width="2"/>
<g fill="#ece5d2"><ellipse cx="44" cy="50" rx="3" ry="1.5"/><ellipse cx="58" cy="44" rx="3" ry="1.5"/><ellipse cx="72" cy="46" rx="3" ry="1.5"/><ellipse cx="86" cy="52" rx="3" ry="1.5"/><ellipse cx="64" cy="54" rx="3" ry="1.5"/><ellipse cx="52" cy="58" rx="3" ry="1.5"/><ellipse cx="78" cy="58" rx="3" ry="1.5"/><ellipse cx="96" cy="58" rx="3" ry="1.5"/><ellipse cx="34" cy="57" rx="3" ry="1.5"/></g>`)),

  noodles: svg('A bowl of noodles', bowl(`<ellipse cx="64" cy="60" rx="46" ry="10" fill="#e0a95a"/>
<path d="M30 56 q5 -5 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" stroke="#f7d774" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path d="M24 61 q5 -5 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" stroke="#f7d774" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path d="M36 66 q5 -5 10 0 t10 0 t10 0 t10 0 t10 0 t10 0" stroke="#f7d774" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path d="M76 52 l16 -2 l2 8 l-16 2z" fill="#c0392b" stroke="#8f1d17" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M50 58 h5 M42 63 h5 M62 64 h5 M84 62 h5" stroke="#5c9e46" stroke-width="3" stroke-linecap="round"/>`)),

  // 對
  shoes: svg('A pair of shoes', `<defs><g id="s">
<path d="M-38 10 V-4 C-38 -12 -32 -16 -24 -16 C-18 -16 -14 -10 -6 -8 L16 -2 C28 0 36 4 36 10 Z" fill="#e0342b" stroke="#8f1d17" stroke-width="3" stroke-linejoin="round"/>
<path d="M-40 10 H38 V16 C38 18 36 20 34 20 H-36 C-38 20 -40 18 -40 16 Z" fill="#ffffff" stroke="#8f1d17" stroke-width="3" stroke-linejoin="round"/>
<path d="M-14 -8 l4 -6 M-6 -6 l4 -6 M2 -4 l4 -6" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
</g></defs>
${shadow(46, 112)}
<use href="#s" transform="translate(52 56)"/>
<use href="#s" transform="translate(72 88)"/>`),

  chopsticks: svg('A pair of chopsticks', `${shadow(40, 112)}
<path d="M19 99 L101 13 L107 19 L21 101 Z" fill="#c98a5e" stroke="#6b4423" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M33 107 L109 27 L115 33 L35 109 Z" fill="#c98a5e" stroke="#6b4423" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M92 22 l6 6 M100 36 l6 6" stroke="#c0392b" stroke-width="5"/>`),
  },
};
})();

// Unit 6 · Money & Shopping 買嘢. Its own drawings (unit6/art.mjs) use shadow too.
export const unit6 = (() => {
const shadow = (rx = 40, cy = 114) => `<ellipse cx="64" cy="${cy}" rx="${rx}" ry="5" fill="#9fb0bb" opacity=".35"/>`;
return {
  art: {
  orange: svg('Orange', `${shadow(36)}
<circle cx="64" cy="70" r="42" fill="#f39422" stroke="#b5650c" stroke-width="3"/>
<path d="M40 52 C36 60 36 70 39 78" stroke="#f9c27a" stroke-width="5" fill="none" stroke-linecap="round"/>
<g fill="#d9780f"><circle cx="80" cy="60" r="1.6"/><circle cx="90" cy="76" r="1.6"/><circle cx="72" cy="90" r="1.6"/><circle cx="54" cy="96" r="1.6"/><circle cx="86" cy="94" r="1.6"/></g>
<circle cx="64" cy="30" r="3.5" fill="#6b4423"/>
<path d="M66 29 C74 16 90 16 94 22 C86 32 74 32 66 29Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2" stroke-linejoin="round"/>`),

  egg: svg('Egg', `${shadow(28, 114)}
<path d="M64 18 C88 18 100 58 100 78 C100 100 84 112 64 112 C44 112 28 100 28 78 C28 58 40 18 64 18Z" fill="#f2dcbc" stroke="#b08a5c" stroke-width="3"/>
<path d="M46 50 C42 58 40 68 41 76" stroke="#fbf1e2" stroke-width="6" fill="none" stroke-linecap="round"/>`),

  watermelon: svg('Watermelon', `${shadow(50, 112)}
<ellipse cx="64" cy="70" rx="54" ry="38" fill="#3f9a3a" stroke="#1f5e22" stroke-width="3"/>
<path d="M22 58 q8 6 0 12 q-8 6 0 12 M40 38 q8 10 0 20 q-8 10 0 20 q8 10 0 20 M64 32 q8 12 0 24 q-8 12 0 24 q8 12 0 24 M88 38 q8 10 0 20 q-8 10 0 20 q8 10 0 20 M106 58 q8 6 0 12 q-8 6 0 12" stroke="#1f6b24" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M30 52 C36 44 46 40 54 38" stroke="#9fd48a" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M64 32 C64 26 68 22 72 20" stroke="#6b4423" stroke-width="4" fill="none" stroke-linecap="round"/>`),

  bread: svg('Bread roll', `${shadow(46, 108)}
<path d="M14 98 C10 60 36 34 64 34 C92 34 118 60 114 98 C114 104 14 104 14 98Z" fill="#d98d3e" stroke="#8f5320" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 76 C30 58 46 44 64 42 C82 44 98 58 100 76 C84 70 44 70 28 76Z" fill="#eab06a"/>
<path d="M42 56 l10 14 M60 48 l6 18 M80 52 l-2 16" stroke="#a8622a" stroke-width="3" stroke-linecap="round"/>`),
  },
  shadow,
};
})();

// Unit 7 · Dim Sum 點心
const unit7 = (() => {
// Fried rice heaped in a dome, as Hong Kong restaurants serve it: separate
// grains all over (so it can't pass for an omelette), with egg, char siu,
// shrimp, peas and spring onion on top.
function friedRice() {
  const inDome = (x, y) => ((x - 64) / 40) ** 2 + ((y - 92) / 54) ** 2 < 0.88 && y < 98;
  const grains = [];
  for (let y = 42, row = 0; y <= 96; y += 4.2, row++) {
    for (let x = 22 + (row % 2) * 3.5; x <= 106; x += 7) {
      const jx = x + 2 * Math.sin(x * 7.3 + y), jy = y + 1.2 * Math.cos(x * 3.1 + y * 5);
      if (inDome(jx, jy)) grains.push(`<ellipse cx="${jx.toFixed(1)}" cy="${jy.toFixed(1)}" rx="3.3" ry="1.6" transform="rotate(${Math.round(60 * Math.sin(x * 5.7 + y * 2.3))} ${jx.toFixed(1)} ${jy.toFixed(1)})"/>`);
    }
  }
  return `<path d="M24 96 C22 62 40 40 64 40 C88 40 106 62 104 96 C88 104 40 104 24 96Z" fill="#ecd08a" stroke="#c9a85a" stroke-width="2"/>
<path d="M82 46 C98 58 104 76 104 96 C98 99 92 100 86 101 C92 82 90 62 82 46Z" fill="#d9b86c" opacity=".7"/>
<g fill="#fffaea" stroke="#cdae62" stroke-width=".7">${grains.join('')}</g>
<g fill="#f7cf2c" stroke="#d9a514" stroke-width="1"><path d="M44 66 l7 -3 l3 5 l-6 3Z"/><path d="M70 54 l7 -1 l1 6 l-7 1Z"/><path d="M80 80 l7 -2 l2 6 l-7 2Z"/><path d="M36 86 l6 -2 l2 5 l-6 2Z"/><path d="M60 88 l6 -3 l3 5 l-6 3Z"/></g>
<g fill="#b8402e" stroke="#7d2318" stroke-width="1"><rect x="56" y="64" width="6" height="5" rx="1"/><rect x="86" y="66" width="6" height="5" rx="1"/><rect x="46" y="80" width="6" height="5" rx="1"/><rect x="72" y="92" width="6" height="5" rx="1"/></g>
<g fill="none" stroke="#f08e70" stroke-width="3.5" stroke-linecap="round"><path d="M58 50 a4.5 4.5 0 1 1 7 3.5"/><path d="M68 74 a4.5 4.5 0 1 1 7 3.5"/></g>
<g fill="#5fa33a" stroke="#3d7a22" stroke-width=".8"><circle cx="52" cy="56" r="2.2"/><circle cx="78" cy="64" r="2.2"/><circle cx="38" cy="74" r="2.2"/><circle cx="94" cy="84" r="2.2"/><circle cx="56" cy="96" r="2.2"/></g>
<g fill="none" stroke="#3f9a3a" stroke-width="1.6"><circle cx="64" cy="58" r="2.4"/><circle cx="90" cy="74" r="2.4"/><circle cx="32" cy="92" r="2.4"/></g>`;
}
return {
  art: {
  'yum-cha': svg("Yum cha (teapot and teacup)", `<path d="M84 22 c-4 -6 4 -10 0 -16 M94 26 c-4 -6 4 -10 0 -16" stroke="#9fb0bb" stroke-width="2.5" fill="none" stroke-linecap="round"/>
` + teapot() + '\n' + teacup()),

  'har-gow': svg("Har gow (shrimp dumplings)", `<defs><g id="d">
<path d="M-20 4 C-22 -8 -14 -20 0 -21 C14 -20 22 -8 20 4 C8 9 -8 9 -20 4Z" fill="#f7f2ea" fill-opacity=".95" stroke="#cfc1a8" stroke-width="1.5"/>
<path d="M-13 0 C-11 -11 9 -13 13 -2 C7 3 -7 4 -13 0Z" fill="#f08e70" opacity=".5"/>
<path d="M-9 -3 C-5 -7 3 -8 8 -4" fill="none" stroke="#f6b8a2" stroke-width="1.5" opacity=".8"/>
<path d="M-15 -11 Q0 -25 15 -11" fill="none" stroke="#e2d6c2" stroke-width="2.5"/>
<path d="M-11 -15 l-2.5 -4 M-5 -18 l-1.2 -4.5 M1 -19 l0 -4.5 M7 -17.5 l1.2 -4.5 M12 -14 l2.5 -4" stroke="#cfc1a8" stroke-width="1.8" stroke-linecap="round"/>
</g></defs>
` + steamer(`<use href="#d" transform="translate(64 66)"/>
<use href="#d" transform="translate(41 78)"/>
<use href="#d" transform="translate(87 78)"/>`)),

  'siu-mai': svg("Siu mai (pork and shrimp dumplings)", `<defs><g id="d">
<path d="M-13 -13 L-15 6 Q0 12 15 6 L13 -13 Z" fill="#f1c84b" stroke="#c9981f" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M-8 -11 l-1 16 M0 -11 v18 M8 -11 l1 16" stroke="#dcae2e" stroke-width="1.5"/>
<ellipse cx="0" cy="-13" rx="13.5" ry="5" fill="#e7a98c" stroke="#f1c84b" stroke-width="2.5" stroke-dasharray="3 2"/>
<ellipse cx="-3" cy="-14" rx="5" ry="1.6" fill="#f3c6b0"/>
<circle cx="1" cy="-14" r="3.2" fill="#f36b1c"/>
</g></defs>
` + steamer(`<use href="#d" transform="translate(50 67)"/>
<use href="#d" transform="translate(78 67)"/>
<use href="#d" transform="translate(40 80)"/>
<use href="#d" transform="translate(88 80)"/>`)),

  'char-siu-bao': svg("Char siu bao (BBQ pork buns)", `<defs><g id="d">
<path d="M-21 5 C-24 -10 -12 -22 0 -22 C12 -22 24 -10 21 5 C8 10 -8 10 -21 5Z" fill="#fdf8ee" stroke="#d6c7ad" stroke-width="1.5"/>
<path d="M-1 -21 C-3 -16 -7 -14 -11 -13 C-7 -10 -6 -6 -6 -2 C-2 -5 3 -5 7 -2 C6 -7 8 -11 11 -14 C6 -14 2 -17 -1 -21Z" fill="#b3362b" stroke="#efe2c8" stroke-width="2" stroke-linejoin="round"/>
<path d="M-3 -13 C-1 -12 1 -12 3 -13 M-2 -9 C0 -8 2 -8 4 -9" stroke="#7d1f18" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<path d="M-4 -16 l2 -1" stroke="#e0685a" stroke-width="1.5" stroke-linecap="round"/>
</g></defs>
` + steamer(`<use href="#d" transform="translate(64 64)"/>
<use href="#d" transform="translate(41 77)"/>
<use href="#d" transform="translate(87 77)"/>`)),

  'cheung-fun': svg("Cheung fun (rice noodle rolls)", `<defs><g id="r">
<rect x="-34" y="-8" width="68" height="16" rx="8" fill="#f6f2eb" fill-opacity=".95" stroke="#cfc3b2" stroke-width="1.5"/>
<ellipse cx="-14" cy="0" rx="8" ry="4" fill="#f08e70" opacity=".45"/>
<ellipse cx="10" cy="1" rx="8" ry="4" fill="#f08e70" opacity=".45"/>
<path d="M-26 -3 Q-4 -7 24 -3" fill="none" stroke="#ffffff" stroke-width="2" opacity=".9"/>
</g></defs>
` + plate(`<ellipse cx="64" cy="92" rx="42" ry="12" fill="#7a4420"/>
<ellipse cx="54" cy="89" rx="14" ry="3" fill="#a5642f" opacity=".7"/>
<use href="#r" transform="translate(64 73)"/>
<use href="#r" transform="translate(62 84)"/>
<use href="#r" transform="translate(66 95)"/>
<g fill="#5fa33a"><rect x="44" y="70" width="4" height="3" rx="1"/><rect x="72" y="80" width="4" height="3" rx="1"/><rect x="56" y="92" width="4" height="3" rx="1"/><rect x="84" y="69" width="4" height="3" rx="1"/><circle cx="80" cy="93" r="1.8"/></g>`, { rx: 58, ry: 22 })),

  'chicken-feet': svg("Fung zaau (chicken feet)", `<defs><g id="f">
<path d="M0 12 L0 0 M0 0 L-11 -13 M0 0 L0 -18 M0 0 L11 -13" stroke="#8c3a16" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M0 12 L0 0 M0 0 L-11 -13 M0 0 L0 -18 M0 0 L11 -13" stroke="#d26b30" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M-1 -5 L-1 -14 M-5 -4 l-4 -5" stroke="#f3a56f" stroke-width="2" stroke-linecap="round"/>
</g></defs>
` + steamer(`<ellipse cx="64" cy="77" rx="42" ry="9" fill="#9a3b1c" opacity=".85"/>
<use href="#f" transform="translate(64 62)"/>
<use href="#f" transform="translate(40 74) rotate(-35)"/>
<use href="#f" transform="translate(88 74) rotate(35)"/>
<g fill="#2a1a12"><circle cx="52" cy="78" r="2.5"/><circle cx="76" cy="80" r="2.5"/><circle cx="72" cy="72" r="2.2"/><circle cx="30" cy="76" r="2.2"/></g>
<g fill="none" stroke="#e02a1e" stroke-width="2"><circle cx="58" cy="80" r="3"/><circle cx="98" cy="72" r="3"/></g>`)),

  'spare-ribs': svg("Pai gwat (steamed spare ribs)", `<defs><g id="c">
<rect x="-10" y="-7" width="20" height="14" rx="5" fill="#c98a5e" stroke="#8f5632" stroke-width="1.5"/>
<ellipse cx="-6" cy="0" rx="3" ry="4" fill="#f2e6cf" stroke="#c9b48e" stroke-width="1"/>
<path d="M-1 -4 Q4 -6 7 -3" stroke="#e3ad84" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</g></defs>
` + steamer(`<ellipse cx="64" cy="77" rx="42" ry="9" fill="#a8683a" opacity=".6"/>
<use href="#c" transform="translate(52 64) rotate(-10)"/>
<use href="#c" transform="translate(76 63) rotate(15)"/>
<use href="#c" transform="translate(36 76) rotate(20)"/>
<use href="#c" transform="translate(58 77) rotate(-5)"/>
<use href="#c" transform="translate(80 77) rotate(10)"/>
<use href="#c" transform="translate(98 75) rotate(-20)"/>
<g fill="#2a1a12"><circle cx="64" cy="66" r="2.3"/><circle cx="69" cy="80" r="2.3"/><circle cx="26" cy="74" r="2"/></g>
<g fill="#f4edd5"><rect x="88" y="66" width="3" height="3" rx=".8"/><rect x="46" y="80" width="3" height="3" rx=".8"/></g>
<g fill="none" stroke="#e02a1e" stroke-width="2"><circle cx="40" cy="64" r="3"/><circle cx="89" cy="82" r="2.6"/></g>`)),

  'lo-mai-gai': svg("Lo mai gai (sticky rice in lotus leaf)", steamer(`<path d="M22 78 C24 50 104 50 106 78 C94 90 34 90 22 78Z" fill="#6f8d3b" stroke="#4a6325" stroke-width="2"/>
<path d="M64 86 L30 68 M64 86 L44 56 M64 86 L64 52 M64 86 L84 56 M64 86 L98 68" stroke="#58752d" stroke-width="1.5"/>
<path d="M22 78 L14 64 L34 62 Z M106 78 L114 64 L94 62 Z" fill="#7f9c46" stroke="#4a6325" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M38 74 C38 50 90 50 90 74 C80 82 48 82 38 74Z" fill="#d7b170" stroke="#b08845" stroke-width="1.5"/>
<g fill="#efd9a8"><ellipse cx="46" cy="68" rx="2.2" ry="1.2"/><ellipse cx="54" cy="60" rx="2.2" ry="1.2"/><ellipse cx="74" cy="58" rx="2.2" ry="1.2"/><ellipse cx="83" cy="68" rx="2.2" ry="1.2"/><ellipse cx="64" cy="74" rx="2.2" ry="1.2"/><ellipse cx="50" cy="74" rx="2.2" ry="1.2"/><ellipse cx="78" cy="75" rx="2.2" ry="1.2"/></g>
<rect x="56" y="60" width="13" height="9" rx="3" fill="#c47a45" stroke="#94552a" stroke-width="1.2"/>
<ellipse cx="76" cy="67" rx="5.5" ry="4" fill="#4b2e1c"/>
<ellipse cx="75" cy="66" rx="2.8" ry="1.4" fill="#6d4a33"/>
<circle cx="48" cy="66" r="4.2" fill="#f0a020" stroke="#c77d10" stroke-width="1"/>`)),

  'spring-roll': svg("Spring rolls", `<defs><g id="r">
<rect x="-30" y="-8" width="60" height="16" rx="8" fill="#e2a444" stroke="#a8691f" stroke-width="1.5"/>
<ellipse cx="26" cy="0" rx="4" ry="7" fill="#cf8a30"/>
<g fill="#f5cf7e"><circle cx="-18" cy="-3" r="1.6"/><circle cx="-8" cy="2" r="1.4"/><circle cx="4" cy="-4" r="1.6"/><circle cx="14" cy="2" r="1.3"/><circle cx="-22" cy="3" r="1.2"/></g>
<path d="M-24 -4 Q0 -7 20 -4" stroke="#f3c56a" stroke-width="1.5" fill="none"/>
</g></defs>
` + plate(`<use href="#r" transform="translate(52 90) rotate(-12)"/>
<use href="#r" transform="translate(58 76) rotate(-12)"/>
<use href="#r" transform="translate(66 86) rotate(-12)"/>
<ellipse cx="98" cy="96" rx="11" ry="5" fill="#ffffff" stroke="#9fb0bb" stroke-width="1.5"/>
<ellipse cx="98" cy="96" rx="8" ry="3.3" fill="#e0452c"/>
<g fill="#f7d36b"><circle cx="95" cy="96" r=".9"/><circle cx="100" cy="95" r=".9"/></g>`, { ry: 21 })),

  'turnip-cake': svg("Lo baak gou (turnip cake)", `<defs><g id="s">
<path d="M-20 -8 L8 -14 L22 -3 L-6 3 Z" fill="#efe2c2" stroke="#c7964a" stroke-width="2" stroke-linejoin="round"/>
<path d="M-20 -8 L-6 3 L-6 12 L-20 1 Z" fill="#c98a3d" stroke="#9e6526" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M-6 3 L22 -3 L22 6 L-6 12 Z" fill="#dca052" stroke="#9e6526" stroke-width="1.5" stroke-linejoin="round"/>
<g fill="#b43a2c"><rect x="-10" y="-7" width="3" height="2.2" rx=".6"/><rect x="6" y="-8" width="3" height="2.2" rx=".6"/></g>
<g fill="#5b9b3a"><circle cx="-2" cy="-3" r="1.3"/><circle cx="12" cy="-4" r="1.3"/></g>
<g fill="#c9774a"><circle cx="2" cy="-9" r="1.2"/><circle cx="-12" cy="-3" r="1.1"/></g>
</g></defs>
` + plate(`<use href="#s" transform="translate(44 80)"/>
<use href="#s" transform="translate(80 76)"/>
<use href="#s" transform="translate(62 94)"/>`, { cy: 90, ry: 21 })),

  'egg-tart': svg("Daan taat (egg tarts)", `<defs><g id="t">
<path d="M-24 -4 L-17 14 Q0 19 17 14 L24 -4 Z" fill="#cf8a34" stroke="#a5661f" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M-18 -1 L-13 15 M-9 0 L-6 17 M0 0 v18 M9 0 L6 17 M18 -1 L13 15" stroke="#b5752a" stroke-width="1.5"/>
<ellipse cx="0" cy="-4" rx="24" ry="8" fill="#e3a24a" stroke="#a5661f" stroke-width="1.5"/>
<ellipse cx="0" cy="-4" rx="18.5" ry="5.5" fill="#f8d23a"/>
<ellipse cx="-5" cy="-5.5" rx="6" ry="1.6" fill="#fff3b0" opacity=".85"/>
<ellipse cx="8" cy="-3" rx="3" ry="1.2" fill="#d69a1e" opacity=".6"/>
</g></defs>
` + plate(`<use href="#t" transform="translate(82 76)"/>
<use href="#t" transform="translate(46 86)"/>`, { cy: 90, ry: 21 })),

  'lai-wong-bao': svg("Lau saa baau (custard lava buns)", `<defs><g id="b">
<path d="M-21 5 C-24 -10 -12 -21 0 -21 C12 -21 24 -10 21 5 C8 10 -8 10 -21 5Z" fill="#fff9ec" stroke="#d8c9ad" stroke-width="1.5"/>
<path d="M-11 -14 Q-4 -18 3 -17" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
</g></defs>
` + steamer(`<use href="#b" transform="translate(50 65)"/>
<use href="#b" transform="translate(80 65)"/>
<g transform="translate(64 76)">
<path d="M-18 -8 C-10 -14 10 -14 18 -8 C24 0 22 8 16 10 C6 13 -6 13 -16 10 C-22 8 -24 0 -18 -8Z" fill="#f5a81c" stroke="#d4850c" stroke-width="1.2"/>
<g transform="rotate(-18 -6 8)"><path d="M-6 -21 C-18 -21 -30 -10 -27 5 C-20 8 -12 8 -6 7 C-9 -2 -9 -12 -6 -21Z" fill="#fff9ec" stroke="#d8c9ad" stroke-width="1.5"/><path d="M-6 -21 C-9 -12 -9 -2 -6 7" fill="none" stroke="#f7c55a" stroke-width="3"/></g>
<g transform="rotate(18 6 8)"><path d="M6 -21 C18 -21 30 -10 27 5 C20 8 12 8 6 7 C9 -2 9 -12 6 -21Z" fill="#fff9ec" stroke="#d8c9ad" stroke-width="1.5"/><path d="M6 -21 C9 -12 9 -2 6 7" fill="none" stroke="#f7c55a" stroke-width="3"/></g>
<path d="M-7 -6 C-4 -9 4 -9 7 -6 C9 0 8 6 4 9 C0 10 -4 9 -6 6 C-9 2 -9 -2 -7 -6Z" fill="#f5a81c"/>
<ellipse cx="-2" cy="-3" rx="2.5" ry="4" fill="#ffd978" opacity=".9"/>
<path d="M-12 11 C-8 14 8 14 13 11" stroke="#ffd978" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</g>`)),

  'ma-lai-go': svg("Maa laai gou (Malay sponge cake)", steamer(`<path d="M30 52 L64 44 L98 52 L64 60 Z" fill="#e4b06a" stroke="#9c6526" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M30 52 L64 60 L64 90 L30 82 Z" fill="#c98a42" stroke="#9c6526" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M64 60 L98 52 L98 82 L64 90 Z" fill="#b57634" stroke="#9c6526" stroke-width="1.5" stroke-linejoin="round"/>
<g fill="#9a5f24"><ellipse cx="38" cy="62" rx="1.8" ry="2.4"/><ellipse cx="48" cy="70" rx="1.5" ry="2"/><ellipse cx="42" cy="76" rx="2" ry="2.6"/><ellipse cx="56" cy="66" rx="1.4" ry="1.9"/><ellipse cx="55" cy="80" rx="1.8" ry="2.3"/><ellipse cx="36" cy="72" rx="1.3" ry="1.7"/></g>
<g fill="#8a531c"><ellipse cx="72" cy="66" rx="1.8" ry="2.4"/><ellipse cx="84" cy="62" rx="1.5" ry="2"/><ellipse cx="90" cy="72" rx="2" ry="2.6"/><ellipse cx="76" cy="78" rx="1.4" ry="1.9"/><ellipse cx="86" cy="80" rx="1.3" ry="1.7"/></g>
<g fill="#c98a42" opacity=".6"><circle cx="54" cy="51" r="1.3"/><circle cx="66" cy="49" r="1.1"/><circle cx="76" cy="53" r="1.3"/><circle cx="62" cy="55" r="1"/></g>`)),

  'pineapple-bun': svg("Bo lo baau (pineapple buns)", `<defs><g id="b">
${pineappleBun}
</g></defs>` + plate(`<use href="#b" transform="translate(84 78)"/>
<use href="#b" transform="translate(48 88)"/>`, { cy: 90 })),
  'xiao-long-bao': svg("Siu lung baau (soup dumplings)", `<defs><g id="d">
<path d="M-17 6 C-20 -4 -12 -15 0 -16 C12 -15 20 -4 17 6 C8 10 -8 10 -17 6Z" fill="#fbf6ec" fill-opacity=".95" stroke="#d3c4a8" stroke-width="1.5"/>
<ellipse cx="0" cy="3" rx="11" ry="3.5" fill="#f2c27a" opacity=".4"/>
<path d="M0 -15 C-5 -12 -10 -7 -13 0 M0 -15 C-2 -10 -4 -4 -5 4 M0 -15 C3 -10 5 -4 6 4 M0 -15 C5 -12 10 -7 13 0" fill="none" stroke="#e0d1b6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M-6 -9 Q-3 -12 0 -12" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"/>
<circle cx="0" cy="-15" r="2.5" fill="#efe4cf" stroke="#d3c4a8" stroke-width="1.2"/>
</g></defs>
` + steamer(`<use href="#d" transform="translate(48 66)"/>
<use href="#d" transform="translate(80 66)"/>
<use href="#d" transform="translate(36 80)"/>
<use href="#d" transform="translate(64 80)"/>
<use href="#d" transform="translate(92 80)"/>`)),

  'beef-tripe': svg("Ngau paak jip (beef tripe)", `<defs><g id="t">
<rect x="-14" y="-8" width="28" height="16" rx="4" fill="#f3ecdb" stroke="#c9b994" stroke-width="1.5"/>
<path d="M-9 -7 q2 7 0 14 M-4 -7 q2 7 0 14 M1 -7 q2 7 0 14 M6 -7 q2 7 0 14 M11 -7 q1.5 7 0 14" fill="none" stroke="#d8c8a4" stroke-width="2" stroke-linecap="round"/>
<path d="M-10 -5 h6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
</g></defs>
` + steamer(`<ellipse cx="64" cy="77" rx="40" ry="9" fill="#a8783e" opacity=".6"/>
<use href="#t" transform="translate(50 64) rotate(-12)"/>
<use href="#t" transform="translate(78 63) rotate(10)"/>
<use href="#t" transform="translate(38 77) rotate(8)"/>
<use href="#t" transform="translate(64 78) rotate(-6)"/>
<use href="#t" transform="translate(90 77) rotate(-16)"/>
<g stroke="#f2c94c" stroke-width="2.5" stroke-linecap="round"><path d="M58 62 l8 3 M70 70 l7 -3 M44 72 l6 4 M84 72 l8 -1"/></g>
<g stroke="#5fa33a" stroke-width="2.5" stroke-linecap="round"><path d="M52 70 l9 -2 M76 58 l6 5 M98 70 l6 -3 M28 72 l6 -3"/></g>`)),

  'zaa-loeng': svg("Zaa loeng (fried dough in rice noodle roll)", `<defs><g id="p">
<path d="M-11 -4 V6 A11 6 0 0 0 11 6 V-4 Z" fill="#efe9df" stroke="#cfc3b2" stroke-width="1.5"/>
<ellipse cx="0" cy="-4" rx="11" ry="6" fill="#f8f5ef" stroke="#cfc3b2" stroke-width="1.5"/>
<ellipse cx="0" cy="-4" rx="7" ry="3.6" fill="#e3a94a" stroke="#b9772a" stroke-width="1"/>
<g fill="#c07f25"><circle cx="-3" cy="-4.5" r="1"/><circle cx="2" cy="-3" r="1"/><circle cx="3" cy="-5.5" r=".8"/></g>
</g></defs>
` + plate(`<ellipse cx="64" cy="92" rx="42" ry="12" fill="#7a4420"/>
<ellipse cx="54" cy="89" rx="14" ry="3" fill="#a5642f" opacity=".7"/>
<use href="#p" transform="translate(40 80)"/>
<use href="#p" transform="translate(64 76)"/>
<use href="#p" transform="translate(88 80)"/>
<use href="#p" transform="translate(52 94)"/>
<use href="#p" transform="translate(76 94)"/>`, { rx: 58, ry: 22 })),

  'ham-sui-gok': svg("Haam seoi gok (fried sticky rice dumplings)", `<defs><g id="g">
<path d="M-24 2 C-16 -15 16 -15 24 2 C16 12 -16 12 -24 2Z" fill="#e6a64a" stroke="#a8691f" stroke-width="1.5"/>
<path d="M-21 -1 Q0 -14 21 -1" fill="none" stroke="#c9832e" stroke-width="2.5" stroke-dasharray="2.5 2"/>
<g fill="#f3c877"><circle cx="-12" cy="2" r="1.6"/><circle cx="-4" cy="5" r="1.3"/><circle cx="5" cy="1" r="1.6"/><circle cx="13" cy="4" r="1.3"/><circle cx="-7" cy="-4" r="1.2"/><circle cx="9" cy="-5" r="1.1"/></g>
<path d="M-14 -7 Q-6 -11 2 -10" stroke="#f7d995" stroke-width="2" fill="none" stroke-linecap="round"/>
</g></defs>
` + plate(`<use href="#g" transform="translate(46 80) rotate(-8)"/>
<use href="#g" transform="translate(82 80) rotate(8)"/>
<use href="#g" transform="translate(64 96)"/>`, { cy: 90, ry: 21 })),

  'char-siu-sou': svg("Caa siu sou (BBQ pork puffs)", `<defs><g id="s">
<path d="M-19 -8 C-19 -13 19 -13 19 -8 L20 6 C20 11 -20 11 -20 6 Z" fill="#e2a547" stroke="#a9691f" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M-18 -8 C-18 -12 18 -12 18 -8 C18 -3 -18 -3 -18 -8Z" fill="#f0c26a"/>
<path d="M-18 0 q4.5 -2 9 0 t9 0 t9 0 t9 0 M-19 4 q4.75 -2 9.5 0 t9.5 0 t9.5 0 t9.5 0" stroke="#f6d894" stroke-width="1.3" fill="none"/>
<path d="M20 -3 L20 5" stroke="#b3362b" stroke-width="3" stroke-linecap="round"/>
<g fill="#fdf6e3"><ellipse cx="-10" cy="-8" rx="1.4" ry=".8"/><ellipse cx="-3" cy="-10" rx="1.4" ry=".8"/><ellipse cx="4" cy="-7" rx="1.4" ry=".8"/><ellipse cx="11" cy="-9" rx="1.4" ry=".8"/><ellipse cx="0" cy="-6" rx="1.4" ry=".8"/></g>
</g></defs>
` + plate(`<use href="#s" transform="translate(46 80) rotate(-6)"/>
<use href="#s" transform="translate(84 80) rotate(6)"/>
<use href="#s" transform="translate(64 96)"/>`, { cy: 90, ry: 21 })),

  'fried-rice': svg("Caau faan (fried rice)", plate(friedRice(), { cy: 90, ry: 21 })),

  'seafood-noodles': svg("Hoi sin caau min (seafood fried noodles)", plate(`<ellipse cx="64" cy="88" rx="44" ry="15" fill="#e8b04a" stroke="#b77b24" stroke-width="1.5"/>
<g fill="none" stroke="#c98a2a" stroke-width="1.8" stroke-linecap="round"><path d="M26 86 q6 -6 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t10 0"/><path d="M32 94 q6 -6 12 0 t12 0 t12 0 t12 0 t12 0 t12 0"/><path d="M36 80 q6 -6 12 0 t12 0 t12 0 t12 0 t12 0"/></g>
<path d="M34 84 C38 70 90 68 96 82 C98 92 80 96 64 95 C46 95 32 92 34 84Z" fill="#b8742e" opacity=".55"/>
<path d="M44 78 Q56 73 68 75" stroke="#f3d7a4" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".9"/>
<g fill="#3f8f3a" stroke="#2c6a28" stroke-width="1"><path d="M38 86 q8 -10 18 -4 q-8 8 -18 4Z"/><path d="M84 90 q8 -10 16 -2 q-8 7 -16 2Z"/></g>
<g fill="none" stroke="#f7f3ea" stroke-width="3.5"><ellipse cx="74" cy="80" rx="6" ry="4"/><ellipse cx="52" cy="92" rx="5.5" ry="3.5"/></g>
<g fill="none" stroke="#f08e70" stroke-width="5" stroke-linecap="round"><path d="M58 82 a6 6 0 1 1 9 4"/><path d="M80 92 a6 6 0 1 1 9 4"/></g>
<g stroke="#fbd0bf" stroke-width="1.2"><path d="M60 77 l1 3 M64 76 l0 3 M82 87 l1 3 M86 86 l0 3"/></g>`, { cy: 90, ry: 21 })),

  'beef-ho-fun': svg("Gon caau ngau ho (dry-fried beef ho fun)", plate(`<g fill="none" stroke-linecap="round">
<g stroke="#c9914f" stroke-width="8"><path d="M26 88 C38 74 50 98 62 84 S86 74 100 90"/><path d="M30 96 C44 84 56 104 70 92 S92 86 104 96"/><path d="M34 80 C46 68 58 88 72 76 S92 70 98 80"/></g>
<g stroke="#e0b37a" stroke-width="2.5"><path d="M28 86 C40 72 50 96 62 82 S86 72 98 88"/><path d="M36 78 C48 66 58 86 72 74 S92 68 96 78"/></g>
<g stroke="#f7f1de" stroke-width="2.5"><path d="M44 86 l10 -4 M76 84 l9 4 M58 98 l10 -3 M88 76 l8 3 M38 94 l6 -4"/></g>
<g stroke="#e8d27a" stroke-width="3.5"><path d="M54 82 l.1 0 M85 88 l.1 0 M68 95 l.1 0 M44 90 l.1 0"/></g>
<g stroke="#5fa33a" stroke-width="3"><path d="M48 78 l7 2 M80 94 l7 -2 M66 80 l5 4 M92 86 l6 -1"/></g>
</g>
<g fill="#6b3a22" stroke="#4a2716" stroke-width="1.2"><ellipse cx="58" cy="78" rx="8" ry="4" transform="rotate(-15 58 78)"/><ellipse cx="82" cy="80" rx="8" ry="4" transform="rotate(12 82 80)"/><ellipse cx="46" cy="96" rx="7.5" ry="3.8" transform="rotate(10 46 96)"/><ellipse cx="76" cy="98" rx="7.5" ry="3.8" transform="rotate(-8 76 98)"/></g>
<g stroke="#8c5236" stroke-width="1.2" stroke-linecap="round"><path d="M54 77 l7 -2 M79 78 l7 2"/></g>`, { cy: 90, ry: 21 })),
  },
};
})();

// Unit 8 · Cha Chaan Teng 茶餐廳. Its own drawings (unit8/art.mjs, every drink as served) use drink too.
export const unit8 = (() => {
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
return {
  art,
  drink,
};
})();

// Unit 9 · Time & Dates 時間. Its own drawings (unit9/art.mjs, a clock for every time) use clock too.
export const unit9 = (() => {
const C = 64, CY = 60, R = 50;
const at = (deg, r) => {
  const a = (deg * Math.PI) / 180;
  return [(C + r * Math.sin(a)).toFixed(1), (CY - r * Math.cos(a)).toFixed(1)];
};
const hand = (deg, r, width, color) => {
  const [x, y] = at(deg, r);
  return `<line x1="${C}" y1="${CY}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
};

// A round clock face with numerals 1–12, showing h:m. The hour hand moves
// on between the hours with the minutes.
function clock(h, m, title = `Clock showing ${h}:${String(m).padStart(2, '0')}`) {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const big = i % 5 === 0;
    const [x1, y1] = at(i * 6, big ? 40 : 43), [x2, y2] = at(i * 6, 45);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${big ? '#2e5a88' : '#9fb0bb'}" stroke-width="${big ? 3 : 1.5}" stroke-linecap="round"/>`;
  }).join('\n');
  const numerals = Array.from({ length: 12 }, (_, i) => {
    const [x, y] = at((i + 1) * 30, 32);
    return `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700" fill="#26323c" text-anchor="middle" dominant-baseline="central">${i + 1}</text>`;
  }).join('\n');
  return svg(title, `<ellipse cx="64" cy="118" rx="34" ry="4" fill="#9fb0bb" opacity=".35"/>
<circle cx="${C}" cy="${CY}" r="${R}" fill="#fbf8f1" stroke="#2e5a88" stroke-width="5"/>
${ticks}
${numerals}
${hand(((h % 12) + m / 60) * 30, 22, 6, '#26323c')}
${hand(m * 6, 38, 3.5, '#26323c')}
<circle cx="${C}" cy="${CY}" r="4.5" fill="#d0453c"/>`);
}
return {
  art: { zung: clock(10, 10, 'Clock') },
  clock,
};
})();

// Unit 10 · Family 屋企人
const unit10 = (() => {
const MAN = { hair: 'short' }, WOMAN = { hair: 'long' };
const OLD_MAN = { hair: 'short', old: true }, OLD_WOMAN = { hair: 'bun', old: true };
// Who stands where: [x, y (head centre), scale, look]. 我 is `me`.
const A = {
  'dads-dad': [18, 22, 0.5, OLD_MAN], 'dads-mum': [46, 22, 0.5, OLD_WOMAN],
  'mums-dad': [82, 22, 0.5, OLD_MAN], 'mums-mum': [110, 22, 0.5, OLD_WOMAN],
  dad: [32, 60, 0.5, MAN], mum: [96, 60, 0.5, WOMAN],
  'elder-brother': [16, 98, 0.5, MAN], 'elder-sister': [40, 98, 0.5, WOMAN], me: [64, 98, 0.46, MAN],
  'younger-brother': [88, 100, 0.42, MAN], 'younger-sister': [112, 100, 0.42, WOMAN],
};
// Couples and their children.
const A_FAMILIES = [
  ['dads-dad', 'dads-mum', ['dad']],
  ['mums-dad', 'mums-mum', ['mum']],
  ['dad', 'mum', ['elder-brother', 'elder-sister', 'me', 'younger-brother', 'younger-sister']],
];
// Tree B: the partner is drawn as a husband or a wife when meant, and
// without hair (either) otherwise.
const B = partner => ({
  me: [38, 34, 0.8, MAN], partner: [90, 34, 0.8, partner],
  son: [44, 90, 0.6, MAN], daughter: [84, 90, 0.6, WOMAN],
});
const B_FAMILIES = [['me', 'partner', ['son', 'daughter']]];
const LINK = 'stroke="#9fb0bb" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"';
// Lines joining each couple at the shoulders, and down to their children.
function links(at, families) {
  return families.map(([a, b, kids]) => {
    const [xa, ya, sa] = at[a], [xb] = at[b];
    const y = ya + 26 * sa, mid = (xa + xb) / 2;
    const tops = kids.map(k => [at[k][0], at[k][1] - 14 * at[k][2]]);
    const bar = Math.min(...tops.map(([, t]) => t)) - 5;
    const xs = tops.map(([x]) => x);
    return `<path d="M${xa + 18 * sa} ${y} H${xb - 18 * sa} M${mid} ${y} V${bar}${kids.length > 1 ? ` M${Math.min(...xs)} ${bar} H${Math.max(...xs)}` : ` H${xs[0]}`} ${tops.map(([x, t]) => `M${x} ${bar} V${t}`).join(' ')}"/>`
      .replace('<path', `<path ${LINK}`);
  }).join('\n');
}
// The tree `at` with the `meant` ids coloured and marked with an arrow.
function tree(at, families, meant, { colour = 'red', mark = true } = {}) {
  const people = Object.entries(at).map(([id, [x, y, s, look]]) =>
    person(x, y, id === 'me' ? 'gold' : meant.includes(id) ? colour : null, s, look));
  const marks = mark ? meant.map(id => { const [x, y, s] = at[id]; return arrow(x, y - 14 * s); }) : [];
  return `${links(at, families)}\n${people.join('\n')}\n${marks.join('\n')}`;
}
const a = (title, ...meant) => svg(title, tree(A, A_FAMILIES, meant));
const b = (title, partner, ...meant) => svg(title, tree(B(partner), B_FAMILIES, meant));
return {
  art: {
  home: svg('A house', house),
  family: svg('The whole family tree', tree(A, A_FAMILIES, Object.keys(A), { colour: 'blue', mark: false })),
  dad: a('Family tree: 我\'s dad', 'dad'),
  mum: a('Family tree: 我\'s mum', 'mum'),
  'elder-brother': a('Family tree: 我\'s older brother', 'elder-brother'),
  'elder-sister': a('Family tree: 我\'s older sister', 'elder-sister'),
  'younger-brother': a('Family tree: 我\'s younger brother', 'younger-brother'),
  'younger-sister': a('Family tree: 我\'s younger sister', 'younger-sister'),
  siblings: a('Family tree: 我\'s brothers and sisters', 'elder-brother', 'elder-sister', 'younger-brother', 'younger-sister'),
  'dads-dad': a('Family tree: dad\'s dad', 'dads-dad'),
  'dads-mum': a('Family tree: dad\'s mum', 'dads-mum'),
  'mums-dad': a('Family tree: mum\'s dad', 'mums-dad'),
  'mums-mum': a('Family tree: mum\'s mum', 'mums-mum'),
  husband: b('我\'s own family: husband', MAN, 'partner'),
  wife: b('我\'s own family: wife', WOMAN, 'partner'),
  son: b('我\'s own family: son', { hair: 'none' }, 'son'),
  daughter: b('我\'s own family: daughter', { hair: 'none' }, 'daughter'),
  children: b('我\'s own family: children', { hair: 'none' }, 'son', 'daughter'),
  },
};
})();

// Unit 11 · Getting Around 出街. Its own drawings (unit11/art.mjs) use shadow, windows too.
export const unit11 = (() => {
const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="5" fill="#9fb0bb" opacity=".35"/>`;
const wheel = (x, y, r = 10) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2a211b"/><circle cx="${x}" cy="${y}" r="${r * 0.4}" fill="#c8ced3"/>`;
const windows = (x, y, w, h, n, gap, fill = '#bfe0f2', stroke = '#24507f') =>
  Array.from({ length: n }, (_, i) => `<rect x="${x + i * (w + gap)}" y="${y}" width="${w}" height="${h}" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`).join('\n');
const LINE = 'stroke-width="2.5" stroke-linejoin="round"';
// A building: body, then whatever goes on its front.
const building = (x, y, w, h, fill, stroke, front) => `${shadow(64, 118, w / 2 + 8)}
<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" ${LINE}/>
${front}`;
return {
  art: {
  metro: svg('An MTR train, front on', `${shadow(64, 118, 46)}
<path d="M24 112 H104 M34 104 L28 118 M94 104 L100 118" stroke="#8a9aa5" stroke-width="3" stroke-linecap="round"/>
<path d="M28 100 V36 C28 20 40 14 64 14 C88 14 100 20 100 36 V100 Z" fill="#e4e7ea" stroke="#5f6f7a" ${LINE}/>
<path d="M36 30 H92 V60 H36 Z" fill="#bfe0f2" stroke="#5f6f7a" stroke-width="2" stroke-linejoin="round"/>
<path d="M28 72 H100" stroke="#d6453a" stroke-width="7"/>
<rect x="54" y="18" width="20" height="7" rx="2" fill="#2a211b"/>
<circle cx="42" cy="88" r="5" fill="#f7d35c" stroke="#9a6c0e" stroke-width="1.5"/><circle cx="86" cy="88" r="5" fill="#f7d35c" stroke="#9a6c0e" stroke-width="1.5"/>
<rect x="28" y="100" width="72" height="6" fill="#5f6f7a"/>`),

  bus: svg('A double-decker bus', `${shadow(64, 112, 54)}
<rect x="10" y="18" width="108" height="86" rx="10" fill="#f2c94c" stroke="#9a6c0e" ${LINE}/>
<path d="M10 62 H118" stroke="#d6453a" stroke-width="5"/>
${windows(18, 26, 17, 22, 5, 3)}
${windows(38, 70, 17, 18, 4, 3)}
<rect x="16" y="68" width="16" height="30" rx="2" fill="#bfe0f2" stroke="#24507f" stroke-width="1.5"/>
${wheel(34, 104, 11)}
${wheel(96, 104, 11)}`),

  minibus: svg('A minibus with a green roof', `${shadow(64, 108, 50)}
<path d="M14 96 V52 C14 42 20 34 30 34 H98 C108 34 116 42 116 54 V96 Z" fill="#f7f3e8" stroke="#6f6a5c" ${LINE}/>
<path d="M14 52 C14 42 20 34 30 34 H98 C108 34 116 42 116 52 Z" fill="#3a9a6e" stroke="#26684a" ${LINE}/>
${windows(22, 58, 18, 16, 4, 5)}
<path d="M14 82 H116" stroke="#3a9a6e" stroke-width="4"/>
${wheel(36, 98, 11)}
${wheel(96, 98, 11)}`),

  taxi: svg('A red taxi with its roof sign', `<rect x="58" y="27" width="28" height="11" rx="3" fill="#f7f3e8" stroke="#8f2a22" stroke-width="2"/>
<path d="M64 32.5 H80" stroke="#d6453a" stroke-width="3" stroke-linecap="round"/>
${car}`),

  tram: svg('A double-decker tram', `${shadow(64, 116, 42)}
<path d="M64 6 V20 M40 6 H104" stroke="#5f6f7a" stroke-width="2.5" stroke-linecap="round"/>
<rect x="24" y="20" width="80" height="88" rx="8" fill="#3a9a6e" stroke="#26684a" ${LINE}/>
<path d="M24 62 H104" stroke="#f7f3e8" stroke-width="5"/>
${windows(31, 28, 14, 22, 4, 3)}
${windows(31, 70, 14, 18, 4, 3)}
<rect x="24" y="100" width="80" height="8" fill="#26684a"/>
${wheel(42, 112, 6)}
${wheel(86, 112, 6)}`),

  toilet: svg('A toilet sign: a man and a woman', `<rect x="14" y="16" width="100" height="96" rx="12" fill="#3f7cc0" stroke="#24507f" stroke-width="3"/>
<path d="M64 26 V102" stroke="#ffffff" stroke-width="3" opacity=".7"/>
<g fill="#ffffff">
<circle cx="39" cy="38" r="7"/><path d="M29 50 H49 V78 H45 V100 H33 V78 H29 Z"/>
<circle cx="89" cy="38" r="7"/><path d="M80 50 H98 L106 80 H96 V100 H82 V80 H72 Z"/>
</g>`),

  bank: svg('A bank with columns and a coin sign', building(18, 50, 92, 64, '#f4efe4', '#8a7a5a', `<path d="M12 50 L64 18 L116 50 Z" fill="#e0d6be" stroke="#8a7a5a" ${LINE}/>
<circle cx="64" cy="37" r="8" fill="#e0a526" stroke="#9a6c0e" stroke-width="2"/>
<path d="M64 32 V42 M61 34.5 H66 Q68 34.5 68 36.5 Q68 38 66 38 H62 Q60 38 60 39.5 Q60 41.5 62 41.5 H67" stroke="#9a6c0e" stroke-width="1.5" fill="none"/>
<g fill="#ffffff" stroke="#8a7a5a" stroke-width="2">
<rect x="26" y="58" width="10" height="48"/><rect x="46" y="58" width="10" height="48"/><rect x="72" y="58" width="10" height="48"/><rect x="92" y="58" width="10" height="48"/>
</g>
<rect x="14" y="106" width="100" height="8" fill="#e0d6be" stroke="#8a7a5a" stroke-width="2"/>`)),

  hospital: svg('A hospital with a green cross', building(20, 34, 88, 80, '#ffffff', '#6f8796', `<rect x="48" y="12" width="32" height="32" rx="4" fill="#ffffff" stroke="#6f8796" stroke-width="2.5"/>
<path d="M58 16 H70 V24 H76 V32 H70 V40 H58 V32 H52 V24 H58 Z" fill="#3a9a6e"/>
${windows(28, 52, 14, 12, 4, 6)}
${windows(28, 72, 14, 12, 4, 6)}
<rect x="52" y="92" width="24" height="22" fill="#9fd3e6" stroke="#6f8796" stroke-width="2"/>`)),

  supermarket: svg('A shopping trolley full of food', `${shadow(64, 118, 44)}
<path d="M10 22 H26 L40 86 H104" stroke="#5f6f7a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="52" cy="40" r="11" fill="#e0932e" stroke="#9a5a14" stroke-width="2"/>
<rect x="64" y="26" width="16" height="22" rx="2" fill="#3f7cc0" stroke="#24507f" stroke-width="2"/>
<path d="M84 44 C84 30 100 30 100 44 Z" fill="#3a9a6e" stroke="#26684a" stroke-width="2"/>
<path d="M30 44 H110 L102 76 H38 Z" fill="#c9d3da" fill-opacity=".85" stroke="#5f6f7a" stroke-width="3" stroke-linejoin="round"/>
<path d="M48 44 L50 76 M68 44 V76 M88 44 L86 76 M34 60 H106" stroke="#5f6f7a" stroke-width="2"/>
<circle cx="48" cy="104" r="8" fill="#2a211b"/><circle cx="96" cy="104" r="8" fill="#2a211b"/>`),

  park: svg('A park: a tree and a bench on the grass', `<ellipse cx="64" cy="112" rx="58" ry="12" fill="#8cc97a"/>
<rect x="36" y="58" width="12" height="52" rx="3" fill="#9c6528" stroke="#7d4f1e" stroke-width="2"/>
<circle cx="42" cy="44" r="30" fill="#3a9a6e" stroke="#26684a" stroke-width="2.5"/>
<circle cx="28" cy="36" r="6" fill="#56b485"/><circle cx="52" cy="28" r="7" fill="#56b485"/>
<rect x="70" y="86" width="48" height="6" rx="2" fill="#9c6528" stroke="#7d4f1e" stroke-width="1.5"/>
<rect x="70" y="74" width="48" height="6" rx="2" fill="#9c6528" stroke="#7d4f1e" stroke-width="1.5"/>
<path d="M76 92 V106 M112 92 V106 M76 80 V86 M112 80 V86" stroke="#7d4f1e" stroke-width="3" stroke-linecap="round"/>`),

  hotel: svg('A tall hotel with three stars', building(32, 26, 64, 88, '#e9e1f2', '#6a5a86', `<rect x="32" y="12" width="64" height="16" fill="#6a5a86" stroke="#4a3d62" stroke-width="2"/>
<g fill="#f7d35c"><path d="M48 14.5 l2 4.2 4.6 .6 -3.4 3.2 .9 4.5 -4.1 -2.2 -4.1 2.2 .9 -4.5 -3.4 -3.2 4.6 -.6z"/><path d="M64 14.5 l2 4.2 4.6 .6 -3.4 3.2 .9 4.5 -4.1 -2.2 -4.1 2.2 .9 -4.5 -3.4 -3.2 4.6 -.6z"/><path d="M80 14.5 l2 4.2 4.6 .6 -3.4 3.2 .9 4.5 -4.1 -2.2 -4.1 2.2 .9 -4.5 -3.4 -3.2 4.6 -.6z"/></g>
${[36, 54, 72].map(y => windows(40, y, 10, 11, 4, 4, '#fff6d8', '#6a5a86')).join('\n')}
<rect x="54" y="92" width="20" height="22" fill="#9fd3e6" stroke="#6a5a86" stroke-width="2"/>`)),

  airport: svg('An airport: a plane taking off by the control tower', `<rect x="4" y="104" width="120" height="14" fill="#8a9aa5"/>
<path d="M10 111 H24 M36 111 H50 M62 111 H76 M88 111 H102 M114 111 H122" stroke="#ffffff" stroke-width="2.5"/>
<rect x="96" y="56" width="10" height="48" fill="#c9d3da" stroke="#5f6f7a" stroke-width="2"/>
<path d="M88 44 H114 L110 58 H92 Z" fill="#bfe0f2" stroke="#5f6f7a" stroke-width="2" stroke-linejoin="round"/>
<rect x="90" y="38" width="22" height="6" fill="#5f6f7a"/>
<g transform="translate(2 18) scale(.72)">${plane}</g>`),
  },
  shadow, windows,
};
})();

// Unit 12 · Colours & Clothes 顏色同衫: drawn from unit 12's vocab (each colour's fill and line, each
// garment's fit). Its own drawings (unit12/art.mjs, clothes in colours) use byId, alone and GARMENT too.
export const unit12 = (() => {
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
${[['hung', 34, 50], ['wong', 52, 32], ['luk', 76, 30], ['laam', 96, 46], ['zi2', 98, 66], ['fan-hung', 30, 74], ['hak', 50, 94]]
    .map(([id, x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${byId[id].fill}" stroke="${byId[id].line}" stroke-width="2"/>`).join('\n')}`),
  'daa-baan': svg('A person, ready to dress', figure),
};
for (const c of V.colours) art[c.id] = svg(`A splash of ${c.english}`, swatch(c));
const FIT = Object.fromEntries(V.coloured.map(e => [e.garment, e.fit]));
FIT.glasses = { cx: 64, cy: 20, s: 4.5 };
for (const [id, c] of Object.entries(PLAIN)) {
  art[id] = svg(byId[id].english.replace(/;.*/, ''), alone(FIT[id], GARMENT[id](byId[c].fill, byId[c].line)));
}
return {
  art,
  byId, alone, GARMENT,
};
})();

// Unit 13 · Weather 天氣. Its own drawings (unit13/art.mjs) use sun, CLOUD, cloud, rain, flake too.
export const unit13 = (() => {
// A sun centred on x, y with radius r, and rays around it.
const sun = (x, y, r) => `<g stroke="#c9912a" stroke-width="${Math.max(2, r / 8)}" stroke-linecap="round">
${Array.from({ length: 8 }, (_, i) => {
    const a = i * Math.PI / 4, c = Math.cos(a), s = Math.sin(a);
    return `<path d="M${(x + c * r * 1.3).toFixed(1)} ${(y + s * r * 1.3).toFixed(1)} L${(x + c * r * 1.65).toFixed(1)} ${(y + s * r * 1.65).toFixed(1)}"/>`;
  }).join('\n')}
</g>
<circle cx="${x}" cy="${y}" r="${r}" fill="#f2c94c" stroke="#c9912a" stroke-width="2.5"/>`;
// A cloud about 80 wide and 40 high (s = 1), its flat base centred on x, y.
const CLOUD = {
  white: 'fill="#ffffff" stroke="#8a9aa5"',
  grey: 'fill="#c9d3da" stroke="#6f7f8a"',
  dark: 'fill="#7d8a94" stroke="#4a555e"',
};
const cloud = (x, y, s = 1, tone = 'white') => `<g transform="translate(${x} ${y}) scale(${s})">
<path d="M-36 0 C-48 0 -48 -20 -32 -20 C-32 -34 -12 -40 -4 -28 C2 -44 30 -40 28 -20 C44 -22 46 0 34 0 Z" ${CLOUD[tone]} stroke-width="${(2.5 / s).toFixed(2)}" stroke-linejoin="round"/>
</g>`;
// Slanted raindrops below a cloud, from x0 to x1, starting at y.
const rain = (x0, x1, y, rows = 2) => {
  const drops = [];
  for (let r = 0; r < rows; r++) {
    for (let x = x0 + (r % 2) * 10; x <= x1; x += 20) drops.push(`M${x} ${y + r * 20} l-5 12`);
  }
  return `<path d="${drops.join(' ')}" stroke="#3f7cc0" stroke-width="4" stroke-linecap="round"/>`;
};
// A six-armed snowflake centred on x, y.
const flake = (x, y, r = 8) => `<g transform="translate(${x} ${y})" stroke="#5b9bd5" stroke-width="2.5" stroke-linecap="round">
${[0, 60, 120].map(a => `<path d="M0 ${-r} V${r} M-3 ${-r + 3} L0 ${-r + 6} L3 ${-r + 3} M-3 ${r - 3} L0 ${r - 6} L3 ${r - 3}" transform="rotate(${a})"/>`).join('\n')}
</g>`;
const bolt = (x, y) => `<path d="M${x} ${y} L${x - 12} ${y + 26} H${x - 2} L${x - 8} ${y + 48} L${x + 12} ${y + 16} H${x + 2} L${x + 8} ${y} Z" fill="#f2c94c" stroke="#b58a1a" stroke-width="2" stroke-linejoin="round"/>`;
// A five-petalled blossom centred on x, y.
const blossom = (x, y, r = 7) => `<g transform="translate(${x} ${y})">
${[0, 72, 144, 216, 288].map(a => `<ellipse cy="${-r}" rx="${r * 0.62}" ry="${r * 0.8}" fill="#f6b6c9" stroke="#c0607f" stroke-width="1.5" transform="rotate(${a})"/>`).join('\n')}
<circle r="${r * 0.4}" fill="#f2c94c"/>
</g>`;
// A leaf pointing up from its stalk at x, y, turned by `a` degrees.
const leaf = (x, y, a, fill, line, s = 1) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">
<path d="M0 0 C-14 -8 -12 -30 0 -40 C12 -30 14 -8 0 0 Z" fill="${fill}" stroke="${line}" stroke-width="2" stroke-linejoin="round"/>
<path d="M0 4 V-32" stroke="${line}" stroke-width="1.5" stroke-linecap="round"/>
</g>`;
// Wind: curling gusts.
const gusts = `<path d="M10 44 H70 C84 44 88 26 76 22 C66 19 62 30 70 33 M14 64 H96 C112 64 116 86 102 90 C92 93 88 82 94 78 M22 84 H56" stroke="#6f8796" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const umbrella = `<path d="M64 20 V100 C64 112 50 112 50 102" stroke="#5a3a1e" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M14 64 C14 34 38 18 64 18 C90 18 114 34 114 64 C106 56 96 56 89 64 C82 56 72 56 64 64 C56 56 46 56 39 64 C32 56 22 56 14 64 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M64 18 C52 30 42 46 39 64 M64 18 C76 30 86 46 89 64" stroke="#8f2a22" stroke-width="2" fill="none"/>
<circle cx="64" cy="16" r="3" fill="#8f2a22"/>`;
// Winter: someone in a woolly hat and scarf.
const bundled = `${person(64, 52, 'blue', 1.9)}
<path d="M42 32 C42 8 86 8 86 32 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M40 30 H88 V38 H40 Z" fill="#f7f7f5" stroke="#8a9aa5" stroke-width="2" stroke-linejoin="round"/>
<circle cx="64" cy="8" r="6" fill="#f7f7f5" stroke="#8a9aa5" stroke-width="2"/>
<path d="M38 80 C50 88 78 88 90 80 L90 92 C78 100 50 100 38 92 Z M72 92 L70 122 H82 L84 94 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
${flake(16, 24, 7)}${flake(110, 48, 6)}${flake(20, 96, 6)}`;
return {
  art: {
  'tin-hei': svg('Sun behind a cloud', `${sun(78, 44, 20)}\n${cloud(56, 96, 1)}\n${rain(40, 72, 104, 1)}`),
  'taai-joeng': svg('The sun', sun(64, 64, 30)),
  wan: svg('A cloud', cloud(64, 84, 1.3)),
  'tin-cing': svg('A sunny sky', `<rect x="8" y="8" width="112" height="112" rx="20" fill="#bfe0f2"/>\n${sun(56, 54, 22)}\n${cloud(92, 102, 0.55)}`),
  'jam-tin': svg('Grey clouds', `${cloud(78, 58, 0.9, 'grey')}\n${cloud(56, 94, 1.1, 'grey')}`),
  'daai-fung': svg('A strong wind', `${gusts}\n${leaf(104, 30, 60, '#3a9a6e', '#26684a', 0.6)}\n${leaf(80, 104, 120, '#3a9a6e', '#26684a', 0.55)}`),
  'haang-leoi': svg('A thunderstorm', `${cloud(64, 60, 1.1, 'dark')}\n${bolt(66, 62)}\n${rain(34, 44, 78, 2)}${rain(92, 102, 78, 2)}`),
  'gwai-zit': svg('The four seasons', `<rect x="6" y="6" width="56" height="56" rx="10" fill="#fbe3ea"/><rect x="66" y="6" width="56" height="56" rx="10" fill="#fdf0c4"/>
<rect x="6" y="66" width="56" height="56" rx="10" fill="#f7dcc4"/><rect x="66" y="66" width="56" height="56" rx="10" fill="#dcecf8"/>
${blossom(34, 34, 11)}\n${sun(94, 34, 12)}\n${leaf(34, 110, 20, '#e07a2c', '#9a4a14', 0.9)}\n${flake(94, 94, 16)}`),
  'ceon-tin': svg('Spring blossom', `<path d="M8 112 C40 96 60 70 70 40 M50 80 C70 78 90 66 104 52 M62 56 C54 40 40 30 28 26" stroke="#6b4a2e" stroke-width="5" fill="none" stroke-linecap="round"/>
${leaf(82, 64, 110, '#7cc47f', '#3a8a4e', 0.45)}${leaf(40, 88, -40, '#7cc47f', '#3a8a4e', 0.45)}
${[[70, 34, 11], [104, 48, 10], [28, 22, 10], [46, 72, 9], [90, 80, 8]].map(([x, y, r]) => blossom(x, y, r)).join('\n')}`),
  'haa-tin': svg('Summer sun over the sea', `${sun(64, 44, 22)}
<path d="M4 92 Q20 82 36 92 T68 92 T100 92 T132 92 V124 H4 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M12 108 Q24 102 36 108 M60 112 Q72 106 84 112" stroke="#bfe0f2" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  'cau-tin': svg('Autumn leaves falling', [[40, 60, -30, '#e07a2c', '#9a4a14', 1.2], [90, 50, 40, '#d6453a', '#8f2a22', 1], [70, 110, 10, '#e0a526', '#9a6c0e', 1.1], [104, 108, 70, '#e07a2c', '#9a4a14', 0.8]]
    .map(a => leaf(...a)).join('\n')),
  'dung-tin': svg('Wrapped up for winter', bundled),
  umbrella: svg('An umbrella', umbrella),
  },
  sun, CLOUD, cloud, rain, flake,
};
})();

// Unit 14 · Body & Health 身體. Its own drawings (unit14/art.mjs: aches, a runny nose, prescriptions) use part and
// prescription too.
export const unit14 = (() => {
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
};
for (const id of Object.keys(PART)) art[id] = svg(V.body.find(e => e.id === id).english.replace(/;.*/, ''), part(id));
return {
  art,
  part, prescription,
};
})();

// Unit 17 · Feelings 心情
const unit17 = (() => {
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
return {
  art: {
  'hoi-sam': svg('A happy face, grinning', face({ mouth: 'grin', eyes: 'happy', extra: cheeks })),
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
  },
};
})();

// Unit 18 · Comparing 比較
const unit18 = (() => {
// A small ball and a big one, standing on the ground.
const balls = `${shadow(24, 118, 16)}${shadow(84, 118, 34)}${ball(24, 102, 16)}${ball(84, 84, 34)}`;
// A tall person and a short one, standing on the ground (feet at y 118),
// centred on x 38 and 94. figure()'s head is at y 7–32, its feet at 117.
const stand = (x, s) => `<g transform="translate(${+(x - 64 * s).toFixed(1)} ${+(118 - 117 * s).toFixed(1)}) scale(${s})">${figure()}</g>`;
const TALL = 0.9, SHORT = 0.6;
const people = `${stand(38, TALL)}${stand(94, SHORT)}`;
const top = s => 118 - 117 * s + 7 * s - 3;
const tallTop = top(TALL), shortTop = top(SHORT);
// Speed lines trailing to the left of x, around y.
const lines = (x, y) => `<path d="M${x} ${y} h-22 M${x + 4} ${y + 12} h-30 M${x} ${y + 24} h-20" stroke="#6f8796" stroke-width="3" stroke-linecap="round"/>`;
// A snail crawling right, and its silvery trail.
const snail = `${shadow(64, 106, 44)}
<path d="M8 104 H40" stroke="#c9d3da" stroke-width="4" stroke-linecap="round"/>
<path d="M34 104 C34 94 44 92 56 92 H96 C104 92 108 86 106 76 C106 70 110 66 114 70 C118 76 116 90 110 98 C106 104 100 106 92 106 H40 C36 106 34 106 34 104 Z" fill="#e9c28a" stroke="#a8773c" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M108 70 L104 52 M114 70 L118 54" stroke="#a8773c" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="104" cy="51" r="3.5" fill="#3b2f2a"/><circle cx="118" cy="53" r="3.5" fill="#3b2f2a"/>
<circle cx="66" cy="68" r="28" fill="#c9804a" stroke="#7d4f1e" stroke-width="3"/>
<path d="M66 68 m0 -6 a6 6 0 1 1 -6 6 a12 12 0 1 1 12 12 a18 18 0 1 1 -18 -18" stroke="#7d4f1e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
// A three-step podium, the winner's step in the middle with a gold star.
const star = (x, y, r) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = Math.PI / 5 * i - Math.PI / 2, d = i % 2 ? r * 0.45 : r;
    return `${(x + d * Math.cos(a)).toFixed(1)} ${(y + d * Math.sin(a)).toFixed(1)}`;
  });
  return `<path d="M${pts.join(' L')} Z" fill="#f7d35c" stroke="#c9961a" stroke-width="2" stroke-linejoin="round"/>`;
};
const podium = `${floor}
<rect x="8" y="84" width="38" height="38" fill="#c9d3da" stroke="#6f8796" stroke-width="2.5"/>
<rect x="45" y="60" width="38" height="62" fill="#e0a526" stroke="#9a6c0e" stroke-width="2.5"/>
<rect x="82" y="96" width="38" height="26" fill="#d89a6a" stroke="#9c6528" stroke-width="2.5"/>
${star(64, 34, 20)}`;
return {
  art: {
  daai6: svg('A big ball and a small one, the big one marked', `${balls}${arrow(84, 42)}`),
  sai3: svg('A big ball and a small one, the small one marked', `${balls}${arrow(24, 80)}`),
  gou: svg('A tall person and a short one, the tall one marked', `${people}${arrow(40, tallTop)}`),
  ai: svg('A tall person and a short one, the short one marked', `${people}${arrow(94, shortTop)}`),
  faai: svg('A car speeding along', `<g transform="translate(18 8) scale(.86)">${car}</g>${lines(22, 52)}`),
  maan6: svg('A snail, crawling slowly', snail),
  zeoi: svg('A podium, with a gold star over the winner', podium),
  'jat-joeng': svg('Two balls the same size', `${shadow(30, 104, 22)}${shadow(98, 104, 22)}${ball(30, 80, 22)}${ball(98, 80, 22)}
<path d="M56 74 H72 M56 86 H72" stroke="#e0a526" stroke-width="5" stroke-linecap="round"/>`),
  },
};
})();

// Unit 19 · Animals 動物
const unit19 = (() => {
const INK = '#2a2a2a';
const eye = (x, y, r = 3.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
// A thick outlined stroke along `d`: a tail, a snake, a dragon's body.
const tube = (d, fill, line, w) => `<path d="${d}" stroke="${line}" stroke-width="${w + 5}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${d}" stroke="${fill}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
// A body sitting up, facing us, its bottom on y 114.
const sitting = (fill, line) => `<path d="M36 114 C32 90 42 74 64 74 C86 74 96 90 92 114 Z" fill="${fill}" stroke="${line}" stroke-width="3" stroke-linejoin="round"/>`;
return {
  art: {
  mouse: svg('Mouse', `${shadow(64, 112, 44)}
<path d="M100 100 C118 104 124 88 116 76" stroke="#e8a0a8" stroke-width="4" fill="none" stroke-linecap="round"/>
<ellipse cx="46" cy="110" rx="8" ry="4" fill="#e8a0a8"/><ellipse cx="84" cy="110" rx="8" ry="4" fill="#e8a0a8"/>
<path d="M18 90 C22 72 38 60 60 60 C86 60 106 72 106 92 C106 104 96 108 82 108 H42 C30 108 16 100 18 90 Z" fill="#b8c2c9" stroke="#5f6d78" stroke-width="3" stroke-linejoin="round"/>
<circle cx="50" cy="54" r="15" fill="#b8c2c9" stroke="#5f6d78" stroke-width="3"/><circle cx="50" cy="54" r="8" fill="#f2b8c0"/>
${eye(36, 78)}<circle cx="19" cy="89" r="4" fill="#e0707a"/>
<path d="M24 92 l-14 -5 M24 95 l-14 3" stroke="#5f6d78" stroke-width="1.5" stroke-linecap="round"/>`),

  tiger: svg('Tiger', `${shadow(64, 114, 36)}
${tube('M92 108 C112 108 116 88 106 80', '#f08a24', '#8a4a12', 6)}
${sitting('#f08a24', '#8a4a12')}
<ellipse cx="64" cy="100" rx="14" ry="12" fill="#fbe8d0"/>
<path d="M38 92 l10 3 M90 92 l-10 3 M37 104 l10 2 M91 104 l-10 2" stroke="#3b2a1e" stroke-width="3" stroke-linecap="round"/>
<path d="M54 114 v-10 M74 114 v-10" stroke="#8a4a12" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="40" cy="30" r="10" fill="#f08a24" stroke="#8a4a12" stroke-width="3"/><circle cx="40" cy="30" r="5" fill="#fbe8d0"/>
<circle cx="88" cy="30" r="10" fill="#f08a24" stroke="#8a4a12" stroke-width="3"/><circle cx="88" cy="30" r="5" fill="#fbe8d0"/>
<ellipse cx="64" cy="50" rx="30" ry="26" fill="#f08a24" stroke="#8a4a12" stroke-width="3"/>
<path d="M58 28 l2 8 M64 27 v9 M70 28 l-2 8 M35 46 l10 2 M35 55 l10 0 M93 46 l-10 2 M93 55 l-10 0" stroke="#3b2a1e" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="64" cy="61" rx="14" ry="10" fill="#fbe8d0"/>
<ellipse cx="52" cy="46" rx="4" ry="5" fill="${INK}"/><ellipse cx="76" cy="46" rx="4" ry="5" fill="${INK}"/>
<path d="M60 56 h8 l-4 4z" fill="#3b2a1e"/>
<path d="M64 60 q-4 5 -8 2 M64 60 q4 5 8 2" stroke="#3b2a1e" stroke-width="2" fill="none" stroke-linecap="round"/>`),

  rabbit: svg('Rabbit', `${shadow(64, 116, 36)}
<circle cx="94" cy="106" r="8" fill="#ffffff" stroke="#8a8f96" stroke-width="2.5"/>
${sitting('#f4f1ec', '#8a8f96')}
<ellipse cx="50" cy="116" rx="11" ry="5" fill="#f4f1ec" stroke="#8a8f96" stroke-width="2.5"/><ellipse cx="78" cy="116" rx="11" ry="5" fill="#f4f1ec" stroke="#8a8f96" stroke-width="2.5"/>
<g transform="rotate(-10 52 30)"><ellipse cx="52" cy="30" rx="9" ry="24" fill="#f4f1ec" stroke="#8a8f96" stroke-width="3"/><ellipse cx="52" cy="32" rx="4.5" ry="16" fill="#f2b8c0"/></g>
<g transform="rotate(10 76 30)"><ellipse cx="76" cy="30" rx="9" ry="24" fill="#f4f1ec" stroke="#8a8f96" stroke-width="3"/><ellipse cx="76" cy="32" rx="4.5" ry="16" fill="#f2b8c0"/></g>
<circle cx="64" cy="62" r="23" fill="#f4f1ec" stroke="#8a8f96" stroke-width="3"/>
${eye(55, 58)}${eye(73, 58)}
<circle cx="48" cy="68" r="4.5" fill="#f2b8c0" opacity=".7"/><circle cx="80" cy="68" r="4.5" fill="#f2b8c0" opacity=".7"/>
<path d="M61 65 h6 l-3 3z" fill="#e0707a"/>
<path d="M64 68 v3 M64 71 q-3 3 -6 1 M64 71 q3 3 6 1" stroke="#8a6a6a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`),

  dragon: svg('A Chinese dragon', `${shadow(60, 116, 44)}
${tube('M92 72 C86 94 66 80 56 96 C48 110 30 102 20 108', '#3a9a6e', '#1f5e40', 16)}
<path d="M92 72 C86 94 66 80 56 96 C48 110 30 102 20 108" stroke="#f7d35c" stroke-width="4" stroke-dasharray="2 7" fill="none" stroke-linecap="round"/>
<path d="M22 100 L8 96 L14 106 L4 112 L18 114 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2" stroke-linejoin="round"/>
<path d="M112 40 L124 44 L116 50 L126 56 L114 60 L120 68 L106 66 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2" stroke-linejoin="round"/>
<path d="M98 38 L102 18 M101 26 L110 20 M88 40 L86 22 M87 30 L79 24" stroke="#e0a526" stroke-width="4" stroke-linecap="round"/>
<path d="M84 42 C92 32 112 34 114 50 C116 62 108 72 96 72 C90 72 86 70 82 68 L66 66 C58 64 58 52 66 50 Z" fill="#3a9a6e" stroke="#1f5e40" stroke-width="3" stroke-linejoin="round"/>
<circle cx="96" cy="50" r="6" fill="#ffffff" stroke="#1f5e40" stroke-width="1.5"/>${eye(94, 50, 3)}
<circle cx="68" cy="56" r="2" fill="#1f5e40"/>
<path d="M66 60 C54 62 50 54 42 58 M68 64 C58 72 52 70 46 78" stroke="#e0a526" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),

  snake: svg('Snake', `${shadow(64, 116, 46)}
${tube('M16 110 C50 118 108 114 104 100 C100 86 36 94 34 78 C32 64 60 60 66 50', '#5fa33a', '#3f7a22', 12)}
<path d="M16 110 C50 118 108 114 104 100 C100 86 36 94 34 78 C32 64 60 60 66 50" stroke="#e7d36a" stroke-width="3" stroke-dasharray="3 9" fill="none" stroke-linecap="round"/>
<path d="M86 42 h10 l5 -4 M96 42 l5 4" stroke="#d6453a" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="74" cy="42" rx="15" ry="11" fill="#5fa33a" stroke="#3f7a22" stroke-width="3"/>
${eye(78, 38, 3)}<circle cx="86" cy="43" r="1.3" fill="#3f7a22"/>`),

  horse: svg('Horse', `${shadow(70, 116, 44)}
<path d="M104 68 C120 72 122 92 112 106" stroke="#3b2a1e" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M52 86 V112 M62 88 V112 M86 88 V112 M96 86 V112" stroke="#6e4420" stroke-width="10" stroke-linecap="round"/>
<path d="M52 86 V112 M62 88 V112 M86 88 V112 M96 86 V112" stroke="#b5763a" stroke-width="6" stroke-linecap="round"/>
<rect x="47" y="110" width="10" height="5" rx="1.5" fill="#3b2a1e"/><rect x="57" y="110" width="10" height="5" rx="1.5" fill="#3b2a1e"/>
<rect x="81" y="110" width="10" height="5" rx="1.5" fill="#3b2a1e"/><rect x="91" y="110" width="10" height="5" rx="1.5" fill="#3b2a1e"/>
<ellipse cx="76" cy="76" rx="32" ry="18" fill="#b5763a" stroke="#6e4420" stroke-width="3"/>
<path d="M44 70 L30 32 L46 26 L60 66 Z" fill="#b5763a" stroke="#6e4420" stroke-width="3" stroke-linejoin="round"/>
<path d="M26 24 C34 18 46 22 48 32 L40 56 C38 62 28 62 24 58 C20 52 20 34 26 24 Z" fill="#b5763a" stroke="#6e4420" stroke-width="3" stroke-linejoin="round"/>
<path d="M38 22 L42 10 L46 22 Z" fill="#b5763a" stroke="#6e4420" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M46 22 C54 34 56 50 60 64" stroke="#3b2a1e" stroke-width="6" fill="none" stroke-linecap="round"/>
<ellipse cx="29" cy="52" rx="7" ry="8" fill="#9a5f2c"/><circle cx="27" cy="55" r="1.6" fill="#3b2a1e"/>
${eye(36, 34)}`),

  sheep: svg('Sheep', `${shadow(66, 116, 42)}
<path d="M54 98 V114 M66 100 V114 M82 100 V114 M94 98 V114" stroke="#3b3b3b" stroke-width="5" stroke-linecap="round"/>
<g fill="#fbf8f1" stroke="#8a8f96" stroke-width="2.5">
<circle cx="56" cy="70" r="16"/><circle cx="76" cy="62" r="17"/><circle cx="96" cy="72" r="15"/>
<circle cx="92" cy="90" r="15"/><circle cx="70" cy="94" r="16"/><circle cx="50" cy="88" r="14"/>
</g>
<ellipse cx="73" cy="80" rx="26" ry="17" fill="#fbf8f1"/>
<ellipse cx="34" cy="72" rx="13" ry="17" fill="#3b3b3b" stroke="#8a8f96" stroke-width="2" transform="rotate(-20 34 72)"/>
<ellipse cx="24" cy="60" rx="8" ry="4" fill="#3b3b3b" stroke="#8a8f96" stroke-width="2" transform="rotate(-25 24 60)"/>
<circle cx="42" cy="56" r="9" fill="#fbf8f1" stroke="#8a8f96" stroke-width="2.5"/>
<circle cx="31" cy="68" r="2.5" fill="#ffffff"/>`),

  monkey: svg('Monkey', `${shadow(64, 114, 36)}
<path d="M90 106 C114 106 118 80 104 76 C94 74 94 90 104 88" stroke="#9c6528" stroke-width="5" fill="none" stroke-linecap="round"/>
${sitting('#9c6528', '#5a3a1e')}
<ellipse cx="64" cy="100" rx="15" ry="13" fill="#e9c9a0"/>
<path d="M54 114 v-10 M74 114 v-10" stroke="#5a3a1e" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="36" cy="52" r="11" fill="#9c6528" stroke="#5a3a1e" stroke-width="3"/><circle cx="36" cy="52" r="5.5" fill="#e9c9a0"/>
<circle cx="92" cy="52" r="11" fill="#9c6528" stroke="#5a3a1e" stroke-width="3"/><circle cx="92" cy="52" r="5.5" fill="#e9c9a0"/>
<circle cx="64" cy="50" r="27" fill="#9c6528" stroke="#5a3a1e" stroke-width="3"/>
<path d="M64 40 C56 30 42 34 44 48 C44 62 54 72 64 72 C74 72 84 62 84 48 C86 34 72 30 64 40 Z" fill="#e9c9a0"/>
${eye(56, 48)}${eye(72, 48)}
<circle cx="61" cy="57" r="1.6" fill="#5a3a1e"/><circle cx="67" cy="57" r="1.6" fill="#5a3a1e"/>
<path d="M56 63 q8 6 16 0" stroke="#5a3a1e" stroke-width="2" fill="none" stroke-linecap="round"/>`),

  pig: svg('Pig', `${shadow(64, 116, 36)}
<path d="M92 104 c9 -1 11 -10 5 -12 c-6 -2 -7 7 1 6" stroke="#b8667a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
${sitting('#f4b6c2', '#b8667a')}
<ellipse cx="50" cy="114" rx="8" ry="4" fill="#b8667a"/><ellipse cx="78" cy="114" rx="8" ry="4" fill="#b8667a"/>
<path d="M40 38 L34 16 L56 28 Z M88 38 L94 16 L72 28 Z" fill="#f4b6c2" stroke="#b8667a" stroke-width="3" stroke-linejoin="round"/>
<circle cx="64" cy="54" r="28" fill="#f4b6c2" stroke="#b8667a" stroke-width="3"/>
${eye(52, 48)}${eye(76, 48)}
<circle cx="44" cy="62" r="5" fill="#eb8fa2" opacity=".6"/><circle cx="84" cy="62" r="5" fill="#eb8fa2" opacity=".6"/>
<ellipse cx="64" cy="64" rx="13" ry="9" fill="#eb8fa2" stroke="#b8667a" stroke-width="2.5"/>
<ellipse cx="59.5" cy="64" rx="2.2" ry="3.2" fill="#b8667a"/><ellipse cx="68.5" cy="64" rx="2.2" ry="3.2" fill="#b8667a"/>`),

  bird: svg('Bird, on a branch', `
<path d="M8 104 H120" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>
<path d="M100 104 C104 94 114 92 118 96 C114 102 106 104 100 104 Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2"/>
<path d="M58 92 V104 M70 92 V104 M54 104 h8 M66 104 h8" stroke="#e8923a" stroke-width="3" stroke-linecap="round"/>
<path d="M92 62 L118 50 L112 74 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="64" cy="68" rx="30" ry="26" fill="#5aa0d8" stroke="#24507f" stroke-width="3"/>
<ellipse cx="56" cy="78" rx="17" ry="14" fill="#f7e3a8"/>
<path d="M66 62 C82 58 94 66 92 78 C84 80 72 76 66 62 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="2" stroke-linejoin="round"/>
<path d="M36 60 L22 65 L36 70 Z" fill="#e8923a" stroke="#b5651f" stroke-width="2" stroke-linejoin="round"/>
${eye(46, 58)}<circle cx="47" cy="57" r="1" fill="#ffffff"/>`),

  panda: svg('Panda, holding bamboo', `${shadow(64, 118, 38)}
<path d="M100 118 L112 34" stroke="#3f7a22" stroke-width="9" stroke-linecap="round"/>
<path d="M100 118 L112 34" stroke="#7cc24f" stroke-width="5" stroke-linecap="round"/>
<path d="M102.5 100 l4 1 M105 82 l4 1 M107.5 64 l4 1 M110 46 l4 1" stroke="#3f7a22" stroke-width="2"/>
<path d="M112 40 C120 30 126 32 124 38 C120 40 116 40 112 40 Z" fill="#7cc24f" stroke="#3f7a22" stroke-width="1.5"/>
${sitting('#ffffff', '#5f6a72')}
<ellipse cx="46" cy="112" rx="14" ry="9" fill="${INK}"/><ellipse cx="82" cy="112" rx="14" ry="9" fill="${INK}"/>
<path d="M38 82 C44 72 84 72 90 82 L94 96 C88 90 82 88 78 90 L50 90 C46 88 40 90 34 96 Z" fill="${INK}"/>
<circle cx="102" cy="90" r="8" fill="${INK}"/>
<circle cx="38" cy="26" r="11" fill="${INK}"/><circle cx="90" cy="26" r="11" fill="${INK}"/>
<ellipse cx="64" cy="48" rx="31" ry="27" fill="#ffffff" stroke="#5f6a72" stroke-width="3"/>
<ellipse cx="51" cy="48" rx="8" ry="10" fill="${INK}" transform="rotate(30 51 48)"/><ellipse cx="77" cy="48" rx="8" ry="10" fill="${INK}" transform="rotate(-30 77 48)"/>
<circle cx="52" cy="47" r="3" fill="#ffffff"/><circle cx="76" cy="47" r="3" fill="#ffffff"/>
<ellipse cx="64" cy="59" rx="4" ry="3" fill="${INK}"/>
<path d="M64 62 q-4 4 -7 2 M64 62 q4 4 7 2" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`),

  'dung-mat-jyun': svg('A zoo gate, with a paw print on the sign', `
<path d="M4 118 H124" stroke="#9fb0bb" stroke-width="3" stroke-linecap="round"/>
<rect x="60" y="84" width="8" height="30" fill="#8a5a2b"/>
<circle cx="64" cy="76" r="18" fill="#5fa33a" stroke="#3f7a22" stroke-width="2.5"/>
<path d="M32 118 V74 M44 118 V74 M84 118 V74 M96 118 V74 M28 80 H100" stroke="#6f8796" stroke-width="3" stroke-linecap="round"/>
<rect x="14" y="48" width="16" height="70" rx="2" fill="#c98a4a" stroke="#7d4f1e" stroke-width="2.5"/>
<rect x="98" y="48" width="16" height="70" rx="2" fill="#c98a4a" stroke="#7d4f1e" stroke-width="2.5"/>
<path d="M10 50 Q64 10 118 50 L118 60 Q64 22 10 60 Z" fill="#3a9a6e" stroke="#1f5e40" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="40" y="16" width="48" height="26" rx="5" fill="#f7d35c" stroke="#9a6c0e" stroke-width="2.5"/>
<ellipse cx="64" cy="33" rx="6.5" ry="5" fill="#7d4f1e"/>
<circle cx="55" cy="26" r="2.8" fill="#7d4f1e"/><circle cx="61" cy="22.5" r="2.8" fill="#7d4f1e"/>
<circle cx="67" cy="22.5" r="2.8" fill="#7d4f1e"/><circle cx="73" cy="26" r="2.8" fill="#7d4f1e"/>`),
  },
};
})();

// Unit 20 · Fruit & Vegetables 生果同菜
const unit20 = (() => {
const leaf = (x, y, flip = 1) => `<path d="M${x} ${y} C${x + 8 * flip} ${y - 13} ${x + 24 * flip} ${y - 13} ${x + 28 * flip} ${y - 7} C${x + 20 * flip} ${y + 3} ${x + 8 * flip} ${y + 3} ${x} ${y} Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2" stroke-linejoin="round"/>`;
const stalk = (x, y) => `<path d="M${x} ${y} C${x} ${y - 6} ${x + 2} ${y - 12} ${x + 5} ${y - 16}" stroke="#6b4423" stroke-width="4" fill="none" stroke-linecap="round"/>`;
const shine = d => `<path d="${d}" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".45"/>`;
// A green star of leaves on top of a strawberry or a tomato, centred on x, y.
const calyx = (x, y, r) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = Math.PI / 5 * i - Math.PI / 2, d = i % 2 ? r * 0.35 : r;
    return `${(x + d * Math.cos(a)).toFixed(1)} ${(y + d * Math.sin(a) * 0.6).toFixed(1)}`;
  });
  return `<path d="M${pts.join(' L')} Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2" stroke-linejoin="round"/>`;
};
// Grapes: a bunch in rows of 4, 3, 2 and 1.
const GRAPES = [[34, 42], [54, 42], [74, 42], [94, 42], [44, 60], [64, 60], [84, 60], [54, 78], [74, 78], [64, 96]];
return {
  art: {
  banana: svg('Bananas', `${shadow(64, 112, 44)}
<path d="M20 50 C24 92 76 110 110 84 C114 80 110 74 104 76 C80 92 42 84 32 50 Z" fill="#f5d33f" stroke="#b8921a" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 44 C36 80 84 94 112 66 C116 62 112 56 106 58 C84 76 48 72 40 44 Z" fill="#f9df5c" stroke="#b8921a" stroke-width="3" stroke-linejoin="round"/>
<path d="M36 70 C50 84 72 88 92 80" stroke="#d9b12a" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M22 50 L20 38 L34 36 L40 44" fill="#7a5a1e" stroke="#5a3f12" stroke-width="2" stroke-linejoin="round"/>`),

  grapes: svg('A bunch of grapes', `${shadow(64, 114, 30)}
${stalk(64, 34)}${leaf(68, 26)}
${GRAPES.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="#7b4bb0" stroke="#4b2a78" stroke-width="2.5"/><path d="M${x - 5} ${y - 3} q2 -4 6 -5" stroke="#b996e0" stroke-width="2.5" fill="none" stroke-linecap="round"/>`).join('\n')}`),

  strawberry: svg('Strawberry', `${shadow(64, 116, 28)}
<path d="M64 112 C40 100 22 72 28 52 C32 38 50 34 64 40 C78 34 96 38 100 52 C106 72 88 100 64 112 Z" fill="#e0342b" stroke="#a51f18" stroke-width="3" stroke-linejoin="round"/>
${shine('M40 56 C38 64 40 72 44 78')}
<g fill="#f7d35c">${[[52, 56], [70, 54], [86, 62], [58, 72], [76, 74], [48, 84], [66, 90], [80, 86], [62, 102]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.8" ry="2.6"/>`).join('')}</g>
${calyx(64, 40, 24)}${stalk(64, 34)}`),

  mango: svg('Mango', `${shadow(64, 114, 40)}
<path d="M30 74 C26 46 54 28 82 34 C104 40 110 66 100 86 C90 106 62 112 46 104 C36 98 32 88 30 74 Z" fill="#f7b733" stroke="#b5781a" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="80" cy="54" rx="20" ry="14" fill="#f06a3a" opacity=".55" transform="rotate(20 80 54)"/>
${shine('M40 66 C40 58 44 52 50 48')}
${stalk(80, 36)}${leaf(84, 22)}`),

  pineapple: svg('Pineapple', `${shadow(64, 118, 32)}
<path d="M64 46 L52 10 L62 30 L64 4 L68 30 L78 12 L70 46 Z M60 46 L36 22 L56 40 Z M68 46 L94 24 L74 42 Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2" stroke-linejoin="round"/>
<defs><clipPath id="pine"><ellipse cx="64" cy="82" rx="30" ry="34"/></clipPath></defs>
<ellipse cx="64" cy="82" rx="30" ry="34" fill="#f2b233"/>
<g clip-path="url(#pine)" stroke="#c07a1a" stroke-width="2.5">
<path d="M24 60 L84 120 M24 80 L64 120 M34 50 L104 120 M54 48 L104 98 M74 48 L104 78"/>
<path d="M104 60 L44 120 M104 80 L64 120 M94 50 L24 120 M74 48 L24 98 M54 48 L24 78"/>
</g>
<ellipse cx="64" cy="82" rx="30" ry="34" fill="none" stroke="#a8741c" stroke-width="3"/>`),

  pear: svg('Pear', `${shadow(64, 116, 32)}
<path d="M64 30 C54 30 52 42 52 52 C52 62 32 72 32 92 C32 108 46 114 64 114 C82 114 96 108 96 92 C96 72 76 62 76 52 C76 42 74 30 64 30 Z" fill="#c9d86a" stroke="#7f8f2a" stroke-width="3" stroke-linejoin="round"/>
${shine('M42 86 C42 78 46 72 52 68')}
${stalk(64, 32)}${leaf(68, 22)}`),

  'choy-sum': svg('Choy sum, a bundle of greens with yellow flowers', `${shadow(64, 118, 30)}
<path d="M64 116 L40 40 M64 116 L56 30 M64 116 L74 28 M64 116 L90 40" stroke="#8cc45a" stroke-width="6" stroke-linecap="round"/>
<path d="M64 116 L40 40 M64 116 L56 30 M64 116 L74 28 M64 116 L90 40" stroke="#b9e08a" stroke-width="2.5" stroke-linecap="round"/>
<g fill="#3f9a45" stroke="#2a6b2e" stroke-width="2">
<ellipse cx="42" cy="68" rx="12" ry="22" transform="rotate(-20 42 68)"/><ellipse cx="86" cy="68" rx="12" ry="22" transform="rotate(20 86 68)"/>
<ellipse cx="60" cy="56" rx="11" ry="22" transform="rotate(-6 60 56)"/><ellipse cx="72" cy="58" rx="11" ry="22" transform="rotate(8 72 58)"/>
</g>
<g fill="#f7d35c" stroke="#c9961a" stroke-width="1.2">${[[40, 36], [46, 32], [56, 26], [62, 30], [74, 24], [80, 30], [90, 36], [86, 42]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5"/>`).join('')}</g>
<rect x="54" y="98" width="20" height="7" rx="2" fill="#d6453a" stroke="#8f2a22" stroke-width="1.5"/>`),

  'bok-choy': svg('Bok choy', `${shadow(64, 118, 30)}
<g fill="#3f9a45" stroke="#2a6b2e" stroke-width="2.5">
<circle cx="44" cy="46" r="20"/><circle cx="84" cy="46" r="20"/><circle cx="64" cy="32" r="22"/>
</g>
<path d="M40 116 C36 90 42 66 52 54 L76 54 C86 66 92 90 88 116 Z" fill="#f1f5e6" stroke="#8fa06a" stroke-width="3" stroke-linejoin="round"/>
<path d="M54 60 C50 80 52 100 54 114 M64 58 V114 M74 60 C78 80 76 100 74 114" stroke="#b9c99a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M50 50 C56 40 72 40 78 50" stroke="#2a6b2e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),

  tomato: svg('Tomato', `${shadow(64, 114, 38)}
<ellipse cx="64" cy="74" rx="42" ry="37" fill="#e8412c" stroke="#a8261a" stroke-width="3"/>
${shine('M36 64 C36 56 40 50 46 46')}
${calyx(64, 40, 22)}${stalk(62, 38)}`),

  potato: svg('Potato', `${shadow(64, 112, 44)}
<path d="M22 70 C20 50 42 40 64 42 C86 40 108 50 106 72 C104 94 84 104 62 102 C40 102 24 90 22 70 Z" fill="#c9954f" stroke="#8a5f2a" stroke-width="3" stroke-linejoin="round"/>
<g fill="#8a5f2a"><circle cx="44" cy="60" r="2.2"/><circle cx="76" cy="56" r="2"/><circle cx="90" cy="76" r="2.2"/><circle cx="56" cy="86" r="2"/><circle cx="70" cy="74" r="1.6"/></g>
${shine('M34 64 C36 56 42 52 50 50')}`),

  carrot: svg('Carrot', `${shadow(64, 116, 40)}
<path d="M98 36 C94 20 100 10 108 6 M100 40 C110 26 120 24 126 28 M96 38 C84 26 78 16 80 8" stroke="#5fa33a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M20 112 C36 98 72 60 88 44 C96 36 108 46 102 54 C88 70 52 102 20 112 Z" fill="#f08a24" stroke="#b5651c" stroke-width="3" stroke-linejoin="round"/>
<path d="M44 92 l8 4 M60 78 l8 4 M76 62 l8 4 M52 86 l-4 -6 M70 70 l-4 -6" stroke="#b5651c" stroke-width="2" stroke-linecap="round"/>`),

  'gaai-si': svg('A market stall with greens and oranges under a striped awning', `
<path d="M4 120 H124" stroke="#9fb0bb" stroke-width="3" stroke-linecap="round"/>
<path d="M18 40 V118 M110 40 V118" stroke="#7d4f1e" stroke-width="5" stroke-linecap="round"/>
<path d="M8 22 H120 L114 42 H14 Z" fill="#ffffff" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M22 22 L20 42 H34 L36 22 Z M50 22 L49 42 H63 L64 22 Z M78 22 L78 42 H92 L92 22 Z M106 22 L107 42 H114 L120 22 Z" fill="#d6453a"/>
<path d="M14 42 Q21 50 28 42 Q35 50 42 42 Q49 50 56 42 Q63 50 70 42 Q77 50 84 42 Q91 50 98 42 Q105 50 114 42" fill="#d6453a" stroke="#8f2a22" stroke-width="2" stroke-linejoin="round"/>
<rect x="12" y="84" width="104" height="34" rx="2" fill="#c98a4a" stroke="#7d4f1e" stroke-width="2.5"/>
<path d="M12 96 H116" stroke="#7d4f1e" stroke-width="2"/>
<g fill="#3f9a45" stroke="#2a6b2e" stroke-width="2"><ellipse cx="30" cy="78" rx="10" ry="8"/><ellipse cx="44" cy="76" rx="10" ry="9"/><ellipse cx="38" cy="70" rx="9" ry="7"/></g>
<g fill="#f39422" stroke="#b5650c" stroke-width="2"><circle cx="76" cy="78" r="7"/><circle cx="90" cy="78" r="7"/><circle cx="104" cy="78" r="7"/><circle cx="83" cy="68" r="7"/><circle cx="97" cy="68" r="7"/></g>
<rect x="56" y="58" width="16" height="12" rx="2" fill="#ffffff" stroke="#8a9aa5" stroke-width="1.5"/><path d="M64 70 V84" stroke="#7d4f1e" stroke-width="2"/>
<path d="M60 64 h8" stroke="#d6453a" stroke-width="2" stroke-linecap="round"/>`),

  gan1: svg('A market scale, weighing oranges', `${shadow(64, 118, 40)}
<path d="M34 50 H94 L88 60 H40 Z" fill="#c8ced3" stroke="#6f8796" stroke-width="2.5" stroke-linejoin="round"/>
<g fill="#f39422" stroke="#b5650c" stroke-width="2"><circle cx="52" cy="40" r="9"/><circle cx="76" cy="40" r="9"/><circle cx="64" cy="30" r="9"/></g>
<rect x="60" y="60" width="8" height="10" fill="#6f8796"/>
<path d="M28 116 L36 70 H92 L100 116 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="64" cy="92" r="17" fill="#ffffff" stroke="#8f2a22" stroke-width="2.5"/>
<path d="M52 84 l2 2 M64 77 v3 M76 84 l-2 2 M49 94 h3 M79 94 h-3" stroke="#6f8796" stroke-width="2" stroke-linecap="round"/>
<path d="M64 93 L73 82" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round"/><circle cx="64" cy="93" r="2.5" fill="#2a2a2a"/>`),
  },
};
})();

// Unit 21 · Kitchen Appliances 廚房電器
const unit21 = (() => {
const BODY = 'fill="#f4f6f8" stroke="#8a9aa5" stroke-width="2.5" stroke-linejoin="round"';
const STEEL = 'fill="#c8ced3" stroke="#6f8796" stroke-width="2.5" stroke-linejoin="round"';
const GLASS = 'fill="#3a4148" stroke="#1d2226" stroke-width="2"';
const DARK = '#3a4148', HANDLE = '#6f8796';
  // HANDLE shows on a dark page too
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
return {
  art: {
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
  },
};
})();

export default {
  ...unit1.art,
  ...unit2.art,
  ...unit3.art,
  ...unit5.art,
  ...unit6.art,
  ...unit7.art,
  ...unit8.art,
  ...unit9.art,
  ...unit10.art,
  ...unit11.art,
  ...unit12.art,
  ...unit13.art,
  ...unit14.art,
  ...unit17.art,
  ...unit18.art,
  ...unit19.art,
  ...unit20.art,
  ...unit21.art,
};
