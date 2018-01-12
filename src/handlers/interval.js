function setIntervalHandler({ fn, time }, { call, config, handlers }) {
  const id = setInterval(() => {
    call(config, handlers, fn).catch(() => true);
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
