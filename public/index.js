import { Game } from './game.js'

// Get the canvas graphics context, and start a new game
const game = new Game(
  (() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 600
    return ctx
  })()
)

const togglePathfindingButton = document.getElementById('toggle-pathfinding')
togglePathfindingButton.addEventListener('click', () => {
  togglePathfindingButton.blur()
  game.showPathfinding = !game.showPathfinding
  const showOrHide = game.showPathfinding ? 'Hide' : 'Show'
  togglePathfindingButton.textContent = showOrHide + ' pathfinding'
})

let gameStarted = false

document.addEventListener('keydown', event => {
  if (!gameStarted) {
    gameStarted = true
    document.getElementById('message').textContent = ''
  }
  if (event.key === ' ') {
    game.paused = !game.paused
  }
  if (!game.ai) {
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
  }
})

let updateTimer = window.setInterval(() => game.update(), 100)

const toggleAIButton = document.getElementById('toggle-ai')

toggleAIButton.addEventListener('click', () => {
  game.ai = !game.ai
  toggleAIButton.blur()
  window.clearInterval(updateTimer)
  if (game.ai) {
    updateTimer = window.setInterval(() => game.update(), 25)
    toggleAIButton.textContent = 'Human'
  } else {
    updateTimer = window.setInterval(() => game.update(), 100)
    toggleAIButton.textContent = 'AI'
  }
})

const togglePlayPauseButton = document.getElementById('toggle-play-pause')

togglePlayPauseButton.addEventListener('click', () => {
  game.paused = !game.paused
  togglePlayPauseButton.blur()
  if (game.paused) {
    togglePlayPauseButton.textContent = 'Play'
  } else {
    togglePlayPauseButton.textContent = 'Pause'
  }
})
