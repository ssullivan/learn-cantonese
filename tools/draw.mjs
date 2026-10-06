#!/usr/bin/env node
/*
 * draw.mjs — write unit<N>/img/<id>.svg from unit<N>/art.mjs.
 *
 *   node tools/draw.mjs
 *
 * art.mjs default-exports { id: svgString } built with tools/svg.mjs.
 * Edit art.mjs (or svg.mjs), never the generated .svg files;
 * tools/check.mjs fails if they are out of date. An .svg no longer in
 * art.mjs (a renamed or removed drawing) is deleted.
 */
import { writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, unitDirs, loadArt } from './site.mjs';

let n = 0, gone = 0;
for (const unit of unitDirs()) {
  const art = await loadArt(unit);
  if (!art) continue;
  const dir = join(ROOT, unit, 'img');
  mkdirSync(dir, { recursive: true });
  for (const [id, svg] of Object.entries(art)) {
    writeFileSync(join(dir, `${id}.svg`), svg);
    n++;
  }
  for (const f of readdirSync(dir)) if (f.endsWith('.svg') && !(f.slice(0, -4) in art)) { rmSync(join(dir, f)); gone++; }
}
console.log(`Wrote ${n} SVG file(s).${gone ? ` Deleted ${gone} no longer drawn.` : ''}`);
