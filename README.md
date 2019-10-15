# arrows
Library for creating SVG arrow between two HTML nodes.

![Alt text](docs/arrow-1.png?raw=true "Arrow example")

# Installation

```sh
npm install arrows
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

## CSS styles
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
```
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

`translation` is array of two numbers `[x, y]` like `[-0.5, 1.3]` which are used by Bezier curve. 

```typescript
interface Path {
  className: string;
  from: Point;
  to: Point;
}
```

# Testing
```sh
npm run test
```