window.addEventListener('load', function(){
  const arrowProps = {
    className: 'arrow',
    from: {
      node: document.getElementById('from'),
      direction: 'top',
      translation: [-0.5, -1],
    },
    to: {
      node: document.getElementById('to'),
      direction: 'top',
      translation: [0.9, 1],
    },
  }

  function update(){
    const rand = function(){
      return Math.random() * 500 + 'px'
    }
    arrowProps.from.node.style.left = rand();
    arrowProps.from.node.style.top = rand();
    arrowProps.to.node.style.left = rand();
    arrowProps.to.node.style.top = rand();
  }

  update();

  arrow = arrowCreate(arrowProps)
  console.log(arrowProps)
  console.log(arrow)
  document.body.appendChild(arrow)
})
