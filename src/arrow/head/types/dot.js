import Element from 'jsx/element';

const dot = ({ size = 10 }) => ({
  node: <circle cx={0} cy={0} r={size} />,
  width: size,
  height: size,
});

export default dot;
