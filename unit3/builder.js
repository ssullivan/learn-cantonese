/* Unit 3 game: Question Builder. Build sentences and questions from word tiles (shared/tiles.js), and answer yes/no questions about a picture. Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc } = Canto;
  const tiles = (pool, decoys, extra) => Tiles.round({ pool, vocab: V, decoys, extra });

  // Answer back: a picture of someone, and a question about them. Answer
  // 係呀, or 唔係呀 and what they are.
  const NOUNS = ['lou-si', 'hok-saang', 'hoeng-gong-jan'];
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const questions = [...V.maa, ...V.aNotA].filter(q => q.words[0] === 'keoi' && NOUNS.some(n => q.words.includes(n)));
  const option = parts => ({ parts, hanzi: parts.map(p => p.hanzi).join('，'), jyutping: parts.map(p => p.jyutping).join(' ') });
  const yes = option([byId['hai-aa']]);
  const no = noun => option([byId['m-hai-aa'], byId[`keoi-hai-${noun}`]]);

  function answerBack(stage, ctx) {
    const [q] = pick(questions, 1);
    const asked = NOUNS.find(n => q.words.includes(n));
    const shown = Math.random() < 0.5 ? asked : pick(NOUNS.filter(n => n !== asked), 1)[0];
    const noes = Object.fromEntries(NOUNS.filter(n => n !== asked).map(n => [n, no(n)]));
    const options = [yes, ...Object.values(noes)];
    const right = shown === asked ? yes : noes[shown];

    const img = $('img', 'prompt-pic');
    img.src = imgSrc(byId[shown]);
    img.alt = byId[shown].english;
    const say = () => ctx.play(q);
    const grid = $('div', 'choice-grid');
    const buttons = new Map();
    shuffle(options).forEach(o => {
      const b = $('button', 'choice', zh(o.hanzi, o.jyutping));
      b.type = 'button';
      b.addEventListener('click', () => {
        if (o !== right) b.classList.add('wrong');
        ctx.done(o === right);
      });
      grid.append(b);
      buttons.set(o, b);
    });
    ctx.answer = `${zh(q.hanzi, q.jyutping)} ${esc(q.english)} ${zh(right.hanzi, right.jyutping)}`;
    ctx.reveal = () => { buttons.get(right).classList.add('right'); ctx.play(right.parts); };
    stage.replaceChildren(img, Canto.speech('佢', `${zh(q.hanzi, q.jyutping)}<br>Look at the picture. What do you answer?`, say), grid);
    return say();
  }

  const all = [...V.statements, ...V.maa, ...V.aNotA, ...V.wh, ...V.answers];

  Game.init({
    root: document.getElementById('game'),
    key: 'u3-builder',
    intro: `<strong>How to play:</strong> read the English and tap the words in the right order, then press Check.
      Some tiles don't belong. Cantonese keeps the word order of the answer: ${zh('佢係阿明', 'keoi5 hai6 aa3 ming4')} → ${zh('佢係邊個呀？', 'keoi5 hai6 bin1 go3 aa3')}`,
    levels: [
      { id: 'hai', name: '係 and 唔', blurb: 'Say who people are, and who they aren\'t.', rounds: 8, time: 0,
        round: tiles(V.statements, ['m', 'maa', 'dou']) },
      { id: 'maa', name: 'Questions with 嗎', blurb: 'Turn a sentence into a question with 嗎.', rounds: 6, time: 0,
        round: tiles(V.maa, ['m', 'bin-go', 'ne']) },
      { id: 'a-not-a', name: 'A唔A questions', blurb: '係唔係, 識唔識: no 嗎 needed.', rounds: 6, time: 0,
        round: tiles(V.aNotA, ['dou', 'ne', 'bin-go']) },
      { id: 'wh', name: '邊個 and 乜嘢', blurb: 'Who and what stay where the answer goes.', rounds: 6, time: 0,
        round: tiles(V.wh, ['maa', 'bin-go', 'mat-je']) },
      { id: 'answer', name: 'Answer back', blurb: 'Hear a question about the picture. 係呀 or 唔係呀?', rounds: 8, time: 0,
        round: answerBack },
      { id: 'rush', name: 'Rush', blurb: 'Every kind of sentence, 25 seconds each.', rounds: 10, time: 25,
        round: tiles(all, ['m', 'maa', 'hai', 'bin-go', 'mat-je', 'dou']) },
    ],
  });
})();
