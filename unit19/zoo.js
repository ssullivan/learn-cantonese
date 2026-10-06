/* Unit 19 game: Zoo. Hear an animal and find it, say one with 隻 or 條 (shared/measures.js), answer 會唔會 about an animal, find the one that can fly or climb, find someone's zodiac animal from 我屬猴, count the animals in a pen, and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const { choose, pic, playOnReveal } = Game;
  const byId = Units.byId(V);
  const said = e => zh(e.hanzi, e.jyutping);
  const prompt = e => { const img = $('img', 'prompt-pic'); img.src = imgSrc(e); img.alt = ''; return img; };
  const name = e => esc(e.english.replace(/;.*/, ''));
  const animals = [...V.animals, ...V.pets];

  // Hear an animal, tap it.
  const hear = (stage, ctx) => {
    const e = ctx.draw(animals);
    const say = () => ctx.play(e);
    ctx.answer = Game.answerText(e);
    stage.replaceChildren(speech('聽', '邊隻？ Which animal?', say),
      choose(ctx, e, shuffle([e, ...pick(animals.filter(o => o !== e), 3)]), pic, 'pic-grid pics'));
    return say();
  };

  // See an animal, hear 雀仔會唔會飛呀？, answer 會 or 唔會.
  const [yes, no] = [byId.wui, byId['m-wui']];
  const can = (stage, ctx) => {
    const q = ctx.draw(V.asks);
    const right = q.can ? yes : no;
    const say = () => ctx.play(q);
    playOnReveal(ctx, right);
    ctx.answer = `${said(q)} ${esc(q.english)} ${said(right)}.${q.note ? ' ' + esc(q.note) : ''}`;
    stage.replaceChildren(prompt(byId[q.animal]), speech('問', '會唔會？ Can it?', say), choose(ctx, right, [yes, no], said));
    return say();
  };

  // Hear 邊隻會飛呀？; of four animals, only one can.
  const which = (stage, ctx) => {
    const q = ctx.draw(V.whichCan);
    const { can: cans, cant } = V.abilities[q.verb];
    const [right] = pick(cans, 1).map(id => byId[id]);
    const others = pick(cant, 3).map(id => byId[id]);
    const say = () => ctx.play(q);
    ctx.answer = `${said(q)} ${esc(q.english)} ${said(right)}, ${name(right)}.`;
    stage.replaceChildren(speech('問', 'Listen: which one can?', say),
      choose(ctx, right, shuffle([right, ...others]), pic, `pic-grid pics${['', ' pair', ' three'][others.length] ?? ''}`));
    return say();
  };

  // Hear 我屬猴; tap the animal. Four of the zodiac names differ from the everyday word.
  const zodiac = (stage, ctx) => {
    const z = ctx.draw(V.zodiac);
    const right = byId[z.animal];
    const others = pick(V.zodiac.filter(o => o !== z), 3).map(o => byId[o.animal]);
    const sign = byId[z.words[2]];
    const say = () => ctx.play(z);
    ctx.answer = `${said(z)} ${esc(z.english)}${sign.id !== right.id ? ` ${said(sign)} is ${said(right)}, ${name(right)}.` : ''}`;
    stage.replaceChildren(speech('聽', '佢屬乜嘢呀？ Which animal?', say),
      choose(ctx, right, shuffle([right, ...others]), pic, 'pic-grid pics'));
    return say();
  };

  // A pen of animals: how many, and with which measure word? The wrong
  // answers swap the measure word or miss one.
  const measures = Units.byId(V.measures);
  const phrase = (n, t, m) => { const { hanzi, jyutping } = Canto.number(n, { measure: m }); return { hanzi: hanzi + t.hanzi, jyutping: `${jyutping} ${t.jyutping}` }; };
  const count = (stage, ctx) => {
    const e = ctx.draw(V.counts);
    const t = byId[e.thing];
    const other = measures[t.measure === 'zek' ? 'tiu' : 'zek'];
    const options = [
      e,
      { id: 'wrong-measure', ...phrase(e.n, t, other) },
      { id: 'one-more', ...phrase(e.n + 1, t, measures[t.measure]) },
      { id: 'one-less', ...phrase(e.n - 1, t, measures[t.measure]) },
    ];
    playOnReveal(ctx, e);
    ctx.answer = `${said(e)}, ${esc(e.english)}. ${esc(t.english.replace(/;.*/, ''))}: ${said(measures[t.measure])}${t.measure === 'tiu' ? ', for a long animal' : ''}.`;
    const pen = $('div', 'pic-row', Array.from({ length: e.n }, () => `<img src="${imgSrc(t)}" alt="">`).join(''));
    pen.setAttribute('aria-label', `${e.n} ${t.english}`);
    stage.replaceChildren(speech('你', '幾多隻？ How many are in the pen?'), pen, choose(ctx, e, shuffle(options), said));
  };

  const measure = Measures.round({ pool: animals, vocab: V });
  const build = Tiles.round({ pool: [...V.can, ...V.cant, ...V.zodiac, ...V.sentences], vocab: V,
    decoys: ['zek', 'tiu', 'wui', 'm', 'bin', 'suk'], extra: 2 });
  const rush = (stage, ctx, n) => [hear, which][n % 2](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u19-zoo',
    intro: `<strong>How to play:</strong> find each animal, count it with ${zh('隻', 'zek3')} or
      ${zh('條', 'tiu4')}, say what it can do (${zh('會', 'wui5')} or ${zh('唔會', 'm4 wui5')}), and find
      someone's zodiac animal: ${zh('我屬猴', 'ngo5 suk6 hau4')}.`,
    levels: [
      { id: 'hear', name: '動物', blurb: 'Hear an animal and tap it.', rounds: 8, time: 12, round: hear },
      { id: 'measure', name: '隻定條？', blurb: 'One of it: 一隻老虎 or 一條蛇?', rounds: 8, time: 0, round: measure },
      { id: 'can', name: '會唔會？', blurb: 'Can it fly, swim, climb? Answer 會 or 唔會.', rounds: 8, time: 0, round: can },
      { id: 'which', name: '邊隻會飛？', blurb: 'Only one of them can: tap it.', rounds: 8, time: 0, round: which },
      { id: 'zodiac', name: '屬乜嘢？', blurb: 'Hear 我屬猴 and tap the animal.', rounds: 8, time: 0, round: zodiac },
      { id: 'count', name: '幾多隻？', blurb: 'Count the animals in the pen: 三隻 or 三條?', rounds: 8, time: 0, round: count },
      { id: 'build', name: 'Build it', blurb: '雀仔會飛. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Zoo rush', blurb: 'Animals, and what they can do, against the clock.', rounds: 12, time: 15, round: rush },
    ],
  });
})();
