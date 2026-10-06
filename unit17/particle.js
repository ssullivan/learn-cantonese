/* Unit 17 game: Particle Match. Hear a feeling and find its face, answer 開唔開心 about a face, comfort a friend with 啦, pick the particle a situation calls for (啦 喇 喎 囉 嘛), hear what a particle sentence means, and build sentences (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const { choose, pic, playOnReveal } = Game;
  const byId = Units.byId(V);
  const said = e => zh(e.hanzi, e.jyutping);
  const face = e => {
    const img = $('img', 'prompt-pic');
    img.src = imgSrc(e);
    img.alt = '';
    return img;
  };
  const tell = e => `${said(e)} ${esc(e.english)}${e.note ? ' ' + esc(e.note) : ''}`;

  // Feelings a face could show at once: a happy face might be excited too.
  const NEAR = [['hoi-sam', 'hing-fan'], ['soeng-sam', 'm-hoi-sam'], ['gui', 'ngaan-fan', 'mun'], ['geng', 'gan-zoeng']];
  const near = (a, b) => a === b || NEAR.some(g => g.includes(a) && g.includes(b));
  const faces = [...V.feelings, byId['m-hoi-sam']];

  // Hear a feeling, tap its face.
  const what = (stage, ctx) => {
    const e = ctx.draw(faces);
    const say = () => ctx.play(e);
    ctx.answer = tell(e);
    const others = pick(faces.filter(o => !near(o.id, e.id)), 3);
    stage.replaceChildren(speech('聽', '心情點呀？ Which face?', say),
      choose(ctx, e, shuffle([e, ...others]), pic, 'pic-grid pics'));
    return say();
  };

  // A face, and a question about it: 你開唔開心呀？ Answer 開心 or 唔開心.
  const ask = (stage, ctx) => {
    const f = ctx.draw(V.feelings);
    const yes = Math.random() < 0.5;
    const [q] = yes ? V.asks.filter(a => a.feeling === f.id) : pick(V.asks.filter(a => !near(a.feeling, f.id)), 1);
    const [y, n] = q.answers.map(id => byId[id]);
    const right = yes ? y : n;
    const grid = choose(ctx, right, [y, n], said);
    playOnReveal(ctx, right);
    ctx.answer = `${said(q)} ${esc(q.english)} The face is ${esc(f.english.replace(/;.*/, ''))}: ${said(right)}.${q.note ? ' ' + esc(q.note) : ''}`;
    const say = () => ctx.play(q);
    stage.replaceChildren(face(f), speech('問', `${said(q)} Answer for this face.`, say), grid);
    return say();
  };

  // A friend says 我好攰; say something kind with 啦.
  const helped = V.feelings.filter(f => V.comfort.some(c => c.for.includes(f.id)));
  const comfort = (stage, ctx) => {
    const f = ctx.draw(helped);
    const line = byId[`ngo-hou-${f.id}`];
    const [right] = pick(V.comfort.filter(c => c.for.includes(f.id)), 1);
    const wrong = pick(V.comfort.filter(c => !c.for.some(id => near(id, f.id))), 3);
    const grid = choose(ctx, right, shuffle([right, ...wrong]), said);
    playOnReveal(ctx, right);
    ctx.answer = tell(right);
    const say = () => ctx.play(line);
    stage.replaceChildren(face(f), speech('佢', `${said(line)}<br>What do you say?`, say), grid);
    return say();
  };

  // Read the situation and the sentence with a gap; pick its particle.
  // gloss: show what each particle does on its button.
  const sentences = [...V.particled, ...V.comfort];
  const particle = gloss => (stage, ctx) => {
    const e = ctx.draw(sentences);
    const p = byId[e.particle];
    const body = e.words.slice(0, -1).map(id => byId[id]);
    const gap = `${zh(body.map(w => w.hanzi).join(''), body.map(w => w.jyutping).join(' '))}＿`;
    const wrong = pick(V.particles.filter(o => o !== p && !(e.also ?? []).includes(o.id)), 2);
    const label = o => gloss ? `${said(o)}<br><small>${esc(o.english)}</small>` : said(o);
    const grid = choose(ctx, p, shuffle([p, ...wrong]), label);
    playOnReveal(ctx, e);
    ctx.answer = `${tell(e)} ${esc(p.note)}`;
    stage.replaceChildren(speech('你', `${esc(e.why)}<br><strong>${gap}</strong>`), grid);
  };

  // Hear a sentence with a particle; pick what it means.
  const hear = (stage, ctx) => {
    const e = ctx.draw(sentences);
    const say = () => ctx.play(e);
    ctx.answer = tell(e);
    const others = pick(sentences.filter(o => o.english !== e.english), 3);
    stage.replaceChildren(speech('聽', 'What do they mean?', say),
      choose(ctx, e, shuffle([e, ...others]), o => esc(o.english)));
    return say();
  };

  const build = Tiles.round({ pool: [...V.sentences, ...V.states, ...V.particled, ...V.comfort], vocab: V,
    decoys: ['hou', 'm', 'gam3', 'laa1', 'laa3', 'wo3', 'lo1', 'maa3'], extra: 2 });
  const quick = particle(false);
  const rush = (stage, ctx, n) => [what, quick][n % 2](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u17-particles',
    intro: `<strong>How to play:</strong> find the face for each feeling, answer 開唔開心 about it, and
      cheer up a friend. Then match each situation to its particle: ${zh('啦', 'laa1')} go on,
      ${zh('喇', 'laa3')} it's changed, ${zh('喎', 'wo3')} hey!, ${zh('囉', 'lo1')} oh well,
      ${zh('嘛', 'maa3')} you know.`,
    levels: [
      { id: 'what', name: '心情', blurb: 'Hear a feeling and tap the face.', rounds: 8, time: 12, round: what },
      { id: 'ask', name: '開唔開心？', blurb: 'Answer about a face: 開心 or 唔開心.', rounds: 8, time: 0, round: ask },
      { id: 'comfort', name: '唔使驚啦', blurb: 'A friend feels bad: say something kind with 啦.', rounds: 8, time: 0, round: comfort },
      { id: 'particle', name: '啦 喇 喎 囉 嘛', blurb: 'Pick the particle the situation calls for.', rounds: 8, time: 0, round: particle(true) },
      { id: 'hear', name: '聽', blurb: 'Hear a sentence with a particle and pick its meaning.', rounds: 8, time: 0, round: hear },
      { id: 'build', name: 'Build it', blurb: '我肚餓喇. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Particle rush', blurb: 'Faces and particles, against the clock.', rounds: 12, time: 15, round: rush },
    ],
  });
})();
