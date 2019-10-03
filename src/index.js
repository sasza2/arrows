import Element from './jsx/element'
import ends from './arrow/ends'
import path from './arrow/path'
import { DIRECTION } from './consts'

const arrow = ({ from, to }) => {
  const arrow = path(ends(from), ends(to))
  const node = (
    <svg style={{ top: arrow.offset.y, left: arrow.offset.x, fill: '#123456', position: 'absolute' }} width="650" height="400">
      <path d={arrow.points} stroke="black" fill="transparent"/>
    </svg>
  )

  document.body.appendChild(node)
}

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
