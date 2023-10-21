import createFakeElement from './tests/createFakeElement'
import { Anchor, createAnchorWithPoint } from './anchor';
import { DIRECTION } from './consts';

test('createAnchorWithPoint direction top', () => {
  const anchor: Anchor = {
    node: createFakeElement({
      x: 750,
      y: 450,
      width: 50,
      height: 150,
    }),
    direction: DIRECTION.TOP,
    translation: [0.5, 1],
  };

  const anchorWithPoint = createAnchorWithPoint(anchor);
  expect(anchorWithPoint).toMatchObject({ x: 775, y: 450 });
});

test('createAnchorWithPoint node function with direction top', () => {
  const anchor: Anchor = {
    node: () => createFakeElement({
      x: 750,
      y: 450,
      width: 50,
      height: 150,
    }),
    direction: DIRECTION.TOP,
    translation: [0.5, 1],
  };

  const anchorWithPoint = createAnchorWithPoint(anchor);
  expect(anchorWithPoint).toMatchObject({ x: 775, y: 450 });
});

test('createAnchorWithPoint test all directions', () => {
  Object.values(DIRECTION).forEach(direction => {
    const anchor: Anchor = {
      node: () => createFakeElement({
        x: 750,
        y: 450,
        width: 50,
        height: 150,
      }),
      direction,
      translation: [0.5, 1],
    };

    const anchorWithPoint = createAnchorWithPoint(anchor);
    switch (direction) {
      case DIRECTION.TOP_LEFT:
        expect(anchorWithPoint).toMatchObject({ x: 750, y: 450 });
        break
      case DIRECTION.TOP_RIGHT:
        expect(anchorWithPoint).toMatchObject({ x: 800, y: 450 });
        break
      case DIRECTION.RIGHT:
        expect(anchorWithPoint).toMatchObject({ x: 800, y: 525 });
        break
      case DIRECTION.BOTTOM_LEFT:
        expect(anchorWithPoint).toMatchObject({ x: 750, y: 600 });
        break
      case DIRECTION.BOTTOM:
        expect(anchorWithPoint).toMatchObject({ x: 775, y: 600 });
        break
      case DIRECTION.BOTTOM_RIGHT:
        expect(anchorWithPoint).toMatchObject({ x: 800, y: 600 });
        break
      case DIRECTION.LEFT:
        expect(anchorWithPoint).toMatchObject({ x: 750, y: 525 });
        break
      case DIRECTION.TOP:
        expect(anchorWithPoint).toMatchObject({ x: 775, y: 450 });
        break
      default:
        expect(anchorWithPoint).toMatchObject({ x: 0, y: 0 });
        break
    }
  })
});

test('createAnchorWithPoint test with wrong direction', () => {
  const anchor: Anchor = {
    node: () => createFakeElement({
      x: 750,
      y: 450,
      width: 50,
      height: 150,
    }),
    direction: 'test',
    translation: [0.5, 1],
  };

  const anchorWithPoint = createAnchorWithPoint(anchor);
  expect(anchorWithPoint).toMatchObject({ x: 775, y: 525 });
});

test('createAnchorWithPoint null point', () => {
  const anchor: Anchor = {
    node: () => null,
    direction: DIRECTION.TOP,
    translation: [0.5, 1],
  };

  let hadException = false
  try {
    createAnchorWithPoint(anchor)
  } catch (e) {
    hadException = true
  }

  expect(hadException).toBeTruthy()
});

test('createAnchorWithPoint getBoundingClientRect x, y', () => {
  const measure = {
    x: 750,
    y: 450,
    width: 50,
    height: 150,
  }

  const node = createFakeElement(measure)

  node.getBoundingClientRect = () => <DOMRect>({
    ...measure,
    left: undefined,
    top: undefined,
  })

  const anchor: Anchor = {
    node,
    direction: DIRECTION.TOP,
    translation: [0.5, 1],
  };

  const anchorWithPoint = createAnchorWithPoint(anchor);
  expect(anchorWithPoint).toMatchObject({ x: 775, y: 450 });
});

test('createAnchorWithPoint getBoundingClientRect width, height undefined', () => {
  const measure = {
    x: 750,
    y: 450,
    width: 50,
    height: 150,
  }

  const node = createFakeElement(measure)

  node.getBoundingClientRect = () => <DOMRect>({
    ...measure,
    x: undefined,
    y: undefined,
    left: measure.x,
    top: measure.y,
  })

  const anchor: Anchor = {
    node,
    direction: DIRECTION.TOP,
    translation: [0.5, 1],
  };

  const anchorWithPoint = createAnchorWithPoint(anchor);
  expect(anchorWithPoint).toMatchObject({ x: 775, y: 450 });
});

test('createAnchorWithPoint window undefined', () => {
  const windowSpy = jest.spyOn(window, "window", "get");
  windowSpy.mockImplementation(() => undefined);

  const anchor: Anchor = {
    node: createFakeElement({
      x: 750,
      y: 450,
      width: 50,
      height: 150,
    }),
    direction: DIRECTION.TOP,
    translation: [0.5, 1],
  };

  const anchorWithPoint = createAnchorWithPoint(anchor);
  expect(anchorWithPoint).toMatchObject({ x: 775, y: 450 });

  windowSpy.mockRestore();
})
