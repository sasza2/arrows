import { DIRECTION } from '../consts';

const endXY = (point) => {
  const rect = point.node.getBoundingClientRect();
  switch (point.direction) {
    case DIRECTION.TOP:
      return {
        x: rect.x + rect.width / 2,
        y: rect.y,
      };
  }
};

const ends = (point) => ({
  ...point,
  ...endXY(point),
});

export default ends;
