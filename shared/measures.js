/*
 * measures.js — a game.js round: see a thing, say "one of it" with the
 * right measure word (一籠蝦餃, 一隻貓). Any unit can use it. Needs core.js,
 * audio.js, game.js, numbers.js, units.js.
 *
 *   Measures.round({ pool, vocab, choices?, prompt?, owner? })   a round for Game.init
 *     pool     things to count: entries with a picture and `measure`, the
 *              id of their measure word in `vocab`
 *     vocab    the unit's vocab: has the measure words, and one-<id> (一隻貓)
 *              for every thing in the pool, which plays after answering
 *     choices  how many measure words to offer, from those the pool uses
 *              (default 2)
 *     prompt   (thing, one) → HTML for the speech bubble; `one` is its
 *              one-<id> entry. Default: How do you say "a cat"?
 *     owner    a person entry (我): say "my cat" (我隻貓) instead of "a
 *              cat"; plays <owner id>-<measure id>-<id> (as Units.sentences
 *              names 'ngo zek cat') instead of one-<id>
 */
(function () {
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;

  function round({ pool, vocab, choices = 2, prompt, owner }) {
    const byId = Units.byId(vocab);
    const measures = [...new Set(pool.map(t => t.measure))].map(id => byId[id]);
    const ask = prompt ?? ((t, one) => `How do you say <strong>${esc(one.english)}</strong>?`);

    return (stage, ctx) => {
      const thing = ctx.draw(pool);
      const right = byId[thing.measure];
      const one = byId[owner ? `${owner.id}-${thing.measure}-${thing.id}` : `one-${thing.id}`];
      const img = $('img', 'prompt-pic');
      img.src = imgSrc(thing);
      img.alt = thing.english;

      const grid = $('div', 'choice-grid');
      shuffle([right, ...pick(measures.filter(m => m !== right), choices - 1)]).forEach(m => {
        const { hanzi, jyutping } = owner ? { hanzi: owner.hanzi + m.hanzi, jyutping: `${owner.jyutping} ${m.jyutping}` } : Canto.number(1, { measure: m });
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
