/*
 * audio.js — play Cantonese audio clips.
 *
 *   Speak.play(src, text)   Play the MP3 at `src`. If it is missing or
 *                           fails, speak `text` with the browser's zh-HK
 *                           voice instead (if the device has one).
 *   Speak.stop()            Stop whatever is playing.
 *
 * Only one clip plays at a time; starting a new one stops the last.
 * Clips come from tools/tts.mjs, which writes unit<N>/audio/<id>.mp3.
 */
(function () {
  let current = null;

  function stop() {
    if (current) {
      current.pause();
      current = null;
    }
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  function fallback(text) {
    if (!text || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-HK';
    const voice = speechSynthesis.getVoices().find(v => /zh[-_]HK|yue/i.test(v.lang));
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  }

  function play(src, text) {
    stop();
    const a = new Audio(src);
    current = a;
    const fail = () => { if (current === a) { current = null; fallback(text); } };
    a.addEventListener('error', fail);
    const p = a.play();
    if (p) p.catch(err => { if (err.name !== 'AbortError') fail(); });
  }

  window.Speak = { play, stop };
})();
