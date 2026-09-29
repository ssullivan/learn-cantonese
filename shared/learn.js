/*
 * learn.js — engine for step-by-step learn pages. Needs core.js, audio.js.
 *
 *   Learn.init({
 *     root,          element to render into
 *     key,           localStorage key, unique across the site (e.g. "u7-learn")
 *     vocab,         { items: [...], phrases: [...], ... } entries with
 *                    { id, hanzi, jyutping, english, note?, img? }
 *     steps: [{
 *       id, title,
 *       gate,        true: Next stays locked until the step calls ctx.complete()
 *       render(el, ctx)
 *     }],
 *   })
 *
 * ctx passed to render():
 *   ctx.vocab                  the vocab object
 *   ctx.entry(id)              look up any entry by id
 *   ctx.card(entry)            <button> word card; tap plays the audio
 *   ctx.grid(entries)          grid of word cards (wider columns if none has a picture)
 *   ctx.play(entry)            play an entry's clip
 *   ctx.complete()             mark this step done (unlocks Next if gated)
 *   ctx.listenQuiz(el, { pool, rounds, choices, show })
 *                              hear a word, pick it from `choices` answers;
 *                              completes the step when the last round is
 *                              answered. show: 'picture' (default; entries
 *                              need one) or 'jyutping' (text buttons, e.g.
 *                              syllables that differ only in tone)
 *
 * Helpers for step content (Canto.zh etc. are in core.js):
 *   Learn.p(html)              <p> element
 *   Learn.tip(html)            callout box element
 *
 * Progress ({ step, done: [ids] }) is saved under `key`.
 */
