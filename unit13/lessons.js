/* Unit 13 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u13-learn',
    vocab: V,
    steps: [
      {
        id: 'sky',
        title: 'The weather · 天氣',
        render(el, ctx) {
          el.append(
            p(`${zh('天氣', 'tin1 hei3')} is the weather. Ask about it with ${zh('點', 'dim2')}, "how", as in 最近點呀？ (Unit 2):`),
            ctx.words('tin-hei', 'tin-hei-dim-aa'),
            p('Up in the sky:'),
            ctx.words('taai-joeng', 'wan', 'tin-cing', 'jam-tin'),
            p(`When the sun comes out, it ${zh('出', 'ceot1')}, as in 出街 (Unit 11):`),
            ctx.words('ceot-taai-joeng'),
          );
        },
      },
      {
        id: 'rain',
        title: 'Rain, wind and typhoons',
        render(el, ctx) {
          el.append(
            p(`Rain and snow "come down", with ${zh('落', 'lok6')} from Unit 11:`),
            ctx.words('jyu', 'lok-jyu', 'syut', 'lok-syut'),
            p('Wind and storms:'),
            ctx.words('fung', 'daai-fung', 'haang-leoi', 'daa-fung'),
            tip(`<strong>打風.</strong> In summer, typhoons "strike". ${zh('天文台', 'tin1 man4 toi4')}, the Observatory, raises signals 1, 3, 8 and up; at 8, offices and schools close.`),
            ctx.words('tin-man-toi'),
          );
        },
      },
      {
        id: 'feel',
        title: 'Hot and cold · 熱 and 凍',
        render(el, ctx) {
          el.append(
            p('From Unit 8, where they were drinks: 熱奶茶, 凍奶茶. They are the weather too:'),
            ctx.words('jit', 'dung'),
            p('And in between:'),
            ctx.grid(V.feel.filter(e => !e.unit)),
            tip(`<strong>Hear the tone.</strong> ${zh('凍', 'dung3')} (cold) is mid and level; ${zh('冬', 'dung1')} in ${zh('冬天', 'dung1 tin1')} (winter) is high.`),
          );
        },
      },
      {
        id: 'degree',
        title: 'Very, quite, too · 好 幾 太',
        render(el, ctx) {
          el.append(
            p(`An adjective takes a word before it that says how much. There is no ${zh('係', 'hai6')}: 今日好熱, not 今日係熱.`),
            ctx.words('hou-jit', 'gei-jit', 'taai-jit'),
            p(`${zh('有啲', 'jau5 di1')} is "a bit", for something you'd rather have less of, and ${zh('唔係好', 'm4 hai6 hou2')} is "not very":`),
            ctx.words('jau-di-dung', 'm-hai-hou-dung'),
            tip(`<strong>好 is nearly always there.</strong> A bare 熱 sounds like a comparison ("hotter than..."), so people say 好熱 even when it's only a bit hot.`),
            ctx.words('gam-jat-hou-jit', 'gam-jat-gei-dung', 'gam-jat-jau-di-guk', 'gam-jat-m-hai-hou-dung', 'taai-jit-laa3'),
          );
        },
      },
      {
        id: 'seasons',
        title: 'The seasons · 季節',
        render(el, ctx) {
          el.append(
            p(`Every season ends in ${zh('天', 'tin1')}:`),
            ctx.grid(V.seasons),
            p('What the seasons are like in Hong Kong:'),
            ctx.words('hong-kong-haa-tin-hou-jit', 'hong-kong-dung-tin-m-hai-hou-dung', 'ceon-tin-hou-sap'),
          );
        },
      },
      {
        id: 'forecast',
        title: 'Degrees and tomorrow · 度 and 會',
        render(el, ctx) {
          el.append(
            p(`A temperature is a number and ${zh('度', 'dou6')}, degrees. 21 to 29 use 廿 (Unit 4):`),
            ctx.words('gei-do-dou6', 'gam-jat-gei-do-dou6-aa', 'c32', 'gam-jat-c32', 'c25', 'c8'),
            p(`For the forecast, ${zh('會', 'wui5')} goes before the verb: "will".`),
            ctx.words('wui', 'ting-jat-wui-lok-jyu', 'ting-jat-wui-daa-fung', 'ting-jat-wui-m-wui-lok-jyu-aa'),
            p('And no past tense: the day says when (Unit 9).'),
            ctx.words('kam-jat-hou-daai-fung'),
          );
        },
      },
      {
        id: 'laa',
        title: 'Friendly advice · 啦',
        render(el, ctx) {
          el.append(
            p(`${zh('啦', 'laa1')} at the end of a sentence turns an order into friendly advice. ${zh('帶', 'daai3')} (bring) sounds just like 戴 (wear, Unit 12):`),
            ctx.words('laa1', 'daai-bring', 'umbrella'),
            ctx.grid(V.advice),
            p(`${zh('喇', 'laa3')}, lower, says something has changed: it's raining now, and it wasn't before.`),
            ctx.words('laa3', 'lok-jyu-laa3', 'ceot-taai-joeng-laa3'),
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
          ctx.listenQuiz(quiz, { pool: [...V.weather, ...V.seasons.filter(e => e.id !== 'gwai-zit'), ...V.degrees.filter(e => e.img !== false)], rounds: 8, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can talk about the weather: ${zh('今日好熱', 'gam1 jat6 hou2 jit6')}, ${zh('聽日會落雨', 'ting1 jat6 wui5 lok6 jyu5')}, ${zh('帶遮啦', 'daai3 ze1 laa1')}！`),
            p('Practise in <a href="forecast.html">Forecast</a>, or <a href="../">go back to Unit 13</a>.'),
          );
        },
      },
    ],
  });
})();
