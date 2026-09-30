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
 *                              numbers: true  each drawn stroke's number at its start,
 *                                             moved aside where numbers would overlap
 *                              grid: 'mi'     米字格 (diagonals too); false: no guide lines
 *                              title          accessible name (default: the character)
 *   Strokes.word(vocab, char) the first of the unit's own entries with that
 *                            character: the word it is taught from
 */
(function () {
  const hex = char => char.codePointAt(0).toString(16);
  const src = char => `../strokes/${hex(char)}.json`;

  const cache = {};
  const load = char => cache[char] ??= fetch(src(char)).then(r => {
    if (!r.ok) throw new Error(`no stroke data for ${char}`);
    return r.json();
  });

  // Where each stroke's number goes, on screen (y down): just before the
  // stroke starts, back along its first segment. Where that would overlap
  // an earlier number (strokes starting close together, as in 點's 灬),
  // the nearest free spot on a hexagonal lattice around it (lattice
  // spots are all a number's width apart; ahead of the start, over the
  // stroke, counts as further); failing those, the one furthest from the
  // others.
  const LATTICE = [];
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) LATTICE.push([i + j / 2, j * Math.sqrt(3) / 2]);
  LATTICE.sort(([a, b], [c, d]) => Math.hypot(a, b) + (a > 0) - Math.hypot(c, d) - (c > 0));

  function numberSpots(medians, r) {
    const clamp = v => Math.min(1024 - r - 8, Math.max(r + 8, v));
    const placed = [];
    return medians.map(m => {
      const [[x0, y0], [x1, y1] = [x0 + 1, y0]] = m.map(([x, y]) => [x, 900 - y]);
      const len = Math.hypot(x1 - x0, y1 - y0) || 1, dx = (x1 - x0) / len, dy = (y1 - y0) / len;
      const spots = LATTICE.map(([a, b]) => [a * 2 * r - 56, b * 2 * r])
        .map(([along, side]) => [clamp(x0 + dx * along - dy * side), clamp(y0 + dy * along + dx * side)]);
      const room = ([x, y]) => Math.min(Infinity, ...placed.map(([px, py]) => Math.hypot(x - px, y - py)));
      const spot = spots.find(p => room(p) >= 2 * r) ?? spots.reduce((a, b) => room(b) > room(a) ? b : a);
      placed.push(spot);
      return spot;
    });
  }

  function svg(data, { upto = data.strokes.length, mark = false, ghost = false, numbers = false, grid = true, title = data.char } = {}) {
    const cls = i => i >= upto ? 'ghost' : mark && i === upto - 1 ? 'new' : 'ink';
    const paths = data.strokes.map((d, i) => i < upto || ghost ? `<path class="${cls(i)}" d="${d}"/>` : '').join('');
    const r = data.strokes.length > 10 ? 40 : 50;
    const nums = numbers ? numberSpots(data.medians.slice(0, upto), r).map(([x, y], i) =>
      `<g class="num"><circle cx="${+x.toFixed(1)}" cy="${+y.toFixed(1)}" r="${r}"/><text x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" font-size="${r * 1.2}">${i + 1}</text></g>`).join('') : '';
    const lines = grid ? `<path class="mid" d="M512 12V1012M12 512H1012${grid === 'mi' ? 'M12 12L1012 1012M1012 12L12 1012' : ''}"/>` : '';
    return `<svg class="strokes" viewBox="0 0 1024 1024" role="img" aria-label="${title}"><title>${title}</title>`
      + `<rect class="box" x="6" y="6" width="1012" height="1012"/>${lines}`
      + `<g transform="translate(0 900) scale(1 -1)">${paths}</g>${nums}</svg>`;
  }

  const word = (vocab, char) => Object.values(vocab).filter(Array.isArray).flat().find(e => !e.unit && e.hanzi.includes(char));

  window.Strokes = { src, load, svg, word };
})();
