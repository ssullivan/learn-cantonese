# Cantonese Learning Games

Static HTML Cantonese games served with GitHub Pages at https://ssullivan.github.io/learn-cantonese/ (from `main`, repo root).

Maintainability comes first: anything two pages share belongs in `shared/`, not in copies.


## Layout
```
index.html               unit picker
shared                   used by every unit
header comment documents its API
  theme.css              colors, fonts, page header, pills, buttons, feedback boxes: every page
  game.css, engine.js    game screens and the game engine (Game.init)
```


- Everything for a unit lives in `unit<N>/`. Pages load `shared/` with `../../shared/...`.
- When adding a game or tutorial, add its link to that unit's card on `unit<N>/index.html` (and turn a "Comming soon" card into a real one). When adding a unit, create `unit<N>/index.html` and `index<N>/CLAUDE.md` from the first
Unit, add a card to the root `index.html` in uit order, and update its "Units ..." eyebrow.
- Game and tuorials link back to their grade page with `href="../"` ("<- Unit N")
- Use relative links only (the site is served under `/learn-cantonese/`, not `/`).
- `.nojekyll` disables Jekyll processing so files are served as-is.
- `localStorage` is shared by the whole site, so keys must be unique across grades. Existing pages keep their keys (`bb-save`, `mm-save`, `rr-save`, `dd-save`, `bb-learn`) so saved progress survives; new ones use `g<N>u<M>-save` / `g<N>u<M>-learn`.
- Local CSS and JS are loaded with a `?v=<hash>` cache stamp; `node tools/check.mjs --fix` writes them. Never edit a stamp by hand.

## Building games

When building a game:
- Generated problems must make sense in the real world, not just compute (no part bigger than its whole, no 150% of a full tank, realistic amounts).
- Keep numbers friendly enough to do in your head (basic facts, few nonzero digits, at most one regroup) so the concept is the challenge, not the arithmetic. Enforce these limits in `checks.js`.
- Skip open-ended lessons (Fermi problems, projects); say so in the game's "For grown-ups" section.
- Avoid gendered pronouns for named students; reword instead.

## Learn pages

Interactive tutorials live next to each game as `unit<M>/learn.html` and get a Learn link on the unit's card on the grade page. They run on `shared/learn.js`; Grade 6 Unit 1 (`learn.html` + `lessons.js`) is the template.

## Checking a change
