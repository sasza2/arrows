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

  point = {
    node: Element.fake({
      x: 300,
      y: 200,
      width: 400,
      height: 90,
    }),
    direction: DIRECTION.TOP,
  }

  end = ends(point)
  expect(end).toMatchObject({ x: 500, y: 200 })
})