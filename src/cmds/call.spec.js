const { call } = require('./call')
const { deepEqual } = require('assert')

describe('call.js', () => {
  describe('#call', () => {
    it('should return a call cmd', () => {
      const fn = function*() {}
      const a = call(fn, 'foo', 'bar')
      deepEqual(a, {
        type: 'call',
        args: ['foo', 'bar'],
        fn
      })
    })

    it('should throw if fn is not a function', () => {
      expect(() => call()).toThrow('The first argument must be a function')
    })
  })
})
