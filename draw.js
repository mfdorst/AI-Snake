export const boardSize = 50
export const unitSize = 600 / boardSize

/**
 * @param {*} ctx
 * @param {Unit} unit
 * @param {String} color
 */
export function drawUnit(ctx, unit, color) {
  ctx.fillStyle = color
  ctx.fillRect(unit.x * unitSize, (boardSize - 1 - unit.y) * unitSize, unitSize, unitSize)
}
