/* Unit 2 learn page: the steps shown by shared/learn.js. Words come from vocab.js. */
(function () {
  const V = window.VOCAB;
  const { p, tip } = Learn;
  const { el: $, zh } = Canto;
  const words = (ctx, ...ids) => ctx.grid(ids.map(ctx.entry));

  Learn.init({
    root: document.getElementById('learn'),
    key: 'u2-learn',
    vocab: V,
    steps: [
      {
        id: 'hello',
        title: 'Hello · 你好',
        render(el, ctx) {
          el.append(
            p(`${zh('你好', 'nei5 hou2')} is literally "you good". It is polite and always correct, and it is what you say to a shopkeeper or someone you have just met.`),
            words(ctx, 'hello'),
            tip('<strong>In real life:</strong> Hong Kong friends often greet each other in English ("hi", "hello"), or skip the greeting and just start talking.'),
          );
        },
      },
      {
        id: 'day',
        title: 'Morning and night',
        render(el, ctx) {
          el.append(
            p(`Until about noon, say ${zh('早晨', 'zou2 san4')}. Cantonese has no everyday "good afternoon" or "good evening": after noon, go back to 你好.`),
            p(`${zh('早唞', 'zou2 tau2')} is only for bedtime, when someone is going to sleep.`),
            words(ctx, 'good-morning', 'good-night'),
          );
        },
      },
      {
        id: 'bye',
        title: 'Goodbye',
        render(el, ctx) {
          el.append(
            p('Most people say 拜拜, borrowed from English "bye-bye". 再見 is more formal.'),
            words(ctx, 'bye', 'goodbye'),
          );
        },
      },
      {
        id: 'how',
        title: 'How are you?',
        render(el, ctx) {
          el.append(
            p('Textbooks teach 你好嗎？, but people rarely say it. Among friends you will hear 最近點呀？ ("how have you been lately?").'),
            words(ctx, 'how-are-you', 'how-lately'),
            p('Two easy answers:'),
            words(ctx, 'pretty-good', 'so-so'),
            p('And two classics:'),
            words(ctx, 'long-time', 'eaten-yet', 'eaten'),
            tip('<strong>Have you eaten?</strong> 食咗飯未呀？ is a greeting, not an invitation. Answer 食咗喇 even if you haven\'t, and keep chatting.'),
          );
        },
      },
      {
        id: 'thanks',
        title: '唔該 or 多謝?',
        render(el, ctx) {
          el.append(
            p(`Cantonese has two thank-yous. ${zh('唔該', 'm4 goi1')} is for a <strong>service or a favour</strong>: someone pours your tea, holds a door, passes the salt. ${zh('多謝', 'do1 ze6')} is for a <strong>gift or a compliment</strong>.`),
            words(ctx, 'm-goi', 'thanks'),
            p('Each has its own reply:'),
            words(ctx, 'no-need', 'welcome'),
            p('For a big favour, add 晒 ("all"):'),
            words(ctx, 'm-goi-saai'),
            tip(`<strong>唔該 also means "excuse me":</strong> say it to call a waiter over, or before asking a stranger a question. You'll use it at <a href="../unit7/">yum cha</a>.`),
          );
        },
      },
      {
        id: 'sorry',
        title: 'Sorry · 對唔住',
        render(el, ctx) {
          el.append(
            p(`${zh('對唔住', 'deoi3 m4 zyu6')} is a real apology, when you did something wrong. For small things (a bump on the bus, being a few minutes late, interrupting) say ${zh('唔好意思', 'm4 hou2 ji3 si3')}.`),
            words(ctx, 'sorry', 'excuse-me'),
            p('If someone says sorry to you:'),
            words(ctx, 'never-mind', 'no-problem'),
          );
        },
      },
      {
        id: 'listen',
        title: 'Listen and pick',
        gate: true,
        render(el, ctx) {
          const quiz = $('div');
          el.append(p('Listen to the phrase, then tap the picture of when you would say it. Finish all six to unlock the next step.'), quiz);
          ctx.listenQuiz(quiz, { pool: Canto.entries(V).filter(e => e.img !== false), rounds: 6, choices: 4 });
        },
      },
      {
        id: 'done',
        title: '好叻！ Well done',
        render(el) {
          el.append(
            p(`You can greet people from ${zh('早晨', 'zou2 san4')} to ${zh('早唞', 'zou2 tau2')}, and you know when to say 唔該, 多謝 and 對唔住.`),
            p('Practise answering in <a href="reply.html">Reply Match</a>, or <a href="../">go back to Unit 2</a>.'),
          );
        },
      },
    ],
  });
})();
