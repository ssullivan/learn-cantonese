/*
 * Unit 7 illustrations: one entry per vocab entry with a picture.
 * Run `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg, steamer, plate, teapot, teacup } from '../tools/svg.mjs';

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
` + plate(`<ellipse cx="64" cy="88" rx="42" ry="14" fill="#9a3b1c" opacity=".85"/>
<use href="#f" transform="translate(64 76)"/>
<use href="#f" transform="translate(42 88) rotate(-35)"/>
<use href="#f" transform="translate(86 88) rotate(35)"/>
<g fill="#2a1a12"><circle cx="52" cy="92" r="2.5"/><circle cx="76" cy="96" r="2.5"/><circle cx="70" cy="86" r="2.2"/><circle cx="36" cy="84" r="2.2"/></g>
<g fill="none" stroke="#e02a1e" stroke-width="2"><circle cx="58" cy="98" r="3"/><circle cx="92" cy="80" r="3"/></g>`, { rx: 54, ry: 21 })),

  'spare-ribs': svg("Pai gwat (steamed spare ribs)", `<defs><g id="c">
<rect x="-10" y="-7" width="20" height="14" rx="5" fill="#c98a5e" stroke="#8f5632" stroke-width="1.5"/>
<ellipse cx="-6" cy="0" rx="3" ry="4" fill="#f2e6cf" stroke="#c9b48e" stroke-width="1"/>
<path d="M-1 -4 Q4 -6 7 -3" stroke="#e3ad84" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</g></defs>
` + plate(`<ellipse cx="64" cy="89" rx="42" ry="14" fill="#a8683a" opacity=".6"/>
<use href="#c" transform="translate(50 78) rotate(-10)"/>
<use href="#c" transform="translate(74 76) rotate(15)"/>
<use href="#c" transform="translate(40 91) rotate(20)"/>
<use href="#c" transform="translate(64 90) rotate(-5)"/>
<use href="#c" transform="translate(88 89) rotate(-20)"/>
<use href="#c" transform="translate(58 101) rotate(8)"/>
<g fill="#2a1a12"><circle cx="62" cy="80" r="2.3"/><circle cx="78" cy="100" r="2.3"/><circle cx="32" cy="83" r="2"/></g>
<g fill="#f4edd5"><rect x="86" y="78" width="3" height="3" rx=".8"/><rect x="46" y="100" width="3" height="3" rx=".8"/></g>
<g fill="none" stroke="#e02a1e" stroke-width="2"><circle cx="97" cy="96" r="3"/><circle cx="74" cy="88" r="2.6"/></g>`, { rx: 54, ry: 21 })),

  'lo-mai-gai': svg("Lo mai gai (sticky rice in lotus leaf)", plate(`<path d="M12 86 C16 62 112 62 116 86 C104 104 24 104 12 86Z" fill="#6f8d3b" stroke="#4a6325" stroke-width="2"/>
<path d="M64 98 L22 80 M64 98 L40 70 M64 98 L64 66 M64 98 L88 70 M64 98 L106 80" stroke="#58752d" stroke-width="1.5"/>
<path d="M12 86 L4 74 L24 72 Z M116 86 L124 74 L104 72 Z" fill="#7f9c46" stroke="#4a6325" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M32 86 C32 62 96 62 96 86 C84 94 44 94 32 86Z" fill="#d7b170" stroke="#b08845" stroke-width="1.5"/>
<g fill="#efd9a8"><ellipse cx="44" cy="80" rx="2.2" ry="1.2"/><ellipse cx="54" cy="72" rx="2.2" ry="1.2"/><ellipse cx="76" cy="70" rx="2.2" ry="1.2"/><ellipse cx="86" cy="80" rx="2.2" ry="1.2"/><ellipse cx="66" cy="86" rx="2.2" ry="1.2"/><ellipse cx="48" cy="86" rx="2.2" ry="1.2"/><ellipse cx="82" cy="87" rx="2.2" ry="1.2"/></g>
<rect x="56" y="72" width="14" height="10" rx="3" fill="#c47a45" stroke="#94552a" stroke-width="1.2"/>
<ellipse cx="78" cy="79" rx="6" ry="4.5" fill="#4b2e1c"/>
<ellipse cx="77" cy="78" rx="3" ry="1.5" fill="#6d4a33"/>
<circle cx="46" cy="78" r="4.5" fill="#f0a020" stroke="#c77d10" stroke-width="1"/>`, { cy: 90, ry: 21 })),

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
<path d="M-24 6 C-26 -8 -14 -20 0 -20 C14 -20 26 -8 24 6 C12 11 -12 11 -24 6Z" fill="#f2cf86" stroke="#b9802c" stroke-width="1.5"/>
<path d="M-23 0 C-24 -10 -13 -20 0 -20 C13 -20 24 -10 23 0 C12 4 -12 4 -23 0Z" fill="#e9ab45"/>
<path d="M-20 -6 L-16 -12 L-8 -6 L-12 1 M-8 -6 L0 -12 L6 -4 L0 3 M6 -4 L14 -12 L19 -6 M6 -4 L15 1 M-8 -6 L-2 -1 M0 -12 L-2 -19 M14 -12 L11 -18 M-16 -12 L-12 -17" stroke="#c07a22" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M-12 -15 Q-4 -19 4 -18" stroke="#f7d27f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</g></defs>` + plate(`<use href="#b" transform="translate(84 78)"/>
<use href="#b" transform="translate(48 88)"/>`, { cy: 90 })),
};
