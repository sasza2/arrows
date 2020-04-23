
import Element from 'jsx/element';

const inv = ({ size = 10 }) => ({
  node: <path d={`M${-size} 0 L${size} ${-size} L${size} ${size} Z`} />,
  width: size,
  height: size,
});

export default inv;
