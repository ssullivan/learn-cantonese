/* Unit 17 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u17-learn',
    vocab: V,
    steps: [
      {
        id: 'heart',
        title: 'How do you feel?',
        render(el, ctx) {
          el.append(
            ctx.words('hoi-sam', 'm-hoi-sam', 'soeng-sam', 'hing-fan', 'nau', 'geng', 'gan-zoeng'),
            tip(`<strong>心 is the heart.</strong> ${zh('開心', 'hoi1 sam1')} is an "open heart", ${zh('傷心', 'soeng1 sam1')} a "hurt heart", and your ${zh('心情', 'sam1 cing4')} is your mood.`),
          );
        },
      },
      {
        id: 'body',
        title: 'Tired, hungry, bored',
        render(el, ctx) {
          el.append(
            ctx.words('gui', 'ngaan-fan', 'tou-ngo', 'geng-hot', 'mun'),
            tip(`<strong>Your body says it.</strong> ${zh('眼瞓', 'ngaan5 fan3')} is "eyes sleep", ${zh('肚餓', 'tou5 ngo6')} "belly hungry" and ${zh('頸渴', 'geng2 hot3')} "neck thirsty". 悶 is both bored and boring.`),
          );
        },
      },
      {
        id: 'how',
        title: 'I\'m tired · 我好攰',
        render(el, ctx) {
          el.append(
            p(`As with the weather (Unit 13), a feeling needs no ${zh('係', 'hai6')}: just ${zh('好', 'hou2')}, ${zh('有啲', 'jau5 di1')} or ${zh('唔係好', 'm4 hai6 hou2')} before it.`),
            ctx.words('ngo-hou-gui', 'ngo-jau-di-gui', 'ngo-m-hai-hou-tou-ngo', 'keoi-hou-soeng-sam'),
            p(`${zh('覺得', 'gok3 dak1')} (to feel) goes before how you feel, and ${zh('驚', 'geng1')} before what scares you:`),
            ctx.words('gok-dak', 'ngo-gok-dak-hou-gui', 'ngo-geng-dog'),
            p('Asking about someone\'s mood:'),
            ctx.words('sam-cing', 'nei-gam-jat-sam-cing-dim-aa', 'ngo-gam-jat-sam-cing-hou-hou'),
          );
        },
      },
      {
        id: 'ask',
        title: 'Are you happy? · 開唔開心',
        render(el, ctx) {
          el.append(
            p(`Ask A唔A, as with 鍾唔鍾意 (Unit 16): only the first syllable comes twice, ${zh('開唔開心', 'hoi1 m4 hoi1 sam1')}.`),
            ctx.words('nei-hoi-m-hoi-sam-aa', 'nei-gui-m-gui-aa', 'nei-stomach-m-tou-ngo-aa'),
            p('Answer with the feeling:'),
            ctx.words('hoi-sam', 'm-hoi-sam', 'gui', 'm-gui'),
            p(`Why? ${zh('點解', 'dim2 gaai2')}. Because: ${zh('因為', 'jan1 wai6')}. ${zh('咁', 'gam3')} is "so", before the feeling:`),
            ctx.words('nei-dim-gaai-gam3-nau-aa', 'jan-wai-keoi-sik6-zo2-ngo-go-pineapple-butter', 'nei-dim-gaai-m-hoi-sam-aa', 'jan-wai-ngo-ting-jat-haau-si'),
          );
        },
      },
      {
        id: 'laa',
        title: 'Go on! · 啦, and now · 喇',
        render(el, ctx) {
          el.append(
            p('Particles go at the end of a sentence and say how you feel about it. You met two in Unit 13.'),
            p(`${zh('啦', 'laa1')} (high) makes a friendly push. Cheer up a friend with it:`),
            ctx.words('nei-jau-sik-laa1', 'fan3-gaau-laa1', 'no-need-geng-laa1', 'm-hou-nau-laa1', 'jam2-bui-water-laa1'),
            p(`${zh('喇', 'laa3')} (mid) says something has changed:`),
            ctx.words('ngo-tou-ngo-laa3', 'ngo-m-geng-laa3', 'ngo-hou-faan-laa3'),
            tip('<strong>laa1 or laa3?</strong> 啦 is high and level: a push. 喇 is mid: it\'s different now. 食飯啦！ Let\'s eat! 食飯喇！ Dinner\'s ready!'),
          );
        },
      },
      {
        id: 'wo',
        title: 'Hey! · 喎',
        render(el, ctx) {
          el.append(
            p(`${zh('喎', 'wo3')} is for something you've just noticed, or news you pass on:`),
            ctx.words('wo3', 'hou-dung-wo3', 'nei-gam-jat-hou-hoi-sam-wo3', 'keoi-hou-nau-wo3'),
          );
        },
      },
      {
        id: 'lo-maa',
        title: 'Oh well · 囉, and you know · 嘛',
        render(el, ctx) {
          el.append(
            p(`${zh('囉', 'lo1')}: it's obvious, or it can't be helped.`),
            ctx.words('lo1', 'mou-baan-faat-lo1', 'mou-je-lo1', 'hai-lo1'),
            p(`${zh('嘛', 'maa3')}: the reason, which the listener should know already.`),
            ctx.words('maa3', 'ngo-ting-jat-haau-si-maa3', 'ngo-mou-sik6-zou-caan-maa3', 'keoi-cold-zo2-maa3'),
            tip('<strong>嘛 sounds like 嗎.</strong> Both are maa3, but 嗎 asks (你肚餓嗎？ Are you hungry?) and 嘛 tells (我肚餓嘛, I\'m hungry, you know). Listen to the sentence, not the particle.'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen, then tap the face. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: V.feelings, rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el, ctx) {
          const said = id => { const e = ctx.entry(id); return zh(e.hanzi, e.jyutping); };
          el.append(
            p(`You can say how you feel and why: ${said('ngo-hou-gui')}, ${said('nei-hoi-m-hoi-sam-aa')}, ${said('ngo-ting-jat-haau-si-maa3')}.`),
            p('Practise in <a href="particle.html">Particle Match</a>, or <a href="../">go back to Unit 17</a>.'),
          );
        },
      },
    ],
  });
})();
