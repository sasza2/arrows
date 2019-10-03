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

const position = (point) => ({
  ...point,
  ...positionXY(point)
})

export default position
