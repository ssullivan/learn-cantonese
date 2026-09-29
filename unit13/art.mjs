/*
 * Unit 13 illustrations: weather icons built from a few parts (sun,
 * cloud, rain, snowflake, lightning), a thermometer for 好熱 and 好凍,
 * the four seasons, and an umbrella. Run `node tools/draw.mjs` after
 * editing to rewrite img/<id>.svg.
 */
import { svg, person } from '../tools/svg.mjs';

// A sun centred on x, y with radius r, and rays around it.
const sun = (x, y, r) => `<g stroke="#c9912a" stroke-width="${Math.max(2, r / 8)}" stroke-linecap="round">
${Array.from({ length: 8 }, (_, i) => {
    const a = i * Math.PI / 4, c = Math.cos(a), s = Math.sin(a);
    return `<path d="M${(x + c * r * 1.3).toFixed(1)} ${(y + s * r * 1.3).toFixed(1)} L${(x + c * r * 1.65).toFixed(1)} ${(y + s * r * 1.65).toFixed(1)}"/>`;
  }).join('\n')}
</g>
<circle cx="${x}" cy="${y}" r="${r}" fill="#f2c94c" stroke="#c9912a" stroke-width="2.5"/>`;

// A cloud about 80 wide and 40 high (s = 1), its flat base centred on x, y.
const CLOUD = {
  white: 'fill="#ffffff" stroke="#8a9aa5"',
  grey: 'fill="#c9d3da" stroke="#6f7f8a"',
  dark: 'fill="#7d8a94" stroke="#4a555e"',
};
const cloud = (x, y, s = 1, tone = 'white') => `<g transform="translate(${x} ${y}) scale(${s})">
<path d="M-36 0 C-48 0 -48 -20 -32 -20 C-32 -34 -12 -40 -4 -28 C2 -44 30 -40 28 -20 C44 -22 46 0 34 0 Z" ${CLOUD[tone]} stroke-width="${(2.5 / s).toFixed(2)}" stroke-linejoin="round"/>
</g>`;

// Slanted raindrops below a cloud, from x0 to x1, starting at y.
const rain = (x0, x1, y, rows = 2) => {
  const drops = [];
  for (let r = 0; r < rows; r++) {
    for (let x = x0 + (r % 2) * 10; x <= x1; x += 20) drops.push(`M${x} ${y + r * 20} l-5 12`);
  }
  return `<path d="${drops.join(' ')}" stroke="#3f7cc0" stroke-width="4" stroke-linecap="round"/>`;
};

// A six-armed snowflake centred on x, y.
const flake = (x, y, r = 8) => `<g transform="translate(${x} ${y})" stroke="#5b9bd5" stroke-width="2.5" stroke-linecap="round">
${[0, 60, 120].map(a => `<path d="M0 ${-r} V${r} M-3 ${-r + 3} L0 ${-r + 6} L3 ${-r + 3} M-3 ${r - 3} L0 ${r - 6} L3 ${r - 3}" transform="rotate(${a})"/>`).join('\n')}
</g>`;

const bolt = (x, y) => `<path d="M${x} ${y} L${x - 12} ${y + 26} H${x - 2} L${x - 8} ${y + 48} L${x + 12} ${y + 16} H${x + 2} L${x + 8} ${y} Z" fill="#f2c94c" stroke="#b58a1a" stroke-width="2" stroke-linejoin="round"/>`;

// A thermometer, filled to `level` (0–1) in `fill`.
const thermometer = (level, fill, line) => {
  const top = 22 + (1 - level) * 62;
  return `<rect x="52" y="12" width="24" height="86" rx="12" fill="#ffffff" stroke="#6f8796" stroke-width="2.5"/>
<rect x="58" y="${top}" width="12" height="${96 - top}" fill="${fill}"/>
<circle cx="64" cy="104" r="15" fill="${fill}" stroke="${line}" stroke-width="2.5"/>
<path d="M76 30 h6 M76 44 h6 M76 58 h6 M76 72 h6 M76 86 h6" stroke="#6f8796" stroke-width="2" stroke-linecap="round"/>`;
};

// A five-petalled blossom centred on x, y.
const blossom = (x, y, r = 7) => `<g transform="translate(${x} ${y})">
${[0, 72, 144, 216, 288].map(a => `<ellipse cy="${-r}" rx="${r * 0.62}" ry="${r * 0.8}" fill="#f6b6c9" stroke="#c0607f" stroke-width="1.5" transform="rotate(${a})"/>`).join('\n')}
<circle r="${r * 0.4}" fill="#f2c94c"/>
</g>`;

// A leaf pointing up from its stalk at x, y, turned by `a` degrees.
const leaf = (x, y, a, fill, line, s = 1) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">
<path d="M0 0 C-14 -8 -12 -30 0 -40 C12 -30 14 -8 0 0 Z" fill="${fill}" stroke="${line}" stroke-width="2" stroke-linejoin="round"/>
<path d="M0 4 V-32" stroke="${line}" stroke-width="1.5" stroke-linecap="round"/>
</g>`;

// Wind: curling gusts.
const gusts = `<path d="M10 44 H70 C84 44 88 26 76 22 C66 19 62 30 70 33 M14 64 H96 C112 64 116 86 102 90 C92 93 88 82 94 78 M22 84 H56" stroke="#6f8796" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

// The typhoon symbol: an eye with two curling arms.
// The second arm is the first turned half way round the eye.
const typhoon = `<path d="M50 60 C48 32 76 16 108 20 M78 68 C80 96 52 112 20 108" fill="none" stroke="#d6453a" stroke-width="10" stroke-linecap="round"/>
<circle cx="64" cy="64" r="16" fill="#ffffff" stroke="#d6453a" stroke-width="8"/>
${rain(24, 44, 22, 1)}${rain(92, 112, 94, 1)}`;

