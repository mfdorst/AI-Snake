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
const togglePlayPauseButton = document.getElementById('toggle-play-pause')
const toggleAIButton = document.getElementById('toggle-ai')
const nextFrameButton = document.getElementById('next-frame')

function setPathfinding(showPathfinding) {
  game.showPathfinding = showPathfinding
  const showOrHide = showPathfinding ? 'Hide' : 'Show'
  togglePathfindingButton.textContent = showOrHide + ' pathfinding'
}

function setPaused(paused) {
  game.paused = paused
  if (paused) {
    togglePlayPauseButton.textContent = 'Play'
    nextFrameButton.disabled = false
  } else {
    togglePlayPauseButton.textContent = 'Pause'
    nextFrameButton.disabled = true
  }
}

let updateTimer

function setAI(ai) {
  game.ai = ai
  window.clearInterval(updateTimer)
  // Get rid of any queued turns
  game.snake.queuedTurns = []
  if (ai) {
    updateTimer = window.setInterval(() => game.update(), 25)
    toggleAIButton.textContent = 'Human'
  } else {
    updateTimer = window.setInterval(() => game.update(), 100)
    toggleAIButton.textContent = 'AI'
  }
}

setPathfinding(game.showPathfinding)
setPaused(game.paused)
setAI(game.ai)

togglePathfindingButton.addEventListener('click', () => {
  togglePathfindingButton.blur()
  setPathfinding(!game.showPathfinding)
})

togglePlayPauseButton.addEventListener('click', () => {
  togglePlayPauseButton.blur()
  setPaused(!game.paused)
})

toggleAIButton.addEventListener('click', () => {
  toggleAIButton.blur()
  setAI(!game.ai)
})

nextFrameButton.addEventListener('click', () => {
  nextFrameButton.blur()
  game.update(true)
})

document.addEventListener('keydown', event => {
  if (event.key === ' ') {
    setPaused(!game.paused)
  }
  if (event.key === 'h') {
    setAI(!game.ai)
  }
  if (event.key === 'f' && game.paused) {
    game.update(true)
  }
  if (!game.ai) {
    if (event.key === 'ArrowUp' || event.key === 'w') {
      game.snake.queueTurn('north')
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
      game.snake.queueTurn('south')
    }
    if (event.key == 'ArrowRight' || event.key === 'd') {
      game.snake.queueTurn('east')
    }
    if (event.key === 'ArrowLeft' || event.key === 'a') {
      game.snake.queueTurn('west')
    }
  }
})
