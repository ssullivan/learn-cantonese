/*
 * Unit 6 illustrations: Hong Kong coins and notes (p<cents>, from the
 * prices in vocab.js). The things to buy are words, drawn in
 * words/art.mjs. Run `node tools/draw.mjs` after editing to rewrite
 * img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';
import { unit6 } from '../words/art.mjs';

const { shadow } = unit6;
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

export default { p10: coin('10-cent coin', '10¢', 30, 'brass'),
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
