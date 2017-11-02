function poll(fn, ctx, interval, tryCount) {
  return {
    type: "poll",
    fn,
    ctx,
    interval,
    tryCount
  };
}

function clearPoll(id) {
  return {
    type: "clearPoll",
    id
  };
}

module.exports = {
  poll,
  clearPoll
};
