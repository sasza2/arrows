/* eslint-disable */
export const headBezierAngle = (t, points) => {
  const dx = ((1 - t) ** 2) * (points[1].x - points[0].x) + 2 * t * (1 - t) * (points[2].x - points[1].x) + t * t * (points[3].x - points[2].x);
  const dy = ((1 - t) ** 2) * (points[1].y - points[0].y) + 2 * t * (1 - t) * (points[2].y - points[1].y) + t * t * (points[3].y - points[2].y);
  return -Math.atan2(dx, dy) + 0.5 * Math.PI;
};
