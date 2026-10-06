#!/usr/bin/env node
/*
 * units.test.mjs — tests the dictionary and borrowing words between
 * units: shared/units.js, tools/site.mjs's loadVocab, homeOf and own, and
 * Canto.audioSrc / imgSrc paths. Run by
 * tools/check.mjs; exits 1 on failure.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT, loadVocab, entries, own, homeOf } from './site.mjs';

let fail = 0;
const quiet = process.argv.includes('--quiet');
const ok = (name, cond, info = '') => { if (!cond || !quiet) console.log((cond ? 'PASS ' : 'FAIL ') + name + '  ' + info); if (!cond) fail++; };

const sb = vm.createContext({});
sb.window = sb;
for (const f of ['shared/units.js', 'shared/core.js']) vm.runInContext(readFileSync(join(ROOT, f), 'utf8'), sb);
const { Units, Words, Canto } = sb;

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

// The dictionary
Words.add(2, [{ id: 'dog', hanzi: '狗', jyutping: 'gau2', english: 'dog' }]);
Words.add(4, [{ id: 'bird', hanzi: '雀', jyutping: 'zoek3', english: 'bird' }]);
const dog = Words.get('dog');
ok('a word knows the unit that teaches it', dog.taught === 2 && dog.hanzi === '狗', JSON.stringify(dog));
ok('Words.get copies', (dog.legs = 4) && !('legs' in Words.get('dog')));
ok('a word\'s files are in words/', Canto.audioSrc(dog) === '../words/audio/dog.mp3' && Canto.imgSrc(dog) === '../words/img/dog.svg', Canto.audioSrc(dog));
ok('Words.list takes space-separated ids', Words.list(' dog  bird ').map(w => w.id).join() === 'dog,bird');
ok('an unknown word throws', throws(() => Words.get('cow')) && throws(() => Words.list('dog cow')));
ok('a word added twice throws', throws(() => Words.add(5, [{ id: 'dog' }])));
ok('WORDS has each unit\'s words', sb.WORDS.unit2.length === 1 && sb.WORDS.unit4[0].id === 'bird');
const v4 = Units.add(4, { voice: 'x', animals: [{ ...Words.get('dog'), legs: 4 }, Words.get('bird')] });
const dog4 = Units.word(4, 'dog');
ok('borrowing a unit\'s dictionary word keeps words/ and what the unit added', !('unit' in dog4) && dog4.legs === 4
  && Canto.audioSrc(dog4) === '../words/audio/dog.mp3', JSON.stringify(dog4));
ok('a unit teaches its own words, not earlier ones', Units.teaches(v4, v4.animals[1]) && !Units.teaches(v4, v4.animals[0]));
ok('a unit teaches its own phrases, not borrowed ones', Units.teaches(sb.UNITS[3], sb.UNITS[3].words[0]) && !Units.teaches(v4, cat));
ok('homeOf: words for a dictionary word, the unit for a borrowed one, else here',
  homeOf(dog4, 'unit9') === 'words' && homeOf(cat, 'unit9') === 'unit3' && homeOf({ id: 'x' }, 'unit9') === 'unit9');
ok('own: a dictionary word only in words', own(dog4, 'words') && !own(dog4, 'unit4') && own({ id: 'x' }, 'unit4'));
ok('loadVocab("words") is the dictionary, with its voice', typeof loadVocab('words')?.voice === 'string');

const byId = Units.byId({ voice: 'x', words: [{ id: 'a' }, { id: 'b' }], more: [{ id: 'c' }] });
ok('byId has every entry of every list', Object.keys(byId).join() === 'a,b,c', Object.keys(byId).join());
ok('byId of one list', Object.keys(Units.byId([{ id: 'x' }, { id: 'y' }])).join() === 'x,y');
ok('byId gives the entries themselves', Units.byId(sb.UNITS[3]).cat === sb.UNITS[3].words[0]);

const v7 = loadVocab('unit7');
const mGoi = entries(v7).find(e => e.id === 'm-goi');
ok('loadVocab resolves unit 7 borrowing 唔該, with its files where it is taught', mGoi && ['unit2', 'words'].includes(homeOf(mGoi, 'unit7')), homeOf(mGoi ?? {}, 'unit7'));
const v5 = loadVocab('unit5');
const go = v5.measures.find(m => m.id === 'go');
ok('unit 5 borrows 個 from unit 4', go && ['unit4', 'words'].includes(homeOf(go, 'unit5')), homeOf(go ?? {}, 'unit5'));
const measureIds = new Set(v5.measures.map(m => m.id));
const stray = v5.things.filter(t => !measureIds.has(t.measure)).map(t => t.id);
ok('every unit 5 thing has a unit 5 measure word', !stray.length, stray.join(' '));
const fish = v5.things.find(t => t.id === 'fish');
ok('a borrowed thing keeps its files and gains a measure', fish && !own(fish, 'unit5') && fish.measure === 'tiu', JSON.stringify(fish));

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
Units.add(4, { words: [{ ...cat, legs: 4 }] });
const again = Units.word(4, 'cat');
ok('borrowing a borrowed word keeps its home unit', again.unit === 3 && again.legs === 4 && Canto.imgSrc(again) === '../unit3/img/cat.svg', JSON.stringify(again));
ok('unit 6 borrows unit 5 things with a price', apple && !own(apple, 'unit6') && apple.price > 0 && apple.measure === 'go', JSON.stringify(apple));
const oneFish = v6.ones.find(o => o.id === 'one-fish');
ok('unit 6 borrows 一條魚 from unit 5, where it was made', oneFish && homeOf(oneFish, 'unit6') === 'unit5', homeOf(oneFish ?? {}, 'unit6'));
const allPrices = new Map([...v6.cash, ...v6.prices].map(p => [p.n, p]));
const priceless = v6.things.filter(t => !allPrices.has(t.price)).map(t => t.id);
ok('every unit 6 thing\'s price has an entry', !priceless.length, priceless.join(' '));
ok('unit 6 coins have pictures', v6.cash.every(c => c.img !== false && c.cash));

// Unit 7's orders (Build & Say) are built from borrowed words: [唔該] 我要 +
// number + measure + dish, the number said as Canto.number says it before
// a measure (兩籠, never 二籠), with 二 as a wrong tile where 兩 is right.
vm.runInContext(readFileSync(join(ROOT, 'shared/numbers.js'), 'utf8'), sb);
const byId7 = Object.fromEntries(entries(v7).map(e => [e.id, e]));
const orders = entries(v7).filter(e => e.step);
const COUNT = { one: 1, two: 2, three: 3, four: 4, five: 5 };
const wrongOrders = orders.filter(o => {
  const n = COUNT[/like (\w+) order/.exec(o.english)?.[1]];
  const [measure, dish] = o.words.slice(-2).map(id => byId7[id]);
  const please = o.step === 'please';
  return o.words.map(id => byId7[id].hanzi).join('') !== `${please ? '唔該' : ''}我要${Canto.number(n, { measure }).hanzi}${dish.hanzi}`
    || (n === 2) !== o.decoys.includes('n2') || please !== o.english.startsWith('Excuse me!');
}).map(o => o.id);
ok('unit 7 orders say their number the way Canto.number does', orders.length === 3 * v7.items.length && !wrongOrders.length,
  `${orders.length} orders; wrong: ${wrongOrders.join(' ')}`);

// Every game says unit 1's 好叻呀！ after a perfect level (CHEER in game.js):
// written out there, so its clip's path must be the word's.
const cheerSource = /const CHEER = (\{[^}]*\});/.exec(readFileSync(join(ROOT, 'shared/game.js'), 'utf8'))?.[1];
const CHEER = cheerSource && vm.runInContext(`(${cheerSource})`, sb);
const cheerUnit = CHEER?.taught ?? CHEER?.unit;
const cheered = CHEER && entries(loadVocab(`unit${cheerUnit}`)).find(e => e.id === CHEER.id);
const cheeredSrc = cheered && Canto.audioSrc(cheered.taught ? cheered : { ...cheered, unit: cheerUnit });
ok('game.js\'s CHEER is its word, with the same hanzi and clip', cheered?.hanzi === CHEER?.hanzi && Canto.audioSrc(CHEER) === cheeredSrc,
  `${Canto.audioSrc(CHEER ?? {})} vs ${cheeredSrc}`);
process.exit(fail ? 1 : 0);
