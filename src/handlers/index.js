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
const immediate = require("./set-immediate");
const interval = require("./interval");
const globalvars = require("./globalvars");
const series = require("./series");

module.exports = Object.assign(
  {
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
    setState
  },
  immediate,
  interval,
  globalvars,
  series
);
