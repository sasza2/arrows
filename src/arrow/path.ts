import { AnchorWithPoint } from './anchor'
import { pointToArray, pointBezier, Point, PointArray } from './point';
import { createHead, headBezierAngle, headBezierXY, Head, HeadGenerated } from './head';
import { Size } from './size'

export const pointSubtraction = (point: AnchorWithPoint, subtrahend: Point): AnchorWithPoint => ({
  ...point,
  x: point.x - subtrahend.x,
  y: point.y - subtrahend.y,
});

export const pointXYInContainer = (
  point: AnchorWithPoint,
  containerPosition: Point,
  head: HeadGenerated
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

const containerPosition = (from: Point, to: Point) => ({
  x: Math.min(from.x, to.x),
  y: Math.min(from.y, to.y),
});

export const pathListSVG = (points: Point[]): string => {
  const list: Array<PointArray | string> = ['M'];

  list.push(pointToArray(points[0]));
  list.push('C');
  list.push(pointToArray(points[1]));
  list.push(',');
  list.push(pointToArray(points[2]));
  list.push(',');
  list.push(pointToArray(points[3]));

  return (list as any).flat().join(' ').replace(/ ,/g, ',');
};

const pathViewportFromAndTo = (fromInContainer: Point, toInContainer: Point) => ({
  width: Math.max(fromInContainer.x, toInContainer.x),
  height: Math.max(fromInContainer.y, toInContainer.y),
});

const pathReducer = (points: Point[], reducer: (prev: Point, curr: Point) => Point) => points.reduce((prev, curr) => {
  if (!prev) return curr;
  return reducer(prev, curr);
});

const pathSubstractStartPosition = (points: Point[], head: HeadGenerated) => {
  const min: Point = pathReducer(points, (prev: Point, curr: Point) => ({
    x: Math.min(prev.x, curr.x),
    y: Math.min(prev.y, curr.y),
  }));

  return points.map((point: Point) => ({
    // ...point,
    x: point.x - min.x + head.width,
    y: point.y - min.y + head.height,
  }));
};

const pathListBezier = (
  fromInContainer: AnchorWithPoint,
  toInContainer: AnchorWithPoint,
  head: HeadGenerated,
): Point[] => {
  const containerVisibleSize = pathViewportFromAndTo(fromInContainer, toInContainer);

  const points = [];
  points.push(fromInContainer);
  points.push(pointBezier(fromInContainer, containerVisibleSize));
  points.push(pointBezier(toInContainer, containerVisibleSize));
  points.push(toInContainer);

  return pathSubstractStartPosition(points, head);
};

const pathOffset = (points: Point[], pathXYPosition: Point, head: HeadGenerated) => {
  const minPoint = (prop: 'x' | 'y') => Math.min(
    points[0][prop] - head.width,
    points[3][prop] - head.height,
  );

  return {
    x: pathXYPosition.x - minPoint('x') - head.width,
    y: pathXYPosition.y - minPoint('y') - head.height,
  };
};

const path = (from: AnchorWithPoint, to: AnchorWithPoint, head: Head) => {
  const headWithNode: HeadGenerated = createHead(head);

  const containerXYPosition: Point = containerPosition(from, to);

  const points: Point[] = pathListBezier(
    pointXYInContainer(from, containerXYPosition, headWithNode),
    pointXYInContainer(to, containerXYPosition, headWithNode),
    headWithNode,
  );

  const farthestPoint: Point = pathReducer(points, (prev: Point, curr: Point) => ({
    x: Math.max(prev.x, curr.x),
    y: Math.max(prev.y, curr.y),
  }));

  const headBezier = {
    ...headBezierAngle(headWithNode, points),
    ...headBezierXY(headWithNode, points),
  };

  const offset = pathOffset(points, containerXYPosition, headWithNode);

  return {
    offset,
    size: {
      width: farthestPoint.x + headWithNode.width * 2,
      height: farthestPoint.y + headWithNode.height * 2,
    },
    points: pathListSVG(points),
    head: {
      ...headWithNode,
      ...headBezier,
    },
    /*tails: tails.map((tailParam) => {
      const tail = createHead(tailParam);
      const tailBezier = {
        ...headBezierAngle(tail, points),
        ...headBezierXY(tail, points),
      };

      return {
        ...tail,
        ...tailBezier,
      }
    }),*/
  };
};

export default path;
