/*
 * Unit 17 vocabulary: the single source for the learn page, tools/tts.mjs
 * (audio/<id>.mp3) and tools/check.mjs (img/<id>.svg, audio files).
 *
 * Entry fields: id (unique in the unit, used for file names), hanzi,
 * jyutping, english, note?, img (false = no picture), phoneme? (true:
 * tools/tts.mjs reads the jyutping exactly), plus half (the id of its
 * first syllable, for A唔A: 開唔開心) on two-syllable feelings, feeling
 * (its id) and answers (ids: yes, no) on questions, for (the feelings
 * it answers) on comfort with 啦, and particle (its id), why (the
 * situation, in English) and also (other particles that could fit) on
 * sentences that end in a particle.
 *
 * States (我好攰), questions, comfort, particle sentences and sentences
 * are derived at the bottom of this file, never typed out.
 */
Units.add(17, {
  voice: 'zh-HK-HiuMaanNeural',

  // How you feel. Each has a picture of a face.
  feelings: [
    { id: 'hoi-sam', half: 'hoi', hanzi: '開心', jyutping: 'hoi1 sam1', english: 'happy',
      note: '"Open heart". 心 is the heart in many feelings.' },
    { id: 'soeng-sam', half: 'soeng1', hanzi: '傷心', jyutping: 'soeng1 sam1', english: 'sad',
      note: '"Hurt heart": sad, heartbroken. For a little down, 唔開心.' },
    { id: 'hing-fan', half: 'hing1', hanzi: '興奮', jyutping: 'hing1 fan5', english: 'excited' },
    { id: 'nau', hanzi: '嬲', jyutping: 'nau1', english: 'angry',
      note: 'Also angry with someone: 佢嬲我, they\'re angry with me.' },
    { id: 'geng', hanzi: '驚', jyutping: 'geng1', english: 'scared; afraid (of)',
      note: 'Before what scares you: 我驚狗, I\'m scared of dogs.' },
    { id: 'gan-zoeng', half: 'gan', hanzi: '緊張', jyutping: 'gan2 zoeng1', english: 'nervous',
      note: '"Tight and stretched".' },
    { id: 'gui', hanzi: '攰', jyutping: 'gui6', english: 'tired' },
    { id: 'ngaan-fan', half: 'eye', hanzi: '眼瞓', jyutping: 'ngaan5 fan3', english: 'sleepy',
      note: '"Eyes sleep": 眼 (Unit 14) and 瞓 (Unit 1).' },
    { id: 'mun', hanzi: '悶', jyutping: 'mun6', english: 'bored; boring',
      note: 'Both: 我好悶, I\'m bored; 呢套戲好悶, this film is boring.' },
    { id: 'tou-ngo', half: 'stomach', hanzi: '肚餓', jyutping: 'tou5 ngo6', english: 'hungry',
      note: '"Belly hungry": 肚 (Unit 14).' },
    { id: 'geng-hot', half: 'geng2', hanzi: '頸渴', jyutping: 'geng2 hot3', english: 'thirsty',
      note: '"Neck thirsty". 頸 geng2 rises; 驚 geng1 (scared) is high.' },
  ],

  // First syllables, for asking A唔A: 開唔開心. 眼 肚 緊 are borrowed below.
  halves: [
    { id: 'hoi', hanzi: '開', jyutping: 'hoi1', english: 'to open', img: false,
      note: 'Only the first syllable comes twice: 開唔開心.' },
    { id: 'soeng1', hanzi: '傷', jyutping: 'soeng1', english: 'to hurt; a wound', img: false },
    { id: 'hing1', hanzi: '興', jyutping: 'hing1', english: 'to rise; to flourish', img: false,
      note: 'hing1 here; in 興趣 (Unit 16) it is hing3.' },
    { id: 'geng2', hanzi: '頸', jyutping: 'geng2', english: 'neck', img: false },
  ],

  talk: [
    { id: 'sam-cing', hanzi: '心情', jyutping: 'sam1 cing4', english: 'mood', img: false,
      note: '"Heart feelings".' },
    { id: 'gok-dak', hanzi: '覺得', jyutping: 'gok3 dak1', english: 'to feel; to think', img: false,
      note: 'Before how you feel: 我覺得好攰. Or what you think: 你覺得點呀？' },
    { id: 'dim-gaai', hanzi: '點解', jyutping: 'dim2 gaai2', english: 'why', img: false,
      note: '"How explain". Before the verb, or first: 點解你咁嬲呀？' },
    { id: 'jan-wai', hanzi: '因為', jyutping: 'jan1 wai6', english: 'because', img: false },
    { id: 'gam3', hanzi: '咁', jyutping: 'gam3', english: 'so (this much)', img: false,
      note: 'Before a feeling: 咁攰, so tired.' },
    { id: 'haau-si', hanzi: '考試', jyutping: 'haau2 si5', english: 'to take an exam; an exam', img: false },
    { id: 'baan-faat', hanzi: '辦法', jyutping: 'baan6 faat3', english: 'a way (to do it)', img: false,
      note: '冇辦法: there\'s no way; nothing to be done.' },
  ],

  // Sentence particles: said at the end, they add how you feel about
  // it. 啦 and 喇 are borrowed below.
  particles: [
    { id: 'wo3', hanzi: '喎', jyutping: 'wo3', english: '(hey! I notice; news)', img: false,
      note: 'For something you\'ve just noticed, or news: 好凍喎！ Ooh, it\'s cold!' },
    { id: 'lo1', hanzi: '囉', jyutping: 'lo1', english: '(obviously; oh well, that\'s that)', img: false,
      note: 'It\'s obvious, or it can\'t be helped: 冇辦法囉, nothing to be done.' },
    { id: 'maa3', hanzi: '嘛', jyutping: 'maa3', english: '(you know; as you should know)', img: false,
      note: 'Sounds like 嗎, but it isn\'t a question: it gives a reason the listener should know.' },
  ],
});

