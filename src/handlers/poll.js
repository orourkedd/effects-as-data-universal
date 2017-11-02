const polls = {};
const { guid } = require("./guid");

function poll(
  { fn, ctx, interval = 1000, tryCount },
  { call, config, handlers }
) {
  let count = 0;
  const id = guid();
  return new Promise((resolve, reject) => {
    function doPoll(ctx2) {
      if (tryCount && count >= tryCount) return resolve(ctx2);
      if (ctx2.done === true) return resolve(ctx2);
      polls[id] = setTimeout(() => {
        try {
          call(config, handlers, fn, ctx2, id)
            .then(updatedContext => {
              count++;
              if (!updatedContext) {
                return reject(
                  new Error(
                    "The context must be returned from a polling function."
                  )
                );
              }
              if (polls[id] === undefined) return resolve(updatedContext);
              doPoll(updatedContext);
            })
            .catch(reject);
        } catch (e) {
          reject(e);
        }
      }, interval);
    }

    doPoll(ctx);
  });
}

function clearPoll({ id }) {
  clearTimeout(polls[id]);
  delete polls[id];
}

module.exports = {
  poll,
  clearPoll
};
