export class Node {
  /**
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

/**
 * @param {Node} a
 * @param {Node} b
 * @returns {Number}
 */
export function heuristicCost(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

/**
 * @param {Node} node The node to comptue the F cost for
 * @param {Node} start The starting node
 * @param {Node} end The goal node
 */
export function fCost(node, start, end) {
  return heuristicCost(start, node) + heuristicCost(node, end)
}
