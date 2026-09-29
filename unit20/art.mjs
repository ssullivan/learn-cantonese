/*
 * Unit 20 illustrations: the fruit and vegetables in unit 5 and 6's style
 * (one big item, a highlight, a soft shadow), a market stall for 街市 and
 * a scale for 斤. Run `node tools/draw.mjs` after editing to rewrite
 * img/<id>.svg.
 */
import { svg, shadow } from '../tools/svg.mjs';

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

const art = {
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

  gan: svg('A market scale, weighing oranges', `${shadow(64, 118, 40)}
<path d="M34 50 H94 L88 60 H40 Z" fill="#c8ced3" stroke="#6f8796" stroke-width="2.5" stroke-linejoin="round"/>
<g fill="#f39422" stroke="#b5650c" stroke-width="2"><circle cx="52" cy="40" r="9"/><circle cx="76" cy="40" r="9"/><circle cx="64" cy="30" r="9"/></g>
<rect x="60" y="60" width="8" height="10" fill="#6f8796"/>
<path d="M28 116 L36 70 H92 L100 116 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="64" cy="92" r="17" fill="#ffffff" stroke="#8f2a22" stroke-width="2.5"/>
<path d="M52 84 l2 2 M64 77 v3 M76 84 l-2 2 M49 94 h3 M79 94 h-3" stroke="#6f8796" stroke-width="2" stroke-linecap="round"/>
<path d="M64 93 L73 82" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round"/><circle cx="64" cy="93" r="2.5" fill="#2a2a2a"/>`),
};
export default art;
