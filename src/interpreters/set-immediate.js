const delay =
  typeof setImmediate === undefined ? fn => setTimeout(fn, 0) : setImmediate;

function setImmediateHandler({ cmd }, { call, context, interpreters }) {
  delay(() => {
    call(context, interpreters, function*() {
      yield cmd;
    });
  });
}

module.exports = {
  setImmediate: setImmediateHandler
};
