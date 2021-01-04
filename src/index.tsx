import { assignArrowCreate } from './helpers/window'
import arrowCreate from './arrowCreate'

assignArrowCreate(window);

export default arrowCreate;
export { Anchor } from './anchor';
export { DIRECTION } from './consts';
export { HEAD, Head, HeadFactory } from './head';
export * from './interfaces/IArrow';
