const delay =
  typeof setImmediate === undefined ? fn => setTimeout(fn, 0) : setImmediate

function async({ cmd }, { call, config, handlers }) {
  delay(() => {
    call(config, handlers, function*() {
      yield cmd
    })
  })
}

module.exports = {
  async
}
