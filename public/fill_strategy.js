export class FillStrategy {
  constructor() {
    this.rightTurnNext = true
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
  nextDirection(snake, grid) {
    let nextTurns
    const dir = snake.body[snake.body.length - 1].dir
    if (this.rightTurnNext) {
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

    const { x, y } = snake.nextHead()
    if (x >= 0 && x < 30 && y >= 0 && y < 30 && grid[x][y].traversable) {
      return dir
    } else {
      this.rightTurnNext = !this.rightTurnNext
      snake.queueTurn(nextTurns[0])
      snake.queueTurn(nextTurns[1])
    }
  }
}
