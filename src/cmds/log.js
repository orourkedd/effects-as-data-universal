/**
 * Creates a `logInfo` cmd.  `yield` a `logInfo` cmd to log to the console using `console.info`.
 * @param {string} [payload] the payload to log.
 * @returns {Object} an cmd of type `logInfo`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should log a message', testExample(() => {
 *     return [
 *       [{ message: 'foo' }, cmds.logInfo('foo')],
 *       [null, success()]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * example ({ message }) {
 *   const result = yield cmds.logInfo(message)
 *   return result
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * run(handlers, example, { message: 'bar' }).then((result) => {
 *   //  "bar" should have been `console.info`ed
 * })
 */
function logInfo(payload) {
  return {
    type: 'logInfo',
    payload,
  }
}

/**
 * Creates a `logError` cmd.  `yield` a `logError` cmd to log to the console using `console.error`.
 * @param {string} [payload] the payload to log.
 * @returns {Object} an cmd of type `logError`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should log a message', testExample(() => {
 *     return [
 *       [{ message: 'foo' }, cmds.logError('foo')],
 *       [null, success()]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * example ({ message }) {
 *   const result = yield cmds.logError(message)
 *   return result
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * run(handlers, example, { message: 'bar' }).then((result) => {
 *   //  "bar" should have been `console.error`ed
 * })
 */
function logError(payload) {
  return {
    type: 'logError',
    payload,
  }
}

module.exports = {
  logInfo,
  logError,
}
