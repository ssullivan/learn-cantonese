/*
 * tones.js — Tone detective: hear a word, pick its jyutping from options
 * that differ only in tone numbers. Any unit can use it.
 * Needs core.js, audio.js, game.js.
 *
 *   Tones.init({
 *     root, key,     as for Game.init
 *     levels: [{ id, name, blurb, pool, choices, rounds?, tones? }]
 *                    pool: vocab entries (with audio); choices: 2–6;
 *                    tones: wrong answers only use these tone numbers
 *                    (e.g. [2, 5] to practise telling two tones apart)
 *   })
 */
(function () {
  const { el: $, esc, zh, jyutping, tones: tonesOf, toneChart, shuffle, pick } = Canto;

  // `count` distinct jyutping strings: the answer plus versions with one
  // syllable's tone changed to one of `allowed`.
  function options(answer, count, allowed = [1, 2, 3, 4, 5, 6]) {
    const syl = answer.split(' ');
    const tone = tonesOf(answer);
    const out = new Set([answer]);
    for (let tries = 0; out.size < count && tries < 200; tries++) {
      const s = syl.slice();
      const i = Math.floor(Math.random() * s.length);
      const others = allowed.filter(t => t !== tone[i]);
      if (!others.length) continue;
      s[i] = s[i].slice(0, -1) + pick(others, 1)[0];
      out.add(s.join(' '));
    }
    return shuffle([...out]);
  }

  const round = ({ pool, choices, tones }) => (stage, ctx) => {
    const [e] = pick(pool, 1);
    const say = () => ctx.play(e);

    const head = Canto.speech('聽', `<span class="hanzi" lang="zh-HK">${esc(e.hanzi)}</span> ${esc(e.english)}<br>Which tones do you hear?`, say);

    const grid = $('div', 'choice-grid');
    options(e.jyutping, choices, tones).forEach(jp => {
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
        Cantonese has six tones; the same syllable in a different tone is a different word.${toneChart()}`,
      levels: levels.map(l => ({ rounds: 8, time: 0, ...l, round: round(l) })),
    });
  }

  window.Tones = { init };
})();
