import { AnchorWithPoint } from './anchor'
import { pointSubtraction, Point } from './point';
import { Size } from './size'

export type Container = {
  position: Point;
  relativeFrom: AnchorWithPoint;
  relativeTo: AnchorWithPoint;
  size: Size;
}

const relativePositionOfAnchor = (
  point: AnchorWithPoint,
  containerPosition: Point,
  padding: Size,
): AnchorWithPoint => pointSubtraction(
  {
    ...point,
    x: point.x - containerPosition.x,
    y: point.y - containerPosition.y,
  },
  {
    x: -padding.width * 2,
    y: -padding.height * 2,
  },
);

const containerSize = (relativeFrom: Point, relativeTo: Point): Size => ({
  width: Math.max(relativeFrom.x, relativeTo.x),
  height: Math.max(relativeFrom.y, relativeTo.y),
});


export const produceContainer = (
  from: AnchorWithPoint,
  to: AnchorWithPoint,
  padding: Size,
): Container => {
  const position: Point = {
    x: Math.min(from.x, to.x),
    y: Math.min(from.y, to.y),
  };

  const relativeFrom = relativePositionOfAnchor(from, position, padding)
  const relativeTo = relativePositionOfAnchor(to, position, padding)
  const size = containerSize(relativeFrom, relativeTo);

  return {
    position,
    relativeFrom,
    relativeTo,
    size,
  }
};
