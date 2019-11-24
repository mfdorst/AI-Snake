import FastPriorityQueue from './FastPriorityQueue.js'

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
    this.fCost = gCost
    this.fCost = fCost
  }
}

export class GridSquare {
  /**
   * @param {Boolean} traversable
   */
  constructor(traversable) {
    this.traversable = traversable
  }
}

/**
 *
 * @param {Node} start
 * @param {Node} end
 * @param {[[GridSquare]]} grid
 */
export function aStar(start, end, grid) {
  const unchecked = new FastPriorityQueue()
  let current = start
  while (current != end) {
    // Check all nodes around current.
    // If the node has not been checked yet, add it to `unchecked`.
    // If the node has been checked, add it to `unchecked` if the new cost is lower than its
    // previous cost.
    // Do not check untraversable nodes.
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if ((i != 0 || j != 0) && grid[i][j].traversable) {
          // G cost is the number of steps it takes to get from the start node to a given node.
          const gCost = current.gCost + 1
          // F cost is the best lower-bound estimate for the cost of the path which passes through
          // a given node. It is the sum of the G cost and H cost.
          const fCost = hCost(grid[i][j]) + gCost

          if (!grid[i][j].fCost || grid[i][j].fCost > fCost) {
            grid[i][j].gCost = gCost
            grid[i][j].fCost = fCost
            unchecked.push(new Node(i, j, gCost, fCost))
          }
        }
      }
    }
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
