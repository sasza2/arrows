import { autoAnchorWithPoint, Anchor, createAnchorWithPoint } from './anchor'
import { produceContainer, Container } from './container'
import {
  assignPathToHeads,
  calculateHeadsPadding,
  prepareHeads,
  HeadFactory,
  HeadFactoryList,
  HeadWithPoint,
} from './head';
import { convertPathToSVG, pathListBezier, pathReducer, Path } from './path'
import { Point } from './point';
import { Size } from './size'

export type ArrowVector = {
  pathCommands: string;
  size: Size;
  offset: Point;
  heads: HeadWithPoint[];
};

// <svg style={arrowOffset}, where arrowOffset is { top: x, left: y }
const arrowOffset = (path: Path, container: Container, padding: Size): Point => {
  const minPoint = (prop: 'x' | 'y') => Math.min(
    path[0][prop] - padding.width,
    path[3][prop] - padding.height,
  );

  return {
    x: container.position.x - minPoint('x') - padding.width,
    y: container.position.y - minPoint('y') - padding.height,
  };
};

// <svg width={width} height={height}
const arrowSize = (path: Path, padding: Size): Size => {
  const farthestPoint: Point = pathReducer(path, (prev: Point, curr: Point) => ({
    x: Math.max(prev.x, curr.x),
    y: Math.max(prev.y, curr.y),
  }));

  return {
    width: farthestPoint.x + padding.width * 2,
    height: farthestPoint.y + padding.height * 2,
  };
};

const arrowVector = (
  from: Anchor,
  to: Anchor,
  headFactory: HeadFactory | HeadFactoryList,
): ArrowVector => {
  const preparedHeads = prepareHeads(headFactory);
  const padding = calculateHeadsPadding(preparedHeads);

  const fromAnchor = createAnchorWithPoint(from);
  const toAnchor = createAnchorWithPoint(to);

  const container: Container = produceContainer(
    autoAnchorWithPoint(fromAnchor, toAnchor),
    autoAnchorWithPoint(toAnchor, fromAnchor),
    padding,
  );
  const path: Path = pathListBezier(container, padding);

  const heads = assignPathToHeads(preparedHeads, path);

  const pathCommands = convertPathToSVG(path);
  const size = arrowSize(path, padding);
  const offset = arrowOffset(path, container, padding);

  return {
    pathCommands,
    size,
    offset,
    heads,
  };
};

export default arrowVector;
