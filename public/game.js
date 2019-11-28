import { Snake } from './snake.js'
import { spawnFood } from './food.js'
import { drawUnit, boardSize, unitSize } from './draw.js'
import { aStar } from './a_star.js'
import { FillStrategy } from './fill_strategy.js'

const foodColor = '#a44'

export class Game {
  /**
   *
   * @param {*} ctx
   * @param {Boolean} ai Specifies whether a human or an AI is playing the game.
   */
  constructor(ctx, ai) {
    this.snake = new Snake()
    this.food = spawnFood(this.snake)
    this.paused = false
    this.ctx = ctx
    this.ai = ai
    this.showPathfinding = false
    this.fillStrategy = null

    try {
      const bestHeading = aStar(
        this.snake.body[this.snake.body.length - 1],
        this.food,
        makeGrid(this.snake),
        this.ctx,
        this.showPathfinding
      )
      if (this.ai) {
        this.snake.queueTurn(bestHeading)
      }
    } catch (ignore) {}
    drawUnit(ctx, this.food, foodColor)
    this.snake.drawAll(ctx)
  }

  update() {
    if (this.paused) return

    // Check if there will be a collision
    const nextHead = this.snake.nextHead()
    if (nextHead.x >= boardSize || nextHead.x < 0 || nextHead.y >= boardSize || nextHead.y < 0) {
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
    try {
      const bestHeading = aStar(
        this.snake.body[this.snake.body.length - 1],
        this.food,
        makeGrid(this.snake),
        this.ctx,
        this.showPathfinding
      )
      if (this.ai) {
        this.snake.queueTurn(bestHeading)
        this.fillStrategy = null
      }
    } catch (e) {
      drawUnit(this.ctx, this.food, foodColor)
      this.snake.drawAll(this.ctx)
      if (this.ai) {
        if (!this.fillStrategy) {
          this.fillStrategy = new FillStrategy()
        }
        this.fillStrategy.nextDirection(this.snake, makeGrid(this.snake))
      }
    }

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
  const grid = new Array(boardSize)
    .fill(null)
    .map(() => new Array(boardSize).fill(null).map(() => ({ traversable: true })))

  for (const { x, y } of snake.body) {
    grid[x][y].traversable = false
  }
  return grid
}
