/* Unit 21 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  const said = (ctx, id) => { const e = ctx.entry(id); return zh(e.hanzi, e.jyutping); };

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u21-learn',
    vocab: V,
    steps: [
      {
        id: 'appliances',
        title: 'In the kitchen · 廚房',
        render(el, ctx) {
          el.append(
            ctx.words('kitchen'),
            p(`The appliances in a ${zh('廚房', 'cyu4 fong2')}, its ${zh('電器', 'din6 hei3')}:`),
            ctx.grid(V.appliances),
            tip(`<strong>Words in parts:</strong> ${zh('爐', 'lou4')} is a stove or an oven (焗爐, 微波爐, 多士爐), ${zh('機', 'gei1')} a machine (洗碗機), and ${zh('煲', 'bou1')} a pot (水煲, 電飯煲). ${zh('電', 'din6')} is electric.`),
          );
        },
      },
      {
        id: 'measure',
        title: 'One of them · 一部 一個',
        render(el, ctx) {
          el.append(
            p(`Machines are counted with ${zh('部', 'bou6')}; smaller things, like a pot, with ${zh('個', 'go3')}.`),
            ctx.words('one-fridge', 'one-microwave', 'one-dishwasher', 'one-rice-cooker', 'one-kettle', 'one-toaster'),
          );
        },
      },
      {
        id: 'tasks',
        title: 'What they\'re for · 煲水 洗碗',
        render(el, ctx) {
          el.append(
            p(`Kitchen verbs: ${said(ctx, 'ding1')} is to microwave, from the sound of its bell. ${said(ctx, 'bou1')} is to boil, and the pot. ${said(ctx, 'caau2')} is to stir-fry, and ${said(ctx, 'zing2')} to make.`),
            ctx.words('ding1', 'bou1', 'baked', 'caau2', 'zing2', 'sai'),
            p('A verb and a thing, one for each appliance:'),
            ctx.grid(V.tasks),
            tip(`<strong>叮熱 and 雪凍:</strong> the verb, then what it makes the food: hot (熱) or cold (凍). 雪 is snow (Unit 13).`),
          );
        },
      },
      {
        id: 'use',
        title: 'Use it · 用',
        render(el, ctx) {
          el.append(
            p(`${said(ctx, 'jung')} is to use. Say what you use first, then the verb: ${zh('用水煲煲水', 'jung6 seoi2 bou1 bou1 seoi2')}, "use the kettle, boil water".`),
            ctx.grid(V.uses),
            p(`Ask with ${zh('用乜嘢', 'jung6 mat1 je5')}: use what?`),
            ctx.words('jung-mat-je-bou1-rice-aa', 'jung-mat-je-sai-wun-aa'),
            tip(`<strong>Where English puts "with" at the end</strong> ("boil water with the kettle"), Cantonese puts 用 + the thing before the verb.`),
          );
        },
      },
      {
        id: 'how-long',
        title: 'How long · 叮兩分鐘',
        render(el, ctx) {
          el.append(
            p(`${said(ctx, 'fan-zung')} counts minutes, like a measure word: ${zh('兩分鐘', 'loeng5 fan1 zung1')}.`),
            ctx.grid(V.minutes),
            p('How long goes <em>after</em> the verb:'),
            ctx.words('jung-microwave-ding1-mins2', 'jung-oven-baked-mins20', 'caau2-mins3', 'jiu-ding1-gei-noi-aa'),
            tip(`<strong>When, before; how long, after.</strong> ${said(ctx, 'ngo-t0600-bou1-rice')} puts the time before the verb (Unit 9), but ${zh('叮兩分鐘', 'ding1 loeng5 fan1 zung1')} puts how long after it.`),
          );
        },
      },
      {
        id: 'in-out',
        title: 'In and out, on and off · 入 出 開 閂',
        render(el, ctx) {
          el.append(
            p(`${said(ctx, 'fong')} (put) + the thing + ${said(ctx, 'jap6')} + where: put it into. ${said(ctx, 'lo2')} (take) + the thing + ${zh('出嚟', 'ceot1 lai4')}: take it out.`),
            ctx.words('fong-di-orange-jap6-fridge', 'lo2-di-orange-ceot-lai', 'fong-go-cake-jap6-oven'),
            p(`${said(ctx, 'hoi')} opens a door or turns a thing on; ${said(ctx, 'saan1')} closes it or turns it off.`),
            ctx.words('hoi-fridge', 'hoi-oven', 'saan1-stove', 'saan1-zo2-stove-mei-aa'),
          );
        },
      },
      {
        id: 'home',
        title: 'In my kitchen',
        render(el, ctx) {
          el.append(
            ctx.grid(V.sentences),
            tip(`<strong>${said(ctx, 'waai6')}:</strong> broken. With 咗, 壞咗, it has broken.`),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen, then tap the appliance. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: V.appliances, rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el, ctx) {
          el.append(
            p(`You can find your way round a kitchen: ${said(ctx, 'ngo-jung-kettle-bou1-water')} ${said(ctx, 'jung-microwave-ding1-mins2')} ${said(ctx, 'fong-di-orange-jap6-fridge')}`),
            p('Practise with the <a href="kitchen.html">Kitchen Helper</a>, or <a href="../">go back to Unit 21</a>.'),
          );
        },
      },
    ],
  });
})();
