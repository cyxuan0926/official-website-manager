function isNull () {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] == null || arguments[i] === undefined || arguments[i] === '') {
      return true// 为空
    } else {
      arguments[i] = arguments[i].toString()
      arguments[i] = arguments[i].replace(/(^\s*)|(\s*$)/g, '')
      if (arguments[i] === '') {
        return true// 为空
      }
    }
  }
  return false// 不为空
}
export { isNull }
