/*
 * Unit 2 illustrations: the situation each phrase is for (see `when` in
 * vocab.js). Run `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg, teapot, teacup } from '../tools/svg.mjs';

export default {
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
};
