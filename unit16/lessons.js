/* Unit 16 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u16-learn',
    vocab: V,
    steps: [
      {
        id: 'sport',
        title: 'Sport and out of doors',
        render(el, ctx) {
          el.append(
            p(`Hobbies are a verb and a thing, like the day in Unit 15: ${zh('游水', 'jau4 seoi2')} is "swim the water".`),
            ctx.words('daa-ball', 'tek-ball', 'jau4-water', 'haang-saan', 'caai-daan-ce'),
            tip(`<strong>打 hits, 踢 kicks.</strong> 打波 is a game with a ball in your hands, usually basketball; 踢波 is football.`),
          );
        },
      },
      {
        id: 'indoors',
        title: 'Films, music and more',
        render(el, ctx) {
          el.append(
            ctx.words('tai-hei3', 'teng-go1', 'coeng-kei', 'daa-gei1', 'tiu-mou5', 'jing-soeng2', 'waak-waa', 'haang-gaai'),
            p('And from Unit 15:'),
            ctx.words('tai-book', 'tai-din-si'),
            tip(`<strong>畫畫 is one character read twice.</strong> The verb is waak6, the picture waa2: ${zh('畫畫', 'waak6 waa2')}, "draw a picture".`),
          );
        },
      },
      {
        id: 'parts',
        title: 'Verb + thing',
        render(el, ctx) {
          el.append(
            p('The verbs:'),
            ctx.grid([...V.verbs, ...['daa', 'tai'].map(ctx.entry)]),
            p('And what they are done to:'),
            ctx.grid([...V.things, ...['ball', 'water'].map(ctx.entry)]),
            p(`As in Unit 15, ${zh('過', 'gwo3')} goes straight after the verb, inside the hobby:`),
            ctx.words('nei-jau-mou-coeng-gwo-kei-aa', 'ngo-mei-haang-gwo-saan'),
            tip('<strong>One verb, many hobbies.</strong> 行 walks the hills (行山) and the streets (行街); 打 hits a ball (打波) and a games machine (打機), and in Unit 13 the wind (打風).'),
          );
        },
      },
      {
        id: 'like',
        title: 'I like it · 鍾意',
        render(el, ctx) {
          el.append(
            p(`${zh('鍾意', 'zung1 ji3')} (to like) goes before the hobby, and ${zh('唔', 'm4')} before 鍾意:`),
            ctx.words('zung-ji', 'ngo-zung-ji-jau4-water', 'ngo-m-zung-ji-jau4-water'),
            p(`${zh('好', 'hou2')} makes it "really", and ${zh('都', 'dou1')} "too":`),
            ctx.words('ngo-hou-zung-ji-tai-hei3', 'ngo-dou-zung-ji-tai-hei3', 'keoi-zung-ji-daa-gei1'),
            p('You can like a thing, too:'),
            ctx.words('ngo-zung-ji-cat'),
          );
        },
      },
      {
        id: 'ask',
        title: 'Do you like it? · 鍾唔鍾意',
        render(el, ctx) {
          el.append(
            p(`Ask A唔A, as with 係唔係 (Unit 3). With a two-syllable verb only the first syllable comes twice: ${zh('鍾唔鍾意', 'zung1 m4 zung1 ji3')}.`),
            ctx.words('zung', 'nei-zung-m-zung-ji-tai-hei3-aa', 'nei-zung-m-zung-ji-haang-saan-aa'),
            p('Answer with the verb, not "yes" or "no":'),
            ctx.words('zung-ji', 'm-zung-ji'),
            p('Asking about hobbies:'),
            ctx.words('hing-ceoi', 'dak-haan', 'nei-jau-mat-je-hing-ceoi-aa', 'nei-dak-haan-zou6-mat-je-aa', 'ngo-dak-haan-zung-ji-teng-go1'),
            tip('<strong>No word for "yes".</strong> Cantonese answers with the verb it was asked: 鍾意, 唔鍾意; 識, 唔識; 想, 唔想.'),
          );
        },
      },
      {
        id: 'can',
        title: 'I can · 識',
        render(el, ctx) {
          el.append(
            p(`${zh('識', 'sik1')} (Unit 3) is to know how to: for things you learn, like swimming or a language.`),
            ctx.words('ngo-sik-jau4-water', 'ngo-m-sik-tiu-mou5', 'nei-sik-m-sik-caai-daan-ce-aa', 'sik', 'm-sik'),
            p(`You'll hear ${zh('會', 'wui5')} for "can" too:`),
            ctx.words('ngo-wui-jau4-water'),
            tip('<strong>識 or 會?</strong> For a skill, both: 我識游水, 我會游水. 識 is the everyday word; 會 also means "will" (Unit 13), as in the next step.'),
          );
        },
      },
      {
        id: 'want',
        title: 'Want to, and plans · 想',
        render(el, ctx) {
          el.append(
            p(`${zh('想', 'soeng2')} (want to) goes before the verb. Put ${zh('去', 'heoi3')} before a hobby you go out for:`),
            ctx.words('soeng', 'nei-soeng-zou6-mat-je-aa', 'ngo-soeng-heoi-haang-saan', 'nei-soeng-m-soeng-heoi-tek-ball-aa', 'm-soeng'),
            p(`Asking someone along: ${zh('一齊', 'jat1 cai4')} (together)…呀, and they say ${zh('好呀', 'hou2 aa3')}:`),
            ctx.words('zau-mut', 'jat-cai', 'zau-mut-jat-cai-heoi-coeng-kei-aa', 'hou-aa'),
            p(`Plans with ${zh('會', 'wui5')} (will), the day before it:`),
            ctx.words('ngo-wk6-wui-heoi-jau4-water', 'nei-ting-jat-wui-m-wui-heoi-tek-ball-aa'),
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
          ctx.listenQuiz(quiz, { pool: V.hobbies, rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el, ctx) {
          const said = id => { const e = ctx.entry(id); return zh(e.hanzi, e.jyutping); };
          el.append(
            p(`You can talk about your free time: ${said('ngo-hou-zung-ji-tai-hei3')}, ${said('nei-sik-m-sik-jau4-water-aa')}, ${said('ngo-soeng-heoi-haang-saan')}.`),
            p('Practise in <a href="survey.html">Survey</a>, or <a href="../">go back to Unit 16</a>.'),
          );
        },
      },
    ],
  });
})();
