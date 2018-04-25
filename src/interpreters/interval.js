function setIntervalHandler({ fn, time }, { call, context, interpreters }) {
  const id = setInterval(() => {
    call(context, interpreters, fn).catch(() => true);
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
