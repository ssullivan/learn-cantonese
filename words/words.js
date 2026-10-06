/*
 * The dictionary: every word on the site, once, grouped by the unit that
 * teaches it. Its audio is words/audio/<id>.mp3 (tools/tts.mjs) and its
 * picture words/img/<id>.svg (from words/art.mjs, tools/draw.mjs).
 *
 *   Words.add(n, [entries])   the words unit n teaches (each gets taught: n)
 *
 * A unit's vocab.js takes the words it uses with Words.get(id) or
 * Words.list('a b c'), adding its own fields, and builds its phrases and
 * sentences from them. Entry fields are in tools/vocab-fields.mjs; an id
 * is unique on the site (when two words would share one, one gets its
 * tone number: 大 daai6). shared/units.js documents Words.
 */
Words.voice = 'zh-HK-HiuMaanNeural';

// Unit 1 · Sounds & Tones 聲調
Words.add(1, [
  // basics
  { id: 'cantonese', hanzi: '廣東話', jyutping: 'gwong2 dung1 waa2', english: 'Cantonese', img: false,
    note: '話 on its own is waa6. In 廣東話 it changes to waa2.' },
  { id: 'jyutping', hanzi: '粵拼', jyutping: 'jyut6 ping3', english: 'Jyutping', img: false,
    note: 'The spelling system used on this site. Every syllable ends in its tone number.' },
  { id: 'tone', hanzi: '聲調', jyutping: 'sing1 diu6', english: 'tone', img: false },
  // sets: the six-tone sets are read by WanLung (a man's voice). The
  // site's voice, HiuMaan, says tones 2 and 5 almost alike (婦 fu5 rises
  // like 苦 fu2) and 3 and 6 close together; a native speaker heard it, and
  // audio-lang-tools measured it. Telling HiuMaan the tones with phonemes
  // doesn't help: it is how the voice speaks. WanLung keeps all six apart
  // best of the Azure voices.
  { id: 'si1', hanzi: '詩', jyutping: 'si1', english: 'poem', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si2', hanzi: '史', jyutping: 'si2', english: 'history', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si3', hanzi: '試', jyutping: 'si3', english: 'to try', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si4', hanzi: '時', jyutping: 'si4', english: 'time', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si5', hanzi: '市', jyutping: 'si5', english: 'market', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'si6', hanzi: '事', jyutping: 'si6', english: 'matter, thing', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu1', hanzi: '夫', jyutping: 'fu1', english: 'husband', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu2', hanzi: '苦', jyutping: 'fu2', english: 'bitter', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu3', hanzi: '富', jyutping: 'fu3', english: 'rich', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu4', hanzi: '扶', jyutping: 'fu4', english: 'to help up', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu5', hanzi: '婦', jyutping: 'fu5', english: 'woman', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fu6', hanzi: '父', jyutping: 'fu6', english: 'father', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan1', hanzi: '分', jyutping: 'fan1', english: 'to share out', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan2', hanzi: '粉', jyutping: 'fan2', english: 'powder, rice noodles', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan3', hanzi: '瞓', jyutping: 'fan3', english: 'to sleep', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan4', hanzi: '墳', jyutping: 'fan4', english: 'grave', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan5', hanzi: '憤', jyutping: 'fan5', english: 'anger', img: false, voice: 'zh-HK-WanLungNeural' },
  { id: 'fan6', hanzi: '份', jyutping: 'fan6', english: 'portion, share', img: false, voice: 'zh-HK-WanLungNeural' },
  // spelling
  { id: 'fish', hanzi: '魚', jyutping: 'jyu4', english: 'fish',
    note: 'j sounds like English "y". yu is "ee" said with rounded lips, like German ü.' },
  { id: 'cow', hanzi: '牛', jyutping: 'ngau4', english: 'cow',
    note: 'ng can start a syllable: the sound at the end of "sing", moved to the front.' },
  { id: 'ng', hanzi: '吳', jyutping: 'ng4', english: 'Ng (a family name)', img: false,
    note: 'ng can even be a whole syllable, hummed through the nose.' },
  { id: 'congee', hanzi: '粥', jyutping: 'zuk1', english: 'congee (rice porridge)',
    note: 'z is like "dz" with no puff of air. A final k is stopped, not said out loud.' },
  { id: 'car', hanzi: '車', jyutping: 'ce1', english: 'car',
    note: 'c is like "ts" or "ch" with a puff of air.' },
  { id: 'water', hanzi: '水', jyutping: 'seoi2', english: 'water',
    note: 'eoi starts like "er" with rounded lips and slides to "ee".' },
  { id: 'hong-kong', hanzi: '香港', jyutping: 'hoeng1 gong2', english: 'Hong Kong', img: false,
    note: 'oe is like the "ur" in "fur" with rounded lips.' },
  { id: 'chicken', hanzi: '雞', jyutping: 'gai1', english: 'chicken',
    note: 'A single a is short, like the "u" in "but".' },
  { id: 'street', hanzi: '街', jyutping: 'gaai1', english: 'street', img: false,
    note: 'aa is long, like "ah". 雞 gai1 and 街 gaai1 differ only in vowel length.' },
  // praise
  { id: 'hou-lek', hanzi: '好叻呀！', jyutping: 'hou2 lek1 aa3', english: 'Well done! (literally "so clever!")', img: false,
    note: '叻 lek1 means clever or good at something. You\'ll hear this in the games when you get a whole level right.' },
]);

// Unit 2 · Greetings 打招呼
Words.add(2, [
  // greetings
  { id: 'hello', hanzi: '你好', jyutping: 'nei5 hou2', english: 'hello', img: false,
    note: 'Polite, a little formal. Friends often just say "hi" or "hello" in English.' },
  { id: 'good-morning', hanzi: '早晨', jyutping: 'zou2 san4', english: 'good morning',
    note: 'Used until about noon. There is no everyday "good afternoon".' },
  { id: 'good-night', hanzi: '早唞', jyutping: 'zou2 tau2', english: 'good night',
    note: 'Only when someone is going to sleep, never as "good evening".' },
  { id: 'bye', hanzi: '拜拜', jyutping: 'baai1 baai3', english: 'bye-bye',
    note: 'From English "bye-bye". What most people say.' },
  { id: 'goodbye', hanzi: '再見', jyutping: 'zoi3 gin3', english: 'goodbye', img: false,
    note: 'Literally "see again". More formal than 拜拜.' },
  // howAreYou
  { id: 'how-are-you', hanzi: '你好嗎？', jyutping: 'nei5 hou2 maa3', english: 'how are you?', img: false,
    note: 'The textbook question. Correct, but it sounds stiff.' },
  { id: 'how-lately', hanzi: '最近點呀？', jyutping: 'zeoi3 gan6 dim2 aa3', english: 'how have you been?', img: false,
    note: 'What people really say. 點 means "how", and 呀 makes it friendly.' },
  { id: 'pretty-good', hanzi: '幾好', jyutping: 'gei2 hou2', english: 'pretty good', img: false },
  { id: 'so-so', hanzi: '麻麻哋', jyutping: 'maa4 maa2 dei2', english: 'so-so', img: false },
  { id: 'long-time', hanzi: '好耐冇見', jyutping: 'hou2 noi6 mou5 gin3', english: 'long time no see', img: false },
  { id: 'eaten-yet', hanzi: '食咗飯未呀？', jyutping: 'sik6 zo2 faan6 mei6 aa3', english: 'have you eaten yet?', img: false,
    note: 'A friendly greeting, not an invitation. Just answer and chat on.' },
  { id: 'eaten', hanzi: '食咗喇', jyutping: 'sik6 zo2 laa3', english: 'I have eaten', img: false },
  // polite
  { id: 'm-goi', hanzi: '唔該', jyutping: 'm4 goi1', english: 'thank you (for a service); excuse me',
    note: 'For a service or a favour, and to get someone\'s attention.' },
  { id: 'm-goi-saai', hanzi: '唔該晒', jyutping: 'm4 goi1 saai3', english: 'thanks a lot', img: false,
    note: '晒 means "all": thanks for everything you did.' },
  { id: 'thanks', hanzi: '多謝', jyutping: 'do1 ze6', english: 'thank you (for a gift)',
    note: 'For a gift or a compliment.' },
  { id: 'no-need', hanzi: '唔使', jyutping: 'm4 sai2', english: 'no need; you\'re welcome', img: false,
    note: 'The answer to 唔該: "no need to thank me".' },
  { id: 'welcome', hanzi: '唔使客氣', jyutping: 'm4 sai2 haak3 hei3', english: 'you\'re welcome', img: false,
    note: 'The answer to 多謝: "no need to be polite".' },
  { id: 'sorry', hanzi: '對唔住', jyutping: 'deoi3 m4 zyu6', english: 'sorry',
    note: 'A real apology, when you did something wrong.' },
  { id: 'excuse-me', hanzi: '唔好意思', jyutping: 'm4 hou2 ji3 si3', english: 'excuse me; sorry (small)', img: false,
    note: 'For small things: a bump, being late, asking a stranger.' },
  { id: 'never-mind', hanzi: '唔緊要', jyutping: 'm4 gan2 jiu3', english: 'never mind; it\'s OK', img: false },
  { id: 'no-problem', hanzi: '冇問題', jyutping: 'mou5 man6 tai4', english: 'no problem', img: false },
]);

// Unit 3 · Me & You 我同你
Words.add(3, [
  // people
  { id: 'ngo', hanzi: '我', jyutping: 'ngo5', english: 'I; me' },
  { id: 'nei', hanzi: '你', jyutping: 'nei5', english: 'you' },
  { id: 'keoi', hanzi: '佢', jyutping: 'keoi5', english: 'he; she; it',
    note: 'One word for he, she and it.' },
  { id: 'ngo-dei', hanzi: '我哋', jyutping: 'ngo5 dei6', english: 'we; us',
    note: 'Add 哋 to make any of the three plural.' },
  { id: 'nei-dei', hanzi: '你哋', jyutping: 'nei5 dei6', english: 'you (more than one)' },
  { id: 'keoi-dei', hanzi: '佢哋', jyutping: 'keoi5 dei6', english: 'they; them' },
  // words
  { id: 'hai', hanzi: '係', jyutping: 'hai6', english: 'am; is; are', img: false,
    note: 'Links two nouns: 我係學生, I am a student. Never before an adjective.' },
  { id: 'm', hanzi: '唔', jyutping: 'm4', english: 'not', img: false,
    note: 'Goes right before the verb: 唔係, 唔識.' },
  { id: 'giu', hanzi: '叫', jyutping: 'giu3', english: 'to be called', img: false },
  { id: 'meng', hanzi: '名', jyutping: 'meng2', english: 'name', img: false, phoneme: true,
    note: 'meng4 in writing, but meng2 when you ask a name.' },
  { id: 'sik', hanzi: '識', jyutping: 'sik1', english: 'to know how to; can', img: false,
    note: 'For skills you have learned, like a language.' },
  { id: 'gong', hanzi: '講', jyutping: 'gong2', english: 'to speak; to say', img: false },
  { id: 'dou', hanzi: '都', jyutping: 'dou1', english: 'also; too', img: false,
    note: 'Goes before the verb: 我都係, me too.' },
  { id: 'aa-ming', hanzi: '阿明', jyutping: 'aa3 ming4', english: 'Ah Ming (a name)', img: false,
    note: '阿 before one syllable of a name is friendly, like a nickname.' },
  // things
  { id: 'lou-si', hanzi: '老師', jyutping: 'lou5 si1', english: 'teacher' },
  { id: 'hok-saang', hanzi: '學生', jyutping: 'hok6 saang1', english: 'student' },
  { id: 'pang-jau', hanzi: '朋友', jyutping: 'pang4 jau5', english: 'friend' },
  { id: 'hoeng-gong-jan', hanzi: '香港人', jyutping: 'hoeng1 gong2 jan4', english: 'Hongkonger',
    note: '人 after a place makes a person from there.' },
  { id: 'jing-gwok-jan', hanzi: '英國人', jyutping: 'jing1 gwok3 jan4', english: 'British person', img: false },
  { id: 'mei-gwok-jan', hanzi: '美國人', jyutping: 'mei5 gwok3 jan4', english: 'American', img: false },
  { id: 'jing-man', hanzi: '英文', jyutping: 'jing1 man2', english: 'English', img: false, phoneme: true },
  // asking
  { id: 'bin-go', hanzi: '邊個', jyutping: 'bin1 go3', english: 'who', img: false },
  { id: 'mat-je', hanzi: '乜嘢', jyutping: 'mat1 je5', english: 'what', img: false },
  { id: 'maa', hanzi: '嗎', jyutping: 'maa3', english: '(turns a sentence into a yes/no question)', img: false, phoneme: true,
    note: 'Add it to the end of a sentence. Never with 邊個, 乜嘢 or A唔A.' },
  { id: 'aa', hanzi: '呀', jyutping: 'aa3', english: '(softens a question or an answer)', img: false, phoneme: true,
    note: 'Questions without it can sound blunt.' },
  { id: 'ne', hanzi: '呢', jyutping: 'ne1', english: 'and ...? (what about)', img: false, phoneme: true,
    note: 'After a person: 你呢？, and you?' },
  { id: 'siu-siu', hanzi: '少少', jyutping: 'siu2 siu2', english: 'a little', img: false },
  { id: 'hai-mai', hanzi: '係咪', jyutping: 'hai6 mai6', english: 'is it? (short for 係唔係)', img: false,
    note: 'Fast speech squeezes 係唔係 into 係咪. You will hear it everywhere.' },
]);

// Unit 4 · Numbers 數字
Words.add(4, [
  // words
  { id: 'baak', hanzi: '百', jyutping: 'baak3', english: 'hundred', img: false },
  { id: 'cin', hanzi: '千', jyutping: 'cin1', english: 'thousand', img: false },
  { id: 'maan', hanzi: '萬', jyutping: 'maan6', english: 'ten thousand', img: false,
    note: 'Big numbers are counted in 萬s: 100,000 is 十萬, "ten ten-thousands".' },
  { id: 'loeng', hanzi: '兩', jyutping: 'loeng5', english: 'two (of something)', img: false,
    note: 'Before a measure word (兩個) and at the start of 兩百, 兩千, 兩萬.' },
  { id: 'go', hanzi: '個', jyutping: 'go3', english: 'the everyday measure word', img: false,
    note: 'A number needs a measure word before a noun: 三個人, three people. Unit 5 has many more.' },
  { id: 'dai', hanzi: '第', jyutping: 'dai6', english: '-th (makes an ordinal)', img: false,
    note: '第 + number: 第一 first, 第二 second.' },
  { id: 'gei-do', hanzi: '幾多', jyutping: 'gei2 do1', english: 'how many; how much', img: false,
    note: 'Ask 幾多？ for any number. 幾多錢？ asks a price (unit 6).' },
  { id: 'gei-do-go', hanzi: '幾多個？', jyutping: 'gei2 do1 go3', english: 'how many (of them)?', img: false },
]);

// Unit 5 · Measure Words 量詞
Words.add(5, [
  // measures
  { id: 'zek', hanzi: '隻', jyutping: 'zek3', english: 'for animals', img: false,
    note: 'Almost every animal: 一隻貓, 一隻狗. Also one of a pair, like one shoe.' },
  { id: 'bun', hanzi: '本', jyutping: 'bun2', english: 'for books', img: false,
    note: 'Anything bound like a book: books, notebooks, magazines.' },
  { id: 'zoeng', hanzi: '張', jyutping: 'zoeng1', english: 'for flat things', img: false,
    note: 'Things with a flat surface: paper, photos, tickets, and tables, chairs and beds.' },
  { id: 'tiu', hanzi: '條', jyutping: 'tiu4', english: 'for long, thin things', img: false,
    note: 'Long and bendy: fish, snakes, roads, trousers, rivers.' },
  { id: 'zi', hanzi: '枝', jyutping: 'zi1', english: 'for sticks', img: false,
    note: 'Long and stiff: pens, flowers, bottles.' },
  { id: 'gaa', hanzi: '架', jyutping: 'gaa3', english: 'for vehicles and machines', img: false,
    note: 'Cars, planes, bikes, and machines like cameras.' },
  { id: 'gin', hanzi: '件', jyutping: 'gin6', english: 'for tops and pieces', img: false,
    note: 'Clothes for the top half (a shirt, a jacket) and pieces, like a slice of cake.' },
  { id: 'bui', hanzi: '杯', jyutping: 'bui1', english: 'a cup of', dish: 'cup', img: false,
    note: 'A container can be a measure word: 一杯茶, a cup of tea.' },
  { id: 'wun', hanzi: '碗', jyutping: 'wun2', english: 'a bowl of', dish: 'bowl', img: false,
    note: 'For what comes in a bowl: 一碗飯, a bowl of rice.' },
  { id: 'deoi', hanzi: '對', jyutping: 'deoi3', english: 'a pair of', img: false,
    note: 'Things that come in twos: shoes, socks, chopsticks.' },
  // things
  { id: 'apple', hanzi: '蘋果', jyutping: 'ping4 gwo2', english: 'apple', measure: 'go', counted: ['an apple', 'apples'] },
  { id: 'ball', hanzi: '波', jyutping: 'bo1', english: 'ball', measure: 'go',
    note: 'From the English "ball".' },
  { id: 'cat', hanzi: '貓', jyutping: 'maau1', english: 'cat', measure: 'zek' },
  { id: 'dog', hanzi: '狗', jyutping: 'gau2', english: 'dog', measure: 'zek' },
  { id: 'book', hanzi: '書', jyutping: 'syu1', english: 'book', measure: 'bun' },
  { id: 'paper', hanzi: '紙', jyutping: 'zi2', english: 'paper', measure: 'zoeng', counted: ['a sheet of paper', 'sheets of paper'] },
  { id: 'table', hanzi: '枱', jyutping: 'toi2', english: 'table', measure: 'zoeng', phoneme: true,
    note: 'Usually toi2. A table counts as flat.' },
  { id: 'trousers', hanzi: '褲', jyutping: 'fu3', english: 'trousers', measure: 'tiu', counted: ['a pair of trousers', 'pairs of trousers'],
    note: 'One 條, not a pair: long legs make trousers long and thin.' },
  { id: 'pen', hanzi: '筆', jyutping: 'bat1', english: 'pen', measure: 'zi' },
  { id: 'flower', hanzi: '花', jyutping: 'faa1', english: 'flower', measure: 'zi',
    note: 'One flower on its stalk.' },
  { id: 'plane', hanzi: '飛機', jyutping: 'fei1 gei1', english: 'plane', measure: 'gaa',
    note: 'Literally "flying machine".' },
  { id: 'shirt', hanzi: '衫', jyutping: 'saam1', english: 'shirt', measure: 'gin',
    note: '衫 is any top: shirt, T-shirt, jumper.' },
  { id: 'cake', hanzi: '蛋糕', jyutping: 'daan6 gou1', english: 'cake', measure: 'gin', counted: ['a piece of cake', 'pieces of cake'],
    note: 'Literally "egg cake". A slice is 一件.' },
  { id: 'tea', hanzi: '茶', jyutping: 'caa4', english: 'tea', measure: 'bui', counted: ['a cup of tea', 'cups of tea'] },
  { id: 'rice', hanzi: '飯', jyutping: 'faan6', english: 'rice', measure: 'wun', counted: ['a bowl of rice', 'bowls of rice'],
    note: 'Cooked rice, and a meal in general: 食飯, to eat.' },
  { id: 'noodles', hanzi: '麵', jyutping: 'min6', english: 'noodles', measure: 'wun', counted: ['a bowl of noodles', 'bowls of noodles'] },
  { id: 'shoes', hanzi: '鞋', jyutping: 'haai4', english: 'shoes', measure: 'deoi', counted: ['a pair of shoes', 'pairs of shoes'] },
  { id: 'chopsticks', hanzi: '筷子', jyutping: 'faai3 zi2', english: 'chopsticks', measure: 'deoi', counted: ['a pair of chopsticks', 'pairs of chopsticks'] },
  // words
  { id: 'di', hanzi: '啲', jyutping: 'di1', english: 'some; the (more than one)', img: false,
    note: 'The measure word for more than one, or an amount: 啲書, the books. No number before it.' },
  { id: 'ni', hanzi: '呢', jyutping: 'ni1', english: 'this', img: false, phoneme: true,
    note: 'Before a measure word: 呢隻貓, this cat. Not the ne1 of 你呢？' },
  { id: 'go2', hanzi: '嗰', jyutping: 'go2', english: 'that', img: false,
    note: 'Before a measure word: 嗰本書, that book.' },
  { id: 'jau', hanzi: '有', jyutping: 'jau5', english: 'to have; there is', img: false },
]);

// Unit 6 · Money & Shopping 買嘢
Words.add(6, [
  // money
  { id: 'cin2', hanzi: '錢', jyutping: 'cin2', english: 'money', img: false, phoneme: true,
    note: 'cin4 in writing; everyday speech says cin2, as in 幾多錢.' },
  { id: 'man', hanzi: '蚊', jyutping: 'man1', english: 'dollar', img: false,
    note: 'The spoken word for a dollar. Price tags write $ or 元.' },
  { id: 'hou4', hanzi: '毫', jyutping: 'hou4', english: 'ten cents', img: false,
    note: 'Also 毫子. 五毫 is 50 cents; Hong Kong has no smaller coin.' },
  { id: 'bun3', hanzi: '半', jyutping: 'bun3', english: 'half', img: false,
    note: 'After 蚊 it means 50 cents: 三蚊半, $3.50.' },
  { id: 'zaau', hanzi: '找', jyutping: 'zaau2', english: 'to give change', img: false },
  // words
  { id: 'maai5', hanzi: '買', jyutping: 'maai5', english: 'to buy', img: false,
    note: 'Low rising tone 5. 買嘢 is "to go shopping".' },
  { id: 'maai6', hanzi: '賣', jyutping: 'maai6', english: 'to sell', img: false,
    note: 'Low level tone 6: only the tone tells buy and sell apart.' },
  { id: 'jiu', hanzi: '要', jyutping: 'jiu3', english: 'to want; I\'ll take', img: false,
    note: '我要 is how you ask for something in a shop. 唔要, "don\'t want".' },
  { id: 'peng', hanzi: '平', jyutping: 'peng4', english: 'cheap', img: false, phoneme: true,
    note: 'peng4 in speech; ping4 in words like 和平 (peace).' },
  { id: 'gwai', hanzi: '貴', jyutping: 'gwai3', english: 'expensive', img: false },
  { id: 'hou', hanzi: '好', jyutping: 'hou2', english: 'very; good', img: false,
    note: 'Before an adjective: 好貴, very expensive. An adjective needs no 係.' },
  { id: 'dak', hanzi: '得', jyutping: 'dak1', english: 'OK; can do', img: false,
    note: '得唔得？ asks "is that OK?". Answer 得 (yes) or 唔得 (no).' },
  // things
  { id: 'orange', hanzi: '橙', jyutping: 'caang2', english: 'orange', measure: 'go', counted: ['an orange', 'oranges'] },
  { id: 'egg', hanzi: '雞蛋', jyutping: 'gai1 daan2', english: 'egg', measure: 'zek', counted: ['an egg', 'eggs'], phoneme: true,
    note: '蛋 is daan6, but 雞蛋 changes to daan2. Eggs take 隻.' },
  { id: 'watermelon', hanzi: '西瓜', jyutping: 'sai1 gwaa1', english: 'watermelon', measure: 'go',
    note: 'Literally "western melon".' },
  { id: 'bread', hanzi: '麵包', jyutping: 'min6 baau1', english: 'bread roll', measure: 'go',
    note: '麵包 is any bread; a roll or bun takes 個.' },
]);
