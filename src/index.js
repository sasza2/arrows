import flatten from 'lodash/flatten'
import isNumber from 'lodash/isNumber'

import position from './position'
import { DIRECTION } from './consts'

const xmlns = "http://www.w3.org/2000/svg"

export const Arrows = {
  createStyle: (value) => {
    const style = Object.entries(value).reduce((prev, [key, value]) => {
      if(isNumber(value)) return `${key}: ${value}px; ${prev}`
      return `${key}: ${value}; ${prev}`
    }, '')
    return style.endsWith('; ') ? style.substring(0, style.length - 2) : style
  },
  createAttribute: (key, value) => {
    if(key === 'style') return Arrows.createStyle(value)
    return value
  },
  createElement: (tagName, attributes, children) => {
    const node = document.createElementNS(xmlns, tagName)
    for(const key in attributes){
      const value = attributes[key]
      node.setAttributeNS(null, key, Arrows.createAttribute(key, value))
    }

    if(children){
      if(children instanceof Object) node.appendChild(children)
      else node.innerHTML = children
    }

    return node
  }
}

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
