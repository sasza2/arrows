import flatten from 'lodash/flatten'

import { pointToArray, pointBezier } from './point'

export const pointAbsolute = (point, offset) => ({
  ...point,
  x: point.x - offset.x,
  y: point.y - offset.y,
})

const startPosition = (from, to) => ({
  x: Math.min(from.x, to.x),
  y: Math.min(from.y, to.y),
})

export const pathListSVG = (points) => {
  const list = ['M']

  list.push(pointToArray(points[0]))
  list.push('C')
  list.push(pointToArray(points[1]))
  list.push(',')
  list.push(pointToArray(points[2]))
  list.push(',')
  list.push(pointToArray(points[3]))

  return flatten(list).join(' ').replace(/ ,/g, ',') 
}

const pathViewportFromAndTo = (from, to) => ({
  width: Math.max(from.x, to.x),
  height: Math.max(from.y, to.y),
})

const pathReducer = (points, reducer) => points.reduce((prev, curr) => {
  if (!prev) return curr
  return reducer(prev, curr)
})

const pathSubstractStartPosition = (points) => {
  const min = pathReducer(points, (prev, curr) => ({
    x: Math.min(prev.x, curr.x),
    y: Math.min(prev.y, curr.y),
  }))

  return points.map(point => ({
    ...point,
    x: point.x - min.x,
    y: point.y - min.y,
  }))
}

const pathListBezier = (from, to) => {
  const viewport = pathViewportFromAndTo(from, to)
  
  const points = []
  points.push(from)
  points.push(pointBezier(from, viewport))
  points.push(pointBezier(to, viewport))
  points.push(to)
  
  return pathSubstractStartPosition(points)
}

const path = (from, to) => {
  const offset = startPosition(from, to)
  const points = pathListBezier(pointAbsolute(from, offset), pointAbsolute(to, offset))
  
  return {
    offset: {
      x: offset.x - points[0].x,
      y: offset.y - points[0].y,
    },
    size: pathReducer(points, (prev, curr) => ({
      x: Math.max(prev.x, curr.x),
      y: Math.max(prev.y, curr.y),
    })),
    points: pathListSVG(points),
  }
}

export default path
