/* Unit 3 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  const words = (ctx, ...ids) => ctx.grid(ids.map(ctx.entry));

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u3-learn',
    vocab: V,
    steps: [
      {
        id: 'people',
        title: '我, 你, 佢',
        render(el, ctx) {
          el.append(
            p('In the pictures, the person in red is talking (see the speech bubble) to the person on the right. They point at who the word means, and a gold ring goes around them.'),
            words(ctx, 'ngo', 'nei', 'keoi'),
            tip(`<strong>One word for he, she and it:</strong> ${zh('佢', 'keoi5')} doesn't tell you if the person is a man or a woman. All three words are tone 5, low rising.`),
          );
        },
      },
      {
        id: 'dei',
        title: 'More than one · 哋',
        render(el, ctx) {
          el.append(
            p(`Add ${zh('哋', 'dei6')} to make any of them plural. No other changes, no exceptions.`),
            words(ctx, 'ngo-dei', 'nei-dei', 'keoi-dei'),
          );
        },
      },
      {
        id: 'hai',
        title: 'I am · 係',
        render(el, ctx) {
          el.append(
            p(`${zh('係', 'hai6')} joins two nouns: person 係 what they are. It is the same for everyone: 我係, 你係, 佢哋係. Verbs never change their form.`),
            words(ctx, 'hai'),
            words(ctx, 'lou-si', 'hok-saang', 'pang-jau', 'hoeng-gong-jan', 'jing-gwok-jan', 'mei-gwok-jan'),
            p('Put them together:'),
            words(ctx, 'ngo-hai-hok-saang', 'keoi-hai-lou-si', 'ngo-dei-hai-pang-jau', 'keoi-hai-ngo-pang-jau'),
            tip('<strong>No "a" or "the":</strong> 我係學生 is "I am student". Cantonese has no articles and no plural endings.'),
          );
        },
      },
      {
        id: 'm',
        title: 'Not · 唔',
        render(el, ctx) {
          el.append(
            p(`Put ${zh('唔', 'm4')} right before the verb to say "not". 唔 is a hum through your nose, with your lips closed: no vowel.`),
            words(ctx, 'm'),
            words(ctx, 'ngo-m-hai-lou-si', 'keoi-dei-m-hai-jing-gwok-jan'),
            p(`It works with every verb. ${zh('識', 'sik1')} means "know how to", for skills like languages:`),
            words(ctx, 'sik', 'gong', 'gwong-dung-waa', 'jing-man'),
            words(ctx, 'ngo-sik-gong-gwong-dung-waa', 'keoi-m-sik-gong-jing-man'),
            p(`And ${zh('都', 'dou1')}, "also", goes before the verb too:`),
            words(ctx, 'dou', 'ngo-dou-hai-hoeng-gong-jan'),
          );
        },
      },
      {
        id: 'name',
        title: 'My name is · 我叫',
        render(el, ctx) {
          el.append(
            p(`${zh('叫', 'giu3')} means "to be called". Say 我叫 and your name.`),
            words(ctx, 'giu', 'aa-ming', 'ngo-giu-aa-ming'),
            p('To ask someone\'s name, and to turn the question back:'),
            words(ctx, 'meng', 'nei-giu-mat-je-meng-aa', 'nei-ne'),
            tip(`<strong>你呢？</strong> ${zh('呢', 'ne1')} after a person means "and what about ...?". It saves repeating the whole question.`),
          );
        },
      },
      {
        id: 'maa',
        title: 'Yes/no questions · 嗎',
        render(el, ctx) {
          el.append(
            p(`The easiest way to ask: take a sentence and add ${zh('嗎', 'maa3')} at the end. The word order stays the same.`),
            words(ctx, 'maa'),
            words(ctx, 'nei-hai-hok-saang-maa', 'keoi-hai-lou-si-maa', 'nei-sik-gong-gwong-dung-waa-maa'),
          );
        },
      },
      {
        id: 'a-not-a',
        title: 'Is or isn\'t? · 係唔係',
        render(el, ctx) {
          el.append(
            p('People ask yes/no questions more often by saying the verb, 唔, and the verb again: "are not are", "can not can". This is called A唔A. It ends with a friendly 呀, never 嗎.'),
            words(ctx, 'aa'),
            words(ctx, 'nei-hai-m-hai-hok-saang-aa', 'keoi-hai-m-hai-hoeng-gong-jan-aa', 'nei-sik-m-sik-gong-jing-man-aa'),
            p('Cantonese has no word for "yes" or "no". Answer with the verb from the question, or 唔 and the verb:'),
            words(ctx, 'hai-aa', 'm-hai-aa', 'sik-aa', 'm-sik-aa', 'siu-siu', 'sik-siu-siu', 'ngo-dou-hai'),
            tip(`<strong>In fast speech</strong> 係唔係 is squeezed into ${zh('係咪', 'hai6 mai6')}. You don't need to say it, but you will hear it all the time.`),
            words(ctx, 'hai-mai'),
          );
        },
      },
      {
        id: 'who-what',
        title: 'Who and what · 邊個, 乜嘢',
        render(el, ctx) {
          el.append(
            p(`English moves "who" and "what" to the front. Cantonese doesn't: put ${zh('邊個', 'bin1 go3')} or ${zh('乜嘢', 'mat1 je5')} where the answer will go.`),
            words(ctx, 'bin-go', 'mat-je'),
            words(ctx, 'keoi-hai-bin-go-aa', 'bin-go-hai-lou-si-aa', 'keoi-giu-mat-je-meng-aa', 'nei-gong-mat-je-aa'),
            tip(`<strong>Swap the answer in:</strong> ${zh('佢係邊個呀？', 'keoi5 hai6 bin1 go3 aa3')} Who is that? ${zh('佢係阿明。', 'keoi5 hai6 aa3 ming4')} That's Ah Ming. A question with 邊個 or 乜嘢 never takes 嗎.`),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen to the word, then tap its picture. Watch for 哋! Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: Canto.entries(V).filter(e => e.img !== false), rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can say who you are, ${zh('我係學生', 'ngo5 hai6 hok6 saang1')}, and ask others three ways: with 嗎, with 係唔係, and with 邊個 or 乜嘢.`),
            p('Build your own questions in <a href="builder.html">Question Builder</a>, or <a href="../">go back to Unit 3</a>.'),
          );
        },
      },
    ],
  });
})();
