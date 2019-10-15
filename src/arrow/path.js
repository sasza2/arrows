import flatten from 'lodash/flatten';

import { ARROW_HEAD_SIZE } from '../consts';
import { pointToArray, pointBezier } from './point';
import { headBezierAngle, headBezierXY } from './head';

export const pointSubstract = (point, subtrahend) => ({
  ...point,
  x: point.x - subtrahend,
  y: point.y - subtrahend,
});

export const pointAbsolute = (point, offset) => pointSubstract(
  {
    ...point,
    x: point.x - offset.x,
    y: point.y - offset.y,
  },
  -ARROW_HEAD_SIZE * 2,
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

  return flatten(list).join(' ').replace(/ ,/g, ',');
};

const pathViewportFromAndTo = ({ from, to, pathXYPosition }) => ({
  width: Math.max(from.x, to.x) - pathXYPosition.x,
  height: Math.max(from.y, to.y) - pathXYPosition.y,
});

const pathReducer = (points, reducer) => points.reduce((prev, curr) => {
  if (!prev) return curr;
  return reducer(prev, curr);
});

const pathSubstractStartPosition = (points) => {
  const min = pathReducer(points, (prev, curr) => ({
    x: Math.min(prev.x, curr.x),
    y: Math.min(prev.y, curr.y),
  }));

  return points.map((point) => ({
    ...point,
    x: point.x - min.x + ARROW_HEAD_SIZE,
    y: point.y - min.y + ARROW_HEAD_SIZE,
  }));
};

const pathListBezier = ({ from, to, pathXYPosition }) => {
  const viewport = pathViewportFromAndTo({ from, to, pathXYPosition });

  const points = [];
  points.push(from);
  points.push(pointBezier(from, viewport));
  points.push(pointBezier(to, viewport));
  points.push(to);

  return pathSubstractStartPosition(points);
};

const windowScroll = () => {
  if (!window) return { scrollX: 0, scrollY: 0 };
  return {
    x: window.scrollX,
    y: window.scrollY,
  };
};

const pathOffset = (points, pathXYPosition) => {
  const minPoint = (prop) => Math.min(
    points[0][prop] - ARROW_HEAD_SIZE,
    points[3][prop] - ARROW_HEAD_SIZE,
  );

  const scroll = windowScroll();

  return {
    x: pathXYPosition.x - minPoint('x') - ARROW_HEAD_SIZE + scroll.x,
    y: pathXYPosition.y - minPoint('y') - ARROW_HEAD_SIZE + scroll.y,
  };
};

const path = (from, to) => {
  const pathXYPosition = startPosition(from, to);
  const points = pathListBezier({
    from: pointAbsolute(from, pathXYPosition),
    to: pointAbsolute(to, pathXYPosition),
    pathXYPosition,
  });

  const size = pathReducer(points, (prev, curr) => ({
    x: Math.max(prev.x, curr.x),
    y: Math.max(prev.y, curr.y),
  }));

  return {
    offset: pathOffset(points, pathXYPosition),
    size: {
      width: size.x + ARROW_HEAD_SIZE * 2,
      height: size.y + ARROW_HEAD_SIZE * 2,
    },
    points: pathListSVG(points),
    head: {
      ...headBezierAngle(1, points),
      ...headBezierXY(1, points),
    },
  };
};

export default path;
