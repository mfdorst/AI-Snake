"use strict"

const unitSize = 20
const backgroundColor = "#111"
const snakeColor = "#aaa"

const drawUnit = (unit, color) => {
  ctx.fillStyle = color
  ctx.fillRect(unit.x * unitSize, (29 - unit.y) * unitSize, unitSize, unitSize)
}

const drawSnake = (snake) => {
  // Erase the tail by drawing it in background color
  drawUnit(snake[0], backgroundColor)
  for (let i = 1; i < snake.length; i++)
  {
    drawUnit(snake[i], snakeColor)
  }
}
