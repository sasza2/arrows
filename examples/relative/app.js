window.addEventListener('load', function(){
  const elements = Array.from(document.querySelectorAll('.el'))

  elements.reduce((prevNode, currNode) => {
    const arrowProps = {
      className: 'arrow',
      from: {
        node: prevNode,
        direction: 'right',
        translation: [0.25, 0.5]
      },
      to: {
        node: currNode,
        direction: 'left',
        translation: [-0.25, 0.5]
      },
    }

    const mainNode = document.querySelector('#main')

    arrow = arrowCreate(arrowProps)
    mainNode.appendChild(arrow.node)

    return currNode
  })
})
