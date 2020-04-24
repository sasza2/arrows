import Element from './jsx/element';
import { headTransformCSS } from './arrow/head';
import ends from './arrow/ends';
import path from './arrow/path';
import observer from './observer/observer';

const arrowCreate = ({
  className = 'arrow', head, from, to,
}) => {
  const arrow = path(ends(from), ends(to), head);

  const arrowRef = Element.createRef();
  const pathRef = Element.createRef();
  const headRef = Element.createRef();

  const node = (
    <svg
      className={className}
      ref={arrowRef}
      style={{
        top: arrow.offset.y,
        left: arrow.offset.x,
        position: 'absolute',
      }}
      width={arrow.size.width}
      height={arrow.size.height}
    >
      <path ref={pathRef} className={`${className}__path`} d={arrow.points} />
      <g
        ref={headRef}
        className={`${className}__head`}
        transform={headTransformCSS(arrow.head)}
      >
        {arrow.head.node}
      </g>
    </svg>
  );

  const watcher = observer(from, to);
  watcher.observe(() => {
    const nextArrow = path(ends(from), ends(to), head);

    arrowRef.current.style.top = `${nextArrow.offset.y}px`;
    arrowRef.current.style.left = `${nextArrow.offset.x}px`;
    arrowRef.current.style.width = `${nextArrow.size.width}px`;
    arrowRef.current.style.height = `${nextArrow.size.height}px`;

    pathRef.current.setAttribute('d', nextArrow.points);

    headRef.current.setAttribute('transform', headTransformCSS(nextArrow.head));
    if (typeof nextArrow.head.node === 'string') {
      headRef.current.innerHTML = nextArrow.head.node;
    } else {
      headRef.current.removeChild(headRef.current.firstChild);
      headRef.current.appendChild(nextArrow.head.node);
    }
  });

  return {
    node,
    timer: watcher.timer,
    clear: watcher.clear,
  };
};

if (window) window.arrowCreate = arrowCreate;

export default arrowCreate;
export { DIRECTION } from './consts';
export { default as TYPES } from './arrow/head/types';
