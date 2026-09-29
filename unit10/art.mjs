/*
 * Unit 10 illustrations. Each family word is a small family tree: 我 in
 * gold, the person or people meant in colour with an arrow, the rest
 * grey. Tree A is the family you grow up in (grandparents, parents,
 * brothers and sisters); tree B is your own (partner and children). Run
 * `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg, person, arrow, house } from '../tools/svg.mjs';

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



export default {
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
};
