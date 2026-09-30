# How we check stroke order

Every unit teaches a few characters to write, stroke by stroke: 64 characters across 20 units, in the **Write It** game and on printable **Writing Sheets**. This page explains where their stroke order comes from, how we check it against Hong Kong's standard, how the game checks what a learner writes, and what we do when something doesn't fit.

If you write Chinese and want to help, skip to [How you can help](#how-you-can-help).

## Our approach, and why

### Hong Kong's standard is the guiding principle
Stroke order isn't the same everywhere. Hong Kong schools follow the Education Bureau's **《香港小學學習字詞表》** (the Lexical Lists for Chinese Learning in Hong Kong), which gives a standard order, and a standard form, with an animation of each character being written. Mainland China and Taiwan have their own standards, and they disagree on hundreds of characters:
- **Order:** in 必, Hong Kong writes strokes 4 and 5 the other way round from the mainland. 再, 快 and 點 differ too.
- **Form:** Hong Kong writes 之 in 4 strokes where the mainland writes 3, the grass radical 艹 (as in 菜) in 4 strokes instead of 3, and 巨 in 5 instead of 4.

This site teaches Hong Kong Cantonese, so it teaches Hong Kong's order and form.

### Where the data comes from
We need two things for each character: the **shape of every stroke** (to draw it, animate it and check a learner's writing) and the **order**.
- **The shapes** come from [Make Me a Hanzi](https://github.com/skishore/makemeahanzi), the free data behind most stroke-order apps: every stroke's outline and centre line, for about 9,000 characters. It follows **mainland** order, even for traditional characters. It's under the Arphic Public License, so the files built from it (`strokes/`) are too (see `LICENSE`).
- **The order** comes from the Education Bureau's own stroke animations on its [Lexical Lists site](https://www.edbchinese.hk/lexlist_ch/). There is no downloadable data or open licence, so we don't copy anything from them. We watch each animation and keep only the facts: which stroke comes when, how many strokes there are, and how well they matched.

So each character's strokes are Make Me a Hanzi's shapes, put in the order the Education Bureau's animation shows.

### What the machine checks
A person watching thousands of animations and comparing them stroke by stroke isn't practical, so a tool does it (`tools/stroke-check.mjs`). For each character it:

1. **Finds the character's animation** on the Education Bureau's site.
2. **Plays it frame by frame** in a headless browser and records each stroke's ink as it's drawn. A stroke is a burst of new ink followed by a pause. We don't trust the stroke numbers the animation shows, because some files skip them (先 never shows a 6).
3. **Draws Make Me a Hanzi's strokes** stretched onto the animation's character, so the two line up despite being different fonts.
4. **Pairs each animated stroke with one of Make Me a Hanzi's strokes**, by how much they overlap, each used once. The pairing *is* the Hong Kong order.

Each character gets one of four results:
- **OK:** every stroke paired up well. The order is recorded, reordered from the mainland data where Hong Kong differs.
- **LOOK:** a stroke paired weakly (in 點, the last stroke overlaps only about half as well as the rest). A person compares it with the animation and confirms it before it can be taught.
- **DIFFERS:** the animation has a different number of strokes from the data. Hong Kong writes this character in another form, which reordering can't give us. It isn't taught.
- **MISSING:** the character isn't in the Education Bureau's list, or has no Make Me a Hanzi data. This is the case for Cantonese-only characters like 咗 and 嘅 (see below).

The verdicts are kept in `tools/strokes-hk.json`, and the site's checks refuse to teach a character unless it is OK, or LOOK and confirmed by a person.

### How we know the checker is any good
- **It agrees with independent work.** An open-source Hong Kong worksheet project ([chinese-worksheet](https://github.com/forumdata-collab/chinese-worksheet)) extracted the Bureau's order a different way and published which characters differ from the mainland. On all 61 characters we compared, the checker found the same order, including every reordered one (必, 再, 快, 點).
- **Its matching is tested.** Tests feed it made-up animations: strokes drawn in bursts, strokes that cross, strokes in the other order, a flicker at the end. Each test fails if the rule it covers is removed.
- **It knows its limits.** A weak pairing becomes LOOK rather than a guess, and a stroke-count mismatch becomes DIFFERS rather than a forced pairing.

### Where things stand
86 characters have been checked: 78 are OK, 1 is LOOK (點, not taught yet), 4 DIFFER (之 巨 菜 過) and 3 are MISSING (咗 咼 嘅). All 64 taught characters are either OK or composed from OK parts. None has been looked at by a person yet.

## Characters only Cantonese has
Cantonese writes some everyday words with characters of its own: 咗 (done), 哋 (plural), 冇 (not have), 喺 (be at), 啲 (some), 嗰 (that). They aren't in the Education Bureau's list, and not in Make Me a Hanzi either, so there is **no official stroke order to check them against**.

We **compose** them from parts that do have one (`tools/strokes-composed.mjs`):
- 咗 is the 口 of 呢, followed by 左 stretched into the space 呢's right-hand side fills.
- 哋 is 口 + 地; 喺 is 口 + 係; 啲 is 口 + 的; 嗰 is 口 + 個.
- 冇 is the first four strokes of 有 (有 without its two inner strokes).

Each part keeps its own checked Hong Kong order, and the parts go left to right, which is how Hong Kong writes any character with a left and right side. The parts' strokes must add up to the character's stroke count in a dictionary, or the site's checks refuse it.

On the review page these are marked **Composed**, with links to each part's animation, and the page says plainly that there's no official order. Unit 2 teaches 冇 咗 哋; recipes for 喺 啲 嗰 咁 嚟 唞 嫲 枱 are ready for their units. **佢 can't be composed yet:** its part 巨 is one of the characters Hong Kong writes differently (5 strokes, not 4).

## How the game checks what you write
In **Write It**, a learner draws each stroke with a finger, pen or mouse. Each stroke is compared with the centre line of the stroke that should come next (`Write.judge` in `shared/write.js`). All distances are in a box 1,024 units wide.

- **It must start and end near the stroke**, within about a fifth of the box.
- **It must follow the stroke's path.** Both lines are cut into 24 evenly spaced points, and their average distance apart must be small (about an eighth of the box).
- **It mustn't be a scribble.** It can't be more than about twice as long as the stroke.
- **It must be the closest match among the strokes still to write.** 三's three strokes all look alike, so the middle one drawn first isn't taken as the top one.

The checks are more forgiving on the easier levels: 30% more on *Watch & trace*, 20% on *Trace*, 10% on *From memory* and *默書 Dictation*.

What happens after each stroke:
- **A right stroke** snaps into place.
- **A wrong stroke** fades out. If it matches a later stroke, the game says so: *"That's stroke 2. In Hong Kong order, stroke 1 comes first."* This is where the order is actually taught.
- **After three misses** the stroke is shown to trace.
- **Scoring:** a round counts as right with up to one slip (a wrong stroke or a hint) per six strokes, and at least one.

These rules are tested on the real strokes of 三 and 十: right, wobbly and slightly offset strokes pass; reversed, far-off, out-of-order, overshooting and scribbled ones fail. A test browser also played the first level of every unit, and every level of units 2 and 4, by drawing each stroke. **Nobody has tried it with a real finger yet**, so how forgiving it feels on a phone is the thing we know least about.

## Common problems we've seen
- **Stroke numbers in the animations can't be trusted.** 先's animation never shows a 6, and 兔's skips its 6, so the checker finds strokes from the ink instead.
- **An animation can flicker after the last stroke.** 名's does, and at first it read as a 7th stroke (and a different form). The checker now ignores a burst that leaves no ink of its own. After that fix, every character was checked again and only 名 changed.
- **Different forms, not just different order.** 之, 菜, 巨 and 過 have another stroke count in Hong Kong. We teach other characters instead (起 in unit 15, 共 in unit 20).
- **Weak matches in dense characters.** In 點 (17 strokes), the small final strokes of 占 line up less well between the two fonts. That makes it LOOK, not wrong.
- **Composed characters can be cramped.** In 喺 the 係 is squeezed thin, and 嚟 fits 18 strokes into a narrow space. They are readable, but a font designer would reshape the parts.
- **Stroke numbers pile up in dense characters.** In 點 the numbers for 灬 used to overlap. Each number now sits just before its stroke, or at the nearest free spot around it.

## How we fix them, and how to add a character
Characters to teach are listed once, in each unit's `vocab.js` (`write: '水牛好'`), and everything else is built from there:
1. **Run the check:** `node tools/stroke-check.mjs`. It checks every listed character without a record.
2. **Act on the result:**
   - **OK:** nothing to do.
   - **LOOK:** watch the Bureau's animation (linked from the review page) and compare. If the order is right, confirm it: `node tools/stroke-check.mjs --confirm 點`.
   - **DIFFERS:** teach another character from the unit's words.
   - **MISSING (a Cantonese character):** compose it from checked parts in `tools/strokes-composed.mjs`, then render it and look at it before teaching it.
3. **Build the stroke files:** `node tools/strokes.mjs` writes `strokes/<code point>.json`.
4. **Check the site:** `node tools/check.mjs` refuses a character that isn't checked, confirmed or composed; a stroke file that is out of date; and a unit without its Write It page and Writing Sheet.

## How you can help
Open the [stroke order review page](https://ssullivan.github.io/learn-cantonese/review/strokes.html). Every character the site teaches is there, drawn stroke by stroke, with the checker's result and a link to the Education Bureau's animation.
1. Compare the strokes with the animation, especially any marked **Needs a person**.
2. Look at the **Composed** characters (冇 咗 哋). There's no official order for these, so a Hong Kong writer's view is the best check we have.
3. Try **Write It** on a phone and tell us if a stroke you wrote correctly was refused, or a wrong one accepted.

Send us what you find.
