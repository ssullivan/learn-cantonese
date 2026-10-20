/*
 * Photo credits: every photo the site shows in place of a drawing (an
 * entry with photo: true, from Canto.imgSrc), with what its licence asks
 * for: title, author, source and licence. Rows come from every loaded
 * unit's vocab and each photo's <home>/photo/credits.json (checked by
 * tools/check.mjs), so nothing is typed out. A photo shown by several
 * units is listed once, with each unit.
 */
(async function () {
  const { el: $, esc, zh, imgSrc } = Canto;
  const root = document.getElementById('credits');

  // The Creative Commons page of a licence named as on Wikimedia Commons.
  const licenceUrl = name => name === 'CC0'
    ? 'https://creativecommons.org/publicdomain/zero/1.0/'
    : `https://creativecommons.org/licenses/${name.slice(3).split(' ')[0].toLowerCase()}/${name.split(' ')[2]}/`;

  const photos = new Map();
  for (const n of Object.keys(window.UNITS).map(Number).sort((a, b) => a - b)) {
    for (const e of Canto.entries(window.UNITS[n]).filter(e => e.photo)) {
      const home = e.taught ? 'words' : `unit${e.unit ?? n}`, key = `${home}/${e.id}`;
      if (!photos.has(key)) photos.set(key, { e, home, units: [] });
      if (!photos.get(key).units.includes(n)) photos.get(key).units.push(n);
    }
  }
  const credits = {};
  for (const home of new Set([...photos.values()].map(p => p.home))) {
    credits[home] = await (await fetch(`../${home}/photo/credits.json`)).json();
  }

  const list = $('ul', 'credit-list');
  for (const { e, home, units } of photos.values()) {
    const c = credits[home][e.id];
    const img = $('img');
    img.src = imgSrc(e);
    img.alt = e.english;
    img.width = img.height = 96;
    const text = $('div', 'credit-text',
      `<p class="credit-word">${zh(e.hanzi, e.jyutping)} <span class="en">${esc(e.english)}</span></p>` +
      `<p>“<a href="${esc(c.source)}">${esc(c.title)}</a>” by ${esc(c.author)}, ` +
      `<a href="${licenceUrl(c.license)}" rel="license">${esc(c.license)}</a>. ` +
      `Shown in ${units.map(n => `<a href="../unit${n}/">Unit ${n}</a>`).join(', ')}.</p>`);
    const li = $('li', 'credit');
    li.append(img, text);
    list.append(li);
  }
  root.append(list);
})();
