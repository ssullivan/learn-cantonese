/* Unit 11 game: Route. Hear places and transport, follow directions on a crossroads map (直行 / 轉左 / 轉右, then 喺左邊 / 喺右邊), say where a place is, and build sentences with 喺 and 去 (shared/tiles.js). Runs on shared/game.js. */
(function () {
  const V = window.VOCAB;
  const { el: $, esc, zh, pick, shuffle, imgSrc, speech } = Canto;
  const { choose, answerText } = Game;
  const byId = Object.fromEntries(Canto.entries(V).map(e => [e.id, e]));
  const said = e => zh(e.hanzi, e.jyutping);
  const pic = e => `<img src="${imgSrc(e)}" alt="${esc(e.english)}">`;

  // Everywhere a place can be on the map, and everything to hear.
  const places = [...V.stations, ...V.places.filter(p => p.img !== false), ...V.elsewhere];
  const things = [...places, ...V.transport];

  // Hear a place or a way to travel, tap its picture.
  function hear(stage, ctx) {
    const [e] = pick(things, 1);
    const say = () => ctx.play(e);
    ctx.answer = answerText(e);
    stage.replaceChildren(speech('聽', '邊度？ Which one do you hear?', say),
      choose(ctx, e, shuffle([e, ...pick(things.filter(o => o !== e), 3)]), pic, 'pic-grid pics'));
    return say();
  }

  // The crossroads, 5 × 5 cells: roads down the middle column and across
  // the middle row, you at the bottom facing up. Each direction's place is
  // on the road it names, on the side it names as you walk: turning left
  // you face west, so your right is the north side of that road.
  const AT = {
    'zik-zo': [1, 2], 'zik-jau': [1, 4],
    'zo-jau': [2, 1], 'zo-zo': [4, 1],
    'jau-zo': [2, 5], 'jau-jau': [4, 5],
  };
  const where = d => `${d.turn}-${d.side}`;

  // A map with a place at every spot; returns { map, at } (place → spot).
  function crossroads(onPick) {
    const map = $('div', 'map');
    map.setAttribute('aria-label', 'A crossroads map. You are at the bottom, facing up.');
    const spots = shuffle(Object.keys(AT));
    const chosen = pick(places, spots.length);
    const at = new Map(chosen.map((p, i) => [p, spots[i]]));
    for (let r = 1; r <= 5; r++) {
      for (let c = 1; c <= 5; c++) {
        const spot = Object.keys(AT).find(k => AT[k][0] === r && AT[k][1] === c);
        const place = chosen[spots.indexOf(spot)];
        let cell;
        if (place) {
          cell = $('button', 'pic-btn spot', pic(place));
          cell.type = 'button';
          cell.dataset.id = place.id;
          cell.setAttribute('aria-label', place.english);
          if (onPick) cell.addEventListener('click', () => onPick(place, cell));
          else cell.disabled = true;
        } else if (r === 5 && c === 3) {
          cell = $('div', 'road you', '▲<span>你</span>');
        } else {
          cell = $('div', r === 3 || c === 3 ? 'road' : 'block');
        }
        map.append(cell);
      }
    }
    return { map, at };
  }

  // Hear directions (轉左，喺右邊), tap the place they lead to.
  function follow(stage, ctx) {
    let answered = false;
    const { map, at } = crossroads((place, cell) => {
      if (answered) return;
      answered = true;
      const right = place === target;
      if (!right) cell.classList.add('wrong');
      ctx.done(right);
    });
    const [target] = pick([...at.keys()], 1);
    const dir = V.directions.find(d => where(d) === at.get(target));
    ctx.answer = `${said(dir)} (${esc(dir.english)}) leads to ${said(target)}, ${esc(target.english)}.`;
    ctx.reveal = () => map.querySelector(`[data-id="${target.id}"]`).classList.add('right');
    const say = () => ctx.play(dir);
    stage.replaceChildren(speech('聽', 'Follow the directions from ▲ and tap where you end up.', say), map);
    return say();
  }

  // Hear "銀行喺邊度呀？", pick the directions to it on the map.
  function tell(stage, ctx) {
    const { map, at } = crossroads();
    const [target] = pick([...at.keys()], 1);
    const q = V.questions.find(e => e.place === target.id);
    const dir = V.directions.find(d => where(d) === at.get(target));
    const grid = choose(ctx, dir, shuffle([dir, ...pick(V.directions.filter(d => d !== dir), 3)]), said);
    grid.addEventListener('click', ev => { if (ev.target.closest('button')) ctx.play(dir); });
    ctx.answer = `${said(target)} (${esc(target.english)}): ${said(dir)}, ${esc(dir.english)}`;
    const reveal = ctx.reveal;
    ctx.reveal = () => { reveal(); map.querySelector(`[data-id="${target.id}"]`).classList.add('right'); };
    const say = () => ctx.play(q);
    stage.replaceChildren(speech('問', `${said(q)}<br>You are at ▲. How do you get there?`, say), map, grid);
    return say();
  }

  const build = Tiles.round({ pool: V.sentences, vocab: V, decoys: ['hai2', 'heoi', 'daap', 'lai', 'zo', 'jau6', 'bin-dou'], extra: 2 });
  const rush = (stage, ctx, n) => [hear, follow, tell][n % 3](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u11-route',
    intro: `<strong>How to play:</strong> you stand at ▲ at the bottom of the map. Directions say which road, then which side:
      ${zh('直行', 'zik6 haang4')} (straight on), ${zh('轉左', 'zyun3 zo2')} or ${zh('轉右', 'zyun3 jau6')}, then
      ${zh('喺左邊', 'hai2 zo2 bin1')} or ${zh('喺右邊', 'hai2 jau6 bin1')}. Left and right are as you walk: after 轉左, your right is the top of the map.`,
    levels: [
      { id: 'hear', name: '邊度？', blurb: 'Hear a place or a way to travel, and tap it.', rounds: 8, time: 12, round: hear },
      { id: 'follow', name: '轉左，喺右邊', blurb: 'Follow the directions to a place on the map.', rounds: 8, time: 0, round: follow },
      { id: 'tell', name: '喺邊度呀？', blurb: 'Someone asks the way: pick the directions.', rounds: 8, time: 0, round: tell },
      { id: 'build', name: 'Build it', blurb: '我搭巴士去機場. Put the words in order.', rounds: 8, time: 0, round: build },
      { id: 'rush', name: 'Route rush', blurb: 'Places, directions and the way there, against the clock.', rounds: 12, time: 15, round: rush },
    ],
  });
})();
