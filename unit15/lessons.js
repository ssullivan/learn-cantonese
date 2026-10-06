/* Unit 15 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u15-learn',
    vocab: V,
    steps: [
      {
        id: 'morning',
        title: 'The morning · 朝早',
        render(el, ctx) {
          el.append(
            p(`Most things you do in a day are a verb and a thing: ${zh('起身', 'hei2 san1')} is "raise the body", ${zh('刷牙', 'caat3 ngaa4')} "brush teeth".`),
            ctx.words('hei-san', 'caat-tooth', 'sai-min', 'zoek-shirt', 'sik6-zou-caan'),
          );
        },
      },
      {
        id: 'day',
        title: 'Out for the day',
        render(el, ctx) {
          el.append(
            p(`${zh('返', 'faan1')} is going back where you go every day; ${zh('放', 'fong3')} lets you out again:`),
            ctx.words('faan-hok', 'faan-gung', 'zou6-je', 'fong-hok', 'fong-gung', 'faan-home'),
            p('And at midday:'),
            ctx.words('sai-hand', 'sik6-aan'),
            tip(`<strong>食晏, not 食午餐.</strong> Lunch is "eating at midday". 午餐 is the written word; people say 食晏.`),
          );
        },
      },
      {
        id: 'evening',
        title: 'The evening · 夜晚',
        render(el, ctx) {
          el.append(
            ctx.words('zyu2-rice', 'sik6-maan-faan', 'tai-din-si', 'tai-book', 'cung-loeng4', 'fan3-gaau'),
            tip(`<strong>睇 is to watch and to read.</strong> 睇電視 is watching TV, 睇書 reading a book, and 睇醫生 seeing a doctor (Unit 14).`),
          );
        },
      },
      {
        id: 'parts',
        title: 'Verb + thing',
        render(el, ctx) {
          el.append(
            p('The verbs:'),
            ctx.grid([...V.verbs, ...['sik6', 'tai', 'zoek', 'fan3'].map(ctx.entry)]),
            p('And what they are done to:'),
            ctx.grid([...V.things, ...['tooth', 'hand', 'shirt', 'book', 'rice', 'home', 'loeng4'].map(ctx.entry)]),
            tip('<strong>Why take them apart?</strong> The little words that say when, 緊 咗 過, go straight after the verb, inside the activity.'),
          );
        },
      },
      {
        id: 'when',
        title: 'What time? · 幾點',
        render(el, ctx) {
          el.append(
            p(`As in Unit 9, the time goes before the verb. ${zh('通常', 'tung1 soeng4')} (usually) and ${zh('每日', 'mui5 jat6')} (every day) go there too:`),
            ctx.words('tung-soeng', 'mui-jat6', 'nei-tung-soeng-gei-dim-hei-san-aa', 'ngo-tung-soeng-t0700-hei-san', 'ngo-mui-jat6-t0830-faan-gung'),
            p('A whole day:'),
            ctx.grid(V.when.filter(e => ['hei-san', 'sik6-zou-caan', 'faan-gung', 'sik6-aan', 'fong-gung', 'sik6-maan-faan', 'fan3-gaau'].includes(e.act))),
          );
        },
      },
      {
        id: 'order',
        title: 'First, then · 先…然後',
        render(el, ctx) {
          el.append(
            p(`${zh('先', 'sin1')} (first) goes before the first verb, ${zh('然後', 'jin4 hau6')} (then) before the next:`),
            ctx.words('sin', 'jin-hau', 'ngo-sin-hei-san-jin-hau-caat-tooth', 'ngo-sin-cung-loeng4-jin-hau-fan3-gaau'),
            p(`${zh('之後', 'zi1 hau6')} (after) and ${zh('之前', 'zi1 cin4')} (before) go after the thing they are before or after:`),
            ctx.words('zi-hau', 'zi-cin', 'ngo-sik6-zou-caan-zi-hau-faan-gung', 'ngo-fan3-gaau-zi-cin-caat-tooth', 'sik-faan-zi-cin-jiu-sai-hand'),
            tip('<strong>Listen for the order.</strong> 瞓覺之前刷牙 says bed first, but you brush your teeth first.'),
          );
        },
      },
      {
        id: 'gan',
        title: 'Doing it now · 緊',
        render(el, ctx) {
          el.append(
            p(`${zh('緊', 'gan2')}, straight after the verb, says it's happening now:`),
            ctx.words('gan', 'nei-ji-gaa-zou6-gan-mat-je-aa', 'ngo-sik6-gan-zou-caan', 'ngo-ji-gaa-tai-gan-din-si', 'keoi-fan3-gan-gaau', 'ngo-faan-gan-gung'),
            tip('<strong>Inside the activity.</strong> 緊 goes after the verb, so it splits 瞓覺 into 瞓緊覺 and 返工 into 返緊工, never 瞓覺緊.'),
          );
        },
      },
      {
        id: 'zo-gan-mei',
        title: 'Done, now, not yet · 咗 緊 未',
        render(el, ctx) {
          el.append(
            p(`${zh('咗', 'zo2')} (Unit 14) goes in the same place as 緊. ${zh('未', 'mei6')} goes before the verb:`),
            ctx.words('sik6-zo2-zou-caan', 'sik6-gan-zou-caan', 'mei-sik6-zou-caan'),
            ctx.words('fan3-zo2-gaau', 'fan3-gan-gaau', 'mei-fan3-gaau'),
            p('Asking "yet?", and answering:'),
            ctx.words('keoi-sik6-zo2-zou-caan-mei-aa', 'ngo-sik6-zo2-zou-caan-laa3', 'ngo-mei-sik6-zou-caan'),
            tip('<strong>Some things take no time.</strong> You 放工 in a moment, so there\'s no 放緊工: it\'s 放咗工 or 未放工.'),
          );
        },
      },
      {
        id: 'gwo',
        title: 'Ever · 過',
        render(el, ctx) {
          el.append(
            p(`${zh('過', 'gwo3')}, also straight after the verb, says you have done it at least once. Ask with 有冇 or with 未 at the end:`),
            ctx.words('gwo', 'nei-jau-mou-heoi-gwo-hong-kong-aa', 'ngo-heoi-gwo-hong-kong'),
            p(`Two ways to say you haven't: ${zh('冇', 'mou5')} for never, ${zh('未', 'mei6')} for not yet:`),
            ctx.words('heoi-gwo', 'mou-heoi-gwo', 'mei-heoi-gwo', 'ngo-mou-heoi-gwo-hong-kong', 'ngo-mei-heoi-gwo-hong-kong'),
            p('With food, drink and transport:'),
            ctx.words('nei-sik6-gwo-pineapple-butter-mei-aa', 'ngo-sik6-gwo-pineapple-butter', 'nei-jau-mou-daap-gwo-tram-aa', 'ngo-mei-daap-gwo-plane'),
            tip('<strong>未 leaves the door open.</strong> 我未去過香港 means you haven\'t yet but might. 我冇去過香港 just says you never have.'),
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
          ctx.listenQuiz(quiz, { pool: V.activities, rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el, ctx) {
          const said = id => { const e = ctx.entry(id); return zh(e.hanzi, e.jyutping); };
          el.append(
            p(`You can talk about your day: ${said('ngo-tung-soeng-t0700-hei-san')}, ${said('ngo-sik6-gan-zou-caan')}, ${said('ngo-mei-heoi-gwo-hong-kong')}.`),
            p('Practise in <a href="planner.html">Day Planner</a>, or <a href="../">go back to Unit 15</a>.'),
          );
        },
      },
    ],
  });
})();
