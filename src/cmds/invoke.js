function invoke(fn, ...args) {
  return {
    type: 'invoke',
    fn,
    args,
    useCallback: false
  }
}

function invokeCtx(fn, ctx, ...args) {
  return {
    type: 'invoke',
    fn,
    args,
    useCallback: false,
    ctx
  }
}

function invokeCallback(fn, ...args) {
  return {
    type: 'invoke',
    fn,
    args,
    useCallback: true
  }
}

function invokeNode() {
  return invokeCallback.apply(null, arguments)
}

function invokeCallbackCtx(fn, ctx, ...args) {
  return {
    type: 'invoke',
    fn,
    args,
    useCallback: true,
    ctx
  }
}

function invokeNodeCtx() {
  return invokeCallbackCtx.apply(null, arguments)
}

module.exports = {
  invoke,
  invokeCtx,
  invokeCallback,
  invokeNode,
  invokeCallbackCtx,
  invokeNodeCtx
}
