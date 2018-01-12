function series({ list }, { call, config, handlers }) {
  if (list.length === 0) return [];
  return new Promise((resolve, reject) => {
    try {
      const results = [];
      function callCommands(list, index = 0) {
        call(config, handlers, function*() {
          const result = yield list[index];
          results.push(result);
          if (index === list.length - 1) return resolve(results);
          callCommands(list, index + 1);
        }).catch(reject);
      }
      callCommands(list, 0);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  series
};
