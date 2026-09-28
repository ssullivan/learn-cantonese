/* Unit 10 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  const words = (ctx, ...ids) => ctx.grid(ids.map(ctx.entry));

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u10-learn',
    vocab: V,
    steps: [
      {
        id: 'parents',
        title: 'Mum and dad · 爸爸媽媽',
        render(el, ctx) {
          el.append(
            p(`${zh('屋企', 'uk1 kei2')} is home, and ${zh('屋企人', 'uk1 kei2 jan4')} the people in it: your family.`),
            words(ctx, 'home', 'family'),
            p('Each picture is a family tree. You are in yellow; the person meant is in red, with an arrow.'),
            words(ctx, 'dad', 'mum'),
            tip(`<strong>Low, then high.</strong> The doubled family words start low: ${zh('爸爸', 'baa4 baa1')}, ${zh('媽媽', 'maa4 maa1')}.`),
          );
        },
      },
      {
        id: 'siblings',
        title: 'Brothers and sisters',
        render(el, ctx) {
          el.append(
            p('Cantonese has no plain word for "brother" or "sister": older and younger always get different words.'),
            words(ctx, 'elder-brother', 'elder-sister', 'younger-brother', 'younger-sister'),
            p(`All four together are ${zh('兄弟姊妹', 'hing1 dai6 zi2 mui6')}:`),
            words(ctx, 'siblings'),
            tip(`<strong>細 is small.</strong> The younger ones start with ${zh('細', 'sai3')}: ${zh('細佬', 'sai3 lou2')}, ${zh('細妹', 'sai3 mui2')}.`),
          );
        },
      },
      {
        id: 'grandparents',
        title: 'Grandparents',
        render(el, ctx) {
          el.append(
            p('Your dad\'s parents and your mum\'s parents have different names. Dad\'s side:'),
            words(ctx, 'dads-dad', 'dads-mum'),
            p('Mum\'s side:'),
            words(ctx, 'mums-dad', 'mums-mum'),
            tip(`<strong>媽媽 or 嫲嫲?</strong> ${zh('媽媽', 'maa4 maa1')} (mum) rises to a high second syllable; ${zh('嫲嫲', 'maa4 maa4')} (dad's mum) stays low.`),
          );
        },
      },
      {
        id: 'own',
        title: 'Husband, wife and children',
        render(el, ctx) {
          el.append(
            p('Your own family: these pictures show you with a partner and two children.'),
            words(ctx, 'husband', 'wife'),
            words(ctx, 'son', 'daughter', 'children'),
          );
        },
      },
      {
        id: 'ge',
        title: 'Whose? · 嘅',
        render(el, ctx) {
          el.append(
            p(`${zh('嘅', 'ge3')} after a person is like English "'s": ${zh('我嘅書', 'ngo5 ge3 syu1')} is "my book".`),
            words(ctx, 'ge', 'ngo-ge-book', 'nei-ge-pen'),
            p('On its own at the end, it means "mine", "yours". Ask whose with 邊個嘅:'),
            words(ctx, 'ngo-ge', 'bin-go-ge', 'ni-bun-book-hai-bin-go-ge-aa', 'hai-ngo-ge', 'ni-bun-book-hai-ngo-ge'),
            p('嘅 chains work like "\'s" too:'),
            words(ctx, 'dad-ge-mum', 'mum-ge-dad'),
          );
        },
      },
      {
        id: 'close',
        title: 'My mum: no 嘅',
        render(el, ctx) {
          el.append(
            p(`Before close family (and friends, as in 我朋友 from Unit 3) the 嘅 is left out: ${zh('我媽媽', 'ngo5 maa4 maa1')}, my mum.`),
            words(ctx, 'ngo-dad', 'nei-mum', 'keoi-elder-sister'),
            p(`Join people with ${zh('同', 'tung4')}, "and":`),
            words(ctx, 'tung', 'ngo-dad-tung-mum'),
            words(ctx, 'keoi-hai-ngo-mum', 'keoi-hai-ngo-husband', 'ni-go-hai-ngo-elder-brother'),
          );
        },
      },
      {
        id: 'measure',
        title: 'My son · 我個仔',
        render(el, ctx) {
          el.append(
            p(`In Unit 5, a measure word and a noun meant "the": ${zh('隻貓', 'zek3 maau1')}, the cat. Put a person first and it is theirs: ${zh('我隻貓', 'ngo5 zek3 maau1')}, my cat.`),
            words(ctx, 'ngo-zek-cat', 'nei-bun-book', 'keoi-zi-pen', 'ngo-gin-shirt'),
            p('Children are counted with 個, so "my son" is 我個仔:'),
            words(ctx, 'ngo-go-son', 'ngo-go-daughter'),
            tip(`<strong>我個仔, 我媽媽.</strong> Children and things take a measure word; parents, brothers and sisters and partners take nothing: ${zh('我老公', 'ngo5 lou5 gung1')}.`),
          );
        },
      },
      {
        id: 'count',
        title: 'How many? How old?',
        render(el, ctx) {
          el.append(
            p('Family members are counted with 個:'),
            words(ctx, 'ngo-jau-loeng-go-elder-sister', 'nei-jau-gei-do-go-siblings-aa'),
            p(`Ages are a number and ${zh('歲', 'seoi3')}, with no 係:`),
            words(ctx, 'seoi', 'nei-go-daughter-gei-do-seoi-aa', 'ngo-go-son-n3-seoi'),
            p(`And ${zh('住', 'zyu6')}, to live:`),
            words(ctx, 'zyu', 'ngo-tung-family-zyu'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen to the word, then tap the person on the family tree. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: Canto.entries(V).filter(e => e.member), rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can name your family, from ${zh('爺爺', 'je4 je2')} to ${zh('細妹', 'sai3 mui2')}, and say whose: ${zh('我媽媽', 'ngo5 maa4 maa1')}, ${zh('我嘅書', 'ngo5 ge3 syu1')}, ${zh('我個仔', 'ngo5 go3 zai2')}.`),
            p('Practise in <a href="tree.html">Family Tree</a>, or <a href="../">go back to Unit 10</a>.'),
          );
        },
      },
    ],
  });
})();
