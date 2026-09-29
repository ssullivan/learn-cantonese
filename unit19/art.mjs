/*
 * Unit 19 illustrations: the animals, in unit 5's style (flat, outlined,
 * a soft shadow), and the zoo gate. Run `node tools/draw.mjs` after
 * editing to rewrite img/<id>.svg.
 */
import { svg, shadow } from '../tools/svg.mjs';

const INK = '#2a2a2a';
const eye = (x, y, r = 3.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
// A thick outlined stroke along `d`: a tail, a snake, a dragon's body.
const tube = (d, fill, line, w) => `<path d="${d}" stroke="${line}" stroke-width="${w + 5}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${d}" stroke="${fill}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
// A body sitting up, facing us, its bottom on y 114.
const sitting = (fill, line) => `<path d="M36 114 C32 90 42 74 64 74 C86 74 96 90 92 114 Z" fill="${fill}" stroke="${line}" stroke-width="3" stroke-linejoin="round"/>`;

const art = {
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
};
export default art;
