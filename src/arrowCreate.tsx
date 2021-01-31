import { createRef, h, render } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import observer from './observer/observer';
import { IArrow, IArrowProps } from './interfaces/IArrow'
import arrowVector from './arrowVector';
import { createAnchorWithPoint } from './anchor';
import { headTransformCSS, HeadWithPoint, HEAD } from './head';

export const Arrow = ({
  className, head, from, to, forwardRef,
}: IArrowProps): JSX.Element => {
  const [arrow, setArrow] = useState(() => arrowVector(createAnchorWithPoint(from), createAnchorWithPoint(to), head));

  useEffect(() => {
    const update = () => {
      const nextArrow = arrowVector(createAnchorWithPoint(from), createAnchorWithPoint(to), head);
      setArrow(nextArrow);
    };

    const watcher = observer(from, to, update);
    return watcher.clear
  }, [from, head, to]);

  const renderHead = (head: HeadWithPoint) => {
    if (!head.node) return null

    const props = {
      className: `${className}__head`,
      transform: headTransformCSS(head),
    }

    if (typeof head.node === 'string') {
      return <g key={head.id} {...props} dangerouslySetInnerHTML={{__html: head.node }} />
    }

    const htmlNode = (head.node as HTMLElement)
    if (htmlNode.tagName) return <g {...props} dangerouslySetInnerHTML={{__html: htmlNode.outerHTML }} />
    return <g key={head.id} {...props}>{head.node}</g>;
  }

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
      ref={forwardRef}
    >
      <path className={`${className}__path`} d={arrow.pathCommands} />
      {arrow.heads.map(renderHead)}
    </svg>
  );
};

const arrowCreate = ({
  className = 'arrow', head = HEAD.THIN, from, to,
}: IArrowProps): IArrow => {
  const arrowRef = createRef<SVGSVGElement>()
  const node = document.createDocumentFragment();

  render(
    <Arrow
      className={className}
      head={head}
      from={from}
      to={to}
      forwardRef={arrowRef}
    />,
    node,
  );

  const clear = () => {
    const arrow = arrowRef.current
    const { parentNode } = arrow;

    if (parentNode) parentNode.removeChild(arrow);
  };

  return {
    node,
    clear,
  };
};

export default arrowCreate;
