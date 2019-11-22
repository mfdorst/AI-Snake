'use strict'

export class Unit {
  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {String} dir
   */
  constructor(x, y, dir) {
    /**
     * @type {Number}
     */
    this.x = x
    /**
     * @type {Number}
     */
    this.y = y
    /**
     * @type {String}
     */
    this.dir = dir
  }
}
