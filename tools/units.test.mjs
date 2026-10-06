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

const byId = Units.byId({ voice: 'x', words: [{ id: 'a' }, { id: 'b' }], more: [{ id: 'c' }] });
ok('byId has every entry of every list', Object.keys(byId).join() === 'a,b,c', Object.keys(byId).join());
ok('byId of one list', Object.keys(Units.byId([{ id: 'x' }, { id: 'y' }])).join() === 'x,y');
ok('byId gives the entries themselves', Units.byId(sb.UNITS[3]).cat === sb.UNITS[3].words[0]);

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
Units.add(4, { words: [{ ...cat, legs: 4 }] });
const again = Units.word(4, 'cat');
ok('borrowing a borrowed word keeps its home unit', again.unit === 3 && again.legs === 4 && Canto.imgSrc(again) === '../unit3/img/cat.svg', JSON.stringify(again));
const kitty = Units.word(4, 'cat', 'kitty');
ok('borrowing under another id keeps its files', kitty.id === 'kitty' && kitty.file === 'cat' && kitty.unit === 3
  && Canto.audioSrc(kitty) === '../unit3/audio/cat.mp3' && Canto.imgSrc(kitty) === '../unit3/img/cat.svg', JSON.stringify(kitty));
Units.add(5, { words: [kitty] });
const kitty2 = Units.word(5, 'kitty', 'puss');
ok('borrowing it again under a third id still finds the first file', kitty2.file === 'cat' && Canto.audioSrc(kitty2) === '../unit3/audio/cat.mp3', JSON.stringify(kitty2));
ok('unit 6 borrows unit 5 things with a price', apple?.unit === 5 && apple.price > 0 && apple.measure === 'go', JSON.stringify(apple));
const oneFish = v6.ones.find(o => o.id === 'one-fish');
ok('unit 6 borrows 一條魚 from unit 5, where it was made', oneFish?.unit === 5, JSON.stringify(oneFish?.unit));
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

// Every game says unit 1's 好叻呀！ after a perfect level (CHEER in game.js).
const cheer = /const CHEER = \{ id: '([^']+)', unit: (\d+), hanzi: '([^']+)' \}/.exec(readFileSync(join(ROOT, 'shared/game.js'), 'utf8'));
const cheered = cheer && entries(loadVocab(`unit${cheer[2]}`)).find(e => e.id === cheer[1] && !e.unit);
ok('game.js\'s CHEER is a word in its unit, with the same hanzi', cheered?.hanzi === cheer?.[3], JSON.stringify(cheer?.slice(1)));
process.exit(fail ? 1 : 0);
