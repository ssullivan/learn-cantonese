/*
 * game.js — engine for level-based games. Needs core.js, audio.js.
 * Styles: game.css.
 *
 *   Game.init({
 *     root,        element to render into
 *     key,         localStorage key, unique across the site (e.g. "u1-trolley")
 *     intro,       HTML for the "How to play" box on the level menu
 *     levels: [{
 *       id, name, blurb,
 *       rounds,    rounds per play
 *       time,      seconds per round (0 = untimed)
 *       round(stage, ctx, n)   render round n into `stage`. Set ctx.answer
 *                  (HTML naming the right answer, shown after the round)
 *                  and call ctx.done(correct) once. Optionally set
 *                  ctx.reveal() to highlight the right answer; it runs
 *                  however the round ends (incl. time-outs). May return a Promise
 *                  (e.g. from ctx.play); the timer starts when it resolves.
 *     }],
 *   })
 *
 * ctx: { level, done(correct), answer, reveal, play(entries) }
 *
 * Scoring: a right answer is worth 100, plus up to 50 for speed on timed
 * levels, plus 10 per answer in the current streak (max +50).
 * Stars: 1 at 50% right, 2 at 80%, 3 for all right. A level unlocks when
 * the one before it has a star. Best score and stars per level are saved.
 */
(function () {
  const { el: $ } = Canto;
  const AUTO_NEXT_MS = 1200;

  const starsFor = (right, total) => right === total ? 3 : right >= total * 0.8 ? 2 : right >= total * 0.5 ? 1 : 0;
  const starText = n => '★'.repeat(n) + '☆'.repeat(3 - n);

  function init({ root, key, intro, levels }) {
    const store = Canto.store(key, { best: {} });
    const saved = store.get();
    if (!saved.best) saved.best = {};

    const unlocked = i => i === 0 || (saved.best[levels[i - 1].id]?.stars ?? 0) > 0;

    function button(label, cls, onClick) {
      const b = $('button', 'btn' + (cls ? ' ' + cls : ''), label);
      b.type = 'button';
      b.addEventListener('click', onClick);
      return b;
    }

    function menu() {
      Speak.stop();
      const list = $('div', 'level-list');
      levels.forEach((lv, i) => {
        const best = saved.best[lv.id];
        const open = unlocked(i);
        const b = $('button', 'level');
        b.type = 'button';
        b.disabled = !open;
        b.innerHTML = `<span class="level-num">${i + 1}</span>
          <span class="level-text"><strong>${Canto.esc(lv.name)}</strong><span>${Canto.esc(lv.blurb)}</span></span>
          <span class="level-best">${open
            ? (best ? `<span class="stars">${starText(best.stars)}</span>${best.score}` : 'New')
            : 'Locked'}</span>`;
        b.addEventListener('click', () => play(i));
        list.append(b);
      });
      const how = $('div', 'tip', intro);
      root.replaceChildren(how, list);
    }

    function play(li) {
      const level = levels[li];
      let n = 0, score = 0, right = 0, streak = 0;
      let timer = null;
      let alive = true;

      const hud = $('div', 'hud');
      const pills = $('div', 'hud-pills');
      const quit = button('✕ Levels', 'small', () => { alive = false; stopTimer(); menu(); });
      hud.append(pills, quit);
      const bar = $('div', 'timer');
      const fill = $('div', 'timer-fill');
      bar.append(fill);
      bar.hidden = !level.time;
      const stage = $('div', 'stage');
      const fb = $('div', 'game-feedback');
      fb.setAttribute('aria-live', 'polite');
      root.replaceChildren(hud, bar, stage, fb);
      root.scrollIntoView({ block: 'start' });

      const paintHud = () => {
        pills.innerHTML = `<span class="pill">${Canto.esc(level.name)}</span>
          <span class="pill">${n + 1} / ${level.rounds}</span>
          <span class="pill">Score ${score}</span>
          ${streak > 1 ? `<span class="pill streak">Streak ${streak}</span>` : ''}`;
      };

      function stopTimer() {
        if (timer) cancelAnimationFrame(timer.raf);
        timer = null;
      }

      function startTimer(ctx) {
        if (!level.time || ctx.finished || !alive) return;
        const t0 = performance.now();
        const ms = level.time * 1000;
        timer = { t0, ms, raf: 0 };
        const tick = now => {
          if (!timer) return;
          const left = Math.max(0, 1 - (now - t0) / ms);
          fill.style.transform = `scaleX(${left})`;
          fill.classList.toggle('low', left < 0.3);
          if (left <= 0) return ctx.done(false, true);
          timer.raf = requestAnimationFrame(tick);
        };
        timer.raf = requestAnimationFrame(tick);
      }

      function next() {
        if (n >= level.rounds) return end();
        paintHud();
        fb.replaceChildren();
        fb.className = 'game-feedback';
        stage.classList.remove('locked');
        fill.style.transform = 'scaleX(1)';
        fill.classList.remove('low');

        const ctx = {
          level,
          answer: '',
          reveal: null,
          finished: false,
          play: Canto.play,
          done(correct, timedOut = false) {
            if (ctx.finished) return;
            ctx.finished = true;
            const left = timer ? Math.max(0, 1 - (performance.now() - timer.t0) / timer.ms) : 0;
            stopTimer();
            stage.classList.add('locked');
            if (ctx.reveal) ctx.reveal();
            let gained = 0;
            if (correct) {
              right++;
              streak++;
              gained = 100 + Math.round(50 * left) + 10 * Math.min(streak - 1, 5);
              score += gained;
            } else {
              streak = 0;
            }
            n++;
            paintHud();
            fb.className = 'game-feedback feedback ' + (correct ? 'good' : 'bad');
            fb.innerHTML = `<strong>${correct ? `好！ +${gained}` : timedOut ? 'Too slow!' : 'Not quite.'}</strong> ${ctx.answer}`;
            const go = button(n < level.rounds ? 'Next →' : 'See score', 'primary', next);
            fb.append(go);
            if (correct) {
              const auto = setTimeout(next, AUTO_NEXT_MS);
              go.addEventListener('click', () => clearTimeout(auto), { once: true });
              quit.addEventListener('click', () => clearTimeout(auto), { once: true });
            } else {
              go.focus();
            }
          },
        };
        Promise.resolve(level.round(stage, ctx, n)).then(() => startTimer(ctx));
      }

      function end() {
        Speak.stop();
        const stars = starsFor(right, level.rounds);
        const prev = saved.best[level.id];
        const isBest = !prev || score > prev.score;
        if (isBest || stars > (prev?.stars ?? 0)) {
          saved.best[level.id] = { score: Math.max(score, prev?.score ?? 0), stars: Math.max(stars, prev?.stars ?? 0) };
          store.set(saved);
        }
        const box = $('div', 'game-end');
        box.innerHTML = `<p class="stars big">${starText(stars)}</p>
          <p class="end-score">${score}</p>
          <p>${right} of ${level.rounds} right${isBest && score > 0 ? ' · <strong>New best!</strong>' : ''}</p>
          <p>${stars === 3 ? '好叻！ Perfect!' : stars ? '做得好！ Well done!' : 'Get half right to earn a star and unlock the next level.'}</p>`;
        const actions = $('div', 'end-actions');
        actions.append(button('Play again', '', () => play(li)));
        if (li + 1 < levels.length && unlocked(li + 1)) actions.append(button('Next level →', 'primary', () => play(li + 1)));
        actions.append(button('All levels', '', menu));
        box.append(actions);
        root.replaceChildren(box);
      }

      next();
    }

    menu();
  }

  window.Game = { init };
})();
