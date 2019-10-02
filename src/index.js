import flatten from 'lodash/flatten'
import isNumber from 'lodash/isNumber'

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

const arrow = ({ from, to }) => {
  const paths = ['M']

  const fromRect = from.getBoundingClientRect()
  const toRect = to.getBoundingClientRect()
  paths.push([fromRect.left, fromRect.top])
  paths.push('C')
  paths.push([fromRect.left, fromRect.top])
  paths.push(',')
  paths.push([toRect.left, toRect.top])
  paths.push(',')
  paths.push([toRect.left, toRect.top])

  const pathAttribute = flatten(paths).join(' ').replace(/ ,/g, ',')

  const node = (
    <svg style={{ top: 50, left: 100, fill: '#123456' }} width="650" height="400">
      <path d={pathAttribute} stroke="black" fill="transparent"/>
    </svg>
  )

  document.body.appendChild(node)
}

window.addEventListener('load', () => {
  arrow({
    from: document.getElementById('a'),
    to: document.getElementById('b'),
  })
})
