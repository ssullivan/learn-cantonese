/* Unit 16 game: Survey. Hear a hobby, answer 鍾唔鍾意 and 識唔識 questions from your survey sheet, note down what someone says they like, ask the right question (鍾唔鍾意, 識唔識 or 想唔想), and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const { choose, answerText, chart, mark, pic, playOnReveal } = Game;
  const byId = Units.byId(V);
  const said = e => zh(e.hanzi, e.jyutping);

  // Hear a hobby, tap its picture.
  const what = (stage, ctx) => {
    const e = ctx.draw(V.hobbies);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '做乜嘢？ Which hobby?', say),
      choose(ctx, e, shuffle([e, ...pick(V.hobbies.filter(o => o !== e), 3)]), pic, 'pic-grid pics'));
    return say();
  };

  // Your survey sheet: three hobbies, ticked or crossed. You're asked
  // about one (鍾唔鍾意 or 識唔識); answer from the sheet.
  const sheet = kind => (stage, ctx) => {
    const asks = V.asks.filter(q => q.kind === kind);
    const shown = pick(asks, 3);
    const yes = new Map(shown.map(q => [q, Math.random() < 0.5]));
    const [q] = pick(shown, 1);
    const [y, n] = q.answers.map(id => byId[id]);
    const right = yes.get(q) ? y : n;
    const grid = choose(ctx, right, [y, n], said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(right); });
    ctx.answer = `${said(q)} ${esc(q.english)} Your sheet says ${said(right)}.${q.note ? ' ' + esc(q.note) : ''}`;
    const say = () => ctx.play(q);
    stage.replaceChildren(speech('問', `${said(q)} Answer from your sheet.`, say),
      chart(shown.map(s => [byId[s.hobby], yes.get(s)]), 'Your survey sheet'), grid);
    return say();
  };

  // Hear 我鍾意游水 or 我唔鍾意游水; tick or cross the right hobby.
  const note = (stage, ctx) => {
    const [a, b] = pick(V.hobbies, 2);
    const options = V.likes.filter(l => l.hobby === a.id || l.hobby === b.id);
    const [e] = pick(options.filter(l => l.hobby === a.id), 1);
    const cell = l => `${pic(byId[l.hobby])}${mark(l.yes)}`;
    ctx.answer = `${said(e)} ${esc(e.english)}${e.note ? ' ' + esc(e.note) : ''}`;
    const say = () => ctx.play(e);
    stage.replaceChildren(speech('聽', '記低：佢鍾唔鍾意？ Note it down: ✓ likes it, ✗ doesn\'t.', say),
      choose(ctx, e, shuffle(options), cell, 'pic-grid pics'));
    return say();
  };

  // Read a question in English; pick how to ask it: 鍾唔鍾意, 識唔識 or 想唔想.
  const ask = (stage, ctx) => {
    const h = ctx.draw(V.hobbies.filter(h => h.skill));
    const options = V.asks.filter(q => q.hobby === h.id);
    const [q] = pick(options, 1);
    ctx.answer = `${said(q)} ${esc(q.english)}${q.note ? ' ' + esc(q.note) : ''}`;
    const grid = choose(ctx, q, shuffle(options), said);
    playOnReveal(ctx, q);
    const img = document.createElement('img');
    img.className = 'prompt-pic';
    img.src = imgSrc(h);
    img.alt = '';
    stage.replaceChildren(img, speech('你', `How do you ask:<br><strong>${esc(q.english)}</strong>`), grid);
  };

  const build = Tiles.round({ pool: [...V.sentences, ...V.likes, ...V.cans], vocab: V,
    decoys: ['zung1', 'm', 'soeng', 'sik', 'wui', 'dou', 'heoi'], extra: 2 });
  const rush = (stage, ctx, n) => [what, note][n % 2](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u16-survey',
    intro: `<strong>How to play:</strong> a hobby survey. Answer from your sheet with the verb you're asked:
      ${zh('鍾意', 'zung1 ji3')} or ${zh('唔鍾意', 'm4 zung1 ji3')}, ${zh('識', 'sik1')} or ${zh('唔識', 'm4 sik1')}.
      Then note down what people tell you, and ask the questions yourself.`,
    levels: [
      { id: 'what', name: '做乜嘢？', blurb: 'Hear a hobby and tap it.', rounds: 8, time: 12, round: what },
      { id: 'like', name: '鍾唔鍾意？', blurb: 'Answer from your sheet: 鍾意 or 唔鍾意.', rounds: 8, time: 0, round: sheet('like') },
      { id: 'can', name: '識唔識？', blurb: 'Answer from your sheet: 識 or 唔識.', rounds: 8, time: 0, round: sheet('can') },
      { id: 'note', name: '記低', blurb: 'Hear what they like, and tick or cross it.', rounds: 8, time: 0, round: note },
      { id: 'ask', name: '點樣問？', blurb: 'Ask it right: 鍾唔鍾意, 識唔識 or 想唔想?', rounds: 8, time: 0, round: ask },
      { id: 'build', name: 'Build it', blurb: '我鍾意游水. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Survey rush', blurb: 'Hobbies and likes, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
