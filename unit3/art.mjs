/*
 * Unit 3 illustrations. The pronoun pictures share one scene: the
 * speaker (left, in red, with a speech bubble) talks to the listener
 * (right) while a third person stands at the back. The speaker points at
 * the person or people meant, who are coloured (listener blue, others
 * green) inside a gold ring; the rest are grey. The person words use other
 * colours so they never look like a pronoun. Run `node tools/draw.mjs`
 * after editing to rewrite img/<id>.svg.
 */
import { svg, person, arm, ring, bubble, floor, LINE } from '../tools/svg.mjs';

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

export default {
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
};
