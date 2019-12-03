import * as Util from './util.js'
import { drawUnit } from './draw.js'
import { Unit } from './unit.js'

const color = '#fff'

export class Snake {
  constructor() {
    /**
     * @type {[Unit]}
     */
    this.body = [
      new Unit(23, 25, 'east'),
      new Unit(24, 25, 'east'),
      new Unit(25, 25, 'east'),
      new Unit(26, 25, 'east')
    ]
    /**
     * @type {[String]}
     */
    this.queuedTurns = []
  }

  /**
   * Move the snake forward one unit
   * @param {Boolean} eating True if the snake is eating during this frame
   */
  move(eating) {
    // Pop off the front of the queued turns list
    // Set the head direction to the popped value
    const dir = this.queuedTurns[0]
    if (dir) {
      this.body[this.body.length - 1].dir = dir
    }

    // Make a copy of the tail, which we will use later if the snake is eating
    const tail = this.body[0]

    // Copy each unit back one space (each unit will take the value of the following position),
    // except for the head.
    for (let i = 0; i < this.body.length - 1; ++i) {
      this.body[i] = this.body[i + 1]
    }
    // Move the head in the direction it is facing
    this.body[this.body.length - 1] = this.nextHead()
    this.queuedTurns.shift()

    // When the snake eats, the head moves forward but the tail stays in the same place.
    // We already moved the tail, but we saved its value before it was moved as `tail`.
    if (eating) {
      this.body.unshift(tail)
    }
  }

  /**
   * @returns {String}
   */
  latestDirection() {
    return this.queuedTurns.length > 0
      ? this.queuedTurns[this.queuedTurns.length - 1]
      : this.body[this.body.length - 1].dir
  }

  nextDirection() {
    return this.queuedTurns.length > 0 ? this.queuedTurns[0] : this.body[this.body.length - 1].dir
  }

  /**
   * @param {String} direction
   */
  queueTurn(direction) {
    if (direction != Util.oppositeDirection(this.latestDirection())) {
      this.queuedTurns.push(direction)
    }
  }

  /**
   * @param {Food} food
   * @returns {Boolean} true if the snake will eat the food next frame
   */
  willEat(food) {
    const head = this.nextHead()
    return head.x === food.x && head.y === food.y
  }

  /**
   * @returns {Unit} The next place head will be
   */
  nextHead() {
    const { x, y } = this.body[this.body.length - 1]
    switch (this.nextDirection()) {
      case 'north':
        return new Unit(x, y + 1, 'north')
      case 'south':
        return new Unit(x, y - 1, 'south')
      case 'east':
        return new Unit(x + 1, y, 'east')
      case 'west':
        return new Unit(x - 1, y, 'west')
    }
  }

  /**
   * @returns {Number} The length of the snake
   */
  length() {
    return this.body.length
  }

  drawAll(ctx) {
    for (let i = 1; i < this.body.length; i++) {
      drawUnit(ctx, this.body[i], color)
    }
  }

  drawUpdated(ctx) {
    // Erase the tail by drawing it in background color
    drawUnit(ctx, this.body[0], Util.backgroundColor)
    // console.log(this.body, this.body[this.body.length - 1])
    drawUnit(ctx, this.body[this.body.length - 1], color)
  }
}
