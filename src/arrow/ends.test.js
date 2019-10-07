import { DIRECTION } from '../consts'
import ends from './ends'

import Element from '../jsx/element'

test('check ends top', () => {
  let point = {
    node: Element.fake({
      x: 750,
      y: 450,
      width: 50,
      height: 150,
    }),
    direction: DIRECTION.TOP,
  }

  let end = ends(point)
  expect(end).toMatchObject({ x: 775, y: 450 })
})