/*
 * Unit 11 illustrations: the station signs (港鐵站, 巴士站). Transport and
 * the places Route puts on its map are words, drawn in words/art.mjs.
 * Run `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';
import { unit11 } from '../words/art.mjs';

const { shadow, windows } = unit11;

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
  'metro-zaam': svg('A station entrance sign with a train on it', `${sign(miniTrain)}
<path d="M24 120 L40 96 H88 L104 120" fill="#c9d3da" stroke="#8a9aa5" stroke-width="2" stroke-linejoin="round"/>
<path d="M34 110 H94 M38 104 H90" stroke="#8a9aa5" stroke-width="2"/>`),
  'bus-zaam': svg('A bus stop sign', `${sign(miniBus, { board: '#fff6d8', edge: '#9a6c0e' })}
<rect x="80" y="100" width="36" height="6" rx="2" fill="#9c6528" stroke="#7d4f1e" stroke-width="1.5"/>
<path d="M84 106 V118 M112 106 V118" stroke="#7d4f1e" stroke-width="3" stroke-linecap="round"/>`),
};
