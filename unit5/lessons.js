/* Unit 5 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  const words = (ctx, ...ids) => ctx.grid(ids.map(ctx.entry));
  const ones = (ctx, ...ids) => words(ctx, ...ids.map(id => `one-${id}`));

  // A step for some measure words: each one's card, then its things.
  const measureStep = (id, title, intro, ms, extra = () => []) => ({
    id, title,
    render(el, ctx) {
      const things = V.things.filter(t => ms.includes(t.measure));
      el.append(p(intro), words(ctx, ...ms), ctx.grid(things), ones(ctx, ...things.map(t => t.id)), ...extra(ctx));
    },
  });

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u5-learn',
    vocab: V,
    steps: [
      {
        id: 'why',
        title: 'Why measure words?',
        render(el, ctx) {
          el.append(
            p(`English counts some things with a word in between: a <em>cup</em> of tea, a <em>sheet</em> of paper. Cantonese does it for everything. Between a number and a noun there is always a measure word, and you met the first one in Unit 4: ${zh('個', 'go3')}.`),
            words(ctx, 'go'),
            ctx.grid(V.things.filter(t => t.measure === 'go')),
            ones(ctx, 'apple', 'ball'),
            tip(`<strong>一貓 is wrong:</strong> say ${zh('一隻貓', 'jat1 zek3 maau1')}. The measure word is chosen by what the thing is like: its shape, or how it comes. Tap each card to hear it.`),
          );
        },
      },
      measureStep('animals', 'Animals · 隻', `${zh('隻', 'zek3')} counts almost every animal, big or small.`, ['zek']),
      measureStep('flat', 'Books and flat things · 本 張', `${zh('本', 'bun2')} is for books. ${zh('張', 'zoeng1')} is for anything with a flat surface, including tables and beds.`, ['bun', 'zoeng']),
      measureStep('long', 'Long things · 條 枝', `${zh('條', 'tiu4')} is for long, bendy things. ${zh('枝', 'zi1')} is for long, stiff ones, like sticks.`, ['tiu', 'zi'],
        () => [tip('<strong>一條褲:</strong> English says "a pair of trousers", but Cantonese counts them as one long thing.')]),
      measureStep('machines', 'Machines and tops · 架 件', `${zh('架', 'gaa3')} counts vehicles and machines. ${zh('件', 'gin6')} counts clothes for your top half, and pieces, like a slice of cake.`, ['gaa', 'gin']),
      measureStep('containers', 'Cups, bowls and pairs · 杯 碗 對', `Like English "a cup of", a container can be the measure word: ${zh('杯', 'bui1')} and ${zh('碗', 'wun2')}. ${zh('對', 'deoi3')} is a pair.`, ['bui', 'wun', 'deoi']),
      {
        id: 'the',
        title: 'Measure + noun = "the"',
        render(el, ctx) {
          el.append(
            p(`Leave out the number and the measure word means <em>the</em>: the one you both know about.`),
            words(ctx, 'the-cat', 'the-book', 'the-car'),
            p(`For more than one, or an amount, use ${zh('啲', 'di1')}. It never takes a number.`),
            words(ctx, 'di'),
            tip(`<strong>隻貓 or 一隻貓?</strong> ${zh('一隻貓', 'jat1 zek3 maau1')} is "a cat" (or "one cat"); ${zh('隻貓', 'zek3 maau1')} is "the cat".`),
          );
        },
      },
      {
        id: 'this-that',
        title: '呢 and 嗰',
        render(el, ctx) {
          el.append(
            p(`${zh('呢', 'ni1')} (this) and ${zh('嗰', 'go2')} (that) go where the number goes, and the measure word stays:`),
            words(ctx, 'ni', 'go2', 'this-cat', 'that-cat', 'this-book', 'that-car'),
            p(`With ${zh('個', 'go3')} and no noun, they mean "this one" and "that one". With ${zh('啲', 'di1')}, "these" and "those":`),
            words(ctx, 'ni-go-hai-mat-je-aa', 'go2-go-hai-mat-je-aa', 'ni-di-hai-mat-je-aa'),
          );
        },
      },
      {
        id: 'count',
        title: 'Counting: 兩 and 幾多',
        render(el, ctx) {
          el.append(
            p(`Put any number before the measure word. Two is always ${zh('兩', 'loeng5')} here, never 二:`),
            words(ctx, 'two-cat', 'n5-cat', 'two-book', 'n9-book'),
            p(`${zh('有', 'jau5')} is "to have". Ask how many with ${zh('幾多', 'gei2 do1')} and the measure word:`),
            words(ctx, 'jau', ...V.sentences.filter(s => s.words.includes('jau')).map(s => s.id)),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen to the word, then tap its picture. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: V.things, rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You know ${V.measures.length} measure words and ${V.things.length} things to count with them, and you can say ${zh('呢隻貓', 'ni1 zek3 maau1')} and ${zh('嗰本書', 'go2 bun2 syu1')}.`),
            p('Practise in <a href="sort.html">Measure Sort</a> and <a href="count.html">Count It</a>, or <a href="../">go back to Unit 5</a>.'),
          );
        },
      },
    ],
  });
})();
