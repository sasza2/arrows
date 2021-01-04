import { assignArrowCreate } from './helpers/window'
import arrowCreate from './arrowCreate'

assignArrowCreate(window);

export default arrowCreate;
export { Anchor } from './anchor';
export * from './interfaces/IArrow';
export { HEAD, Head, HeadFactory } from './head';
export { DIRECTION } from './consts';
