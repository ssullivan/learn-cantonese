/*
 * core.js — helpers shared by learn.js, game.js and unit scripts.
 * Load first. Needs audio.js for play().
 *
 *   Canto.el(tag, cls?, html?)   create an element
 *   Canto.esc(text)              HTML-escape
 *   Canto.jyutping("haa1 gaau2") HTML with tone digits in <sup>
 *   Canto.zh(hanzi, jyutping)    HTML: characters followed by jyutping
 *   Canto.tones("haa1 gaau2")    tone number of each syllable: [1, 2]
 *   Canto.toneChart()            HTML table of the six tones (.tone-chart):
 *                                contour, number, name, example word
 *   Canto.shuffle(list)          shuffled copy
 *   Canto.pick(list, n)          n random items
 *   Canto.confusable(e, pool, count)
 *                                `count` other entries from `pool` (entries
 *                                with a value `n`) to offer as wrong answers:
 *                                those easy to mix up with e.n first
 *                                (Canto.near, so load numbers.js), then any
 *                                others
 *   Canto.imgSrc(entry)          "img/<id>.svg"
 *   Canto.audioSrc(entry)        "audio/<id>.mp3"; both use ../unit<n>/ for
 *                                an entry borrowed from unit n (Units.word)
 *   Canto.play(entries)          play one entry's clip, or several in a row;
 *                                resolves when done (see Speak.play)
 *   Canto.entries(vocab)         every entry from every list in a vocab object
 *   Canto.picButton(entry)       picture-only answer <button data-id> (.pic-btn)
 *   Canto.speech(who, html, onReplay?)
 *                                speech bubble (.speech, game.css): a round
 *                                badge with one character `who` (客 customer,
 *                                你 you...), the text, and a "▶ Again" button
 *   Canto.store(key, blank)      { get(), set(value) } over localStorage;
 *                                get() returns `blank` if nothing is saved
 */
(function () {
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const jyutping = s => esc(s).replace(/([a-z]+)([1-6])/g, '$1<sup>$2</sup>');

  const zh = (hanzi, jp) => `<span class="hanzi" lang="zh-HK">${esc(hanzi)}</span> <span class="jp">${jyutping(jp)}</span>`;

  const tones = jp => jp.split(' ').map(syl => +syl.slice(-1));

  // Pitch contours on the usual 1 (low) – 5 (high) scale.
  const TONES = [
    { n: 1, pitch: [5, 5], name: 'high level', eg: ['詩', 'si1', 'poem'] },
    { n: 2, pitch: [2, 5], name: 'high rising', eg: ['史', 'si2', 'history'] },
    { n: 3, pitch: [3, 3], name: 'mid level', eg: ['試', 'si3', 'try'] },
    { n: 4, pitch: [2, 1], name: 'low falling', eg: ['時', 'si4', 'time'] },
    { n: 5, pitch: [2, 3], name: 'low rising', eg: ['市', 'si5', 'market'] },
    { n: 6, pitch: [2, 2], name: 'low level', eg: ['事', 'si6', 'matter'] },
  ];

  function contour([a, b]) {
    const y = v => 22 - v * 4;
    return `<svg viewBox="0 0 40 24" width="40" height="24" aria-hidden="true">
      <line x1="2" y1="${y(1)}" x2="38" y2="${y(1)}" stroke="currentColor" opacity=".15"/>
      <line x1="2" y1="${y(5)}" x2="38" y2="${y(5)}" stroke="currentColor" opacity=".15"/>
      <line x1="4" y1="${y(a)}" x2="36" y2="${y(b)}" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/></svg>`;
  }

  const toneChart = () => `<table class="tone-chart"><tbody>${TONES.map(t =>
    `<tr><td>${contour(t.pitch)}</td><td><strong>${t.n}</strong> ${t.name}</td><td>${zh(t.eg[0], t.eg[1])} ${t.eg[2]}</td></tr>`).join('')}</tbody></table>`;

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const pick = (list, n) => shuffle(list).slice(0, n);

  function confusable(e, pool, count) {
    const byN = new Map(pool.map(x => [x.n, x]));
    const close = shuffle(Canto.near(e.n).filter(m => byN.has(m))).map(m => byN.get(m));
    const rest = shuffle(pool.filter(x => x !== e && !close.includes(x)));
    return [...close, ...rest].slice(0, count);
  }

  const home = entry => entry.unit ? `../unit${entry.unit}/` : '';
  const imgSrc = entry => `${home(entry)}img/${entry.id}.svg`;
  const audioSrc = entry => `${home(entry)}audio/${entry.id}.mp3`;

  function play(entries) {
    const list = [].concat(entries);
    return Speak.play(list.map(audioSrc), list.map(e => e.say || e.hanzi).join('，'));
  }

  function picButton(entry) {
    const b = el('button', 'pic-btn');
    b.type = 'button';
    b.dataset.id = entry.id;
    b.setAttribute('aria-label', entry.english);
    const img = el('img');
    img.src = imgSrc(entry);
    img.alt = '';
    b.append(img);
    return b;
  }

  function speech(who, html, onReplay) {
    const b = el('div', 'speech');
    const badge = el('span', 'who hanzi', esc(who));
    badge.lang = 'zh-HK';
    b.append(badge, el('p', null, html));
    if (onReplay) {
      const again = el('button', 'btn small', '▶ Again');
      again.type = 'button';
      again.addEventListener('click', onReplay);
      b.append(again);
    }
    return b;
  }

  const entries = vocab => Object.values(vocab).filter(Array.isArray).flat();

  function store(key, blank) {
    return {
      get() {
        try {
          const v = JSON.parse(localStorage.getItem(key));
          if (v && typeof v === 'object') return v;
        } catch (e) { /* storage unavailable */ }
        return structuredClone(blank);
      },
      set(value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
      },
    };
  }

  window.Canto = { el, esc, jyutping, zh, tones, toneChart, shuffle, pick, confusable, imgSrc, audioSrc, play, picButton, speech, entries, store };
})();