(function () {
  const { el: $, esc, tagZh, jyutping, zh, shuffle, imgSrc, play, picButton } = Canto;

  const p = html => $('p', null, html);
  const tip = html => $('div', 'tip', html);

  function init(opts) {
    const { root, key, vocab, steps } = opts;
    const byId = Object.fromEntries(Canto.entries(vocab).map(e => [e.id, e]));

    const store = Canto.store(key, { step: 0, done: [] });
    const state = store.get();
    if (!Array.isArray(state.done)) state.done = [];
    state.step = Math.min(Math.max(0, state.step | 0), steps.length - 1);

    function card(entry) {
      const b = $('button', 'word' + (entry.img === false ? ' no-img' : ''));
      b.type = 'button';
      b.setAttribute('aria-label', `Play ${entry.hanzi}, ${entry.english}`);
      if (entry.img !== false) {
        const img = $('img');
        img.src = imgSrc(entry);
        img.alt = '';
        img.width = img.height = 128;
        b.append(img);
      }
      b.insertAdjacentHTML('beforeend', zh(entry.hanzi, entry.jyutping));
      b.append($('span', 'en', esc(entry.english)));
      if (entry.note) b.append($('span', 'note', esc(entry.note)));
      b.append($('span', 'play', '▶'));
      b.addEventListener('click', () => {
        play(entry);
        b.classList.remove('pulse');
        void b.offsetWidth;
        b.classList.add('pulse');
      });
      return b;
    }

    function grid(entries) {
      const g = $('div', 'word-grid' + (entries.every(e => e.img === false) ? ' wide' : ''));
      entries.forEach(e => g.append(card(e)));
      return g;
    }

    const isDone = i => state.done.includes(steps[i].id);
    // A step is reachable once every gated step before it is done.
    const reachable = i => steps.slice(0, i).every((s, j) => !s.gate || isDone(j));

    const nav = $('nav', 'steps');
    nav.setAttribute('aria-label', 'Lesson steps');
    const body = $('section', 'step-body');
    const title = $('h2', 'step-title');
    const content = $('div', 'step-content');
    body.append(title, content);
    const foot = $('div', 'step-foot');
    const back = $('button', 'btn', '← Back');
    const next = $('button', 'btn primary', 'Next →');
    back.type = next.type = 'button';
    foot.append(back, next);
    root.replaceChildren(nav, body, foot);

    function markDone(i) {
      if (!isDone(i)) state.done.push(steps[i].id);
      store.set(state);
      paintNav();
      paintFoot();
    }

    function paintNav() {
      nav.replaceChildren();
      steps.forEach((s, i) => {
        const b = $('button', 'dot', String(i + 1));
        b.type = 'button';
        b.title = s.title;
        b.setAttribute('aria-label', `Step ${i + 1}: ${s.title}`);
        if (i === state.step) b.setAttribute('aria-current', 'step');
        if (isDone(i)) b.classList.add('done');
        b.disabled = !reachable(i);
        b.addEventListener('click', () => go(i));
        nav.append(b);
      });
    }

    function paintFoot() {
      const i = state.step;
      back.disabled = i === 0;
      next.hidden = i === steps.length - 1;
      next.disabled = !!steps[i].gate && !isDone(i);
    }

    function go(i) {
      Speak.stop();
      state.step = i;
      store.set(state);
      const step = steps[i];
      title.innerHTML = tagZh(step.title);
      content.replaceChildren();
      const ctx = {
        vocab,
        entry: id => byId[id],
        card, grid, play,
        complete: () => markDone(i),
        listenQuiz: (el, o) => listenQuiz(el, o, ctx),
      };
      step.render(content, ctx);
      if (!step.gate && i === steps.length - 1) markDone(i);
      paintNav();
      paintFoot();
      body.focus({ preventScroll: true });
      root.scrollIntoView({ block: 'start' });
    }

    back.addEventListener('click', () => go(state.step - 1));
    next.addEventListener('click', () => {
      if (!steps[state.step].gate) markDone(state.step);
      go(state.step + 1);
    });
    body.tabIndex = -1;

    if (!reachable(state.step)) state.step = 0;
    go(state.step);
  }

  function listenQuiz(el, { pool, rounds = 8, choices = 4, show: kind = 'picture' }, ctx) {
    let order, round, score, answered;

    function start() {
      order = shuffle(pool).slice(0, Math.min(rounds, pool.length));
      round = 0;
      score = 0;
      show();
    }

    function show() {
      answered = false;
      const answer = order[round];
      const others = shuffle(pool.filter(e => e.id !== answer.id)).slice(0, choices - 1);

      const top = $('div', 'quiz-top');
      top.append($('span', 'pill', `${round + 1} / ${order.length}`), $('span', 'pill', `Score ${score}`));
      const listen = $('button', 'btn primary listen', '▶ Listen again');
      listen.type = 'button';
      listen.addEventListener('click', () => play(answer));

      const grid = $('div', kind === 'jyutping' ? 'choice-grid' : 'pic-grid');
      const fb = $('div', 'quiz-feedback');
      fb.setAttribute('aria-live', 'polite');

      shuffle([answer, ...others]).forEach(o => {
        const b = kind === 'jyutping' ? textButton(o) : picButton(o);
        b.addEventListener('click', () => pick(o, b, grid, fb, answer));
        grid.append(b);
      });

      el.replaceChildren(top, listen, grid, fb);
      play(answer);
    }

    function pick(o, b, grid, fb, answer) {
      if (answered) return;
      answered = true;
      const right = o.id === answer.id;
      if (right) score++;
      [...grid.children].forEach(c => { c.disabled = true; });
      b.classList.add(right ? 'right' : 'wrong');
      if (!right) grid.querySelector(`[data-id="${answer.id}"]`).classList.add('right');
      fb.className = 'quiz-feedback feedback ' + (right ? 'good' : 'bad');
      fb.innerHTML = (right ? '對！ Correct: ' : 'Not quite. That was ') +
        `${zh(answer.hanzi, answer.jyutping)} — ${esc(answer.english)}`;
      const more = $('button', 'btn primary', round + 1 < order.length ? 'Next word →' : 'See score');
      more.type = 'button';
      more.addEventListener('click', () => { round++; round < order.length ? show() : finish(); });
      fb.append(document.createElement('br'), more);
      more.focus();
    }

    function finish() {
      const done = $('div', 'quiz-done');
      const msg = score === order.length ? '好叻！ Perfect!' : score >= order.length * 0.75 ? '好好！ Great job!' : 'Keep practising!';
      done.append($('p', 'quiz-score', `${score} / ${order.length}`), $('p', null, msg));
      const again = $('button', 'btn', 'Play again');
      again.type = 'button';
      again.addEventListener('click', start);
      done.append(again);
      el.replaceChildren(done);
      ctx.complete();
    }

    start();
  }

  function textButton(entry) {
    const b = $('button', 'choice', `<span class="jp">${jyutping(entry.jyutping)}</span>`);
    b.type = 'button';
    b.dataset.id = entry.id;
    return b;
  }

  window.Learn = { init, p, tip };
})();
