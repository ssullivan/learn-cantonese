/*
 * vocab-fields.mjs — every field a vocab entry may have and what it holds:
 * the one list tools/check.mjs checks every entry of every unit against,
 * so a misspelt field (phonme: true) or a wrong value fails the check
 * instead of being silently ignored. Each unit's vocab.js header says what
 * its fields mean there. A new field is added here first.
 *
 *   FIELDS                    { field: kind }
 *   entryProblems(entry, isId) → [messages]: unknown fields, missing
 *                             required ones, and values not of their kind;
 *                             isId(id) says whether an id names an entry
 *
 * Kinds: 'text' (a non-empty string), 'number', 'boolean', 'id' (an entry
 * id); 'texts', 'numbers', 'ids' (non-empty lists of them); oneOf(...values)
 * for one of a few fixed values (compared by value, so oneOf([]) is an
 * empty list); either(...kinds) for any of them; and { key: kind } for an
 * object with exactly those keys. Every field but the REQUIRED ones may
 * also be undefined: a borrowed entry clears one with note: undefined.
 */

export const oneOf = (...values) => ({ oneOf: values });
export const either = (...kinds) => ({ either: kinds });

export const REQUIRED = ['id', 'hanzi', 'jyutping', 'english'];

export const FIELDS = {
  // Every entry
  id: 'text', hanzi: 'text', jyutping: 'text', english: 'text',
  note: 'text',
  img: oneOf(false),                  // no picture
  // Audio (tools/tts.mjs)
  say: 'text',                        // text to speak instead of hanzi
  ssml: 'text',                       // SSML inside <voice>
  phoneme: either(oneOf(true), 'ids'), // true: read the jyutping; ids: read those words from theirs
  voice: 'text',                      // another voice, e.g. 'minimax:<voice id>'
  // Borrowing (shared/units.js sets these)
  unit: 'number',                     // home unit
  taught: 'number',                   // a dictionary word's unit (Words.add sets it)
  // Shared engines
  words: 'ids',                       // a derived sentence's words (Tiles.round)
  reply: 'ids', when: 'texts',        // Reply Match
  // Counting, measures and money
  n: 'number',
  measure: 'id', dish: oneOf('steamer', 'plate', 'bowl', 'cup'),
  counted: 'texts',                   // [one, many] in English
  thing: 'id', near: 'boolean',
  price: 'number', cash: oneOf('coin', 'note'),
  // Unit 7: dim sum
  group: 'id', item: 'id', step: oneOf('one', 'count', 'please'), decoys: either('ids', oneOf([])),
  // Unit 8: drinks as ordered
  drink: 'id', temp: 'id', sweet: either('id', oneOf('')), ice: either('id', oneOf('')),
  kind: 'text',                       // unit 8 modifiers, 16 questions, 20 produce
  // Unit 9: times
  h: 'number', m: 'number',
  // Unit 10: family
  member: 'boolean', means: 'id',
  // Unit 11: directions
  turn: oneOf('zik', 'zo', 'jau'), side: 'id', place: 'id',
  // Unit 12: colours and clothes
  fill: 'text', line: 'text', garment: 'id', colour: 'id',
  slot: oneOf('head', 'top', 'bottom', 'feet'), fit: { cx: 'number', cy: 'number', s: 'number' },
  // Unit 13: weather
  adj: 'id', degree: 'id', for: 'ids',
  // Unit 14: health
  part: 'id', pic: 'id', about: 'id', answers: 'ids', times: 'number', pills: 'number',
  // Units 15–17: activities, hobbies, feelings
  at: 'numbers', ing: either('text', oneOf(null)), done: 'text',
  act: 'id', form: oneOf('zo', 'gan', 'mei', 'ask'), first: 'id', then: 'id',
  out: 'boolean', skill: 'boolean', hobby: 'id', yes: 'boolean',
  half: 'id', feeling: 'id', particle: 'id', why: 'text', also: 'ids',
  // Unit 18: comparing
  size: 'number', speed: 'number', age: 'number', height: 'number', who: 'id',
  cmp: { a: 'id', b: 'id', scale: 'text', adj: 'id', holds: 'boolean' },
  // Unit 19: animals
  animal: 'id', order: 'number', verb: 'id', can: 'boolean',
  // Unit 20: the market
  catty: 'number', weight: 'id', total: 'id',
  // Unit 21: the kitchen
  task: 'id', tool: 'id', mins: 'number',
};

const describe = kind =>
  typeof kind === 'string' ? { text: 'text', texts: 'a list of texts', number: 'a number', numbers: 'a list of numbers',
    boolean: 'true or false', id: 'an entry id', ids: 'a list of entry ids' }[kind]
  : kind.oneOf ? kind.oneOf.map(v => JSON.stringify(v)).join(' or ')
  : kind.either ? kind.either.map(describe).join(', or ')
  : `{ ${Object.keys(kind).join(', ')} }`;

// The problems with one value: [] when it is of its kind.
function valueProblems(value, kind, isId, where) {
  const wrong = [`${where} should be ${describe(kind)}, not ${JSON.stringify(value)}`];
  const all = k => Array.isArray(value) && value.length > 0 ? value.flatMap((v, i) => valueProblems(v, k, isId, `${where}[${i}]`)) : wrong;
  if (kind === 'text') return typeof value === 'string' && value !== '' ? [] : wrong;
  if (kind === 'number') return typeof value === 'number' && Number.isFinite(value) ? [] : wrong;
  if (kind === 'boolean') return typeof value === 'boolean' ? [] : wrong;
  if (kind === 'id') {
    if (typeof value !== 'string') return wrong;
    return isId(value) ? [] : [`${where} names ${value}, which is not an entry`];
  }
  if (kind === 'texts') return all('text');
  if (kind === 'numbers') return all('number');
  if (kind === 'ids') return all('id');
  if (kind.oneOf) return kind.oneOf.some(v => JSON.stringify(v) === JSON.stringify(value)) ? [] : wrong;
  if (kind.either) {
    const tries = kind.either.map(k => valueProblems(value, k, isId, where));
    return tries.some(p => p.length === 0) ? [] : tries.find(p => !p[0].includes(' should be ')) ?? wrong;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return wrong;
  const keys = Object.keys(value);
  if (keys.length !== Object.keys(kind).length || keys.some(k => !(k in kind))) return wrong;
  return keys.flatMap(k => valueProblems(value[k], kind[k], isId, `${where}.${k}`));
}

export function entryProblems(entry, isId) {
  const name = entry.id ?? '?';
  const problems = REQUIRED.filter(f => !entry[f]).map(f => `${name} is missing ${f}`);
  for (const [field, value] of Object.entries(entry)) {
    if (!(field in FIELDS)) { problems.push(`${name}: unknown field ${field} (fields are listed in tools/vocab-fields.mjs)`); continue; }
    if (value === undefined && !REQUIRED.includes(field)) continue;
    if (REQUIRED.includes(field) && !value) continue;
    problems.push(...valueProblems(value, FIELDS[field], isId, `${name}: ${field}`));
  }
  return problems;
}
