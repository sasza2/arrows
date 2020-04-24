
import Element from 'jsx/element';
import { HEAD_DEFAULT_SIZE } from 'consts';

const normal = ({ size = HEAD_DEFAULT_SIZE }) => ({
  node: <path d={`M${-size} ${-size} L0 0 L${-size} ${size} Z`} />,
  width: size,
  height: size,
});

export default normal;
