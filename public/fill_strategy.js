import { Unit } from './unit.js'
import { drawUnit } from './draw.js'

export class FillStrategy {
  constructor() {
    this.directionPicked = false
  }

  /**
   * @typedef {Object} Unit
   * @property {Number} x
   * @property {Number} y
   * @property {String} dir
   */

  /**
   * @typedef {Object} GridSquare
   * @property {Boolean} traversable
   */

  /**
   * @param {Unit} head
   * @param {[[GridSquare]]} grid
   */
  nextDirection(snake, grid, ctx) {
    const { x, y, dir } = snake.body[snake.body.length - 1]
    if (x >= 0 && x < 30 && y >= 0 && y < 30 && grid[x][y].traversable) {
      return dir
    } else {
      // Figure out which way to turn
      let right, left
      if (dir == 'north') {
        right = new Unit(x + 1, y, 'east')
        left = new Unit(x - 1, y, 'west')
      }
      if (dir == 'east') {
        right = new Unit(x, y - 1, 'south')
        left = new Unit(x, y + 1, 'north')
      }
      if (dir == 'south') {
        right = new Unit(x - 1, y, 'west')
        left = new Unit(x + 1, y, 'east')
      }
      if (dir == 'west') {
        right = new Unit(x, y + 1, 'north')
        left = new Unit(x, y - 1, 'south')
      }
      // Find out how many open squares are to the left and to the right

      const checkSide = side => {
        if (
          side.x < 0 ||
          side.x >= 30 ||
          side.y < 0 ||
          side.y >= 30 ||
          !grid[side.x][side.y].traversable
        )
          return 0

        let unchecked = [side]
        let traversable = 0
        while (unchecked.length > 0) {
          const current = unchecked.pop()
          traversable += 1

          const checkAdjacent = (x, y) => {
            // If the node has not been checked yet, add it to `unchecked`.
            // Do not check untraversable nodes.
            if (x < 0 || x >= 30 || y < 0 || y >= 30) return
            if (grid[x][y].traversable) {
              unchecked.push(new Unit(x, y))
              drawUnit(ctx, { x, y }, '#f84')
            }
          }
          checkAdjacent(current.x - 1, current.y)
          checkAdjacent(current.x + 1, current.y)
          checkAdjacent(current.x, current.y - 1)
          checkAdjacent(current.x, current.y + 1)
        }
        return traversable
      }

      const leftScore = checkSide(left)
      const rightScore = checkSide(right)

      let nextTurns
      if (rightScore > leftScore) {
        switch (dir) {
          case 'north':
            nextTurns = ['east', 'south']
            break
          case 'east':
            nextTurns = ['south', 'west']
            break
          case 'south':
            nextTurns = ['west', 'north']
            break
          case 'west':
            nextTurns = ['north', 'east']
            break
          default:
            throw new Error("Shouldn't get here. Something went wrong.")
        }
      } else {
        switch (dir) {
          case 'north':
            nextTurns = ['west', 'south']
            break
          case 'west':
            nextTurns = ['south', 'east']
            break
          case 'south':
            nextTurns = ['east', 'north']
            break
          case 'east':
            nextTurns = ['north', 'west']
            break
          default:
            throw new Error("Shouldn't get here. Something went wrong.")
        }
      }
      this.rightTurnNext = !this.rightTurnNext
      snake.queueTurn(nextTurns[0])
      snake.queueTurn(nextTurns[1])
    }
  }
}
