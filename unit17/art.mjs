/*
 * Unit 17 illustrations: a face for 唔開心. The feelings are words, drawn
 * in words/art.mjs. Run `node tools/draw.mjs` after editing to rewrite
 * img/<id>.svg.
 */
import { svg, face } from '../tools/svg.mjs';

const art = {
  'm-hoi-sam': svg('An unhappy face', face({ mouth: 'frown', brows: 'worried' })),
};
export default art;
