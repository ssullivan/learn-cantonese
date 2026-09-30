/*
 * strokes.js — characters drawn stroke by stroke, in Hong Kong stroke
 * order, from strokes/<hex>.json (written by tools/strokes.mjs: Make Me a
 * Hanzi's stroke shapes, Arphic Public License). No dependencies. Style
 * with strokes.css.
 *
 *   Strokes.src(char)        "../strokes/<hex>.json" (pages sit one folder down)
 *   Strokes.load(char)       Promise of its data, fetched once:
 *                            { char, strokes: [SVG path], medians: [[[x, y]]],
 *                              order, hk: { edb, verdict, checked, confirmed? } }
 *                            Shapes are in a 1024 box, y up from a baseline at 900
 *   Strokes.svg(data, opts)  SVG markup (svg.strokes) of the character in a
 *                            田字格 box. opts:
 *                              upto: n        only the first n strokes (default all)
 *                              mark: true     the last one drawn in the accent colour
 *                              ghost: true    the strokes not drawn, faint, to trace over
 *                              numbers: true  each drawn stroke's number at its start
 *                              grid: false    no 田字格 guide lines
 *                              title          accessible name (default: the character)
 */
(function () {
  const hex = char => char.codePointAt(0).toString(16);
  const src = char => `../strokes/${hex(char)}.json`;

  const cache = {};
  const load = char => cache[char] ??= fetch(src(char)).then(r => {
    if (!r.ok) throw new Error(`no stroke data for ${char}`);
    return r.json();
  });

  // Where a stroke starts, on screen (y down), nudged back along its
  // first segment so the number sits just before the ink.
  function start(median) {
    const [[x0, y0], [x1, y1] = [x0 + 1, y0]] = median;
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    const clamp = v => Math.min(960, Math.max(64, v));
    return [clamp(x0 - (x1 - x0) / len * 56), clamp(900 - (y0 - (y1 - y0) / len * 56))];
  }

  function svg(data, { upto = data.strokes.length, mark = false, ghost = false, numbers = false, grid = true, title = data.char } = {}) {
    const cls = i => i >= upto ? 'ghost' : mark && i === upto - 1 ? 'new' : 'ink';
    const paths = data.strokes.map((d, i) => i < upto || ghost ? `<path class="${cls(i)}" d="${d}"/>` : '').join('');
    const nums = numbers ? data.medians.slice(0, upto).map((m, i) => {
      const [x, y] = start(m);
      return `<g class="num"><circle cx="${x}" cy="${y}" r="50"/><text x="${x}" y="${y}">${i + 1}</text></g>`;
    }).join('') : '';
    const lines = grid ? '<path class="mid" d="M512 12V1012M12 512H1012"/>' : '';
    return `<svg class="strokes" viewBox="0 0 1024 1024" role="img" aria-label="${title}"><title>${title}</title>`
      + `<rect class="box" x="6" y="6" width="1012" height="1012"/>${lines}`
      + `<g transform="translate(0 900) scale(1 -1)">${paths}</g>${nums}</svg>`;
  }

  window.Strokes = { src, load, svg };
})();
