import { Game } from './game.js'

const ai = true

// Get the canvas graphics context, and start a new game
const game = new Game(
  (() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 600
    return ctx
  })(),
  ai
)

if (ai) {
  window.setInterval(() => {
    game.update()
  }, 50)
} else {
  let gameStarted = false

  document.addEventListener('keydown', event => {
    // Run once, the first time a key is pressed
    if (!gameStarted) {
      gameStarted = true
      document.getElementById('message').textContent = ''

      // Start the update loop
      window.setInterval(() => {
        game.update()
      }, 100)
    }

    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'k') {
      game.snake.queueTurn('north')
    }
    if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'j') {
      game.snake.queueTurn('south')
    }
    if (event.key == 'ArrowRight' || event.key === 'd' || event.key === 'l') {
      game.snake.queueTurn('east')
    }
    if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'h') {
      game.snake.queueTurn('west')
    }
  })
}
