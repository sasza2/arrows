import { h } from 'preact';

import { HEAD_DEFAULT_SIZE } from 'consts';
import { Head } from '../head'

const normal = ({ size = HEAD_DEFAULT_SIZE }: { size: number }): Head => ({
  node: <path d={`M${-size} ${-size} L0 0 L${-size} ${size} Z`} />,
  width: size,
  height: size,
});

export default normal;
