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
    'custom': {
      func: ({ size }) => { // all passed props from head
        const SVG_NS = 'http://www.w3.org/2000/svg';
        const node = document.createElementNS(SVG_NS, 'rect');

        const offset = - size / 2

        node.setAttributeNS(null, 'x', offset)
        node.setAttributeNS(null, 'y', offset)
        node.setAttributeNS(null, 'width', size)
        node.setAttributeNS(null, 'height', size)
        node.style.fill = 'red'

        return {
          node,
          width: size,
          height: size,
        }
      },
      size: 12,
    },
    'custom-2': {
      func: ({ size }) => {
        const offset = - size / 2

        return {
          node: '<rect style="fill: green" x="' + offset + '" y="' + offset + '" width="' + size + '" height="' + size + '" />',
          width: size,
          height: size,
        }
      },
      size: 12,
    }
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
