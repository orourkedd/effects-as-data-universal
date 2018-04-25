const polls = {};
const { guid } = require("./guid");

function poll(
  { fn, ctx, interval = 1000, tryCount },
  { call, context, interpreters }
) {
  let count = 0;
  const id = guid();
  return new Promise((resolve, reject) => {
    function doPoll(ctx2) {
      if (tryCount && count >= tryCount) return resolve(ctx2);
      if (ctx2.done === true) return resolve(ctx2);
      polls[id] = setTimeout(() => {
        try {
          call(context, interpreters, fn, ctx2, id)
            .then(updatedCtx => {
              count++;
              if (!updatedCtx) {
                return reject(
                  new Error(
                    "The context must be returned from a polling function."
                  )
                );
              }
              if (polls[id] === undefined) return resolve(updatedCtx);
              doPoll(updatedCtx);
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
