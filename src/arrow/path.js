import flatten from 'lodash/flatten'

import { pointToArray, pointBezier } from './point'

const pathAbsolute = (point, offset) => ({
  ...point,
  x: point.x - offset.x,
  y: point.y - offset.y,
})

const pathXY = (from, to) => ({
  x: Math.min(from.x, to.x),
  y: Math.min(from.y, to.y),
})

const pathListSVG = (points) => {
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

const pathViewportAll = (points) => points.reduce((prev, curr) => {
  if(!prev) return curr
  return {
    x: Math.max(prev.x, curr.x),
    y: Math.max(prev.y, curr.y),
  }
})

const pathViewportFromAndTo = (from, to) => ({
  width: Math.max(from.x, to.x),
  height: Math.max(from.y, to.y),
})

const pathListBezier = (from, to) => {
  const viewport = pathViewportFromAndTo(from, to)
  
  const points = []
  points.push(from)
  points.push(pointBezier(from, viewport))
  points.push(pointBezier(to, viewport))
  points.push(to)
  
  const min = points.reduce((prev, curr) => {
    if(!prev) return curr
    return {
      x: Math.min(prev.x, curr.x),
      y: Math.min(prev.y, curr.y),
    }
  })

  const pointsWithBezier = points.map(point => ({
    ...points,
    x: point.x - min.x,
    y: point.y - min.y,
  }))

  return pointsWithBezier
}

const path = (from, to) => {
  const offset = pathXY(from, to)

  const points = pathListBezier(pathAbsolute(from, offset), pathAbsolute(to, offset))
  
  return {
    offset: {
      x: offset.x - points[0].x,
      y: offset.y - points[0].y,
    },
    size: pathViewportAll(points),
    points: pathListSVG(points),
  }
}

export default path
