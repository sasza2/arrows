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

const pathViewportFromAndTo = ({ from, to }) => ({
  width: Math.max(from.x, to.x),
  height: Math.max(from.y, to.y),
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
  from, to, head,
}) => {
  const viewport = pathViewportFromAndTo({ from, to });

  const points = [];
  points.push(from);
  points.push(pointBezier(from, viewport));
  points.push(pointBezier(to, viewport));
  points.push(to);

  return pathSubstractStartPosition(points, head);
};

const pathOffset = (points, pathXYPosition, head) => {
  const minPoint = (prop) => Math.min(
    points[0][prop] - head.width,
    points[3][prop] - head.height,
  );

  return {
    x: pathXYPosition.x - minPoint('x') - head.width,
    y: pathXYPosition.y - minPoint('y') - head.height,
  };
};

const path = (from, to, headParam) => {
  const head = createHead(headParam);

  const pathXYPosition = startPosition(from, to);

  const points = pathListBezier({
    from: pointAbsolute(from, pathXYPosition, head),
    to: pointAbsolute(to, pathXYPosition, head),
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

  const offset = pathOffset(points, pathXYPosition, head);

  const getPointXY = (distance = 1) => {
    const angle = headBezierAngle({ distance }, points);
    const position = headBezierXY({ distance }, points);

    return {
      ...angle,
      x: position.x + offset.x,
      y: position.y + offset.y,
    };
  };

  return {
    offset,
    size: {
      width: size.x + head.width * 2,
      height: size.y + head.height * 2,
    },
    points: pathListSVG(points),
    head: {
      ...head,
      ...headBezier,
    },
    getPointXY,
  };
};

export default path;
