/* Unit 14 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u14-learn',
    vocab: V,
    steps: [
      {
        id: 'face',
        title: 'The face',
        render(el, ctx) {
          el.append(
            p(`${zh('身體', 'san1 tai2')} is the body, and your health. On the face:`),
            ctx.words('body', 'eye', 'ear', 'nose', 'mouth', 'tooth', 'throat'),
          );
        },
      },
      {
        id: 'body',
        title: 'The body · 身體',
        render(el, ctx) {
          el.append(
            ctx.words('head', 'hand', 'foot', 'stomach', 'back'),
            tip(`<strong>One word, more body.</strong> ${zh('手', 'sau2')} is the hand and the whole arm; ${zh('腳', 'goek3')} the foot and the whole leg.`),
          );
        },
      },
      {
        id: 'mine',
        title: 'My hand · 我隻手',
        render(el, ctx) {
          el.append(
            p(`Say "my hand" with the measure word, as in 我個仔 (Unit 10). ${zh('隻', 'zek3')} is for one of a pair, and teeth; ${zh('條', 'tiu4')} for the long throat; ${zh('個', 'go3')} for the rest:`),
            ctx.grid(V.mine),
          );
        },
      },
      {
        id: 'hurt',
        title: 'It hurts · 痛',
        render(el, ctx) {
          el.append(
            p(`The body part, then ${zh('痛', 'tung3')}. No "have", no "a":`),
            ctx.words('tung3', 'ngo-head-tung3'),
            ctx.grid(V.aches),
            p('Or with the measure word and 好, when one part hurts a lot:'),
            ctx.words('ngo-go-head-hou-tung3', 'ngo-zek-foot-hou-tung3', 'ngo-tiu-throat-hou-tung3'),
          );
        },
      },
      {
        id: 'doctor',
        title: 'Seeing a doctor · 睇醫生',
        render(el, ctx) {
          el.append(
            p(`You "look at" a doctor with ${zh('睇', 'tai2')}, and "eat" medicine with 食 (Unit 8):`),
            ctx.words('ji-sang', 'tai-ji-sang', 'joek', 'sik6-joek', 'jau-sik'),
            p('What the doctor asks, and what\'s wrong:'),
            ctx.words('nei-bin-dou-m-syu-fuk-aa', 'nei-bin-dou-tung3-aa', 'm-syu-fuk'),
            ctx.grid([...V.symptoms, ctx.entry('cold')]),
          );
        },
      },
      {
        id: 'jau-mou',
        title: 'Have you got…? · 有冇',
        render(el, ctx) {
          el.append(
            p(`${zh('有', 'jau5')} and its opposite ${zh('冇', 'mou5')} together ask "have or not?", like 係唔係 (Unit 3). Answer with just one of them:`),
            ctx.words('mou', 'jau-mou', 'nei-jau-mou-fever-aa', 'nei-jau-mou-cough-aa'),
            ctx.words('ngo-mou-fever', 'ngo-jau-di-fever'),
            tip(`<strong>冇, never 唔有.</strong> 冇 is the only way to say "not have", and before a verb it means "didn't": 我冇發燒.`),
          );
        },
      },
      {
        id: 'zo',
        title: 'Done · 咗 and 未',
        render(el, ctx) {
          el.append(
            p(`${zh('咗', 'zo2')}, straight after the verb, says it's done: it has happened.`),
            ctx.words('zo2', 'ngo-sik6-zo2-joek', 'ngo-gam-jat-tai-zo2-ji-sang', 'ngo-cold-zo2'),
            p(`Ask "yet?" with ${zh('未', 'mei6')} at the end. Answer with the verb and 咗, or 未, "not yet":`),
            ctx.words('mei', 'nei-sik6-zo2-joek-mei-aa', 'sik6-zo2', 'ngo-mei-sik6-joek'),
            tip(`<strong>食咗飯未呀？</strong> "Have you eaten yet?" is also how friends say hello. Answer 食咗 or 未呀.`),
            ctx.words('nei-sik6-zo2-rice-mei-aa'),
          );
        },
      },
      {
        id: 'rx',
        title: 'The prescription',
        render(el, ctx) {
          el.append(
            p(`How often, with ${zh('次', 'ci3')} (times), and how many with ${zh('粒', 'nap1')}, the measure word for pills. ${zh('每', 'mui5')} is "each":`),
            ctx.words('ci', 'nap', 'mui'),
            ctx.grid(V.rx.filter(e => [2, 3].includes(e.times))),
            p('And some advice:'),
            ctx.words('nei-jiu-sik6-joek', 'nei-jiu-do-di-jau-sik', 'ngo-jiu-heoi-hospital', 'zou-di-hou-faan-laa1', 'bou-zung'),
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
          ctx.listenQuiz(quiz, { pool: [...V.body.filter(e => e.id !== 'body'), ...V.aches, ...V.symptoms], rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can tell a doctor what's wrong: ${zh('我頭痛', 'ngo5 tau4 tung3')}, ${zh('我冇發燒', 'ngo5 mou5 faat3 siu1')}, ${zh('我食咗藥', 'ngo5 sik6 zo2 joek6')}.`),
            p('Practise in <a href="doctor.html">Doctor\'s Visit</a>, or <a href="../">go back to Unit 14</a>.'),
          );
        },
      },
    ],
  });
})();
