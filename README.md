# arrows-svg
Library for creating SVG arrow between two HTML elements. Positions of elements are observed, so when they change arrow will rerender. There's also react implementation --> <a href="https://www.npmjs.com/package/react-arrows">react-arrows</a>.

![Arrow](docs/arrow-1.png?raw=true "Arrow example")

## Installation

```sh
npm install arrows-svg
```

## How to use it

https://codesandbox.io/s/brave-haslett-tlmz7

```js
import arrowCreate, { DIRECTION } from 'arrows-svg'

const arrow = arrowCreate({
  from: document.getElementById('from'),
  to: document.getElementById('to'),
})

/*
  - arrow.node is HTMLElement
  - remove arrow from DOM with arrow.clear()
*/
document.body.appendChild(arrow.node);
```

Arrow could be also created with `window.arrowCreate()` function.

## CSS styles

Styles should be added to make arrow visible. Feel free to change them.

```css
.arrow {
  pointer-events: none;
}

.arrow__path {
  stroke: #000;
  fill: transparent;
  stroke-dasharray: 4 2;
}

.arrow__head line {
  stroke: #000;
  stroke-width: 1px;
}
```

### Example styles

![Arrow](docs/hello-world.png?raw=true "Arrow example")

## API

```typescript
arrowCreate(props: IArrowProps): IArrow
```

```typescript
interface IArrowProps {
  className?: string,
  head?: HeadFactory,
  from: Anchor,
  to: Anchor,
}
```

```typescript
interface IArrow {
  node: DocumentFragment;
  clear: () => void;
}
```

`*` `clear()` - should be invoked to remove arrow.

## Controlling arrow curve

```js
import arrowCreate, { DIRECTION } from 'arrows-svg'

const arrow = arrowCreate({
  className: 'arrow',
  from: {
    direction: DIRECTION.TOP,
    node: document.getElementById('from'),
    translation: [-0.5, -1],
  },
  to: {
    direction: DIRECTION.RIGHT,
    node: document.getElementById('to'),
    translation: [0.9, 1],
  },
})
```

```typescript
const DIRECTION = {
  TOP_LEFT: 'top-left',
  TOP: 'top',
  TOP_RIGHT: 'top-right',
  RIGHT: 'right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM: 'bottom',
  BOTTOM_RIGHT: 'bottom-right',
  LEFT: 'left',
};
```

`direction` - position of `Anchor` in HTMLElement from/to.

```typescript
type Anchor = {
  node: HTMLElement | (() => HTMLElement);
  direction: string;
  translation: PointArray; // e.g. [1, -0.5]
} | HTMLElement | (() => HTMLElement);
```

`translation` - is an array of two numbers `[x, y]` like `[-0.5, 1.3]` which are used by Bezier curve. `x` and `y` are offset multiplier of Bezier control point. Translation could be tested in `examples/form/index.html`

`node` - if HTMLElement still doesn't exist in DOM, try to pass it as a function `() => node`.

## Controlling head

### Examples

#### example with `diamond` head

```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows-svg'

const arrow = arrowCreate({
  ...,
  head: HEAD.DIAMOND, // or { func: 'diamond' }
})

document.body.appendChild(arrow.node);
```

___

#### example with `diamond` head and specified size

```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows-svg'

const arrow = arrowCreate({
  ...,
  head: {
    func: HEAD.DIAMOND,
    size: 30, // custom options that will be passed to head function
  }
})

document.body.appendChild(arrow.node);
```

___

#### example with `image` head

```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows-svg'

const arrow = arrowCreate({
  ...,
  head: {
    func: HEAD.IMAGE, // could be just 'image' / 'IMAGE'
    width: 20, // px
    height: 30, // px
    image: 'abc.png', // url of image head
  }
})

document.body.appendChild(arrow.node);
```

___

### Head types

![Head](docs/heads.png?raw=true "Head types")

`*` Default head size is `10`<br />
`*` Default head is `thin`<br />
`*` `head` has also `distance` param, see more at https://codesandbox.io/s/damp-tdd-3fx91<br />
`*` `head` could be also an array, see more at `examples/heads_multiple`

___

### Custom head

```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows-svg'

const arrow = arrowCreate({
  ...,
  head: {
    func: ({ width }) => { // all passed props from head
      const SVG_NS = 'http://www.w3.org/2000/svg';
      const node = document.createElementNS(SVG_NS, 'g');

      // ... bla bla like node.setAttributeNS(...)

      return {
        node,
        width: width,
        height: 25,
      }

      // OR node could be string like

      return {
        node: '<rect x="-10" y="-10" width="20" height="25" />',
        width: size,
        height: size,
      }
    },
    width: 30,
  }
})

document.body.appendChild(arrow.node);
```

`*` Return of custom head function always
require a params like { `node`, `width`, `height` }

## Building

```sh
npm run build
```

## Development

```sh
npm run start
```

## Testing

```sh
npm run test
```

## Examples

in [./examples](./examples) directory
