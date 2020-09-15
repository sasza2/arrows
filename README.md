# arrows-svg
Library for creating SVG arrow between two HTML elements. Positions of elements are observed, so when they change arrow will rerender. There's always react implementation --> <a href="https://www.npmjs.com/package/react-arrows">react-arrows</a>.

![Arrow](docs/arrow-1.png?raw=true "Arrow example")

# Installation

```sh
npm install arrows-svg
```
# How to use it

https://codesandbox.io/s/brave-haslett-tlmz7

```js
import arrowCreate, { DIRECTION } from 'arrows'

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

/*
  - arrow.node is HTMLElement
  - arrow.timer is idInterval from setInterval()
    REMEMBER about clearInterval(node.timer) after unmount
  - it's also possible to clear with arrow.clear()
*/
document.body.appendChild(arrow.node);
```

Arrow could be also created from `window.arrowCreate()`

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

### Example styles:
![Arrow](docs/hello-world.png?raw=true "Arrow example")

# API
```typescript
arrowCreate(path:Path):Arrow
```

```typescript
interface Arrow {
  node: HTMLElement;
  timer: number;
  clear();
}
```

`*` `clear()` or `clearInterval(timer)` should be `always` used after removal of Arrow.

```typescript
enum Direction {
  TOP_LEFT: 'top-left',
  TOP: 'top',
  TOP_RIGHT: 'top-right',
  RIGHT: 'right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM: 'bottom',
  BOTTOM_RIGHT: 'bottom-right',
  LEFT: 'left',
}
```

Direction - Position of `Point` in HTMLElement from/to.

```typescript
interface Point {
  direction: Direction;
  node: HTMLElement;
  translation: Array<number>;
}
```

`translation` is array of two numbers `[x, y]` like `[-0.5, 1.3]` which are used by Bezier curve. `x` and `y` are offset of Bezier control point. Position of control point is calculated by function:

```javascript
{
  x: point.x + viewport.width * point.translation[0],
  y: point.y + viewport.height * point.translation[1],
}
```

`*` `point.x` / `point.y` are from / to position,
`*` `viewport` is size between points,
`*` `point.translation` is array from above.

translation could be tested in `test/form/index.html`

```typescript
interface Path {
  className: string;
  from: Point;
  to: Point;
  onChange();
}
```

# Custom head

### example with `diamond` head
```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows'

const arrow = arrowCreate({
  ...,
  head: HEAD.DIAMOND, // or func: 'diamond' / 'DIAMOND' as string
})

document.body.appendChild(arrow.node);
```

___

### example with `diamond` head and specified size
```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows'

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

### example with `image` head

```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows'

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

## Head types
![Head](docs/heads.png?raw=true "Head types")

`*` Default head size is `10`<br />
`*` Default head is `thin`<br />
`*` `head` has also `distance` param, see more at https://codesandbox.io/s/damp-tdd-3fx91

___

## Own head
```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows'

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

___

## Track arrow position
```js
import arrowCreate, { DIRECTION } from 'arrows'

const arrow = arrowCreate({
  onChange: ({ pointXY }) => {

  },
})

/*
  pointXY(distance)
    - returns { x, y } position at specified
      distance [0, 1] (default 1) of arrow.
      (0) -> arrow start
      (0.5) -> half of arrow
      (1) -> end of arrow
*/
```

Example in `test/labels` directory.

# Building
```sh
npm run build
```

# Development
```sh
npm run start
```

# Testing
```sh
npm run test
```

## Examples
```
test/form/index.html
test/interval/index.html
test/heads/index.html
```
