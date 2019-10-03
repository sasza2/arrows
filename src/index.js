import Element from './element'
import ends from './ends'
import path from './path'
import { DIRECTION } from './consts'

const arrowSvg = ({ from, to }) => {
  const arrow = path(from, to)
  const node = (
    <svg style={{ top: arrow.y, left: arrow.x, fill: '#123456', position: 'absolute' }} width="650" height="400">
      <path d={arrow.points} stroke="black" fill="transparent"/>
    </svg>
  )

  document.body.appendChild(node)
}

const arrow = ({ from, to }) => arrowSvg({
  from: ends(from),
  to: ends(to),
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
