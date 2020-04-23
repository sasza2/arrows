import Element from 'jsx/element';

const diamond = ({ size = 10 }) => ({
  node: <path d={`M${-size} 0 L0 ${-size} L${size} 0 L0 ${size} Z`} />,
  width: size,
  height: size,
});

export default diamond;
