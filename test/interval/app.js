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
    const translation = function(){
      const once = function(){
        return Math.random() * 2 - 1;
      }
      return [once(), once()]
    }

    arrowProps.from.translation = translation()    
    arrowProps.from.node.style.left = rand();
    arrowProps.from.node.style.top = rand();
    arrowProps.to.translation = translation()
    arrowProps.to.node.style.left = rand();
    arrowProps.to.node.style.top = rand();
  }

  update();
  setInterval(update, 1000);

  arrow = arrowCreate(arrowProps)
  document.body.appendChild(arrow.node)
})
