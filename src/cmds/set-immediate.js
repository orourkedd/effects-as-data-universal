function setImmediate(cmd) {
  return {
    type: 'setImmediate',
    cmd
  }
}

module.exports = {
  setImmediate
}
