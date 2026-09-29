/* Unit 13 game: Forecast. Hear the weather and the temperature, tell 好熱 from 太熱, give advice with 啦, find the day in a forecast, and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, confusable, imgSrc, speech } = Canto;
  const { choose, answerText } = Game;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const said = e => zh(e.hanzi, e.jyutping);
  const pic = e => `<img src="${imgSrc(e)}" alt="${esc(e.english)}">`;

  // Everything with a weather picture: 落雨 and the rest, 好熱 and 好凍.
  const skies = [...V.weather, ...V.degrees.filter(e => e.img !== false)];

  // Hear the weather, tap its picture.
  function sky(stage, ctx) {
    const [e] = pick(skies, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '乜嘢天氣？ What\'s the weather?', say),
      choose(ctx, e, shuffle([e, ...pick(skies.filter(o => o !== e), 3)]), pic, 'pic-grid pics'));
    return say();
  }

  // Hear 廿三度, tap 23°C among numbers easy to mix up with it (32, 13...).
  function temp(stage, ctx) {
    const [e] = pick(V.temps, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '幾多度？ How many degrees?', say),
      choose(ctx, e, shuffle([e, ...confusable(e, V.temps, 3)]), o => esc(o.english), 'choice-grid nums'));
    return say();
  }

  // Hear 有啲凍, pick "a bit cold": the other answers put other words
  // before the same adjective, or the same word before another.
  function degree(stage, ctx) {
    const [e] = pick(V.degrees, 1);
    const wrong = [
      ...pick(V.degrees.filter(o => o.adj === e.adj && o !== e), 2),
      ...pick(V.degrees.filter(o => o.degree === e.degree && o !== e), 1),
    ];
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', 'How hot or cold is it?', say),
      choose(ctx, e, shuffle([e, ...wrong]), o => esc(o.english)));
    return say();
  }

  // See the weather, pick the advice for it. Advice that suits it too is
  // never offered as a wrong answer. The right one plays afterwards.
  function advise(stage, ctx) {
    const [e] = pick(V.advice, 1);
    const weather = byId[e.for[0]];
    const img = $('img', 'prompt-pic');
    img.src = imgSrc(weather);
    img.alt = weather.english;
    const grid = choose(ctx, e, shuffle([e, ...pick(V.advice.filter(o => !o.for.includes(weather.id)), 2)]), said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(e); });
    ctx.answer = `${said(weather)} (${esc(weather.english)}): ${said(e)} ${esc(e.english)}${e.note ? ' ' + esc(e.note) : ''}`;
    const say = () => ctx.play(weather);
    stage.replaceChildren(speech('你', 'What do you tell a friend going out?', say), img, grid);
    return say();
  }

  // A forecast for four days in a row: two kinds of weather and two
  // temperatures, each weather with each temperature once, so only
  // hearing both finds the day. Typhoons come in summer, so not below 24°.
  const FORECAST = ['tin-cing', 'jam-tin', 'lok-jyu', 'daai-fung', 'haang-leoi', 'daa-fung'].map(id => byId[id]);
  function forecast(stage, ctx) {
    const [w1, w2] = pick(FORECAST, 2);
    const temps = V.temps.filter(t => t.n >= ([w1, w2].some(w => w.id === 'daa-fung') ? 24 : 12));
    const [t1] = pick(temps, 1);
    const [t2] = confusable(t1, temps, 1);
    const from = Math.floor(Math.random() * (V.weekdays.length - 3));
    const days = shuffle([[w1, t1], [w1, t2], [w2, t1], [w2, t2]])
      .map(([w, t], i) => ({ ...V.weekdays[from + i], w, t }));
    const [e] = pick(days, 1);
    const say = () => ctx.play([e.w, e.t]);
    ctx.answer = `${said(e)} (${esc(e.english)}): ${said(e.w)} ${esc(e.w.english)}, ${said(e.t)}.`;
    stage.replaceChildren(speech('報', '天文台話… Which day is the forecast for?', say),
      choose(ctx, e, days, d => `${said(d)}${pic(d.w)}<span class="temp">${d.t.n}°</span>`, 'choice-grid forecast'));
    return say();
  }

  const build = Tiles.round({ pool: [...V.sentences, ...V.advice], vocab: V, decoys: ['hou', 'gei', 'taai', 'wui', 'laa1', 'laa3', 'hai'], extra: 2 });
  const rush = (stage, ctx, n) => [sky, temp, degree][n % 3](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u13-forecast',
    intro: `<strong>How to play:</strong> ${zh('好', 'hou2')}, ${zh('幾', 'gei2')} and ${zh('太', 'taai3')} go before an adjective:
      ${zh('好熱', 'hou2 jit6')} very hot, ${zh('幾熱', 'gei2 jit6')} quite hot, ${zh('太熱', 'taai3 jit6')} too hot.
      ${zh('啦', 'laa1')} at the end makes advice friendly: ${zh('帶遮啦', 'daai3 ze1 laa1')}！`,
    levels: [
      { id: 'sky', name: '乜嘢天氣？', blurb: 'Hear the weather and tap it.', rounds: 8, time: 12, round: sky },
      { id: 'temp', name: '幾多度？', blurb: 'Hear a temperature and tap it.', rounds: 8, time: 12, round: temp },
      { id: 'degree', name: '好熱定太熱？', blurb: 'Very, quite, too, a bit or not very?', rounds: 8, time: 15, round: degree },
      { id: 'advice', name: '帶遮啦！', blurb: 'See the weather and give advice with 啦.', rounds: 8, time: 0, round: advise },
      { id: 'forecast', name: '天氣預報', blurb: 'Hear the forecast and find the day.', rounds: 8, time: 0, round: forecast },
      { id: 'build', name: 'Build it', blurb: '聽日會落雨. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Weather rush', blurb: 'Weather, temperatures and 好 / 幾 / 太, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
