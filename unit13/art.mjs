/*
 * Unit 13 illustrations: the weather phrases (落雨, 落雪, 打風) and a
 * thermometer for 好熱 and 好凍, from the parts in unit 13's section of
 * words/art.mjs (sun, cloud, rain, snowflake), which also draws the
 * weather words, the seasons and the umbrella. Run `node tools/draw.mjs`
 * after editing to rewrite img/<id>.svg.
 */
import { svg } from '../tools/svg.mjs';
import { unit13 } from '../words/art.mjs';

const { sun, CLOUD, cloud, rain, flake } = unit13;

// A thermometer, filled to `level` (0–1) in `fill`.
const thermometer = (level, fill, line) => {
  const top = 22 + (1 - level) * 62;
  return `<rect x="52" y="12" width="24" height="86" rx="12" fill="#ffffff" stroke="#6f8796" stroke-width="2.5"/>
<rect x="58" y="${top}" width="12" height="${96 - top}" fill="${fill}"/>
<circle cx="64" cy="104" r="15" fill="${fill}" stroke="${line}" stroke-width="2.5"/>
<path d="M76 30 h6 M76 44 h6 M76 58 h6 M76 72 h6 M76 86 h6" stroke="#6f8796" stroke-width="2" stroke-linecap="round"/>`;
};

// The typhoon symbol: an eye with two curling arms.
// The second arm is the first turned half way round the eye.
const typhoon = `<path d="M50 60 C48 32 76 16 108 20 M78 68 C80 96 52 112 20 108" fill="none" stroke="#d6453a" stroke-width="10" stroke-linecap="round"/>
<circle cx="64" cy="64" r="16" fill="#ffffff" stroke="#d6453a" stroke-width="8"/>
${rain(24, 44, 22, 1)}${rain(92, 112, 94, 1)}`;

export default {
  'lok-jyu': svg('Rain falling from a cloud', `${cloud(64, 62, 1.1, 'grey')}\n${rain(38, 98, 76, 2)}`),
  'lok-syut': svg('Snow falling from a cloud', `${cloud(64, 62, 1.1, 'grey')}\n${[[40, 82], [70, 86], [100, 80], [54, 108], [86, 110]].map(([x, y]) => flake(x, y)).join('\n')}`),
  'daa-fung': svg('A typhoon', typhoon),
  'hou-jit': svg('A hot thermometer', `${thermometer(0.92, '#d6453a', '#8f2a22')}\n${sun(104, 24, 11)}`),
  'hou-dung': svg('A cold thermometer', `${thermometer(0.12, '#3f7cc0', '#24507f')}\n${flake(102, 30, 11)}\n${flake(24, 64, 8)}`),
};
