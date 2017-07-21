function either({ cmd, defaultValue }, { call, config, handlers }) {
  return call(config, handlers, function*() {
    try {
      const result = yield cmd
      return result || defaultValue
    } catch (e) {
      return defaultValue
    }
  })
}

module.exports = {
  either
}
