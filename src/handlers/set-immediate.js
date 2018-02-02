const delay =
  typeof setImmediate === undefined ? fn => setTimeout(fn, 0) : setImmediate;

function setImmediateHandler({ cmd }, { call, context, handlers }) {
  delay(() => {
    call(context, handlers, function*() {
      yield cmd;
    });
  });
}

module.exports = {
  setImmediate: setImmediateHandler
};
