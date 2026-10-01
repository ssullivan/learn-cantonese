/* Unit 21 game: Kitchen Helper. Hear an appliance and find it, hear 用乜嘢煲飯呀？ and pick the appliance for the job, say what an appliance is for, hear how long to cook something (叮兩分鐘), and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const { choose } = Game;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const said = e => zh(e.hanzi, e.jyutping);
  const pic = e => `<img src="${imgSrc(e)}" alt="${esc(e.english)}">`;
  const others = (e, pool, n) => pick(pool.filter(o => o !== e), n);
  // Play `e` once the right answer is shown, however the round ended.
  const playOnReveal = (ctx, e) => {
    const show = ctx.reveal;
    ctx.reveal = () => { show(); ctx.play(e); };
  };

  // Hear it, tap it.
  const hear = (stage, ctx) => {
    const [e] = pick(V.appliances, 1);
    const say = () => ctx.play(e);
    ctx.answer = Game.answerText(e);
    stage.replaceChildren(speech('聽', '邊樣？ Which one?', say),
      choose(ctx, e, shuffle([e, ...others(e, V.appliances, 3)]), pic, 'pic-grid pics'));
    return say();
  };

  // 用乜嘢煲飯呀？: tap the appliance for the job.
  const use = (stage, ctx) => {
    const [q] = pick(V.asks, 1);
    const right = byId[q.tool];
    const say = () => ctx.play(q);
    playOnReveal(ctx, right);
    ctx.answer = `${said(q)} ${esc(q.english)} ${said(right)}, the ${esc(right.english)}.`;
    stage.replaceChildren(speech('問', said(q), say),
      choose(ctx, right, shuffle([right, ...others(right, V.appliances, 3)]), pic, 'pic-grid pics'));
    return say();
  };

  // See an appliance: what is it for?
  const what = (stage, ctx) => {
    const [a] = pick(V.appliances, 1);
    const right = byId[a.task];
    const img = $('img', 'prompt-pic');
    img.src = imgSrc(a);
    img.alt = a.english;
    playOnReveal(ctx, right);
    ctx.answer = `${said(a)}: ${said(right)}, ${esc(right.english)}.${right.note ? ' ' + esc(right.note) : ''}`;
    stage.replaceChildren(speech('你', '用嚟做乜嘢？ What is it for?'), img,
      choose(ctx, right, shuffle([right, ...others(right, V.tasks, 2)]), said));
  };

  // Hear 用微波爐叮兩分鐘: how long?
  const timed = V.howLong.filter(h => h.mins);
  const long = (stage, ctx) => {
    const [h] = pick(timed, 1);
    const right = V.minutes.find(m => m.mins === h.mins);
    const say = () => ctx.play(h);
    playOnReveal(ctx, right);
    ctx.answer = `${said(h)} ${esc(h.english)}`;
    stage.replaceChildren(speech('聽', '幾耐？ How long?', say),
      choose(ctx, right, shuffle([right, ...others(right, V.minutes, 3)]), m => esc(m.english)));
    return say();
  };

  const build = Tiles.round({ pool: [...V.uses, ...V.howLong, ...V.inOut, ...V.sentences], vocab: V,
    decoys: ['jung', 'jap6', 'ceot', 'di', 'hoi', 'saan1', 'go', 'm'], extra: 2 });
  const rush = (stage, ctx, n) => [hear, use][n % 2](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u21-kitchen',
    intro: `<strong>How to play:</strong> help in the ${zh('廚房', 'cyu4 fong2')}. Find the appliance for each job when
      someone asks ${zh('用乜嘢煲飯呀？', 'jung6 mat1 je5 bou1 faan6 aa3')}, say what each one is for, and catch how long
      to cook things: ${zh('叮兩分鐘', 'ding1 loeng5 fan1 zung1')}.`,
    levels: [
      { id: 'hear', name: '廚房電器', blurb: 'Hear an appliance and tap it.', rounds: 8, time: 12, round: hear },
      { id: 'use', name: '用乜嘢？', blurb: 'What do you use to do it? Tap the appliance.', rounds: 8, time: 0, round: use },
      { id: 'what', name: '用嚟做乜嘢？', blurb: 'See an appliance: what is it for?', rounds: 8, time: 0, round: what },
      { id: 'long', name: '幾耐？', blurb: 'Hear how long to cook it.', rounds: 8, time: 0, round: long },
      { id: 'build', name: 'Build it', blurb: '我用水煲煲水. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Kitchen rush', blurb: 'Appliances and jobs, against the clock.', rounds: 12, time: 15, round: rush },
    ],
  });
})();
