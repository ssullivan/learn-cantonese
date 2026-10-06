/*
 * reply.js — Reply Match: pick what to say. Any unit can use it.
 * Needs core.js, audio.js, game.js, units.js. Reads two optional entry fields:
 *   reply: [ids]   good answers when someone says this entry to you
 *   when: [text]   situations where you'd say it; the entry's picture
 *                  (if any) shows the first one
 *
 *   Reply.init({
 *     root, key,     as for Game.init
 *     vocab,         the unit's vocab (reply ids are looked up in it)
 *     levels: [{ id, name, blurb, modes, pool, choices?, rounds?, time? }]
 *                    modes: one or more of
 *                      'meaning'  hear an entry, pick its English
 *                      'reply'    hear an entry with `reply`, pick an answer
 *                      'when'     read a situation, pick the entry for it
 *                    Each round uses one of the modes at random.
 *                    pool: entries to ask about (and wrong answers come
 *                    from); choices: 2–6, default 4
 *   })
 */
(function () {
  const { el: $, esc, zh, shuffle, pick, imgSrc } = Canto;

  function button(html, id) {
    const b = $('button', 'choice', html);
    b.type = 'button';
    b.dataset.id = id;
    return b;
  }

  // Answer buttons for `right` plus wrong ones from `others`, then wire up.
  function answers(ctx, right, others, count, label) {
    const grid = $('div', 'choice-grid');
    const wrong = pick(others.filter(o => o.id !== right.id), count - 1);
    shuffle([right, ...wrong]).forEach(o => {
      const b = button(label(o), o.id);
      b.addEventListener('click', () => {
        if (o.id !== right.id) b.classList.add('wrong');
        ctx.done(o.id === right.id);
      });
      grid.append(b);
    });
    ctx.reveal = () => grid.querySelector(`[data-id="${right.id}"]`).classList.add('right');
    return grid;
  }

  const said = e => zh(e.hanzi, e.jyutping);

  const modes = {
    meaning(stage, ctx, { pool, choices }) {
      const [e] = pick(pool, 1);
      const say = () => ctx.play(e);
      const head = Canto.speech('聽', 'What does this mean?', say);
      // Wrong answers must not share the right one's English.
      const others = pool.filter(o => o.english !== e.english);
      stage.replaceChildren(head, answers(ctx, e, others, choices, o => esc(o.english)));
      ctx.answer = `${zh(e.hanzi, e.jyutping)} — ${esc(e.english)}`;
      return say();
    },

    reply(stage, ctx, { pool, choices }, byId) {
      // Wrong answers come from the whole unit, since replies are often outside the pool.
      const [e] = pick(pool.filter(o => o.reply), 1);
      const good = e.reply.map(id => byId[id]);
      const [right] = pick(good, 1);
      const say = () => ctx.play(e);
      const head = Canto.speech('佢', `${said(e)}<br>What do you say back?`, say);
      const others = Object.values(byId).filter(o => !e.reply.includes(o.id));
      stage.replaceChildren(head, answers(ctx, right, others, choices, said));
      ctx.answer = `${good.map(g => zh(g.hanzi, g.jyutping)).join(' or ')} — ${good.map(g => esc(g.english)).join(' / ')}`;
      Game.playOnReveal(ctx, right);
      return say();
    },

    when(stage, ctx, { pool, choices }) {
      const [e] = pick(pool.filter(o => o.when), 1);
      const [situation] = pick(e.when, 1);
      const parts = [];
      if (e.img !== false && situation === e.when[0]) {
        const img = $('img', 'prompt-pic');
        img.src = imgSrc(e);
        img.alt = '';
        parts.push(img);
      }
      parts.push(Canto.speech('你', `${esc(situation)}<br>What do you say?`));
      const others = pool.filter(o => o.when && !o.when.includes(situation));
      stage.replaceChildren(...parts, answers(ctx, e, others, choices, said));
      ctx.answer = `${zh(e.hanzi, e.jyutping)} — ${esc(e.english)}`;
      Game.playOnReveal(ctx, e);
    },
  };

  function init({ root, key, vocab, levels }) {
    const byId = Units.byId(vocab);
    Game.init({
      root,
      key,
      intro: `<strong>How to play:</strong> listen, or read the situation, and pick what fits.
        After each answer you hear the right phrase: say it along with the speaker.`,
      levels: levels.map(l => ({
        rounds: 8, time: 0, choices: 4, ...l,
        round: (stage, ctx) => modes[pick(l.modes, 1)[0]](stage, ctx, { choices: 4, ...l }, byId),
      })),
    });
  }

  window.Reply = { init };
})();
