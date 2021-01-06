import nodeValue from './helpers/nodeValue';
import { getScrollPoint } from './helpers/window';
import { DIRECTION } from './consts';
import { Point, PointArray } from './point'
import { Size } from './size'

export type Anchor = {
  node: HTMLElement | (() => HTMLElement);
  direction: string;
  translation: PointArray;
};

export type AnchorWithPoint = Anchor & Point;

const getAnchorPoint = (anchor: Anchor): Point => {
  const node: HTMLElement = nodeValue(anchor.node);
  if (!node) throw new Error("point is null, check if 'from'/'to' exists");

  const rect: Point & Size = node.getBoundingClientRect();
  const x = rect.x || (rect as DOMRect).left;
  const y = rect.y || (rect as DOMRect).top;

  switch (anchor.direction) {
    case DIRECTION.TOP_LEFT:
      return { x, y };
    case DIRECTION.TOP:
      return {
        x: x + rect.width / 2,
        y: y,
      };
    case DIRECTION.TOP_RIGHT:
      return {
        x: x + rect.width,
        y: y,
      };
    case DIRECTION.RIGHT:
      return {
        x: x + rect.width,
        y: y + rect.height / 2,
      };
    case DIRECTION.BOTTOM_LEFT:
      return {
        x,
        y: y + rect.height,
      };
    case DIRECTION.BOTTOM:
      return {
        x: x + rect.width / 2,
        y: y + rect.height,
      };
    case DIRECTION.BOTTOM_RIGHT:
      return {
        x: x + rect.width,
        y: y + rect.height,
      };
    case DIRECTION.LEFT:
      return {
        x,
        y: y + rect.height / 2,
      };
    default:
      throw new Error(`unexpected type ${anchor.direction}`);
  }
};

export const createAnchorWithPoint = (anchor: Anchor): AnchorWithPoint => {
  const position: Point = getAnchorPoint(anchor);
  const scroll = getScrollPoint();

  position.x += scroll.x;
  position.y += scroll.y;

  return {
    ...anchor,
    ...position,
  };
};
