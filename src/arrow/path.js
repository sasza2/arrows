import { pointToArray, pointBezier } from './point';
import { createHead, headBezierAngle, headBezierXY } from './head';

export const pointSubstract = (point, subtrahend) => ({
  ...point,
  x: point.x - subtrahend.x,
  y: point.y - subtrahend.y,
});

export const pointAbsolute = (point, offset, head) => pointSubstract(
  {
    ...point,
    x: point.x - offset.x,
    y: point.y - offset.y,
  },
  {
    x: -head.width * 2,
    y: -head.height * 2,
  },
);

const startPosition = (from, to) => ({
  x: Math.min(from.x, to.x),
  y: Math.min(from.y, to.y),
});

export const pathListSVG = (points) => {
  const list = ['M'];

  list.push(pointToArray(points[0]));
  list.push('C');
  list.push(pointToArray(points[1]));
  list.push(',');
  list.push(pointToArray(points[2]));
  list.push(',');
  list.push(pointToArray(points[3]));

  return list.flat().join(' ').replace(/ ,/g, ',');
};

const pathViewportFromAndTo = ({ from, to, pathXYPosition }) => ({
  width: Math.max(from.x, to.x) - pathXYPosition.x - window.scrollX,
  height: Math.max(from.y, to.y) - pathXYPosition.y - window.scrollY,
});

const pathReducer = (points, reducer) => points.reduce((prev, curr) => {
  if (!prev) return curr;
  return reducer(prev, curr);
});

const pathSubstractStartPosition = (points, head) => {
  const min = pathReducer(points, (prev, curr) => ({
    x: Math.min(prev.x, curr.x),
    y: Math.min(prev.y, curr.y),
  }));

  return points.map((point) => ({
    ...point,
    x: point.x - min.x + head.width,
    y: point.y - min.y + head.height,
  }));
};

const pathListBezier = ({
  from, to, pathXYPosition, head,
}) => {
  const viewport = pathViewportFromAndTo({ from, to, pathXYPosition });

  const points = [];
  points.push(from);
  points.push(pointBezier(from, viewport));
  points.push(pointBezier(to, viewport));
  points.push(to);

  return pathSubstractStartPosition(points, head);
};

const windowScroll = () => {
  if (!window) return { scrollX: 0, scrollY: 0 };
  return {
    x: window.scrollX,
    y: window.scrollY,
  };
};

const pathOffset = (points, pathXYPosition, head) => {
  const minPoint = (prop) => Math.min(
    points[0][prop] - head.width,
    points[3][prop] - head.height,
  );

  const scroll = windowScroll();

  return {
    x: pathXYPosition.x - minPoint('x') - head.width + scroll.x,
    y: pathXYPosition.y - minPoint('y') - head.height + scroll.y,
  };
};

const path = (from, to, headParam) => {
  const head = createHead(headParam);

  const pathXYPosition = startPosition(from, to);
  const points = pathListBezier({
    from: pointAbsolute(from, pathXYPosition, head),
    to: pointAbsolute(to, pathXYPosition, head),
    pathXYPosition,
    head,
  });

  const size = pathReducer(points, (prev, curr) => ({
    x: Math.max(prev.x, curr.x),
    y: Math.max(prev.y, curr.y),
  }));

  const headBezier = {
    ...headBezierAngle(head, points),
    ...headBezierXY(head, points),
  };

  return {
    offset: pathOffset(points, pathXYPosition, head),
    size: {
      width: size.x + head.width * 2,
      height: size.y + head.height * 2,
    },
    points: pathListSVG(points),
    head: {
      ...head,
      ...headBezier,
    },
  };
};

export default path;
