import { FastPriorityQueue } from './FastPriorityQueue.js'
import { drawUnit } from './draw.js'

export class Node {
  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} gCost
   * @param {Number} fCost
   */
  constructor(x, y, gCost, fCost) {
    this.x = x
    this.y = y
    this.gCost = gCost
    this.fCost = fCost
  }
}

/**
 * @typedef {Object} GridSquare
 * @property {Boolean} traversable
 */

/**
 *
 * @param {Node} start
 * @param {Node} goal
 * @param {[[GridSquare]]} grid
 * @param {*} ctx
 * @returns {String} The direction the snake should go to get to the food. E.g. 'north'.
 */
export function aStar(start, goal, grid, ctx) {
  const unchecked = new FastPriorityQueue((a, b) => {
    if (a.fCost == b.fCost) {
      return a.gCost > b.gCost
    } else {
      return a.fCost < b.fCost
    }
  })
  let current = new Node(start.x, start.y, 0, hCost(start, goal))

  while (current.x != goal.x || current.y != goal.y) {
    drawUnit(ctx, current, '#4a4')
    // Check all nodes adjacent to current.
    // If the node has not been checked yet, add it to `unchecked`.
    // If the node has been checked, add it to `unchecked` if the new cost is lower than its
    // previous cost.
    // Do not check untraversable nodes.
    const checkAdjacent = (x, y) => {
      if (x < 0 || x >= 30 || y < 0 || y >= 30) return
      if (grid[x][y].traversable) {
        // G cost is the number of steps it takes to get from the start node to a given node.
        const gCost = current.gCost + 1
        // F cost is the best lower-bound estimate for the cost of the path which passes through
        // a given node. It is the sum of the G cost and H cost.
        const fCost = hCost({ x, y }, goal) + gCost

        if (!grid[x][y].fCost || fCost < grid[x][y].fCost) {
          grid[x][y].gCost = gCost
          grid[x][y].fCost = fCost
          grid[x][y].previous = current
          unchecked.add(new Node(x, y, gCost, fCost))
          drawUnit(ctx, { x, y }, '#44a')
        }
      }
    }
    checkAdjacent(current.x - 1, current.y)
    checkAdjacent(current.x + 1, current.y)
    checkAdjacent(current.x, current.y - 1)
    checkAdjacent(current.x, current.y + 1)
    current = unchecked.poll()
    if (!current) {
      throw new Error('Stuck - there is no path to the food')
    }
  }

  // Retrace steps from goal to start
  let previous
  while (current.x != start.x || current.y != start.y) {
    drawUnit(ctx, current, '#ee0')
    previous = current
    current = grid[current.x][current.y].previous
  }
  drawUnit(ctx, previous, '#f84')
  if (previous.x > current.x) {
    return 'east'
  }
  if (previous.x < current.x) {
    return 'west'
  }
  if (previous.y > current.y) {
    return 'north'
  }
  if (previous.y < current.y) {
    return 'south'
  }
  throw new Error("Shouldn't get here, there's something wrong.")
}

/**
 * H cost is a heuristic lower-bound cost for the path from a given node to the goal node.
 * In this case it is the shortest path to the goal node assuming no obstacles.
 * @param {Node} node
 * @param {Node} goal
 * @returns {Number}
 */
export function hCost(node, goal) {
  return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y)
}
