/**
 * Creates an `echo` cmd.  `yield` an `echo` cmd for the handler to return `payload`.  This is used as a placeholder when multiple cmds are being `yield`ed and some of the cmds need to be `yield`ed conditionally.
 * @param {any} payload the value to be returns from the handler.
 * @returns {Object} an cmd of type `echo`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should return its argument', testExample(() => {
 *     const value = { foo: 'bar' }
 *     return [
 *       [{ value }, cmds.echo(value)],
 *       [value, success(value)]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * example ({ value }) {
 *   const result = yield cmds.echo(value)
 *   return result
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * run(handlers, example, { value: 32 }).then((result) => {
 *   result.payload === 32 //  true
 * })
 */
function echo(payload) {
  return {
    type: 'echo',
    payload,
  }
}

module.exports = {
  echo,
}
