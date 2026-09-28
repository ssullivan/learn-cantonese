# learn-cantonese

Cantonese lessons and games with native-sounding audio, served at https://ssullivan.github.io/learn-cantonese/.

The course plans 18 units (see the roadmap in CLAUDE.md); built so far:

- **Unit 1 · 聲調 Sounds & Tones**: the six tones on one syllable at a time, and how to read Jyutping.
  - *Tone Detective*: from high-or-low up to all six tones.
- **Unit 2 · 打招呼 Greetings**: hello and goodbye, how are you, and when to say 唔該, 多謝 or 對唔住.
  - *Reply Match*: hear a phrase, answer back, or pick what to say in a situation.
  - *Tone Detective* and *Say It Back* for greetings.
- **Unit 3 · 我同你 Me & You**: 我 你 佢 and 哋, 係 and 唔, 我叫…, and questions with 嗎, A唔A (係唔係), 邊個 and 乜嘢.
  - *Question Builder*: build sentences and questions from word tiles, and answer 係呀 or 唔係呀 about a picture.
  - *Tone Detective* and *Say It Back* for people words and questions.
- **Unit 4 · 數字 Numbers**: 零 to 萬 with the one-hand counting signs, 廿, 零 in the gaps, 第, 幾多, and 二 vs 兩.
  - *Number Dash*: hear a number and tap it (十四 or 四十?), say numbers, and pick 二 or 兩.
  - *Tone Detective* and *Say It Back* for numbers.
- **Unit 5 · 量詞 Measure Words**: 個 隻 本 張 條 枝 架 件 杯 碗 對 and 啲, grouped by shape, with 呢 / 嗰, "the", 兩 and 幾多.
  - *Measure Sort*: pick a thing's measure word, sort things by measure word, hear them, and point with 呢 or 嗰.
  - *Count It*: count pictures and say how many (三隻貓), hear a count and find it, and build sentences with 有 and 幾多.
  - *Tone Detective* and *Say It Back* for measure words and counts.
- **Unit 7 · 點心 Dim Sum**: classic dishes with pictures and audio, a listening quiz, and phrases for ordering at yum cha.
  - *Trolley Rush*: hear customers' orders (唔該，一籠蝦餃！) and serve the right dishes; learn 一籠 vs 一碟.
  - *Tone Detective*: hear a word and pick its tones.
  - *Say It Back*: record yourself and compare your pitch curve with a native speaker's (recordings stay on your device).

## Working on it

```sh
node tools/draw.mjs          # unit<N>/art.mjs → img/*.svg
node tools/tts.mjs           # unit<N>/vocab.js → audio/*.mp3 (needs Azure Speech key)
node tools/check.mjs --fix   # check links/assets, update cache stamps
python3 -m http.server       # preview at http://localhost:8000
```

See [CLAUDE.md](CLAUDE.md) for conventions.

## License

Copyright © 2026 Stephen Sullivan. All rights reserved. You may use the site for your own learning; see [LICENSE](LICENSE).
