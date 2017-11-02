const { call } = require("./call");
const { echo } = require("./echo");
const { either } = require("./either");
const { getState, setState } = require("./state");
const { guid } = require("./guid");
const { hit } = require("./hit");
const { httpGet, httpPost, httpPut, httpDelete } = require("./http");
const { jsonParse } = require("./json-parse");
const { logInfo, logError } = require("./log");
const { now } = require("./now");
const { randomNumber } = require("./random-number");
const { retry } = require("./retry");
const { poll, clearPoll } = require("./poll");
const { sleep } = require("./sleep");
const { setImmediate: setImmediateCmd } = require("./set-immediate");
const invoke = require("./invoke");

module.exports = Object.assign(
  {
    call,
    echo,
    either,
    getState,
    guid,
    hit,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    jsonParse,
    logError,
    logInfo,
    now,
    randomNumber,
    retry,
    poll,
    sleep,
    clearPoll,
    setImmediate: setImmediateCmd,
    setState
  },
  invoke
);
