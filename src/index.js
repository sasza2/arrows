const xmlns = "http://www.w3.org/2000/svg"

const Arrows = {
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

const test = (
  <svg width="190" height="160">
    <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  </svg>
)


window.addEventListener('load', () => {
  document.body.appendChild(test)
})
