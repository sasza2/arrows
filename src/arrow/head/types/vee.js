
import Element from 'jsx/element';

const vee = ({ size = 10 }) => ({
  node: <path d={`M${-size} ${-size} L${size} 0 L${-size} ${size} L0 0 Z`} />,
  width: size,
  height: size,
});

export default vee;
