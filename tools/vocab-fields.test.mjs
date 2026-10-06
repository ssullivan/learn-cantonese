#!/usr/bin/env node
/*
 * vocab-fields.test.mjs — tests tools/vocab-fields.mjs, which checks each
 * vocab entry's fields. Run by tools/check.mjs; exits 1 on failure.
 */
import { entryProblems } from './vocab-fields.mjs';

let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };

const IDS = new Set(['ngo', 'hai', 'zek', 'cat', 'jit', 'dung', 'yes', 'no']);
const isId = id => IDS.has(id);
const word = extra => ({ id: 'cat', hanzi: '貓', jyutping: 'maau1', english: 'cat', ...extra });
const problems = extra => entryProblems(word(extra), isId);
const says = (extra, text) => problems(extra).some(p => p.includes(text));

ok('a plain word has no problems', problems({}).length === 0, problems({}).join('; '));
ok('every field with a good value has no problems', problems({
  note: 'A note.', img: false, phoneme: ['ngo'], voice: 'zh-HK-WanLungNeural', unit: 5, words: ['ngo', 'hai'],
  measure: 'zek', counted: ['a cat', 'cats'], n: 2, at: [7, 30], ing: null, sweet: '', decoys: [],
  turn: 'zo', fit: { cx: 64, cy: 50, s: 2 }, cmp: { a: 'cat', b: 'ngo', scale: 'size', adj: 'jit', holds: true },
}).length === 0, problems({ ing: null }).join('; '));

// Misspelt and missing fields.
ok('unknown field is named', says({ phonme: true }, 'unknown field phonme'), problems({ phonme: true }).join('; '));
const missing = entryProblems({ id: 'x', hanzi: '貓', english: 'cat' }, isId);
ok('missing required field', missing.some(p => p === 'x is missing jyutping'), missing.join('; '));
ok('undefined clears an optional field', problems({ note: undefined, measure: undefined }).length === 0);
const blank = entryProblems({ id: 'x', hanzi: '', jyutping: 'maau1', english: 'cat' }, isId);
ok('an empty required field is missing, once', blank.length === 1 && blank[0] === 'x is missing hanzi', blank.join('; '));

// Kinds.
ok('text: not a number', says({ note: 3 }, 'note should be text'));
ok('text: not empty', says({ note: '' }, 'note should be text'));
ok('number: not a string', says({ n: '2' }, 'n should be a number'));
ok('boolean: not a string', says({ near: 'yes' }, 'near should be true or false'));
ok('oneOf: false only for img', says({ img: true }, 'img should be false'));
ok('oneOf: fixed values', says({ turn: 'left' }, 'turn should be "zik" or "zo" or "jau"'), problems({ turn: 'left' }).join('; '));
ok('lists: not a lone value', says({ counted: 'a cat' }, 'counted should be a list of texts'));
ok('lists: not empty', says({ words: [] }, 'words should be a list of entry ids'));
ok('lists: each item checked', says({ at: [7, '30'] }, 'at[1] should be a number'), problems({ at: [7, '30'] }).join('; '));
ok('either: true or ids for phoneme', problems({ phoneme: true }).length === 0 && says({ phoneme: 'yes' }, 'phoneme should be'));
ok('object: exact keys', says({ fit: { cx: 1, cy: 2 } }, 'fit should be { cx, cy, s }') && says({ fit: { cx: 1, cy: 2, s: 3, r: 4 } }, 'fit should be'));
ok('object: each value checked', says({ fit: { cx: 1, cy: 2, s: 'big' } }, 'fit.s should be a number'));

// Ids must name entries.
ok('id: names an entry', says({ measure: 'zeck' }, 'measure names zeck, which is not an entry'), problems({ measure: 'zeck' }).join('; '));
ok('ids: each must name an entry', says({ words: ['ngo', 'hia'] }, 'words[1] names hia'), problems({ words: ['ngo', 'hia'] }).join('; '));
ok('either: a bad id is reported as a bad id', says({ sweet: 'shao' }, 'sweet names shao, which is not an entry'), problems({ sweet: 'shao' }).join('; '));
ok('object: ids inside are checked', says({ cmp: { a: 'cat', b: 'dog', scale: 'size', adj: 'jit', holds: true } }, 'cmp.b names dog'));

process.exit(fail ? 1 : 0);
