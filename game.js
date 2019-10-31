"use strict"

const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 600
let paused = true

// This structure represents the snake as a series of units, each with a position and a direction
// they are travelling in.
// Each frame this structure will be updated, moving each unit in its respective direction, and then
// updating each unit's direction to follow the unit in front of it. The head unit direction will be
// set freely based on user input.
let snake = [
  { x: 13, y: 15, dir: 'east' },
  { x: 14, y: 15, dir: 'east' },
  { x: 15, y: 15, dir: 'east' },
  { x: 16, y: 15, dir: 'east' }
]

// Draw the full snake once at the start of the game
drawFullSnake(snake)

const gameOver = () => {
  paused = true
  const message = document.getElementById('message')
  message.textContent = 'Game Over'
  message.style.display = 'block'
}

// Called once per frame
const update = () => {
  // Don't do anything while the game is paused
  if (paused) return
  // Move each unit in its respective direction
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].dir === 'north')
      snake[i].y++
    if (snake[i].dir === 'east')
      snake[i].x++
    if (snake[i].dir === 'south')
      snake[i].y--
    if (snake[i].dir === 'west')
      snake[i].x--
    // Change unit direction to follow the next unit
    if (i < snake.length - 1) {
      snake[i].dir = snake[i + 1].dir
    }
  }
  // Check if there will be a wall collision
  const head = snake[snake.length - 1]
  if (head.x >= 30 || head.x < 0 || head.y >= 30 || head.y < 0) {
    gameOver()
    return
  }
  // Redraw snake to reflect updates
  drawUpdatedSnake(snake)
}

let gameStarted = false

const startGame = () => {
  document.getElementById('message').style.display = 'none'
  // Update loop - called once every 150 milliseconds
  window.setInterval(() => {
    update()
  }, 100)
  paused = false
  gameStarted = true
}

// Set the head unit's direction based on keyboard input (arrow keys)
document.addEventListener('keydown', event => {
  // Respond to "press any key to start"
  if (!gameStarted) {
    startGame()
  }
  if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'k') {
    if (snake[snake.length - 1].dir != 'south') {
      snake[snake.length - 1].dir = 'north'
    }
  }
  if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'j') {
    if (snake[snake.length - 1].dir != 'north') {
      snake[snake.length - 1].dir = 'south'
    }
  }
  if (event.key == 'ArrowRight' || event.key === 'd' || event.key === 'l') {
    if (snake[snake.length - 1].dir != 'west') {
      snake[snake.length - 1].dir = 'east'
    }
  }
  if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'h') {
    if (snake[snake.length - 1].dir != 'east') {
      snake[snake.length - 1].dir = 'west'
    }
  }
})
