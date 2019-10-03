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

const pathXY = (from, to) => ({
  x: Math.min(from.x, to.x),
  y: Math.min(from.y, to.y),
})

const createSVGPathList = (points) => {
  const list = ['M']

  list.push(points[0])
  list.push('C')
  list.push(points[0])
  list.push(',')
  list.push(points[1])
  list.push(',')
  list.push(points[1])

  return flatten(list).join(' ').replace(/ ,/g, ',') 
}

export const path = (from, to) => {
  const start = pathXY(from, to)
  const points = []
  points.push([from.x - start.x, from.y - start.y])
  points.push([to.x - start.x, to.y - start.y])

  return {
    ...start,
    points: createSVGPathList(points),
  }
}