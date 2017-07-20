const { logInfo, logError } = require('./log')
const { deepEqual } = require('assert')

describe('log.js', () => {
  describe('logInfo()', () => {
    it('should return a logInfo cmd with a payload field', () => {
      const expected = {
        type: 'logInfo',
        payload: '123',
      }

      const actual = logInfo(123)

      deepEqual(actual, expected)
    })
  })

  describe('logError()', () => {
    it('should return a logError cmd with a payload field', () => {
      const expected = {
        type: 'logError',
        payload: '123',
      }

      const actual = logError(123)

      deepEqual(actual, expected)
    })
  })
})
