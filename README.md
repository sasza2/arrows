# arrows-svg
Library for creating SVG arrow between two HTML elements. Positions of elements are observed, so when they change arrow will rerender.

![Arrow](docs/arrow-1.png?raw=true "Arrow example")

# Installation

```sh
npm install arrows-svg
```
# How to use it

https://codesandbox.io/s/relaxed-sara-8iuxr

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
*/
document.body.appendChild(arrow.node);
```

Could be also used from `window.arrowCreate()`

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

\* `clear()` or `clearInterval(timer)` should be `always` used after removal of Arrow.

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

\* `point.x` / `point.y` are from / to position,
\* `viewport` is size between points,
\* `point.translation` is array from above.

translation could be tested in `test/form/index.html`

```typescript
interface Path {
  className: string;
  from: Point;
  to: Point;
}
```

# Custom head
Arrow could have custom heads.

### example with `diamond` head
```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows'

const arrow = arrowCreate({
  ...,
  head: HEAD.DIAMOND, // or func: 'diamond' / 'DIAMOND' as string
})

document.body.appendChild(arrow.node);
```

### example with `diamond` head and specified size
```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows'

const arrow = arrowCreate({
  ...,
  head: {
    func: HEAD.DIAMOND, // or func: 'diamond' / 'DIAMOND' as string
    size: 30, 
    // custom options that will be passed to head function
  }
})

document.body.appendChild(arrow.node);
```

### example with `image` head

```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows'

const arrow = arrowCreate({
  ...,
  head: {
    func: HEAD.IMAGE, // could be just 'image'
    width: 20, // px
    height: 30, // px
    image: 'abc.png', // url of image head
  }
})

document.body.appendChild(arrow.node);
```

## Head types
![Head](docs/heads.png?raw=true "Head types")

\* Default head size is `10`<br />
\* Default head is `thin`

## Own head
```js
import arrowCreate, { DIRECTION, HEAD } from 'arrows'

const arrow = arrowCreate({
  ...,
  head: {
    func: ({ size }) => { // all passed props from head
      const SVG_NS = 'http://www.w3.org/2000/svg';
      const node = document.createElementNS(SVG_NS, 'g');

      // ... bla bla like node.setAttributeNS(...)

      return {
        node,
        width: 30,
        height: 25,
      }
      
      return {
        // OR return as string like
        node: '<rect x="-10" y="-10" width="20" height="20" />',
        width: 20,
        height: 20,
      }
    },
    size: 20,
  }
})

document.body.appendChild(arrow.node);
```

\* Return of custom head function always
require to params like `node`, `width`, `height`

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
