/*
 * sayit.js — Say it back: speaking practice for any unit. Hear a word,
 * record yourself, and compare your pitch curve with the model's.
 * Needs core.js, audio.js, pitch.js. Styles: sayit.css.
 *
 *   SayIt.init({
 *     root, key,       element; localStorage key (e.g. "u7-say")
 *     pool,            vocab entries to practise (with audio; picture optional)
 *   })
 *
 *   SayIt.practice(entry)   just the speaking part, for other games
 *                    (Tiles.round's `say`): ▶ Listen, ● Record, ▶ Me,
 *                    ▶ Both and the pitch chart. Returns { el, stop };
 *                    call stop() when it goes away, to end a recording.
 *
 * Recordings stay in the browser (never uploaded). Words marked
 * "Sounds right" are saved under `key` as { got: [ids] }. A recording
 * stops by itself after 4 s, or longer for a long sentence.
 */
(function () {
  const { el: $, esc, audioSrc, imgSrc } = Canto;
  const maxSeconds = e => Math.max(4, 1.5 + 0.5 * e.jyutping.split(' ').length);
  const canRecord = () => !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
  const models = {};
  const model = e => (models[audioSrc(e)] ||= Pitch.fromUrl(audioSrc(e)).catch(() => []));

  const button = (html, cls, onClick) => {
    const b = $('button', 'btn' + (cls ? ' ' + cls : ''), html);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  };

  function practice(entry) {
    let mine = null;       // { url, blob, contour }: the latest recording
    let recorder = null;
    let gone = false;

    const box = $('div', 'pitch-box');
    const rec = button('● Record', 'rec', () => (recorder ? stopRecording() : startRecording()));
    const me = button('▶ Me', '', () => mine && Speak.play(mine.url));
    const both = button('▶ Both', '', () => mine && Speak.play([audioSrc(entry), mine.url]));
    rec.disabled = !canRecord();
    me.disabled = both.disabled = true;
    const actions = $('div', 'say-actions');
    actions.append(button('▶ Listen', 'primary', () => Canto.play(entry)), rec, me, both);
    const el = $('div', 'say-practice');
    el.append(actions);
    if (!canRecord()) el.append($('p', 'feedback', 'Recording is not available in this browser. You can still listen and see the pitch of the model voice.'));
    el.append(box);

    async function chart() {
      const lines = [{ segments: await model(entry), cls: 'model' }];
      if (gone) return;
      if (mine?.contour) lines.push({ segments: mine.contour, cls: 'mine' });
      box.innerHTML = Pitch.svg(lines) +
        `<p class="pitch-legend"><span class="key model"></span>Model <span class="key mine"></span>You${mine?.contour?.length === 0 ? ' (no voice heard, try again closer to the mic)' : ''}</p>`;
    }

    async function startRecording() {
      Speak.stop();
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      } catch (err) {
        box.innerHTML = '<p class="feedback bad">Microphone access was blocked. Allow it in your browser settings to record.</p>';
        return;
      }
      if (gone) return stream.getTracks().forEach(t => t.stop());
      const chunks = [];
      const r = new MediaRecorder(stream);
      recorder = r;
      rec.innerHTML = '■ Stop';
      rec.classList.add('recording');
      r.ondataavailable = ev => chunks.push(ev.data);
      r.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        if (recorder === r) recorder = null;
        rec.innerHTML = '● Record';
        rec.classList.remove('recording');
        if (gone) return;
        const blob = new Blob(chunks, { type: r.mimeType });
        if (mine) URL.revokeObjectURL(mine.url);
        mine = { blob, url: URL.createObjectURL(blob), contour: null };
        me.disabled = both.disabled = false;
        try { mine.contour = await Pitch.fromBlob(blob); } catch (err) { mine.contour = []; }
        chart();
      };
      r.start();
      r.timer = setTimeout(stopRecording, maxSeconds(entry) * 1000);
    }

    function stopRecording() {
      if (!recorder) return;
      clearTimeout(recorder.timer);
      if (recorder.state !== 'inactive') recorder.stop();
    }

    function stop() {
      gone = true;
      stopRecording();
      if (mine) URL.revokeObjectURL(mine.url);
    }

    chart();
    return { el, stop };
  }

  function init({ root, key, pool }) {
    const store = Canto.store(key, { got: [] });
    const saved = store.get();
    if (!Array.isArray(saved.got)) saved.got = [];
    let index = 0;
    let current = null;    // practice() for the word shown

    const chips = $('div', 'say-chips');
    const card = $('div', 'say-card');
    const progress = $('p', 'say-progress');
    root.replaceChildren(
      $('div', 'tip', `<strong>How to practise:</strong> listen, press <strong>● Record</strong> and say the word, then compare.
        The chart shows the pitch of each voice. Tones are pitch shapes, so try to match the <em>shape</em> of the line
        (level, rising, falling), not its height. Recordings stay on your device.`),
      progress, chips, card);

    function paintChips() {
      chips.replaceChildren(...pool.map((e, i) => {
        const b = $('button', 'say-chip hanzi', esc(e.hanzi));
        b.type = 'button';
        b.lang = 'zh-HK';
        b.title = e.english;
        if (saved.got.includes(e.id)) b.classList.add('got');
        if (i === index) b.setAttribute('aria-current', 'true');
        b.addEventListener('click', () => show(i));
        return b;
      }));
      progress.textContent = `${pool.filter(e => saved.got.includes(e.id)).length} of ${pool.length} sound right`;
    }

    function show(i) {
      current?.stop();
      Speak.stop();
      index = (i + pool.length) % pool.length;
      const e = pool[index];

      const head = $('div', 'say-word');
      if (e.img !== false) {
        const img = $('img');
        img.src = imgSrc(e);
        img.alt = '';
        head.append(img);
      }
      head.append($('div', null, `${Canto.zh(e.hanzi, e.jyutping)}<span class="en">${esc(e.english)}</span>`));
      current = practice(e);

      const got = saved.got.includes(e.id);
      const rate = $('div', 'say-rate');
      rate.append(
        button(got ? '✓ Sounds right' : 'Sounds right', got ? 'good' : '', () => mark(e, true)),
        button('Needs practice', '', () => mark(e, false)),
      );
      const nav = $('div', 'say-nav');
      nav.append(button('← Prev', '', () => show(index - 1)), button('Next →', '', () => show(index + 1)));

      card.replaceChildren(head, current.el, rate, nav);
      paintChips();
    }

    function mark(e, ok) {
      saved.got = saved.got.filter(id => id !== e.id);
      if (ok) saved.got.push(e.id);
      store.set(saved);
      show(ok ? index + 1 : index);
    }

    show(0);
  }

  window.SayIt = { init, practice };
})();
