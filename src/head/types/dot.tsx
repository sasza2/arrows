import { h } from 'preact';

import { HEAD_DEFAULT_SIZE } from '../../consts';
import { Head } from '../head'

const dot = ({ size = HEAD_DEFAULT_SIZE }: { size: number }): Head => ({
  node: (
    <g transform={`translate(-${size}, 0)`}>
      <circle cx={0} cy={0} r={size} />
    </g>
  ),
  width: size,
  height: size,
});

export default dot;
