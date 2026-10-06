/* Unit 5 game: Count It. Count pictures and say how many with the measure word, hear a count and find it, and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const byId = Units.byId(V);
  const MAX = 9;

  // `n` of thing `t`, counted with measure `m` (its own unless given).
  function counted(n, t, m = byId[t.measure]) {
    const { hanzi, jyutping } = Canto.number(n, { measure: m });
    return { id: `${n}-${m.id}-${t.id}`, hanzi: hanzi + t.hanzi, jyutping: `${jyutping} ${t.jyutping}` };
  }

  // A row of n pictures of t.
  function row(n, t) {
    const r = $('div', 'pic-row');
    r.setAttribute('aria-label', `${n} × ${t.english}`);
    for (let i = 0; i < n; i++) {
      const img = $('img');
      img.src = imgSrc(t);
      img.alt = '';
      r.append(img);
    }
    return r;
  }

  const answerText = c => `${zh(c.hanzi, c.jyutping)}: ${esc(c.english)}.${c.note ? ' ' + esc(c.note) : ''}`;

  // Buttons for `options` (each with a `key`); the one equal to `right` is right.
  function choose(ctx, right, options, content, onClick) {
    const grid = $('div', 'choice-grid');
    shuffle(options).forEach(o => {
      const b = $('button', 'choice');
      b.type = 'button';
      b.dataset.key = o.key;
      b.append(content(o));
      b.addEventListener('click', () => {
        if (o !== right) b.classList.add('wrong');
        onClick?.();
        ctx.done(o === right);
      });
      grid.append(b);
    });
    ctx.reveal = () => grid.querySelector(`[data-key="${right.key}"]`).classList.add('right');
    return grid;
  }

  // Count them: n pictures; pick the count. Wrong options are off by one,
  // or use another measure word.
  function countThem(stage, ctx) {
    const [c] = pick(V.counts, 1);
    const t = byId[c.thing];
    const [wrongM] = pick(V.measures.filter(m => m.id !== t.measure), 1);
    const right = { key: 'right', ...counted(c.n, t) };
    const options = [right, { key: 'measure', ...counted(c.n, t, wrongM) },
      { key: 'more', ...counted(c.n + 1, t) }, { key: 'less', ...counted(c.n - 1, t) }];
    const grid = choose(ctx, right, options, o => $('span', null, zh(o.hanzi, o.jyutping)), () => ctx.play(c));
    ctx.answer = answerText(c);
    stage.replaceChildren(speech('你', 'Count them. How do you say how many?'), row(c.n, t), grid);
  }

  // Hear a count; tap the matching group. The others change the number,
  // the thing, or both.
  function hearIt(stage, ctx) {
    const [c] = pick(V.counts, 1);
    const t = byId[c.thing];
    const [other] = pick(V.things.filter(x => x !== t), 1);
    const n2 = c.n === 2 ? 3 : c.n === MAX ? c.n - 1 : pick([c.n - 1, c.n + 1], 1)[0];
    const right = { key: 'right', n: c.n, t };
    const options = [right, { key: 'number', n: n2, t }, { key: 'thing', n: c.n, t: other }, { key: 'both', n: n2, t: other }];
    const grid = choose(ctx, right, options, o => row(o.n, o.t));
    grid.classList.add('groups');
    const say = () => ctx.play(c);
    ctx.answer = answerText(c);
    stage.replaceChildren(speech('聽', 'Which group do you hear?', say), grid);
    return say();
  }

  const build = Tiles.round({ pool: V.sentences, vocab: V, decoys: ['zek', 'bun', 'gaa', 'bui', 'deoi', 'go', 'ni', 'go2'], extra: 2 });
  const rush = (stage, ctx, n) => (n % 2 ? countThem : hearIt)(stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u5-count',
    intro: `<strong>How to play:</strong> say how many with number + measure word + noun:
      ${zh('三隻貓', 'saam1 zek3 maau1')}, three cats. Two is always ${zh('兩', 'loeng5')} here: ${zh('兩本書', 'loeng5 bun2 syu1')}.`,
    levels: [
      { id: 'count', name: 'Count them', blurb: 'Count the pictures and pick how to say it.', rounds: 8, time: 0, round: countThem },
      { id: 'hear', name: 'Hear it', blurb: 'Hear 三架車 and tap the three cars.', rounds: 8, time: 15, round: hearIt },
      { id: 'build', name: 'Build it', blurb: '我有兩隻貓, 你有幾多本書呀？ from word tiles.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Count rush', blurb: 'Count and listen, against the clock.', rounds: 12, time: 12, round: rush },
    ],
  });
})();
