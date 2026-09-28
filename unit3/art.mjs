/*
 * Unit 3 illustrations. The pronoun pictures share one scene: the
 * speaker (left, with a speech bubble) talks to the listener (right) while
 * a third person stands behind. The person or pair meant is coloured and
 * marked with an arrow; the rest are grey. Run `node tools/draw.mjs`
 * after editing to rewrite img/<id>.svg.
 */
import { svg, person, arrow, bubble, floor, LINE } from '../tools/svg.mjs';

// Where each person stands: [x, y, scale]. The pairs add a partner.
const AT = {
  speaker: [[24, 84, 1]], listener: [[104, 84, 1]], third: [[64, 60, 0.8]],
  speakers: [[16, 82, 1], [42, 88, 1]], listeners: [[112, 82, 1], [86, 88, 1]], thirds: [[52, 58, 0.75], [76, 58, 0.75]],
};

// The scene with `who` ("speaker"...; plural for a pair) highlighted.
function scene(who) {
  const plural = who.endsWith('s');
  const roles = ['third', 'speaker', 'listener'].map(r => plural ? r + 's' : r);
  const colour = { third: 'green', speaker: 'red', listener: 'blue' };
  const people = roles.flatMap(r => AT[r].map(([x, y, s]) => person(x, y, r === who ? colour[r.replace(/s$/, '')] : null, s)));
  const marks = AT[who].map(([x, y, s]) => arrow(x, y - 20 * s));
  return `${floor}\n${people.join('\n')}\n${bubble}\n${marks.join('\n')}`;
}

export default {
  ngo: svg('我: the speaker', scene('speaker')),
  nei: svg('你: the person being spoken to', scene('listener')),
  keoi: svg('佢: someone else', scene('third')),
  'ngo-dei': svg('我哋: the speaker and a friend', scene('speakers')),
  'nei-dei': svg('你哋: the people being spoken to', scene('listeners')),
  'keoi-dei': svg('佢哋: two other people', scene('thirds')),

  'lou-si': svg('A teacher at a blackboard', `<rect x="44" y="14" width="78" height="56" rx="3" fill="#2f5d4a" stroke="#7d4f1e" stroke-width="4"/>
<path d="M54 32 H78 M54 44 H96 M84 32 H108" stroke="#eef3f6" stroke-width="3" stroke-linecap="round"/>
<path d="M48 70 H118" stroke="#7d4f1e" stroke-width="4" stroke-linecap="round"/>
${person(34, 68, 'blue', 1.15)}
<path d="M44 96 L62 58" stroke="#7d4f1e" stroke-width="3" stroke-linecap="round"/>`),

  'hok-saang': svg('A student with a backpack and a book', `<rect x="34" y="84" width="60" height="42" rx="8" fill="#3f7cc0" stroke="#24507f" ${LINE}/>
${person(64, 58, 'gold', 1.35)}
<path d="M50 82 V104 M78 82 V104" stroke="#24507f" stroke-width="5" stroke-linecap="round"/>
<path d="M48 104 L64 110 L80 104 V124 L64 128 L48 124 Z" fill="#d6453a" stroke="#8f2a22" ${LINE}/>
<path d="M64 110 V128" stroke="#8f2a22" stroke-width="2"/>`),

  'pang-jau': svg('Two friends side by side', `${person(40, 58, 'red', 1.2)}
${person(88, 58, 'green', 1.2)}
<path d="M50 104 C58 96 70 96 78 104" stroke="#f2c9a0" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M64 20 C58 12 48 18 56 26 L64 34 L72 26 C80 18 70 12 64 20 Z" fill="#e45a4d" stroke="#8f2a22" stroke-width="2" stroke-linejoin="round"/>`),

  'hoeng-gong-jan': svg('A person in front of the Hong Kong skyline', `<path d="M4 90 V56 H16 V70 H26 V40 H36 V70 H44 V20 L50 12 L56 20 V70 H66 V46 L74 38 L82 46 V70 H92 V30 H104 V70 H112 V58 H124 V90 Z" fill="#9fb0bb"/>
<path d="M4 94 C24 88 40 98 64 92 C88 86 104 96 124 90" stroke="#6f9bc6" stroke-width="4" fill="none" stroke-linecap="round"/>
${person(64, 76, 'red', 1.1)}`),
};
