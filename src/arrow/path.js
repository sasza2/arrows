import flatten from 'lodash/flatten';

import { pointToArray, pointBezier } from './point';
import { headBezierAngle, headBezierXY } from './head';

export const pointAbsolute = (point, offset) => ({
  ...point,
  x: point.x - offset.x + 10,
  y: point.y - offset.y + 10,
});

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
    x: point.x - min.x,
    y: point.y - min.y,
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

const path = (from, to) => {
  const offset = startPosition(from, to);
  const points = pathListBezier(pointAbsolute(from, offset), pointAbsolute(to, offset));

  return {
    offset: {
      x: offset.x - Math.min(points[0].x - 10, points[3].x - 10) - 10,
      y: offset.y - Math.min(points[0].y - 10, points[3].y - 10) - 10,
    },
    size: pathReducer(points, (prev, curr) => ({
      x: Math.max(prev.x, curr.x) + 20,
      y: Math.max(prev.y, curr.y) + 20,
    })),
    points: pathListSVG(points),
    head: {
      ...headBezierAngle(1, points),
      ...headBezierXY(1, points),
    },
  };
};

export default path;
