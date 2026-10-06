/* Unit 4 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  const words = (ctx, ...ids) => ctx.grid(ids.map(ctx.entry));
  const nums = (ctx, ...ns) => words(ctx, ...ns.map(n => `n${n}`));

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u4-learn',
    vocab: V,
    steps: [
      {
        id: 'one-five',
        title: '一 to 五',
        render(el, ctx) {
          el.append(
            p('Tap each number to hear it. The pictures show how to count on one hand in Hong Kong: one hand goes all the way to ten.'),
            nums(ctx, 1, 2, 3, 4, 5),
          );
        },
      },
      {
        id: 'six-ten',
        title: '六 to 十',
        render(el, ctx) {
          el.append(
            p('From six on, the hand signs are not "five plus one". Each has its own shape:'),
            nums(ctx, 6, 7, 8, 9, 10),
            tip(`<strong>四 or 十?</strong> ${zh('四', 'sei3')} (4) and ${zh('十', 'sap6')} (10) are easy to mix up. 十 ends in a closed <em>p</em>: your lips shut and no air comes out.`),
            p(`And ${zh('零', 'ling4')}, zero, which also fills gaps inside bigger numbers:`),
            nums(ctx, 0),
            tip('<strong>Lucky and unlucky:</strong> 8 sounds like "get rich" and is everywhere in prices and phone numbers. 4 sounds like "die", so many buildings skip the 4th floor.'),
          );
        },
      },
      {
        id: 'teens',
        title: '11 to 19',
        render(el, ctx) {
          el.append(
            p(`Eleven is ${zh('十一', 'sap6 jat1')}, "ten one". Every teen works the same way: 十 and then the digit.`),
            nums(ctx, 11, 12, 14, 15, 19),
          );
        },
      },
      {
        id: 'tens',
        title: 'Tens and 廿',
        render(el, ctx) {
          el.append(
            p(`Twenty is ${zh('二十', 'ji6 sap6')}, "two tens". Put the digit after it: 三十五 is "three ten five", 35.`),
            nums(ctx, 20, 30, 35, 40, 99),
            p(`From 21 to 29 people say ${zh('廿', 'jaa6')} for "twenty-". 二十一 is correct too, but you will hear 廿一.`),
            nums(ctx, 21, 22, 28),
            tip('<strong>十四 or 四十?</strong> The 十 comes first in 14 (ten four) and last in 40 (four ten).'),
          );
        },
      },
      {
        id: 'fast',
        title: 'In fast speech',
        render(el, ctx) {
          el.append(
            p(`In quick, casual speech the 十 in the middle of 31–99 shrinks to <em>aa6</em>. Thirty-something even has its own character, ${zh('卅', 'saa1 aa6')}.`),
            words(ctx, ...V.short.map(e => e.id)),
            tip('You don\'t need to say these, but listen for them: prices at the market and phone numbers are often read this way.'),
          );
        },
      },
      {
        id: 'big',
        title: '百, 千, 萬',
        render(el, ctx) {
          el.append(
            p('Hundred, thousand, and ten thousand. Say each digit with its place: 三百六十 is "three hundred six ten", 360.'),
            words(ctx, 'baak', 'cin', 'maan'),
            nums(ctx, 100, 360, 1000, 3500, 10000),
            p(`When a place in the middle is empty, say ${zh('零', 'ling4')} once:`),
            nums(ctx, 101, 1001, 3008),
            tip('<strong>Think in 萬s:</strong> English groups digits in threes (100,000); Cantonese groups them in fours. 100,000 is 十萬, "ten ten-thousands", and a million is 一百萬.'),
            nums(ctx, 100000, 1000000),
          );
        },
      },
      {
        id: 'two',
        title: '二 or 兩?',
        render(el, ctx) {
          el.append(
            p(`Cantonese has two words for two. ${zh('二', 'ji6')} is for counting and inside numbers. ${zh('兩', 'loeng5')} is for "two of something", with a measure word like ${zh('個', 'go3')}:`),
            words(ctx, 'loeng', 'go', 'loeng-go'),
            p('A 2 at the very start, before 百, 千 or 萬, is also 兩:'),
            nums(ctx, 200, 2000, 20000),
            p('Everywhere else it stays 二: in 12, 20, 22, and in 第二 (second).'),
            nums(ctx, 12, 20, 22),
            words(ctx, 'dai-2'),
          );
        },
      },
      {
        id: 'which',
        title: '第 and 幾多',
        render(el, ctx) {
          el.append(
            p(`Put ${zh('第', 'dai6')} in front of a number to make first, second, third:`),
            words(ctx, 'dai', 'dai-1', 'dai-2', 'dai-3'),
            p(`${zh('幾多', 'gei2 do1')} asks "how many" or "how much". Answer with the number and its measure word:`),
            words(ctx, 'gei-do', 'gei-do-go', 'loeng-go'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen to the number, then tap it. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: V.numbers.slice(0, 11), rounds: 8, choices: 4, show: 'numeral' });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can count from ${zh('零', 'ling4')} to ${zh('一百萬', 'jat1 baak3 maan6')}, and you know when two is 兩.`),
            p('Race the clock in <a href="dash.html">Number Dash</a>, or <a href="../">go back to Unit 4</a>.'),
          );
        },
      },
    ],
  });
})();
