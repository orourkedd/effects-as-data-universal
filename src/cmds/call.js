function call(fn, ...args) {
  if (typeof fn !== 'function') throw new Error('The first argument must be a function')
  return {
    type: 'call',
    fn,
    args
  }
}

module.exports = {
  call
}
