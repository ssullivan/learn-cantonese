/*
 * Unit 7 illustrations: one entry per vocab entry with a picture.
 * Run `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg, steamer, plate, bowl, teapot, teacup, pineappleBun } from '../tools/svg.mjs';

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

export default {
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

  congee: svg("Zuk (congee)", bowl(`<ellipse cx="64" cy="61" rx="46" ry="10" fill="#f5f0e2"/>
<path d="M30 60 q8 -3 16 0 M70 57 q8 -3 16 0 M52 65 q6 -2 12 0" stroke="#e4dcc6" stroke-width="2" fill="none" stroke-linecap="round"/>
<g stroke="#2e2418" stroke-width="1.2"><path d="M40 56 L54 52 L52 62 Z" fill="#5a4630"/><path d="M76 62 L90 60 L84 68 Z" fill="#5a4630"/></g>
<g fill="#6f7d52"><circle cx="50" cy="56" r="2.5"/><circle cx="84" cy="62" r="2.3"/></g>
<g fill="#c99a7a"><path d="M62 54 q5 -2 9 1 l-1 2 q-4 -2 -8 -1Z"/><path d="M36 64 q5 -2 9 1 l-1 2 q-4 -2 -8 -1Z"/><path d="M68 66 q4 -2 8 1 l-1 2 q-4 -2 -7 -1Z"/></g>
<g fill="none" stroke="#5fa33a" stroke-width="1.8"><circle cx="60" cy="61" r="2.2"/><circle cx="74" cy="55" r="2.2"/><circle cx="46" cy="61" r="2"/><circle cx="92" cy="57" r="2"/></g>`)),
};
