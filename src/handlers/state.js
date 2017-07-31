function getGlobal() {
  let g
  if (typeof window !== "undefined") {
    g = window
  } else {
    g = global
  }
  return g
}

function getGlobalState() {
  const g = getGlobal()
  g.effectsAsDataState = g.effectsAsDataState || {}
  return g.effectsAsDataState
}

function setGlobalState(payload) {
  const g = getGlobal()
  g.effectsAsDataState = Object.assign({}, g.effectsAsDataState, payload)
}

function getState({ keys }) {
  const state = getGlobalState()
  return keys.reduce((p, c) => {
    p[c] = state[c]
    return p
  }, {})
}

function setState({ payload }) {
  setGlobalState(payload)
}

module.exports = {
  getState,
  setState,
  getGlobalState
}
