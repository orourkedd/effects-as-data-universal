function either({ cmd, defaultValue }, { call, context, interpreters }) {
  return call(context, interpreters, function*() {
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
