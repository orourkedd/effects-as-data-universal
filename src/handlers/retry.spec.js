const { retry } = require('./retry')
const cmds = require('../cmds')

test('retry', () => {
  const durations = [10, 20, 30]
  let count = 0
  const call = (config, handlers, fn) => {
    const g = fn()
    g.next()
    count++
    const e = new Error('foo')
    let v
    try {
      v = g.throw(e)
    } catch (e2) {
      return Promise.reject(e)
    }
    return Promise.resolve(v.value)
  }
  const cmd = cmds.retry(cmds.echo('foo'), durations, 'default')
  return retry(cmd, { call }).then(r => {
    expect(r).toEqual('default')
  })
})
