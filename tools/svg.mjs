/*
 * svg.mjs — shared pieces for the food illustrations in unit<N>/art.mjs.
 * Every drawing is 128×128, transparent, fixed colors (works on light
 * and dark pages).
 *
 *   svg(title, body)   complete SVG file; `title` is read by screen readers
 *   steamer(food)      bamboo steamer with `food` sitting inside it
 *   plate(food, { cy, rx, ry })   white plate with `food` on top
 *
 * steamer() and plate() tag their output data-dish="steamer|plate" so
 * tools/check.mjs can match the picture to the dish's measure word.
 */

export const svg = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" role="img">
<title>${title}</title>
${body}
</svg>
`;

export const steamer = food => `<g data-dish="steamer">
<ellipse cx="64" cy="74" rx="52" ry="15" fill="#9c6528" stroke="#7d4f1e" stroke-width="2"/>
<ellipse cx="64" cy="75" rx="45" ry="11" fill="#f1e3bd"/>
${food}
<path d="M12 74 A52 15 0 0 0 116 74 L112 104 A48 13 0 0 1 16 104 Z" fill="#dcaa5e" stroke="#7d4f1e" stroke-width="2" stroke-linejoin="round"/>
<path d="M14 90 A50 14 0 0 0 114 90" fill="none" stroke="#b07a35" stroke-width="2"/>
<path d="M13 76 A51 15 0 0 0 115 76" fill="none" stroke="#f2cf8a" stroke-width="2.5"/>
</g>`;

export const plate = (food, { cy = 88, rx = 56, ry = 20 } = {}) => `<g data-dish="plate">
<ellipse cx="64" cy="${cy + 3}" rx="${rx}" ry="${ry}" fill="#9fb0bb" opacity=".35"/>
<ellipse cx="64" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ffffff" stroke="#9fb0bb" stroke-width="2"/>
<ellipse cx="64" cy="${cy}" rx="${rx - 11}" ry="${ry - 5}" fill="#eef3f6"/>
${food}
</g>`;
