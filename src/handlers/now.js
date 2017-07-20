function nowFn(n) {
  return n()
}

module.exports = {
  nowFn,
  now: cmd => nowFn(Date.now, cmd),
}