// Borrowed: 水 (unit 1), 唔使 (unit 2), 我 你 佢 係 唔 呀 (unit 3), 狗 啲
// 杯 (unit 5), 好 (unit 6), 凍 飲 食 菠蘿油 (unit 8), 點 今日 聽日 食飯
// (unit 9), 出街 (unit 11), 有啲 唔係好 唔好 啦 喇 (unit 13), 眼 肚 早 休息
// 好返 感冒 咗 冇 (unit 14), and 緊 嘢 瞓覺 食早餐 (unit 15), with the
// measure words those nouns are counted with, 個 and 隻.
(V => {
  V.halves.push(
    { ...Units.word(14, 'eye'), note: '眼瞓 asked A唔A: 眼唔眼瞓.' },
    { ...Units.word(14, 'stomach'), note: '肚餓 asked A唔A: 肚唔肚餓.' },
    { ...Units.word(15, 'gan'), english: 'tight', note: 'As in 緊張. After a verb it is -ing (Unit 15).' },
  );
  V.particles.unshift(
    { ...Units.word(13, 'laa1'), english: '(go on; a friendly suggestion)', note: 'laa1, high: 瞓覺啦！ Go to sleep! (Unit 13)' },
    { ...Units.word(13, 'laa3'), english: '(now; it has changed)', note: 'laa3, mid: 我攰喇, I\'m tired now. (Unit 13)' },
  );
  V.measures = [Units.word(4, 'go'), Units.word(5, 'zek')];
  V.borrowed = [
    Units.word(1, 'water'),
    Units.word(2, 'no-need'),
    ...['ngo', 'nei', 'keoi', 'hai', 'm', 'aa'].map(id => Units.word(3, id)),
    ...['dog', 'di', 'bui'].map(id => Units.word(5, id)),
    Units.word(6, 'hou'),
    ...['dung', 'jam2', 'sik6', 'pineapple-butter'].map(id => Units.word(8, id)),
    { ...Units.word(9, 'dim'), english: 'how', note: 'As in 最近點呀？ (Unit 2).' },
    ...['gam-jat', 'ting-jat', 'sik-faan'].map(id => Units.word(9, id)),
    Units.word(11, 'ceot-street'),
    ...['jau-di', 'm-hai-hou', 'm-hou'].map(id => Units.word(13, id)),
    ...['zou', 'jau-sik', 'hou-faan', 'cold', 'zo', 'mou'].map(id => Units.word(14, id)),
    ...['je', 'fan3-gaau', 'sik6-zou-caan'].map(id => Units.word(15, id)),
  ];
})(window.VOCAB);

