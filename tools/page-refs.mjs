/*
 * page-refs.mjs — what a unit's page scripts take from its vocab by name,
 * so tools/check.mjs can catch a misspelt or renamed group or id. In the
 * browser such a name is just undefined, and fails only when a learner
 * reaches the step or level that uses it.
 *
 *   inlineScripts(html)     the source of each inline <script> (no src) in
 *                           a page, with the line it starts on
 *   pageReferences(source)  [{ kind, name, unit?, line }] found in a script:
 *     'group'  V.<name> (where V = window.VOCAB) or window.VOCAB.<name>:
 *              a list or value of the unit's vocab.js
 *     'id'     an entry id of the unit's vocab: map['x'] or map.x on a map
 *              made by Units.byId(...), ctx.words('a', 'b') and
 *              ctx.entry('a') when every argument is a literal, and
 *              .id === 'x' (or !==)
 *     'word'   Units.word(n, 'x'): unit n's entry x (unit: n)
 *     'dictionary'  Words.get('x'), and each id in Words.list('a b'): a
 *              word in the dictionary
 *
 * Comments are skipped. Only literal names are seen: ids built at run time
 * (`one-${id}`) are not.
 */

const NAME = '[A-Za-z_$][\\w$]*';
const STRING = `'[^'\\\\\\n]*'|"[^"\\\\\\n]*"`;
const ONLY_STRINGS = new RegExp(`^\\s*(?:${STRING})(?:\\s*,\\s*(?:${STRING}))*\\s*,?\\s*$`);
const unquote = s => s.slice(1, -1);
// Not a property (x.V) or part of a longer name (myV), but ...V is fine.
const STANDALONE = '(?<![\\w$])(?<![^.]\\.)';

const lineAt = (source, index) => source.slice(0, index).split('\n').length;

export function inlineScripts(html) {
  return [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map(m => ({ source: m[1], line: lineAt(html, m.index + m[0].indexOf('>') + 1) }));
}

// The source with its comments blanked out (newlines kept, so lines still
// count), and strings and template literals left alone.
export function withoutComments(source) {
  let out = '', quote = null;
  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    if (quote) {
      out += c;
      if (c === '\\') out += source[++i] ?? '';
      else if (c === quote) quote = null;
    } else if (c === "'" || c === '"' || c === '`') { quote = c; out += c; }
    else if (c === '/' && (source[i + 1] === '/' || source[i + 1] === '*')) {
      const close = source[i + 1] === '/' ? '\n' : '*/';
      const at = source.indexOf(close, i + 2);
      const end = at < 0 ? source.length : close === '\n' ? at : at + 2;
      out += source.slice(i, end).replace(/[^\n]/g, ' ');
      i = end - 1;
    } else out += c;
  }
  return out;
}

// The arguments of the call whose "(" is at `open`, up to its matching ")".
function callArguments(source, open) {
  let depth = 0, quote = null;
  for (let i = open; i < source.length; i++) {
    const c = source[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
    } else if (c === "'" || c === '"' || c === '`') quote = c;
    else if (c === '(') depth++;
    else if (c === ')' && --depth === 0) return source.slice(open + 1, i);
  }
  return '';
}

export function pageReferences(script) {
  const source = withoutComments(script);
  const refs = [];
  const add = (kind, name, index, extra) => refs.push({ kind, name, line: lineAt(source, index), ...extra });

  const groupPatterns = [new RegExp(`window\\.VOCAB\\.(${NAME})`, 'g')];
  if (/\bconst V = window\.VOCAB\b/.test(source)) groupPatterns.push(new RegExp(`${STANDALONE}V\\.(${NAME})`, 'g'));
  for (const pattern of groupPatterns) {
    for (const m of source.matchAll(pattern)) add('group', m[1], m.index);
  }

  const maps = [...source.matchAll(new RegExp(`\\b(?:const|let|var)\\s+(${NAME})\\s*=\\s*Units\\.byId\\(`, 'g'))].map(m => m[1]);
  for (const map of new Set(maps)) {
    const lookup = new RegExp(`${STANDALONE}${map.replace(/\$/g, '\\$')}(?:\\[\\s*(${STRING})\\s*\\]|\\.(${NAME}))`, 'g');
    for (const m of source.matchAll(lookup)) add('id', m[1] ? unquote(m[1]) : m[2], m.index);
  }

  for (const m of source.matchAll(/\bctx\.(?:words|entry)\(/g)) {
    const args = callArguments(source, m.index + m[0].length - 1);
    if (!ONLY_STRINGS.test(args)) continue;
    for (const s of args.matchAll(new RegExp(STRING, 'g'))) add('id', unquote(s[0]), m.index);
  }

  for (const m of source.matchAll(new RegExp(`\\.id\\s*[!=]==?\\s*(${STRING})`, 'g'))) add('id', unquote(m[1]), m.index);

  for (const m of source.matchAll(new RegExp(`\\bUnits\\.word\\(\\s*(\\d+)\\s*,\\s*(${STRING})`, 'g'))) {
    add('word', unquote(m[2]), m.index, { unit: +m[1] });
  }
  for (const m of source.matchAll(new RegExp(`\\bWords\\.(?:get|list)\\(\\s*(${STRING})\\s*\\)`, 'g'))) {
    for (const id of unquote(m[1]).trim().split(/\s+/)) add('dictionary', id, m.index);
  }
  return refs;
}
