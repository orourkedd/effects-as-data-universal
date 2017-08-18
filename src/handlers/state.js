const { get, set } = require('object-path')

function getGlobal() {
  let g
  if (typeof window !== 'undefined') {
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

function getState({ path }) {
  return get(getGlobalState(), path)
}

function setState({ path, payload }) {
  return set(getGlobalState(), path, payload)
}

module.exports = {
  getState,
  setState,
  getGlobalState
}
