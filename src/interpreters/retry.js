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
  { call, context, interpreters, index = 0 }
) {
  return call(context, interpreters, function*() {
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
          { call, context, interpreters, index: index + 1 }
        );
      }, durations[index]);
    }
  });
}

module.exports = {
  retry
};
