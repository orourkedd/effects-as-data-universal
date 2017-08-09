const { setImmediate: setImmediateCmd } = require("./set-immediate")
const { call } = require("./call")
const { echo } = require("./echo")
const { either } = require("./either")
const { getState, setState } = require("./state")
const { guid } = require("./guid")
const { httpGet, httpPost, httpPut, httpDelete } = require("./http")
const { jsonParse } = require("./json-parse")
const { logInfo, logError } = require("./log")
const { now } = require("./now")
const { randomNumber } = require("./random-number")
const { retry } = require("./retry")
const { hit } = require("./hit")

module.exports = {
  setImmediate: setImmediateCmd,
  call,
  echo,
  either,
  getState,
  guid,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  jsonParse,
  logError,
  logInfo,
  now,
  randomNumber,
  setState,
  retry,
  hit
}
