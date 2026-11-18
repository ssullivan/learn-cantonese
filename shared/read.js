/*
 * read.js — a game.js round about reading: see a word's characters and
 * tap its picture, or see the picture and pick its characters. Nothing
 * plays until the answer is shown, so the characters alone carry it; then
 * the word is said. Any unit with pictures can use it. Needs core.js,
 * audio.js, game.js. Styles: .prompt-zh in game.css.
 *
 *   Read.round({ pool, show?, choices?, lookalike?, extra?, cols? })   a round for Game.init
 *     pool       the words to ask about (ctx.draw), each with a picture;
 *                wrong answers come from it too
 *     show       what the round shows: 'zh' (the characters; tap the
 *                picture, the default), 'jyutping' (the characters with
 *                Jyutping over them) or 'pic' (the picture; pick the
 *                characters)
 *     choices    how many answers to offer (default 4)
 *     lookalike  wrong answers that share a character with the word come
 *                first (Read.lookalikes): 菠蘿 beside 菠蘿包
 *     extra      more words that may be wrong answers, but only when they
 *                share a character (橙色 for 橙); never asked about. With
 *                pictures for 'zh' and 'jyutping': ones without are left out
 *     cols       3 for picture answers in rows of three (six of them)
 *
 *   Read.lookalikes(word, pool, count, extra = [])
 *                `count` other words: those from pool and extra sharing
 *                the most characters with `word` first (in random order
 *                among equals), then the rest of pool at random. Words
 *                with its id or hanzi are left out
 */
(function () {
  const { el: $, zh, tagZh, shuffle, pick, imgSrc, speech } = Canto;

  const HAN = /\p{Script=Han}/u;
  const sharedChars = (a, b) => new Set([...a.hanzi].filter(c => HAN.test(c) && b.hanzi.includes(c))).size;

  function lookalikes(word, pool, count, extra = []) {
    const seen = new Set([word.id, word.hanzi]);
    const fresh = x => !seen.has(x.id) && !seen.has(x.hanzi) && seen.add(x.id).add(x.hanzi);
    const candidates = [...pool, ...extra].filter(fresh);
    const close = shuffle(candidates.filter(x => sharedChars(x, word)))
      .sort((a, b) => sharedChars(b, word) - sharedChars(a, word));
    const rest = shuffle(candidates.filter(x => pool.includes(x) && !sharedChars(x, word)));
    return [...close, ...rest].slice(0, count);
  }

  function round({ pool, show = 'zh', choices = 4, lookalike = false, extra = [], cols }) {
    const byPic = show !== 'pic';
    const decoys = byPic ? extra.filter(e => e.img !== false) : extra;
    const said = e => zh(e.hanzi, e.jyutping);

    return (stage, ctx) => {
      const word = ctx.draw(pool);
      const wrong = lookalike
        ? lookalikes(word, pool, choices - 1, decoys)
        : pick(pool.filter(x => x !== word), choices - 1);
      const options = shuffle([word, ...wrong]);
      Game.playOnReveal(ctx, word);
      ctx.answer = Game.answerText(word);

      if (byPic) {
        const prompt = $('p', 'prompt-zh' + (show === 'jyutping' ? ' with-jp' : ''), said(word));
        const grid = Game.choose(ctx, word, options, Game.pic, 'pic-grid pics' + (cols === 3 ? ' cols-3' : ''));
        stage.replaceChildren(speech('睇', tagZh('邊樣係呢個？ Which one is this?')), prompt, grid);
      } else {
        const img = $('img', 'prompt-pic');
        img.src = imgSrc(word);
        img.alt = word.english;
        const grid = Game.choose(ctx, word, options, said, 'choice-grid words');
        stage.replaceChildren(speech('睇', tagZh('點寫？ How is it written?')), img, grid);
      }
    };
  }

  window.Read = { round, lookalikes };
})();
