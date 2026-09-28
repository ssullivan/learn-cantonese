/*
 * svg.mjs — shared pieces for the food illustrations in unit<N>/art.mjs.
 * Every drawing is 128×128, transparent, fixed colors (works on light
 * and dark pages).
 *
 *   svg(title, body)   complete SVG file; `title` is read by screen readers
 *   steamer(food)      bamboo steamer with `food` sitting inside it
 *   plate(food, { cy, rx, ry })   white plate with `food` on top
 *   teapot(), teacup() blue-and-white Chinese teapot (spout at the right,
 *                      around 110,46) and a small cup at 104,108
 *   bowl(food)         blue-and-white rice bowl filled with `food`
 *                      (drawn inside the rim, around y 56–64)
 *
 * steamer(), plate() and bowl() tag their output data-dish so
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

export const bowl = food => `<g data-dish="bowl">
<ellipse cx="64" cy="112" rx="24" ry="5" fill="#9fb0bb" opacity=".35"/>
<path d="M14 60 C16 92 38 108 64 108 C90 108 112 92 114 60 Z" fill="#fbf8f1" stroke="#2e5a88" stroke-width="3" stroke-linejoin="round"/>
<path d="M24 82 q10 -7 20 0 t20 0 t20 0 t20 0" stroke="#6f9bc6" stroke-width="2.5" fill="none"/>
<path d="M50 107 L52 114 H76 L78 107" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="64" cy="60" rx="50" ry="13" fill="#fbf8f1" stroke="#2e5a88" stroke-width="3"/>
${food}
</g>`;

export const teapot = () => `<path d="M22 66 C6 66 6 94 26 92" stroke="#2e5a88" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M88 76 C100 74 104 60 110 46 L118 48 C112 66 106 84 90 92 Z" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="56" cy="80" rx="36" ry="28" fill="#fbf8f1" stroke="#2e5a88" stroke-width="3"/>
<path d="M22 78 q8 -8 17 0 t17 0 t17 0 t17 0" stroke="#2e5a88" stroke-width="2.5" fill="none"/>
<path d="M28 90 q7 -6 14 0 t14 0 t14 0 t14 0" stroke="#6f9bc6" stroke-width="2" fill="none"/>
<ellipse cx="56" cy="54" rx="22" ry="6" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2.5"/>
<circle cx="56" cy="46" r="5" fill="#2e5a88"/>`;

export const teacup = () => `<path d="M92 100 L96 116 Q104 120 112 116 L116 100 Z" fill="#fbf8f1" stroke="#2e5a88" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="104" cy="100" rx="12" ry="3.5" fill="#c8913a" stroke="#2e5a88" stroke-width="2"/>`;
