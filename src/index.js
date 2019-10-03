import Element from './element'
import { path, ends } from './path'
import { DIRECTION } from './consts'

const arrowSvg = ({ from, to }) => {
  const node = (
    <svg style={{ top: 50, left: 100, fill: '#123456' }} width="650" height="400">
      <path d={path(from, to)} stroke="black" fill="transparent"/>
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
