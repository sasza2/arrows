import { DIRECTION } from 'consts';

const endNode = (point) => (typeof point.node === 'function'
  ? point.node()
  : point.node
);

const endXY = (point) => {
  const endNodePoint = endNode(point);
  if (!endNodePoint) throw new Error("point is null, check if 'from'/'to' exists");

  const rect = endNode(point).getBoundingClientRect();
  switch (point.direction) {
    case DIRECTION.TOP_LEFT:
      return {
        x: rect.x,
        y: rect.y,
      };
    case DIRECTION.TOP:
      return {
        x: rect.x + rect.width / 2,
        y: rect.y,
      };
    case DIRECTION.TOP_RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y,
      };
    case DIRECTION.RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y + rect.height / 2,
      };
    case DIRECTION.BOTTOM_LEFT:
      return {
        x: rect.x,
        y: rect.y + rect.height,
      };
    case DIRECTION.BOTTOM:
      return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height,
      };
    case DIRECTION.BOTTOM_RIGHT:
      return {
        x: rect.x + rect.width,
        y: rect.y + rect.height,
      };
    case DIRECTION.LEFT:
      return {
        x: rect.x,
        y: rect.y + rect.height / 2,
      };
    default:
      throw new Error('unexpected type');
  }
};

const ends = (point) => ({
  ...point,
  ...endXY(point),
});

export default ends;
