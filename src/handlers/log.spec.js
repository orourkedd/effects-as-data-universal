const { logInfoFn, logErrorFn } = require('./log')
const cmds = require('../cmds')
const { deepEqual } = require('assert')

describe('log.js', () => {
  describe('logInfo()', () => {
    it('should console.info() the payload', () => {
      const cmd = cmds.logInfo(123)
      let payload = null
      const consoleLogInfo = p => {
        payload = p
      }
      const expected = 123
      logInfoFn(consoleLogInfo, cmd)
      const actual = payload
      deepEqual(actual, expected)
    })
  })

  describe('logError()', () => {
    it('should console.error the payload', () => {
      const cmd = cmds.logError(123)
      let payload = null
      const consoleLogError = p => {
        payload = p
      }
      const expected = 123
      logErrorFn(consoleLogError, cmd)
      const actual = payload
      deepEqual(actual, expected)
    })
  })
})
