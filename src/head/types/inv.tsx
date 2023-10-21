import { h } from 'preact';

import { HEAD_DEFAULT_SIZE } from '../../consts';
import { Head } from '../head'

const inv = ({ size = HEAD_DEFAULT_SIZE }: { size: number }): Head => ({
  node: <path d={`M${-size} 0 L0 ${-size} L0 ${size} Z`} />,
  width: size,
  height: size,
});

export default inv;
