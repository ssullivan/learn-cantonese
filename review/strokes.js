/*
 * Stroke order review: every character a unit teaches to write (the
 * `write` string in its vocab), drawn stroke by stroke from strokes/, with
 * tools/stroke-check.mjs's verdict and a link to the Education Bureau's
 * animation to compare it with. A character composed from parts
 * (tools/strokes-composed.mjs) links each part's animation instead. Nothing is typed out: the characters come
 * from the loaded vocabs and the data from strokes/<hex>.json.
 */
(function () {
  const { el: $, esc, zh } = Canto;
  const root = document.getElementById('strokes');
  const units = Object.keys(window.UNITS).map(Number).sort((a, b) => a - b)
    .filter(n => window.UNITS[n].write);

  if (!units.length) root.append($('p', null, 'No unit teaches writing yet.'));

  const edbLink = edb => `https://www.edbchinese.hk/EmbziciwebRes/stkdemo_js/${edb}.html?lang=ch`;
  const link = (edb, text) => `<a href="${edbLink(edb)}" target="_blank" rel="noopener">${text}</a>`;

  // "strokes 1–3 of 呢, then 左": a composed character's parts, in order.
  const parts = hk => hk.parts.map(p => `${p.take ? `strokes ${p.take[0] + 1}–${p.take[1]} of ` : ''}<span lang="zh-HK">${esc(p.from)}</span>`).join(', then ');

  // "strokes 6 and 7": where the Hong Kong order isn't Make Me a Hanzi's (mainland) order.
  function reordered(order) {
    const moved = order.map((j, k) => j !== k ? k + 1 : 0).filter(Boolean);
    return moved.length ? `Hong Kong order differs from mainland data at strokes ${moved.join(', ')}` : 'Same order as mainland data';
  }

  function status(hk) {
    if (hk.verdict === 'composed') return `<span class="stroke-flag composed">Composed</span> Not in the Education Bureau's list, so there is no official stroke order. Built from ${parts(hk)}${hk.parts.length > 1 ? ', each in its Hong Kong order, left part first' : ', in its Hong Kong order'}.`;
    if (hk.verdict === 'ok') return `<span class="stroke-flag ok">Matches EDB</span>`;
    if (hk.confirmed) return `<span class="stroke-flag ok">Confirmed by a person ${esc(hk.confirmed)}</span>`;
    return `<span class="stroke-flag look">Needs a person</span> One stroke matched weakly: watch the animation and compare.`;
  }

  for (const n of units) {
    const vocab = window.UNITS[n];
    const sec = $('section', 'review-unit');
    sec.id = `unit${n}`;
    sec.append($('h2', null, `Unit ${n}`));
    const grid = $('div', 'stroke-grid');
    sec.append(grid);
    root.append(sec);

    for (const char of vocab.write) {
      const card = $('article', 'card stroke-card');
      grid.append(card);
      const word = Strokes.word(vocab, char);
      Strokes.load(char).then(data => {
        const steps = data.strokes.map((_, i) => `<div class="stroke-step">${Strokes.svg(data, { upto: i + 1, mark: true, title: `${char}, stroke ${i + 1}` })}</div>`).join('');
        card.innerHTML = `<div class="stroke-head">
            <div class="stroke-big">${Strokes.svg(data, { numbers: true })}</div>
            <div>
              <p class="stroke-word">${word ? `${zh(word.hanzi, word.jyutping)} ${esc(word.english)}` : ''}</p>
              <p>${data.strokes.length} stroke${data.strokes.length === 1 ? '' : 's'}.${data.order ? ` ${reordered(data.order)}.` : ''}</p>
              <p>${status(data.hk)}</p>
              <p>${data.hk.from
                ? `Hong Kong animations of its parts (EDB): ${Object.entries(data.hk.from).map(([c, f]) => link(f.edb, `<span lang="zh-HK">${esc(c)}</span> ↗`)).join(' ')}`
                : `${link(data.hk.edb, 'Hong Kong animation (EDB) ↗')} · checked ${esc(data.hk.checked)}`}</p>
            </div>
          </div>
          <div class="stroke-steps">${steps}</div>`;
      }).catch(e => { card.innerHTML = `<p><span class="hanzi" lang="zh-HK">${esc(char)}</span> ${esc(e.message)}</p>`; });
    }
  }
})();
