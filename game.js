"use strict"

function spawnFood(snake) {
  function randomPoint() {
    return {
      x: Math.floor(Math.random() * 30),
      y: Math.floor(Math.random() * 30)
    }
  }
  outer: while (true) {
    // Generate a random point
    const food = randomPoint()
    // If the point is somewhere inside the snake, generate a new point
    for (const unit of snake) {
      if (unit.x === food.x && unit.y === food.y) continue outer
    }
    return food
  }
}

// Called once per frame
const update = (() => {

  let ateFood = false

  return (ctx, snake, food, nextDir) => {

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
    // Check if there will be a wall collision
    if (head.x >= 30 || head.x < 0 || head.y >= 30 || head.y < 0) {
      // Game over
      const message = document.getElementById('message')
      message.textContent = 'Game Over'
      message.style.display = 'block'
      return true
    }
    // Check if there will be a food collision
    if (head.x == food.x && head.y == food.y) {
      ateFood = true
      food = spawnFood(snake)
      drawFood(ctx, food)
    }

    // Redraw snake to reflect updates
    drawUpdatedSnake(ctx, snake)
    return false
  }
})()
