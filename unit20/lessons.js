/* Unit 20 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  const words = (ctx, ...ids) => ctx.grid(ids.map(ctx.entry));
  const said = (ctx, id) => { const e = ctx.entry(id); return zh(e.hanzi, e.jyutping); };

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u20-learn',
    vocab: V,
    steps: [
      {
        id: 'fruit',
        title: 'Fruit · 生果',
        render(el, ctx) {
          el.append(
            p(`${zh('生果', 'saang1 gwo2')} is fruit. You know 蘋果 (Unit 5), 橙 and 西瓜 (Unit 6) already.`),
            words(ctx, 'banana', 'grapes', 'strawberry', 'mango', 'pineapple', 'pear', 'apple', 'orange', 'watermelon'),
            tip(`<strong>Borrowed from English:</strong> ${said(ctx, 'pear')} is "pear" and ${said(ctx, 'strawberry')} "strawberry".`),
          );
        },
      },
      {
        id: 'veg',
        title: 'Vegetables · 菜',
        render(el, ctx) {
          el.append(
            p(`${zh('菜', 'coi3')} is vegetables, and greens in particular.`),
            words(ctx, 'choy-sum', 'bok-choy', 'tomato', 'potato', 'carrot'),
            p('Fruit or vegetable?'),
            words(ctx, 'tomato-hai-saang-gwo-ding-hai-coi-aa', 'coi'),
            tip(`<strong>番茄 is 菜</strong> in the kitchen and at the market, even if a botanist calls it a fruit.`),
          );
        },
      },
      {
        id: 'measure',
        title: 'One of them · 一條 一粒 一棵',
        render(el, ctx) {
          el.append(
            p(`Round things take ${zh('個', 'go3')}; long ones ${zh('條', 'tiu4')}; small round ones ${zh('粒', 'nap1')}; and leafy greens ${zh('棵', 'po1')}.`),
            words(ctx, 'one-mango', 'one-banana', 'one-carrot', 'one-grapes', 'one-strawberry', 'one-choy-sum'),
          );
        },
      },
      {
        id: 'gan',
        title: 'By the catty · 斤',
        render(el, ctx) {
          el.append(
            p(`Markets sell by weight, in ${zh('斤', 'gan1')} (catties). A catty is about 600 grams.`),
            words(ctx, 'gan'),
            words(ctx, 'w05', 'w1', 'w15', 'w2', 'w3'),
            tip(`<strong>Halves go after 斤:</strong> 兩斤半 is two and a half catties. Half a catty is 半斤, and one and a half is 斤半, like 百五 (Unit 4).`),
          );
        },
      },
      {
        id: 'price',
        title: 'How much a catty? · 幾多錢一斤呀？',
        render(el, ctx) {
          el.append(
            words(ctx, 'gaai-si'),
            p('Ask the price of a catty. The answer puts the price first:'),
            words(ctx, 'banana-gei-do-cin-w1-aa', 'p1200-w1', 'mango-gei-do-cin-w1-aa', 'p2000-w1'),
            p(`Say how much you want, like a count: ${zh('兩斤香蕉', 'loeng5 gan1 hoeng1 ziu1')}, like 兩個橙.`),
            words(ctx, 'ngo-jiu-w2-banana', 'ngo-jiu-w15-pineapple', 'ngo-jiu-w05-mango'),
            p(`And when you pay, ${zh('一共', 'jat1 gung6')}: altogether.`),
            words(ctx, 'jat-gung-gei-do-cin-aa'),
          );
        },
      },
      {
        id: 'di',
        title: 'Some · 啲',
        render(el, ctx) {
          el.append(
            p(`${zh('啲', 'di1')} before a noun means "some". At the start of a sentence it means "the" (more than one), as in Unit 5.`),
            words(ctx, 'ngo-soeng-maai5-di-saang-gwo', 'jiu-m-jiu-di-grapes-aa', 'ngo-jiu-di-choy-sum', 'di-strawberry-hou-sweet', 'di-banana-hou-san-sin'),
            p('Fresh, sweet or sour?'),
            words(ctx, 'san-sin', 'sweet', 'syun', 'ni-di-mango-hou-sweet', 'ni-di-orange-hou-syun'),
          );
        },
      },
      {
        id: 'market',
        title: 'Going to the market',
        render(el, ctx) {
          el.append(words(ctx, 'ngo-heoi-gaai-si-maai5-coi', 'ngo-zeoi-zung-ji-sik6-mango', 'jat-gung-gei-do-cin-aa'));
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen, then tap the fruit or vegetable. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: [...V.fruit, ...V.veg], rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el, ctx) {
          el.append(
            p(`You can shop at a wet market: ${said(ctx, 'banana-gei-do-cin-w1-aa')} ${said(ctx, 'ngo-jiu-w2-banana')} ${said(ctx, 'jat-gung-gei-do-cin-aa')}`),
            p('Practise at the <a href="market.html">Wet Market</a>, or <a href="../">go back to Unit 20</a>.'),
          );
        },
      },
    ],
  });
})();
