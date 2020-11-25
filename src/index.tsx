import { h, render } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { headTransformCSS } from './arrow/head';
import anchorToXY, { Anchor } from './arrow/anchor';
import path from './arrow/path';
import observer from './observer/observer';

type ArrowHeadProps = {

}

type ArrowProps = {
  className: string,
  head: ArrowHeadProps,
  from: Anchor,
  to: Anchor,
  onChange():void,
};

const Arrow = ({
  className = 'arrow', head, from, to, onChange,
}: ArrowProps) => {
  const [arrow, setArrow] = useState(() => path(anchorToXY(from), anchorToXY(to), head));

  useEffect(() => {
    const update = () => {
      const nextArrow = path(anchorToXY(from), anchorToXY(to), head);
      setArrow(nextArrow);

      if (onChange) onChange(); // TODO: pass nextArrow
    };

    const watcher = observer(from, to);
    watcher.observe(update);

    return watcher.clear;
  }, []);

  return (
    <svg
      className={className}
      style={{
        top: arrow.offset.y,
        left: arrow.offset.x,
        position: 'absolute',
      }}
      width={arrow.size.width}
      height={arrow.size.height}
    >
      <path className={`${className}__path`} d={arrow.points} />
      <g
        className={`${className}__head`}
        transform={headTransformCSS(arrow.head)}
      >
        {arrow.head.node}
      </g>
    </svg>
  );
};

const arrowCreate = ({
  className = 'arrow', head, from, to, onChange,
}: ArrowProps) => {
  const node = document.createDocumentFragment();

  render(
    <Arrow
      className={className}
      head={head}
      from={from}
      to={to}
      onChange={onChange}
    />,
    node,
  );

  const clear = () => {
    render(null, document.body, node);

    const { parentNode } = node;
    if (parentNode) parentNode.removeChild(node);
  };

  return {
    node,
    clear,
  };
};

if (window) (window as any).arrowCreate = arrowCreate; // TODO ?

export default arrowCreate;
export { DIRECTION } from './consts';
export { default as HEAD } from './arrow/head/types';
