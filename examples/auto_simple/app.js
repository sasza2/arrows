window.addEventListener('load', function () {
  const arrow = arrowCreate({
    from: document.querySelector('.el-1'),
    to: document.querySelector('.el-2'),
  })

  document.body.appendChild(arrow.node)
})
