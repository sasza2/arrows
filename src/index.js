const Arrows = {
  createElement: (tagName, attributes, children) => {
    const node = document.createElement(tagName)
    for(const key in attributes) node.setAttribute(key, attributes[key])

    if(children instanceof Object) node.appendChild(children)
    else node.innerHTML = children

    return node
  }
}

const test = <svg><path x={5} /></svg>

console.log(test)