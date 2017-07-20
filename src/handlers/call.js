const { call } = require('effects-as-data')

function callHandler(action, config, handlers) {
  return call(config, handlers, action.fn, action.payload)
}

module.exports = {
  call: callHandler
}
