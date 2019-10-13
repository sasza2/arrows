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

const pathViewportFromAndTo = (from, to) => ({
  width: Math.max(from.x, to.x),
  height: Math.max(from.y, to.y),
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

const pathListBezier = (from, to) => {
  const viewport = pathViewportFromAndTo(from, to);

  const points = [];
  points.push(from);
  points.push(pointBezier(from, viewport));
  points.push(pointBezier(to, viewport));
  points.push(to);

  return pathSubstractStartPosition(points);
};

const pathOffset = (points, pathXYPosition) => {
  const minPoint = (prop) => Math.min(
    points[0][prop] - ARROW_HEAD_SIZE,
    points[3][prop] - ARROW_HEAD_SIZE,
  );

  return {
    x: pathXYPosition.x - minPoint('x') - ARROW_HEAD_SIZE,
    y: pathXYPosition.y - minPoint('y') - ARROW_HEAD_SIZE,
  };
};

const path = (from, to) => {
  const pathXYPosition = startPosition(from, to);
  const points = pathListBezier(
    pointAbsolute(from, pathXYPosition),
    pointAbsolute(to, pathXYPosition),
  );

  const size = pathReducer(points, (prev, curr) => ({
    x: Math.max(prev.x, curr.x),
    y: Math.max(prev.y, curr.y),
  }));

  return {
    offset: pathOffset(points, pathXYPosition),
    size: {
      x: size.x + ARROW_HEAD_SIZE * 2,
      y: size.y + ARROW_HEAD_SIZE * 2,
    },
    points: pathListSVG(points),
    head: {
      ...headBezierAngle(1, points),
      ...headBezierXY(1, points),
    },
  };
};

export default path;
