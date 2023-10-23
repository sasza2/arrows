import { h } from 'preact';

import { HEAD_DEFAULT_SIZE } from '../../consts'
import { Head } from '../head'

const diamond = ({ size = HEAD_DEFAULT_SIZE }: { size: number }): Head => ({
  node: (
    <g transform={`translate(-${size}, 0)`}>
      <path d={`M${-size} 0 L0 ${-size} L${size} 0 L0 ${size} Z`} />
    </g>
  ),
  width: size,
  height: size,
});

export default diamond;
