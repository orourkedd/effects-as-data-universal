function setIntervalCmd(fn, time) {
  return {
    type: "setInterval",
    fn,
    time
  };
}

function clearIntervalCmd(id) {
  return {
    type: "clearInterval",
    id
  };
}

module.exports = {
  setInterval: setIntervalCmd,
  clearInterval: clearIntervalCmd
};
