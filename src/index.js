import Element from './jsx/element';
import { headTransformCSS } from './arrow/head';
import ends from './arrow/ends';
import path from './arrow/path';
import observer from './observer/observer';

const arrowCreate = ({
  className = 'arrow', head, from, to, onChange,
}) => {
  const props = {
    className,
    head,
    from,
    to,
    onChange,
  };

  const arrow = path(ends(props.from), ends(props.to), props.head);

  const arrowRef = Element.createRef();
  const pathRef = Element.createRef();
  const headRef = Element.createRef();

  const node = (
    <svg
      className={props.className}
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

  const update = () => {
    const nextArrow = path(ends(props.from), ends(props.to), props.head);

    if (props.onChange) props.onChange(nextArrow);

    arrowRef.current.style.top = `${nextArrow.offset.y}px`;
    arrowRef.current.style.left = `${nextArrow.offset.x}px`;
    arrowRef.current.style.width = `${nextArrow.size.width}px`;
    arrowRef.current.style.height = `${nextArrow.size.height}px`;

    pathRef.current.setAttribute('d', nextArrow.points);

    headRef.current.setAttribute('transform', headTransformCSS(nextArrow.head));
    if (typeof nextArrow.head.node === 'string') {
      headRef.current.innerHTML = nextArrow.head.node;
    } else {
      if (headRef.current.firstChild) {
        headRef.current.removeChild(headRef.current.firstChild);
      }
      headRef.current.appendChild(nextArrow.head.node);
    }
  };

  const watcher = observer(from, to);
  watcher.observe(update);

  const clear = () => {
    watcher.clear();
    const { parentNode } = node;
    if (parentNode) parentNode.removeChild(node);
  };

  const setProps = (nextProps = {}) => {
    if (nextProps.from) {
      watcher.setFrom(nextProps.from);
      props.from = nextProps.from;
    }

    if (nextProps.to) {
      watcher.setFrom(nextProps.to);
      props.to = nextProps.to;
    }

    Object.keys(nextProps).forEach((prop) => {
      props[prop] = nextProps[prop];
    });

    update();
  };

  return {
    node,
    timer: watcher.timer,
    clear,
    update,
    setProps,
  };
};

if (window) window.arrowCreate = arrowCreate;

export default arrowCreate;
export { DIRECTION } from './consts';
export { default as HEAD } from './arrow/head/types';
