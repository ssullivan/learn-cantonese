/*
 * write.js — Write It: write characters stroke by stroke, in Hong Kong
 * stroke order, with a finger, pen or mouse. Any unit can use it for the
 * characters it teaches to write (its vocab's `write`). Needs core.js,
 * audio.js, game.js and strokes.js. Styles: game.css, strokes.css,
 * write.css.
 *
 *   Write.init({ root, key, vocab })    Game.init with the four levels below,
 *                                       a round per character
 *   Write.round({ vocab, mode })        one level's round, for Game.init:
 *     'watch'      the character is written for you, then you trace it
 *                  over a faint copy with the next stroke picked out
 *     'trace'      trace it over the faint copy alone
 *     'recall'     write it from memory: its word with the character
 *                  blanked out (最近＿呀？), Jyutping and English
 *     'dictation'  默書: hear the word and write the character, with only
 *                  its blanked-out word to go on
 *
 * Each stroke you draw is checked against the next stroke's centre line
 * (Write.judge): it must start and end near it and follow its path. A
 * right stroke snaps into place; a wrong one fades, and one that matches
 * a later stroke says so (the Hong Kong order has another first). After
 * three tries the stroke is shown. A round is right with at most one slip
 * (a wrong stroke, or a hint) per six strokes, and at least one allowed.
 *
 * Pure helpers (tested in tools/strokes.test.mjs), coordinates in the
 * 1024 box with y down, as on screen:
 *   Write.resample(points, n)       n points evenly spaced along a line
 *   Write.match(points, median, leniency = 1)
 *                                   does the drawn line follow the median
 *                                   (Make Me a Hanzi's, y up)?
 *   Write.blank(hanzi, char)        the word with every copy of the
 *                                   character blanked out (公公 → ＿＿)
 *   Write.judge(points, data, k, leniency = 1)
 *                                   { ok, other }: ok if stroke k is the closest
 *                                   of the strokes still to write that it
 *                                   matches (三's strokes are all alike); else
 *                                   other = the closest later one, or null
 */