const umbrella = `<path d="M64 20 V100 C64 112 50 112 50 102" stroke="#5a3a1e" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M14 64 C14 34 38 18 64 18 C90 18 114 34 114 64 C106 56 96 56 89 64 C82 56 72 56 64 64 C56 56 46 56 39 64 C32 56 22 56 14 64 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M64 18 C52 30 42 46 39 64 M64 18 C76 30 86 46 89 64" stroke="#8f2a22" stroke-width="2" fill="none"/>
<circle cx="64" cy="16" r="3" fill="#8f2a22"/>`;

// Winter: someone in a woolly hat and scarf.
const bundled = `${person(64, 52, 'blue', 1.9)}
<path d="M42 32 C42 8 86 8 86 32 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M40 30 H88 V38 H40 Z" fill="#f7f7f5" stroke="#8a9aa5" stroke-width="2" stroke-linejoin="round"/>
<circle cx="64" cy="8" r="6" fill="#f7f7f5" stroke="#8a9aa5" stroke-width="2"/>
<path d="M38 80 C50 88 78 88 90 80 L90 92 C78 100 50 100 38 92 Z M72 92 L70 122 H82 L84 94 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
${flake(16, 24, 7)}${flake(110, 48, 6)}${flake(20, 96, 6)}`;

export default {
  'tin-hei': svg('Sun behind a cloud', `${sun(78, 44, 20)}\n${cloud(56, 96, 1)}\n${rain(40, 72, 104, 1)}`),
  'taai-joeng': svg('The sun', sun(64, 64, 30)),
  wan: svg('A cloud', cloud(64, 84, 1.3)),
  'tin-cing': svg('A sunny sky', `<rect x="8" y="8" width="112" height="112" rx="20" fill="#bfe0f2"/>\n${sun(56, 54, 22)}\n${cloud(92, 102, 0.55)}`),
  'jam-tin': svg('Grey clouds', `${cloud(78, 58, 0.9, 'grey')}\n${cloud(56, 94, 1.1, 'grey')}`),
  'lok-jyu': svg('Rain falling from a cloud', `${cloud(64, 62, 1.1, 'grey')}\n${rain(38, 98, 76, 2)}`),
  'lok-syut': svg('Snow falling from a cloud', `${cloud(64, 62, 1.1, 'grey')}\n${[[40, 82], [70, 86], [100, 80], [54, 108], [86, 110]].map(([x, y]) => flake(x, y)).join('\n')}`),
  'daa-fung': svg('A typhoon', typhoon),
  'daai-fung': svg('A strong wind', `${gusts}\n${leaf(104, 30, 60, '#3a9a6e', '#26684a', 0.6)}\n${leaf(80, 104, 120, '#3a9a6e', '#26684a', 0.55)}`),
  'haang-leoi': svg('A thunderstorm', `${cloud(64, 60, 1.1, 'dark')}\n${bolt(66, 62)}\n${rain(34, 44, 78, 2)}${rain(92, 102, 78, 2)}`),
  'hou-jit': svg('A hot thermometer', `${thermometer(0.92, '#d6453a', '#8f2a22')}\n${sun(104, 24, 11)}`),
  'hou-dung': svg('A cold thermometer', `${thermometer(0.12, '#3f7cc0', '#24507f')}\n${flake(102, 30, 11)}\n${flake(24, 64, 8)}`),
  'gwai-zit': svg('The four seasons', `<rect x="6" y="6" width="56" height="56" rx="10" fill="#fbe3ea"/><rect x="66" y="6" width="56" height="56" rx="10" fill="#fdf0c4"/>
<rect x="6" y="66" width="56" height="56" rx="10" fill="#f7dcc4"/><rect x="66" y="66" width="56" height="56" rx="10" fill="#dcecf8"/>
${blossom(34, 34, 11)}\n${sun(94, 34, 12)}\n${leaf(34, 110, 20, '#e07a2c', '#9a4a14', 0.9)}\n${flake(94, 94, 16)}`),
  'ceon-tin': svg('Spring blossom', `<path d="M8 112 C40 96 60 70 70 40 M50 80 C70 78 90 66 104 52 M62 56 C54 40 40 30 28 26" stroke="#6b4a2e" stroke-width="5" fill="none" stroke-linecap="round"/>
${leaf(82, 64, 110, '#7cc47f', '#3a8a4e', 0.45)}${leaf(40, 88, -40, '#7cc47f', '#3a8a4e', 0.45)}
${[[70, 34, 11], [104, 48, 10], [28, 22, 10], [46, 72, 9], [90, 80, 8]].map(([x, y, r]) => blossom(x, y, r)).join('\n')}`),
  'haa-tin': svg('Summer sun over the sea', `${sun(64, 44, 22)}
<path d="M4 92 Q20 82 36 92 T68 92 T100 92 T132 92 V124 H4 Z" fill="#3f7cc0" stroke="#24507f" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M12 108 Q24 102 36 108 M60 112 Q72 106 84 112" stroke="#bfe0f2" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  'cau-tin': svg('Autumn leaves falling', [[40, 60, -30, '#e07a2c', '#9a4a14', 1.2], [90, 50, 40, '#d6453a', '#8f2a22', 1], [70, 110, 10, '#e0a526', '#9a6c0e', 1.1], [104, 108, 70, '#e07a2c', '#9a4a14', 0.8]]
    .map(a => leaf(...a)).join('\n')),
  'dung-tin': svg('Wrapped up for winter', bundled),
  umbrella: svg('An umbrella', umbrella),
};
