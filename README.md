# learn-cantonese

Cantonese lessons and games with native-sounding audio, served at https://ssullivan.github.io/learn-cantonese/.

- **Unit 1 · 點心 Dim Sum**: classic dishes with pictures and audio, a listening quiz, and phrases for ordering at yum cha.
  - *Trolley Rush*: hear customers' orders (唔該，一籠蝦餃！) and serve the right dishes; learn 一籠 vs 一碟.
  - *Tone Detective*: hear a word and pick its tones.

## Working on it

```sh
node tools/draw.mjs          # unit<N>/art.mjs → img/*.svg
node tools/tts.mjs           # unit<N>/vocab.js → audio/*.mp3 (needs Azure Speech key)
node tools/check.mjs --fix   # check links/assets, update cache stamps
python3 -m http.server       # preview at http://localhost:8000
```

See [CLAUDE.md](CLAUDE.md) for conventions.
