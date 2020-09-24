import { DIRECTION } from 'consts';
import nodeValue from 'helpers/nodeValue';
import windowScroll from './windowScroll';

const endXY = (point) => {
  const endNodePoint = nodeValue(point.node);
  if (!endNodePoint) throw new Error("point is null, check if 'from'/'to' exists");

  const rect = nodeValue(point.node).getBoundingClientRect();
  switch (point.direction) {
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

const ends = (point) => {
  const endPosition = endXY(point);

  const scroll = windowScroll();
  endPosition.y += scroll.y;
  endPosition.x += scroll.x;

  return {
    ...point,
    ...endPosition,
  };
};

export default ends;
