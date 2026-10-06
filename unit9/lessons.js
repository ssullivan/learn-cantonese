/* Unit 9 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  // Time entries are named by the clock: t0305 is 3:05.
  const times = (ctx, ...hms) => ctx.grid(hms.map(([h, m]) => ctx.entry(`t${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}`)));

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u9-learn',
    vocab: V,
    steps: [
      {
        id: 'hours',
        title: 'What time is it? · 幾點',
        render(el, ctx) {
          el.append(
            p(`The hour is a number and ${zh('點', 'dim2')}, and on the hour you can add ${zh('鐘', 'zung1')}: ${zh('三點鐘', 'saam1 dim2 zung1')}, three o'clock.`),
            ctx.words('dim', 'zung'),
            p(`點 counts hours like a measure word, so two o'clock is ${zh('兩點', 'loeng5 dim2')}. Tap each clock to hear it:`),
            times(ctx, ...Array.from({ length: 12 }, (_, i) => [i + 1, 0])),
            p('Ask the time with 幾 (how many) and 而家 (now):'),
            ctx.words('gei', 'ji-gaa', 'gei-dim', 'ji-gaa-gei-dim-aa'),
          );
        },
      },
      {
        id: 'zi',
        title: 'Half past and 個字',
        render(el, ctx) {
          el.append(
            p(`Half past is ${zh('半', 'bun3')}, as in 三蚊半 from Unit 6:`),
            times(ctx, [3, 30], [7, 30], [12, 30]),
            p(`Other minutes are counted in ${zh('字', 'zi6')}: one 字 is five minutes, one numeral on the clock face. Read the number the minute hand points at, then 個字:`),
            ctx.words('zi'),
            times(ctx, [3, 5], [3, 10], [3, 15], [3, 20], [3, 45], [12, 55]),
            tip(`<strong>Look at the minute hand.</strong> At 3:20 it points at the 4, so it's ${zh('三點四個字', 'saam1 dim2 sei3 go3 zi6')}. Don't mix it up with ${zh('四點三個字', 'sei3 dim2 saam1 go3 zi6')}, 4:15. In fast speech the 個字 drops off: ${zh('三點三', 'saam1 dim2 saam1')} is 3:15.`),
          );
        },
      },
      {
        id: 'fan',
        title: 'Minutes · 分',
        render(el, ctx) {
          el.append(
            p(`Timetables and exact times count minutes with ${zh('分', 'fan1')}. Under ten minutes, 零 fills the gap:`),
            ctx.words('fan'),
            ctx.grid(V.minutes),
          );
        },
      },
      {
        id: 'day',
        title: 'Morning and evening',
        render(el, ctx) {
          el.append(
            p(`The part of the day comes first, then the time: ${zh('下晝三點', 'haa6 zau3 saam1 dim2')} is 3 p.m.`),
            ctx.words('ziu-zou', 'soeng-zau', 'aan-zau', 'haa-zau', 'je-maan'),
            p('With 今 (this), for today:'),
            ctx.words('gam-ziu', 'gam-maan'),
          );
        },
      },
      {
        id: 'week',
        title: 'Days of the week · 星期',
        render(el, ctx) {
          el.append(
            p(`The days are numbered: ${zh('星期', 'sing1 kei4')} (week) and 一 to 六, Monday to Saturday. Sunday is ${zh('星期日', 'sing1 kei4 jat6')}, "sun day".`),
            ctx.words('sing-kei'),
            ctx.grid(V.weekdays),
            p(`Ask which day with 幾: ${zh('星期幾？', 'sing1 kei4 gei2')}`),
            ctx.words('sing-kei-gei', 'gam-jat-sing-kei-gei-aa', 'gam-jat-wk5'),
          );
        },
      },
      {
        id: 'dates',
        title: 'Months and dates · 月 and 號',
        render(el, ctx) {
          el.append(
            p(`Months are numbered too: a number and ${zh('月', 'jyut6')}. The day of the month is a number and ${zh('號', 'hou6')}.`),
            ctx.words('jyut', 'hou6'),
            ctx.grid(V.months),
            ctx.words('d1', 'd2', 'd10', 'd21', 'd31'),
            p('Dates go from big to small: month, then day.'),
            ctx.words('gei-jyut-gei-hou6', 'gam-jat-gei-jyut-gei-hou6-aa', 'gam-jat-m5-d3'),
            tip(`<strong>二月, but 兩點.</strong> Months, dates and weekdays are names, so 2 is 二: ${zh('二月', 'ji6 jyut6')}, ${zh('二號', 'ji6 hou6')}, ${zh('星期二', 'sing1 kei4 ji6')}. Hours are counted, so 2 is 兩: ${zh('兩點', 'loeng5 dim2')}.`),
          );
        },
      },
      {
        id: 'days',
        title: 'Yesterday, today, tomorrow',
        render(el, ctx) {
          el.append(
            p('Five days around today:'),
            ctx.words('cin-jat', 'kam-jat', 'gam-jat', 'ting-jat', 'hau-jat'),
            tip(`<strong>今日 or 琴日?</strong> ${zh('今日', 'gam1 jat6')} (today) is high, ${zh('琴日', 'kam4 jat6')} (yesterday) is low and falling. Listen to the first syllable.`),
            p(`Weeks and months use ${zh('上', 'soeng6')} (last) and ${zh('下', 'haa6')} (next) with 個:`),
            ctx.words('soeng', 'haa', 'soeng-go-sing-kei', 'haa-go-sing-kei', 'soeng-go-jyut', 'haa-go-jyut'),
            p('And years:'),
            ctx.words('gau-nin', 'gam-nin', 'ceot-nin'),
          );
        },
      },
      {
        id: 'first',
        title: 'Time goes first',
        render(el, ctx) {
          el.append(
            p('A time word goes <strong>before the verb</strong>, never at the end as in English. Before or after the person is fine:'),
            ctx.words('ngo-dei-ting-jat-yum-cha', 'ting-jat-ngo-dei-yum-cha', 'ngo-wk6-yum-cha'),
            tip(`<strong>我哋飲茶聽日 is wrong.</strong> "We have dim sum tomorrow" is ${zh('我哋聽日飲茶', 'ngo5 dei6 ting1 jat6 jam2 caa4')}.`),
            p('Some things to do at a time:'),
            ctx.words('faan-gung', 'fong-gung', 'sik-faan', 'gin'),
            ctx.words('nei-gei-dim-faan-gung-aa', 'ngo-t0900-faan-gung', 'ngo-t0600-fong-gung', 'ngo-dei-je-maan-t0700-sik-faan',
              'gei-si', 'nei-gei-si-yum-cha-aa', 'ting-jat-gin', 'wk1-gin'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen to the time, then tap its clock. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: V.times.filter(t => t.m % 15 === 0 || t.note), rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can tell the time (${zh('三點半', 'saam1 dim2 bun3')}, ${zh('三點兩個字', 'saam1 dim2 loeng5 go3 zi6')}), name the days and dates, and put the time before the verb: ${zh('我聽日飲茶', 'ngo5 ting1 jat6 jam2 caa4')}.`),
            p('Practise in <a href="clock.html">Clock</a>, or <a href="../">go back to Unit 9</a>.'),
          );
        },
      },
    ],
  });
})();
