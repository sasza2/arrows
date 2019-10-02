import flatten from 'lodash/flatten'

const xmlns = "http://www.w3.org/2000/svg"

export const Arrows = {
  createElement: (tagName, attributes, children) => {
    const node = document.createElementNS(xmlns, tagName)
    for(const key in attributes){
      const value = attributes[key]
      node.setAttributeNS(null, key, value)
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
    <svg style={{ top: 100 }} width="650" height="400">
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
