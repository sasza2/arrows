import Element from './jsx/element'
import ends from './arrow/ends'
import path from './arrow/path'
import { DIRECTION } from './consts'

const arrow = ({ from, to }) => {
  const arrow = path(ends(from), ends(to))
  const node = (
    <svg style={{ top: arrow.offset.y, left: arrow.offset.x, fill: '#123456', position: 'absolute' }} width={arrow.size.x} height={arrow.size.y}>
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
      translation: [1, -1],
    },
    to: {
      direction: DIRECTION.TOP,
      node: document.getElementById('b'),
      translation: [1, 1]
    },
  })
})
