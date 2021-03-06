import { AnchorWithPoint } from './anchor'
import { Size } from './size'

export type Point = {
  x: number,
  y: number,
}

export type PointArray = [number, number]

export const pointToArray = (point: Point): PointArray => ([
  point.x,
  point.y,
]);

export const pointBezier = (point: AnchorWithPoint, containerVisibleSize: Size): Point => ({
  x: point.x + containerVisibleSize.width * point.translation[0],
  y: point.y + containerVisibleSize.height * point.translation[1],
});

export const pointSubtraction = (point: AnchorWithPoint, subtrahend: Point): AnchorWithPoint => ({
  ...point,
  x: point.x - subtrahend.x,
  y: point.y - subtrahend.y,
});
