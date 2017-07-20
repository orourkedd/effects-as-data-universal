const { mergeAll, keys } = require('ramda')
const fetch = require('fetch-everywhere')

function httpGetFn(fetch, { url, headers, options }) {
  return fetch(url, mergeAll([options, { headers, method: 'GET' }]))
    .then(checkStatus)
    .then(parse)
}

function httpPostFn(post, { url, payload, headers, options }) {
  return fetch(url, mergeAll([options, { headers, method: 'POST' }]))
    .then(checkStatus)
    .then(parse)
}

function httpPutFn(put, { url, payload, headers, options }) {
  return fetch(url, mergeAll([options, { headers, method: 'PUT' }]))
    .then(checkStatus)
    .then(parse)
}

function httpDeleteFn(remove, { url, headers, options }) {
  return fetch(url, mergeAll([options, { headers, method: 'DELETE' }]))
    .then(checkStatus)
    .then(parse)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    return parse(response).then(p => {
      error.payload = p
      throw error
    })
  }
}

function parse(r) {
  return r.text().then(text => {
    let payload
    try {
      payload = JSON.parse(text)
    } catch (e) {
      payload = text
    }

    return {
      meta: {
        status: r.status,
        statusText: r.statusText,
        headers: parseHeaders(r)
      },
      payload
    }
  })
}

function parseHeaders(httpResponse) {
  let headersRaw = httpResponse.headers._headers
  return keys(headersRaw).reduce((p, c) => {
    p[c] = headersRaw[c].join('')
    return p
  }, {})
}

module.exports = {
  httpPostFn,
  httpPost: payload => httpPostFn(fetch, payload),
  httpPutFn,
  httpPut: payload => httpPutFn(fetch, payload),
  httpGetFn,
  httpGet: payload => httpGetFn(fetch, payload),
  httpDeleteFn,
  httpDelete: payload => httpDeleteFn(fetch, payload)
}
