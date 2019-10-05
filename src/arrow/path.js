import flatten from 'lodash/flatten'

const pathAbsolute = (point, offset) => ({
  ...point,
  x: point.x - offset.x,
  y: point.y - offset.y,
})

const pathXY = (from, to) => ({
  x: Math.min(from.x, to.x),
  y: Math.min(from.y, to.y),
})

const pointToArray = (point) => ([
  point.x,
  point.y,
])

const pathListSVG = (points) => {
  const list = ['M']

  list.push(pointToArray(points[0]))
  list.push('C')
  list.push(pointToArray(points[0]))
  list.push(',')
  list.push(pointToArray(points[1]))
  list.push(',')
  list.push(pointToArray(points[1]))

  return flatten(list).join(' ').replace(/ ,/g, ',') 
}

const pathOffset = ({ from, to, offset }) => {
  const points = []
  points.push(from)
  points.push(to)

  return {
    from,
    to,
    offset,
    points: pathListSVG(points),
  }
}

const path = (from, to) => {
  const offset = pathXY(from, to)
  return pathOffset({
    offset,
    from: pathAbsolute(from, offset),
    to: pathAbsolute(to, offset),
  })
}

export default path
