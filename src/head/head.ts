import { ComponentChild } from 'preact'

import { Path } from '../path'
import { Point } from '../point'
import { Size } from '../size'
import TYPES from './types';

const PRECISION = 1000.0;

export type Head = {
  id?: number;
  node?: ComponentChild;
  distance?: number;
  height?: number;
  width?: number;
  degree?: number;
  radius?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HeadFunc = (params: any) => Head;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HeadFactory = { func: HeadFactory, [key: string]: any } | HeadFunc | string;

export type HeadFactoryList = HeadFactory[]

export type HeadWithPoint = Head & Point;

const round = (value: number) => Math.round(value * PRECISION) / PRECISION;

const headBezierAngle = (head: Head, points: Point[]): Head => {
  const t = head.distance;
  const angle = (prop: 'x' | 'y') => ((1 - t) ** 2) * (points[1][prop] - points[0][prop])
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

const headBezierPoint = (head: Head, points: Point[]): Point => {
  const t = head.distance;
  const position = (prop: 'x' | 'y') => ((1 - t) ** 3) * points[0][prop]
    + 3 * t * ((1 - t) ** 2) * points[1][prop]
    + 3 * t * t * (1 - t) * points[2][prop]
    + t * t * t * points[3][prop];

  return {
    x: position('x'),
    y: position('y'),
  };
};

const headToFunction = (head: HeadFactory): HeadFunc => {
  if (typeof head === 'string') {
    const type: string = head;
    return TYPES[type];
  }
  if (typeof head === 'object') {
    if (typeof head.func === 'function') return head.func;
    if (typeof head.func === 'string') return headToFunction(head.func);
  }
  if (typeof head === 'function') return head;

  throw new Error('head type is invalid');
};

export const prepareHeadNode = (head: HeadFactory): Head => {
  const produceHead: HeadFunc = headToFunction(head);
  const headWithNode: Head = produceHead(head);

  if (!headWithNode || !headWithNode.width || !headWithNode.height) {
    throw new Error('head function should return { node, width, height }');
  }

  if (typeof head === 'object') Object.assign(headWithNode, head);

  if (!headWithNode.distance) headWithNode.distance = 1;

  return headWithNode;
};

export const prepareHeads = (headFactory: HeadFactory | HeadFactoryList): Head[] => {
  const headFactoryList = Array.isArray(headFactory)
    ? headFactory
    : [headFactory]

  return headFactoryList.map(prepareHeadNode)
}

export const calculateHeadsPadding = (heads: Head[]): Size => (heads as Size[]).reduce((size, current) => {
  const nextSize = { width: size.width, height: size.height };
  if (current.width > nextSize.width) nextSize.width = current.width;
  if (current.height > nextSize.height) nextSize.height = current.height;
  return nextSize;
}, { width: 0, height: 0 })

export const assignPathToHeads = (heads: Head[], path: Path): HeadWithPoint[] => heads.map((head, index) => ({
  id: index,
  ...head,
  ...headBezierAngle(head, path),
  ...headBezierPoint(head, path),
}))

export const headTransformCSS = (head: HeadWithPoint): string => (
  `rotate(${(head.degree)}, ${head.x}, ${head.y}), translate(${head.x}, ${head.y})`
);