// Derived: how you feel (我好攰), 唔開心 and the rest, asking A唔A,
// comfort with 啦, the particles in use, and sentences. Audio is
// generated like any entry; art.mjs draws each feeling and 唔開心.
(V => {
  let say = Units.sentences(V);
  // "scared; afraid (of)" → "scared".
  const adj = f => f.english.replace(/;.*/, '');

  V.nots = V.feelings.map(f => say(`m ${f.id}`, `not ${adj(f)}`, { feeling: f.id }));
  Object.assign(V.nots[0], { english: 'unhappy; not happy', img: undefined, note: 'A little down: less than 傷心.' });

  // 我好攰, 我有啲攰, 我唔係好攰. No 係 before a feeling, as with the
  // weather. 有啲 is for more than you'd like, so not 開心 or 興奮.
  const GOOD = ['hoi-sam', 'hing-fan'];
  say = Units.sentences(V);
  V.states = V.feelings.flatMap(f => [
    say(`ngo hou ${f.id}`, `I'm really ${adj(f)}.`, { feeling: f.id }),
    !GOOD.includes(f.id) && say(`ngo jau-di ${f.id}`, `I'm a bit ${adj(f)}.`, { feeling: f.id }),
    say(`ngo m-hai-hou ${f.id}`, `I'm not very ${adj(f)}.`, { feeling: f.id }),
  ].filter(Boolean));
  V.states[0].note = 'No 係: 我好開心. 好 is there even when it\'s only a bit (Unit 13).';
  V.states.find(s => s.words.includes('jau-di')).note = '有啲 (Unit 13): a bit, more than you\'d like.';

  // 你開唔開心呀？ Only the first syllable comes twice; answer 開心 or 唔開心.
  V.asks = V.feelings.map(f => say(`nei ${f.half ?? f.id} m ${f.id} aa`, `Are you ${adj(f)}?`,
    { feeling: f.id, answers: [f.id, `m-${f.id}`] }));
  V.asks[0].note = 'Like 鍾唔鍾意 (Unit 16): only 開 comes twice. Answer 開心 or 唔開心.';

  // Comfort with 啦: a friendly push. `for`: the feelings it answers.
  V.comfort = [
    say('nei jau-sik laa1', 'Have a rest!', { for: ['gui'] }),
    say('zou di fan3-gaau laa1', 'Go to bed early!', { for: ['gui', 'ngaan-fan'], note: '早啲: a bit earlier.' }),
    say('fan3-gaau laa1', 'Go to sleep!', { for: ['ngaan-fan'] }),
    say('sik-faan laa1', 'Go and eat!', { for: ['tou-ngo'] }),
    say('jam2 bui water laa1', 'Have a glass of water!', { for: ['geng-hot'], note: '飲杯水: "drink a glass of water".' }),
    say('m-hou nau laa1', 'Don\'t be angry!', { for: ['nau'], note: '唔好 (Unit 13): don\'t.' }),
    say('no-need geng laa1', 'Don\'t be scared!', { for: ['geng'], note: '唔使 (Unit 2): no need to.' }),
    say('no-need gan-zoeng laa1', 'Don\'t be nervous!', { for: ['gan-zoeng'] }),
    say('m-hou m hoi-sam laa1', 'Don\'t be sad!', { for: ['soeng-sam'], note: '"Don\'t be unhappy".' }),
    say('ceot-street laa1', 'Go out!', { for: ['mun'] }),
  ].map(e => ({ ...e, particle: 'laa1', why: 'A friend feels bad. Give them a friendly push.' }));
  V.comfort[0].note = '啦 at the end makes it friendly. Without it, 你休息 sounds like an order.';

  // Each particle in use, with the situation that calls for it.
  say = Units.sentences(V);
  const P = (particle, ids, english, why, extra) => say(`${ids} ${particle}`, english, { particle, why, ...extra });
  V.particled = [
    P('laa3', 'ngo tou-ngo', 'I\'m hungry now.', 'You weren\'t hungry before, but now you are.',
      { note: '喇: it has changed.' }),
    P('laa3', 'ngo m geng', 'I\'m not scared any more.', 'You were scared, but now you\'re not.'),
    P('laa3', 'ngo hou-faan', 'I\'m better now.', 'You were ill, and now you\'re well again.'),
    P('wo3', 'nei gam-jat hou hoi-sam', 'You\'re very happy today!', 'You notice your friend is smiling all day.',
      { note: '喎: you\'ve noticed it.' }),
    P('wo3', 'keoi hou nau', 'Watch out, they\'re really angry!', 'You\'ve just seen your boss\'s face, and you warn a friend.'),
    P('wo3', 'hou dung', 'Ooh, it\'s cold!', 'You step outside and notice the cold.', { also: ['laa3'] }),
    P('lo1', 'mou baan-faat', 'Oh well, nothing we can do.', 'The last bus has gone. It can\'t be helped.',
      { note: '囉: that\'s how it is.' }),
    P('lo1', 'mou je', 'Nothing, really.', 'A friend asks what\'s wrong. It\'s nothing, that\'s all.', { also: ['laa3'] }),
    P('maa3', 'ngo ting-jat haau-si', 'I\'ve got an exam tomorrow, you know.', 'Your friend asks why you\'re nervous. They should know why.',
      { note: '嘛: the reason is obvious. 考試 is the verb here: I take an exam.' }),
    P('maa3', 'ngo mou sik6-zou-caan', 'I didn\'t have breakfast, you know.', 'Your friend asks why you\'re so hungry. You give the obvious reason.',
      { note: '冇 before a verb: didn\'t.' }),
    P('maa3', 'keoi cold zo', 'They\'ve got a cold, you know.', 'Your friend asks why their classmate is so tired. You remind them.'),
  ];

  say = Units.sentences(V);
  V.sentences = [
    say('nei gam-jat sam-cing dim aa', 'How are you feeling today?', { note: '"Your mood today is how?"' }),
    say('ngo gam-jat sam-cing hou hou', 'I\'m in a great mood today.', { note: '好好: "very good".' }),
    say('ngo gok-dak hou gui', 'I feel very tired.', { note: '覺得 goes before how you feel.' }),
    say('nei gok-dak dim aa', 'What do you think?'),
    say('keoi hou soeng-sam', 'They are very sad.'),
    say('ngo geng dog', 'I\'m scared of dogs.', { note: '驚 + what scares you, like 鍾意 + what you like.' }),
    say('gam-jat hou mun', 'Today is so boring.', { note: '悶 is bored, and boring.' }),
    say('nei dim-gaai gam3 nau aa', 'Why are you so angry?', { note: '點解 why, 咁 so: 咁嬲, this angry.' }),
    say('jan-wai keoi sik6 zo ngo go pineapple-butter', 'Because they ate my pineapple bun!',
      { note: '我個菠蘿油: my pineapple bun (嘅 left out, as in Unit 10).' }),
    say('nei dim-gaai m hoi-sam aa', 'Why are you unhappy?'),
    say('jan-wai ngo ting-jat haau-si', 'Because I\'ve got an exam tomorrow.'),
    say('hai lo1', 'Exactly! That\'s what I said.', { note: '係囉: agreeing, "it\'s just as I said".' }),
  ];

  // Read from their jyutping: the particles, and 好返 (返 is faan2 in
  // writing, as in Unit 14).
  Units.phonemes(V, ['hou-faan', 'laa1', 'laa3', 'wo3', 'lo1', 'maa3']);
})(window.VOCAB);
