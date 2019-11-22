'use strict'

function spawnFood(snake) {
  function randomPoint() {
    return {
      x: Math.floor(Math.random() * 30),
      y: Math.floor(Math.random() * 30)
    }
  }
  while (true) {
    const food = randomPoint()

    // If the food spawned inside of snake, go back and re-spawn
    if (
      snake.some(unit => {
        return unit.x === food.x && unit.y === food.y
      })
    ) {
      continue
    }
    return food
  }
}

/**
 * @param {any} ctx The graphical context
 * @param {[Unit]} snake The snake
 * @param {Unit} food The food
 * @param {[String]} nextDirs A list of queued direction changes
 * @param {boolean} ateFood Weather the snake ate food last frame
 * @returns {{snake: [Unit], food: Unit, nextDirs: [String], ateFood: boolean, paused: boolean}}
 */
function update(ctx, snake, food, nextDirs, ateFood = false) {
  function move(unit) {
    const x = unit.x
    const y = unit.y
    const dir = unit.dir
    if (dir === 'north') {
      return { x, y: y + 1, dir }
    }
    if (dir === 'south') {
      return { x, y: y - 1, dir }
    }
    if (dir === 'east') {
      return { x: x + 1, y, dir }
    }
    if (dir === 'west') {
      return { x: x - 1, y, dir }
    }
  }
  function gameOver() {
    const message = document.getElementById('message')
    message.textContent = 'Game Over'
  }
  function updateScore() {
    const score = document.getElementById('score')
    score.textContent = `Score: ${snake.length - 3}`
  }

  // Set the head direction based on user input
  if (nextDirs.length > 0) {
    snake[snake.length - 1].dir = nextDirs[0]
    nextDirs = nextDirs.slice(1)
  }
  if (ateFood) {
    ateFood = false
    const head = move(snake.last())
    snake.push(head)
  } else {
    // Move each unit in its respective direction
    for (let i = 0; i < snake.length; i++) {
      snake[i] = move(snake[i])
      // Change unit direction to follow the next unit
      if (i < snake.length - 1) {
        snake[i].dir = snake[i + 1].dir
      }
    }
  }
  // Check if there will be a wall collision
  if (snake.last().x >= 30 || snake.last().x < 0 || snake.last().y >= 30 || snake.last().y < 0) {
    gameOver()
    return { snake, food, nextDir: nextDirs, ateFood, paused: true }
  }
  // Check if there will be a food collision
  if (snake.last().x == food.x && snake.last().y == food.y) {
    ateFood = true
    food = spawnFood(snake)
    drawFood(ctx, food)
    updateScore()
  }
  // Check if there will be a snake body collision
  if (snake.slice(0, -1).some(unit => snake.last().x === unit.x && snake.last().y === unit.y)) {
    gameOver()
    return { snake, food, nextDir: nextDirs, ateFood, paused: true }
  }
  // Redraw snake to reflect updates
  drawUpdatedSnake(ctx, snake)
  return { snake, food, nextDir: nextDirs, ateFood, paused: false }
}
