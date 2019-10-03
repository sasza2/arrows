import flatten from 'lodash/flatten'

import { DIRECTION } from './consts'

const positionXY = (point) => {
  const rect = point.node.getBoundingClientRect()
  switch(point.direction){
    case DIRECTION.TOP:
      return {
        x: rect.x + rect.width / 2,
        y: rect.y,
      }
  }
}

export const ends = (point) => ({
  ...point,
  ...positionXY(point)
})

export const path = (from, to) => {
  const paths = ['M']

  paths.push([from.x, from.y])
  paths.push('C')
  paths.push([from.x, from.y])
  paths.push(',')
  paths.push([to.x, to.y])
  paths.push(',')
  paths.push([to.x, to.y])

  return flatten(paths).join(' ').replace(/ ,/g, ',')
}