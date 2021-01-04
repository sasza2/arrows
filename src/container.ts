import { AnchorWithPoint } from './anchor'
import { pointSubtraction, Point } from './point';
import { Head } from './head';
import { Size } from './size'

export type Container = {
  position: Point;
  relativeFrom: AnchorWithPoint;
  relativeTo: AnchorWithPoint;
  size: Size;
}

const relativePositionOfPointInContainer = (
  point: AnchorWithPoint,
  containerPosition: Point,
  head: Head,
): AnchorWithPoint => pointSubtraction(
  {
    ...point,
    x: point.x - containerPosition.x,
    y: point.y - containerPosition.y,
  },
  {
    x: -head.width * 2,
    y: -head.height * 2,
  },
);

const containerSize = (relativeFrom: Point, relativeTo: Point): Size => ({
  width: Math.max(relativeFrom.x, relativeTo.x),
  height: Math.max(relativeFrom.y, relativeTo.y),
});


export const produceContainer = (
  from: AnchorWithPoint,
  to: AnchorWithPoint,
  headWithNode: Head,
): Container => {
  const position: Point = {
    x: Math.min(from.x, to.x),
    y: Math.min(from.y, to.y),
  };

  const relativeFrom = relativePositionOfPointInContainer(from, position, headWithNode)
  const relativeTo = relativePositionOfPointInContainer(to, position, headWithNode)
  const size = containerSize(relativeFrom, relativeTo);

  return {
    position,
    relativeFrom,
    relativeTo,
    size,
  }
};
