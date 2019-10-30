"use strict"

const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 600

let snake = [
  { x: 13, y: 15, dir: 'east', tail: true },
  { x: 14, y: 15, dir: 'east' },
  { x: 15, y: 15, dir: 'east' },
  { x: 16, y: 15, dir: 'east' }
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
    if (i < snake.length - 1) {
      snake[i].dir = snake[i + 1].dir
    }
  }
}

window.setInterval(() => {
  update()
}, 150)

document.addEventListener('keydown', event => {
  if (event.key == 'ArrowUp')
    if (snake[snake.length - 1].dir != 'south')
      snake[snake.length - 1].dir = 'north'
  if (event.key === 'ArrowDown')
    if (snake[snake.length - 1].dir != 'north')
      snake[snake.length - 1].dir = 'south'
  if (event.key == 'ArrowRight')
    if (snake[snake.length - 1].dir != 'west')
      snake[snake.length - 1].dir = 'east'
  if (event.key === 'ArrowLeft')
    if (snake[snake.length - 1].dir != 'east')
      snake[snake.length - 1].dir = 'west'
})
