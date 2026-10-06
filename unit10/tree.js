/* Unit 10 game: Family Tree. Find people on the family tree, name them, work out 嘅 chains (爸爸嘅媽媽), say whose things are whose (shared/measures.js), and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const { choose, answerText, pic } = Game;
  const byId = Units.byId(V);
  const said = e => zh(e.hanzi, e.jyutping);

  // Members in rows of the tree: wrong answers come from e's own row
  // first (爺爺 or 公公? 細佬 or 哥哥?), then any others.
  const rows = [V.grandparents, V.parents, V.siblings, V.own].map(r => r.filter(e => e.member));
  const members = rows.flat();
  function others(e, count, first = []) {
    const near = shuffle([...first, ...rows.find(r => r.includes(e))].filter((o, i, all) => o !== e && all.indexOf(o) === i));
    return [...near, ...shuffle(members.filter(o => o !== e && !near.includes(o)))].slice(0, count);
  }

  // Hear a family word, tap them on the tree.
  function find(stage, ctx) {
    const [e] = pick(members, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '邊個係邊個？ Who is it? Tap them on the tree.', say),
      choose(ctx, e, shuffle([e, ...others(e, 3)]), pic, 'pic-grid pics'));
    return say();
  }

  // See someone on the tree, pick their name; it plays afterwards.
  function name(stage, ctx) {
    const [e] = pick(members, 1);
    const img = $('img', 'prompt-pic');
    img.src = imgSrc(e);
    img.alt = 'A family tree with one person marked';
    const grid = choose(ctx, e, shuffle([e, ...others(e, 3)]), said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(e); });
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('你', '佢係你乜嘢人呀？ Who is the person with the arrow?'), img, grid);
  }

  // Hear 爸爸嘅媽媽, tap 嫲嫲. The people named in the chain are offered too.
  function chain(stage, ctx) {
    const [r] = pick(V.relations, 1);
    const e = byId[r.means];
    const named = r.words.map(id => byId[id]).filter(w => w.member);
    const say = () => ctx.play(r);
    ctx.answer = `${said(r)} (${esc(r.english)}) is ${said(e)}, ${esc(e.english)}.`;
    stage.replaceChildren(speech('聽', `${said(r)}<br>Who is it? Tap them on the tree.`, say),
      choose(ctx, e, shuffle([e, ...others(e, 3, named)]), pic, 'pic-grid pics'));
    return say();
  }

  // 我隻貓, 你本書, 佢個仔: the measure word says whose.
  const owned = V.mine.filter(m => m.words[0] === 'ngo').map(m => byId[m.thing]);
  const mine = ['ngo', 'nei', 'keoi'].map(id => Measures.round({ pool: owned, vocab: V, choices: 3, owner: byId[id] }));
  const whose = (stage, ctx, n) => mine[n % 3](stage, ctx, n);

  const build = Tiles.round({ pool: V.sentences, vocab: V, decoys: ['zek', 'bun', 'hai', 'tung', 'go'], extra: 2 });
  const rush = (stage, ctx, n) => [find, name, chain][n % 3](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u10-tree',
    intro: `<strong>How to play:</strong> every picture is a family tree. You are in yellow; the person meant is in red, with an arrow.
      Your dad's parents are ${zh('爺爺', 'je4 je2')} and ${zh('嫲嫲', 'maa4 maa4')}; your mum's are ${zh('公公', 'gung4 gung1')} and ${zh('婆婆', 'po4 po2')}.`,
    levels: [
      { id: 'find', name: '邊個係邊個？', blurb: 'Hear a family word and tap them on the tree.', rounds: 8, time: 0, round: find },
      { id: 'name', name: '佢係你乜嘢人？', blurb: 'See someone on the tree and pick their name.', rounds: 8, time: 0, round: name },
      { id: 'chain', name: '爸爸嘅媽媽', blurb: 'Dad\'s mum is 嫲嫲: follow the 嘅 chain.', rounds: 8, time: 0, round: chain },
      { id: 'mine', name: '我隻貓', blurb: 'My cat, your book, his son: the measure word says whose.', rounds: 9, time: 0, round: whose },
      { id: 'build', name: 'Build it', blurb: '呢本書係邊個嘅？ 我有兩個家姐. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Family rush', blurb: 'Find, name and follow the chain, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
