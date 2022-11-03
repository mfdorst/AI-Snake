import { Unit } from './unit.js'
import { boardSize } from './draw.js'

/**
 * Spawn a food somewhere on screen which does not intersect with `snake`
 * @param {Snake} snake
 */
export function spawnFood(snake) {
  function randomPoint() {
    return new Unit(Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize))
  }
  let x, y
  do {
    const point = randomPoint()
    x = point.x
    y = point.y
  } while (snake.body.some(unit => unit.x === x && unit.y === y))
  return new Unit(x, y)
}
