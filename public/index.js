// Entry point. Sets initial state, and listens for keyboard input.
document.addEventListener('keydown', (() => {
  const ctx = (() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 600
    return ctx
  })()

  let nextDirs = []
  let snake = [
    { x: 13, y: 15, dir: 'east' },
    { x: 14, y: 15, dir: 'east' },
    { x: 15, y: 15, dir: 'east' },
    { x: 16, y: 15, dir: 'east' }
  ]
  
  let food = spawnFood(snake)

  drawFood(ctx, food)
  drawFullSnake(ctx, snake)

  let gameStarted = false
  let paused = true

  return event => {
    // Respond to "press any key to start"
    if (!gameStarted) {
      // Start game
      paused = false
      let ateFood = false
      document.getElementById('message').textContent = ''
      // Update loop - calls update() repeatedly while game is not paused
      window.setInterval(() => {
        if (!paused) {
          ({ snake, food, nextDir: nextDirs, ateFood, paused } = update(ctx, snake, food, nextDirs, ateFood))
        }
      }, 100)

      gameStarted = true
    }
    function newestDir() {
      return nextDirs.length > 0 ? nextDirs.last() : snake.last().dir
    }
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'k') {
      if (newestDir() != 'south') {
        nextDirs.push('north')
      }
    }
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'j') {
      if (newestDir() != 'north') {
        nextDirs.push('south')
      }
    }
    if (event.key == 'ArrowRight' || event.key === 'd' || event.key === 'l') {
      if (newestDir() != 'west') {
        nextDirs.push('east')
      }
    }
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'h') {
      if (newestDir() != 'east') {
        nextDirs.push('west')
      }
    }
  }
})())
