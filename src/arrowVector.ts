import { AnchorWithPoint } from './anchor'
import { produceContainer, Container } from './container'
import { createHead, prepareHead, Head, HeadFactory, HeadWithPoint } from './head';
import { convertPathToSVG, pathListBezier, pathReducer, Path } from './path'
import { Point } from './point';
import { Size } from './size'

type ArrowVector = {
  pathCommands: string;
  size: Size;
  offset: Point;
  head: HeadWithPoint;
};

// <svg style={arrowOffset}, where arrowOffset is { top: x, left: y }
const arrowOffset = (path: Path, container: Container, head: Head): Point => {
  const minPoint = (prop: 'x' | 'y') => Math.min(
    path[0][prop] - head.width,
    path[3][prop] - head.height,
  );

  return {
    x: container.position.x - minPoint('x') - head.width,
    y: container.position.y - minPoint('y') - head.height,
  };
};

// <svg width={width} height={height}
const arrowSize = (path: Path, headWithNode: Head): Size => {
  const farthestPoint: Point = pathReducer(path, (prev: Point, curr: Point) => ({
    x: Math.max(prev.x, curr.x),
    y: Math.max(prev.y, curr.y),
  }));

  return {
    width: farthestPoint.x + headWithNode.width * 2,
    height: farthestPoint.y + headWithNode.height * 2,
  };
};

const arrowVector = (from: AnchorWithPoint, to: AnchorWithPoint, headFactory: HeadFactory): ArrowVector => {
  const headWithNode: Head = prepareHead(headFactory);

  const container: Container = produceContainer(from, to, headWithNode);
  const path: Path = pathListBezier(container, headWithNode);

  const head = createHead(headWithNode, path);

  const pathCommands = convertPathToSVG(path);
  const size = arrowSize(path, headWithNode);
  const offset = arrowOffset(path, container, headWithNode);

  return {
    pathCommands,
    size,
    offset,
    head,
  };
};

export default arrowVector;
