/* Unit 1 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  // set('fu'): the six fu syllables.
  const set = syllable => V.sets.filter(e => e.jyutping.slice(0, -1) === syllable);

  const { p, tip } = Learn;
  const { el: $, zh, toneChart } = Canto;

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u1-learn',
    vocab: V,
    steps: [
      {
        id: 'intro',
        title: 'Sounds · 聲調',
        render(el, ctx) {
          el.append(
            p(`Every Cantonese syllable has a <strong>tone</strong>: the pitch your voice follows while you say it. Change the tone and you say a different word.`),
            p(`This site writes Cantonese sounds in <strong>Jyutping</strong>. Each syllable ends in a number from 1 to 6: that number is its tone.`),
            ctx.grid(V.basics),
            tip('<strong>How to use this page:</strong> tap any card to hear it. Listen to each word a few times and copy it out loud.'),
          );
        },
      },
      {
        id: 'six',
        title: 'The six tones',
        render(el, ctx) {
          el.append(
            p(`Here is one syllable, <em>si</em>, in all six tones. Each one is a different word. The lines show how the pitch moves: high to low, level, rising or falling.`),
            $('div', null, toneChart()),
            ctx.grid(set('si')),
            tip('<strong>Your own range:</strong> tone 1 is near the top of your normal speaking voice, and tone 4 near the bottom. Match the shape, not a particular note.'),
          );
        },
      },
      {
        id: 'level',
        title: 'Level tones · 1 3 6',
        render(el, ctx) {
          el.append(
            p('Tones 1, 3 and 6 stay flat: high, middle and low. Say them like three steps down a staircase.'),
            ctx.grid(V.inTones(1, 3, 6).filter(e => !e.id.startsWith('si'))),
          );
        },
      },
      {
        id: 'moving',
        title: 'Moving tones · 2 4 5',
        render(el, ctx) {
          el.append(
            p('The other three move. Tone 2 rises from low to high, like a surprised "huh?". Tone 5 rises only a little, from low to middle. Tone 4 starts low and falls lower.'),
            ctx.grid(V.inTones(2, 4, 5).filter(e => !e.id.startsWith('si'))),
            tip('<strong>2 or 5?</strong> Both rise. Tone 2 ends high, tone 5 ends around the middle. Listen to 苦 fu2 and 婦 fu5 a few times each.'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Which tone?',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen, then tap the syllable with the tone you hear. Finish all six to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: set('fan'), rounds: 6, choices: 4, show: 'jyutping' });
        },
      },
      {
        id: 'spelling',
        title: 'Reading Jyutping',
        render(el, ctx) {
          el.append(
            p('Most Jyutping letters sound the way an English speaker expects. These are the ones that surprise people.'),
            ctx.grid(V.spelling),
          );
        },
      },
      {
        id: 'changes',
        title: 'Tone changes · 變調',
        render(el, ctx) {
          el.append(
            p(`In everyday speech, some words change tone. 話 on its own is ${zh('話', 'waa6')}, but in the word for Cantonese it becomes waa2:`),
            ctx.grid([ctx.entry('cantonese')]),
            p('Jyutping on this site always shows the tone people actually say, so you can trust the numbers. When a word changes tone, its card says so.'),
            tip(`<strong>Try it:</strong> the <a href="../unit7/learn.html">Dim Sum</a> unit has another one: 腸 is coeng4, but in 腸粉 it is coeng2.`),
          );
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el, ctx) {
          el.append(
            p(`You've heard all six tones of ${zh('廣東話', 'gwong2 dung1 waa2')}. Now train your ear with <a href="tones.html">Tone Detective</a>.
              Get a whole level right and you'll hear this:`),
            ctx.grid(V.praise),
            p('Use the numbered steps above to review any section, or <a href="../">go back to Unit 1</a>.'),
          );
        },
      },
    ],
  });
})();
