import nodeValue from './helpers/nodeValue';
import { getScrollPoint } from './helpers/window';
import { DIRECTION, TRANSLATION_DEFAULT } from './consts';
import { Point, PointArray } from './point'
import { Size } from './size'

export type Anchor = {
  node: HTMLElement | (() => HTMLElement);
  direction?: string;
  translation?: PointArray;
};

export type AnchorWithPoint = Anchor & Point;

const getAnchorPoint = (anchor: Anchor): Point => {
  const node: HTMLElement = nodeValue(anchor.node);
  if (!node) throw new Error("point is null, check if 'from'/'to' exists");

  const rect: Point & Size = node.getBoundingClientRect();
  const x = rect.x || (rect as DOMRect).left;
  const y = rect.y || (rect as DOMRect).top;

  switch (anchor.direction) {
    case DIRECTION.TOP_LEFT:
      return { x, y };
    case DIRECTION.TOP:
      return {
        x: x + rect.width / 2,
        y: y,
      };
    case DIRECTION.TOP_RIGHT:
      return {
        x: x + rect.width,
        y: y,
      };
    case DIRECTION.RIGHT:
      return {
        x: x + rect.width,
        y: y + rect.height / 2,
      };
    case DIRECTION.BOTTOM_LEFT:
      return {
        x,
        y: y + rect.height,
      };
    case DIRECTION.BOTTOM:
      return {
        x: x + rect.width / 2,
        y: y + rect.height,
      };
    case DIRECTION.BOTTOM_RIGHT:
      return {
        x: x + rect.width,
        y: y + rect.height,
      };
    case DIRECTION.LEFT:
      return {
        x,
        y: y + rect.height / 2,
      };
    default:
      return {
        x: x + rect.width / 2,
        y: y + rect.height / 2,
      }
  }
};

const castToAnchor = (anchorParam: Anchor | HTMLElement | (() => HTMLElement)) => {
  if (typeof anchorParam === 'function' || anchorParam instanceof HTMLElement) return {
    node: anchorParam,
  }

  return anchorParam
}

export const createAnchorWithPoint = (
  anchorParam: Anchor | HTMLElement | (() => HTMLElement)
): AnchorWithPoint => {
  const anchor = castToAnchor(anchorParam)

  const position: Point = getAnchorPoint(anchor);
  const scroll = getScrollPoint();

  position.x += scroll.x;
  position.y += scroll.y;

  return {
    ...anchor,
    ...position,
  };
};

export const autoAnchorWithPoint = (pointA: AnchorWithPoint, pointB: AnchorWithPoint): AnchorWithPoint => {
  if (pointA.translation && pointA.direction) return pointA

  const autoAnchor: AnchorWithPoint = {...pointA};

  const setDirectionWhenEmpty = (direction: string) => {
    if (!autoAnchor.direction) autoAnchor.direction = direction;
  }

  const setTranslationWhenEmpty = (translation: [number, number]) => {
    if (!autoAnchor.translation) autoAnchor.translation = translation;
  }

  const setParamsWhenEmpty = (direction: string, translation: [number, number]) => {
    setDirectionWhenEmpty(direction);
    setTranslationWhenEmpty(translation);
  }

  const xDiff = Math.abs(pointA.x - pointB.x);
  const yDiff = Math.abs(pointA.y - pointB.y);

  if (xDiff > yDiff) {
    if (pointA.x < pointB.x) setParamsWhenEmpty(DIRECTION.RIGHT, [TRANSLATION_DEFAULT, 0])
    else setParamsWhenEmpty(DIRECTION.LEFT, [-TRANSLATION_DEFAULT, 0])
  } else {
    if (pointA.y < pointB.y) setParamsWhenEmpty(DIRECTION.BOTTOM, [0, TRANSLATION_DEFAULT])
    else setParamsWhenEmpty(DIRECTION.TOP, [0, -TRANSLATION_DEFAULT])
  }

  return createAnchorWithPoint(autoAnchor)
}
