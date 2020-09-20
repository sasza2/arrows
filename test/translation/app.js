window.addEventListener('load', function(){
  const elements = Array.from(document.querySelectorAll('.el'))

  elements.reduce((prevNode, currNode) => {
    const arrowProps = {
      className: 'arrow',
      from: {
        node: prevNode,
        direction: 'right',
        translation: [0.25, 1]
      },
      to: {
        node: currNode,
        direction: 'left',
        translation: [-0.25, 1]
      },
    }

    arrow = arrowCreate(arrowProps)
    document.body.appendChild(arrow.node)

    return currNode
  })
})