(function () {
  // How far the drawing may stray, in the 1024 box, before leniency.
  const END = 210, MEAN = 125;
  const LENIENCY = { watch: 1.3, trace: 1.2, recall: 1.1, dictation: 1.1 };
  const HINT_AFTER = 3;

  const dist = ([a, b], [c, d]) => Math.hypot(a - c, b - d);
  const length = pts => pts.slice(1).reduce((s, p, i) => s + dist(p, pts[i]), 0);

  function resample(pts, n) {
    const total = length(pts);
    if (pts.length < 2 || total === 0) return Array.from({ length: n }, () => pts[0]);
    const out = [pts[0]];
    const step = total / (n - 1);
    let want = step, walked = 0;
    for (let i = 1; i < pts.length && out.length < n; i++) {
      const seg = dist(pts[i - 1], pts[i]);
      while (seg > 0 && walked + seg >= want && out.length < n) {
        const t = (want - walked) / seg;
        out.push([pts[i - 1][0] + t * (pts[i][0] - pts[i - 1][0]), pts[i - 1][1] + t * (pts[i][1] - pts[i - 1][1])]);
        want += step;
      }
      walked += seg;
    }
    while (out.length < n) out.push(pts[pts.length - 1]);
    return out;
  }

  const onScreen = median => median.map(([x, y]) => [x, 900 - y]);

  // How far on average the drawn line is from the median, or Infinity if
  // it starts or ends too far away, or is far longer (a scribble).
  function distance(pts, median, leniency) {
    const m = onScreen(median);
    if (!pts.length) return Infinity;
    const [a, b] = [resample(pts, 24), resample(m, 24)];
    const mean = a.reduce((s, p, i) => s + dist(p, b[i]), 0) / a.length;
    const [drawn, want] = [length(pts), length(m)];
    const fits = dist(a[0], b[0]) <= END * leniency
      && dist(a.at(-1), b.at(-1)) <= END * leniency
      && mean <= MEAN * leniency
      && drawn <= want * 2.2 + 120;
    return fits ? mean : Infinity;
  }

  const match = (pts, median, leniency = 1) => distance(pts, median, leniency) < Infinity;

  function judge(pts, data, k, leniency = 1) {
    const d = data.medians.map((m, j) => j < k ? Infinity : distance(pts, m, leniency));
    const best = d.indexOf(Math.min(...d));
    if (d[best] === Infinity) return { ok: false, other: null };
    return best === k ? { ok: true, other: null } : { ok: false, other: best };
  }

  // The word with every copy of the character blanked out (公公 → ＿＿).
  const blank = (hanzi, char) => hanzi.replaceAll(char, '＿');

  // --- the game (browser only)

  const ord = n => `stroke ${n}`;

  function prompt(mode, w, char) {
    const { esc, zh } = Canto;
    const gap = blank(w.hanzi, char);
    if (mode === 'watch' || mode === 'trace') return `Write ${zh(w.hanzi, w.jyutping)}: ${esc(w.english)}`;
    if (mode === 'recall') return `Write the missing character:<br><span class="hanzi" lang="zh-HK">${esc(gap)}</span> <span class="jp">${Canto.jyutping(w.jyutping)}</span> ${esc(w.english)}`;
    return w.hanzi === char ? 'Write the character you hear.' : `Write the missing character you hear:<br><span class="hanzi" lang="zh-HK">${esc(gap)}</span>`;
  }

  function round({ vocab, mode }) {
    const { el: $, esc, zh, shuffle } = Canto;
    const chars = [...vocab.write];
    const leniency = LENIENCY[mode] ?? 1;
    let order = chars;
    return async (stage, ctx, n) => {
      if (n === 0) order = shuffle(chars);
      const char = order[n % order.length];
      const data = await Strokes.load(char);
      const w = Strokes.word(vocab, char) ?? { hanzi: char, jyutping: '', english: '' };
      const total = data.strokes.length;
      const allowed = Math.max(1, Math.round(total / 6));
      const ghost = mode === 'watch' || mode === 'trace';
      let k = 0, slips = 0, tries = 0, hinting = false, ready = true;

      const say = () => ctx.play(w);
      const head = Canto.speech(mode === 'dictation' ? '聽' : '寫', prompt(mode, w, char), mode === 'dictation' || mode === 'recall' ? say : null);
      const pad = $('div', 'write-pad');
      const art = $('div', 'write-art');
      const NS = 'http://www.w3.org/2000/svg';
      const ink = document.createElementNS(NS, 'svg');
      ink.setAttribute('class', 'write-ink');
      ink.setAttribute('viewBox', '0 0 1024 1024');
      ink.setAttribute('aria-label', `Writing box: draw ${total} strokes`);
      pad.append(art, ink);
      const status = $('p', 'write-status');
      status.setAttribute('aria-live', 'polite');
      const tools = $('div', 'write-tools');
      const button = (label, fn) => { const b = $('button', 'btn small', label); b.type = 'button'; b.addEventListener('click', fn); tools.append(b); return b; };

      const paint = () => { art.innerHTML = Strokes.svg(data, { upto: k, ghost, next: (mode === 'watch' && ready) || hinting, grid: true, title: `${char}: ${k} of ${total} strokes` }); };
      const tell = text => { status.textContent = text; };
      const where = () => `${ord(k + 1)} of ${total}`;

      async function watch() {
        if (!ready) return;  // already being written
        ready = false;
        tell('Watch the strokes, in order.');
        await Strokes.animate(art, data, { ghost });
        k = 0; ready = true; paint();
        tell(`Now you: ${where()}.`);
      }
      if (mode === 'watch' || mode === 'trace') button('▶ Watch', watch);
      // Watch & trace already picks out the next stroke.
      if (mode !== 'watch') button('Hint', () => {
        if (ctx.finished || !ready || hinting) return;
        slips++; hinting = true; paint();
        tell(`Stroke ${k + 1} is picked out: trace it.`);
      });

      // Drawing: one stroke per press, in the 1024 box.
      let pts = null, line = null;
      const at = e => {
        const r = ink.getBoundingClientRect();
        return [(e.clientX - r.left) / r.width * 1024, (e.clientY - r.top) / r.height * 1024];
      };
      ink.addEventListener('pointerdown', e => {
        if (ctx.finished || !ready) return;
        e.preventDefault();
        ink.setPointerCapture(e.pointerId);
        pts = [at(e)];
        line = document.createElementNS(NS, 'polyline');
        ink.append(line);
      });
      ink.addEventListener('pointermove', e => {
        if (!pts) return;
        pts.push(at(e));
        line.setAttribute('points', pts.map(p => p.map(Math.round).join(',')).join(' '));
      });
      const lift = () => {
        if (!pts) return;
        const drawn = pts, mark = line;
        pts = line = null;
        const { ok, other } = judge(drawn, data, k, leniency);
        if (ok) {
          mark.remove();
          k++; tries = 0; hinting = false;
          paint();
          if (k === total) return ctx.done(slips <= allowed);
          return tell(`Good. Now ${where()}.`);
        }
        mark.classList.add('miss');
        setTimeout(() => mark.remove(), 600);
        slips++; tries++;
        tell(other !== null
          ? `That's ${ord(other + 1)}. In Hong Kong order, ${ord(k + 1)} comes first.`
          : `Not quite: try ${ord(k + 1)} again.`);
        if (tries >= HINT_AFTER && !hinting) {
          hinting = true; paint();
          tell(`Here's stroke ${k + 1}: trace it.`);
        }
      };
      ink.addEventListener('pointerup', lift);
      ink.addEventListener('pointercancel', () => { line?.remove(); pts = line = null; });

      // Read when the round ends, so it counts the slips made.
      Object.defineProperty(ctx, 'answer', { get: () => `${zh(w.hanzi, w.jyutping)} ${esc(w.english)}: ${total} stroke${total === 1 ? '' : 's'}, ${slips ? `${slips} slip${slips === 1 ? '' : 's'}` : 'no slips'}.` });
      ctx.reveal = () => {
        art.innerHTML = Strokes.svg(data, { numbers: true, title: char });
        ink.remove();
        tools.remove();
        tell('');
        say();
      };

      paint();
      stage.replaceChildren(head, pad, status, tools);
      if (mode === 'dictation') await say();
      if (mode === 'watch') await watch();
      else tell(`Start with ${where()}.`);
    };
  }

  const LEVELS = [
    ['watch', 'Watch & trace', 'See it written, then trace it with the next stroke picked out.'],
    ['trace', 'Trace', 'Trace the faint character, stroke by stroke, in Hong Kong order.'],
    ['recall', 'From memory', 'Write it in an empty box from its word, Jyutping and English.'],
    ['dictation', '默書 Dictation', 'Hear the word and write the character.'],
  ];

  function init({ root, key, vocab }) {
    const rounds = vocab.write.length;
    Game.init({
      root, key,
      intro: 'Write each character stroke by stroke, in <strong>Hong Kong stroke order</strong>: one stroke each time you press and lift. A wrong stroke fades, and <strong>Hint</strong> shows the next one (each counts as a slip).',
      levels: LEVELS.map(([mode, name, blurb]) => ({ id: mode, name, blurb, rounds, time: 0, round: round({ vocab, mode }) })),
    });
  }

  const api = { init, round, resample, match, judge, blank };
  (typeof window !== 'undefined' ? window : globalThis).Write = api;
})();
