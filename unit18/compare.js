/* Unit 18 game: Which Is Bigger. Hear 邊個平啲呀？ and tap the one, find the biggest or cheapest with 最, say whether a comparison is right (啱) or wrong, choose 好多 or 少少, work out which one 冇…咁 means, say how much older a brother or sister is, and build sentences (shared/tiles.js). Runs on shared/game.js. What each thing costs, how big and fast it is, and each person's age and height come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech, confusable } = Canto;
  const { choose } = Game;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const said = e => zh(e.hanzi, e.jyutping);
  const tell = e => `${said(e)} ${esc(e.english)}${e.note ? ' ' + esc(e.note) : ''}`;
  // Play `e` once the right answer is shown, however the round ended.
  const playOnReveal = (ctx, e) => {
    const show = ctx.reveal;
    ctx.reveal = () => { show(); ctx.play(e); };
  };

  // A tag for the scales you can't see in a picture; sizes and speeds are common sense.
  const TAG = { price: n => `$${n % 1 ? n.toFixed(2) : n}`, age: n => `${n}歲`, height: n => `${n}cm` };
  // A thing or person: its picture (or its characters, for 我), with a tag
  // for `scale` if it has one. `value` overrides the entry's own.
  const look = (e, scale, value = e[scale]) => {
    const pic = e.img === false ? `<span class="pic-word" lang="zh-HK">${esc(e.hanzi)}</span>`
      : `<img src="${imgSrc(e)}" alt="${esc(e.english)}">`;
    return pic + (TAG[scale] && value != null ? `<span class="tag">${TAG[scale](value)}</span>` : '');
  };
  const side = (...items) => $('div', 'versus', items.map(([e, scale, value]) => `<div class="versus-item">${look(e, scale, value)}</div>`).join(''));

  // Only things that differ clearly are compared: by half as much again,
  // or by these amounts for heights and ages.
  const DIFF = { height: 8, age: 2 };
  const clear = (scale, x, y) => {
    const [lo, hi] = [x, y].sort((m, n) => m - n);
    return DIFF[scale] ? hi - lo >= DIFF[scale] : hi / lo >= 1.5;
  };
  const SCALES = Object.keys(V.scales);
  const pictured = scale => [...V.things, ...V.people].filter(e => e[scale] != null && e.img !== false);
  // n pictured things on one scale, every two clearly different.
  function spread(scale, n) {
    for (;;) {
      const set = pick(pictured(scale), n);
      if (set.every((a, i) => set.slice(i + 1).every(b => clear(scale, a[scale], b[scale])))) return set;
    }
  }
  // The most (adj is the scale's more) or least of `list`.
  const extreme = (list, scale, adj) => list.reduce((best, e) =>
    (adj === V.scales[scale].more ? e[scale] > best[scale] : e[scale] < best[scale]) ? e : best);
  const ageNote = scale => scale === 'age' ? ' Of people, 大 is older and 細 younger.' : '';

  // Hear 邊個平啲呀？ (or 邊個最平呀？ with 最), tap the one.
  const ask = (questions, n) => (stage, ctx) => {
    const [scale] = pick(SCALES, 1);
    const s = V.scales[scale];
    const [adj] = pick([s.more, s.less], 1);
    const q = questions.find(w => w.adj === adj);
    const set = spread(scale, n);
    const right = extreme(set, scale, adj);
    const say = () => ctx.play(q);
    ctx.answer = `${said(q)} ${esc(q.english)} ${said(right)}, ${esc(right.english.replace(/;.*/, ''))}.${ageNote(scale)}`;
    stage.replaceChildren(speech('問', 'Listen: which one?', say),
      choose(ctx, right, shuffle(set), e => look(e, scale), `pic-grid pics ${n > 2 ? 'three' : 'pair'}`));
    return say();
  };
  const which = ask(V.which, 2);
  const most = ask(V.most, 3);

  // See two things, hear a comparison: 啱 or 唔啱?
  const claims = [...V.bei, ...V.gwo];
  const [yes, no] = ['ngaam', 'm-ngaam'].map(id => byId[id]);
  const right = (stage, ctx) => {
    const [e] = pick(claims, 1);
    const { a, b, scale, holds } = e.cmp;
    const answer = holds ? yes : no;
    const say = () => ctx.play(e);
    const truth = holds ? e : V.bei.find(o => o.cmp.a === a && o.cmp.b === b && o.cmp.holds);
    ctx.answer = `${said(e)} ${esc(e.english)} ${said(answer)}${holds ? '' : `: ${said(truth)} ${esc(truth.english)}`}${ageNote(scale)}`;
    stage.replaceChildren(side([byId[a], scale], [byId[b], scale]), speech('聽', '啱唔啱？ Is it right?', say),
      choose(ctx, answer, [yes, no], said));
    return say();
  };

  // Two prices: 貴好多 or 貴少少? Much (twice or more) or a little (under half as much again).
  const priced = V.things.filter(t => t.price);
  const pairs = priced.flatMap((a, i) => priced.slice(i + 1).map(b => a.price > b.price ? [a, b] : [b, a]));
  const much = pairs.filter(([a, b]) => a.price / b.price >= 2), little = pairs.filter(([a, b]) => a.price / b.price < 1.5);
  const [houDo, siuSiu] = ['hou-do', 'siu-siu'].map(id => byId[id]);
  const amount = (stage, ctx) => {
    const big = Math.random() < 0.5;
    const [[dear, cheap]] = pick(big ? much : little, 1);
    const [first, other, adj] = Math.random() < 0.5 ? [dear, cheap, byId.gwai] : [cheap, dear, byId.peng];
    const answer = big ? houDo : siuSiu;
    const ws = [first, byId.bei, other, adj];
    const gap = `${zh(ws.map(w => w.hanzi).join(''), ws.map(w => w.jyutping).join(' '))}＿`;
    const full = byId[`${first.id}-bei-${other.id}-${adj.id}-${answer.id}`];
    if (full) playOnReveal(ctx, full);
    ctx.answer = `${zh(ws.map(w => w.hanzi).join('') + answer.hanzi, [...ws, answer].map(w => w.jyutping).join(' '))}: ${TAG.price(dear.price)} against ${TAG.price(cheap.price)}, ${big ? 'a lot' : 'only a little'}.`;
    stage.replaceChildren(side([first, 'price'], [other, 'price']), speech('你', `Much, or a little?<br><strong>${gap}</strong>`),
      choose(ctx, answer, [houDo, siuSiu], said));
  };

  // Hear A 冇 B 咁 + adjective; tap the one that is more so (B).
  const notAs = V.notAs.filter(e => e.cmp);
  const unlike = (stage, ctx) => {
    const [e] = pick(notAs, 1);
    const { a, b, adj } = e.cmp;
    const q = V.which.find(w => w.adj === adj);
    const say = () => ctx.play(e);
    ctx.answer = `${tell(e)} So ${said(byId[a])} is ${esc(q.english.replace(/^Which one is |\?$/g, ''))}.`;
    stage.replaceChildren(speech('聽', `${esc(q.english)}`, say),
      choose(ctx, byId[a], shuffle([byId[a], byId[b]]), o => look(o), 'pic-grid pics pair'));
    return say();
  };

  // A brother or sister and me, with our ages: 大幾多歲？
  const older = (stage, ctx) => {
    const [q] = pick(V.howOld, 1);
    const [gap] = pick(V.ages, 1);
    const mine = 16 + Math.floor(Math.random() * 15);
    const theirs = q.who.startsWith('elder') ? mine + gap.n : mine - gap.n;
    const say = () => ctx.play(q);
    playOnReveal(ctx, gap);
    ctx.answer = `${said(q)} ${esc(q.english)} ${TAG.age(Math.max(mine, theirs))} − ${TAG.age(Math.min(mine, theirs))}: ${said(gap)}.`;
    stage.replaceChildren(side([byId[q.who], 'age', theirs], [byId.ngo, 'age', mine]), speech('問', 'Listen: how many years?', say),
      choose(ctx, gap, shuffle([gap, ...confusable(gap, V.ages, 3)]), said));
    return say();
  };

  const build = Tiles.round({
    pool: [...V.bei.filter(e => e.cmp.holds), ...V.gwo, ...V.howMuch, ...V.notAs, ...V.same, ...V.ding, ...V.best, ...V.sentences],
    vocab: V, decoys: ['bei', 'gwo', 'zeoi', 'di', 'hou-do', 'm', 'mou', 'gam3'], extra: 2,
  });
  const rush = (stage, ctx, n) => [which, most][n % 2](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u18-compare',
    intro: `<strong>How to play:</strong> hear ${zh('邊個平啲呀？', 'bin1 go3 peng4 di1 aa3')} and tap the cheaper one,
      find the ${zh('最', 'zeoi3')} biggest, fastest or cheapest, and say whether a comparison is
      ${zh('啱', 'ngaam1')} (right) or ${zh('唔啱', 'm4 ngaam1')}. Price tags, ages and heights are shown;
      sizes and speeds are common sense.`,
    levels: [
      { id: 'which', name: '邊個平啲？', blurb: 'Hear which one: cheaper, bigger, faster, older... Tap it.', rounds: 8, time: 12, round: which },
      { id: 'most', name: '最', blurb: 'Three things: which is the biggest, fastest, cheapest?', rounds: 8, time: 0, round: most },
      { id: 'right', name: '啱唔啱？', blurb: 'Hear A 比 B or A 貴過 B: is it right?', rounds: 8, time: 0, round: right },
      { id: 'amount', name: '好多定少少？', blurb: 'Two prices: much more, or a little more?', rounds: 8, time: 0, round: amount },
      { id: 'not-as', name: '冇…咁', blurb: 'Hear 巴士冇港鐵咁快 and tap the faster one.', rounds: 8, time: 0, round: unlike },
      { id: 'older', name: '大幾多歲？', blurb: 'How much older or younger is your brother or sister?', rounds: 8, time: 0, round: older },
      { id: 'build', name: 'Build it', blurb: '西瓜比蘋果貴. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Comparing rush', blurb: '啲 and 最, against the clock.', rounds: 12, time: 15, round: rush },
    ],
  });
})();
