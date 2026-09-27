# learn-cantonese

Cantonese lessons and games with native-sounding audio, served at https://ssullivan.github.io/learn-cantonese/.

- **Unit 1 · 點心 Dim Sum**: 12 dishes with pictures and audio, a listening quiz, and phrases for ordering at yum cha.

## Working on it

```sh
node tools/draw.mjs          # unit<N>/art.mjs → img/*.svg
node tools/tts.mjs           # unit<N>/vocab.js → audio/*.mp3 (needs Azure Speech key)
node tools/check.mjs --fix   # check links/assets, update cache stamps
python3 -m http.server       # preview at http://localhost:8000
```

See [CLAUDE.md](CLAUDE.md) for conventions.
