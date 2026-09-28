/* Unit 7 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const group = id => V.groups.find(g => g.id === id);
  const inGroup = id => V.items.filter(i => i.group === id);

  const { p, tip } = Learn;
  const { zh } = Canto;

  function groupStep(id, intro) {
    const g = group(id);
    return {
      id,
      title: `${g.english[0].toUpperCase()}${g.english.slice(1)} · ${g.hanzi}`,
      render(el, ctx) {
        el.append(p(intro), ctx.grid([g]), ctx.grid(inGroup(id)));
      },
    };
  }

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u7-learn',
    vocab: V,
    steps: [
      {
        id: 'intro',
        title: 'Yum cha · 飲茶',
        render(el, ctx) {
          el.append(
            p('In Hong Kong, going for dim sum is called <em>yum cha</em>: "drinking tea". Families and friends share lots of small dishes brought to the table in bamboo steamers.'),
            ctx.grid(V.basics),
            tip('<strong>How to use this page:</strong> tap any card to hear it. The small numbers in the jyutping are tones. Cantonese has six, and changing the tone changes the word.'),
          );
        },
      },
      groupStep('steamed', 'Most dim sum is steamed, and arrives in a bamboo basket. These are the classics.'),
      groupStep('fried', 'Crispy dishes, from the deep fryer or the pan.'),
      groupStep('sweet', 'Save room for dessert! Sweet dim sum is eaten alongside savory dishes, not only at the end.'),
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = document.createElement('div');
          el.append(p('Listen to the word, then tap the matching dish. Finish all eight to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: V.items, rounds: 8, choices: 4 });
        },
      },
      {
        id: 'table',
        title: 'At the table',
        render(el, ctx) {
          el.append(
            p(`To order, say how it comes: ${zh('籠', 'lung4')} for a steamer basket, ${zh('碟', 'dip6')} for a plate.`),
            ctx.grid(V.measures),
            p('A few phrases for ordering, asking, and paying.'),
            ctx.grid(V.phrases),
            tip(`<strong>Tea manners:</strong> when someone pours tea for you, tap two fingers on the table to say thanks. Pour for others before yourself.`),
          );
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You've met ${V.items.length} dim sum dishes and the phrases to order them. Next time you ${zh('飲茶', 'jam2 caa4')}, try ordering in Cantonese:`),
            p(`<strong>${zh('唔該，我要一籠燒賣', 'm4 goi1, ngo5 jiu3 jat1 lung4 siu1 maai2')}</strong>`),
            p('Use the numbered steps above to review any section, or <a href="../">go back to Unit 7</a>.'),
          );
        },
      },
    ],
  });
})();
