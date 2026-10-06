/* Unit 18 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u18-learn',
    vocab: V,
    steps: [
      {
        id: 'pairs',
        title: 'Big and small · 大 細',
        render(el, ctx) {
          el.append(
            ctx.words('daai6', 'sai3', 'gou', 'ai', 'faai', 'maan6'),
            p('And pairs you know already:'),
            ctx.words('gwai', 'peng', 'jit', 'dung'),
            tip(`<strong>大 and 細 for age.</strong> Of people, ${zh('大', 'daai6')} is older and ${zh('細', 'sai3')} younger: that's why a younger brother is ${zh('細佬', 'sai3 lou2')}.`),
          );
        },
      },
      {
        id: 'bei',
        title: 'A 比 B',
        render(el, ctx) {
          el.append(
            p(`Put ${zh('比', 'bei2')} between the two, and the adjective last. No ${zh('係', 'hai6')}, and no word for "more": the adjective does it.`),
            ctx.words('watermelon-bei-apple-gwai', 'plane-bei-bus-faai', 'elder-brother-bei-ngo-gou', 'gam-jat-bei-kam-jat-jit', 'ngo-bei-nei-gou'),
            tip('<strong>A 比 B + adjective:</strong> 西瓜比蘋果貴, "watermelon compared-to apple expensive". Swap the adjective to turn it round: 蘋果比西瓜平.'),
          );
        },
      },
      {
        id: 'gwo',
        title: 'The spoken way · 貴過',
        render(el, ctx) {
          el.append(
            p(`In everyday speech the adjective often comes first, then ${zh('過', 'gwo3')} and the other one. It means just the same as 比.`),
            ctx.words('watermelon-gwai-gwo-apple', 'metro-faai-gwo-bus', 'elder-brother-gou-gwo-ngo', 'elder-sister-daai6-gwo-ngo', 'plane-daai6-gwo-car'),
            tip('<strong>西瓜比蘋果貴 = 西瓜貴過蘋果.</strong> 比 works everywhere, in speech and in writing; 過 is what you\'ll hear most on the street.'),
          );
        },
      },
      {
        id: 'how-much',
        title: 'How much more? · 好多 · 少少',
        render(el, ctx) {
          el.append(
            p(`How much more goes after the adjective: ${zh('好多', 'hou2 do1')} (much) or ${zh('少少', 'siu2 siu2')} (a little).`),
            ctx.words('watermelon-bei-apple-gwai-hou-do', 'cake-bei-flower-gwai-siu-siu', 'metro-faai-gwo-bus-hou-do'),
            p('An amount goes there too. With 大 and 細, years:'),
            ctx.words('elder-sister-bei-ngo-daai6-y3', 'younger-brother-bei-ngo-sai3-y3', 'elder-brother-bei-ngo-daai6-gei-do-seoi-aa'),
          );
        },
      },
      {
        id: 'not-as',
        title: 'Not as … as · 冇…咁, the same · 一樣',
        render(el, ctx) {
          el.append(
            p(`A ${zh('冇', 'mou5')} B ${zh('咁', 'gam3')} + adjective: A isn't as … as B.`),
            ctx.words('bus-mou-metro-gam3-faai', 'apple-mou-watermelon-gam3-gwai', 'ngo-mou-elder-brother-gam3-gou'),
            tip('<strong>The first one is the less one.</strong> 巴士冇港鐵咁快: the bus "doesn\'t have the MTR\'s so-fast", so the MTR is faster. To say "not more", use 冇…咁, not 唔比.'),
            p(`The same: A ${zh('同', 'tung4')} B ${zh('一樣', 'jat1 joeng6')} + adjective. About the same: ${zh('差唔多', 'caa1 m4 do1')}.`),
            ctx.words('jat-joeng'),
            ctx.words('ngo-tung-keoi-jat-joeng-gou', 'ngo-dei-jat-joeng-daai6', 'orange-tung-apple-caa-m-do-daai6', 'ni-loeng-go-jat-joeng-gwai'),
          );
        },
      },
      {
        id: 'which',
        title: 'Which one? · 邊個平啲呀？',
        render(el, ctx) {
          el.append(
            p(`${zh('啲', 'di1')} after an adjective makes "a bit more": ${zh('平啲', 'peng4 di1')}, cheaper. Ask with ${zh('邊個', 'bin1 go3')}, or name both with ${zh('定', 'ding6')}:`),
            ctx.words('bin-go-peng-di-aa', 'bin-go-faai-di-aa', 'watermelon-ding-apple-gwai-di-aa', 'metro-ding-bus-faai-di-aa'),
            p('Answer with 啲, and no 比:'),
            ctx.words('watermelon-gwai-di', 'metro-faai-di', 'ni-go-peng-di'),
            p(`Is that right? ${zh('啱', 'ngaam1')} or ${zh('唔啱', 'm4 ngaam1')}:`),
            ctx.words('ngaam-m-ngaam-aa', 'ngaam', 'm-ngaam'),
          );
        },
      },
      {
        id: 'most',
        title: 'The most · 最',
        render(el, ctx) {
          el.append(
            p(`${zh('最', 'zeoi3')} goes before the adjective: ${zh('最快', 'zeoi3 faai3')}, the fastest.`),
            ctx.words('zeoi'),
            ctx.words('bin-go-zeoi-daai6-aa', 'bin-go-zeoi-peng-aa', 'plane-zeoi-faai', 'elder-brother-zeoi-gou'),
            p(`And before ${zh('鍾意', 'zung1 ji3')} (Unit 16), for what you like best:`),
            ctx.words('ngo-zeoi-zung-ji-jau4-water', 'nei-zeoi-zung-ji-sik6-mat-je-aa'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen, then tap the picture. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: [...V.adjectives, ctx.entry('zeoi'), ctx.entry('jat-joeng')], rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el, ctx) {
          const said = id => { const e = ctx.entry(id); return zh(e.hanzi, e.jyutping); };
          el.append(
            p(`You can compare things: ${said('watermelon-bei-apple-gwai')}, ${said('metro-faai-gwo-bus')}, ${said('bus-mou-metro-gam3-faai')}, ${said('plane-zeoi-faai')}.`),
            p('Practise in <a href="compare.html">Which Is Bigger</a>, or <a href="../">go back to Unit 18</a>.'),
          );
        },
      },
    ],
  });
})();
