/* Unit 14 game: Doctor's Visit. Hear body parts, aches and symptoms, say whose with a measure word (shared/measures.js), answer the doctor's 有冇 and 咗未 questions from a patient's chart, follow a prescription, and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const { choose, answerText } = Game;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const said = e => zh(e.hanzi, e.jyutping);
  const pic = e => `<img src="${imgSrc(e)}" alt="${esc(e.english)}">`;

  // Hear something, tap its picture among others from the same pool.
  const hear = (pool, ask) => (stage, ctx) => {
    const [e] = pick(pool, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', ask, say),
      choose(ctx, e, shuffle([e, ...pick(pool.filter(o => o !== e), 3)]), pic, 'pic-grid pics'));
    return say();
  };
  const part = hear(V.body.filter(e => e.id !== 'body'), '邊度？ Which part do you hear?');
  const hurt = hear([...V.aches, ...V.symptoms], '邊度唔舒服？ What\'s wrong?');
  const rx = hear(V.rx, '醫生話… How should you take the medicine? Each box is one time a day.');

  // The patient's chart: a picture for each thing asked about, ticked (有,
  // done) or crossed (冇, not yet). The doctor asks about one of them; the
  // answer plays afterwards.
  const picOf = q => { const e = byId[q.about]; return e.pic ? byId[e.pic] : e; };
  const ask = kind => (stage, ctx) => {
    const shown = pick(V.asks.filter(q => q.answers[1] === kind), 3);
    const yes = new Map(shown.map(q => [q, Math.random() < 0.5]));
    const [q] = pick(shown, 1);
    const chart = $('div', 'chart');
    chart.setAttribute('aria-label', 'The patient\'s chart');
    for (const s of shown) {
      const item = $('div', 'chart-item', `${pic(picOf(s))}<span class="mark ${yes.get(s) ? 'yes' : 'no'}">${yes.get(s) ? '✓' : '✗'}</span>`);
      item.querySelector('img').alt += yes.get(s) ? ': yes' : ': no';
      chart.append(item);
    }
    const [y, n] = q.answers.map(id => byId[id]);
    const right = yes.get(q) ? y : n;
    const grid = choose(ctx, right, [y, n], said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(right); });
    ctx.answer = `${said(q)} ${esc(q.english)} The chart says ${said(right)}.${q.note ? ' ' + esc(q.note) : ''}`;
    const say = () => ctx.play(q);
    stage.replaceChildren(speech('醫', '醫生問… Answer for the patient, from the chart.', say), chart, grid);
    return say();
  };

  const mine = Measures.round({ pool: V.body.filter(e => e.measure), vocab: V, choices: 3, owner: byId.ngo });
  const build = Tiles.round({ pool: [...V.sentences, ...V.asks], vocab: V, decoys: ['zo', 'mou', 'mei', 'jau', 'hou', 'zek', 'go'], extra: 2 });
  const rush = (stage, ctx, n) => [part, hurt, rx][n % 3](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u14-doctor',
    intro: `<strong>How to play:</strong> a gold ring marks a body part, a red one where it hurts: ${zh('頭痛', 'tau4 tung3')}.
      The doctor asks ${zh('有冇', 'jau5 mou5')} (answer ${zh('有', 'jau5')} or ${zh('冇', 'mou5')}) and ${zh('食咗未', 'sik6 zo2 mei6')} (answer ${zh('食咗', 'sik6 zo2')} or ${zh('未', 'mei6')}): read the patient's chart.`,
    levels: [
      { id: 'part', name: '邊度？', blurb: 'Hear a body part and tap it.', rounds: 8, time: 12, round: part },
      { id: 'hurt', name: '頭痛', blurb: 'Hear what\'s wrong and tap it.', rounds: 8, time: 12, round: hurt },
      { id: 'mine', name: '我隻手', blurb: 'My hand, my head: the measure word says whose.', rounds: 8, time: 0, round: mine },
      { id: 'jau-mou', name: '有冇？', blurb: 'The doctor asks: answer 有 or 冇 from the chart.', rounds: 8, time: 0, round: ask('mou') },
      { id: 'zo-mei', name: '食咗未？', blurb: 'Done yet? Answer 食咗 or 未 from the chart.', rounds: 8, time: 0, round: ask('mei') },
      { id: 'rx', name: '一日三次', blurb: 'Hear how to take the medicine and tap it.', rounds: 8, time: 0, round: rx },
      { id: 'build', name: 'Build it', blurb: '我食咗藥. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Waiting room rush', blurb: 'Body parts, aches and medicine, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
