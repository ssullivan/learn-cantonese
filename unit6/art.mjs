/*
 * Unit 6 illustrations: the new things to buy, and Hong Kong coins and
 * notes (p<cents>, from the prices in vocab.js). The other things are
 * unit 5's and unit 1's. Run `node tools/draw.mjs` after editing to
 * rewrite img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';

const shadow = (rx = 40, cy = 114) => `<ellipse cx="64" cy="${cy}" rx="${rx}" ry="5" fill="#9fb0bb" opacity=".35"/>`;
const label = (text, x, y, size, fill) => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="700" fill="${fill}" text-anchor="middle" dominant-baseline="central">${text}</text>`;

const METAL = {
  brass: { face: '#e5b73f', rim: '#f3d77a', edge: '#96700f', ink: '#7a5808' },
  silver: { face: '#d3d9de', rim: '#eef1f3', edge: '#6f7b85', ink: '#4a545c' },
};

// A circle of radius r, with `bumps` scallops around the edge if given.
function round(r, bumps) {
  if (!bumps) return `<circle cx="64" cy="64" r="${r}"/>`;
  const pts = Array.from({ length: bumps * 2 }, (_, i) => {
    const a = (Math.PI * i) / bumps;
    const rr = i % 2 ? r - 3 : r;
    return `${(64 + rr * Math.sin(a)).toFixed(1)} ${(64 - rr * Math.cos(a)).toFixed(1)}`;
  });
  return `<path d="M${pts.join(' L')} Z" stroke-linejoin="round"/>`;
}

// A coin of radius r showing `text`; `bumps` scallops the edge, and
// `center` puts a disc of another metal in the middle (the $10 coin).
function coin(title, text, r, metal, { bumps, center } = {}) {
  const m = METAL[metal], c = center && METAL[center];
  const inner = c ? `<circle cx="64" cy="64" r="${r - 12}" fill="${c.face}" stroke="${c.edge}" stroke-width="2"/>` : '';
  return svg(title, `${shadow(r * 0.8, 64 + r + 4)}
<g fill="${m.face}" stroke="${m.edge}" stroke-width="3">${round(r, bumps)}</g>
<circle cx="64" cy="64" r="${r - 6}" fill="none" stroke="${m.rim}" stroke-width="2.5"/>
${inner}
${label(text, 64, 65, Math.round(r * 0.62), (c ?? m).ink)}`);
}

// A banknote in `color` (light and dark shades) showing `text`.
function note(title, text, [light, dark]) {
  return svg(title, `${shadow(52, 104)}
<rect x="6" y="30" width="116" height="68" rx="6" fill="${light}" stroke="${dark}" stroke-width="3"/>
<rect x="13" y="37" width="102" height="54" rx="3" fill="none" stroke="#ffffff" stroke-width="2" opacity=".6"/>
<circle cx="38" cy="64" r="17" fill="#ffffff" opacity=".35"/>
<circle cx="38" cy="64" r="10" fill="none" stroke="${dark}" stroke-width="2" opacity=".6"/>
${label(text, 84, 66, text.length > 3 ? 23 : 26, '#ffffff')}
${label(text.slice(1), 106, 44, 10, '#ffffff')}`);
}

export default {
  orange: svg('Orange', `${shadow(36)}
<circle cx="64" cy="70" r="42" fill="#f39422" stroke="#b5650c" stroke-width="3"/>
<path d="M40 52 C36 60 36 70 39 78" stroke="#f9c27a" stroke-width="5" fill="none" stroke-linecap="round"/>
<g fill="#d9780f"><circle cx="80" cy="60" r="1.6"/><circle cx="90" cy="76" r="1.6"/><circle cx="72" cy="90" r="1.6"/><circle cx="54" cy="96" r="1.6"/><circle cx="86" cy="94" r="1.6"/></g>
<circle cx="64" cy="30" r="3.5" fill="#6b4423"/>
<path d="M66 29 C74 16 90 16 94 22 C86 32 74 32 66 29Z" fill="#5fa33a" stroke="#3f7a22" stroke-width="2" stroke-linejoin="round"/>`),

  egg: svg('Egg', `${shadow(28, 114)}
<path d="M64 18 C88 18 100 58 100 78 C100 100 84 112 64 112 C44 112 28 100 28 78 C28 58 40 18 64 18Z" fill="#f2dcbc" stroke="#b08a5c" stroke-width="3"/>
<path d="M46 50 C42 58 40 68 41 76" stroke="#fbf1e2" stroke-width="6" fill="none" stroke-linecap="round"/>`),

  watermelon: svg('Watermelon', `${shadow(50, 112)}
<ellipse cx="64" cy="70" rx="54" ry="38" fill="#3f9a3a" stroke="#1f5e22" stroke-width="3"/>
<path d="M22 58 q8 6 0 12 q-8 6 0 12 M40 38 q8 10 0 20 q-8 10 0 20 q8 10 0 20 M64 32 q8 12 0 24 q-8 12 0 24 q8 12 0 24 M88 38 q8 10 0 20 q-8 10 0 20 q8 10 0 20 M106 58 q8 6 0 12 q-8 6 0 12" stroke="#1f6b24" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M30 52 C36 44 46 40 54 38" stroke="#9fd48a" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M64 32 C64 26 68 22 72 20" stroke="#6b4423" stroke-width="4" fill="none" stroke-linecap="round"/>`),

  bread: svg('Bread roll', `${shadow(46, 108)}
<path d="M14 98 C10 60 36 34 64 34 C92 34 118 60 114 98 C114 104 14 104 14 98Z" fill="#d98d3e" stroke="#8f5320" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 76 C30 58 46 44 64 42 C82 44 98 58 100 76 C84 70 44 70 28 76Z" fill="#eab06a"/>
<path d="M42 56 l10 14 M60 48 l6 18 M80 52 l-2 16" stroke="#a8622a" stroke-width="3" stroke-linecap="round"/>`),

  p10: coin('10-cent coin', '10¢', 30, 'brass'),
  p20: coin('20-cent coin', '20¢', 34, 'brass', { bumps: 12 }),
  p50: coin('50-cent coin', '50¢', 38, 'brass'),
  p100: coin('One-dollar coin', '$1', 42, 'silver'),
  p200: coin('Two-dollar coin', '$2', 42, 'silver', { bumps: 12 }),
  p500: coin('Five-dollar coin', '$5', 46, 'silver'),
  p1000: coin('Ten-dollar coin', '$10', 46, 'silver', { center: 'brass' }),
  p2000: note('Twenty-dollar note', '$20', ['#3f7fcf', '#1f4f8f']),
  p5000: note('Fifty-dollar note', '$50', ['#3f9a5f', '#1f6038']),
  p10000: note('Hundred-dollar note', '$100', ['#d0453c', '#8a2019']),
  p50000: note('Five-hundred-dollar note', '$500', ['#9a6431', '#5e3a16']),
};
