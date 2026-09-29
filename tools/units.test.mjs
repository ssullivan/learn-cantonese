#!/usr/bin/env node
/*
 * units.test.mjs — tests borrowing words between units: shared/units.js,
 * tools/site.mjs's loadVocab, and Canto.audioSrc / imgSrc paths. Run by
 * tools/check.mjs; exits 1 on failure.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT, loadVocab, entries, own } from './site.mjs';

let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };

const sb = vm.createContext({});
sb.window = sb;
for (const f of ['shared/units.js', 'shared/core.js']) vm.runInContext(readFileSync(join(ROOT, f), 'utf8'), sb);
const { Units, Canto } = sb;

Units.add(3, { words: [{ id: 'cat', hanzi: '貓', jyutping: 'maau1', english: 'cat' }] });
const cat = Units.word(3, 'cat');
ok('borrowed word keeps its fields', cat.hanzi === '貓' && cat.unit === 3, JSON.stringify(cat));
ok('borrowing copies, not shares', !('unit' in sb.UNITS[3].words[0]));
ok('borrowed audio path', Canto.audioSrc(cat) === '../unit3/audio/cat.mp3', Canto.audioSrc(cat));
ok('borrowed picture path', Canto.imgSrc(cat) === '../unit3/img/cat.svg', Canto.imgSrc(cat));
ok('own word paths stay relative', Canto.audioSrc({ id: 'dog' }) === 'audio/dog.mp3');
const throws = f => { try { f(); return false; } catch { return true; } };
ok('unknown word throws', throws(() => Units.word(3, 'dog')));
ok('unloaded unit throws', throws(() => Units.word(9, 'cat')));

const v7 = loadVocab('unit7');
const mGoi = entries(v7).find(e => e.id === 'm-goi');
ok('loadVocab resolves unit 7 borrowing 唔該', mGoi?.unit === 2 && !own(mGoi, 'unit7') && own(mGoi, 'unit2'), JSON.stringify(mGoi?.unit));
const v5 = loadVocab('unit5');
const go = v5.measures.find(m => m.id === 'go');
ok('unit 5 borrows 個 from unit 4', go?.unit === 4 && !own(go, 'unit5'), JSON.stringify(go?.unit));
const measureIds = new Set(v5.measures.map(m => m.id));
const stray = v5.things.filter(t => !measureIds.has(t.measure)).map(t => t.id);
ok('every unit 5 thing has a unit 5 measure word', !stray.length, stray.join(' '));
const fish = v5.things.find(t => t.id === 'fish');
ok('a borrowed thing keeps its unit and gains a measure', fish?.unit === 1 && fish.measure === 'tiu', JSON.stringify(fish));

const say = Units.sentences({ words: [cat, { id: 'aa', hanzi: '呀', jyutping: 'aa3', english: '(particle)' }] });
const q = say('cat aa', 'A cat?', { note: 'n' });
ok('sentence joins its words', q.id === 'cat-aa' && q.hanzi === '貓呀？' && q.jyutping === 'maau1 aa3' && q.words.join() === 'cat,aa' && q.img === false && q.note === 'n', JSON.stringify(q));
ok('sentence without ? has no ？', say('cat', 'A cat.').hanzi === '貓');
ok('sentence with an unknown word throws', throws(() => say('cat dog', 'x')));

const pv = { words: [{ id: 'cat' }, { id: 'aa' }], phrases: [{ id: 'cat-aa', words: ['cat', 'aa'] }, { id: 'aa-aa', words: ['aa', 'aa'] }],
  longer: [{ id: 'cat-aa-aa', words: ['cat-aa', 'aa'] }] };
Units.phonemes(pv, ['cat']);
ok('phonemes marks the misread word', pv.words[0].phoneme === true && !('phoneme' in pv.words[1]));
ok('phonemes marks only the misread words of a phrase', JSON.stringify(pv.phrases[0].phoneme) === '["cat"]', JSON.stringify(pv.phrases[0].phoneme));
ok('phonemes leaves phrases without them alone', !('phoneme' in pv.phrases[1]));
ok('phonemes reaches a phrase inside a longer one', JSON.stringify(pv.longer[0].phoneme) === '["cat-aa"]', JSON.stringify(pv.longer[0].phoneme));

const v6 = loadVocab('unit6');
const apple = v6.things.find(t => t.id === 'apple');
ok('unit 6 borrows unit 5 things with a price', apple?.unit === 5 && apple.price > 0 && apple.measure === 'go', JSON.stringify(apple));
const oneFish = v6.ones.find(o => o.id === 'one-fish');
ok('unit 6 borrows 一條魚 from unit 5, where it was made', oneFish?.unit === 5, JSON.stringify(oneFish?.unit));
const allPrices = new Map([...v6.cash, ...v6.prices].map(p => [p.n, p]));
const priceless = v6.things.filter(t => !allPrices.has(t.price)).map(t => t.id);
ok('every unit 6 thing\'s price has an entry', !priceless.length, priceless.join(' '));
ok('unit 6 coins have pictures', v6.cash.every(c => c.img !== false && c.cash));
process.exit(fail ? 1 : 0);
