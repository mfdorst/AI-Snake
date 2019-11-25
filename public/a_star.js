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
 */
export function aStar(start, goal, grid, ctx) {
  const unchecked = new FastPriorityQueue((a, b) =>
    a.fCost == b.fCost ? a.gCost < b.gCost : a.fCost < b.fCost
  )
  let current = new Node(start.x, start.y, 0, hCost(start, goal))

  while (current.x != goal.x || current.y != goal.y) {
    drawUnit(ctx, current, '#484')
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
  }
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
