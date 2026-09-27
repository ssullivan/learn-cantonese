/*
 * tones.js — Tone detective: hear a word, pick its jyutping from options
 * that differ only in tone numbers. Any unit can use it.
 * Needs core.js, audio.js, game.js.
 *
 *   Tones.init({
 *     root, key,     as for Game.init
 *     levels: [{ id, name, blurb, pool, choices, rounds? }]
 *                    pool: vocab entries (with audio); choices: 2–6
 *   })
 */
(function () {
  const { el: $, esc, zh, jyutping, shuffle, pick } = Canto;

  // Pitch contours on the usual 1 (low) – 5 (high) scale.
  const TONES = [
    { n: 1, pitch: [5, 5], name: 'high level', eg: ['詩', 'si1', 'poem'] },
    { n: 2, pitch: [2, 5], name: 'high rising', eg: ['史', 'si2', 'history'] },
    { n: 3, pitch: [3, 3], name: 'mid level', eg: ['試', 'si3', 'try'] },
    { n: 4, pitch: [2, 1], name: 'low falling', eg: ['時', 'si4', 'time'] },
    { n: 5, pitch: [2, 3], name: 'low rising', eg: ['市', 'si5', 'market'] },
    { n: 6, pitch: [2, 2], name: 'low level', eg: ['事', 'si6', 'matter'] },
  ];

  function contour([a, b]) {
    const y = v => 22 - v * 4;
    return `<svg viewBox="0 0 40 24" width="40" height="24" aria-hidden="true">
      <line x1="2" y1="${y(1)}" x2="38" y2="${y(1)}" stroke="currentColor" opacity=".15"/>
      <line x1="2" y1="${y(5)}" x2="38" y2="${y(5)}" stroke="currentColor" opacity=".15"/>
      <line x1="4" y1="${y(a)}" x2="36" y2="${y(b)}" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/></svg>`;
  }

  const chart = () => `<table class="tone-chart"><tbody>${TONES.map(t =>
    `<tr><td>${contour(t.pitch)}</td><td><strong>${t.n}</strong> ${t.name}</td><td>${zh(t.eg[0], t.eg[1])} ${t.eg[2]}</td></tr>`).join('')}</tbody></table>`;

  // `count` distinct jyutping strings: the answer plus versions with one
  // syllable's tone changed.
  function options(answer, count) {
    const syl = answer.split(' ');
    const out = new Set([answer]);
    for (let tries = 0; out.size < count && tries < 200; tries++) {
      const s = syl.slice();
      const i = Math.floor(Math.random() * s.length);
      const [, base, tone] = s[i].match(/^([a-z]+)([1-6])$/);
      const others = [1, 2, 3, 4, 5, 6].filter(t => t !== +tone);
      s[i] = base + pick(others, 1)[0];
      out.add(s.join(' '));
    }
    return shuffle([...out]);
  }

  const round = ({ pool, choices }) => (stage, ctx) => {
    const [e] = pick(pool, 1);
    const say = () => ctx.play(e);

    const head = Canto.speech('聽', `<span class="hanzi" lang="zh-HK">${esc(e.hanzi)}</span> ${esc(e.english)}<br>Which tones do you hear?`, say);

    const grid = $('div', 'choice-grid');
    options(e.jyutping, choices).forEach(jp => {
      const b = $('button', 'choice', `<span class="jp">${jyutping(jp)}</span>`);
      b.type = 'button';
      b.dataset.jp = jp;
      b.addEventListener('click', () => {
        if (jp !== e.jyutping) b.classList.add('wrong');
        ctx.done(jp === e.jyutping);
      });
      grid.append(b);
    });

    ctx.answer = `${zh(e.hanzi, e.jyutping)} — ${esc(e.english)}`;
    ctx.reveal = () => grid.querySelector(`[data-jp="${e.jyutping}"]`).classList.add('right');
    stage.replaceChildren(head, grid);
    return say();
  };

  function init({ root, key, levels }) {
    Game.init({
      root,
      key,
      intro: `<strong>How to play:</strong> listen to the word and pick the jyutping with the right tone numbers.
        Cantonese has six tones; the same syllable in a different tone is a different word.${chart()}`,
      levels: levels.map(l => ({ rounds: 8, time: 0, ...l, round: round(l) })),
    });
  }

  window.Tones = { init };
})();
