import { h } from 'preact';
import { render } from '@testing-library/preact';

import createFakeElement from './tests/createFakeElement'
import delay from './tests/delay'
import arrowCreate, { Arrow } from './arrowCreate'
import { HEAD } from './head'
import { DIRECTION } from './consts'

test('arrowCreate append and clear', async (done) => {
  const { node, clear } = arrowCreate({
    className: 'test',
    from: {
      node: createFakeElement({
        x: 10,
        y: 20,
        width: 200,
        height: 300,
      }),
      direction: DIRECTION.TOP,
      translation: [0.2, 0.5],
    },
    to: {
      node: createFakeElement({
        x: 410,
        y: 220,
        width: 150,
        height: 340,
      }),
      direction: DIRECTION.BOTTOM,
      translation: [-0.2, -0.3],
    },
  });

  document.body.appendChild(node);

  await delay(300);

  clear();

  await delay(300);

  clear();

  done();
});

test('arrowCreate append and clear', () => {
  const { node, clear } = arrowCreate({
    from: {
      node: createFakeElement({
        x: 10,
        y: 20,
        width: 200,
        height: 300,
      }),
      direction: DIRECTION.TOP,
      translation: [0.2, 0.5],
    },
    to: {
      node: createFakeElement({
        x: 410,
        y: 220,
        width: 150,
        height: 340,
      }),
      direction: DIRECTION.BOTTOM,
      translation: [-0.2, -0.3],
    },
    head: HEAD.DOT,
  });

  document.body.appendChild(node);

  clear();
});

test('<Arrow />', async (done) => {
  const nodeToMeasures = {
    x: 410,
    y: 220,
    width: 150,
    height: 340,
  };

  const nodeTo = createFakeElement(nodeToMeasures);

  const wrapper = render(
    <Arrow
      from={{
        node: createFakeElement({
          x: 10,
          y: 20,
          width: 200,
          height: 300,
        }),
        direction: DIRECTION.TOP,
        translation: [0.2, 0.5],
      }}
      to={{
        node: nodeTo,
        direction: DIRECTION.BOTTOM,
        translation: [-0.2, -0.3],
      }}
      head={HEAD.DOT}
    />,
  );

  const svg = wrapper.baseElement.querySelector('svg');
  expect(svg.style.top).toBe('10px');

  await delay(300);

  nodeToMeasures.x = 310;

  await delay(300);

  document.body.removeChild(nodeTo);

  done();
});
