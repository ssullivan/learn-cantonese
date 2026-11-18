/* Unit 20 game: Read It 認字. See a fruit or vegetable's characters and tap its picture (with Jyutping, then without, then beside look-alikes that share a character: 橙 or 橙色?), or see the picture and pick its characters. Rounds from shared/read.js, on shared/game.js; the look-alikes are vocab.js's `lookalikes`. */
(function () {
  const V = window.VOCAB;
  const { zh } = Canto;
  const produce = [...V.fruit, ...V.veg];
  const tricky = { pool: produce, lookalike: true, extra: V.lookalikes };

  const read = Read.round({ ...tricky, cols: 3, choices: 6 });
  const write = Read.round({ ...tricky, show: 'pic' });
  const rush = (stage, ctx, n) => [read, write][n % 2](stage, ctx, n);

  Game.init({
    root: document.getElementById('game'),
    key: 'u20-read',
    intro: `<strong>How to play:</strong> read the characters and tap the fruit or vegetable they name.
      Nothing is said until you answer, so read carefully: ${zh('菠蘿', 'bo1 lo4')} is not ${zh('菠蘿包', 'bo1 lo4 baau1')}.`,
    levels: [
      { id: 'jyutping', name: '有拼音', blurb: 'Read the characters, with Jyutping to help, and tap the picture.', rounds: 8, time: 0, round: Read.round({ pool: produce, show: 'jyutping' }) },
      { id: 'read', name: '睇字', blurb: 'Characters only now. Tap the picture.', rounds: 8, time: 0, round: Read.round({ pool: produce }) },
      { id: 'lookalike', name: '橙定橙色？', blurb: 'The other answers share a character: 菠蘿 or 菠蘿包? 薯仔 or 耳仔?', rounds: 8, time: 0, round: Read.round(tricky) },
      { id: 'which-word', name: '點寫？', blurb: 'See a fruit or vegetable and pick its characters.', rounds: 8, time: 0, round: Read.round({ ...tricky, show: 'pic' }) },
      { id: 'rush', name: 'Reading rush', blurb: 'Six pictures, look-alike characters, against the clock.', rounds: 12, time: 10, round: rush },
    ],
  });
})();
