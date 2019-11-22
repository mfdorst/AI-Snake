'use strict'

import { Unit } from './unit.js'
import { drawUnit } from './draw.js'

// export class Food {
//   constructor(snake) {
//     do {
//       ;[
//         /**
//          * @type {Number}
//          */
//         this.x,
//         /**
//          * @type {Number}
//          */
//         this.y
//       ] = randomPoint()
//     } while (snake.body.some(unit => unit.x === this.x && unit.y === this.y))
//   }

//   draw(ctx) {
//     drawUnit(ctx, this, '#aaa')
//   }
// }

/**
 * Spawn a food somewhere on screen which does not intersect with `snake`
 * @param {Snake} snake
 */
export function spawnFood(snake) {
  function randomPoint() {
    return new Unit(Math.floor(Math.random() * 30), Math.floor(Math.random() * 30))
  }
  let x, y
  do {
    const point = randomPoint()
    x = point.x
    y = point.y
  } while (snake.body.some(unit => unit.x === x && unit.y === y))
  return new Unit(x, y)
}
