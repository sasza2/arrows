import { h } from 'preact';

import { HeadGenerated } from '../head'

const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

const image = ({ src, width, height }: { src: string, width: number, height: number }): HeadGenerated => {
  if (!src || !width || !height) throw new Error('image requires src, height, width');

  const node = document.createElementNS(SVG_NS, 'image');
  node.setAttributeNS(null, 'width', String(width));
  node.setAttributeNS(null, 'height', String(height));
  node.setAttributeNS(null, 'x', String(-width));
  node.setAttributeNS(null, 'y', String(-height / 2));
  node.setAttributeNS(XLINK_NS, 'xlink:href', src);

  return {
    node,
    width,
    height,
  };
};

export default image;
