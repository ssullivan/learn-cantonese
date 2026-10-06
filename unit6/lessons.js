/* Unit 6 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  // Price entries are named by cents: price(3.5) is p350, 三蚊半.
  const price = n => `p${Math.round(n * 100)}`;
  const prices = (ctx, ...ns) => ctx.words(...ns.map(price));

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u6-learn',
    vocab: V,
    steps: [
      {
        id: 'money',
        title: 'Money · 錢',
        render(el, ctx) {
          el.append(
            p(`${zh('錢', 'cin2')} is money. A dollar is ${zh('蚊', 'man1')}, and ten cents is ${zh('毫', 'hou4')}. Hong Kong has no smaller coin.`),
            ctx.words('cin2', 'man', 'hou4'),
            p('Tap each coin and note to hear it:'),
            ctx.grid(V.cash),
            tip(`<strong>蚊 is spoken.</strong> Price tags write $ or 元 (jyun4), but people say 蚊.`),
          );
        },
      },
      {
        id: 'prices',
        title: 'Prices · 三蚊半',
        render(el, ctx) {
          el.append(
            p(`A price is a number and ${zh('蚊', 'man1')}. 蚊 works like a measure word, so two dollars is ${zh('兩蚊', 'loeng5 man1')}:`),
            prices(ctx, 2, 3, 12, 28),
            p(`Under a dollar, count ${zh('毫', 'hou4')}:`),
            prices(ctx, 0.2, 0.5, 0.8),
            p(`With dollars and cents, leave out the 毫: a digit after 蚊 is tens of cents, and ${zh('半', 'bun3')} (half) is 50 cents.`),
            ctx.words('bun3'),
            prices(ctx, 3.5, 3.2, 8.5, 9.9),
          );
        },
      },
      {
        id: 'big',
        title: 'Big prices · 百五蚊',
        render(el, ctx) {
          el.append(
            p(`Round prices drop their last unit, and a leading 一 with it: ${zh('一百五十', 'jat1 baak3 ng5 sap6')} becomes ${zh('百五', 'baak3 ng5')}.`),
            prices(ctx, 150, 250, 380, 1200, 12000),
            tip(`<strong>百五 is 150, not 105.</strong> 105 is ${zh('一百零五', 'jat1 baak3 ling4 ng5')}: 零 fills the gap, as in Unit 4.`),
          );
        },
      },
      {
        id: 'ask',
        title: 'How much? · 幾多錢',
        render(el, ctx) {
          el.append(
            p(`Ask ${zh('幾多錢呀？', 'gei2 do1 cin2 aa3')}, "how much money?". Point with ${zh('呢個', 'ni1 go3')} or ${zh('嗰個', 'go2 go3')}, or use the thing's own measure word from Unit 5:`),
            ctx.words('gei-do-cin2-aa', 'ni-go-gei-do-cin2-aa', 'go2-go-gei-do-cin2-aa', 'ni-bun-book-gei-do-cin2-aa'),
            p('Things you can buy in this unit:'),
            ctx.grid(V.things),
          );
        },
      },
      {
        id: 'adjectives',
        title: 'Cheap or expensive · 好 + adjective',
        render(el, ctx) {
          el.append(
            p(`${zh('平', 'peng4')} is cheap and ${zh('貴', 'gwai3')} is expensive. Put ${zh('好', 'hou2')} (very) or ${zh('唔', 'm4')} (not) before them:`),
            ctx.words('peng', 'gwai', 'hou', 'hou-peng', 'hou-gwai', 'm-peng', 'm-gwai'),
            p('An adjective is the whole predicate, with no 係:'),
            ctx.words('ni-go-hou-gwai', 'go2-go-hou-peng', 'ni-gin-shirt-m-gwai'),
            tip(`<strong>呢個係貴 is wrong.</strong> Say ${zh('呢個好貴', 'ni1 go3 hou2 gwai3')}. A bare adjective (呢個貴) sounds like a comparison, "this one is the dearer one", so 好 goes in even when you don't mean "very".`),
          );
        },
      },
      {
        id: 'buy',
        title: 'Buying · 要 and 買',
        render(el, ctx) {
          el.append(
            p(`${zh('買', 'maai5')} is to buy and ${zh('賣', 'maai6')} is to sell. Only the tone tells them apart:`),
            ctx.words('maai5', 'maai6'),
            p(`In a shop, say what you want with ${zh('要', 'jiu3')}:`),
            ctx.words('jiu', 'ngo-jiu-ni-go', 'ngo-m-jiu-go2-go', 'ngo-jiu-loeng-go-orange', 'ngo-maai5-ni-go'),
            p(`At a market stall you can ask for a better price, and when you pay, let the stallholder keep the change (${zh('找', 'zaau2')}):`),
            ctx.words('dak', 'peng-di-dak-m-dak-aa', 'zaau', 'no-need-zaau'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen to the amount, then tap the coin or note. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: V.cash, rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can say any price from ${zh('一毫', 'jat1 hou4')} to ${zh('萬二蚊', 'maan6 ji6 man1')}, ask ${zh('幾多錢呀？', 'gei2 do1 cin2 aa3')}, and say ${zh('好平', 'hou2 peng4')} or ${zh('好貴', 'hou2 gwai3')}.`),
            p('Practise in <a href="market.html">Market Stall</a>, or <a href="../">go back to Unit 6</a>.'),
          );
        },
      },
    ],
  });
})();
