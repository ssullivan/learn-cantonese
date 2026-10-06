/*
 * Audio review: every clip on the site, for a native speaker to hear and
 * mark. Rows come from every loaded unit's vocab (what it teaches: its own
 * phrases and the dictionary words taught there; a borrowed word is listed
 * once, where it is taught), so nothing is typed out.
 *
 * Marks (OK / Sounds wrong + note) stay in this browser under
 * "audio-review", keyed <home>/<id> (unit<N>, or words for a dictionary
 * word), with the clip's hash from <home>/audio/manifest.json: a clip
 * regenerated since it was marked says so, and a mark on an entry since
 * renamed or moved follows its clip (by the hash; tools/tts.mjs moves the
 * clip). "Copy my notes" gives the marks as text to send back.
 *
 * The machine flags (<home>/audio/check.json, written by
 * tools/audio-check.mjs) stay hidden until switched on, so the listener
 * isn't primed by them.
 */
(function () {
  const { el: $, esc, jyutping } = Canto;
  const root = document.getElementById('review');
  const store = Canto.store('audio-review', {});
  const marks = store.get();
  const save = () => store.set(marks);

  // One row per clip, unit by unit.
  const units = Object.keys(window.UNITS).map(Number).sort((a, b) => a - b);
  const rows = units.flatMap(n => {
    const vocab = window.UNITS[n];
    return Canto.entries(vocab).filter(e => Units.teaches(vocab, e)).map((e, i) => {
      const home = e.taught ? 'words' : `unit${n}`;
      return { n, i, e, home, key: `${home}/${e.id}`, src: `../${home}/audio/${e.id}.mp3`, voice: voiceName(e, vocab) };
    });
  });
  const homes = [...new Set(rows.map(r => r.home))];
  const manifests = {}, verdicts = {};
  let showFlags = false, filter = 'all';

  // The voice, when it isn't the unit's own ("WanLung", "MiniMax").
  function voiceName(e, vocab) {
    const v = e.voice ?? vocab.voice;
    if (v === vocab.voice) return '';
    return v.startsWith('minimax:') ? 'MiniMax' : v.replace(/^zh-HK-|Neural$/g, '');
  }

  const fetchJson = url => fetch(url).then(r => r.ok ? r.json() : null).catch(() => null);

  // --- playback: one clip at a time, and no speech-synthesis stand-in, so
  // a missing file shows as missing.
  const player = new Audio();
  let playing = null;
  function play(row, button) {
    if (playing) playing.classList.remove('playing');
    player.src = row.src;
    playing = button;
    button.classList.add('playing');
    player.play().catch(() => { button.textContent = 'Missing'; });
  }
  player.addEventListener('ended', () => playing?.classList.remove('playing'));
  player.addEventListener('error', () => { if (playing) playing.textContent = 'Missing'; });

  // --- toolbar
  const progress = $('p', 'review-progress');
  const filterSel = $('select');
  filterSel.setAttribute('aria-label', 'Show');
  const flagBox = $('input');
  flagBox.type = 'checkbox';
  flagBox.id = 'show-flags';
  const copyBtn = $('button', 'btn primary', 'Copy my notes');
  copyBtn.type = 'button';
  const copyOut = $('textarea', 'review-copy');
  copyOut.hidden = true;
  copyOut.readOnly = true;
  copyOut.setAttribute('aria-label', 'Your notes');
  const flagLabel = $('label', 'review-flags');
  flagLabel.append(flagBox, ' Show machine flags');
  const bar = $('div', 'review-bar');
  bar.append(progress, filterSel, flagLabel, copyBtn);
  const jump = $('p', 'review-jump', 'Jump to: ' + units.map(n => `<a href="#unit${n}">Unit ${n}</a>`).join(' · '));

  function paintFilters() {
    const opts = [['all', 'All clips'], ['todo', 'Not reviewed yet'], ['wrong', 'Marked wrong']];
    if (showFlags) opts.push(['flagged', 'Machine-flagged']);
    if (!opts.some(([v]) => v === filter)) filter = 'all';
    filterSel.innerHTML = opts.map(([v, label]) => `<option value="${v}"${v === filter ? ' selected' : ''}>${label}</option>`).join('');
  }

  // --- the table
  const sections = units.map(n => {
    const sec = $('section', 'review-unit');
    sec.id = `unit${n}`;
    const count = rows.filter(r => r.n === n).length;
    sec.append($('h2', null, `Unit ${n} <span class="review-count">${count} clips</span>`));
    const table = $('table', 'review-table');
    table.innerHTML = '<thead><tr><th>#</th><th>Chinese</th><th>Jyutping</th><th>English</th><th>Listen</th><th>Your mark</th><th>Note</th></tr></thead>';
    const body = $('tbody');
    table.append(body);
    sec.append(table);
    return { n, sec, body };
  });

  for (const row of rows) {
    const tr = $('tr');
    row.tr = tr;
    const listen = $('button', 'btn small review-play', '▶');
    listen.type = 'button';
    listen.setAttribute('aria-label', `Play ${row.e.hanzi}`);
    listen.addEventListener('click', () => play(row, listen));
    const ok = $('button', 'btn small review-ok', 'OK');
    const wrong = $('button', 'btn small review-wrong', 'Sounds wrong');
    const note = $('input', 'review-note');
    note.type = 'text';
    note.placeholder = 'What do you hear?';
    note.setAttribute('aria-label', `Note on ${row.e.hanzi}`);
    for (const [b, mark] of [[ok, 'ok'], [wrong, 'wrong']]) {
      b.type = 'button';
      b.addEventListener('click', () => {
        const m = marks[row.key];
        if (m?.mark === mark) delete marks[row.key];
        else marks[row.key] = { ...m, mark, audio: manifests[row.home]?.[row.e.id] };
        save();
        paintRow(row);
        paintProgress();
        if (mark === 'wrong' && marks[row.key]) note.focus();
      });
    }
    note.addEventListener('input', () => {
      marks[row.key] = { mark: 'wrong', ...marks[row.key], note: note.value, audio: manifests[row.home]?.[row.e.id] };
      save();
      paintRow(row);
      paintProgress();
    });
    const markCell = $('td', 'review-mark');
    markCell.append(ok, wrong);
    const noteCell = $('td', 'review-note-cell');
    noteCell.append(note);
    row.ok = ok;
    row.wrong = wrong;
    row.note = note;
    row.status = $('div', 'review-status');
    noteCell.append(row.status);
    tr.append(
      $('td', 'review-num', String(row.i + 1)),
      $('td', 'review-zh', `<span class="hanzi" lang="zh-HK">${esc(row.e.hanzi)}</span>`),
      $('td', 'review-jp', `<span class="jp">${jyutping(row.e.jyutping)}</span>`),
      $('td', 'review-en', esc(row.e.english) + (row.voice ? ` <span class="pill">${esc(row.voice)} voice</span>` : '')),
      (() => { const td = $('td', 'review-listen'); td.append(listen); return td; })(),
      markCell, noteCell,
    );
    sections.find(s => s.n === row.n).body.append(tr);
  }

  function paintRow(row) {
    const m = marks[row.key];
    row.ok.setAttribute('aria-pressed', m?.mark === 'ok');
    row.wrong.setAttribute('aria-pressed', m?.mark === 'wrong');
    row.tr.classList.toggle('is-ok', m?.mark === 'ok');
    row.tr.classList.toggle('is-wrong', m?.mark === 'wrong');
    if (document.activeElement !== row.note) row.note.value = m?.note ?? '';
    const now = manifests[row.home]?.[row.e.id];
    const changed = m && m.audio && now && m.audio !== now;
    const v = showFlags && verdicts[row.home]?.[row.e.id];
    const stale = v && v.audio !== now;
    row.status.innerHTML = [
      changed ? '<span class="review-changed">Clip changed since you marked it: listen again.</span>' : '',
      v ? `<span class="review-flag ${v.verdict.toLowerCase()}">${v.verdict}${stale ? ' (older clip)' : ''}</span> ${esc(v.notes.join('; '))}` : '',
    ].filter(Boolean).join('<br>');
  }

  function visible(row) {
    const m = marks[row.key];
    if (filter === 'todo') return !m;
    if (filter === 'wrong') return m?.mark === 'wrong';
    if (filter === 'flagged') return !!verdicts[row.home]?.[row.e.id];
    return true;
  }

  function paintProgress() {
    const done = rows.filter(r => marks[r.key]).length;
    const wrong = rows.filter(r => marks[r.key]?.mark === 'wrong').length;
    progress.innerHTML = `<strong>${done}</strong> of ${rows.length} reviewed · <strong>${wrong}</strong> sound wrong`;
  }

  function paintAll() {
    for (const row of rows) {
      paintRow(row);
      row.tr.hidden = !visible(row);
    }
    for (const s of sections) s.sec.hidden = ![...s.body.children].some(tr => !tr.hidden);
    paintProgress();
  }

  filterSel.addEventListener('change', () => { filter = filterSel.value; paintAll(); });

  flagBox.addEventListener('change', async () => {
    showFlags = flagBox.checked;
    if (showFlags && !Object.keys(verdicts).length) {
      await Promise.all(homes.map(async h => { verdicts[h] = await fetchJson(`../${h}/audio/check.json`) ?? {}; }));
    }
    paintFilters();
    paintAll();
  });

  // --- copy my notes
  function notesText() {
    const done = rows.filter(r => marks[r.key]);
    const wrong = done.filter(r => marks[r.key].mark === 'wrong');
    const lines = [`Audio review notes: ${done.length} of ${rows.length} clips reviewed, ${wrong.length} sound wrong.`, ''];
    if (wrong.length) lines.push('Sounds wrong:');
    for (const r of wrong) {
      const m = marks[r.key];
      lines.push(`- Unit ${r.n} #${r.i + 1}  ${r.e.hanzi}  ${r.e.jyutping}  (${r.e.english}; ${r.key})${m.note ? `: ${m.note}` : ''}`);
    }
    const okNotes = done.filter(r => marks[r.key].mark === 'ok' && marks[r.key].note);
    if (okNotes.length) lines.push('', 'Other notes:', ...okNotes.map(r => `- Unit ${r.n} #${r.i + 1}  ${r.e.hanzi}  ${r.e.jyutping}: ${marks[r.key].note}`));
    return lines.join('\n');
  }

  copyBtn.addEventListener('click', async () => {
    const text = notesText();
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy my notes'; }, 1500);
      copyOut.hidden = true;
    } catch {
      copyOut.hidden = false;
      copyOut.value = text;
      copyOut.select();
    }
  });

  root.append(bar, copyOut, jump, ...sections.map(s => s.sec));
  paintFilters();
  paintAll();

  // The clips' hashes, to tell when a marked clip has been remade.
  // A mark whose entry is gone moves to the rows now playing its clip.
  function followRenames() {
    const keys = new Set(rows.map(r => r.key));
    for (const [key, m] of Object.entries(marks)) {
      if (keys.has(key) || !m.audio) continue;
      const now = rows.filter(r => !marks[r.key] && manifests[r.home]?.[r.e.id] === m.audio);
      if (!now.length) continue;
      for (const r of now) marks[r.key] = m;
      delete marks[key];
    }
    save();
  }

  Promise.all(homes.map(async h => { manifests[h] = await fetchJson(`../${h}/audio/manifest.json`) ?? {}; }))
    .then(followRenames)
    .then(paintAll);
})();
