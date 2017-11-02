function sleep(time) {
  return {
    type: "sleep",
    time
  };
}

module.exports = {
  sleep
};
