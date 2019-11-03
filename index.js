// Entry point. Sets initial state, and listens for keyboard input.
document.addEventListener('keydown', (() => {
  const ctx = (() => {
    const canvas = document.querySelector('.canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 600
    return ctx
  })()

  let nextDir = 'east'
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
      document.getElementById('message').style.display = 'none'
      // Update loop - calls update() repeatedly while game is not paused
      window.setInterval(() => {
        if (!paused) {
          ({ snake, food, nextDir, ateFood, paused } = update(ctx, snake, food, nextDir, ateFood))
        }
      }, 100)

      gameStarted = true
    }

    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'k') {
      if (snake[snake.length - 1].dir != 'south') {
        nextDir = 'north'
      }
    }
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'j') {
      if (snake[snake.length - 1].dir != 'north') {
        nextDir = 'south'
      }
    }
    if (event.key == 'ArrowRight' || event.key === 'd' || event.key === 'l') {
      if (snake[snake.length - 1].dir != 'west') {
        nextDir = 'east'
      }
    }
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'h') {
      if (snake[snake.length - 1].dir != 'east') {
        nextDir = 'west'
      }
    }
  }
})())
