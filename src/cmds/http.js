const { merge } = require('ramda')

const defaultHeaders = {
  'Content-Type': 'application/json;charset=UTF-8',
}

/**
 * Creates a `httpGet` cmd.  `yield` an `httpGet` cmd to do an http GET request.
 * @param {string} url the url to GET.
 * @param {Object} [headers={}] request headers.
 * @param {Object} [options={}] options for `fetch`.
 * @returns {Object} an cmd of type `httpGet`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should return a result from GET', testExample(() => {
 *     return [
 *       [{ url: 'http://www.example.com' }, cmds.httpGet('http://www.example.com')],
 *       [{ foo: 'bar' }, success({ foo: 'bar' })]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * example ({ url }) {
 *   const result = yield cmds.httpGet(url)
 *   return result
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * const url = 'https://www.example.com/api/v1/something'
 * run(handlers, example, { url }).then((result) => {
 *   result.payload === { foo: 'bar' } //  true, if a GET to `url` returned `{ foo: 'bar' }`
 * })
 */
function httpGet(url, headers = {}, options = {}) {
  return {
    type: 'httpGet',
    url,
    headers,
    options,
  }
}

/**
 * Creates a `httpPost` cmd.  `yield` an `httpPost` cmd to do an http POST request.
 * @param {string} url the url to POST.
 * @param {Object} [payload] the payload to POST.
 * @param {Object} [headers={}] request headers.
 * @param {Object} [options={}] options for `fetch`.
 * @returns {Object} an cmd of type `httpPost`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should POST payload to url', testExample(() => {
 *     const url = 'http://www.example.com/api/v1/user'
 *     return [
 *       [{ url }, cmds.httpPost(url, { foo: 'bar' })],
 *       [success(), success()]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * example (payload) {
 *   const result = yield cmds.httpPost('http://www.example.com/api/v1/user', payload)
 *   return result
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * run(handlers, example, { foo: 'bar' }).then((result) => {
 *   result.success === true //  true, if a POST was successful
 * })
 */
function httpPost(url, payload, headers = {}, options = {}) {
  return {
    type: 'httpPost',
    url,
    payload,
    headers: merge(defaultHeaders, headers),
    options,
  }
}

/**
 * Creates a `httpPut` cmd.  `yield` an `httpPut` cmd to do an http PUT request.
 * @param {string} url the url to PUT.
 * @param {Object} [payload] the payload to PUT.
 * @param {Object} [headers={}] request headers.
 * @param {Object} [options={}] options for `fetch`.
 * @returns {Object} an cmd of type `httpPut`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should PUT payload to url', testExample(() => {
 *     const url = 'http://www.example.com/api/v1/user'
 *     return [
 *       [{ url }, cmds.httpPut(url, { foo: 'bar' })],
 *       [success(), success()]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * example (payload) {
 *   const result = yield cmds.httpPut('http://www.example.com/api/v1/user', payload)
 *   return result
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * run(handlers, example, { foo: 'bar' }).then((result) => {
 *   result.success === true //  true, if a PUT was successful
 * })
 */
function httpPut(url, payload, headers = {}, options = {}) {
  return {
    type: 'httpPut',
    url,
    payload,
    headers: merge(defaultHeaders, headers),
    options,
  }
}

/**
 * Creates a `httpDelete` cmd.  `yield` an `httpDelete` cmd to do an http DELETE request.
 * @param {string} url the url to DELETE.
 * @param {Object} [headers={}] request headers.
 * @param {Object} [options={}] options for `fetch`.
 * @returns {Object} an cmd of type `httpDelete`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should return a result from DELETE', testExample(() => {
 *     return [
 *       [{ id: '32' }, cmds.httpDelete('http://www.example.com/api/v1/user/32')],
 *       [success(), success())]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * example ({ id }) {
 *   const result = yield cmds.httpDelete(`http://www.example.com/api/v1/user/${id}`)
 *   return result
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * run(handlers, example, { id: '123' }).then((result) => {
 *   result.success === true //  true, if a DELETE to http://www.example.com/api/v1/user/123 was successful
 * })
 */
function httpDelete(url, headers = {}, options = {}) {
  return {
    type: 'httpDelete',
    url,
    headers,
    options,
  }
}

function rpc(url, fn, payload) {
  return httpPost(url, {
    fn,
    payload,
  })
}

module.exports = {
  httpPost,
  httpPut,
  httpGet,
  httpDelete,
  rpc,
}
