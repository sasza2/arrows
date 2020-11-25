import { DIRECTION } from 'consts';
import nodeValue from 'helpers/nodeValue';
import { Point, PointArray } from './point'
import windowScroll from './windowScroll';

export type Anchor = {
  node: HTMLDocument | (() => HTMLDocument);
  direction: string;
  translation: PointArray;
};

export type AnchorWithPoint = Anchor & Point;

const positionXY = (anchor: Anchor): Point => {
  const endNodePoint = nodeValue(anchor.node);
  if (!endNodePoint) throw new Error("point is null, check if 'from'/'to' exists");

  const rect = nodeValue(anchor.node).getBoundingClientRect();
  switch (anchor.direction) {
    case DIRECTION.TOP_LEFT:
      return {
        x: rect.x,
        y: rect.y,
      };
    case DIRECTION.TOP:
      return {
        x: rect.x + rect.width / 2,
        y: rect.y,
      };
    case DIRECTION.TOP_RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y,
      };
    case DIRECTION.RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y + rect.height / 2,
      };
    case DIRECTION.BOTTOM_LEFT:
      return {
        x: rect.x,
        y: rect.y + rect.height,
      };
    case DIRECTION.BOTTOM:
      return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height,
      };
    case DIRECTION.BOTTOM_RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y + rect.height,
      };
    case DIRECTION.LEFT:
      return {
        x: rect.x,
        y: rect.y + rect.height / 2,
      };
    default:
      throw new Error('unexpected type');
  }
};

const anchorToXY = (anchor: Anchor): AnchorWithPoint => {
  const position: Point = positionXY(anchor);

  const scroll = windowScroll();
  position.y += scroll.y;
  position.x += scroll.x;

  return {
    ...anchor,
    ...position,
  };
};

export default anchorToXY;
