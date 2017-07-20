/**
 * Creates a `jsonParse` cmd.  `yield` a `jsonParse` cmd to parse a JSON string.  Why not just use `JSON.parse()` inline?  Although a successful parsing operation is deterministic, a failed parsing operation is not.
 * @param {string} payload the JSON string to parse.
 * @returns {Object} an cmd of type `jsonParse`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should parse a JSON string', testExample(() => {
 *     return [
 *       [{ json: '{"foo": "bar"}' }, cmds.jsonParse('{"foo": "bar"}')],
 *       [{ foo: 'bar' }, success({ foo: 'bar' })]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * example ({ json }) {
 *   const result = yield cmds.jsonParse(json)
 *   return result
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * run(handlers, example, { json: '{"foo": "bar"}' }).then((result) => {
 *   result.payload.foo === 'bar' //  true
 * })
 */
function jsonParse(payload) {
  return {
    type: 'jsonParse',
    payload,
  }
}

module.exports = {
  jsonParse,
}
