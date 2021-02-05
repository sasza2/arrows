window.addEventListener('load', function(){
  const container = document.querySelector('#container')

  const dots = []
  for (let i = 0; i < 60; i++) {
    const dot = document.createElement('div')
    dot.className = 'dot'
    dot.setAttribute('id', 'dot-' + i)
    container.appendChild(dot)
    dots[i] = dot
  }

  let arrow, from = -1, to = -1

  function arrowCreateBetweenPoints () {
    if (arrow) arrow.clear()

    if (from >= 0) dots[from].className = 'dot'
    if (to >= 0) dots[to].className = 'dot'

    from = parseInt(Math.random() * dots.length)
    to = parseInt(Math.random() * dots.length)

    dots[from].className = 'dot dot--selected'
    dots[to].className = 'dot dot--selected'

    arrow = arrowCreate({
      from: () => document.getElementById('dot-' + from),
      to: () => document.getElementById('dot-' + to),
      head: 'thin',
    })

    document.body.appendChild(arrow.node)
  }

  setInterval(arrowCreateBetweenPoints, 1000)
})
