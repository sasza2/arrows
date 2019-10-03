import flatten from 'lodash/flatten'

const pathXY = (from, to) => ({
  x: Math.min(from.x, to.x),
  y: Math.min(from.y, to.y),
})

const pathListSVG = (points) => {
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

const path = (from, to) => {
  const start = pathXY(from, to)
  const points = []
  points.push([from.x - start.x, from.y - start.y])
  points.push([to.x - start.x, to.y - start.y])

  return {
    ...start,
    points: pathListSVG(points),
  }
}

export default path
