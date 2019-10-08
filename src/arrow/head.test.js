import { headBezierAngle } from './head';

test('check headBezierAngle', () => {
  let angle = Math.floor((headBezierAngle(1, [
    {
      x: 10,
      y: 20,
    },
    {
      x: 30,
      y: 65,
    },
    {
      x: 44,
      y: 99,
    }, {
      x: 201,
      y: 250,
    },
  ])) * 10000);

  expect(angle).toBe(7659);

  angle = Math.floor((headBezierAngle(1, [
    {
      x: 80,
      y: 40,
    },
    {
      x: 110,
      y: 25,
    },
    {
      x: 114,
      y: 329,
    }, {
      x: 401,
      y: 550,
    },
  ])) * 10000);

  expect(angle).toBe(6562);
});
