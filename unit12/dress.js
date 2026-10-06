/* Unit 12 game: Dress Up. Hear colours and coloured clothes, choose 著 or 戴, count clothes with their measure words (shared/measures.js), dress a figure in the outfit you hear, and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const { choose, answerText, pic } = Game;
  const byId = Units.byId(V);
  const said = e => zh(e.hanzi, e.jyutping);

  // Hear a colour, tap its swatch.
  function colour(stage, ctx) {
    const [e] = pick(V.colours, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '乜嘢顏色？ Which colour do you hear?', say),
      choose(ctx, e, shuffle([e, ...pick(V.colours.filter(o => o !== e), 3)]), pic, 'pic-grid pics'));
    return say();
  }

  // Wrong answers for a coloured garment: the same garment in other
  // colours, and other clothes in the same colour.
  const others = (e, count) => [
    ...shuffle(V.coloured.filter(o => o.garment === e.garment && o !== e)).slice(0, Math.ceil(count / 2)),
    ...shuffle(V.coloured.filter(o => o.colour === e.colour && o !== e)),
  ].slice(0, count);

  // Hear 紅色嘅衫, tap it.
  function garment(stage, ctx) {
    const [e] = pick(V.coloured, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', 'Which one do you hear?', say),
      choose(ctx, e, shuffle([e, ...others(e, 3)]), pic, 'pic-grid pics'));
    return say();
  }

  // See a garment: 我著… or 我戴…? The right one plays afterwards.
  function wear(stage, ctx) {
    const [e] = pick(V.wear, 1);
    const thing = byId[e.thing];
    const [right, wrong] = e.words[1] === 'zoek' ? ['zoek', 'daai'] : ['daai', 'zoek'];
    const other = { id: 'other', hanzi: `我${byId[wrong].hanzi}${thing.hanzi}`, jyutping: `ngo5 ${byId[wrong].jyutping} ${thing.jyutping}` };
    const img = $('img', 'prompt-pic');
    img.src = imgSrc(thing);
    img.alt = thing.english;
    const grid = choose(ctx, e, shuffle([e, other]), said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(e); });
    ctx.answer = `${said(e)}: ${esc(e.english)} ${said(byId[right])} is for ${right === 'zoek' ? 'clothes and shoes' : 'hats and glasses'}.`;
    stage.replaceChildren(speech('你', '著定戴？ How do you say you wear it?'), img, grid);
  }

  // The figure, with clothes put on it. A garment's picture is drawn fit.s
  // times bigger, centred on fit.cx, fit.cy (art.mjs), so it goes back at
  // 1 / s of the figure's size, shifted to match.
  const LAYER = ['feet', 'bottom', 'top', 'head'];
  function figure() {
    const box = $('div', 'figure');
    const base = $('img');
    base.src = imgSrc(byId['daa-baan']);
    base.alt = 'A person getting dressed';
    box.append(base);
    const worn = {};
    return {
      box, worn,
      put(e) {
        worn[e.slot]?.img.remove();
        const img = $('img', 'layer');
        img.src = imgSrc(e);
        img.alt = e.english;
        const { cx, cy, s } = e.fit;
        Object.assign(img.style, { width: `${100 / s}%`, left: `${100 * (cx / 128 - 0.5 / s)}%`, top: `${100 * (cy / 128 - 0.5 / s)}%`, zIndex: LAYER.indexOf(e.slot) + 1 });
        box.append(img);
        worn[e.slot] = { e, img };
      },
    };
  }

  // Hear an outfit (a top, a bottom, and a hat or shoes) and dress the
  // figure from the rack. Tapping another in the same place swaps it.
  function dress(stage, ctx) {
    const slots = ['top', 'bottom', pick(['head', 'feet'], 1)[0]];
    const want = slots.map(slot => pick(V.coloured.filter(e => e.slot === slot), 1)[0]);
    const rack = shuffle([...new Set(want.flatMap(e => [e, ...others(e, 2)]))]);
    const fig = figure();
    const grid = $('div', 'pic-grid cols-3 rack');
    const check = $('button', 'btn primary', 'Check');
    check.type = 'button';
    check.disabled = true;
    for (const e of rack) {
      const b = $('button', 'pic-btn', pic(e));
      b.type = 'button';
      b.dataset.id = e.id;
      b.addEventListener('click', () => {
        grid.querySelectorAll('.pic-btn').forEach(o => { if (byId[o.dataset.id].slot === e.slot) o.classList.remove('picked'); });
        b.classList.add('picked');
        fig.put(e);
        check.disabled = !slots.every(s => fig.worn[s]);
      });
      grid.append(b);
    }
    check.addEventListener('click', () => {
      const right = want.every(e => fig.worn[e.slot]?.e === e);
      for (const { e } of Object.values(fig.worn)) if (!want.includes(e)) grid.querySelector(`[data-id="${e.id}"]`).classList.add('wrong');
      ctx.done(right);
    });
    ctx.answer = `The outfit: ${want.map(e => `${said(e)} (${esc(e.english)})`).join(', ')}.`;
    ctx.reveal = () => {
      check.disabled = true;
      want.forEach(e => { grid.querySelector(`[data-id="${e.id}"]`).classList.add('right'); fig.put(e); });
    };
    const say = () => ctx.play(want);
    const top = $('div', 'dress');
    top.append(fig.box, grid);
    stage.replaceChildren(speech('扮', '打扮！ Dress them in what you hear, then Check.', say), top, check);
    return say();
  }

  const measure = Measures.round({ pool: V.clothes, vocab: V, choices: 3 });
  const build = Tiles.round({ pool: V.sentences, vocab: V, decoys: ['zoek', 'daai', 'ge', 'hai', 'gin', 'tiu'], extra: 2 });
  const rush = (stage, ctx, n) => [colour, garment, wear][n % 3](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u12-dress',
    intro: `<strong>How to play:</strong> a colour and ${zh('嘅', 'ge3')} go before the thing: ${zh('紅色嘅衫', 'hung4 sik1 ge3 saam1')} is a red top.
      Clothes and shoes are ${zh('著', 'zoek3')}; a hat and glasses are ${zh('戴', 'daai3')}.`,
    levels: [
      { id: 'colour', name: '乜嘢顏色？', blurb: 'Hear a colour and tap it.', rounds: 8, time: 12, round: colour },
      { id: 'garment', name: '紅色嘅衫', blurb: 'Hear a colour and a garment, and find it.', rounds: 8, time: 12, round: garment },
      { id: 'wear', name: '著定戴？', blurb: '著衫 but 戴帽: pick the right verb.', rounds: 8, time: 0, round: wear },
      { id: 'measure', name: '一頂帽', blurb: 'Count clothes with the right measure word.', rounds: 8, time: 0, round: measure },
      { id: 'dress', name: '打扮', blurb: 'Hear an outfit and dress the figure in it.', rounds: 6, time: 0, round: dress },
      { id: 'build', name: 'Build it', blurb: '佢著紅色嘅衫. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Colour rush', blurb: 'Colours, clothes and 著 or 戴, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
