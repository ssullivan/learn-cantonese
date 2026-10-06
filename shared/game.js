/*
 * game.js — engine for level-based games. Needs core.js, audio.js.
 * Styles: game.css.
 *
 *   Game.init({
 *     root,        element to render into
 *     key,         localStorage key, unique across the site (e.g. "u7-trolley")
 *     intro,       HTML for the "How to play" box on the level menu
 *     levels: [{
 *       id, name, blurb,
 *       rounds,    rounds per play
 *       time,      seconds per round (0 = untimed)
 *       labels,    'none' (default), 'hanzi' or 'both': the Chinese under
 *                  picture answers (Canto.picButton), as ctx.labels; levels
 *                  can drop them as they get harder
 *       round(stage, ctx, n)   render round n into `stage`. Set ctx.answer
 *                  (HTML naming the right answer, shown after the round)
 *                  and call ctx.done(correct) once. Optionally set
 *                  ctx.reveal() to highlight the right answer; it runs
 *                  however the round ends (incl. time-outs). May return a Promise
 *                  (e.g. from ctx.play); the timer starts when it resolves.
 *                  To keep something to do after answering, set ctx.after
 *                  (e.g. SayIt.practice's { el, stop }): el shows under
 *                  the answer, the round waits for Next instead of moving
 *                  on by itself, and stop() runs when it is left.
 *     }],
 *   })
 *
 * ctx: { level, labels, done(correct), answer, reveal, after, play(entries) }
 *
 * Helpers for rounds:
 *   Game.choose(ctx, answer, options, label, gridCls = 'choice-grid')
 *                a grid of .choice buttons, one per option (entries with
 *                an id), showing label(option) HTML. Tapping one ends the
 *                round (right if it is `answer`); sets ctx.reveal, keeping
 *                one set before it (Game.playOnReveal)
 *   Game.pic(entry, className?)
 *                HTML for the entry's picture, its English as alt text
 *                (with class `className` if given)
 *   Game.playOnReveal(ctx, entry)
 *                say the entry when the round's answer is shown, besides
 *                what ctx.reveal does; before or after Game.choose
 *   Game.answerText(entry)   HTML for ctx.answer: "三點半 saam1… is 3:30."
 *                plus the entry's note
 *   Game.chart([[entry, yes], ...], label)
 *                a chart (.chart, game.css) of the entries' pictures, each
 *                ticked (yes) or crossed: a patient's chart, a survey
 *                sheet. label names it for screen readers
 *   Game.mark(yes)           HTML for a ✓ or ✗ badge (.mark), to put on a
 *                .chart-item or a .pic-grid.pics answer
 *   Game.celebrate(kind)     'fireworks' or 'petals' (bauhinia, the site's
 *                flower) over the page for a few seconds, on a canvas
 *                (.celebrate) that ignores taps; nothing if the reader
 *                prefers reduced motion. Returns a stop function
 *
 * A round's timer stands still while the page is hidden.
 *
 * Scoring: a right answer is worth 100, plus up to 50 for speed on timed
 * levels, plus 10 per answer in the current streak (max +50).
 * Stars: 1 at 50% right, 2 at 80%, 3 for all right. A level unlocks when
 * the one before it has a star. Best score and stars per level are saved.
 * A perfect level celebrates: fireworks the first time, petals after, and
 * 好叻呀！ (CHEER, unit 1's word) is said.
 */
