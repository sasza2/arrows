import { HeadFunc } from '../head'
import diamond from './diamond';
import dot from './dot';
import image from './image';
import inv from './inv';
import normal from './normal';
import none from './none';
import thin from './thin';
import vee from './vee';

type HeadTypes = {
  [type: string]: HeadFunc;
}

const TYPES: HeadTypes = {
  diamond,
  DIAMOND: diamond,
  dot,
  DOT: dot,
  image,
  IMAGE: image,
  none,
  NONE: none,
  inv,
  INV: inv,
  normal,
  NORMAL: normal,
  thin,
  THIN: thin,
  vee,
  VEE: vee,
};

export default TYPES;
