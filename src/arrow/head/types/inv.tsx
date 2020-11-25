import { h } from 'preact';

import { HEAD_DEFAULT_SIZE } from 'consts';

const inv = ({ size = HEAD_DEFAULT_SIZE }) => ({
  node: <path d={`M${-size} 0 L0 ${-size} L0 ${size} Z`} />,
  width: size,
  height: size,
});

export default inv;
