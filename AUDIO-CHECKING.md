# How we check the audio

Every word and sentence on this site has a recording: 2,153 clips across 20 units. They are made by text-to-speech (mostly Azure's Hong Kong voices), not recorded by a person. This page explains how we decide whether a clip is right, what tends to go wrong, and what we do about it.

If you speak Cantonese and want to help, skip to [How you can help](#how-you-can-help).

## Our approach, and why

### Why the audio needs checking at all
Cantonese has six tones, and a tone change is a different word: 媽 maa1 is "mum", 馬 maa5 is "horse". A learner copies what they hear, so a clip in the wrong tone teaches the wrong word. Text-to-speech voices sound fluent but get tones wrong in ways that are easy to miss: they read a character with its written-language pronunciation instead of the spoken one, or let one tone drift towards another in a longer sentence.

### Why not just listen to everything
A native speaker listening to every clip would be the best check, but there are over two thousand of them and every new unit adds a hundred or more. So we do it in two stages:

1. **A machine check sorts the clips**, so a listener hears the doubtful ones first.
2. **A person makes the final call**, on the [audio review page](https://ssullivan.github.io/learn-cantonese/review/).

The machine never gets the last word. Its job is to make human listening time go further.

### What the machine checks
The checks live in a separate repository, **[audio-lang-tools](https://github.com/ssullivan/audio-lang-tools)**, because they aren't specific to this site: they take a clip and the Jyutping it should say, and could serve other tonal languages later. Each clip gets three independent checks, because each catches a different kind of failure:

| Check | How | What it catches |
|---|---|---|
| **The file** | Decode it with ffmpeg | Broken, silent or clipped files; a clip far too short or long for its number of syllables (a syllable dropped or added) |
| **The words** | Azure speech-to-text, given **no hint** of the expected text, then compare its sounds with the expected Jyutping, ignoring tone | The voice saying a different word or reading. No hint, because a hint pushes speech-to-text towards hearing what we expect. Tone is ignored because speech-to-text writes characters, and homophones would look like mistakes |
| **The tones** | Find each syllable in the clip (forced alignment), track its pitch, and ask a model how likely each of the six tones is | A syllable said in the wrong tone, the most common and hardest-to-hear problem |

The tone model is trained **separately for each voice** (HiuMaan, WanLung, HiuGaai), on clips of that voice whose tones are known. Voices differ in pitch range and in how they shape each tone, and one shared model made HiuMaan's results worse.

Each clip gets one of three results:
- **OK**: nothing doubtful.
- **LISTEN**: something is doubtful (speech-to-text heard other sounds, or a tone is uncertain). Worth a listen.
- **CHECK**: a file problem, or a tone that is clearly unlikely. Listen to these first.

### How we know the checker is any good
We measure it rather than trust it. audio-lang-tools has a benchmark: clips of words read correctly, the same words read with one syllable deliberately in another tone, damaged files, and real clips from this site with known answers. Every change to the checker has to keep its scores above recorded minimums. On the held-out test set (September 2026):

- **Wrong tones caught:** 95% of single words, 84% of 2–3 syllable phrases, and 82% of longer sentences get a CHECK. Counting LISTEN too, it flags 94–100% of them.
- **Right clips flagged:** 8% of correct clips get a CHECK, and 21% get some flag. Some of these are the voice really doing something unusual, not the checker being wrong (see below).
- **Damaged files:** all caught.
- **Real cases from this site:** 11 of 11 right.

So a clip with no flag is very likely fine, and a CHECK is worth hearing. But a CHECK isn't proof of a mistake, and no flag isn't proof of perfection.

### Where things stand
Across the site: 1,401 clips pass (60%), 515 are LISTEN (22%) and 406 are CHECK (17%). Of the CHECKs, 177 are only a question-final 呀 or 嗎 said high (see below). Most clips haven't been heard by a native speaker yet.

## Common problems we see

**Written readings instead of spoken ones.** Many characters have a written-language reading and a colloquial one, and the voice sometimes picks the written one:
- 平 (cheap) should be peng4, but comes out ping4.
- 錢 (money) should be cin2, but comes out cin4.
- 返 (go back) comes out faan2.
- 棵 (the measure word for greens) should be po1, but comes out fo2.

**Words with several readings.** 行 is haang4 (walk) or hong4 (row, trade). 雀仔 (bird) is zoek3 zai2, but the voice says zoek2. 魚 (fish) is jyu4, but comes out jyu2 in sentences.

**Changed tones the voice can't make.** Some words change tone in speech: 今年 is gam1 nin2, not nin4. The Azure voices have no nin2 at all. They say nin4 whatever we ask for. The same goes for 女 neoi2 said alone, and 檸 ning2 in 檸茶.

**Tones that drift in context.** A word said correctly on its own can come out differently in a phrase:
- 士 in 巴士 (bus) drifts.
- 小 in 小巴 (minibus) comes out low.
- 喺 (to be at) was fixed on its own, but the fix upset the words around it.

**Tones that sound too alike.** The HiuMaan voice says tone 5 almost like tone 2, and tone 3 close to tone 6. A native speaker heard this in Unit 1's tone drills. It matters most where tones are being contrasted, so the six-tone practice sets use WanLung instead. It also shows up as a common CHECK: 會 wui5 heard as tone 2.

**Question particles said high.** In questions ending in 呀 or 嗎, the voice often raises the final particle. This is the single biggest cause of CHECKs. It may be natural question intonation rather than a mistake, which is exactly the kind of thing a listener should decide.

**The checker's own limits.**
- Speech-to-text is weak on a lone syllable: 詩 is heard as the letter "C".
- It favours common words: 毫 is heard as 號.
- It turns its own output back into Jyutping, sometimes with the wrong reading: it writes 行 but reads it back as hong.
- The tone model can also doubt a syllable that is fine, especially in the middle of a sentence (比我 in 家姐比我大).

## How we try to fix them

**First, find out who is wrong: the voice or the checker.** For a flagged clip we make variants and check them again:
1. The plain characters.
2. The whole clip read from its Jyutping.
3. Just the doubtful word read from its Jyutping.

Azure respects tones given as phonemes. So if a variant spelled out in Jyutping scores the same as the plain clip, the voice was already saying what we wanted, and the doubt is the checker's. If it scores much better, the voice was wrong.

**Then fix it at the source.** Words are defined once, in each unit's `vocab.js`, and the audio is generated from there, so a fix is a setting on the word, not a hand-edited file:
- **Read it from Jyutping** (`phoneme: true`) for a misread word, or for just the misread words inside a phrase. We keep this list short: spelling one word out can upset the words next to it. So we compare scores word by word, before and after, and keep only the ones that help. In Unit 19 it fixed 魚, 行, 雀仔 and 馬騮, and made no difference to 會 and 隻, so those stay plain.
- **A different voice for a word Azure can't say.** 今年, 舊年, 出年 and 女 use a MiniMax voice. MiniMax varies from take to take and sometimes adds syllables, so we make up to five takes and keep the first one the checker passes. We keep this to a handful of words: MiniMax did worse than Azure on single-syllable tone drills, and it sounds different from the rest of the site.
- **Teach a form the voice can say**, when both forms are right. Unit 8 teaches 檸檬茶 rather than the short 檸茶, and mentions the short form. Good takes of 檸茶 are kept aside in case we switch.
- **A different voice for contrasts.** The six-tone sets use WanLung, because HiuMaan blurs 5 with 2 and 3 with 6.

**Then record what's left.** Each unit's verdicts are saved (`unit<N>/audio/check.json`, and the dictionary's in `words/audio/check.json`) and shown on the review page. We also note the clips that are still flagged, so a listener knows where to start.

## How you can help
Open the [audio review page](https://ssullivan.github.io/learn-cantonese/review/). Every clip is there with its unit, Chinese, Jyutping and English.
1. Play a clip and mark it **OK** or **Sounds wrong**. Add a note if you can say what's wrong, for example "tone 5, sounds like 2" or "should be peng4".
2. Turn on **Show machine flags** to start with the CHECKs and LISTENs.
3. Press **Copy my notes** and send them to us.

Your marks are kept in your browser, so you can stop and come back. If a clip is regenerated after you marked it, the page says so.

The same list is in [AUDIO-REVIEW.md](AUDIO-REVIEW.md), for reading on GitHub.
