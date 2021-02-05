import { h } from 'preact';
import { render } from '@testing-library/preact';

import createFakeElement from './tests/createFakeElement'
import delay from './tests/delay'
import arrowCreate, { Arrow } from './arrowCreate'
import { createAnchorWithPoint } from './anchor'
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
      className='arrow'
      from={createAnchorWithPoint({
        node: createFakeElement({
          x: 10,
          y: 20,
          width: 200,
          height: 300,
        }),
        direction: DIRECTION.TOP,
        translation: [0.2, 0.5],
      })}
      to={createAnchorWithPoint({
        node: nodeTo,
        direction: DIRECTION.BOTTOM,
        translation: [-0.2, -0.3],
      })}
      head={HEAD.DOT}
    />,
  );

  const svg = wrapper.baseElement.querySelector('svg');
  expect(svg.style.top).toBe('10px');

  await delay(300);

  nodeToMeasures.x = 310;

  await delay(300);

  document.body.removeChild(nodeTo);

  await delay(300);

  done();
});

test('<Arrow /> without direction', () => {
  const wrapper = render(
    <Arrow
      className='arrow'
      from={createAnchorWithPoint({
        node: createFakeElement({
          x: 10,
          y: 20,
          width: 200,
          height: 300,
        }),
        translation: [0.2, 0.5],
      })}
      to={createAnchorWithPoint({
        node: createFakeElement({
          x: 410,
          y: 220,
          width: 150,
          height: 340,
        }),
        translation: [-0.2, -0.3],
      })}
      head={HEAD.DOT}
    />,
  );

  const svg = wrapper.baseElement.querySelector('svg');
  expect(svg.outerHTML).toBe('<svg class="arrow" style="top: 160px; left: 200px; position: absolute;" width="230" height="250"><path class="arrow__path" d="M 10 10 C 54 130, 166 158, 210 230"></path><g class="arrow__head arrow__head--0" transform="rotate(58.556, 210, 230), translate(210, 230)"><g transform="translate(-10, 0)"><circle cx="0" cy="0" r="10"></circle></g></g></svg>');
});

test('<Arrow /> without direction, vertical', () => {
  const wrapper = render(
    <Arrow
      className='arrow'
      from={createAnchorWithPoint({
        node: createFakeElement({
          x: 10,
          y: 20,
          width: 200,
          height: 300,
        }),
        translation: [0.2, 0.5],
      })}
      to={createAnchorWithPoint({
        node: createFakeElement({
          x: 410,
          y: 600,
          width: 150,
          height: 340,
        }),
        translation: [-0.2, -0.3],
      })}
      head={HEAD.DOT}
    />,
  );

  const svg = wrapper.baseElement.querySelector('svg');
  expect(svg.outerHTML).toBe('<svg class="arrow" style="top: 310px; left: 100px; position: absolute;" width="405" height="310"><path class="arrow__path" d="M 10 10 C 89 160, 306 200, 385 290"></path><g class="arrow__head arrow__head--0" transform="rotate(48.701, 385, 290), translate(385, 290)"><g transform="translate(-10, 0)"><circle cx="0" cy="0" r="10"></circle></g></g></svg>');
});

test('<Arrow /> without direction and translation', () => {
  const wrapper = render(
    <Arrow
      className='arrow'
      from={createAnchorWithPoint({
        node: createFakeElement({
          x: 10,
          y: 20,
          width: 200,
          height: 300,
        }),
      })}
      to={createAnchorWithPoint({
        node: createFakeElement({
          x: 410,
          y: 600,
          width: 150,
          height: 340,
        }),
      })}
      head={HEAD.DOT}
    />,
  );

  const svg = wrapper.baseElement.querySelector('svg');
  expect(svg.outerHTML).toBe('<svg class="arrow" style="top: 310px; left: 100px; position: absolute;" width="405" height="310"><path class="arrow__path" d="M 10 10 C 10 100, 385 200, 385 290"></path><g class="arrow__head arrow__head--0" transform="rotate(90.012, 385, 290), translate(385, 290)"><g transform="translate(-10, 0)"><circle cx="0" cy="0" r="10"></circle></g></g></svg>');
});

test('<Arrow /> without translation', () => {
  const wrapper = render(
    <Arrow
      className='arrow'
      from={createAnchorWithPoint({
        node: createFakeElement({
          x: 10,
          y: 20,
          width: 200,
          height: 300,
        }),
        direction: DIRECTION.BOTTOM,
      })}
      to={createAnchorWithPoint({
        node: createFakeElement({
          x: 410,
          y: 600,
          width: 150,
          height: 340,
        }),
        direction: DIRECTION.BOTTOM,
      })}
      head={HEAD.DOT}
    />,
  );

  const expected = '<svg class="arrow" style="top: 310px; left: 100px; position: absolute;" width="405" height="650"><path class="arrow__path" d="M 10 10 C 10 202, 385 438, 385 630"></path><g class="arrow__head arrow__head--0" transform="rotate(90.012, 385, 630), translate(385, 630)"><g transform="translate(-10, 0)"><circle cx="0" cy="0" r="10"></circle></g></g></svg>'
  const svg = wrapper.baseElement.querySelector('svg');
  expect(svg.outerHTML).toBe(expected);
});

test('<Arrow /> from/to as HTMLElement', () => {
  const wrapper = render(
    <Arrow
      className='arrow'
      from={createAnchorWithPoint(createFakeElement({
        x: 10,
        y: 20,
        width: 200,
        height: 300,
      }))}
      to={createAnchorWithPoint(createFakeElement({
        x: 410,
        y: 600,
        width: 150,
        height: 340,
      }))}
      head={HEAD.DOT}
    />,
  );

  const svg = wrapper.baseElement.querySelector('svg');
  expect(svg.outerHTML).toBe('<svg class="arrow" style="top: 310px; left: 100px; position: absolute;" width="405" height="310"><path class="arrow__path" d="M 10 10 C 10 100, 385 200, 385 290"></path><g class="arrow__head arrow__head--0" transform="rotate(90.012, 385, 290), translate(385, 290)"><g transform="translate(-10, 0)"><circle cx="0" cy="0" r="10"></circle></g></g></svg>');
});

test('<Arrow /> without from / to', () => {
  try {
    arrowCreate({
      from: null,
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
  } catch (e) {
    expect((e as string).toString().includes('undefined from')).toBe(true)
  }

  try {
    arrowCreate({
      from: {
        node: createFakeElement({
          x: 410,
          y: 220,
          width: 150,
          height: 340,
        }),
        direction: DIRECTION.BOTTOM,
        translation: [-0.2, -0.3],
      },
      to: null,
      head: HEAD.DOT,
    });
  } catch (e) {
    expect((e as string).toString().includes('undefined to')).toBe(true)
  }
});
