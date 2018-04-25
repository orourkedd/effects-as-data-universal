function logFn(l, { payload }) {
  return l(payload);
}

module.exports = {
  logInfoFn: logFn,
  logErrorFn: logFn,
  logInfo: cmd => logFn(console.info, cmd),
  logError: cmd => logFn(console.error, cmd)
};
