export const pointToArray = (point) => ([
  point.x,
  point.y,
]);

export const pointBezier = (point, viewport) => ({
  x: point.x + viewport.width * point.translation[0],
  y: point.y + viewport.height * point.translation[1],
});
