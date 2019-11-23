const unitSize = 20

/**
 * @param {*} ctx
 * @param {Unit} unit
 * @param {String} color
 */
export function drawUnit(ctx, unit, color) {
  ctx.fillStyle = color
  ctx.fillRect(unit.x * unitSize, (29 - unit.y) * unitSize, unitSize, unitSize)
}
