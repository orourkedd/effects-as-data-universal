function callHandler(cmd, { call, config, handlers }) {
  return call(config, handlers, cmd.fn, ...cmd.args);
}

module.exports = {
  call: callHandler
};
