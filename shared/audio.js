/*
 * audio.js — play Cantonese audio clips.
 *
 *   Speak.play(src, text)   Play the MP3 at `src`, or an array of MP3s one
 *                           after another. If a clip is missing or fails,
 *                           speak `text` with the browser's zh-HK voice
 *                           instead (if the device has one). Returns a
 *                           Promise that resolves when playback finishes
 *                           or is stopped; it never rejects.
 *   Speak.stop()            Stop whatever is playing.
 *
 * Only one clip plays at a time; starting a new one stops the last.
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
        const fail = () => { if (!failed && mine === token) { failed = true; fallback(text, done); } };
        a.addEventListener('ended', () => setTimeout(() => next(i + 1), GAP_MS));
        a.addEventListener('error', fail);
        const p = a.play();
        if (p) p.catch(err => { if (err.name !== 'AbortError') fail(); });
      };
      next(0);
    });
  }

  window.Speak = { play, stop };
})();
