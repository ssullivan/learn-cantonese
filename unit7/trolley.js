/* Unit 7 game: Trolley rush. Customers order dim sum; serve the right dishes. Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, picButton, speech } = Canto;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const portion = item => byId[`one-${item.id}`];
  const measureOf = item => byId[item.measure];

  const named = items => items.map(i => `${zh(portion(i).hanzi, portion(i).jyutping)} (${esc(i.english)})`).join(' + ');

  // A customer orders `dishes` dishes; pick them from a trolley of `trolley`.
  const order = ({ dishes, trolley }) => (stage, ctx) => {
    const want = pick(V.items, dishes);
    const cart = shuffle([...want, ...pick(V.items.filter(i => !want.includes(i)), trolley - dishes)]);
    const say = () => ctx.play([byId['m-goi'], ...want.map(portion)]);
    const wanted = new Set(want.map(i => i.id));
    const picked = new Set();

    const grid = $('div', 'pic-grid' + (trolley % 3 === 0 ? ' cols-3' : ''));
    cart.forEach(item => {
      const b = picButton(item);
      b.addEventListener('click', () => {
        if (picked.delete(item.id)) return b.classList.remove('picked');
        picked.add(item.id);
        b.classList.add('picked');
        if (picked.size === want.length) ctx.done([...picked].every(id => wanted.has(id)));
      });
      grid.append(b);
    });

    ctx.answer = `The order was ${named(want)}.`;
    ctx.reveal = () => grid.querySelectorAll('.pic-btn').forEach(b => {
      if (wanted.has(b.dataset.id)) b.classList.add('right');
      else if (picked.has(b.dataset.id)) b.classList.add('wrong');
    });

    const tray = $('div', 'tray');
    tray.append($('p', 'tray-label', `${zh('推車', 'teoi1 ce1')} · trolley${dishes > 1 ? ` · tap ${dishes} dishes` : ''}`), grid);
    stage.replaceChildren(speech('客', dishes > 1 ? 'Our table would like…' : 'Excuse me!', say), tray);
    return say();
  };

  // You're the customer: order a dish with the right measure word.
  function measure(stage, ctx) {
    const [item] = pick(V.items, 1);
    const right = measureOf(item);
    const img = $('img', 'prompt-pic');
    img.src = Canto.imgSrc(item);
    img.alt = item.english;

    const choices = $('div', 'choice-grid');
    V.measures.forEach(m => {
      const b = $('button', 'choice', zh(`一${m.hanzi}${item.hanzi}`, `jat1 ${m.jyutping} ${item.jyutping}`));
      b.type = 'button';
      b.dataset.id = m.id;
      b.addEventListener('click', () => {
        if (m !== right) b.classList.add('wrong');
        ctx.play(portion(item));
        ctx.done(m === right);
      });
      choices.append(b);
    });

    ctx.answer = `${zh(portion(item).hanzi, portion(item).jyutping)}. ${esc(right.note)}`;
    ctx.reveal = () => choices.querySelector(`[data-id="${right.id}"]`).classList.add('right');
    stage.replaceChildren(speech('你', `You'd like the ${esc(item.english)}. How do you order it?`), img, choices);
  }

  Game.init({
    root: document.getElementById('game'),
    key: 'u7-trolley',
    intro: `<strong>How to play:</strong> customers call out orders like
      ${zh('唔該，一籠蝦餃！', 'm4 goi1, jat1 lung4 haa1 gaau2')} Tap the dish they asked for before the green bar runs out.
      Dishes in a steamer are ordered by the ${zh('籠', 'lung4')} (basket); dishes on a plate by the ${zh('碟', 'dip6')}.`,
    levels: [
      { id: 'first-orders', name: 'First orders', blurb: 'One dish at a time from a small trolley.', rounds: 8, time: 15, round: order({ dishes: 1, trolley: 4 }) },
      { id: 'measure', name: '一籠 or 一碟?', blurb: 'Your turn to order: pick the right measure word.', rounds: 8, time: 0, round: measure },
      { id: 'lunch-rush', name: 'Lunch rush', blurb: 'A bigger trolley and hungrier customers.', rounds: 10, time: 10, round: order({ dishes: 1, trolley: 6 }) },
      { id: 'big-table', name: 'Big table', blurb: 'Two dishes per order. Tap both.', rounds: 8, time: 16, round: order({ dishes: 2, trolley: 6 }) },
    ],
  });
})();
