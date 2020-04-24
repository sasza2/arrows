
import Element from 'jsx/element';
import { HEAD_DEFAULT_SIZE } from 'consts';

const vee = ({ size = HEAD_DEFAULT_SIZE }) => ({
  node: (
    <g transform={`translate(-${size}, 0)`}>
      <path d={`M${-size} ${-size} L${size} 0 L${-size} ${size} L0 0 Z`} />
    </g>
  ),
  width: size,
  height: size,
});

export default vee;
