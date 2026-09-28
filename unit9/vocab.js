/*
 * Unit 9 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), phoneme? (true:
 * tools/tts.mjs reads the jyutping exactly), plus h and m (hour and
 * minute, drawn as a clock by art.mjs) on times, and n on weekdays,
 * months and dates.
 *
 * Times come from Canto.time, and days, months and dates from
 * Canto.number, at the bottom of this file; never type them out.
 */
Units.add(9, {
  voice: 'zh-HK-HiuMaanNeural',

  clock: [
    { id: 'dim', hanzi: '點', jyutping: 'dim2', english: 'o\'clock (hour)', img: false,
      note: 'Counts hours like a measure word: 三點, and 兩點 for two o\'clock.' },
    { id: 'zung', hanzi: '鐘', jyutping: 'zung1', english: 'clock; o\'clock',
      note: '三點鐘 is "three o\'clock"; the 鐘 is often left out.' },
    { id: 'zi', hanzi: '字', jyutping: 'zi6', english: 'five minutes', img: false,
      note: 'Literally "character": one numeral on the clock face, so 三點兩個字 is 3:10.' },
    { id: 'fan', hanzi: '分', jyutping: 'fan1', english: 'minute', img: false,
      note: 'For exact minutes: 三點十五分. 三點三個字 is more everyday.' },
    { id: 'gei', hanzi: '幾', jyutping: 'gei2', english: 'which; how many', img: false,
      note: 'Asks for a number: 幾點 (what time), 星期幾 (what day).' },
    { id: 'gei-si', hanzi: '幾時', jyutping: 'gei2 si4', english: 'when', img: false },
    { id: 'ji-gaa', hanzi: '而家', jyutping: 'ji4 gaa1', english: 'now', img: false },
  ],

  // Parts of the day go before the time: 下晝三點.
  day: [
    { id: 'ziu-zou', hanzi: '朝早', jyutping: 'ziu1 zou2', english: 'morning', img: false },
    { id: 'soeng-zau', hanzi: '上晝', jyutping: 'soeng6 zau3', english: 'before noon; a.m.', img: false },
    { id: 'aan-zau', hanzi: '晏晝', jyutping: 'aan3 zau3', english: 'midday; early afternoon', img: false,
      note: 'Lunchtime. 晏 on its own means late.' },
    { id: 'haa-zau', hanzi: '下晝', jyutping: 'haa6 zau3', english: 'afternoon; p.m.', img: false },
    { id: 'je-maan', hanzi: '夜晚', jyutping: 'je6 maan5', english: 'evening; night', img: false },
    { id: 'gam-ziu', hanzi: '今朝', jyutping: 'gam1 ziu1', english: 'this morning', img: false },
    { id: 'gam-maan', hanzi: '今晚', jyutping: 'gam1 maan5', english: 'tonight', img: false },
  ],

  calendar: [
    { id: 'sing-kei', hanzi: '星期', jyutping: 'sing1 kei4', english: 'week; day of the week', img: false,
      note: '禮拜 lai5 baai3 means the same: 禮拜一 is Monday too.' },
    { id: 'jyut', hanzi: '月', jyutping: 'jyut6', english: 'month', img: false },
    { id: 'hou6', hanzi: '號', jyutping: 'hou6', english: 'day of the month', img: false,
      note: '三號 is the 3rd. Written dates use 日 instead.' },
    { id: 'soeng', hanzi: '上', jyutping: 'soeng6', english: 'last (week, month)', img: false },
    { id: 'haa', hanzi: '下', jyutping: 'haa6', english: 'next (week, month)', img: false },
  ],

  days: [
    { id: 'cin-jat', hanzi: '前日', jyutping: 'cin4 jat6', english: 'the day before yesterday', img: false },
    { id: 'kam-jat', hanzi: '琴日', jyutping: 'kam4 jat6', english: 'yesterday', img: false,
      note: 'Also 尋日 cam4 jat6. Low falling tone 4, unlike 今日.' },
    { id: 'gam-jat', hanzi: '今日', jyutping: 'gam1 jat6', english: 'today', img: false,
      note: 'High tone 1: 今日 gam1, but 琴日 kam4 is yesterday.' },
    { id: 'ting-jat', hanzi: '聽日', jyutping: 'ting1 jat6', english: 'tomorrow', img: false },
    { id: 'hau-jat', hanzi: '後日', jyutping: 'hau6 jat6', english: 'the day after tomorrow', img: false },
    { id: 'gam-nin', hanzi: '今年', jyutping: 'gam1 nin2', english: 'this year', img: false, phoneme: true,
      note: '年 is nin4, but changes to nin2 in 今年, 舊年 and 出年.' },
    { id: 'gau-nin', hanzi: '舊年', jyutping: 'gau6 nin2', english: 'last year', img: false, phoneme: true,
      note: 'Literally "old year".' },
    { id: 'ceot-nin', hanzi: '出年', jyutping: 'ceot1 nin2', english: 'next year', img: false, phoneme: true,
      note: 'Literally "out year". 明年 ming4 nin2 also works.' },
  ],

  // Things to do at a time.
  verbs: [
    { id: 'faan-gung', hanzi: '返工', jyutping: 'faan1 gung1', english: 'to go to work', img: false },
    { id: 'fong-gung', hanzi: '放工', jyutping: 'fong3 gung1', english: 'to finish work', img: false },
    { id: 'sik-faan', hanzi: '食飯', jyutping: 'sik6 faan6', english: 'to eat; to have a meal', img: false,
      note: 'Literally "eat rice", for any meal.' },
    { id: 'gin', hanzi: '見', jyutping: 'gin3', english: 'to see; to meet', img: false,
      note: 'After a time, "see you then": 聽日見！' },
  ],
});

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
    say('soeng go sing-kei', 'last week'),
    say('haa go sing-kei', 'next week'),
    say('soeng go jyut', 'last month'),
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
    say('ngo-dei je-maan t0700 sik-faan', 'We eat at seven in the evening.', { note: 'Part of the day first, then the time.' }),
    say('ngo-dei ting-jat yum-cha', 'We\'re having dim sum tomorrow.', { note: '聽日我哋飲茶 is right too. 我哋飲茶聽日 is not.' }),
    say('ting-jat ngo-dei yum-cha', 'We\'re having dim sum tomorrow.'),
    say('ngo wk6 yum-cha', 'I\'m having dim sum on Saturday.'),
    say('nei gei-si yum-cha aa', 'When are you having dim sum?'),
    say('gam-jat sing-kei gei aa', 'What day is it today?', { note: 'No 係 needed, like 今日星期五.' }),
    say('gam-jat wk5', 'Today is Friday.'),
    say('ting-jat hai wk6', 'Tomorrow is Saturday.'),
    say('gam-jat gei jyut gei hou6 aa', 'What\'s the date today?'),
    say('gam-jat m5 d3', 'Today is the 3rd of May.', { note: 'Month, then day: 五月三號.' }),
    say('ting-jat gin', 'See you tomorrow!'),
    say('wk1 gin', 'See you on Monday!'),
  ];
})(window.VOCAB);
