const cmds = require('../cmds/random-number')
const { randomNumberFn } = require('./random-number')
const { deepEqual } = require('assert')

describe('random-number.js', () => {
  describe('#randomNumber', () => {
    it('should return a randomNumber', () => {
      const cmd = cmds.randomNumber()
      const mathRandom = () => 0.123
      const actual = randomNumberFn(mathRandom, cmd)
      const expected = 0.123
      deepEqual(actual, expected)
    })
  })
})
