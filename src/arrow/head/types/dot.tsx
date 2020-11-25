import { h } from 'preact';

import { HEAD_DEFAULT_SIZE } from 'consts';

const dot = ({ size = HEAD_DEFAULT_SIZE }) => ({
  node: (
    <g transform={`translate(-${size}, 0)`}>
      <circle cx={0} cy={0} r={size} />
    </g>
  ),
  width: size,
  height: size,
});

export default dot;
