const defaultHeaders = {
  "Content-Type": "application/json;charset=UTF-8"
}

function httpGet(url, headers = {}, options = {}) {
  return {
    type: "httpGet",
    url,
    headers,
    options
  }
}

function httpPost(url, payload, headers = {}, options = {}) {
  return {
    type: "httpPost",
    url,
    payload,
    headers: Object.assign({}, defaultHeaders, headers),
    options
  }
}

function httpPut(url, payload, headers = {}, options = {}) {
  return {
    type: "httpPut",
    url,
    payload,
    headers: Object.assign({}, defaultHeaders, headers),
    options
  }
}

function httpDelete(url, headers = {}, options = {}) {
  return {
    type: "httpDelete",
    url,
    headers,
    options
  }
}

module.exports = {
  httpPost,
  httpPut,
  httpGet,
  httpDelete
}
