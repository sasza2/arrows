window.addEventListener('load', function(){
  const labels = document.querySelectorAll('.label')

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
    onChange: ({ getPointXY }) => {
      labels.forEach(function(label) {
        const position = getPointXY(parseFloat(label.getAttribute('data-distance')))
        label.style.top = position.y + 'px'
        label.style.left = position.x + 'px'
        if (label.getAttribute('data-rotate')) {
          label.style.transform = 'rotate(' + position.degree + 'deg)'
        }
      })
    }
  }

  arrow = arrowCreate(arrowProps)
  document.body.appendChild(arrow.node)
})
