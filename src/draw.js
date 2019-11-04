"use strict"

const unitSize = 20
const backgroundColor = "#111"
const snakeColor = "#aaa"
const foodColor = "#aaa"

// Draws an individual unit of the snake in the color specified
function drawUnit(ctx, unit, color) {
  ctx.fillStyle = color
  ctx.fillRect(unit.x * unitSize, (29 - unit.y) * unitSize, unitSize, unitSize)
}

// Draws the new head and erases the old tail. The middle of the snake does not change between
// frames, so drawing the snake can be simplified this way.
function drawUpdatedSnake(ctx, snake) {
  // Erase the tail by drawing it in background color
  drawUnit(ctx, snake[0], backgroundColor)
  drawUnit(ctx, snake[snake.length - 1], snakeColor)
}

// Called only once at the beginning to draw the full snake body
function drawFullSnake (ctx, snake) {
  for (let i = 1; i < snake.length; i++) {
    drawUnit(ctx, snake[i], snakeColor)
  }
}

function drawFood(ctx, food) {
  drawUnit(ctx, food, foodColor)
}
