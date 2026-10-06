/* Unit 6 game: Market Stall. Hear prices and say them, pay the right amount with coins and notes, say 好平 or 好貴, and build shopping sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, confusable, imgSrc, picButton, speech } = Canto;
  const byId = Units.byId(V);
  const prices = [...V.cash, ...V.prices].sort((a, b) => a.n - b.n);
  const byN = new Map(prices.map(p => [p.n, p]));
  const dimes = n => Math.round(n * 10);
  const dollars = d => byN.get(d / 10)?.english ?? `$${(d / 10).toFixed(d % 10 ? 2 : 0)}`;
  const one = t => byId[`one-${t.id}`];
  const { choose, answerText } = Game;

  // A thing on the stall, with a price tag if `tag` is given.
  function stall(t, tag) {
    const box = $('div', 'stall');
    const img = $('img', 'prompt-pic');
    img.src = imgSrc(t);
    img.alt = t.english;
    box.append(img);
    if (tag) box.append($('span', 'price-tag', esc(tag.english)));
    return box;
  }

  // Hear a price, tap it.
  const hear = pool => (stage, ctx) => {
    const e = ctx.draw(pool);
    const say = () => ctx.play(e);
    const grid = choose(ctx, e, shuffle([e, ...confusable(e, pool, 3)]), o => esc(o.english), 'choice-grid nums');
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '幾多錢？ How much do you hear?', say), grid);
    return say();
  };

  // See a price tag, pick how to say it; the answer plays afterwards.
  function read(stage, ctx) {
    const e = ctx.draw(prices);
    const grid = choose(ctx, e, shuffle([e, ...confusable(e, prices, 3)]), o => zh(o.hanzi, o.jyutping));
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(e); });
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('你', 'How do you say this price?'), $('p', 'prompt-num', esc(e.english)), grid);
  }

  // Hear what a thing costs and pay exactly that: tap coins and notes onto
  // the counter (tap one there to take it back), then Pay.
  function pay(stage, ctx) {
    const t = ctx.draw(V.things);
    const price = byN.get(t.price);
    const say = () => ctx.play([one(t), price]);
    const till = $('div', 'till');
    till.dataset.empty = 'Tap money to put it here';
    const total = $('p', 'till-total');
    const payBtn = $('button', 'btn primary', 'Pay');
    payBtn.type = 'button';
    let sum = 0;
    const update = () => {
      total.textContent = sum ? `You're paying ${dollars(sum)}` : '';
      payBtn.disabled = !sum;
    };

    const purse = $('div', 'pic-grid cols-4 purse');
    V.cash.forEach(c => {
      const b = picButton(c);
      b.addEventListener('click', () => {
        const coin = picButton(c);
        coin.addEventListener('click', () => { coin.remove(); sum -= dimes(c.n); update(); });
        till.append(coin);
        sum += dimes(c.n);
        update();
      });
      purse.append(b);
    });
    payBtn.addEventListener('click', () => {
      const right = sum === dimes(t.price);
      till.classList.add(right ? 'right' : 'wrong');
      ctx.done(right);
    });
    update();

    ctx.answer = `${zh(one(t).hanzi, one(t).jyutping)}, ${zh(price.hanzi, price.jyutping)}: ${esc(price.english)}.`;
    ctx.reveal = () => {
      payBtn.disabled = true;
      if (sum !== dimes(t.price)) total.textContent = `You paid ${dollars(sum)}; it costs ${price.english}.`;
    };
    stage.replaceChildren(speech('賣', `Listen to the price of ${zh(one(t).hanzi, one(t).jyutping)}, then pay exactly.`, say),
      stall(t), till, total, payBtn, purse);
    return say();
  }

  // A thing at a silly price: say 好平 or 好貴. The price is at most an
  // eighth of what it usually costs, or at least eight times it.
  function cheapOrDear(stage, ctx) {
    const t = ctx.draw(V.things);
    const cheap = prices.filter(p => p.n <= t.price / 8), dear = prices.filter(p => p.n >= t.price * 8);
    const isCheap = !dear.length || (cheap.length && Math.random() < 0.5);
    const [price] = pick(isCheap ? cheap : dear, 1);
    const right = byId[isCheap ? 'hou-peng' : 'hou-gwai'];
    const say = () => ctx.play([one(t), price]);
    const grid = choose(ctx, right, [byId['hou-peng'], byId['hou-gwai']], o => zh(o.hanzi, o.jyutping));
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(right); });
    ctx.answer = `${zh(price.hanzi, price.jyutping)} for ${esc(one(t).english)}? ${zh(right.hanzi, right.jyutping)}! A ${esc(t.english)} usually costs about ${esc(dollars(dimes(t.price)))}.`;
    stage.replaceChildren(speech('賣', `${zh(one(t).hanzi, one(t).jyutping)}, ${zh(price.hanzi, price.jyutping)}!`, say),
      stall(t, price), grid);
    return say();
  }

  const build = Tiles.round({ pool: V.sentences, vocab: V, decoys: ['maai6', 'peng', 'gwai', 'go', 'ni', 'go2', 'cin2', 'jiu'], extra: 2 });
  const hearAll = hear(prices);
  const rush = (stage, ctx, n) => [hearAll, read, cheapOrDear][n % 3](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u6-market',
    intro: `<strong>How to play:</strong> prices are a number and ${zh('蚊', 'man1')}, dollars:
      ${zh('五蚊', 'ng5 man1')} is $5 and ${zh('三蚊半', 'saam1 man1 bun3')} is $3.50. Under a dollar, count ${zh('毫', 'hou4')}:
      ${zh('五毫', 'ng5 hou4')} is 50 cents. Round prices drop their last unit: ${zh('百五蚊', 'baak3 ng5 man1')} is $150.`,
    levels: [
      { id: 'hear', name: '幾多錢？', blurb: 'Hear a price and tap it.', rounds: 8, time: 12, round: hearAll },
      { id: 'say', name: 'Say the price', blurb: 'See a price tag and pick how to say it.', rounds: 8, time: 0, round: read },
      { id: 'pay', name: 'Pay up', blurb: 'Hear what it costs and pay exactly, in coins and notes.', rounds: 6, time: 0, round: pay },
      { id: 'cheap', name: '好平 or 好貴?', blurb: 'A watermelon for five dollars? Say cheap or expensive.', rounds: 8, time: 0, round: cheapOrDear },
      { id: 'build', name: 'Shop talk', blurb: '呢個幾多錢呀？ 我要呢個 from word tiles.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Market rush', blurb: 'Prices and bargains, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
