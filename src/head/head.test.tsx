import { h } from 'preact';
import { render } from '@testing-library/preact';

import createFakeElement from '../tests/createFakeElement'
import { Arrow } from '../arrowCreate'
import { Head, HeadFactory, prepareHeadNode } from './head'
import TYPES from './types'

test('Prepare head node', () => {
  const factoryOptions: HeadFactory = {
    func: 'diamond',
    size: 15,
  }

  const head = prepareHeadNode(factoryOptions) as (Head & { size: number, func: string });

  expect(head.node).toBeDefined();
  expect(head.width).toBe(15);
  expect(head.width).toEqual(head.height);
  expect(head.width).toEqual(head.size);
  expect(head.func).toBe('diamond');
  expect(head.distance).toBe(1);
});

test('<Arrow heads />', () => {
  const arrowSVGWithVeeHead = `<svg class="arrow" style="top: 10px; left: 100px; position: absolute;" width="405" height="570"><path class="arrow__path" d="M 10 10 C 89 290, 306 382, 385 550"></path><g class="arrow__head" transform="rotate(64.802, 385, 550), translate(385, 550)"><g transform="translate(-10, 0)"><path d="M-10 -10 L10 0 L-10 10 L0 0 Z"></path></g></g></svg>`

  const flow: Array<[HeadFactory, string] | [HeadFactory] | [{ func: number }]> = [
    [
      {
        func: TYPES.DIAMOND,
      },
      "<svg class=\"arrow\" style=\"top: 10px; left: 100px; position: absolute;\" width=\"405\" height=\"570\"><path class=\"arrow__path\" d=\"M 10 10 C 89 290, 306 382, 385 550\"></path><g class=\"arrow__head\" transform=\"rotate(64.802, 385, 550), translate(385, 550)\"><g transform=\"translate(-10, 0)\"><path d=\"M-10 0 L0 -10 L10 0 L0 10 Z\"></path></g></g></svg>"
    ],
    [
      {
        func: TYPES.DIAMOND,
        size: 25,
      },
      `<svg class="arrow" style="top: -5px; left: 85px; position: absolute;" width="450" height="615"><path class="arrow__path" d="M 25 25 C 110 320, 315 388, 400 565"></path><g class="arrow__head" transform="rotate(64.343, 400, 565), translate(400, 565)"><g transform="translate(-25, 0)"><path d="M-25 0 L0 -25 L25 0 L0 25 Z"></path></g></g></svg>`,
    ],
    [
      {
        func: TYPES.DOT,
      },
      `<svg class="arrow" style="top: 10px; left: 100px; position: absolute;" width="405" height="570"><path class="arrow__path" d="M 10 10 C 89 290, 306 382, 385 550"></path><g class="arrow__head" transform="rotate(64.802, 385, 550), translate(385, 550)"><g transform="translate(-10, 0)"><circle cx="0" cy="0" r="10"></circle></g></g></svg>`,
    ],
    [
      {
        func: TYPES.DOT,
        size: 30,
      },
      `<svg class="arrow" style="top: -10px; left: 80px; position: absolute;" width="465" height="630"><path class="arrow__path" d="M 30 30 C 117 330, 318 390, 405 570"></path><g class="arrow__head" transform="rotate(64.229, 405, 570), translate(405, 570)"><g transform="translate(-30, 0)"><circle cx="0" cy="0" r="30"></circle></g></g></svg>`,
    ],
    [
      {
        func: TYPES.IMAGE,
        src: 'http://localhost/image.png',
        width: 20,
        height: 20,
      },
      `<svg class="arrow" style="top: 0px; left: 90px; position: absolute;" width="435" height="600"><path class="arrow__path" d="M 20 20 C 103 310, 312 386, 395 560"></path><g class="arrow__head" transform="rotate(64.515, 395, 560), translate(395, 560)"><image width="20" height="20" x="-20" y="-10" xlink:href="http://localhost/image.png"></image></g></svg>`,
    ],
    [
      {
        func: TYPES.IMAGE,
      },
    ],
    [
      {
        func: TYPES.NONE,
      },
    ],
    [
      {
        func: TYPES.INV,
      },
      `<svg class="arrow" style="top: 10px; left: 100px; position: absolute;" width="405" height="570"><path class="arrow__path" d="M 10 10 C 89 290, 306 382, 385 550"></path><g class="arrow__head" transform="rotate(64.802, 385, 550), translate(385, 550)"><path d="M-10 0 L0 -10 L0 10 Z"></path></g></svg>`,
    ],
    [
      {
        func: TYPES.INV,
        size: 15,
      },
      `<svg class="arrow" style="top: 5px; left: 95px; position: absolute;" width="420" height="585"><path class="arrow__path" d="M 15 15 C 96 300, 309 384, 390 555"></path><g class="arrow__head" transform="rotate(64.63, 390, 555), translate(390, 555)"><path d="M-15 0 L0 -15 L0 15 Z"></path></g></svg>`,
    ],
    [
      {
        func: TYPES.NORMAL,
      },
      `<svg class="arrow" style="top: 10px; left: 100px; position: absolute;" width="405" height="570"><path class="arrow__path" d="M 10 10 C 89 290, 306 382, 385 550"></path><g class="arrow__head" transform="rotate(64.802, 385, 550), translate(385, 550)"><path d="M-10 -10 L0 0 L-10 10 Z"></path></g></svg>`,
    ],
    [
      {
        func: TYPES.NORMAL,
        size: 20,
      },
      `<svg class="arrow" style="top: 0px; left: 90px; position: absolute;" width="435" height="600"><path class="arrow__path" d="M 20 20 C 103 310, 312 386, 395 560"></path><g class="arrow__head" transform="rotate(64.515, 395, 560), translate(395, 560)"><path d="M-20 -20 L0 0 L-20 20 Z"></path></g></svg>`,
    ],
    [
      {
        func: TYPES.THIN,
      },
      `<svg class="arrow" style="top: 10px; left: 100px; position: absolute;" width="405" height="570"><path class="arrow__path" d="M 10 10 C 89 290, 306 382, 385 550"></path><g class="arrow__head" transform="rotate(64.802, 385, 550), translate(385, 550)"><g><line x1="-10" y1="-10" x2="0" y2="0"></line><line x1="0" y1="0" x2="-10" y2="10"></line></g></g></svg>`,
    ],
    [
      {
        func: TYPES.THIN,
        size: 25,
      },
      `<svg class="arrow" style="top: -5px; left: 85px; position: absolute;" width="450" height="615"><path class="arrow__path" d="M 25 25 C 110 320, 315 388, 400 565"></path><g class="arrow__head" transform="rotate(64.343, 400, 565), translate(400, 565)"><g><line x1="-25" y1="-25" x2="0" y2="0"></line><line x1="0" y1="0" x2="-25" y2="25"></line></g></g></svg>`,
    ],
    [
      {
        func: TYPES.VEE,
      },
      arrowSVGWithVeeHead,
    ],
    [
      {
        func: TYPES.VEE,
        size: 25,
      },
      `<svg class="arrow" style="top: -5px; left: 85px; position: absolute;" width="450" height="615"><path class="arrow__path" d="M 25 25 C 110 320, 315 388, 400 565"></path><g class="arrow__head" transform="rotate(64.343, 400, 565), translate(400, 565)"><g transform="translate(-25, 0)"><path d="M-25 -25 L25 0 L-25 25 L0 0 Z"></path></g></g></svg>`,
    ],
    [
      {
        func: TYPES.VEE,
        distance: 0.5,
      },
      `<svg class="arrow" style="top: 10px; left: 100px; position: absolute;" width="405" height="570"><path class="arrow__path" d="M 10 10 C 89 290, 306 382, 385 550"></path><g class="arrow__head" transform="rotate(46.868, 197.5, 322), translate(197.5, 322)"><g transform="translate(-10, 0)"><path d="M-10 -10 L10 0 L-10 10 L0 0 Z"></path></g></g></svg>`,
    ],
    [
      {
        func: 'vee',
      },
      arrowSVGWithVeeHead,
    ],
    [
      'vee',
      arrowSVGWithVeeHead,
    ],
    [
      {
        func: 500, // invalid head type
      },
    ],
    [
      {
        x: 3000,
        func: () => undefined, // invalid head type
      },
    ],
    [
      {
        func: () => ({
          node: `<rect style="fill: green" x="-10px" y="-10px" width="20px" height="20px" />`,
          width: 20,
          height: 20,
        }),
      }
    ]
  ];

  const renderHead = (head: HeadFactory, index: number) => render(
    <div id={`arrow-${index}`}>
      <Arrow
        className='arrow'
        from={{
          node: createFakeElement({
            x: 10,
            y: 20,
            width: 200,
            height: 300,
          }),
          direction: 'top',
          translation: [0.2, 0.5],
        }}
        to={{
          node: createFakeElement({
            x: 410,
            y: 220,
            width: 150,
            height: 340,
          }),
          direction: 'bottom',
          translation: [-0.2, -0.3],
        }}
        head={head}
      />
    </div>,
  );

  const checkHead = ([head, expectedValue]: [HeadFactory, string], index: number) => {
    if (!expectedValue) {
      try {
        renderHead(head, index);
      } catch (e) {
        expect(expectedValue).toBeUndefined();
      }
      return;
    }

    const wrapper = renderHead(head, index);
    const svg = wrapper.baseElement.querySelector(`#arrow-${index}`).querySelector('svg');

    expect(expectedValue).toBe(svg.outerHTML);
  };

  flow.forEach(checkHead);
});
