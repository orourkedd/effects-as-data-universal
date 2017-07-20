/**
 * Create an `randomNumber` cmd.  `yield` a `randomNumber` to get a random number using `Math.random()`.
 * @returns {Object} an cmd of type `randomNumber`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should return the current timestamp', testExample(() => {
 *     return [
 *       [null, cmds.randomNumber()],
 *       [0.123, success(0.123)]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * example () {
 *   const n = yield cmds.randomNumber()
 *   return n
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * run(handlers, example).then((n) => {
 *   n.payload === 0.345 //  true, if Math.random() returned 0.345
 * })
 */
function randomNumber() {
  return {
    type: 'randomNumber',
  }
}

module.exports = {
  randomNumber,
}
