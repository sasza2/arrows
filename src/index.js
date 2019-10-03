import flatten from 'lodash/flatten'

import Element from './element'
import position from './position'
import { DIRECTION } from './consts'

const arrowSvg = ({ from, to }) => {
  const paths = ['M']

  paths.push([from.x, from.y])
  paths.push('C')
  paths.push([from.x, from.y])
  paths.push(',')
  paths.push([to.x, to.y])
  paths.push(',')
  paths.push([to.x, to.y])

  const pathAttribute = flatten(paths).join(' ').replace(/ ,/g, ',')

  const node = (
    <svg style={{ top: 50, left: 100, fill: '#123456' }} width="650" height="400">
      <path d={pathAttribute} stroke="black" fill="transparent"/>
    </svg>
  )

  document.body.appendChild(node)
}

const arrow = ({ from, to }) => arrowSvg({
  from: position(from),
  to: position(to),
})

window.addEventListener('load', () => {
  arrow({
    from: {
      direction: DIRECTION.TOP,
      node: document.getElementById('a'),
    },
    to: {
      direction: DIRECTION.TOP,
      node: document.getElementById('b'),
    },
  })
})
