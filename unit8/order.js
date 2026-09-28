/* Unit 8 game: Order Up. Hear drinks and dishes, hot or iced, and fill in the order ticket a customer calls (凍檸茶少甜); order food with its measure word (shared/measures.js), answer the waiter, and build orders (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, picButton, speech } = Canto;
  const { choose, answerText } = Game;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const said = e => zh(e.hanzi, e.jyutping);
  const pic = e => `<img src="${imgSrc(e)}" alt="${esc(e.english)}">`;

  // Hear a drink or a dish, tap its picture.
  const menu = [...V.drinks, ...V.food];
  function hear(stage, ctx) {
    const [e] = pick(menu, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('客', '唔該！ What did the customer ask for?', say),
      choose(ctx, e, shuffle([e, ...pick(menu.filter(o => o !== e), 3)]), pic, 'pic-grid pics'));
    return say();
  }

  // Hear 凍奶茶, tap the glass: the same drink the other way round is offered,
  // and another drink both ways.
  function hotCold(stage, ctx) {
    const [e] = pick(V.served, 1);
    const [other] = pick(V.drinks.filter(d => d.id !== e.drink), 1);
    const options = V.served.filter(s => s.drink === e.drink || s.drink === other.id);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('客', '凍定熱？ Which one did they order?', say),
      choose(ctx, e, shuffle(options), pic, 'pic-grid pics'));
    return say();
  }

  // The order ticket: hear an order, then pick the drink, hot or iced, the
  // sweetness and (iced only) the ice, and Check.
  const pool = [...V.served, ...V.orders];
  function ticket(stage, ctx) {
    const [e] = pick(pool, 1);
    const want = { drink: e.drink, temp: e.temp, sweet: e.sweet ?? '', ice: e.ice ?? '' };
    const got = { drink: null, temp: null, sweet: '', ice: '' };
    const rows = {};

    function row(key, label, options, button) {
      const box = $('div', 'ticket-row');
      const opts = $('div', 'ticket-opts');
      for (const [value, entry] of options) {
        const b = button(value, entry);
        b.dataset.value = value;
        b.classList.toggle('picked', got[key] === value);
        b.addEventListener('click', () => {
          got[key] = value;
          opts.querySelectorAll('button').forEach(o => o.classList.toggle('picked', o === b));
          if (key === 'temp') {
            rows.ice.hidden = value !== 'dung';
            if (value !== 'dung') pickValue('ice', '');
          }
          check.disabled = !got.drink || !got.temp;
        });
        opts.append(b);
      }
      box.append($('p', 'ticket-label', label), opts);
      rows[key] = box;
      return box;
    }
    function pickValue(key, value) {
      got[key] = value;
      rows[key].querySelectorAll('button').forEach(o => o.classList.toggle('picked', o.dataset.value === value));
    }
    const text = (value, entry) => {
      const b = $('button', 'choice', entry ? said(entry) : 'normal');
      b.type = 'button';
      return b;
    };
    const mod = (kind, word) => [[''], ...['siu', ...(kind === 'ice' ? ['do'] : []), 'zau'].map(m => [m, byId[`${m}-${word}`]])];

    const pad = $('div', 'ticket');
    pad.append(
      row('drink', `${zh('飲品', 'jam2 ban2')} · drink`, V.drinks.map(d => [d.id, d]), (value, d) => picButton(d)),
      row('temp', `${zh('熱', 'jit6')} / ${zh('凍', 'dung3')}`, [['jit', byId.jit], ['dung', byId.dung]], text),
      row('sweet', `${zh('甜', 'tim4')} · sugar`, mod('sweet', 'sweet'), text),
      row('ice', `${zh('冰', 'bing1')} · ice`, mod('ice', 'bing'), text),
    );
    rows.ice.hidden = true;

    const check = $('button', 'btn primary', 'Check');
    check.type = 'button';
    check.disabled = true;
    check.addEventListener('click', () => {
      let right = true;
      for (const key of Object.keys(want)) {
        if (got[key] === want[key]) continue;
        right = false;
        rows[key].querySelector('.picked')?.classList.add('wrong');
      }
      ctx.play(e);
      ctx.done(right);
    });

    ctx.answer = answerText(e);
    ctx.reveal = () => {
      check.disabled = true;
      rows.ice.hidden = want.temp !== 'dung';
      for (const key of Object.keys(want)) rows[key].querySelector(`[data-value="${want[key]}"]`)?.classList.add('right');
    };
    const say = () => ctx.play(e);
    stage.replaceChildren(speech('客', 'Order up! Fill in the ticket.', say), pad, check);
    return say();
  }

  // The waiter asks; pick a good answer. Wrong answers answer the other
  // questions, but a drink is never wrong for 凍定熱 (凍奶茶 answers it),
  // nor 凍 for 飲乜嘢.
  const hotOrCold = e => Boolean(e.temp) || e.id === 'dung' || e.id === 'jit';
  function waiter(stage, ctx) {
    const [q] = pick(V.questions, 1);
    const replies = q.reply.map(id => byId[id]);
    const [e] = pick(replies, 1);
    const clash = replies.some(hotOrCold) ? hotOrCold : () => false;
    const wrong = pick(V.questions.filter(o => o !== q).flatMap(o => o.reply.map(id => byId[id])).filter(o => !clash(o)), 3);
    const grid = choose(ctx, e, shuffle([e, ...wrong]), said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(e); });
    ctx.answer = `${said(q)} (${esc(q.english)}) One good answer: ${said(e)}, ${esc(e.english)}.`;
    const say = () => ctx.play(q);
    stage.replaceChildren(speech('伙', `${said(q)}<br>What do you answer?`, say), grid);
    return say();
  }

  const measure = Measures.round({ pool: menu, vocab: V, choices: 3 });
  const build = Tiles.round({ pool: [...V.sentences, ...V.questions], vocab: V, decoys: ['dung', 'jit', 'zau', 'siu', 'do', 'bui', 'ding'], extra: 2 });
  const rush = (stage, ctx, n) => [hear, hotCold, ticket][n % 3](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u8-order',
    intro: `<strong>How to play:</strong> an order goes hot or iced, then the drink, then what to change:
      ${zh('凍檸茶少甜', 'dung3 ning2 caa4 siu2 tim4')} is iced lemon tea, less sweet.
      ${zh('走', 'zau2')} leaves something out, ${zh('少', 'siu2')} is less and ${zh('多', 'do1')} is more.`,
    levels: [
      { id: 'hear', name: '飲乜嘢？', blurb: 'Hear a drink or a dish and tap it.', rounds: 8, time: 12, round: hear },
      { id: 'temp', name: '凍定熱？', blurb: 'Iced or hot? Tap the glass or the cup.', rounds: 8, time: 12, round: hotCold },
      { id: 'ticket', name: 'Order up', blurb: '凍奶茶走甜: fill in the order ticket.', rounds: 8, time: 0, round: ticket },
      { id: 'measure', name: '一碗定一份？', blurb: 'Order food with the right measure word.', rounds: 8, time: 0, round: measure },
      { id: 'waiter', name: '伙記問', blurb: 'Eat in or take away? Answer the waiter.', rounds: 8, time: 0, round: waiter },
      { id: 'build', name: 'Build it', blurb: '我要一杯凍奶茶. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Lunch rush', blurb: 'Drinks, dishes and tickets, against the clock.', rounds: 12, time: 15, round: rush },
    ],
  });
})();
