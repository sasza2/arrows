import { h } from 'preact';

import { HEAD_DEFAULT_SIZE } from '../../consts';
import { Head } from '../head'

const vee = ({ size = HEAD_DEFAULT_SIZE }: { size: number }): Head => ({
  node: (
    <g transform={`translate(-${size}, 0)`}>
      <path d={`M${-size} ${-size} L${size} 0 L${-size} ${size} L0 0 Z`} />
    </g>
  ),
  width: size,
  height: size,
});

export default vee;
