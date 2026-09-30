/*
 * sheet.js — printable writing practice: the characters a unit teaches to
 * write (its vocab's `write`), in Hong Kong stroke order. For each: a
 * model with numbered strokes and the word it's from, the character built
 * up stroke by stroke, faint copies to trace (fading), then empty boxes.
 * Any unit can use it. Needs core.js and strokes.js (with strokes.css and
 * sheet.css).
 *
 *   Sheet.init({ root, vocab })
 *
 * The toolbar picks the paper (A4 or US Letter: sets @page), the guide
 * lines (田字格 or 米字格) and how many empty rows follow the tracing row,
 * and prints. The choices are kept in localStorage "sheet", for every
 * unit's sheet. The sheet always looks like paper (dark ink on white), on
 * screen too.
 */
(function () {
  const { el: $, esc, zh } = Canto;
  const COLS = 10;   // boxes per row: 18 mm each fits A4 and Letter
  const TRACE = 4;   // faint copies at the start of the tracing row
  const US = /-(US|CA|MX|PH)$/.test(navigator.language);
  const store = Canto.store('sheet', { paper: US ? 'letter' : 'A4', grid: 'tian', rows: 2 });
  const EMPTY = { char: '', strokes: [], medians: [] };

  function init({ root, vocab }) {
    const opts = { paper: 'A4', grid: 'tian', rows: 2, ...store.get() };
    const pageSize = document.head.appendChild($('style'));

    const bar = $('div', 'sheet-bar');
    const choose = (label, key, choices) => {
      const sel = $('select', null, choices.map(([v, text]) => `<option value="${v}"${String(opts[key]) === String(v) ? ' selected' : ''}>${text}</option>`).join(''));
      sel.addEventListener('change', () => {
        opts[key] = key === 'rows' ? +sel.value : sel.value;
        store.set(opts);
        paint();
      });
      const lab = $('label', null, `${label} `);
      lab.append(sel);
      return lab;
    };
    const print = $('button', 'btn primary', 'Print');
    print.type = 'button';
    print.addEventListener('click', () => window.print());
    bar.append(
      choose('Paper', 'paper', [['A4', 'A4'], ['letter', 'US Letter']]),
      choose('Boxes', 'grid', [['tian', '田字格'], ['mi', '米字格']]),
      choose('Empty rows', 'rows', [[1, '1'], [2, '2'], [3, '3']]),
      print,
    );

    const sheet = $('div', 'sheet');
    sheet.innerHTML = '<p class="sheet-name"><span>Name</span><span>Date</span></p>';
    const body = $('div');
    sheet.append(body);
    root.append(bar, sheet);

    let datas = [];
    Promise.all([...vocab.write].map(Strokes.load))
      .then(list => { datas = list; paint(); })
      .catch(e => { body.textContent = e.message; });

    function paint() {
      pageSize.textContent = `@page { size: ${opts.paper}; margin: 12mm; }`;
      const grid = opts.grid === 'mi' ? 'mi' : true;
      const box = (svg, cls = '') => `<div class="sheet-box${cls}">${svg}</div>`;
      const empty = () => box(Strokes.svg(EMPTY, { grid, title: 'Empty box' }));
      const row = boxes => `<div class="sheet-row">${boxes.join('')}</div>`;
      body.innerHTML = datas.map(d => {
        const n = d.strokes.length;
        const w = Strokes.word(vocab, d.char);
        const steps = d.strokes.map((_, i) => box(Strokes.svg(d, { upto: i + 1, mark: true, grid, title: `${d.char}, stroke ${i + 1}` })));
        const trace = Array.from({ length: COLS }, (_, i) => i < TRACE
          ? box(Strokes.svg(d, { upto: 0, ghost: true, grid, title: `${d.char} to trace` }), ` fade-${i}`)
          : empty());
        const rows = Array.from({ length: opts.rows }, () => row(Array.from({ length: COLS }, empty)));
        return `<section class="sheet-char">
          <div class="sheet-head">
            <div class="sheet-model">${Strokes.svg(d, { numbers: true, grid })}</div>
            <div>
              <p class="sheet-word">${w ? `${zh(w.hanzi, w.jyutping)} <span class="sheet-en">${esc(w.english)}</span>` : ''}</p>
              <p class="sheet-count">${n} stroke${n === 1 ? '' : 's'}: follow the numbers.</p>
            </div>
          </div>
          ${row(steps)}
          <div class="sheet-practice">${row(trace)}${rows.join('')}</div>
        </section>`;
      }).join('');
    }
  }

  window.Sheet = { init };
})();
