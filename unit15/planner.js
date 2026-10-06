/* Unit 15 game: Day Planner. Hear what someone does and when, put two things in the order they happen, read a day planner to say what they're doing now (緊) and what's done (咗) or not yet (未), answer 過 questions from a chart, and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, picButton, speech } = Canto;
  const { choose, answerText, chart, pic } = Game;
  const byId = Units.byId(V);
  const said = e => zh(e.hanzi, e.jyutping);
  const pad = n => String(n).padStart(2, '0');

  // Unit 9's clock for a time in minutes after midnight (12-hour clock).
  const clock = min => Units.word(9, `t${pad(Math.floor(min / 60) % 12 || 12)}${pad(min % 60)}`);
  const mins = a => a.at[0] * 60 + a.at[1];
  const form = (a, f) => V.forms.find(e => e.act === a.id && e.form === f);

  // A working day and a school day, in the order of their times.
  const DAYS = [
    ['hei-san', 'caat-tooth', 'sai-min', 'zoek-shirt', 'sik6-zou-caan', 'faan-gung', 'zou6-je', 'sai-hand', 'sik6-aan',
      'fong-gung', 'faan-home', 'zyu-rice', 'sik6-maan-faan', 'tai-din-si', 'cung-loeng', 'fan3-gaau'],
    ['hei-san', 'caat-tooth', 'sai-min', 'zoek-shirt', 'sik6-zou-caan', 'faan-hok', 'sai-hand', 'sik6-aan',
      'fong-hok', 'faan-home', 'tai-book', 'sik6-maan-faan', 'cung-loeng', 'fan3-gaau'],
  ].map(ids => ids.map(id => byId[id]).sort((x, y) => mins(x) - mins(y)));

  // Four things in a row from one of the days, each on until the next
  // starts, but for at most half an hour.
  function planner() {
    const [day] = pick(DAYS, 1);
    const i = Math.floor(Math.random() * (day.length - 3));
    return day.slice(i, i + 4).map((a, j, all) => {
      const next = all[j + 1] ? mins(all[j + 1]) : mins(a) + 30;
      return { a, start: mins(a), end: Math.min(next, mins(a) + 30), next };
    });
  }
  const plannerEl = plan => {
    const grid = $('div', 'planner');
    grid.setAttribute('aria-label', 'The day planner');
    for (const { a, start } of plan) grid.append($('div', 'plan-item', `${pic(clock(start), 'clock')}${pic(a)}`));
    return grid;
  };
  const nowEl = t => $('div', 'now', `${pic(clock(t))}<span>${zh('而家', byId['ji-gaa'].jyutping)} Now</span>`);

  // The state of one thing at time t: mei (not started), gan (on), zo
  // (the next has started), or null in between (neither clearly).
  const stateAt = (p, t) => t < p.start ? 'mei' : t < p.end ? 'gan' : t >= p.next ? 'zo' : null;
  // Times to ask about, every five minutes around the planner.
  const around = plan => {
    const ts = [];
    for (let t = plan[0].start - 15; t <= plan[3].end + 10; t += 5) ts.push(t);
    return ts;
  };

  // Hear a thing to do, tap its picture.
  const what = (stage, ctx) => {
    const [e] = pick(V.activities, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '做乜嘢？ What do they do?', say),
      choose(ctx, e, shuffle([e, ...pick(V.activities.filter(o => o !== e), 3)]), e => pic(e), 'pic-grid pics'));
    return say();
  };

  // Hear 我七點起身, tap the clock.
  const when = (stage, ctx) => {
    const [e] = pick(V.when, 1);
    const [h, m] = byId[e.act].at;
    const right = clock(h * 60 + m);
    const near = shuffle(Canto.nearTime(h % 12 || 12, m)).slice(0, 3).map(([nh, nm]) => clock(nh * 60 + nm));
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '幾點？ Which clock?', say),
      choose(ctx, right, shuffle([right, ...near]), t => pic(t), 'pic-grid pics'));
    return say();
  };

  // Hear 先…然後, …之後 or …之前; tap the two pictures in the order they
  // happen.
  const order = (stage, ctx) => {
    const [e] = pick(V.sequence, 1);
    const want = [byId[e.first], byId[e.then]];
    const options = shuffle([...want, ...pick(V.activities.filter(a => !want.includes(a)), 2)]);
    const tapped = [];
    const grid = $('div', 'pic-grid pics order');
    const buttons = options.map(a => {
      const b = picButton(a);
      b.addEventListener('click', () => {
        if (tapped.includes(a) || tapped.length === 2) return;
        tapped.push(a);
        b.classList.add('picked');
        b.append($('span', 'order-num', String(tapped.length)));
        if (tapped.length < 2) return;
        buttons.forEach(o => { o.disabled = true; });
        ctx.done(tapped[0] === want[0] && tapped[1] === want[1]);
      });
      return b;
    });
    grid.append(...buttons);
    ctx.reveal = () => buttons.forEach((b, i) => {
      const at = want.indexOf(options[i]);
      if (at < 0) return;
      b.classList.add('right');
      if (!b.querySelector('.order-num')) b.append($('span', 'order-num', String(at + 1)));
    });
    ctx.answer = `${answerText(e)} First ${said(want[0])}, then ${said(want[1])}.`;
    const say = () => ctx.play(e);
    stage.replaceChildren(speech('聽', 'Tap the two things in the order they happen.', say), grid);
    return say();
  };

  // The planner and the time now: 佢而家做緊乜嘢呀？
  const ask = byId['keoi-ji-gaa-zou6-gan-mat-je-aa'];
  const now = (stage, ctx) => {
    const plan = planner();
    const on = plan.filter(p => p.a.ing);
    const [target] = pick(on, 1);
    const [t] = pick(around(plan).filter(t => stateAt(target, t) === 'gan'), 1);
    const right = form(target.a, 'gan');
    const grid = choose(ctx, right, shuffle(on.map(p => form(p.a, 'gan'))), said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(right); });
    ctx.answer = `${said(right)} ${esc(right.english)}`;
    const say = () => ctx.play([clock(t), ask]);
    stage.replaceChildren(speech('問', `${said(ask)} Read the planner.`, say), nowEl(t), plannerEl(plan), grid);
    return say();
  };

  // The planner, the time now, and 佢食咗早餐未呀？: answer 食咗早餐 (done),
  // 食緊早餐 (now) or 未食早餐 (not yet).
  const done = (stage, ctx) => {
    const plan = planner();
    const [target] = pick(plan.filter(p => p.a.ing), 1);
    const ts = around(plan);
    const [state] = pick(['zo', 'gan', 'mei'].filter(s => ts.some(t => stateAt(target, t) === s)), 1);
    const [t] = pick(ts.filter(t => stateAt(target, t) === state), 1);
    const q = V.asks.find(e => e.act === target.a.id);
    const right = form(target.a, state);
    const grid = choose(ctx, right, ['zo', 'gan', 'mei'].map(f => form(target.a, f)), said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(right); });
    ctx.answer = `${said(q)} ${esc(q.english)} ${said(right)}: ${esc(right.english)}.`;
    const say = () => ctx.play([clock(t), q]);
    stage.replaceChildren(speech('問', `${said(q)} Read the planner.`, say), nowEl(t), plannerEl(plan), grid);
    return say();
  };

  // A chart of things tried (✓) or not (✗); answer the 過 question for one.
  const ever = (stage, ctx) => {
    const items = pick([...new Set(V.everAsks.map(q => q.item))], 3);
    const yes = new Map(items.map(i => [i, Math.random() < 0.5]));
    const [item] = pick(items, 1);
    const [q] = pick(V.everAsks.filter(e => e.item === item), 1);
    const [y, n] = q.answers.map(id => byId[id]);
    const right = yes.get(item) ? y : n;
    const grid = choose(ctx, right, [y, n], said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(right); });
    ctx.answer = `${said(q)} ${esc(q.english)} The chart says ${said(right)}.${q.note ? ' ' + esc(q.note) : ''}`;
    const say = () => ctx.play(q);
    stage.replaceChildren(speech('問', `${said(q)} Answer from the chart.`, say),
      chart(items.map(i => [byId[i], yes.get(i)]), 'What they have tried'), grid);
    return say();
  };

  const build = Tiles.round({ pool: [...V.sentences, ...V.sequence], vocab: V, decoys: ['gan', 'zo', 'gwo', 'mei', 'mou', 'sin', 'jin-hau'], extra: 2 });
  const rush = (stage, ctx, n) => [what, when][n % 2](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u15-planner',
    intro: `<strong>How to play:</strong> the planner shows a clock over each thing someone does, in order.
      Each goes on until the next starts, for at most half an hour. At the time ${zh('而家', byId['ji-gaa'].jyutping)} (now),
      what are they doing (${zh('緊', 'gan2')}), what's done (${zh('咗', 'zo2')}) and what's not yet (${zh('未', 'mei6')})?`,
    levels: [
      { id: 'what', name: '做乜嘢？', blurb: 'Hear what someone does and tap it.', rounds: 8, time: 12, round: what },
      { id: 'when', name: '七點起身', blurb: 'Hear when they do it and tap the clock.', rounds: 8, time: 15, round: when },
      { id: 'order', name: '先…然後', blurb: 'Tap the two things in the order they happen.', rounds: 8, time: 0, round: order },
      { id: 'now', name: '做緊乜嘢？', blurb: 'What are they doing now? Read the planner.', rounds: 8, time: 0, round: now },
      { id: 'zo-gan-mei', name: '咗 緊 未', blurb: 'Done, doing it now, or not yet?', rounds: 8, time: 0, round: done },
      { id: 'ever', name: '去過未？', blurb: 'Answer 過 questions from the chart: 去過, 冇去過 or 未去過.', rounds: 8, time: 0, round: ever },
      { id: 'build', name: 'Build it', blurb: '我食緊早餐. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Busy day rush', blurb: 'What and when, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
