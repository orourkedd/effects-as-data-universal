const { call } = require('effects-as-data')

function callHandler(cmd, config, handlers) {
  return call(config, handlers, cmd.fn, cmd.payload)
}

module.exports = {
  call: callHandler
}
