function call(fn, ...args) {
  return {
    type: "call",
    fn,
    args
  };
}

module.exports = {
  call
};
