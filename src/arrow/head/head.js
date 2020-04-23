import TYPES from './types';

const PRECISION = 1000.0;

const round = (value) => Math.round(value * PRECISION) / PRECISION;

export const headBezierAngle = (t, points) => {
  const angle = (prop) => ((1 - t) ** 2) * (points[1][prop] - points[0][prop])
    + 2 * t * (1 - t) * (points[2][prop] - points[1][prop])
    + t * t * (points[3][prop] - points[2][prop]);

  const dx = angle('x');
  const dy = angle('y');

  const radius = round(-Math.atan2(dx, dy) + 0.5 * Math.PI);
  const degree = round(radius * (180 / Math.PI));

  return {
    degree,
    radius,
  };
};

export const headBezierXY = (t, points) => {
  const position = (prop) => ((1 - t) ** 3) * points[0][prop]
    + 3 * t * ((1 - t) ** 2) * points[1][prop]
    + 3 * t * t * (1 - t) * points[2][prop]
    + t * t * t * points[3][prop];

  return {
    x: position('x'),
    y: position('y'),
  };
};

const headToFunction = (head) => {
  if (!head) return { func: TYPES.STANDARD };
  if (typeof head === 'string') return headToFunction(TYPES[head]);
  if (typeof head === 'object') {
    if (typeof head.func === 'function') return head;
    if (typeof head.func === 'string') {
      return {
        ...head,
        ...headToFunction(head.func),
      };
    }
  }
  if (typeof head === 'function') return { func: head };

  throw new Error('head param should be object like head: { func: "standard" } or head: "standard"');
};

export const createHead = (head) => {
  const headFunction = headToFunction(head);
  return headFunction.func(headFunction);
};
