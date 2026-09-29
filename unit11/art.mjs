/*
 * Unit 11 illustrations: transport, and the places Route puts on its map.
 * Run `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg, car, plane } from '../tools/svg.mjs';

const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="5" fill="#9fb0bb" opacity=".35"/>`;
const wheel = (x, y, r = 10) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2a211b"/><circle cx="${x}" cy="${y}" r="${r * 0.4}" fill="#c8ced3"/>`;
const windows = (x, y, w, h, n, gap, fill = '#bfe0f2', stroke = '#24507f') =>
  Array.from({ length: n }, (_, i) => `<rect x="${x + i * (w + gap)}" y="${y}" width="${w}" height="${h}" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`).join('\n');
const LINE = 'stroke-width="2.5" stroke-linejoin="round"';

// A building: body, then whatever goes on its front.
const building = (x, y, w, h, fill, stroke, front) => `${shadow(64, 118, w / 2 + 8)}
<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" ${LINE}/>
${front}`;

// A sign on a post, with `icon` drawn inside a box centred on 64, 34.
const sign = (icon, { board = '#ffffff', edge = '#24507f' } = {}) => `${shadow(64, 120, 20)}
<rect x="61" y="54" width="6" height="66" fill="#8a9aa5" stroke="#5f6f7a" stroke-width="1.5"/>
<rect x="34" y="10" width="60" height="48" rx="8" fill="${board}" stroke="${edge}" stroke-width="3"/>
${icon}`;

const miniBus = `<rect x="44" y="20" width="40" height="24" rx="5" fill="#d6453a" stroke="#8f2a22" stroke-width="2"/>
${windows(48, 24, 8, 8, 4, 1)}
<circle cx="52" cy="46" r="4" fill="#2a211b"/><circle cx="76" cy="46" r="4" fill="#2a211b"/>`;
const miniTrain = `<rect x="46" y="16" width="36" height="30" rx="8" fill="#e4e7ea" stroke="#5f6f7a" stroke-width="2"/>
<rect x="51" y="21" width="26" height="11" rx="2" fill="#bfe0f2" stroke="#5f6f7a" stroke-width="1.5"/>
<path d="M46 37 H82" stroke="#d6453a" stroke-width="3"/>
<circle cx="54" cy="41" r="2" fill="#f7d35c"/><circle cx="74" cy="41" r="2" fill="#f7d35c"/>
<path d="M50 52 L46 56 M78 52 L82 56" stroke="#5f6f7a" stroke-width="2.5" stroke-linecap="round"/>`;

export default {
  metro: svg('An MTR train, front on', `${shadow(64, 118, 46)}
<path d="M24 112 H104 M34 104 L28 118 M94 104 L100 118" stroke="#8a9aa5" stroke-width="3" stroke-linecap="round"/>
<path d="M28 100 V36 C28 20 40 14 64 14 C88 14 100 20 100 36 V100 Z" fill="#e4e7ea" stroke="#5f6f7a" ${LINE}/>
<path d="M36 30 H92 V60 H36 Z" fill="#bfe0f2" stroke="#5f6f7a" stroke-width="2" stroke-linejoin="round"/>
<path d="M28 72 H100" stroke="#d6453a" stroke-width="7"/>
<rect x="54" y="18" width="20" height="7" rx="2" fill="#2a211b"/>
<circle cx="42" cy="88" r="5" fill="#f7d35c" stroke="#9a6c0e" stroke-width="1.5"/><circle cx="86" cy="88" r="5" fill="#f7d35c" stroke="#9a6c0e" stroke-width="1.5"/>
<rect x="28" y="100" width="72" height="6" fill="#5f6f7a"/>`),

  bus: svg('A double-decker bus', `${shadow(64, 112, 54)}
<rect x="10" y="18" width="108" height="86" rx="10" fill="#f2c94c" stroke="#9a6c0e" ${LINE}/>
<path d="M10 62 H118" stroke="#d6453a" stroke-width="5"/>
${windows(18, 26, 17, 22, 5, 3)}
${windows(38, 70, 17, 18, 4, 3)}
<rect x="16" y="68" width="16" height="30" rx="2" fill="#bfe0f2" stroke="#24507f" stroke-width="1.5"/>
${wheel(34, 104, 11)}
${wheel(96, 104, 11)}`),

  minibus: svg('A minibus with a green roof', `${shadow(64, 108, 50)}
<path d="M14 96 V52 C14 42 20 34 30 34 H98 C108 34 116 42 116 54 V96 Z" fill="#f7f3e8" stroke="#6f6a5c" ${LINE}/>
<path d="M14 52 C14 42 20 34 30 34 H98 C108 34 116 42 116 52 Z" fill="#3a9a6e" stroke="#26684a" ${LINE}/>
${windows(22, 58, 18, 16, 4, 5)}
<path d="M14 82 H116" stroke="#3a9a6e" stroke-width="4"/>
${wheel(36, 98, 11)}
${wheel(96, 98, 11)}`),

  taxi: svg('A red taxi with its roof sign', `<rect x="58" y="27" width="28" height="11" rx="3" fill="#f7f3e8" stroke="#8f2a22" stroke-width="2"/>
<path d="M64 32.5 H80" stroke="#d6453a" stroke-width="3" stroke-linecap="round"/>
${car}`),

  tram: svg('A double-decker tram', `${shadow(64, 116, 42)}
<path d="M64 6 V20 M40 6 H104" stroke="#5f6f7a" stroke-width="2.5" stroke-linecap="round"/>
<rect x="24" y="20" width="80" height="88" rx="8" fill="#3a9a6e" stroke="#26684a" ${LINE}/>
<path d="M24 62 H104" stroke="#f7f3e8" stroke-width="5"/>
${windows(31, 28, 14, 22, 4, 3)}
${windows(31, 70, 14, 18, 4, 3)}
<rect x="24" y="100" width="80" height="8" fill="#26684a"/>
${wheel(42, 112, 6)}
${wheel(86, 112, 6)}`),

  'metro-zaam': svg('A station entrance sign with a train on it', `${sign(miniTrain)}
<path d="M24 120 L40 96 H88 L104 120" fill="#c9d3da" stroke="#8a9aa5" stroke-width="2" stroke-linejoin="round"/>
<path d="M34 110 H94 M38 104 H90" stroke="#8a9aa5" stroke-width="2"/>`),

  'bus-zaam': svg('A bus stop sign', `${sign(miniBus, { board: '#fff6d8', edge: '#9a6c0e' })}
<rect x="80" y="100" width="36" height="6" rx="2" fill="#9c6528" stroke="#7d4f1e" stroke-width="1.5"/>
<path d="M84 106 V118 M112 106 V118" stroke="#7d4f1e" stroke-width="3" stroke-linecap="round"/>`),

  toilet: svg('A toilet sign: a man and a woman', `<rect x="14" y="16" width="100" height="96" rx="12" fill="#3f7cc0" stroke="#24507f" stroke-width="3"/>
<path d="M64 26 V102" stroke="#ffffff" stroke-width="3" opacity=".7"/>
<g fill="#ffffff">
<circle cx="39" cy="38" r="7"/><path d="M29 50 H49 V78 H45 V100 H33 V78 H29 Z"/>
<circle cx="89" cy="38" r="7"/><path d="M80 50 H98 L106 80 H96 V100 H82 V80 H72 Z"/>
</g>`),

  bank: svg('A bank with columns and a coin sign', building(18, 50, 92, 64, '#f4efe4', '#8a7a5a', `<path d="M12 50 L64 18 L116 50 Z" fill="#e0d6be" stroke="#8a7a5a" ${LINE}/>
<circle cx="64" cy="37" r="8" fill="#e0a526" stroke="#9a6c0e" stroke-width="2"/>
<path d="M64 32 V42 M61 34.5 H66 Q68 34.5 68 36.5 Q68 38 66 38 H62 Q60 38 60 39.5 Q60 41.5 62 41.5 H67" stroke="#9a6c0e" stroke-width="1.5" fill="none"/>
<g fill="#ffffff" stroke="#8a7a5a" stroke-width="2">
<rect x="26" y="58" width="10" height="48"/><rect x="46" y="58" width="10" height="48"/><rect x="72" y="58" width="10" height="48"/><rect x="92" y="58" width="10" height="48"/>
</g>
<rect x="14" y="106" width="100" height="8" fill="#e0d6be" stroke="#8a7a5a" stroke-width="2"/>`)),

  hospital: svg('A hospital with a green cross', building(20, 34, 88, 80, '#ffffff', '#6f8796', `<rect x="48" y="12" width="32" height="32" rx="4" fill="#ffffff" stroke="#6f8796" stroke-width="2.5"/>
<path d="M58 16 H70 V24 H76 V32 H70 V40 H58 V32 H52 V24 H58 Z" fill="#3a9a6e"/>
${windows(28, 52, 14, 12, 4, 6)}
${windows(28, 72, 14, 12, 4, 6)}
<rect x="52" y="92" width="24" height="22" fill="#9fd3e6" stroke="#6f8796" stroke-width="2"/>`)),

  supermarket: svg('A shopping trolley full of food', `${shadow(64, 118, 44)}
<path d="M10 22 H26 L40 86 H104" stroke="#5f6f7a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="52" cy="40" r="11" fill="#e0932e" stroke="#9a5a14" stroke-width="2"/>
<rect x="64" y="26" width="16" height="22" rx="2" fill="#3f7cc0" stroke="#24507f" stroke-width="2"/>
<path d="M84 44 C84 30 100 30 100 44 Z" fill="#3a9a6e" stroke="#26684a" stroke-width="2"/>
<path d="M30 44 H110 L102 76 H38 Z" fill="#c9d3da" fill-opacity=".85" stroke="#5f6f7a" stroke-width="3" stroke-linejoin="round"/>
<path d="M48 44 L50 76 M68 44 V76 M88 44 L86 76 M34 60 H106" stroke="#5f6f7a" stroke-width="2"/>
<circle cx="48" cy="104" r="8" fill="#2a211b"/><circle cx="96" cy="104" r="8" fill="#2a211b"/>`),

  park: svg('A park: a tree and a bench on the grass', `<ellipse cx="64" cy="112" rx="58" ry="12" fill="#8cc97a"/>
<rect x="36" y="58" width="12" height="52" rx="3" fill="#9c6528" stroke="#7d4f1e" stroke-width="2"/>
<circle cx="42" cy="44" r="30" fill="#3a9a6e" stroke="#26684a" stroke-width="2.5"/>
<circle cx="28" cy="36" r="6" fill="#56b485"/><circle cx="52" cy="28" r="7" fill="#56b485"/>
<rect x="70" y="86" width="48" height="6" rx="2" fill="#9c6528" stroke="#7d4f1e" stroke-width="1.5"/>
<rect x="70" y="74" width="48" height="6" rx="2" fill="#9c6528" stroke="#7d4f1e" stroke-width="1.5"/>
<path d="M76 92 V106 M112 92 V106 M76 80 V86 M112 80 V86" stroke="#7d4f1e" stroke-width="3" stroke-linecap="round"/>`),

  hotel: svg('A tall hotel with three stars', building(32, 26, 64, 88, '#e9e1f2', '#6a5a86', `<rect x="32" y="12" width="64" height="16" fill="#6a5a86" stroke="#4a3d62" stroke-width="2"/>
<g fill="#f7d35c"><path d="M48 14.5 l2 4.2 4.6 .6 -3.4 3.2 .9 4.5 -4.1 -2.2 -4.1 2.2 .9 -4.5 -3.4 -3.2 4.6 -.6z"/><path d="M64 14.5 l2 4.2 4.6 .6 -3.4 3.2 .9 4.5 -4.1 -2.2 -4.1 2.2 .9 -4.5 -3.4 -3.2 4.6 -.6z"/><path d="M80 14.5 l2 4.2 4.6 .6 -3.4 3.2 .9 4.5 -4.1 -2.2 -4.1 2.2 .9 -4.5 -3.4 -3.2 4.6 -.6z"/></g>
${[36, 54, 72].map(y => windows(40, y, 10, 11, 4, 4, '#fff6d8', '#6a5a86')).join('\n')}
<rect x="54" y="92" width="20" height="22" fill="#9fd3e6" stroke="#6a5a86" stroke-width="2"/>`)),

  airport: svg('An airport: a plane taking off by the control tower', `<rect x="4" y="104" width="120" height="14" fill="#8a9aa5"/>
<path d="M10 111 H24 M36 111 H50 M62 111 H76 M88 111 H102 M114 111 H122" stroke="#ffffff" stroke-width="2.5"/>
<rect x="96" y="56" width="10" height="48" fill="#c9d3da" stroke="#5f6f7a" stroke-width="2"/>
<path d="M88 44 H114 L110 58 H92 Z" fill="#bfe0f2" stroke="#5f6f7a" stroke-width="2" stroke-linejoin="round"/>
<rect x="90" y="38" width="22" height="6" fill="#5f6f7a"/>
<g transform="translate(2 18) scale(.72)">${plane}</g>`),
};
