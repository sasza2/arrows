window.addEventListener('load', function(){
  arrow = arrowCreate({
    from: {
      node: document.getElementById('from'),
      direction: 'bottom',
      translation: [0.3, 1],
    },
    to: {
      node: document.getElementById('to'),
      direction: 'bottom',
      translation: [0, 2.3],
    },
    head: [
      'vee',
      {
        func: 'dot',
        distance: 0.3
      },
      {
        func: 'diamond',
        distance: 0.7
      },
    ],
  })

  document.body.appendChild(arrow.node)
})
