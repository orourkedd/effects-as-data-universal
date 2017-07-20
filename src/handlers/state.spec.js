const { getState, setState, getGlobalState } = require('./state')
const cmds = require('../cmds')
const { deepEqual } = require('assert')

describe('state.js', () => {
  describe('getState()', () => {
    it('should return values from state represented by keys', () => {
      const cmd = cmds.getState(['foo', 'bar'])
      global.effectsAsDataState = {
        foo: 1,
        bar: 2,
      }
      const expected = {
        foo: 1,
        bar: 2,
      }
      const actual = getState(cmd)
      deepEqual(actual, expected)
    })
  })

  describe('setState()', () => {
    it('should return values from state represented by keys', () => {
      const foo = Date.now()
      const bar = Date.now()
      const cmd = cmds.setState({ foo, bar })
      setState(cmd)
      const expected = { foo, bar }
      const actual = getGlobalState()
      deepEqual(actual, expected)
    })
  })
})
