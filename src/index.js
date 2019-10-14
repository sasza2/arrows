import Element from './jsx/element';
import ends from './arrow/ends';
import path from './arrow/path';
import observer from './arrow/observer';

const arrowCreate = ({ className = 'arrow', from, to }) => {
  const arrow = path(ends(from), ends(to));

  const arrowRef = Element.createRef();
  const pathRef = Element.createRef();
  const headRef = Element.createRef();

  const node = (
    <svg ref={arrowRef} className={className} style={{
      top: arrow.offset.y, left: arrow.offset.x, position: 'absolute',
    }} width={arrow.size.width} height={arrow.size.height}>
      <path ref={pathRef} className={`${className}__path`} d={arrow.points} />
      <svg
        ref={headRef}
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

  const watcher = observer(from, to);
  watcher.observe(() => {
    const nextArrow = path(ends(from), ends(to));
    arrowRef.current.style.top = `${nextArrow.offset.y}px`;
    arrowRef.current.style.left = `${nextArrow.offset.x}px`;
    arrowRef.current.style.width = `${nextArrow.size.width}px`;
    arrowRef.current.style.height = `${nextArrow.size.height}px`;

    pathRef.current.setAttribute('d', nextArrow.points);

    headRef.current.setAttribute('transform', `rotate(${(nextArrow.head.degree)}, ${nextArrow.head.x}, ${nextArrow.head.y})`);

    headRef.current.setAttribute('x', `${nextArrow.head.x - 10}px`);
    headRef.current.setAttribute('y', `${nextArrow.head.y - 10}px`);
  });

  return node;
};

if (window) window.arrowCreate = arrowCreate;

export default arrowCreate;
