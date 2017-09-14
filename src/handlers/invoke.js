function invoke({ fn, ctx, args, useCallback }) {
  if (useCallback) return invokeCb({ fn, ctx, args })
  return fn.apply(ctx, args)
}

function invokeCb({ fn, ctx, args }) {
  return new Promise((resolve, reject) => {
    try {
      const cb = (err, ...results) => {
        err ? reject(err) : resolve.apply(null, results)
      }
      const args2 = [...args, cb]
      fn.apply(ctx, args2)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  invoke
}
