/*
 * Unit 4 illustrations: the one-hand Chinese counting signs for 1–10, a
 * right hand palm out (thumb on the left). Run `node tools/draw.mjs`
 * after editing to rewrite img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';

const SKIN = 'fill="#f2c9a0" stroke="#b07a52" stroke-width="3" stroke-linejoin="round"';
const CREASE = 'stroke="#b07a52" stroke-width="2" stroke-linecap="round" fill="none"';

// Finger columns: x of the left edge, width, top when raised.
const FINGERS = { index: [40, 13, 22], middle: [54, 13, 14], ring: [68, 13, 20], pinky: [82, 11, 34] };

const palm = `<path d="M38 60 H94 V96 C94 112 84 120 70 120 H60 C46 120 38 112 38 98 Z" ${SKIN}/>`;

const up = ([x, w, top], reach) => `<rect x="${x}" y="${top - reach}" width="${w}" height="${72 - top + reach}" rx="${w / 2}" ${SKIN}/>
<path d="M${x + 3} ${top - reach + 20} h${w - 6}" ${CREASE}/>`;

// A folded finger: its knuckle above the palm and its tip curled onto it.
const folded = ([x, w]) => `<rect x="${x}" y="50" width="${w}" height="20" rx="${w / 2}" ${SKIN}/>
<rect x="${x}" y="64" width="${w}" height="16" rx="${w / 2}" ${SKIN}/>`;

// An outstretched thumb from the base of the palm, tilted `angle` degrees left.
const thumbOut = angle => `<rect x="-7" y="-50" width="15" height="54" rx="7.5" transform="translate(48 100) rotate(${-angle})" ${SKIN}/>`;
const thumbIn = `<path d="M40 104 C44 92 56 84 74 82 C80 82 80 92 74 93 C62 95 54 100 48 108 Z" ${SKIN}/>`;

// A hand showing `raised` fingers, `reach` longer than usual; the others
// fold, the thumb too unless raised.
function hand(raised, reach = 0) {
  const fingers = Object.entries(FINGERS).map(([name, f]) => raised.includes(name) ? up(f, reach) : folded(f)).join('\n');
  if (!raised.includes('thumb')) return `${palm}\n${fingers}\n${thumbIn}`;
  return `${thumbOut(raised.includes('index') && raised.length === 2 ? 68 : raised.length === 2 ? 55 : 40)}\n${palm}\n${fingers}`;
}

const title = (n, how) => `${n}: ${how} (Chinese hand sign)`;

export default {
  n1: svg(title(1, 'index finger up'), hand(['index'])),
  n2: svg(title(2, 'index and middle fingers up'), hand(['index', 'middle'])),
  n3: svg(title(3, 'three middle fingers up'), hand(['index', 'middle', 'ring'])),
  n4: svg(title(4, 'four fingers up, thumb folded'), hand(['index', 'middle', 'ring', 'pinky'])),
  n5: svg(title(5, 'open hand'), hand(['thumb', 'index', 'middle', 'ring', 'pinky'])),
  n6: svg(title(6, 'thumb and little finger out'), hand(['thumb', 'pinky'])),
  n7: svg(title(7, 'thumb and two fingertips pinched together'), `${palm}
${folded(FINGERS.ring)}
${folded(FINGERS.pinky)}
<path d="M40 70 C38 50 48 34 60 22 C68 34 72 50 68 70 Z" ${SKIN}/>
<path d="M59 26 C54 40 52 54 53 68 M60 26 C62 40 62 54 61 68" ${CREASE}/>
<path d="M42 104 C28 84 34 52 56 26 L61 30 C48 50 44 76 52 98 Z" ${SKIN}/>`),
  n8: svg(title(8, 'thumb and index finger out, like an L'), hand(['thumb', 'index'])),
  n9: svg(title(9, 'index finger hooked'), `${palm}
<path d="M40 70 V46 C40 32 44 26 54 26 C64 26 68 32 66 42 L54 44 C56 38 54 38 52 40 V70 Z" ${SKIN}/>
<path d="M43 52 h7" ${CREASE}/>
${folded(FINGERS.middle)}
${folded(FINGERS.ring)}
${folded(FINGERS.pinky)}
${thumbIn}`),
  // Two "1" hands, one turned to point left, so their index fingers cross.
  n10: svg(title(10, 'two index fingers crossed like 十'), `<g transform="matrix(.62 0 0 .62 25 34.5)">
${hand(['index'], 30)}
</g>
<g transform="matrix(0 -.62 .62 0 31 76.3)">
${hand(['index'], 30)}
</g>`),
};
