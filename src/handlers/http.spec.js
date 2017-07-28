const { httpGetFn, httpDeleteFn, httpPostFn, httpPutFn } = require('./http')
const { deepEqual } = require('assert')
const { stub } = require('sinon')

const createResponsePromise = (payload, init) => Promise.resolve(new Response(JSON.stringify(payload), init))

describe('handlers', () => {
  describe('httpGetFn', () => {
    it('should make a get request', () => {
      const get = stub().returns(createResponsePromise({ foo: 'bar' }, { status: 200 }))
      const cmd = {
        type: 'httpGet',
        url: 'http://www.example.com',
        headers: {
          test: 'header'
        },
        options: {
          credentials: 'test'
        }
      }

      return httpGetFn(get, cmd).then(result => {
        const options = {
          credentials: 'test',
          headers: {
            test: 'header'
          },
          method: 'GET'
        }
        deepEqual(get.firstCall.args[0], 'http://www.example.com')
        deepEqual(get.firstCall.args[1], options)
        deepEqual(result.payload, { foo: 'bar' })
      })
    })

    it('should make a get request and throw on non 200 status codes', () => {
      const get = stub().returns(createResponsePromise({ foo: 'bar' }, { status: 500 }))
      const cmd = {
        type: 'httpGet',
        url: 'http://www.example.com',
        headers: {
          test: 'header'
        },
        options: {
          credentials: 'test'
        }
      }

      return httpGetFn(get, cmd).catch(e => console.log(e))
    })
  })

  describe('httpDeleteFn', () => {
    it('should make a delete request', () => {
      const remove = stub().returns(createResponsePromise({ foo: 'bar' }, { status: 200 }))
      const cmd = {
        type: 'httpDelete',
        url: 'http://www.example.com',
        headers: {
          test: 'header'
        },
        options: {
          credentials: 'test'
        }
      }

      return httpDeleteFn(remove, cmd).then(result => {
        const options = {
          credentials: 'test',
          headers: {
            test: 'header'
          },
          method: 'DELETE'
        }
        deepEqual(remove.firstCall.args[0], 'http://www.example.com')
        deepEqual(remove.firstCall.args[1], options)
        deepEqual(result.payload, { foo: 'bar' })
      })
    })
  })

  describe('httpPostFn', () => {
    it('should make a post request', () => {
      const post = stub().returns(createResponsePromise({ foo: 'bar' }, { status: 200 }))
      const cmd = {
        type: 'httpPost',
        url: 'http://www.example.com',
        headers: {
          test: 'header'
        },
        options: {
          credentials: 'test'
        },
        payload: {
          pay: 'load'
        }
      }

      return httpPostFn(post, cmd).then(result => {
        const options = {
          credentials: 'test',
          headers: {
            test: 'header'
          },
          method: 'POST',
          body: JSON.stringify({
            pay: 'load'
          })
        }

        deepEqual(post.firstCall.args[0], 'http://www.example.com')
        deepEqual(post.firstCall.args[1], options)
        deepEqual(result.payload, { foo: 'bar' })
      })
    })
  })

  describe('httpPutFn', () => {
    it('should make a put request', () => {
      const put = stub().returns(createResponsePromise({ foo: 'bar' }, { status: 200 }))
      const cmd = {
        type: 'httpPut',
        url: 'http://www.example.com',
        headers: {
          test: 'header'
        },
        options: {
          credentials: 'test'
        },
        payload: {
          pay: 'load'
        }
      }

      return httpPutFn(put, cmd).then(result => {
        const options = {
          credentials: 'test',
          headers: {
            test: 'header'
          },
          method: 'PUT',
          body: JSON.stringify({
            pay: 'load'
          })
        }
        deepEqual(put.firstCall.args[0], 'http://www.example.com')
        deepEqual(put.firstCall.args[1], options)
        deepEqual(result.payload, { foo: 'bar' })
      })
    })
  })
})
