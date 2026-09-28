/*
 * measures.js — a game.js round: see a thing, say "one of it" with the
 * right measure word (一籠蝦餃, 一隻貓). Any unit can use it. Needs core.js,
 * audio.js, game.js, numbers.js.
 *
 *   Measures.round({ pool, vocab, choices?, prompt? })   a round for Game.init
 *     pool     things to count: entries with a picture and `measure`, the
 *              id of their measure word in `vocab`
 *     vocab    the unit's vocab: has the measure words, and one-<id> (一隻貓)
 *              for every thing in the pool, which plays after answering
 *     choices  how many measure words to offer, from those the pool uses
 *              (default 2)
 *     prompt   (thing, one) → HTML for the speech bubble; `one` is its
 *              one-<id> entry. Default: How do you say "a cat"?
 */
(function () {
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;

  function round({ pool, vocab, choices = 2, prompt }) {
    const byId = Object.fromEntries(Canto.entries(vocab).map(e => [e.id, e]));
    const measures = [...new Set(pool.map(t => t.measure))].map(id => byId[id]);
    const ask = prompt ?? ((t, one) => `How do you say <strong>${esc(one.english)}</strong>?`);

    return (stage, ctx) => {
      const [thing] = pick(pool, 1);
      const right = byId[thing.measure];
      const one = byId[`one-${thing.id}`];
      const img = $('img', 'prompt-pic');
      img.src = imgSrc(thing);
      img.alt = thing.english;

      const grid = $('div', 'choice-grid');
      shuffle([right, ...pick(measures.filter(m => m !== right), choices - 1)]).forEach(m => {
        const { hanzi, jyutping } = Canto.number(1, { measure: m });
        const b = $('button', 'choice', zh(hanzi + thing.hanzi, `${jyutping} ${thing.jyutping}`));
        b.type = 'button';
        b.dataset.id = m.id;
        b.addEventListener('click', () => {
          if (m !== right) b.classList.add('wrong');
          ctx.play(one);
          ctx.done(m === right);
        });
        grid.append(b);
      });

      ctx.answer = `${zh(one.hanzi, one.jyutping)}. ${esc(right.note ?? '')}`;
      ctx.reveal = () => grid.querySelector(`[data-id="${right.id}"]`).classList.add('right');
      stage.replaceChildren(speech('你', ask(thing, one)), img, grid);
    };
  }

  window.Measures = { round };
})();
