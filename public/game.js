'use strict'

import { Snake } from './snake.js'
import { spawnFood } from './food.js'
import { drawUnit } from './draw.js'

export class Game {
  constructor(ctx) {
    /**
     * @type {Snake}
     */
    this.snake = new Snake()
    /**
     * @type {Food}
     */
    this.food = spawnFood(this.snake)
    /**
     * @type {Boolean}
     */
    this.paused = false
    /**
     * The canvas drawing context the game is rendered on
     */
    this.ctx = ctx

    this.snake.drawAll(ctx)
    drawUnit(ctx, this.food, '#aaa')
  }

  update() {
    if (this.paused) return

    const eating = this.snake.willEat(this.food)
    if (eating) {
      this.food = spawnFood(this.snake)
      drawUnit(this.ctx, this.food, '#aaa')
    }
    this.snake.move(eating)

    this.snake.drawUpdated(this.ctx)
    updateScore(this.snake.length - 3)
  }
}

// function gameOver() {
//   const message = document.getElementById('message')
//   message.textContent = 'Game Over'
// }

function updateScore(score) {
  const scoreView = document.getElementById('score')
  scoreView.textContent = `Score: ${score}`
}

// /**
//  * @param {any} ctx The graphical context
//  * @param {[Unit]} snake The snake
//  * @param {Unit} food The food
//  * @param {[String]} nextDirs A list of queued direction changes
//  * @param {boolean} ateFood Weather the snake ate food last frame
//  * @returns {{snake: [Unit], food: Unit, nextDirs: [String], ateFood: boolean, paused: boolean}}
//  */
// function update(ctx, snake, food, nextDirs, ateFood = false) {

//   // Set the head direction based on user input
//   if (nextDirs.length > 0) {
//     snake[snake.length - 1].dir = nextDirs[0]
//     nextDirs = nextDirs.slice(1)
//   }
//   if (ateFood) {
//     ateFood = false
//     const head = move(snake.last())
//     snake.push(head)
//   } else {
//     // Move each unit in its respective direction
//     for (let i = 0; i < snake.length; i++) {
//       snake[i] = move(snake[i])
//       // Change unit direction to follow the next unit
//       if (i < snake.length - 1) {
//         snake[i].dir = snake[i + 1].dir
//       }
//     }
//   }
//   // Check if there will be a wall collision
//   if (snake.last().x >= 30 || snake.last().x < 0 || snake.last().y >= 30 || snake.last().y < 0) {
//     gameOver()
//     return { snake, food, nextDir: nextDirs, ateFood, paused: true }
//   }
//   // Check if there will be a food collision
//   if (snake.last().x == food.x && snake.last().y == food.y) {
//     ateFood = true
//     food = spawnFood(snake)
//     drawFood(ctx, food)
//     updateScore()
//   }
//   // Check if there will be a snake body collision
//   if (snake.slice(0, -1).some(unit => snake.last().x === unit.x && snake.last().y === unit.y)) {
//     gameOver()
//     return { snake, food, nextDir: nextDirs, ateFood, paused: true }
//   }
//   // Redraw snake to reflect updates
//   drawUpdatedSnake(ctx, snake)
//   return { snake, food, nextDir: nextDirs, ateFood, paused: false }
// }
