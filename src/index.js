const xmlns = "http://www.w3.org/2000/svg"

export const Arrows = {
  createElement: (tagName, attributes, children) => {
    const node = document.createElementNS(xmlns, tagName)
    for(const key in attributes) node.setAttributeNS(null, key, attributes[key])

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

  const test = (
    <svg width="190" height="160">
      <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
    </svg>
  )
}

window.addEventListener('load', () => {
  arrow({
    from: document.getElementById('a'),
    to: document.getElementById('b'),
  })
})
