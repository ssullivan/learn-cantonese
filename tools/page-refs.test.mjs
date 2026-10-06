#!/usr/bin/env node
/*
 * page-refs.test.mjs — tests tools/page-refs.mjs, which finds the vocab
 * groups and ids a page script names. Run by tools/check.mjs; exits 1 on
 * failure.
 */
import { inlineScripts, pageReferences, withoutComments } from './page-refs.mjs';

let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };
const names = (source, kind) => pageReferences(source).filter(r => r.kind === kind).map(r => r.name).join(' ');

// Groups: V.<name> once V is the page's vocab, and window.VOCAB.<name>.
let got = names(`const V = window.VOCAB;\nconst pool = [...V.verbs, ...V.things];\nconst x = window.VOCAB.measures;`, 'group');
ok('groups: V.<name> (spread too) and window.VOCAB.<name>', got === 'measures verbs things', got);
got = names(`const V = other;\nV.verbs;`, 'group');
ok('groups: V that is not the vocab is left alone', got === '', got);
got = names(`const V = window.VOCAB;\nconst e = ctx.V.verbs, f = myV.things;`, 'group');
ok('groups: only V itself, not a property or longer name', got === '', got);

// Ids: lookups on maps made by Units.byId, under any name.
got = names(`const byId = Units.byId(V);\nconst measure = Units.byId(V.measures);\nbyId['ji-gaa']; byId.dung; measure["zek"];`, 'id');
ok('ids: map[\'x\'], map.x and map["x"] on Units.byId maps', got === 'ji-gaa dung zek', got);
got = names(`const byId = Units.byId(V);\nfoo.byId.dung; other['x'];`, 'id');
ok('ids: a property named like the map, and other objects, are left alone', got === '', got);

// Ids: ctx.words / ctx.entry with only literal arguments, over several lines.
got = names(`ctx.words('a', "b",\n  'c-d',\n);\nctx.entry('e');`, 'id');
ok('ids: ctx.words and ctx.entry with literal ids', got === 'a b c-d e', got);
got = names(`ctx.words(...V.short.map(e => e.id)); ctx.words(...ids.filter(id => id !== 'x' + 'y'));`, 'id');
ok('ids: calls with computed arguments are skipped', got === '', got);
got = names(`ctx.words(...V.fruit.filter(e => e.kind === 'fruit'));`, 'id');
ok('ids: a literal inside a computed argument is not an id', got === '', got);

// Ids: comparisons with .id.
got = names(`e.id === 'dung' || e.id !== "jit" || x.id == 'tomato'`, 'id');
ok('ids: .id === / !== / == a literal', got === 'dung jit tomato', got);

// Borrowed words with a literal id.
let refs = pageReferences(`Units.word(9, 't0600'); Units.word(9, \`t\${hh}\`);`).filter(r => r.kind === 'word');
ok('words: Units.word(n, literal), not a template', refs.length === 1 && refs[0].unit === 9 && refs[0].name === 't0600', JSON.stringify(refs));

// Dictionary words: Words.get and each id of Words.list, literals only.
got = names(`Words.get('apple'); ...Words.list(' cat  dog '); Words.get(id); Words.list(\`a \${b}\`);`, 'dictionary');
ok('dictionary: Words.get and Words.list literals', got === 'apple cat dog', got);

// Comments are skipped; strings that look like comments are not.
got = names(`/* uses shared/measures.js */\nconst measures = Units.byId(V.measures);\n// measures.js again\nmeasures.zek;`, 'id');
ok('comments: names in comments are skipped', got === 'zek', got);
const src = `a('http://x'); // gone\nb("/* kept */"); /* gone\nstill gone */ c(\`// kept\`);`;
const out = withoutComments(src);
ok('comments: strings and template literals are kept', out.includes(`'http://x'`) && out.includes(`"/* kept */"`) && out.includes('`// kept`'), out);
ok('comments: blanked, newlines kept', !out.includes('gone') && out.split('\n').length === src.split('\n').length && out.length === src.length, out);

// Line numbers, inside a page.
refs = pageReferences(`const V = window.VOCAB;\n\n/* two\nlines */\nV.verbs;`);
ok('lines: counted from the script\'s first line', refs[0]?.line === 5, JSON.stringify(refs));
const html = `<!doctype html>\n<script src="a.js"></script>\n<script>\n  const V = window.VOCAB;\n</script>`;
const scripts = inlineScripts(html);
ok('inlineScripts: only scripts without src, with the line they start on', scripts.length === 1 && scripts[0].line === 3 && scripts[0].source.includes('window.VOCAB'), JSON.stringify(scripts));

process.exit(fail ? 1 : 0);
