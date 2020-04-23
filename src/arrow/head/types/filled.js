
import Element from 'jsx/element';

const produceHead = ({ size = 10 }) => ({
  node: <path d={`M${-size} ${-size} L0 0 L${-size} ${size} Z`} />,
  width: size,
  height: size,
});

export default produceHead;
