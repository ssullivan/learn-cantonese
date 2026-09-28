/* Unit 9 game: Clock. Hear a time and find its clock, set the clock, say the time, and work out days and dates; then put time words before the verb (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const { choose, answerText } = Game;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const pad = n => String(n).padStart(2, '0');
  const timeAt = (h, m) => byId[`t${pad(h)}${pad(m)}`];
  const said = e => zh(e.hanzi, e.jyutping);

  // `count` times from `pool` to offer besides e: those easy to mix up
  // with it first (Canto.nearTime), then any others.
  function others(e, pool, count) {
    const inPool = new Set(pool);
    const near = shuffle(Canto.nearTime(e.h, e.m).map(([h, m]) => timeAt(h, m)).filter(t => inPool.has(t)));
    const rest = shuffle(pool.filter(t => t !== e && !near.includes(t)));
    return [...near, ...rest].slice(0, count);
  }

  const clockPic = t => `<img src="${imgSrc(t)}" alt="${esc(t.english)}">`;

  // Hear a time, tap its clock.
  const hear = pool => (stage, ctx) => {
    const [e] = pick(pool, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '幾點？ Which clock shows it?', say),
      choose(ctx, e, shuffle([e, ...others(e, pool, 3)]), clockPic, 'pic-grid pics'));
    return say();
  };

  // See a clock, pick how to say the time; the answer plays afterwards.
  const read = pool => (stage, ctx) => {
    const [e] = pick(pool, 1);
    const img = $('img', 'prompt-pic');
    img.src = imgSrc(e);
    img.alt = 'A clock';
    const grid = choose(ctx, e, shuffle([e, ...others(e, pool, 3)]), said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(e); });
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('你', '而家幾點呀？ How do you say this time?'), img, grid);
  };

  // Hear a time and set the clock to it: hour and five-minute steppers.
  function set(stage, ctx) {
    const [e] = pick(V.times.filter(t => t.h !== 12 || t.m), 1);
    let h = 12, m = 0;
    const img = $('img', 'prompt-pic');
    img.alt = 'The clock you are setting';
    const show = () => { img.src = imgSrc(timeAt(h, m)); };
    const btn = (label, aria, step) => {
      const b = $('button', 'btn', label);
      b.type = 'button';
      b.setAttribute('aria-label', aria);
      b.addEventListener('click', () => { step(); show(); });
      return b;
    };
    const turn = mins => {
      const t = (((h % 12) * 60 + m + mins) % 720 + 720) % 720;
      h = Math.floor(t / 60) || 12;
      m = t % 60;
    };
    const stepper = (name, back, fwd) => {
      const row = $('div', 'stepper');
      row.append(btn('◀', `${name} back`, back), $('span', null, name), btn('▶', `${name} on`, fwd));
      return row;
    };
    const check = $('button', 'btn primary', 'Check');
    check.type = 'button';
    check.addEventListener('click', () => {
      const right = h === e.h && m === e.m;
      img.classList.add(right ? 'right' : 'wrong');
      ctx.done(right);
    });
    ctx.answer = answerText(e);
    ctx.reveal = () => {
      check.disabled = true;
      stage.querySelectorAll('.stepper .btn').forEach(b => { b.disabled = true; });
    };
    show();
    const say = () => ctx.play(e);
    stage.replaceChildren(speech('聽', 'Set the clock to the time you hear.', say), img,
      stepper('Hour', () => turn(-60), () => turn(60)), stepper('Minutes', () => turn(-5), () => turn(5)), check);
    return say();
  }

  // Hear a day of the week, pick it.
  function hearDay(stage, ctx) {
    const [e] = pick(V.weekdays, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '星期幾？ Which day do you hear?', say),
      choose(ctx, e, shuffle([e, ...pick(V.weekdays.filter(d => d !== e), 3)]), o => esc(o.english)));
    return say();
  }

  // 今日星期三。聽日係星期幾呀？ Count on or back from today.
  const REL = [[-2, 'cin-jat'], [-1, 'kam-jat'], [1, 'ting-jat'], [2, 'hau-jat']];
  const weekday = n => V.weekdays[((n - 1) % 7 + 7) % 7];
  function relative(stage, ctx) {
    const [today] = pick(V.weekdays, 1);
    const [[k, id]] = pick(REL, 1);
    const rel = byId[id], answer = weekday(today.n + k);
    const wrong = [...new Set([weekday(today.n - k), today, weekday(today.n + k + 1), weekday(today.n + k - 1)])]
      .filter(d => d !== answer).slice(0, 3);
    const say = () => ctx.play([byId['gam-jat'], today, rel, byId.hai, byId['sing-kei-gei']]);
    const grid = choose(ctx, answer, shuffle([answer, ...wrong]), said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play([rel, byId.hai, answer]); });
    ctx.answer = `${said(rel)} (${esc(rel.english)}) is ${said(answer)}, ${esc(answer.english)}.`;
    stage.replaceChildren(speech('你', `${said(byId['gam-jat'])}${said(today)}。 <strong>${said(rel)}</strong>係星期幾呀？`, say), grid);
    return say();
  }

  // Hear a date (month, then day), pick it. Wrong answers swap the month
  // and day, or are a day or a month out.
  const date = (m, d) => ({ id: `${m}-${d}`, month: V.months[m - 1], day: V.dates[d - 1], english: `${V.months[m - 1].english} ${d}` });
  function hearDate(stage, ctx) {
    const m = 1 + Math.floor(Math.random() * 12), d = 1 + Math.floor(Math.random() * 28);
    const e = date(m, d);
    const near = [[d, m], [m, d + 1], [m, d - 1], [m % 12 + 1, d], [m, d + 10], [m, d - 10]]
      .filter(([a, b]) => a >= 1 && a <= 12 && b >= 1 && b <= 28 && !(a === m && b === d));
    const wrong = shuffle(near).slice(0, 3).map(([a, b]) => date(a, b));
    const say = () => ctx.play([e.month, e.day]);
    ctx.answer = `${zh(e.month.hanzi + e.day.hanzi, `${e.month.jyutping} ${e.day.jyutping}`)} is ${esc(e.english)}: month first, then day.`;
    stage.replaceChildren(speech('聽', '幾月幾號？ Which date do you hear?', say),
      choose(ctx, e, shuffle([e, ...wrong]), o => esc(o.english)));
    return say();
  }

  const onHour = V.times.filter(t => t.m === 0 || t.m === 30);
  const hearHour = hear(onHour), hearAll = hear(V.times), readAll = read(V.times);
  const days = (stage, ctx, n) => [hearDay, relative, hearDate][n % 3](stage, ctx, n);
  const build = Tiles.round({ pool: V.sentences, vocab: V, decoys: ['kam-jat', 'ting-jat', 'gam-jat', 'gei', 'hai', 'dim', 'sing-kei'], extra: 2 });
  const rush = (stage, ctx, n) => [hearAll, readAll, hearDay, relative][n % 4](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u9-clock',
    intro: `<strong>How to play:</strong> the hour is a number and ${zh('點', 'dim2')}: ${zh('三點鐘', 'saam1 dim2 zung1')} is 3:00
      and ${zh('三點半', 'saam1 dim2 bun3')} is 3:30. Minutes are counted in ${zh('字', 'zi6')}, the numerals on the clock face, five minutes each:
      ${zh('三點兩個字', 'saam1 dim2 loeng5 go3 zi6')} is 3:10.`,
    levels: [
      { id: 'hour', name: '幾點鐘？', blurb: 'On the hour or half past: hear it, tap the clock.', rounds: 8, time: 12, round: hearHour },
      { id: 'zi', name: '個字', blurb: 'Any time, in fives. Is it 三點四個字 or 四點三個字?', rounds: 8, time: 12, round: hearAll },
      { id: 'set', name: 'Set the clock', blurb: 'Hear a time and turn the hands to it.', rounds: 6, time: 0, round: set },
      { id: 'say', name: 'Say the time', blurb: 'See a clock and pick how to say it.', rounds: 8, time: 0, round: readAll },
      { id: 'days', name: '星期幾？', blurb: 'Days of the week, 琴日 and 聽日, and dates.', rounds: 9, time: 0, round: days },
      { id: 'build', name: 'Time first', blurb: 'The time goes before the verb: 我九點鐘返工.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Clock rush', blurb: 'Times and days, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
