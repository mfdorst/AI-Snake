/**
 * @param {(elem: Any) => boolean} pred
 */
Array.prototype.any = function (pred) {
  for(const item of this) {
    if (pred(item)) {
      return true
    }
  }
  return false
}
