function either({ cmd, defaultValue }, { call, context, handlers }) {
  return call(context, handlers, function*() {
    try {
      const result = yield cmd;
      return result || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  });
}

module.exports = {
  either
};
