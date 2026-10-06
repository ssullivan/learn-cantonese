/* Unit 20 game: Wet Market. Hear a fruit or vegetable and find it, sort fruit from vegetables, say one with the right measure word (shared/measures.js), answer 幾多錢一斤呀？ from the sign, hear how many catties someone wants, work out what an order comes to, and build sentences (shared/tiles.js). Runs on shared/game.js. Prices per 斤 come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech, confusable } = Canto;
  const { choose, pic, playOnReveal } = Game;
  const byId = Units.byId(V);
  const said = e => zh(e.hanzi, e.jyutping);
  const dollars = n => `$${n % 1 ? n.toFixed(2) : n}`;
  const produce = [...V.fruit, ...V.veg];
  // A thing on the stall, with its sign: $12/斤.
  function stall(t) {
    const box = $('div', 'stall');
    const img = $('img', 'prompt-pic');
    img.src = imgSrc(t);
    img.alt = t.english;
    box.append(img, $('span', 'price-tag', `${dollars(t.catty)}/斤`));
    return box;
  }

  // Hear it, tap it.
  const hear = (stage, ctx) => {
    const [e] = pick(produce, 1);
    const say = () => ctx.play(e);
    ctx.answer = Game.answerText(e);
    stage.replaceChildren(speech('聽', '邊樣？ Which one?', say),
      choose(ctx, e, shuffle([e, ...pick(produce.filter(o => o !== e), 3)]), pic, 'pic-grid pics'));
    return say();
  };

  // 生果定菜？
  const kinds = { fruit: byId['saang-gwo'], veg: byId.coi };
  const sort = (stage, ctx) => {
    const [e] = pick(produce, 1);
    const right = kinds[e.kind];
    const img = $('img', 'prompt-pic');
    img.src = imgSrc(e);
    img.alt = '';
    playOnReveal(ctx, e);
    ctx.answer = `${said(e)}, ${esc(e.english)}: ${said(right)}.${e.id === 'tomato' ? ' ' + esc(e.note) : ''}`;
    stage.replaceChildren(speech('你', '生果定菜？ Fruit or vegetable?'), img, choose(ctx, right, [kinds.fruit, kinds.veg], said));
  };

  // The customer asks 香蕉幾多錢一斤呀？: read the sign and answer.
  const sign = (stage, ctx) => {
    const [q] = pick(V.asks, 1);
    const t = byId[q.thing];
    const right = V.perCatty.find(p => p.n === t.catty);
    const say = () => ctx.play(q);
    playOnReveal(ctx, right);
    ctx.answer = `${said(q)} ${said(right)}: ${esc(right.english)}.`;
    stage.replaceChildren(stall(t), speech('客', `${said(q)}<br>Read the sign and answer.`, say),
      choose(ctx, right, shuffle([right, ...confusable(right, V.perCatty, 3)]), said));
    return say();
  };

  // Hear 我要斤半菠蘿: how much does the customer want?
  const weigh = (stage, ctx) => {
    const [o] = pick(V.orders, 1);
    const w = byId[o.weight];
    const say = () => ctx.play(o);
    playOnReveal(ctx, w);
    ctx.answer = `${said(o)} ${esc(o.english)}`;
    stage.replaceChildren(speech('客', '要幾多斤？ How much do they want?', say),
      choose(ctx, w, shuffle([w, ...pick(V.weights.filter(x => x !== w), 3)]), x => esc(x.english)));
    return say();
  };

  // Hear the order, read the sign: what does it come to?
  const total = (stage, ctx) => {
    const [o] = pick(V.orders, 1);
    const t = byId[o.thing], w = byId[o.weight], right = byId[o.total];
    // Wrong answers: the same price for another weight.
    const others = [...new Set(V.weights.filter(x => x !== w).map(x => t.catty * x.n))]
      .filter(n => n !== right.n).map(n => ({ id: `n${n}`, n }));
    const say = () => ctx.play(o);
    playOnReveal(ctx, right);
    ctx.answer = `${said(o)} ${dollars(t.catty)} × ${esc(w.english)} = ${said(right)}, ${esc(right.english)}.`;
    stage.replaceChildren(stall(t), speech('客', '一共幾多錢呀？ What does it come to?', say),
      choose(ctx, right, shuffle([right, ...pick(others, 3)]), x => dollars(x.n), 'choice-grid nums'));
    return say();
  };

  const measure = Measures.round({ pool: produce, vocab: V, choices: 3 });
  const build = Tiles.round({ pool: [...V.orders, ...V.some, ...V.sentences], vocab: V,
    decoys: ['di', 'go', 'tiu', 'nap', 'po', 'm', 'hou'], extra: 2 });
  const rush = (stage, ctx, n) => [hear, sort][n % 2](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u20-market',
    intro: `<strong>How to play:</strong> sort ${zh('生果', 'saang1 gwo2')} from ${zh('菜', 'coi3')}, count
      with the right measure word, read the signs when customers ask ${zh('幾多錢一斤呀？', 'gei2 do1 cin2 jat1 gan1 aa3')},
      weigh out their 斤, and work out what it comes to.`,
    levels: [
      { id: 'hear', name: '生果同菜', blurb: 'Hear a fruit or vegetable and tap it.', rounds: 8, time: 12, round: hear },
      { id: 'sort', name: '生果定菜？', blurb: 'Fruit or vegetable?', rounds: 8, time: 0, round: sort },
      { id: 'measure', name: '一條 一粒', blurb: 'One of it: 一條香蕉, 一粒提子, 一棵菜心?', rounds: 8, time: 0, round: measure },
      { id: 'sign', name: '幾多錢一斤？', blurb: 'Read the sign and tell the customer the price.', rounds: 8, time: 0, round: sign },
      { id: 'weigh', name: '幾多斤？', blurb: 'Hear the order: how many catties?', rounds: 8, time: 0, round: weigh },
      { id: 'total', name: '一共幾多錢？', blurb: 'What does the order come to?', rounds: 8, time: 0, round: total },
      { id: 'build', name: 'Build it', blurb: '我要兩斤香蕉. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Market rush', blurb: 'Fruit and vegetables, against the clock.', rounds: 12, time: 15, round: rush },
    ],
  });
})();
