"use strict"

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
    if (snake.some(unit => { return unit.x === food.x && unit.y === food.y })) {
      continue
    }
    return food
  }
}

function gameOver() {
  const message = document.getElementById('message')
    message.textContent = 'Game Over'
    message.style.display = 'block'
}

/**
 * @param {any} ctx The graphical context
 * @param {[Unit]} snake The snake
 * @param {Unit} food The food
 * @param {String} nextDir The next direction the snake should move in
 * @param {boolean} ateFood Weather the snake ate food last frame
 * @returns {{snake: [Unit], food: Unit, nextDir: String, ateFood: boolean, paused: boolean}}
 */
function update(ctx, snake, food, nextDir, ateFood = false) {
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
  let head = snake[snake.length - 1]
  // Set the head direction based on user input
  head.dir = nextDir
  if (ateFood) {
    ateFood = false
    head = move(head)
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
  head = snake[snake.length - 1]
  // Check if there will be a wall collision
  if (head.x >= 30 || head.x < 0 || head.y >= 30 || head.y < 0) {
    gameOver()
    return { snake, food, nextDir, ateFood, paused: true }
  }
  // Check if there will be a food collision
  if (head.x == food.x && head.y == food.y) {
    ateFood = true
    food = spawnFood(snake)
    drawFood(ctx, food)
  }
  // Check if there will be a snake body collision
  if (snake.slice(0, -1).some(unit => head.x === unit.x && head.y === unit.y)) {
    gameOver()
    return { snake, food, nextDir, ateFood, paused: true }
  }

  // Redraw snake to reflect updates
  drawUpdatedSnake(ctx, snake)
  return { snake, food, nextDir, ateFood, paused: false }
}
