window.addEventListener('load', function(){
  const types = {
    'diamond': {},
    'dot': {},
    'image': { 
      src: './../../docs/npm.png',
      width: 30,
      height: 20,
    },
    'inv': {},
    'none': {},
    'normal': {},
    'thin': {},
    'vee': {},
  }

  for (func in types) {
    const head = Object.assign({}, { func: func }, types[func])
    const arrowProps = {
      className: 'arrow',
      from: {
        node: document.querySelectorAll('.point-from-' + func)[0],
        direction: 'top',
        translation: [0, -1],
      },
      to: {
        node: document.querySelectorAll('.point-to-' + func)[0],
        direction: 'top',
        translation: [0, 1],
      },
      head: head,
    }

    arrow = arrowCreate(arrowProps)
    document.body.appendChild(arrow.node)
  }
})
