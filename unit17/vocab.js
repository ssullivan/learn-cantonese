/*
 * Unit 17 vocabulary, for its pages, tools/tts.mjs and tools/check.mjs: the
 * words it uses, from the dictionary (words/words.js; the ones it teaches
 * are under unit 17 there, with their audio and pictures in words/), with
 * the fields this unit adds, and the phrases and sentences it builds from
 * them (audio/<id>.mp3 and img/<id>.svg here).
 *
 * Entry fields: id (names its files), hanzi,
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
  write: '因考法',

  // How you feel. Each has a picture of a face.
  feelings: [
    { ...Words.get('hoi-sam'), half: 'hoi' },
    { ...Words.get('soeng-sam'), half: 'soeng1' },
    { ...Words.get('hing-fan'), half: 'hing1' },
    ...Words.list('nau geng'),
    { ...Words.get('gan-zoeng'), half: 'gan' },
    Words.get('gui'),
    { ...Words.get('ngaan-fan'), half: 'eye' },
    Words.get('mun'),
    { ...Words.get('tou-ngo'), half: 'stomach' },
    { ...Words.get('geng-hot'), half: 'geng2' },
  ],

  // First syllables, for asking A唔A: 開唔開心. 眼 肚 緊 are borrowed below.
  halves: [
    ...Words.list('hoi soeng1 hing1 geng2'),
  ],

  talk: [
    ...Words.list('sam-cing gok-dak dim-gaai jan-wai gam3 haau-si baan-faat'),
  ],

  // Sentence particles: said at the end, they add how you feel about
  // it. 啦 and 喇 are borrowed below.
  particles: [
    ...Words.list('wo3 lo1 maa3'),
  ],
});

// Borrowed: 水 (unit 1), 唔使 (unit 2), 我 你 佢 係 唔 呀 (unit 3), 狗 啲
// 杯 (unit 5), 好 (unit 6), 凍 飲 食 菠蘿油 (unit 8), 點 今日 聽日 食飯
// (unit 9), 出街 (unit 11), 有啲 唔係好 唔好 啦 喇 (unit 13), 眼 肚 早 休息
// 好返 感冒 咗 冇 (unit 14), and 緊 嘢 瞓覺 食早餐 (unit 15), with the
// measure words those nouns are counted with, 個 and 隻.
(V => {
  V.halves.push(
    { ...Words.get('eye'), note: '眼瞓 asked A唔A: 眼唔眼瞓.' },
    { ...Words.get('stomach'), note: '肚餓 asked A唔A: 肚唔肚餓.' },
    { ...Words.get('gan'), english: 'tight', note: 'As in 緊張. After a verb it is -ing (Unit 15).' },
  );
  V.particles.unshift(
    { ...Words.get('laa1'), english: '(go on; a friendly suggestion)', note: 'laa1, high: 瞓覺啦！ Go to sleep! (Unit 13)' },
    { ...Words.get('laa3'), english: '(now; it has changed)', note: 'laa3, mid: 我攰喇, I\'m tired now. (Unit 13)' },
  );
  V.measures = [Words.get('go'), Words.get('zek')];
  V.borrowed = [
    Words.get('water'),
    Words.get('no-need'),
    ...Words.list('ngo nei keoi hai m aa'),
    ...Words.list('dog di bui'),
    Words.get('hou'),
    ...Words.list('dung jam2 sik6 pineapple-butter'),
    { ...Words.get('dim'), english: 'how', note: 'As in 最近點呀？ (Unit 2).' },
    ...Words.list('gam-jat ting-jat sik-faan'),
    Units.word(11, 'ceot-street'),
    ...['jau-di', 'm-hai-hou', 'm-hou'].map(id => Units.word(13, id)),
    ...Words.list('zou jau-sik hou-faan cold zo2 mou'),
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
    P('maa3', 'keoi cold zo2', 'They\'ve got a cold, you know.', 'Your friend asks why their classmate is so tired. You remind them.'),
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
    say('jan-wai keoi sik6 zo2 ngo go pineapple-butter', 'Because they ate my pineapple bun!',
      { note: '我個菠蘿油: my pineapple bun (嘅 left out, as in Unit 10).' }),
    say('nei dim-gaai m hoi-sam aa', 'Why are you unhappy?'),
    say('jan-wai ngo ting-jat haau-si', 'Because I\'ve got an exam tomorrow.'),
    say('hai lo1', 'Exactly! That\'s what I said.', { note: '係囉: agreeing, "it\'s just as I said".' }),
  ];

  // Read from their jyutping: the particles, and 好返 (返 is faan2 in
  // writing, as in Unit 14).
  Units.phonemes(V, ['hou-faan', 'laa1', 'laa3', 'wo3', 'lo1', 'maa3']);
})(window.VOCAB);
