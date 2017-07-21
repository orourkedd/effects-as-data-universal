function callHandler(cmd, { call, config, handlers }) {
  return call(config, handlers, cmd.fn, cmd.payload)
}

module.exports = {
  call: callHandler
}
