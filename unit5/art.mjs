/*
 * Unit 5 illustrations: one per noun, grouped by measure word. 魚 車 水
 * 雞 牛 are unit 1's. Run `node tools/draw.mjs` after editing to rewrite
 * img/<id>.svg.
 */
import { svg, bowl, cup, plane } from '../tools/svg.mjs';

const shadow = (rx = 40, cy = 114) => `<ellipse cx="64" cy="${cy}" rx="${rx}" ry="5" fill="#9fb0bb" opacity=".35"/>`;
const steam = `<path d="M50 34 c-4 -6 4 -10 0 -16 M64 30 c-4 -6 4 -10 0 -16 M78 34 c-4 -6 4 -10 0 -16" stroke="#9fb0bb" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;

export default {
  // 個
  apple: svg('Apple', `${shadow(34)}
<path d="M64 42 C52 32 26 34 24 62 C22 90 42 114 56 112 C60 111 62 109 64 109 C66 109 68 111 72 112 C86 114 106 90 104 62 C102 34 76 32 64 42Z" fill="#e0342b" stroke="#a51f18" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 56 C37 64 37 72 41 80" stroke="#f47a6f" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M64 42 C64 32 66 24 70 18" stroke="#6b4423" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M68 28 C76 16 92 16 96 22 C88 32 76 32 68 28Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2" stroke-linejoin="round"/>`),

  ball: svg('Ball (a basketball)', `${shadow(32, 116)}
<circle cx="64" cy="66" r="44" fill="#f08a24" stroke="#8a4a12" stroke-width="3"/>
<path d="M20 66 H108 M64 22 V110" stroke="#5a2f0c" stroke-width="3"/>
<path d="M33 35 C48 50 48 82 33 97 M95 35 C80 50 80 82 95 97" stroke="#5a2f0c" stroke-width="3" fill="none"/>
<ellipse cx="46" cy="42" rx="9" ry="5" fill="#f7b267" opacity=".8" transform="rotate(-35 46 42)"/>`),

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
};
