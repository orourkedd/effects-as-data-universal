function setIntervalHandler({ fn, time }, { call, context, handlers }) {
  const id = setInterval(() => {
    call(context, handlers, fn).catch(() => true);
  }, time);
  return id;
}

function clearIntervalHandler({ id }) {
  clearInterval(id);
}

module.exports = {
  setInterval: setIntervalHandler,
  clearInterval: clearIntervalHandler
};
