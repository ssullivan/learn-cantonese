/* Unit 19 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  const said = (ctx, id) => { const e = ctx.entry(id); return zh(e.hanzi, e.jyutping); };

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u19-learn',
    vocab: V,
    steps: [
      {
        id: 'farm',
        title: 'Farm animals and pets',
        render(el, ctx) {
          el.append(
            p(`${zh('動物', 'dung6 mat6')} are animals. Some you know already: 牛, 雞 and 魚 (Unit 1), 貓 and 狗 (Unit 5).`),
            ctx.words('pig', 'horse', 'sheep', 'cow', 'chicken', 'cat', 'dog', 'mouse'),
            tip(`<strong>馬 maa5, 媽 maa1.</strong> A horse and a mum differ only in tone. 馬 is low rising, 媽 high and level.`),
          );
        },
      },
      {
        id: 'zoo',
        title: 'At the zoo · 動物園',
        render(el, ctx) {
          el.append(
            ctx.words('dung-mat-jyun', 'tiger', 'panda', 'monkey', 'bird', 'rabbit', 'snake', 'fish'),
            p('And one you won\'t see at the zoo:'),
            ctx.words('dragon'),
            tip(`<strong>Little ones get 仔:</strong> ${said(ctx, 'bird')}, ${said(ctx, 'rabbit')}. And 老 in ${said(ctx, 'tiger')} and ${said(ctx, 'mouse')} doesn't mean old.`),
          );
        },
      },
      {
        id: 'measure',
        title: '隻 or 條',
        render(el, ctx) {
          el.append(
            p(`Most animals are counted with ${zh('隻', 'zek3')}. Long, thin ones take ${zh('條', 'tiu4')}, like trousers and roads (Unit 5).`),
            ctx.words('one-tiger', 'one-bird', 'one-snake', 'one-dragon', 'one-fish'),
            ctx.words('n3-tiger', 'n6-snake', 'n2-sheep', 'n2-mouse'),
            p(`Which one? ${zh('邊', 'bin1')} + the measure word:`),
            ctx.words('bin-zek', 'bin-tiu'),
          );
        },
      },
      {
        id: 'can',
        title: 'Birds can fly · 雀仔會飛',
        render(el, ctx) {
          el.append(
            p(`${zh('會', 'wui5')} before a verb says what an animal can do. ${zh('唔會', 'm4 wui5')}: can't.`),
            ctx.words('fei', 'jau4-water', 'paa-syu', 'haang', 'zau', 'tiu3'),
            ctx.words('bird-wui-fei', 'fish-wui-jau4-water', 'monkey-wui-paa-syu', 'rabbit-wui-tiu3', 'tiger-wui-jau4-water',
              'fish-m-wui-haang', 'pig-m-wui-fei'),
            tip('<strong>走 is run, 行 is walk.</strong> 馬會走: horses can run. In Mandarin 走 means walk, so watch out.'),
          );
        },
      },
      {
        id: 'ask',
        title: 'Can it? · 會唔會',
        render(el, ctx) {
          el.append(
            p('Ask with 會唔會, and answer 會 or 唔會:'),
            ctx.words('bird-wui-m-wui-fei-aa', 'panda-wui-m-wui-paa-syu-aa', 'snake-wui-m-wui-zau-aa', 'wui', 'm-wui'),
            p(`Which one can? ${zh('邊隻', 'bin1 zek3')} + 會:`),
            ctx.words('bin-zek-wui-fei-aa', 'bin-zek-wui-paa-syu-aa'),
          );
        },
      },
      {
        id: 'zodiac',
        title: 'The zodiac · 生肖',
        render(el, ctx) {
          const order = V.zodiac.map(z => { const [, , sign] = z.words; return said(ctx, sign); }).join(' ');
          el.append(
            p(`Each year belongs to one of twelve animals, in this order: ${order}. 2020 was the Rat, and 2026 is the Horse.`),
            ctx.words('saang-ciu', 'suk', 'nei-suk-mat-je-aa', 'n2-n0-n2-n6-nin-hai-horse-nin'),
            p(`Say yours with ${zh('屬', 'suk6')}:`),
            ctx.grid(V.zodiac),
            tip('<strong>Four go by a shorter name</strong> in the zodiac: 鼠 (老鼠), 虎 (老虎), 兔 (兔仔) and 猴 (馬騮).'),
            ctx.words('z-syu', 'z-fu', 'z-tou', 'z-hau'),
          );
        },
      },
      {
        id: 'sentences',
        title: 'Going to the zoo',
        render(el, ctx) {
          el.append(
            ctx.words('ngo-soeng-heoi-dung-mat-jyun', 'dung-mat-jyun-jau-panda', 'dung-mat-jyun-jau-loeng-zek-panda',
              'nei-zeoi-zung-ji-mat-je-dung-mat-aa', 'ngo-zeoi-zung-ji-panda', 'tiger-bei-cat-daai6', 'horse-bei-pig-faai'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen, then tap the animal. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: [...V.animals, ...V.pets], rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el, ctx) {
          el.append(
            p(`You can name the animals, count them (${said(ctx, 'n3-tiger')}, ${said(ctx, 'n6-snake')}), say what they can do (${said(ctx, 'bird-wui-fei')}), and give your zodiac sign (${said(ctx, 'ngo-suk-horse')}).`),
            p('Practise in the <a href="zoo.html">Zoo</a>, or <a href="../">go back to Unit 19</a>.'),
          );
        },
      },
    ],
  });
})();
