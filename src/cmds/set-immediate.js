function setImmediateCmd(cmd) {
  return {
    type: "setImmediate",
    cmd
  }
}

module.exports = {
  setImmediate: setImmediateCmd
}
