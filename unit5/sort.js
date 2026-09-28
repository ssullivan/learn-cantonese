/* Unit 5 game: Measure Sort. Pick the measure word for a thing, sort things by their measure word, hear them, and say this or that. Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, picButton, speech } = Canto;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const one = t => byId[`one-${t.id}`];
  const said = entries => entries.map(e => `${zh(e.hanzi, e.jyutping)} (${esc(e.english)})`).join(', ');

  // A tray of pictures from `cart`; tap `want.length` of them.
  function tray(ctx, label, cart, want) {
    const wanted = new Set(want.map(t => t.id));
    const picked = new Set();
    const grid = $('div', 'pic-grid cols-3');
    cart.forEach(t => {
      const b = picButton(t);
      b.addEventListener('click', () => {
        if (picked.delete(t.id)) return b.classList.remove('picked');
        picked.add(t.id);
        b.classList.add('picked');
        if (picked.size === want.length) ctx.done([...picked].every(id => wanted.has(id)));
      });
      grid.append(b);
    });
    ctx.reveal = () => grid.querySelectorAll('.pic-btn').forEach(b => {
      if (wanted.has(b.dataset.id)) b.classList.add('right');
      else if (picked.has(b.dataset.id)) b.classList.add('wrong');
    });
    const box = $('div', 'tray');
    box.append($('p', 'tray-label', label), grid);
    return box;
  }

  // Sort: tap everything counted with one measure word.
  function sort(stage, ctx) {
    const [m] = pick(V.measures, 1);
    const want = pick(V.things.filter(t => t.measure === m.id), 3);
    const cart = shuffle([...want, ...pick(V.things.filter(t => t.measure !== m.id), 6 - want.length)]);
    const say = () => ctx.play(m);
    ctx.answer = `${zh(m.hanzi, m.jyutping)} is ${esc(m.english)}: ${said(want.map(one))}.`;
    stage.replaceChildren(
      speech('你', `Which of these do you count with ${zh(m.hanzi, m.jyutping)}?`, say),
      tray(ctx, `Tap ${want.length === 1 ? 'the one' : `all ${want.length}`}`, cart, want),
    );
    return say();
  }

  // Hear 一條魚, tap its picture.
  function hear(stage, ctx) {
    const cart = pick(V.things, 6);
    const [t] = pick(cart, 1);
    const say = () => ctx.play(one(t));
    ctx.answer = `${zh(one(t).hanzi, one(t).jyutping)} is ${esc(one(t).english)}.`;
    stage.replaceChildren(speech('聽', 'Which one do you hear?', say), tray(ctx, 'Tap it', cart, [t]));
    return say();
  }

  // 呢 or 嗰: the thing is next to you or over there. The wrong options
  // swap 呢 / 嗰, or the measure word.
  function thisThat(stage, ctx) {
    const [t] = pick(V.things, 1);
    const near = Math.random() < 0.5;
    const right = byId[`${near ? 'this' : 'that'}-${t.id}`];
    const [wrongM] = pick(V.measures.filter(m => m.id !== t.measure), 1);
    const option = (ni, m) => ({ id: `${ni ? 'ni' : 'go2'}-${m.id}`, hanzi: `${ni ? '呢' : '嗰'}${m.hanzi}${t.hanzi}`, jyutping: `${ni ? 'ni1' : 'go2'} ${m.jyutping} ${t.jyutping}` });
    const m = byId[t.measure];
    const answer = option(near, m);
    const options = shuffle([answer, option(!near, m), option(near, wrongM), option(!near, wrongM)]);

    const img = $('img', 'prompt-pic' + (near ? '' : ' far'));
    img.src = Canto.imgSrc(t);
    img.alt = t.english;
    const grid = $('div', 'choice-grid');
    options.forEach(o => {
      const b = $('button', 'choice', zh(o.hanzi, o.jyutping));
      b.type = 'button';
      b.dataset.id = o.id;
      b.addEventListener('click', () => {
        if (o !== answer) b.classList.add('wrong');
        ctx.play(right);
        ctx.done(o === answer);
      });
      grid.append(b);
    });
    ctx.answer = `${zh(right.hanzi, right.jyutping)}, ${esc(right.english)}. ${near ? '呢 for here' : '嗰 for over there'}, and the measure word stays.`;
    ctx.reveal = () => grid.querySelector(`[data-id="${answer.id}"]`).classList.add('right');
    stage.replaceChildren(
      speech('你', `Point to the ${esc(right.english.replace(/^(this|that) /, ''))} <strong>${near ? 'right here, next to you' : 'over there, across the room'}</strong>.`),
      img, grid,
    );
  }

  const which = Measures.round({ pool: V.things, vocab: V, choices: 3 });
  const rush = (stage, ctx, n) => [which, hear, thisThat][n % 3](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u5-sort',
    intro: `<strong>How to play:</strong> every noun has its measure word, chosen by its shape:
      ${zh('一隻貓', 'jat1 zek3 maau1')} (animals), ${zh('一條魚', 'jat1 tiu4 jyu4')} (long and thin), ${zh('一張枱', 'jat1 zoeng1 toi2')} (flat).
      Pick the right one, sort things into their groups, and point with ${zh('呢', 'ni1')} (this) and ${zh('嗰', 'go2')} (that).`,
    levels: [
      { id: 'which', name: '一 what?', blurb: 'See a thing and pick its measure word.', rounds: 8, time: 0, round: which },
      { id: 'sort', name: 'Sort', blurb: 'Tap everything that takes one measure word.', rounds: 8, time: 0, round: sort },
      { id: 'hear', name: 'Hear it', blurb: 'Hear 一條魚 and tap the fish.', rounds: 8, time: 10, round: hear },
      { id: 'this-that', name: '呢 or 嗰?', blurb: 'This one here, or that one over there?', rounds: 8, time: 0, round: thisThat },
      { id: 'rush', name: 'Rush', blurb: 'All of it, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
