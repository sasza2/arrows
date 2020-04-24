import TYPES from './types';

const PRECISION = 1000.0;

const round = (value) => Math.round(value * PRECISION) / PRECISION;

export const headBezierAngle = (head, points) => {
  const t = head.distance;
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

export const headBezierXY = (head, points) => {
  const t = head.distance;
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
  if (!head) return { func: TYPES.THIN };
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

  return { ...head, func: TYPES.THIN };
};

export const createHead = (head) => {
  const headFunction = headToFunction(head);
  const headWithNode = {
    ...head,
    ...headFunction.func(headFunction),
  };

  if (!headWithNode.node === undefined || !headWithNode.width || !headWithNode.height) {
    throw new Error('head function should return { node, width, height }');
  }
  if (!headWithNode.distance) headWithNode.distance = 1;
  return headWithNode;
};

export const headTransformCSS = (head) => (
  `rotate(${(head.degree)}, ${head.x}, ${head.y}), translate(${head.x}, ${head.y})`
);
