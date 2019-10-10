import Element from './jsx/element';
import ends from './arrow/ends';
import path from './arrow/path';

const arrowCreate = ({ className = 'arrow', from, to }) => {
  const arrow = path(ends(from), ends(to));

  const node = (
    <svg className={className} style={{
      top: arrow.offset.y, left: arrow.offset.x, position: 'absolute',
    }} width={arrow.size.x} height={arrow.size.y}>
      <path className={`${className}__path`} d={arrow.points} />
      <svg
        className={`${className}__head`}
        x={arrow.head.x - 10}
        y={arrow.head.y - 10}
        width="20"
        height="20"
        transform={`rotate(${(arrow.head.degree)}, ${arrow.head.x}, ${arrow.head.y})`}
      >
        <line x1="0" y1="0" x2="10" y2="10" />
        <line x1="10" y1="10" x2="0" y2="20" />
      </svg>
    </svg>
  );

  return node;
};

if (window) window.arrowCreate = arrowCreate;

export default arrowCreate;
