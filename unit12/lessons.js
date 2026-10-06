/* Unit 12 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u12-learn',
    vocab: V,
    steps: [
      {
        id: 'colours',
        title: 'Colours · 顏色',
        render(el, ctx) {
          el.append(
            p(`${zh('顏色', 'ngaan4 sik1')} is colour, and every colour ends in ${zh('色', 'sik1')}:`),
            ctx.words('ngaan-sik'),
            ctx.grid(V.colours.slice(0, 6)),
          );
        },
      },
      {
        id: 'more-colours',
        title: 'More colours',
        render(el, ctx) {
          el.append(
            ctx.grid(V.colours.slice(6)),
            tip(`<strong>From things you know.</strong> ${zh('橙色', 'caang2 sik1')} is the colour of an orange (Unit 6), and ${zh('啡色', 'fe1 sik1')} the colour of 咖啡.`),
            p('Ask which colour with 乜嘢 (Unit 3):'),
            ctx.words('mat-je-ngaan-sik'),
          );
        },
      },
      {
        id: 'clothes',
        title: 'Clothes · 衫',
        render(el, ctx) {
          el.append(
            p('From Unit 5, with their measure words:'),
            ctx.words('shirt', 'trousers', 'shoes'),
            p('And some more:'),
            ctx.grid(V.clothes.filter(e => !e.unit)),
            p(`A hat is counted with ${zh('頂', 'deng2')}, glasses with ${zh('副', 'fu3')}; a coat is a top (件), a skirt is long (條):`),
            ctx.grid(V.ones),
          );
        },
      },
      {
        id: 'wear',
        title: 'Wearing · 著 and 戴',
        render(el, ctx) {
          el.append(
            p(`English has one "wear"; Cantonese has two. ${zh('著', 'zoek3')} is for what you get into: clothes and shoes.`),
            ctx.words('zoek', 'ngo-zoek-shirt', 'ngo-zoek-trousers', 'ngo-zoek-coat', 'ngo-zoek-skirt', 'ngo-zoek-shoes'),
            p(`${zh('戴', 'daai3')} is for what you put on: a hat, glasses, a watch.`),
            ctx.words('daai', 'ngo-daai-hat', 'ngo-daai-glasses', 'keoi-daai-glasses'),
          );
        },
      },
      {
        id: 'ge',
        title: 'A red top · 紅色嘅衫',
        render(el, ctx) {
          el.append(
            p(`A colour goes before the thing, joined by ${zh('嘅', 'ge3')} (Unit 10):`),
            ctx.words('hung-ge-shirt', 'laam-ge-trousers', 'hak-ge-hat', 'fan-hung-ge-skirt', 'baak-ge-shoes'),
            p('In speech the 嘅 is often left out:'),
            ctx.words('hung-shirt'),
            ctx.words('keoi-zoek-hung-ge-shirt', 'keoi-zoek-laam-ge-trousers-tung-baak-ge-shoes', 'ngo-daai-hak-ge-hat'),
          );
        },
      },
      {
        id: 'which',
        title: 'What colour is it?',
        render(el, ctx) {
          el.append(
            p('Ask about "your top" with the measure word, as in Unit 10. Answer with 係 and the colour, and 嘅 for "one":'),
            ctx.words('nei-gin-shirt-hai-mat-je-ngaan-sik-aa', 'ngo-gin-shirt-hai-laam-ge'),
            tip(`<strong>係藍色嘅.</strong> "It's a blue one", like 係我嘅, "it's mine".`),
            p(`Shopping for clothes, with ${zh('靚', 'leng3')}, pretty:`),
            ctx.words('leng', 'ni-tiu-skirt-hou-leng', 'ni-gin-coat-gei-do-cin-aa', 'ngo-jiu-baak-ge-shoes', 'ngo-m-zoek-coat'),
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
          ctx.listenQuiz(quiz, { pool: [...V.colours, ...V.coloured], rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can say what people wear: ${zh('佢著紅色嘅衫', 'keoi5 zoek3 hung4 sik1 ge3 saam1')}, ${zh('我戴眼鏡', 'ngo5 daai3 ngaan5 geng2')}.`),
            p('Practise in <a href="dress.html">Dress Up</a>, or <a href="../">go back to Unit 12</a>.'),
          );
        },
      },
    ],
  });
})();
