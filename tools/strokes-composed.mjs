/*
 * strokes-composed.mjs — characters with no Hong Kong standard to check
 * against, built from parts that have one. Cantonese characters like 咗
 * and 哋 aren't in the Education Bureau's list (nor in Make Me a Hanzi),
 * but their parts are: 咗 is 口 beside 左. Each part is taken in its own
 * Hong Kong order (its record in tools/strokes-hk.json must be usable),
 * and the parts follow one another left to right, as Hong Kong writes a
 * left-right character. tools/strokes.mjs builds them
 * (stroke-data.mjs's compose); look at the result on review/strokes.html.
 *
 *   char: { strokes, parts: [{ from, take?, into? }] }
 *     strokes  the character's stroke count, from a dictionary: the parts
 *              must add up to it (tools/check.mjs)
 *     from     the character a part is taken from
 *     take     [start, end): which of its strokes, in Hong Kong order
 *              (default all). Taken where they are: 叫's 口 is already a
 *              left-hand 口
 *     into     [char, start, end]: stretch the part onto the box those
 *              strokes of that character fill (呢's 尼: the right-hand side)
 *
 * Not composable yet: 佢 (Hong Kong writes 巨 in 5 strokes, Make Me a
 * Hanzi in 4), 喎 (咼 isn't in either).
 */
const mouth = [{ from: '呢', take: [0, 3] }];
const right = from => ({ from, into: ['呢', 3, 8] });

export default {
  咗: { strokes: 8, parts: [...mouth, right('左')] },
  哋: { strokes: 9, parts: [...mouth, right('地')] },
  唞: { strokes: 10, parts: [...mouth, right('抖')] },
  咁: { strokes: 8, parts: [...mouth, right('甘')] },
  啲: { strokes: 11, parts: [...mouth, right('的')] },
  喺: { strokes: 12, parts: [...mouth, right('係')] },
  嗰: { strokes: 13, parts: [...mouth, right('個')] },
  嚟: { strokes: 18, parts: [...mouth, right('黎')] },
  冇: { strokes: 4, parts: [{ from: '有', take: [0, 4] }] },
  嫲: { strokes: 14, parts: [{ from: '媽', take: [0, 3] }, { from: '麻', into: ['媽', 3, 13] }] },
  枱: { strokes: 9, parts: [{ from: '材', take: [0, 4] }, { from: '台', into: ['材', 4, 7] }] },
};
