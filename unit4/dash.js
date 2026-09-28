/* Unit 4 game: Number Dash. Hear a number and tap it, say numbers, and choose 二 or 兩. Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, speech } = Canto;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const all = [...V.numbers, ...V.big];

  // Up to `count` numbers from `pool` that are easy to mix up with e.n:
  // reversed digits (13/31), 十四 / 四十, ±1, ±10, ×10 and ÷10.
  function confusable(e, pool, count) {
    const n = e.n;
    const near = [+String(n).split('').reverse().join(''), n + 1, n - 1, n + 10, n - 10, n * 10, n / 10];
    if (n > 10 && n < 20) near.push((n - 10) * 10);
    if (n % 10 === 0 && n > 10 && n < 100) near.push(10 + n / 10);
    if (n === 4 || n === 10) near.push(14 - n);
    const byN = new Map(pool.map(x => [x.n, x]));
    const close = shuffle([...new Set(near)].filter(m => m !== n && byN.has(m))).map(m => byN.get(m));
    const rest = shuffle(pool.filter(x => x !== e && !close.includes(x)));
    return [...close, ...rest].slice(0, count);
  }

  function button(html, e, cls = 'choice') {
    const b = $('button', cls, html);
    b.type = 'button';
    b.dataset.id = e.id;
    return b;
  }

  // Pick `answer` from `options`; each is a button made by `label`.
  function choose(ctx, answer, options, label, gridCls = 'choice-grid') {
    const grid = $('div', gridCls);
    options.forEach(o => {
      const b = button(label(o), o);
      b.addEventListener('click', () => {
        if (o !== answer) b.classList.add('wrong');
        ctx.done(o === answer);
      });
      grid.append(b);
    });
    ctx.reveal = () => grid.querySelector(`[data-id="${answer.id}"]`).classList.add('right');
    return grid;
  }

  const answerText = e => `${zh(e.hanzi, e.jyutping)} is ${esc(e.english)}.${e.note ? ' ' + esc(e.note) : ''}`;

  // Hear a number, tap its numeral.
  const hear = ({ pool, choices = 4 }) => (stage, ctx) => {
    const [e] = pick(pool, 1);
    const say = () => ctx.play(e);
    const grid = choose(ctx, e, shuffle([e, ...confusable(e, pool, choices - 1)]), o => esc(o.english), 'choice-grid nums');
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', 'Which number do you hear?', say), grid);
    return say();
  };

  // See a numeral, pick how to say it; the answer plays afterwards.
  const read = ({ pool, choices = 4 }) => (stage, ctx) => {
    const [e] = pick(pool, 1);
    const grid = choose(ctx, e, shuffle([e, ...confusable(e, pool, choices - 1)]), o => zh(o.hanzi, o.jyutping));
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(e); });
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('你', 'How do you say this number?'), $('p', 'prompt-num', esc(e.english)), grid);
  };

  // 二 or 兩? The wrong option swaps the first 二 / 兩 for the other.
  const HINT = { n2: '2, counting: 1, 2, 3', 'loeng-go': '2 of something (with 個)' };
  const TWOS = ['n2', 'n12', 'n20', 'n22', 'n200', 'n2000', 'n20000', 'loeng-go', 'dai-2'].map(id => byId[id]);

  function flip(e) {
    const chars = [...e.hanzi], syl = e.jyutping.split(' ');
    const i = chars.findIndex(c => c === '二' || c === '兩');
    const two = chars[i] === '二';
    chars[i] = two ? '兩' : '二';
    syl[i] = two ? 'loeng5' : 'ji6';
    return { id: `${e.id}-flip`, hanzi: chars.join(''), jyutping: syl.join(' ') };
  }

  function twoOrLoeng(stage, ctx) {
    const [e] = pick(TWOS, 1);
    const grid = choose(ctx, e, shuffle([e, flip(e)]), o => zh(o.hanzi, o.jyutping));
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(e); });
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('你', `How do you say <strong>${esc(HINT[e.id] ?? e.english)}</strong>?`), grid);
  }

  const hearAll = hear({ pool: all }), readAll = read({ pool: all });
  const mixed = (stage, ctx, n) => (Math.random() < 0.6 ? hearAll : readAll)(stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u4-dash',
    intro: `<strong>How to play:</strong> hear a number and tap it before the green bar runs out, or see a number and pick how to say it.
      Listen for the end of each syllable: ${zh('四', 'sei3')} is 4, ${zh('十', 'sap6')} is 10, so ${zh('十四', 'sap6 sei3')} is 14 and ${zh('四十', 'sei3 sap6')} is 40.`,
    levels: [
      { id: 'zero-ten', name: '零 to 十', blurb: 'Hear a number from 0 to 10 and tap it.', rounds: 8, time: 10, round: hear({ pool: V.numbers.slice(0, 11) }) },
      { id: 'to-99', name: 'Up to 99', blurb: 'Teens, tens and 廿. Is it 十四 or 四十?', rounds: 10, time: 10, round: hear({ pool: V.numbers.slice(11) }) },
      { id: 'say-it', name: 'Say it', blurb: 'See a number and pick how to say it.', rounds: 8, time: 0, round: read({ pool: V.numbers }) },
      { id: 'two', name: '二 or 兩?', blurb: '兩個, 兩百, 兩千, but 十二 and 第二.', rounds: 8, time: 0, round: twoOrLoeng },
      { id: 'big', name: 'Hundreds & thousands', blurb: '百, 千 and 萬, with 零 in the gaps.', rounds: 10, time: 12, round: hear({ pool: V.big }) },
      { id: 'dash', name: 'Number Dash', blurb: 'Any number, hear it or say it. Fast!', rounds: 12, time: 8, round: mixed },
    ],
  });
})();
