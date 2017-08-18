function getState(path) {
  return {
    type: 'getState',
    path
  }
}

function setState(path, payload) {
  return {
    type: 'setState',
    path,
    payload
  }
}

module.exports = {
  getState,
  setState
}
