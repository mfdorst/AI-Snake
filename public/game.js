import { Snake } from './snake.js'
import { spawnFood } from './food.js'
import { drawUnit } from './draw.js'
import { aStar } from './a_star.js'

const foodColor = '#a44'

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

    aStar(this.snake.body[this.snake.body.length - 1], this.food, makeGrid(this.snake), this.ctx)
    drawUnit(ctx, this.food, foodColor)
    this.snake.drawAll(ctx)
  }

  update() {
    if (this.paused) return

    // Check if there will be a collision
    const nextHead = this.snake.nextHead()
    if (nextHead.x >= 30 || nextHead.x < 0 || nextHead.y >= 30 || nextHead.y < 0) {
      this.gameOver()
      return
    }

    // Check if there will be a snake collision
    if (this.snake.body.slice(0, -1).some(unit => nextHead.x === unit.x && nextHead.y === unit.y)) {
      this.gameOver()
      return
    }

    const eating = this.snake.willEat(this.food)
    if (eating) {
      this.food = spawnFood(this.snake)
      drawUnit(this.ctx, this.food, foodColor)
    }
    this.snake.move(eating)

    this.ctx.clearRect(0, 0, 600, 600)
    aStar(this.snake.body[this.snake.body.length - 1], this.food, makeGrid(this.snake), this.ctx)

    drawUnit(this.ctx, this.food, foodColor)
    this.snake.drawAll(this.ctx)
    this.updateScore(this.snake.body.length - 4)
  }

  gameOver() {
    const message = document.getElementById('message')
    message.textContent = 'Game Over'
    this.paused = true
  }

  updateScore(score) {
    const scoreView = document.getElementById('score')
    scoreView.textContent = `Score: ${score}`
  }
}

/**
 * @param {Snake} snake
 */
function makeGrid(snake) {
  const grid = new Array(30)
    .fill(null)
    .map(() => new Array(30).fill(null).map(() => ({ traversable: true })))

  for (const { x, y } of snake.body) {
    grid[x][y].traversable = false
  }
  return grid
}
