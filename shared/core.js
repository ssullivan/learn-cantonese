/*
 * core.js — helpers shared by learn.js, game.js and unit scripts.
 * Load first. Needs audio.js for play().
 *
 *   Canto.el(tag, cls?, html?)   create an element
 *   Canto.esc(text)              HTML-escape
 *   Canto.tagZh(text)            HTML-escaped text with each run of Chinese
 *                                in <span lang="zh-HK">, so it gets the
 *                                Chinese font first (a heading on a device
 *                                with no Chinese font shows boxes
 *                                otherwise) and Hong Kong glyphs
 *   Canto.jyutping("haa1 gaau2") HTML with tone digits in <sup>
 *   Canto.zh(hanzi, jyutping)    HTML: the characters and their jyutping
 *                                (span.zh > span.hanzi + span.jp). Each
 *                                character also carries its syllable as
 *                                ruby: theme.css shows it over the
 *                                character in words on their own on wide
 *                                screens, and the jyutping after the word
 *                                elsewhere (see "Chinese with Jyutping")
 *   Canto.pairs(hanzi, jyutping) [[character, syllable or null]], or null
 *                                if the characters and syllables don't pair
 *                                up one to one (卅 saa1 aa6)
 *   Canto.tones("haa1 gaau2")    tone number of each syllable: [1, 2]
 *   Canto.toneChart()            HTML table of the six tones (.tone-chart):
 *                                contour, number, name, example word
 *   Canto.shuffle(list)          shuffled copy
 *   Canto.pick(list, n)          n random items
 *   Canto.deck()                 draw(pool): one random item of `pool`, each
 *                                drawn once before any comes again, and never
 *                                the same twice in a row (unless it is all the
 *                                pool has). Items are told apart by id (by
 *                                themselves if they have none), so a pool
 *                                filtered afresh each time still works, and
 *                                one deck can serve several pools
 *   Canto.confusable(e, pool, count)
 *                                `count` other entries from `pool` (entries
 *                                with a value `n`) to offer as wrong answers:
 *                                those easy to mix up with e.n first
 *                                (Canto.near, so load numbers.js), then any
 *                                others
 *   Canto.imgSrc(entry)          "img/<id>.svg"
 *   Canto.audioSrc(entry)        "audio/<id>.mp3"; both use ../unit<n>/ for
 *                                an entry borrowed from unit n (Units.word),
 *                                and `file` for the name when it is set (a
 *                                word borrowed under another id)
 *   Canto.play(entries)          play one entry's clip, or several in a row;
 *                                resolves when done (see Speak.play)
 *   Canto.entries(vocab)         every entry from every list in a vocab object
 *   Canto.picButton(entry, label = 'none')
 *                                picture answer <button data-id> (.pic-btn),
 *                                with the entry's Chinese under it (.pic-label):
 *                                label 'none' hides it, 'hanzi' shows the
 *                                characters, 'both' adds the Jyutping
 *   Canto.showLabels(el)         show every .pic-btn label in `el` in full
 *                                (characters and Jyutping), once answered
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

  // Characters and full-width punctuation (，？！ and the like).
  const tagZh = s => esc(s).replace(/[\p{Script=Han}\u3000-\u303f\uff00-\uffef]+/gu, m => `<span lang="zh-HK">${m}</span>`);

  const jyutping = s => esc(s).replace(/([a-z]+)([1-6])/g, '$1<sup>$2</sup>');

  // Characters paired with their syllables: [[char, syllable or null]], a
  // Han character taking the next syllable and anything else (punctuation)
  // none; null if the counts differ (卅 is saa1 aa6).
  const isHan = c => /\p{Script=Han}/u.test(c);
  function pairs(hanzi, jp) {
    const sylls = jp.split(' ').filter(Boolean);
    const chars = [...hanzi];
    if (chars.filter(isHan).length !== sylls.length) return null;
    let k = 0;
    return chars.map(c => [c, isHan(c) ? sylls[k++] : null]);
  }

  // Both forms in one: each character with its syllable as ruby, and the
  // Jyutping after the word. theme.css shows the ruby only in words on
  // their own on wide screens, and the Jyutping after the word elsewhere.
  function zh(hanzi, jp) {
    const p = pairs(hanzi, jp);
    // <wbr>: a line may break before a character, as in plain Chinese text
    // (a run of <ruby> elements has no break opportunities of its own), but
    // never before punctuation, which stays with the character before it.
    const chars = p ? p.map(([c, syl], i) => syl ? `${i ? '<wbr>' : ''}<ruby>${esc(c)}<rt>${jyutping(syl)}</rt></ruby>` : esc(c)).join('') : esc(hanzi);
    return `<span class="zh${p ? '' : ' zh-flat'}"><span class="hanzi" lang="zh-HK">${chars}</span> <span class="jp">${jyutping(jp)}</span></span>`;
  }

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

  function deck() {
    const drawn = new Set();
    let last;
    const keyOf = item => item?.id ?? item;
    return pool => {
      let fresh = pool.filter(x => !drawn.has(keyOf(x)));
      if (!fresh.length) {
        pool.forEach(x => drawn.delete(keyOf(x)));
        fresh = pool;
      }
      const notLast = fresh.filter(x => keyOf(x) !== last);
      const [item] = pick(notLast.length ? notLast : fresh, 1);
      drawn.add(last = keyOf(item));
      return item;
    };
  }

  function confusable(e, pool, count) {
    const byN = new Map(pool.map(x => [x.n, x]));
    const close = shuffle(Canto.near(e.n).filter(m => byN.has(m))).map(m => byN.get(m));
    const rest = shuffle(pool.filter(x => x !== e && !close.includes(x)));
    return [...close, ...rest].slice(0, count);
  }

  const home = entry => entry.unit ? `../unit${entry.unit}/` : '';
  const imgSrc = entry => `${home(entry)}img/${entry.file ?? entry.id}.svg`;
  const audioSrc = entry => `${home(entry)}audio/${entry.file ?? entry.id}.mp3`;

  function play(entries) {
    const list = [].concat(entries);
    return Speak.play(list.map(audioSrc), list.map(e => e.say || e.hanzi));
  }

  function picButton(entry, label = 'none') {
    const b = el('button', 'pic-btn');
    b.type = 'button';
    b.dataset.id = entry.id;
    b.dataset.label = label;
    b.setAttribute('aria-label', entry.english);
    const img = el('img');
    img.src = imgSrc(entry);
    img.alt = '';
    b.append(img, el('span', 'pic-label', zh(entry.hanzi, entry.jyutping)));
    return b;
  }

  const showLabels = root => root.querySelectorAll('.pic-btn').forEach(b => { b.dataset.label = 'both'; });

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

  window.Canto = { el, esc, tagZh, jyutping, zh, pairs, tones, toneChart, shuffle, pick, deck, confusable, imgSrc, audioSrc, play, picButton, showLabels, speech, entries, store };
})();
