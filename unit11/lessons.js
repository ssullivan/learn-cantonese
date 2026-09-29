/* Unit 11 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  const words = (ctx, ...ids) => ctx.grid(ids.map(ctx.entry));

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u11-learn',
    vocab: V,
    steps: [
      {
        id: 'transport',
        title: 'Getting around · 出街',
        render(el, ctx) {
          el.append(
            p(`${zh('出街', 'ceot1 gaai1')} is going out, anywhere. Hong Kong has plenty of ways to get about:`),
            ctx.grid(V.transport),
            p(`Take any of them with ${zh('搭', 'daap3')}, or walk: ${zh('行路', 'haang4 lou6')}.`),
            words(ctx, 'ceot-street', 'daap', 'haang-lou'),
          );
        },
      },
      {
        id: 'places',
        title: 'Places',
        render(el, ctx) {
          el.append(
            p(`A ${zh('站', 'zaam6')} is a station or a stop:`),
            words(ctx, 'zaam', 'metro-zaam', 'bus-zaam'),
            p('And places to go:'),
            ctx.grid(V.places.filter(e => e.img !== false)),
            tip(`<strong>Changed tones.</strong> 院 and 園 are jyun6 and jyun4 on their own, but ${zh('醫院', 'ji1 jyun2')} and ${zh('公園', 'gung1 jyun2')} both rise.`),
          );
        },
      },
      {
        id: 'heoi',
        title: 'Going · 去',
        render(el, ctx) {
          el.append(
            p(`${zh('去', 'heoi3')} is "go to": the place comes straight after, with no word for "to". Ask where with ${zh('邊度', 'bin1 dou6')}, in the place's spot:`),
            words(ctx, 'heoi', 'bin-dou', 'nei-heoi-bin-dou-aa', 'ngo-heoi-airport'),
            p('How you go comes first, then 去 and where:'),
            words(ctx, 'ngo-daap-bus-heoi-airport', 'ngo-daap-metro-heoi-hotel', 'ngo-haang-lou-heoi-park'),
            p(`And ${zh('嚟', 'lai4')}, to come:`),
            words(ctx, 'lai', 'nei-gei-si-lai-aa'),
          );
        },
      },
      {
        id: 'hai2',
        title: 'Being somewhere · 喺',
        render(el, ctx) {
          el.append(
            p(`${zh('喺', 'hai2')} is "be at". Don't mix it up with ${zh('係', 'hai6')} (to be, Unit 3): 喺 rises.`),
            words(ctx, 'hai2', 'ngo-hai2-bank', 'keoi-hai2-home'),
            p('With another verb, 喺 + place goes before it, like a time does in Unit 9:'),
            words(ctx, 'ngo-hai2-home-sik-faan', 'ngo-hai2-hong-kong-zyu'),
            tip(`<strong>我喺屋企食飯.</strong> Who, where, then what: not 我食飯喺屋企.`),
          );
        },
      },
      {
        id: 'where',
        title: 'Where is it? · 喺邊度呀？',
        render(el, ctx) {
          el.append(
            p('Ask with the place, 喺, and 邊度. Start with 唔該 to get someone\'s attention:'),
            words(ctx, 'toilet-hai2-bin-dou-aa', 'm-goi-toilet-hai2-bin-dou-aa'),
            p(`Here and there are ${zh('呢', 'ni1')} and ${zh('嗰', 'go2')} (Unit 5) with ${zh('度', 'dou6')}, "place":`),
            words(ctx, 'ni-dou6', 'go2-dou6', 'toilet-hai2-go2-dou6'),
            p('Near or far?'),
            words(ctx, 'kan', 'jyun', 'jyun-m-jyun-aa', 'hou-kan', 'haang-lou-jiu-n10-fan-zung'),
          );
        },
      },
      {
        id: 'way',
        title: 'Left, right, straight on',
        render(el, ctx) {
          el.append(
            words(ctx, 'zo', 'jau6', 'zik-haang', 'zyun', 'zyun-zo', 'zyun-jau6'),
            p(`Which side: ${zh('左邊', 'zo2 bin1')} and ${zh('右邊', 'jau6 bin1')}, with 喺:`),
            words(ctx, 'zo-bin', 'jau-bin', 'hai2-zo-bin', 'hai2-jau-bin'),
            p('Or ahead, or across the road:'),
            words(ctx, 'cin-min', 'deoi-min', 'supermarket-hai2-cin-min', 'bank-hai2-deoi-min'),
          );
        },
      },
      {
        id: 'directions',
        title: 'Giving directions',
        render(el, ctx) {
          el.append(
            p('Which road, then which side of it:'),
            ctx.grid(V.directions),
            tip(`<strong>Left and right as you walk.</strong> After 轉左 you face the other way along the new road, so 喺右邊 is the side you'd see on your right.`),
            words(ctx, 'zik-haang-zyun-zo'),
          );
        },
      },
      {
        id: 'bus',
        title: 'On the bus',
        render(el, ctx) {
          el.append(
            p(`Get off is ${zh('落車', 'lok6 ce1')}. On a minibus, call out before your stop:`),
            words(ctx, 'lok', 'lok-car', 'cin-min-jau-lok'),
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
          ctx.listenQuiz(quiz, { pool: [...V.transport, ...V.stations, ...V.places.filter(e => e.img !== false)], rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can get around: ${zh('我搭巴士去機場', 'ngo5 daap3 baa1 si2 heoi3 gei1 coeng4')}, ${zh('洗手間喺邊度呀？', 'sai2 sau2 gaan1 hai2 bin1 dou6 aa3')}, ${zh('轉左，喺右邊', 'zyun3 zo2 hai2 jau6 bin1')}.`),
            p('Practise in <a href="route.html">Route</a>, or <a href="../">go back to Unit 11</a>.'),
          );
        },
      },
    ],
  });
})();