(function () {
  const { el: $ } = Canto;
  const AUTO_NEXT_MS = 1200;
  let party = null;  // stops the celebration on screen
  // The round's timer stands still while the page is hidden (another app,
  // another tab): its start moves on by the time spent away.
  let running = null, hiddenAt = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hiddenAt = performance.now();
    else if (running && hiddenAt) running.t0 += performance.now() - Math.max(hiddenAt, running.t0);
  });
  // Said after a perfect level: unit 1's hou-lek (tools/units.test.mjs
  // checks it matches). Its hanzi is spoken if the clip can't play.
  const CHEER = { id: 'hou-lek', unit: 1, hanzi: '好叻呀！' };

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
      party?.();
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
      party?.();
      const level = levels[li];
      let n = 0, score = 0, right = 0, streak = 0;
      let timer = null;
      let alive = true;
      let current = null;  // the round's ctx
      const leave = () => current?.after?.stop?.();

      const hud = $('div', 'hud');
      const pills = $('div', 'hud-pills');
      const quit = button('✕ Levels', 'small', () => { alive = false; stopTimer(); leave(); menu(); });
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
        timer = running = null;
      }

      function startTimer(ctx) {
        if (!level.time || ctx.finished || !alive) return;
        const ms = level.time * 1000;
        timer = running = { t0: performance.now(), ms, raf: 0 };
        const tick = now => {
          if (!timer) return;
          if (document.hidden) { timer.raf = requestAnimationFrame(tick); return; }
          const left = Math.max(0, 1 - (now - timer.t0) / ms);
          fill.style.transform = `scaleX(${left})`;
          fill.classList.toggle('low', left < 0.3);
          if (left <= 0) return ctx.done(false, true);
          timer.raf = requestAnimationFrame(tick);
        };
        timer.raf = requestAnimationFrame(tick);
      }

      function next() {
        leave();
        if (n >= level.rounds) return end();
        paintHud();
        fb.replaceChildren();
        fb.className = 'game-feedback';
        stage.classList.remove('locked');
        fill.style.transform = 'scaleX(1)';
        fill.classList.remove('low');

        const ctx = current = {
          level,
          labels: level.labels ?? 'none',
          answer: '',
          reveal: null,
          after: null,
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
            if (ctx.after) fb.append(ctx.after.el);
            fb.append(go);
            if (correct && !ctx.after) {
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
        const box = $('div', 'game-end' + (stars === 3 ? ' perfect' : ''));
        box.innerHTML = `<p class="stars big">${[...starText(stars)].map((s, i) => `<span style="--i: ${i}">${s}</span>`).join('')}</p>
          <p class="end-score">${score}</p>
          <p>${right} of ${level.rounds} right${isBest && score > 0 ? ' · <strong>New best!</strong>' : ''}</p>
          <p>${stars === 3 ? '好叻！ Perfect!' : stars ? '做得好！ Well done!' : 'Get half right to earn a star and unlock the next level.'}</p>`;
        const actions = $('div', 'end-actions');
        actions.append(button('Play again', '', () => play(li)));
        if (li + 1 < levels.length && unlocked(li + 1)) actions.append(button('Next level →', 'primary', () => play(li + 1)));
        actions.append(button('All levels', '', menu));
        box.append(actions);
        root.replaceChildren(box);
        if (stars === 3) {
          party = celebrate(prev?.stars === 3 ? 'petals' : 'fireworks');
          Canto.play(CHEER);
        }
      }

      next();
    }

    menu();
  }

  // Celebrations are drawn frame by frame: each kind is (g, W, H, colours)
  // → draw(t), t in seconds, which returns false when it has finished.
  const rand = (a, b) => a + Math.random() * (b - a);

  // Shells rise from the bottom and burst into streaks that slow, fall and
  // fade, in the theme's colours and the bauhinia's.
  function fireworks(g, W, H, colours) {
    const RISE = 0.6, LIFE = 1.4, DRAG = 2.2;
    const shells = Array.from({ length: 7 }, (_, i) => ({
      at: i * 0.32, x: rand(0.15, 0.85) * W, top: rand(0.12, 0.42) * H, colour: colours[i % colours.length],
      sparks: Array.from({ length: 72 }, (_, k) => {
        const a = (k / 36) * Math.PI + rand(-0.08, 0.08);
        const v = (k % 2 ? rand(0.35, 0.5) : rand(0.75, 1)) * Math.min(W, H) * 0.5;
        return { vx: Math.cos(a) * v, vy: Math.sin(a) * v };
      }),
    }));
    const at = (s, p, e) => {
      const d = (1 - Math.exp(-DRAG * e)) / DRAG;
      return [s.x + p.vx * d, s.top + p.vy * d + 70 * e * e];
    };
    g.lineCap = 'round';
    return t => {
      let busy = false;
      for (const s of shells) {
        const u = t - s.at;
        if (u > RISE + LIFE) continue;
        busy = true;
        if (u < 0) continue;
        g.strokeStyle = s.colour;
        if (u < RISE) {
          const y = H - (H - s.top) * (1 - (1 - u / RISE) ** 2);
          g.globalAlpha = 1;
          g.lineWidth = 3;
          g.beginPath(); g.moveTo(s.x, y); g.lineTo(s.x, y + 16); g.stroke();
          continue;
        }
        const e = u - RISE;
        if (e < 0.15) {
          g.globalAlpha = 1 - e / 0.15;
          g.fillStyle = '#fff6d8';
          g.beginPath(); g.arc(s.x, s.top, 6 + 60 * e, 0, 2 * Math.PI); g.fill();
        }
        g.globalAlpha = 1 - (e / LIFE) ** 2;
        g.lineWidth = 3.5 - 2 * e / LIFE;
        g.beginPath();
        for (const p of s.sparks) {
          g.moveTo(...at(s, p, Math.max(0, e - 0.09)));
          g.lineTo(...at(s, p, e));
        }
        g.stroke();
      }
      return busy;
    };
  }

  // Bauhinia petals (and a few whole flowers) drift down, fluttering, as
  // on favicon.svg.
  function petals(g, W, H) {
    const petal = new Path2D('M1 -3 C-6 -8 -10 -20 -7 -27 C-3 -33 8 -32 10 -24 C11 -15 6 -7 1 -3 Z');
    const vein = new Path2D('M1 -6 C1 -13 1 -20 3 -26');
    const END = 5, FADE = 0.8;
    const fall = Array.from({ length: Math.round(Math.min(44, 12 + W / 30)) }, () => {
      const flower = Math.random() < 0.15;
      return { x: rand(0, W), y: rand(-0.6 * H, -40), v: rand(0.22, 0.36) * H, sway: rand(15, 45), f: rand(1.2, 2.4), ph: rand(0, 7),
        turn: rand(0, 7), spin: rand(-2, 2), size: flower ? rand(0.5, 0.7) : rand(0.6, 1.1), flower };
    });
    g.lineJoin = g.lineCap = 'round';
    return t => {
      if (t > END) return false;
      g.globalAlpha = Math.min(1, (END - t) / FADE);
      for (const p of fall) {
        const y = p.y + p.v * t;
        if (y > H + 40) continue;
        g.save();
        g.translate(p.x + p.sway * Math.sin(p.f * t + p.ph), y);
        g.rotate(p.turn + p.spin * t);
        g.scale(p.size, p.size * (0.55 + 0.45 * Math.abs(Math.cos(p.f * t + p.ph))));
        for (let i = 0; i < (p.flower ? 5 : 1); i++) {
          g.rotate((2 * Math.PI) / 5);
          g.fillStyle = '#c2185b'; g.fill(petal);
          g.lineWidth = 1.6; g.strokeStyle = '#6e0d35'; g.stroke(petal);
          g.strokeStyle = '#f8bbd0'; g.stroke(vein);
        }
        if (p.flower) { g.fillStyle = '#f2c94c'; g.beginPath(); g.arc(0, 0, 3.5, 0, 2 * Math.PI); g.fill(); }
        g.restore();
      }
      return true;
    };
  }

  function celebrate(kind) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
    const canvas = $('canvas', 'celebrate');
    canvas.setAttribute('aria-hidden', 'true');
    document.body.append(canvas);
    const W = innerWidth, H = innerHeight, dpr = devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const g = canvas.getContext('2d');
    g.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    const colours = ['--accent', '--gold', '--jade'].map(v => css.getPropertyValue(v).trim()).concat('#c2185b');
    const draw = (kind === 'petals' ? petals : fireworks)(g, W, H, colours);
    const t0 = performance.now();
    let raf = 0;
    const stop = () => { cancelAnimationFrame(raf); canvas.remove(); };
    const frame = now => {
      g.clearRect(0, 0, W, H);
      if (draw((now - t0) / 1000)) raf = requestAnimationFrame(frame);
      else stop();
    };
    raf = requestAnimationFrame(frame);
    return stop;
  }

  function choose(ctx, answer, options, label, gridCls = 'choice-grid') {
    const grid = $('div', gridCls);
    options.forEach(o => {
      const b = $('button', 'choice', label(o));
      b.type = 'button';
      b.dataset.id = o.id;
      b.addEventListener('click', () => {
        if (o !== answer) b.classList.add('wrong');
        ctx.done(o === answer);
      });
      grid.append(b);
    });
    // Keep a reveal set before (Game.playOnReveal), whichever came first.
    const revealBefore = ctx.reveal;
    ctx.reveal = () => {
      grid.querySelector(`[data-id="${answer.id}"]`).classList.add('right');
      revealBefore?.();
    };
    return grid;
  }

  // className only if a string: .map(pic) passes an index.
  const pic = (entry, className) => `<img${typeof className === 'string' && className ? ` class="${Canto.esc(className)}"` : ''} src="${Canto.imgSrc(entry)}" alt="${Canto.esc(entry.english)}">`;

  function playOnReveal(ctx, entry) {
    const revealBefore = ctx.reveal;
    ctx.reveal = () => { revealBefore?.(); ctx.play(entry); };
  }

  const answerText = e => `${Canto.zh(e.hanzi, e.jyutping)} is ${Canto.esc(e.english)}.${e.note ? ' ' + Canto.esc(e.note) : ''}`;

  const mark = yes => `<span class="mark ${yes ? 'yes' : 'no'}">${yes ? '✓' : '✗'}</span>`;
  function chart(items, label) {
    const box = $('div', 'chart');
    box.setAttribute('aria-label', label);
    for (const [e, yes] of items) {
      box.append($('div', 'chart-item', `<img src="${Canto.imgSrc(e)}" alt="${Canto.esc(e.english)}: ${yes ? 'yes' : 'no'}">${mark(yes)}`));
    }
    return box;
  }

  window.Game = { init, choose, pic, playOnReveal, answerText, chart, mark, celebrate };
})();
