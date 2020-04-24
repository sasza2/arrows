import Element from 'jsx/element';
import { HEAD_DEFAULT_SIZE } from 'consts';

const diamond = ({ size = HEAD_DEFAULT_SIZE }) => ({
  node: (
    <g transform={`translate(-${size}, 0)`}>
      <path d={`M${-size} 0 L0 ${-size} L${size} 0 L0 ${size} Z`} />
    </g>
  ),
  width: size,
  height: size,
});

export default diamond;
