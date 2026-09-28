/*
 * Unit 1 illustrations: one entry per vocab entry with a picture.
 * Run `node tools/draw.mjs` after editing to rewrite img/<id>.svg.
 */
import { svg, bowl, cup } from '../tools/svg.mjs';

export default {
  fish: svg('Fish', `<path d="M96 64 L122 40 L118 64 L122 88 Z" fill="#e8773a" stroke="#b5521f" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="60" cy="64" rx="44" ry="26" fill="#f39a4a" stroke="#b5521f" stroke-width="2.5"/>
<path d="M50 40 Q64 26 80 42" fill="#e8773a" stroke="#b5521f" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M58 72 Q66 84 76 76" fill="#e8773a" stroke="#b5521f" stroke-width="2"/>
<path d="M38 44 Q30 64 38 84" fill="none" stroke="#b5521f" stroke-width="2.5"/>
<path d="M54 56 q6 -4 12 0 M64 50 q6 -4 12 0 M64 62 q6 -4 12 0 M74 56 q6 -4 12 0" fill="none" stroke="#fbc98c" stroke-width="2" stroke-linecap="round"/>
<circle cx="28" cy="58" r="5" fill="#ffffff"/><circle cx="27" cy="58" r="2.8" fill="#2a211b"/>
<path d="M17 70 q4 3 8 0" fill="none" stroke="#b5521f" stroke-width="2" stroke-linecap="round"/>`),

  cow: svg('Cow', `<path d="M36 34 C26 28 22 18 26 12 C30 20 38 24 44 26 Z" fill="#efe2c8" stroke="#8a7a66" stroke-width="2" stroke-linejoin="round"/>
<path d="M92 34 C102 28 106 18 102 12 C98 20 90 24 84 26 Z" fill="#efe2c8" stroke="#8a7a66" stroke-width="2" stroke-linejoin="round"/>
<ellipse cx="22" cy="48" rx="16" ry="8" transform="rotate(-20 22 48)" fill="#ffffff" stroke="#3a2f28" stroke-width="2.5"/>
<ellipse cx="106" cy="48" rx="16" ry="8" transform="rotate(20 106 48)" fill="#ffffff" stroke="#3a2f28" stroke-width="2.5"/>
<path d="M36 30 C36 20 92 20 92 30 L96 80 C96 92 32 92 32 80 Z" fill="#ffffff" stroke="#3a2f28" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M40 28 C50 24 58 30 56 40 C54 50 42 50 38 44 Z" fill="#3a2f28"/>
<path d="M92 50 C84 48 80 56 84 62 C88 66 94 62 94 58 Z" fill="#3a2f28"/>
<circle cx="50" cy="56" r="4" fill="#2a211b"/><circle cx="78" cy="56" r="4" fill="#2a211b"/>
<ellipse cx="64" cy="90" rx="30" ry="20" fill="#f2b3b0" stroke="#3a2f28" stroke-width="2.5"/>
<ellipse cx="54" cy="90" rx="4" ry="6" fill="#b86b67"/><ellipse cx="74" cy="90" rx="4" ry="6" fill="#b86b67"/>`),

  congee: svg('Congee (rice porridge)', bowl(`<ellipse cx="64" cy="61" rx="44" ry="9" fill="#f3ecdc"/>
<ellipse cx="52" cy="59" rx="14" ry="3" fill="#ffffff" opacity=".8"/>
<path d="M60 58 h6 M74 62 h6 M44 63 h6 M84 57 h5 M68 65 h5" stroke="#5c9e46" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="80" cy="60" rx="6" ry="3" fill="#e8b04c"/>
<path d="M92 60 L118 22" stroke="#2e5a88" stroke-width="6" stroke-linecap="round"/>
<path d="M92 60 L118 22" stroke="#fbf8f1" stroke-width="3" stroke-linecap="round"/>`)),

  car: svg('Car', `<ellipse cx="64" cy="104" rx="52" ry="5" fill="#9fb0bb" opacity=".35"/>
<path d="M12 92 V72 C12 66 16 62 24 62 L36 60 L48 42 C50 40 52 38 56 38 H86 C90 38 92 40 94 42 L106 60 C114 62 118 66 118 72 V92 Z" fill="#d6453a" stroke="#8f2a22" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M44 60 L54 44 H68 V60 Z M74 44 H86 L98 60 H74 Z" fill="#bfe0f2" stroke="#8f2a22" stroke-width="2" stroke-linejoin="round"/>
<path d="M14 74 H22 M108 72 H116" stroke="#f7d35c" stroke-width="5" stroke-linecap="round"/>
<path d="M60 72 h8" stroke="#8f2a22" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="36" cy="92" r="13" fill="#2a211b"/><circle cx="36" cy="92" r="5" fill="#c8ced3"/>
<circle cx="94" cy="92" r="13" fill="#2a211b"/><circle cx="94" cy="92" r="5" fill="#c8ced3"/>`),

  water: svg('A glass of water', `${cup('#8cc8ea', { glass: true })}
<circle cx="72" cy="80" r="3" fill="#ffffff" opacity=".7"/><circle cx="78" cy="64" r="2" fill="#ffffff" opacity=".7"/>`),

  chicken: svg('Chicken', `<path d="M44 104 V116 M40 116 H50 M70 104 V116 M66 116 H76" stroke="#e8923a" stroke-width="3.5" stroke-linecap="round"/>
<path d="M100 38 C112 44 116 60 108 74 C116 66 122 52 114 40 C110 34 104 34 100 38 Z" fill="#d6453a"/>
<path d="M30 42 C18 44 14 60 20 76 C28 98 52 108 74 104 C96 100 110 86 108 66 C106 54 100 48 94 50 C84 54 72 62 56 58 C50 56 48 44 42 40 Z" fill="#fbf8f1" stroke="#8a7a66" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M58 72 C66 86 84 88 94 76 C86 80 72 78 64 68 Z" fill="#efe2c8" stroke="#8a7a66" stroke-width="2" stroke-linejoin="round"/>
<path d="M26 30 C26 22 32 18 36 22 C38 16 46 16 46 24 C50 22 54 28 48 34 C44 38 30 38 26 30 Z" fill="#d6453a"/>
<path d="M18 46 L6 50 L18 54 Z" fill="#f2a93b" stroke="#c77a1e" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M20 56 C18 64 24 68 28 62 Z" fill="#d6453a"/>
<circle cx="30" cy="46" r="3" fill="#2a211b"/>`),
};
