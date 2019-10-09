import Element from './jsx/element';
import ends from './arrow/ends';
import path from './arrow/path';
import { DIRECTION } from './consts';

const arrowCreate = ({ from, to }) => {
  const arrow = path(ends(from), ends(to));

  const node = (
    <svg style={{
      top: arrow.offset.y, left: arrow.offset.x, fill: '#123456', position: 'absolute',
    }} width={arrow.size.x} height={arrow.size.y}>
      <path d={arrow.points} stroke="black" fill="transparent"/>
      <svg
        x={arrow.head.x - 10}
        y={arrow.head.y - 10}
        width="20"
        height="20"
        transform={`rotate(${(arrow.head.degree)}, ${arrow.head.x}, ${arrow.head.y})`}
      >
        <line x1="0" y1="0" x2="10" y2="10" style={{ stroke: 'rgb(0,0,0)', 'stroke-width': '1px' }} />
        <line x1="10" y1="10" x2="0" y2="20" style={{ stroke: 'rgb(0,0,0)', 'stroke-width': '1px' }} />
      </svg>
    </svg>
  );

  document.body.appendChild(node);
};

window.addEventListener('load', () => {
  arrowCreate({
    from: {
      direction: DIRECTION.TOP,
      node: document.getElementById('a'),
      translation: [-0.5, -1],
    },
    to: {
      direction: DIRECTION.TOP,
      node: document.getElementById('b'),
      translation: [0.9, 1],
    },
  });
});
