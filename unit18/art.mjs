/*
 * Unit 18 illustrations: each adjective as a contrast, with a gold arrow
 * on the one meant (大 細 高 矮), a fast car and a slow snail, a podium
 * for 最 and two balls the same for 一樣. Run `node tools/draw.mjs` after
 * editing to rewrite img/<id>.svg.
 */
import { svg, ball, figure, arrow, car, shadow, floor } from '../tools/svg.mjs';

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

const art = {
  daai: svg('A big ball and a small one, the big one marked', `${balls}${arrow(84, 42)}`),
  sai: svg('A big ball and a small one, the small one marked', `${balls}${arrow(24, 80)}`),
  gou: svg('A tall person and a short one, the tall one marked', `${people}${arrow(40, tallTop)}`),
  ai: svg('A tall person and a short one, the short one marked', `${people}${arrow(94, shortTop)}`),
  faai: svg('A car speeding along', `<g transform="translate(18 8) scale(.86)">${car}</g>${lines(22, 52)}`),
  maan: svg('A snail, crawling slowly', snail),
  zeoi: svg('A podium, with a gold star over the winner', podium),
  'jat-joeng': svg('Two balls the same size', `${shadow(30, 104, 22)}${shadow(98, 104, 22)}${ball(30, 80, 22)}${ball(98, 80, 22)}
<path d="M56 74 H72 M56 86 H72" stroke="#e0a526" stroke-width="5" stroke-linecap="round"/>`),
};
export default art;
