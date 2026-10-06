/* Unit 8 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u8-learn',
    vocab: V,
    steps: [
      {
        id: 'place',
        title: 'At the café · 茶餐廳',
        render(el, ctx) {
          el.append(
            p(`A ${zh('茶餐廳', 'caa4 caan1 teng1')} is a Hong Kong café: milk tea, toast, noodles and set meals, served fast. Call the ${zh('伙記', 'fo2 gei3')} over to order.`),
            ctx.words('cha-chaan-teng', 'waiter'),
            p(`Two verbs: ${zh('飲', 'jam2')}, to drink (as in 飲茶), and ${zh('食', 'sik6')}, to eat. The waiter asks:`),
            ctx.words('jam2', 'sik6', 'nei-jam2-mat-je-aa', 'nei-sik6-mat-je-aa'),
          );
        },
      },
      {
        id: 'drinks',
        title: 'Drinks',
        render(el, ctx) {
          el.append(
            p('The four drinks everyone orders:'),
            ctx.grid(V.drinks),
            tip(`<strong>鴛鴦</strong> is coffee and milk tea mixed in one cup, named after a pair of mandarin ducks.`),
          );
        },
      },
      {
        id: 'temp',
        title: 'Iced or hot? · 凍定熱？',
        render(el, ctx) {
          el.append(
            p(`${zh('凍', 'dung3')} is iced and ${zh('熱', 'jit6')} hot. It goes <em>before</em> the drink:`),
            ctx.words('dung', 'jit'),
            ctx.grid(V.served),
            p(`The waiter may ask with ${zh('定', 'ding6')}, "or":`),
            ctx.words('ding', 'dung-ding-jit-aa'),
            p(`Iced drinks cost a little more. The menu says so with ${zh('加', 'gaa1')}, "add":`),
            ctx.words('dung-jam', 'gaa1', 'dung-jam-gaa1-p200'),
          );
        },
      },
      {
        id: 'food',
        title: 'Food and its measure word',
        render(el, ctx) {
          el.append(
            p('Something to eat with it:'),
            ctx.grid(V.food),
            p(`Order with a number and a measure word, as in Unit 5: drinks by the ${zh('杯', 'bui1')} (cup), noodles by the ${zh('碗', 'wun2')} (bowl), a bun with ${zh('個', 'go3')}, and toast by the ${zh('份', 'fan6')} (portion).`),
            ctx.grid(V.measures),
            ctx.grid(V.ones),
          );
        },
      },
      {
        id: 'mods',
        title: 'Your way · 走 少 多',
        render(el, ctx) {
          el.append(
            p(`Change a drink with ${zh('走', 'zau2')} (leave it out), ${zh('少', 'siu2')} (less) or ${zh('多', 'do1')} (more), and what to change: ${zh('甜', 'tim4')} (sweet) or ${zh('冰', 'bing1')} (ice).`),
            ctx.words('zau', 'siu', 'do', 'sweet', 'bing'),
            ctx.grid(V.mods),
            tip(`<strong>走 is "go away".</strong> 走甜 sends the sugar away: no sugar. 走冰, no ice.`),
          );
        },
      },
      {
        id: 'order',
        title: 'Putting an order together',
        render(el, ctx) {
          el.append(
            p('Hot or iced, then the drink, then what to change:'),
            ctx.words('jit-milk-tea-zau-sweet', 'dung-lemon-tea-siu-sweet', 'dung-coffee-zau-bing', 'dung-yuenyeung-do-bing'),
            tip(`<strong>凍 + 奶茶 + 少甜.</strong> 凍 comes first, 走 / 少 / 多 last: ${zh('凍奶茶少甜', 'dung3 naai5 caa4 siu2 tim4')}.`),
            p(`Start with ${zh('我要', 'ngo5 jiu3')} (Unit 6) or ${zh('唔該', 'm4 goi1')}:`),
            ctx.words('ngo-jiu-n1-bui-dung-milk-tea', 'm-goi-dung-lemon-tea-siu-sweet', 'ngo-jiu-n1-go-pineapple-butter',
              'ngo-jiu-n1-wun-spam-egg-noodles', 'n1-fan6-toast-n1-bui-coffee', 'ngo-m-jiu-bing'),
          );
        },
      },
      {
        id: 'pay',
        title: 'Eat in, take away, and the bill',
        render(el, ctx) {
          el.append(
            p('Eat at the table, or take it with you?'),
            ctx.words('tong-sik', 'ling-zau', 'tong-sik-ding-ling-zau-aa', 'ngo-jiu-ling-zau'),
            p(`${zh('好', 'hou2')} before a verb makes "good to …": ${zh('好飲', 'hou2 jam2')}, ${zh('好食', 'hou2 sik6')}.`),
            ctx.grid(V.tasty),
            ctx.words('ni-bui-milk-tea-hou-jam2', 'pineapple-butter-hou-hou-sik6'),
            p('And when you\'re done:'),
            ctx.words('bill'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen to the order, then tap the picture: is it hot or iced? Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: [...V.served, ...V.food], rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can order at a 茶餐廳 your way: ${zh('凍奶茶少甜', 'dung3 naai5 caa4 siu2 tim4')}, ${zh('一個菠蘿油', 'jat1 go3 bo1 lo4 jau4')}, ${zh('拎走', 'ling1 zau2')}.`),
            p('Practise in <a href="order.html">Order Up</a>, or <a href="../">go back to Unit 8</a>.'),
          );
        },
      },
    ],
  });
})();
