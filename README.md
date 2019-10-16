# arrows
Library for creating SVG arrow between two HTML elements. Positions of elements are observed, so when they change arrow will rerender.

![Alt text](docs/arrow-1.png?raw=true "Arrow example")

# Installation

```sh
npm install arrows-svg
```
# How to use it

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

document.body.appendChild(arrow); // arrow is HTMLElement
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
arrowCreate(path:Path):HTMLElement
```

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

- `point.x` / `point.y` are from / to position,
- `viewport` is size between points,
- `point.translation` is array from above.

translation could be tested in `test/form/index.html`

```typescript
interface Path {
  className: string;
  from: Point;
  to: Point;
}
```

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

## Example 1
```
test/form/index.html
```

## Example 2
```
test/interval/index.html
```