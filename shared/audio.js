/*
 * audio.js — play Cantonese audio clips.
 *
 *   Speak.play(src, text)   Play the MP3 at `src`, or an array of MP3s one
 *                           after another. If a clip is missing or fails,
 *                           speak `text` with the browser's zh-HK voice
 *                           instead (if the device has one). With an array
 *                           of texts, one per clip, only the failed clip's
 *                           text is spoken and the rest still play; with
 *                           one text, it is spoken and playing ends. Returns a
 *                           Promise that resolves when playback finishes
 *                           or is stopped; it never rejects.
 *   Speak.stop()            Stop whatever is playing.
 *   Speak.chime()           The sound of a right answer: two soft rising
 *                           notes (G5, D6), made with Web Audio, about
 *                           0.25 s. Silent if the reader turned it off or
 *                           the browser has no Web Audio. Returns a Promise
 *                           that resolves when it ends (at once if silent).
 *                           Plays alongside a clip, not instead of it.
 *   Speak.chimeToggle()     Add a "♪ Chime: on / off" button to the page's
 *                           .page-header (once); the choice is saved for
 *                           the whole site under localStorage `sound`.
 *
 * Only one clip plays at a time; starting a new one stops the last.
 * Needs core.js (Canto.store) for the chime setting.
 * Clips come from tools/tts.mjs, which writes unit<N>/audio/<id>.mp3.
 */
(function () {
  const GAP_MS = 180;
  let token = 0;
  let current = null;
  let finish = null;

  function stop() {
    token++;
    if (current) current.pause();
    current = null;
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (finish) finish();
    finish = null;
  }

  function fallback(text, done) {
    if (!text || !window.speechSynthesis) return done();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-HK';
    const voice = speechSynthesis.getVoices().find(v => /zh[-_]HK|yue/i.test(v.lang));
    if (voice) u.voice = voice;
    u.onend = u.onerror = done;
    speechSynthesis.speak(u);
  }

  function play(src, text) {
    stop();
    const mine = token;
    const srcs = [].concat(src);
    return new Promise(resolve => {
      finish = resolve;
      const done = () => { if (mine === token) { finish = null; current = null; resolve(); } };
      const next = i => {
        if (mine !== token) return;
        if (i >= srcs.length) return done();
        const a = new Audio(srcs[i]);
        current = a;
        let failed = false;
        const fail = () => {
          if (failed || mine !== token) return;
          failed = true;
          if (Array.isArray(text)) fallback(text[i], () => next(i + 1));
          else fallback(text, done);
        };
        a.addEventListener('ended', () => setTimeout(() => next(i + 1), GAP_MS));
        a.addEventListener('error', fail);
        const p = a.play();
        if (p) p.catch(err => { if (err.name !== 'AbortError') fail(); });
      };
      next(0);
    });
  }

  // The chime: each note [frequency Hz, start s], each NOTE_S long, at
  // CHIME_GAIN (clips are near full scale; the chime should sit under them).
  const CHIME_NOTES = [[783.99, 0], [1174.66, 0.09]];
  const NOTE_S = 0.16;
  const CHIME_GAIN = 0.18;
  const sound = Canto.store('sound', { chime: true });
  let audioCtx = null;

  function chime() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC || sound.get().chime === false) return Promise.resolve();
    try {
      audioCtx ||= new AC();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t0 = audioCtx.currentTime + 0.01;
      CHIME_NOTES.forEach(([freq, at]) => {
        const start = t0 + at;
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(CHIME_GAIN, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + NOTE_S);
        gain.connect(audioCtx.destination);
        // A sine with a quieter triangle an octave up: bell-like, not buzzy.
        [['sine', 1, 1], ['triangle', 2, 0.15]].forEach(([type, mult, level]) => {
          const osc = audioCtx.createOscillator();
          const mix = audioCtx.createGain();
          osc.type = type;
          osc.frequency.value = freq * mult;
          mix.gain.value = level;
          osc.connect(mix).connect(gain);
          osc.start(start);
          osc.stop(start + NOTE_S + 0.02);
        });
      });
      const ms = (CHIME_NOTES.at(-1)[1] + NOTE_S) * 1000;
      return new Promise(resolve => setTimeout(resolve, ms));
    } catch (e) {
      return Promise.resolve();
    }
  }

  function chimeToggle() {
    const header = document.querySelector('.page-header');
    if (!header || header.querySelector('.chime-toggle')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chime-toggle';
    b.title = 'The sound for a right answer';
    const paint = () => {
      const on = sound.get().chime !== false;
      b.textContent = on ? '♪ Chime: on' : '♪ Chime: off';
    };
    b.addEventListener('click', () => {
      sound.set({ chime: sound.get().chime === false });
      paint();
    });
    paint();
    header.prepend(b);
  }

  window.Speak = { play, stop, chime, chimeToggle };
})();
