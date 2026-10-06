/*
 * tiles.js — a game.js round where you build a sentence from word tiles.
 * Any unit can use it. Needs core.js, audio.js, game.js, units.js; with `say`, also
 * pitch.js and sayit.js. Styles: game.css (.tile-line, .tile-bank, .tile),
 * and sayit.css with `say`.
 *
 *   Tiles.round({ pool, vocab, decoys?, extra?, say? })   a round for Game.init
 *     pool     sentences to build: entries with `words`, the ids of the
 *              vocab entries they are made of, in order, and optionally
 *              `decoys`, wrong tiles always shown with that sentence (二
 *              where it needs 兩)
 *     vocab    the unit's vocab, to look the word ids up in
 *     decoys   ids of words to add as wrong tiles (those already in the
 *              sentence are skipped); extra: how many, default 2
 *     say      true: after answering, practise saying the sentence
 *              (SayIt.practice: record yourself, compare pitch) before
 *              moving on. It doesn't change the score
 *
 * The round shows the English; tap tiles to put them in order (tap a
 * placed tile to take it back), then Check. The same word twice (係唔係)
 * makes two tiles that are interchangeable. Any sentence in the pool with
 * the same English counts as right (你係學生嗎？ or 你係唔係學生呀？ for "Are
 * you a student?"). The sentence plays afterwards.
 */
(function () {
  const { el: $, esc, zh, shuffle, pick } = Canto;

  function round({ pool, vocab, decoys = [], extra = 2, say = false }) {
    const byId = Units.byId(vocab);
    return (stage, ctx) => {
      const e = ctx.draw(pool);
      if (say) ctx.after = SayIt.practice(e);
      const words = e.words.map(id => byId[id]);
      const own = (e.decoys ?? []).filter(id => !e.words.includes(id));
      const wrong = [...own, ...pick(decoys.filter(id => !e.words.includes(id) && !own.includes(id)), Math.max(0, extra - own.length))]
        .map(id => byId[id]);

      const line = $('div', 'tile-line');
      const bank = $('div', 'tile-bank');
      line.dataset.empty = 'Tap the words in order';
      const check = $('button', 'btn primary', 'Check');
      check.type = 'button';
      check.disabled = true;

      shuffle([...words, ...wrong]).forEach(w => {
        const t = $('button', 'tile', zh(w.hanzi, w.jyutping));
        t.type = 'button';
        t.dataset.hanzi = w.hanzi;
        t.addEventListener('click', () => {
          (t.parentNode === bank ? line : bank).append(t);
          check.disabled = !line.children.length;
        });
        bank.append(t);
      });

      const built = () => [...line.children].map(t => t.dataset.hanzi).join('');
      check.addEventListener('click', () => {
        const right = pool.some(o => o.english === e.english && built() === o.words.map(id => byId[id].hanzi).join(''));
        line.classList.add(right ? 'right' : 'wrong');
        ctx.done(right);
      });

      ctx.answer = `${zh(e.hanzi, e.jyutping)} — ${esc(e.english)}${e.note ? ' ' + esc(e.note) : ''}`;
      ctx.reveal = () => { check.disabled = true; ctx.play(e); };
      stage.replaceChildren(Canto.speech('你', `How do you say:<br><strong>${esc(e.english)}</strong>`), line, bank, check);
    };
  }

  window.Tiles = { round };
})();
