/*
 * Unit 9 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), phoneme? (true:
 * tools/tts.mjs reads the jyutping exactly), voice? (another voice for
 * this word, e.g. 'minimax:<voice id>'), plus h and m (hour and
 * minute, drawn as a clock by art.mjs) on times, and n on weekdays,
 * months and dates.
 *
 * Times come from Canto.time, and days, months and dates from
 * Canto.number, at the bottom of this file; never type them out.
 */
Units.add(9, {
  voice: 'zh-HK-HiuMaanNeural',
  write: '日月年',

  clock: [
    ...Words.list('dim zung zi6 fan gei gei-si ji-gaa'),
  ],

  // Parts of the day go before the time: 下晝三點.
  day: [
    ...Words.list('ziu-zou soeng-zau aan-zau haa-zau je-maan gam-ziu gam-maan'),
  ],

  calendar: [
    ...Words.list('sing-kei jyut hou6 soeng6 haa'),
  ],

  days: [
    ...Words.list('cin-jat kam-jat gam-jat ting-jat hau-jat gam-nin gau-nin ceot-nin'),
  ],

  // Things to do at a time.
  verbs: [
    ...Words.list('faan-gung fong-gung sik-faan gin3'),
  ],
});

// Azure reads 年 nin2 as nin4 whatever it's told, so 今年 舊年 出年 are
// made with MiniMax (see tools/tts.mjs), which is given the jyutping.
(V => {
  for (const id of ['gam-nin', 'gau-nin', 'ceot-nin']) V.days.find(e => e.id === id).voice = 'minimax:Cantonese_ProfessionalHost（F)';
})(window.VOCAB);

// Borrowed: 半 from unit 6, 個 from unit 4, people and 係 / 呀 from unit 3,
// and 飲茶 from unit 7.
(V => {
  V.borrowed = [
    Units.word(6, 'bun3'), Units.word(4, 'go'),
    ...['ngo', 'nei', 'ngo-dei', 'hai', 'aa'].map(id => Units.word(3, id)),
    Units.word(7, 'yum-cha'),
  ];
})(window.VOCAB);

