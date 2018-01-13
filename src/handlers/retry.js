function delay(fn, time) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(fn());
      }, time);
    } catch (e) {
      reject(e);
    }
  });
}

function retry(
  { cmd, durations, defaultValue },
  { call, config, handlers, index = 0 }
) {
  return call(config, handlers, function*() {
    try {
      return yield cmd;
    } catch (e) {
      if (index >= durations.length) {
        if (defaultValue === undefined) throw e;
        else return defaultValue;
      }
      return delay(() => {
        return retry(
          { cmd, durations, defaultValue },
          { call, config, handlers, index: index + 1 }
        );
      }, durations[index]);
    }
  });
}

module.exports = {
  retry
};
