import { Container } from './container'
import { pointToArray, pointBezier, Point, PointArray } from './point';
import { Size } from './size';

export type Path = Point[];

// <path d="..." />
export const convertPathToSVG = (path: Path): string => {
  const list: Array<PointArray | string> = ['M'];

  list.push(pointToArray(path[0]));
  list.push('C');
  list.push(pointToArray(path[1]));
  list.push(',');
  list.push(pointToArray(path[2]));
  list.push(',');
  list.push(pointToArray(path[3]));

  return list.flat().join(' ').replace(/ ,/g, ',');
};

export const pathReducer = (path: Path, reducer: (prev: Point, curr: Point) => Point): Point =>
  path.reduce((prev, curr) => reducer(prev, curr)
);

const pathMinusStartPosition = (path: Path, padding: Size) => {
  const min: Point = pathReducer(path, (prev: Point, curr: Point) => ({
    x: Math.min(prev.x, curr.x),
    y: Math.min(prev.y, curr.y),
  }));

  return path.map((point: Point) => ({
    x: point.x - min.x + padding.width,
    y: point.y - min.y + padding.height,
  }));
};

export const pathListBezier = (
  container: Container,
  padding: Size,
): Path => {
  const path = [];
  path.push(container.relativeFrom);
  path.push(pointBezier(container.relativeFrom, container.size));
  path.push(pointBezier(container.relativeTo, container.size));
  path.push(container.relativeTo);

  return pathMinusStartPosition(path, padding);
};