// Derived: times, days, months, dates, phrases and sentences. Audio is
// generated like any entry; art.mjs draws a clock for each time.
(V => {
  const pad = n => String(n).padStart(2, '0');
  const time = (h, m, extra, fen) => ({
    id: `t${pad(h)}${pad(m)}${fen ? '-fan' : ''}`, h, m, ...Canto.time(h, m, { fen }),
    english: `${h}:${pad(m)}`, ...extra,
  });

  const NOTE = {
    '1:00': 'Or just 一點: 鐘 is often left out.',
    '2:00': '兩點, not 二點: 點 counts hours like a measure word.',
    '12:00': '十二點, not 十兩點: 兩 is only for a 2 on its own.',
    '3:05': 'One 字 is five minutes: the minute hand points at the 1.',
    '3:10': '兩個字, "two 字": ten minutes.',
    '3:15': 'Said fast: 三點三 (the 個字 left out). 三點一個骨 means a quarter past too.',
    '3:30': '半 is half: half past three.',
    '3:45': 'Said fast: 三點九.',
    '12:55': '十一個字 is 55 minutes: the minute hand points at the 11.',
  };

  V.times = [];
  for (let h = 1; h <= 12; h++) {
    for (let m = 0; m < 60; m += 5) V.times.push(time(h, m, NOTE[`${h}:${pad(m)}`] && { note: NOTE[`${h}:${pad(m)}`] }));
  }
  V.minutes = [[3, 5], [3, 15], [3, 30], [3, 45], [7, 20], [10, 50], [7, 8], [11, 42]]
    .map(([h, m]) => time(h, m, h === 7 && m === 8 ? { note: 'Under ten minutes, 零 fills the gap: 零八分.' } : undefined, true));

  const DAY = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  V.weekdays = DAY.map((english, i) => {
    const d = i < 6 ? Canto.number(i + 1) : { hanzi: '日', jyutping: 'jat6' };
    return { id: `wk${i + 1}`, n: i + 1, hanzi: `星期${d.hanzi}`, jyutping: `sing1 kei4 ${d.jyutping}`, english, img: false,
      ...(i === 0 && { note: 'The week starts on 星期一, "week one".' }),
      ...(i === 6 && { note: '日 is the sun: Sunday. 星期天 is the written form.' }) };
  });

  const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  V.months = MONTH.map((english, i) => {
    const { hanzi, jyutping } = Canto.number(i + 1);
    return { id: `m${i + 1}`, n: i + 1, hanzi: `${hanzi}月`, jyutping: `${jyutping} jyut6`, english, img: false,
      ...(i === 1 && { note: '二月, not 兩月: months are names, not counts. 兩個月 is "two months".' }) };
  });

  const ORDINAL = d => d % 10 === 1 && d !== 11 ? 'st' : d % 10 === 2 && d !== 12 ? 'nd' : d % 10 === 3 && d !== 13 ? 'rd' : 'th';
  const DATE_NOTE = { 2: '二號, not 兩號.', 20: 'A round 20 is 二十號.', 21: '廿一號: 廿 for 21 to 29.' };
  V.dates = Array.from({ length: 31 }, (_, i) => {
    const d = i + 1, { hanzi, jyutping } = Canto.number(d);
    return { id: `d${d}`, n: d, hanzi: `${hanzi}號`, jyutping: `${jyutping} hou6`, english: `the ${d}${ORDINAL(d)}`, img: false,
      ...(DATE_NOTE[d] && { note: DATE_NOTE[d] }) };
  });

  // Question words and "last / next" phrases, made of the words above.
  let say = Units.sentences(V);
  V.phrases = [
    say('gei dim', 'what time?', { note: '幾點呀？ on its own asks the time.' }),
    say('sing-kei gei', 'what day of the week?'),
    say('gei jyut gei hou6', 'what date?', { note: 'Month first, then day: big to small.' }),
    say('soeng6 go sing-kei', 'last week'),
    say('haa go sing-kei', 'next week'),
    say('soeng6 go jyut', 'last month'),
    say('haa go jyut', 'next month'),
  ];

  // Time words go before the verb. Before or after the person is fine, so
  // both orders count as right in Tiles.
  say = Units.sentences(V);
  V.sentences = [
    say('ji-gaa gei dim aa', 'What time is it now?'),
    say('ji-gaa t0330', 'It\'s half past three now.'),
    say('nei gei dim faan-gung aa', 'What time do you go to work?', { note: 'The time goes before the verb: 幾點返工.' }),
    say('ngo t0900 faan-gung', 'I go to work at nine.'),
    say('ngo t0600 fong-gung', 'I finish work at six.'),
    say('nei gei dim sik-faan aa', 'What time do you eat?'),
    say('ngo-dei je-maan t0700 sik-faan', 'We eat at seven in the evening.', { note: 'Part of the day first, then the time.', phoneme: true }),
    say('ngo-dei ting-jat yum-cha', 'We\'re having dim sum tomorrow.', { note: '聽日我哋飲茶 is right too. 我哋飲茶聽日 is not.' }),
    say('ting-jat ngo-dei yum-cha', 'We\'re having dim sum tomorrow.'),
    say('ngo wk6 yum-cha', 'I\'m having dim sum on Saturday.'),
    say('nei gei-si yum-cha aa', 'When are you having dim sum?'),
    say('gam-jat sing-kei gei aa', 'What day is it today?', { note: 'No 係 needed, like 今日星期五.' }),
    say('gam-jat wk5', 'Today is Friday.'),
    say('ting-jat hai wk6', 'Tomorrow is Saturday.'),
    say('gam-jat gei jyut gei hou6 aa', 'What\'s the date today?'),
    say('gam-jat m5 d3', 'Today is the 3rd of May.', { note: 'Month, then day: 五月三號.' }),
    say('ting-jat gin3', 'See you tomorrow!'),
    say('wk1 gin3', 'See you on Monday!'),
  ];
})(window.VOCAB);
