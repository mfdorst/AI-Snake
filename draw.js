"use strict"

const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 600

const unitSize = 20
const rows = 30
const cols = 30
const backgroundColor = "#111"
const snakeColor = "#aaa"

let snake = [
  { x: 13, y: 15, dir: 'east', tail: true },
  { x: 14, y: 15, dir: 'east' },
  { x: 15, y: 15, dir: 'east' },
  { x: 16, y: 15, dir: 'east'}
]

const update = () => {
  drawSnake(snake)
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
    if (i < snake.length - 1)
    {
      snake[i].dir = snake[i+1].dir
    }
  }
}

const drawUnit = (unit, color) => {
  ctx.fillStyle = color
  ctx.fillRect(unit.x * unitSize, (29 - unit.y) * unitSize, unitSize, unitSize)
}

const drawSnake = (snake) => {
  snake.forEach(unit => {
    if (unit.tail) {
      // Erase the tail by drawing it in background color
      drawUnit(unit, backgroundColor)
    }
    else {
      drawUnit(unit, snakeColor)
    }
  })
}

window.setInterval(() => {
  update()
}, 150)

document.addEventListener('keydown', event => {
  if (event.key == 'ArrowUp') {
    snake[snake.length - 1].dir = 'north'
  }
  if (event.key === 'ArrowDown') {
    snake[snake.length - 1].dir = 'south'
  }
  if (event.key == 'ArrowRight') {
    snake[snake.length - 1].dir = 'east'
  }
  if (event.key === 'ArrowLeft') {
    snake[snake.length - 1].dir = 'west'
  }
})
