/*
 * tiles.js — a game.js round where you build a sentence from word tiles.
 * Any unit can use it. Needs core.js, audio.js, game.js. Styles: game.css
 * (.tile-line, .tile-bank, .tile).
 *
 *   Tiles.round({ pool, vocab, decoys?, extra? })   a round for Game.init
 *     pool     sentences to build: entries with `words`, the ids of the
 *              vocab entries they are made of, in order
 *     vocab    the unit's vocab, to look the word ids up in
 *     decoys   ids of words to add as wrong tiles (those already in the
 *              sentence are skipped); extra: how many, default 2
 *
 * The round shows the English; tap tiles to put them in order (tap a
 * placed tile to take it back), then Check. The same word twice (係唔係)
 * makes two tiles that are interchangeable. Any sentence in the pool with
 * the same English counts as right (你係學生嗎？ or 你係唔係學生呀？ for "Are
 * you a student?"). The sentence plays afterwards.
 */
(function () {
  const { el: $, esc, zh, jyutping, shuffle, pick } = Canto;

  function round({ pool, vocab, decoys = [], extra = 2 }) {
    const byId = Object.fromEntries(Canto.entries(vocab).map(e => [e.id, e]));
    return (stage, ctx) => {
      const [e] = pick(pool, 1);
      const words = e.words.map(id => byId[id]);
      const wrong = pick(decoys.filter(id => !e.words.includes(id)), extra).map(id => byId[id]);

      const line = $('div', 'tile-line');
      const bank = $('div', 'tile-bank');
      line.dataset.empty = 'Tap the words in order';
      const check = $('button', 'btn primary', 'Check');
      check.type = 'button';
      check.disabled = true;

      shuffle([...words, ...wrong]).forEach(w => {
        const t = $('button', 'tile', `<span class="hanzi" lang="zh-HK">${esc(w.hanzi)}</span><span class="jp">${jyutping(w.jyutping)}</span>`);
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
