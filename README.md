# Actions packaged with effects-as-data-universal

### Table of Contents

-   [call](#call)
-   [echo](#echo)
-   [guid](#guid)
-   [httpGet](#httpget)
-   [httpPost](#httppost)
-   [httpPut](#httpput)
-   [httpDelete](#httpdelete)
-   [jsonParse](#jsonparse)
-   [logInfo](#loginfo)
-   [logError](#logerror)
-   [now](#now)
-   [randomNumber](#randomnumber)
-   [getState](#getstate)
-   [setState](#setstate)

## call

[src/actions/universal/call.js:43-50](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/call.js#L43-L50 "Source code on GitHub")

Creates a `call` action.  `yield` a `call` action to call another effects-as-data function.  `call` is used to compose effects-as-data functions in a testible manner.

**Parameters**

-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** an effects-as-data generator function.
-   `payload` **any?** the payload for the effects-as-data function.
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `call` (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')

const testExample = testFn(example)

describe('example()', () => {
  it('should call an effects-as-data function', testExample(() => {
    return [
      [[{ id: '123' }], cmds.call(getUser, { id: '123' })],
      [{ id: '123', username: 'foo' }, { id: '123', username: 'foo' }]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * getUser ({ id }) {
 const user = yield cmds.httpGet(`https://example.com/api/v1/users/${id}`)
 return user
}

function * example ({ id }) {
  const result = yield cmds.call(getUser, { id })
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { id: '123' }).then((user) => {
  user.payload.id === '123' //  true
  user.payload.username === 'foo' //  true, if a user with an id of '123' has the `username` 'foo'.
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `call`.

## echo

[src/actions/universal/echo.js:35-40](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/echo.js#L35-L40 "Source code on GitHub")

Creates an `echo` action.  `yield` an `echo` action for the handler to return `payload`.  This is used as a placeholder when multiple actions are being `yield`ed and some of the actions need to be `yield`ed conditionally.

**Parameters**

-   `payload` **any** the value to be returns from the handler.

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return its argument', testExample(() => {
    const value = { foo: 'bar' }
    return [
      [[{ value }], cmds.echo(value)],
      [value, value]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example ({ value }) {
  const result = yield cmds.echo(value)
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { value: 32 }).then((result) => {
  console.log(fda)
  result.payload === 32 //  true
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `echo`.

## guid

[src/actions/universal/guid.js:33-37](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/guid.js#L33-L37 "Source code on GitHub")

Creates a `guid` action.  `yield` a `guid` action to get a shiny new guid.

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return a guid', testExample(() => {
    return [
      [null, cmds.guid()],
      ['83feb66e-cf36-40a3-ad23-a150f0b7ed4d', '83feb66e-cf36-40a3-ad23-a150f0b7ed4d']
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  const result = yield cmds.guid()
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then((result) => {
  result.payload === '15270902-2798-4c34-aaa8-9a55726b58af' //  true, if `uuid.v4()` returned '15270902-2798-4c34-aaa8-9a55726b58af'
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `guid`.

## httpGet

[src/actions/universal/http.js:43-50](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/http.js#L43-L50 "Source code on GitHub")

Creates a `httpGet` action.  `yield` an `httpGet` action to do an http GET request.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to GET.
-   `headers` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** request headers. (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `fetch`. (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return a result from GET', testExample(() => {
    return [
      [{ url: 'http://www.example.com' }, cmds.httpGet('http://www.example.com')],
      [{ foo: 'bar' }, { foo: 'bar' }]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example ({ url }) {
  const result = yield cmds.httpGet(url)
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

const url = 'https://www.example.com/api/v1/something'
call({}, handlers, example, { url }).then((result) => {
  result.payload === { foo: 'bar' } //  true, if a GET to `url` returned `{ foo: 'bar' }`
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `httpGet`.

## httpPost

[src/actions/universal/http.js:89-97](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/http.js#L89-L97 "Source code on GitHub")

Creates a `httpPost` action.  `yield` an `httpPost` action to do an http POST request.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to POST.
-   `payload` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** the payload to POST.
-   `headers` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** request headers. (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `fetch`. (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should POST payload to url', testExample(() => {
    const url = 'http://www.example.com/api/v1/user'
    return [
      [{ url }, cmds.httpPost(url, { foo: 'bar' })],
      [null, null]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (payload) {
  const result = yield cmds.httpPost('http://www.example.com/api/v1/user', payload)
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { foo: 'bar' }).then((result) => {
  result.success === true //  true, if a POST was successful
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `httpPost`.

## httpPut

[src/actions/universal/http.js:136-144](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/http.js#L136-L144 "Source code on GitHub")

Creates a `httpPut` action.  `yield` an `httpPut` action to do an http PUT request.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to PUT.
-   `payload` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** the payload to PUT.
-   `headers` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** request headers. (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `fetch`. (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should PUT payload to url', testExample(() => {
    const url = 'http://www.example.com/api/v1/user'
    return [
      [{ url }, cmds.httpPut(url, { foo: 'bar' })],
      [null, null]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (payload) {
  const result = yield cmds.httpPut('http://www.example.com/api/v1/user', payload)
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { foo: 'bar' }).then((result) => {
  result.success === true //  true, if a PUT was successful
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `httpPut`.

## httpDelete

[src/actions/universal/http.js:181-188](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/http.js#L181-L188 "Source code on GitHub")

Creates a `httpDelete` action.  `yield` an `httpDelete` action to do an http DELETE request.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to DELETE.
-   `headers` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** request headers. (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `fetch`. (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return a result from DELETE', testExample(() => {
    return [
      [{ id: '32' }, cmds.httpDelete('http://www.example.com/api/v1/user/32')],
      [null, null)]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example ({ id }) {
  const result = yield cmds.httpDelete(`http://www.example.com/api/v1/user/${id}`)
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { id: '123' }).then((result) => {
  result.success === true //  true, if a DELETE to http://www.example.com/api/v1/user/123 was successful
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `httpDelete`.

## jsonParse

[src/actions/universal/json-parse.js:35-40](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/json-parse.js#L35-L40 "Source code on GitHub")

Creates a `jsonParse` action.  `yield` a `jsonParse` action to parse a JSON string.  Why not just use `JSON.parse()` inline?  Although a successful parsing operation is deterministic, a failed parsing operation is not.

**Parameters**

-   `payload` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the JSON string to parse.

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')

const testExample = testFn(example)

describe('example()', () => {
  it('should parse a JSON string', testExample(() => {
    return [
      [{ json: '{"foo": "bar"}' }, cmds.jsonParse('{"foo": "bar"}')],
      [{ foo: 'bar' }, { foo: 'bar' }]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example ({ json }) {
  const result = yield cmds.jsonParse(json)
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { json: '{"foo": "bar"}' }).then((result) => {
  result.payload.foo === 'bar' //  true
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `jsonParse`.

## logInfo

[src/actions/universal/log.js:35-40](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/log.js#L35-L40 "Source code on GitHub")

Creates a `logInfo` action.  `yield` a `logInfo` action to log to the console using `console.info`.

**Parameters**

-   `payload` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** the payload to log.

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')

const testExample = testFn(example)

describe('example()', () => {
  it('should log a message', testExample(() => {
    return [
      [{ message: 'foo' }, cmds.logInfo('foo')],
      [null, null]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example ({ message }) {
  const result = yield cmds.logInfo(message)
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { message: 'bar' }).then((result) => {
  //  "bar" should have been `console.info`ed
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `logInfo`.

## logError

[src/actions/universal/log.js:76-81](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/log.js#L76-L81 "Source code on GitHub")

Creates a `logError` action.  `yield` a `logError` action to log to the console using `console.error`.

**Parameters**

-   `payload` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** the payload to log.

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')

const testExample = testFn(example)

describe('example()', () => {
  it('should log a message', testExample(() => {
    return [
      [{ message: 'foo' }, cmds.logError('foo')],
      [null, null]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example ({ message }) {
  const result = yield cmds.logError(message)
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { message: 'bar' }).then((result) => {
  //  "bar" should have been `console.error`ed
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `logError`.

## now

[src/actions/universal/now.js:33-37](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/now.js#L33-L37 "Source code on GitHub")

Create an `now` action.  `yield` a `now` action to get the current timestamp from `Date.now()`.

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return the current timestamp', testExample(() => {
    return [
      [null, cmds.now()],
      [123456, 123456]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  const timestamp = yield cmds.now()
  return timestamp
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then((timestamp) => {
  timestamp.payload === 1490030160103 //  true, if Date.now() returned 1490030160103
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `now`.

## randomNumber

[src/actions/universal/random-number.js:33-37](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/random-number.js#L33-L37 "Source code on GitHub")

Create an `randomNumber` action.  `yield` a `randomNumber` to get a random number using `Math.random()`.

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return the current timestamp', testExample(() => {
    return [
      [null, cmds.randomNumber()],
      [0.123, 0.123]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  const n = yield cmds.randomNumber()
  return n
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then((n) => {
  n.payload === 0.345 //  true, if Math.random() returned 0.345
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `randomNumber`.

## getState

[src/actions/universal/state.js:34-39](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/state.js#L34-L39 "Source code on GitHub")

Creates a `getState` action.  `yield` a `getState` to get application state.

**Parameters**

-   `keys` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of paths to sections of state.  For example, ['user.firstName', 'settings.showBanner']

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return user from application state', testExample(() => {
    return [
      [null, cmds.getState(['user'])],
      [{ id: '123', username: 'foo' }, { id: '123', username: 'foo' }]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  const user = yield cmds.getState(['user'])
  return user
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then((user) => {
  user.id === 'abc' //  true, if the user has an `id` of 'abc'
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `getState`.

## setState

[src/actions/universal/state.js:76-81](https://github.com-orourkedd/orourkedd/effects-as-data/blob/da7c6768fa7dfc99630600a48caa1dcf34783497/src/actions/universal/state.js#L76-L81 "Source code on GitHub")

Creates a `setState` action.  `yield` a `setState` to set application state.

**Parameters**

-   `payload` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** An object that will be `merge`ed into the application state.

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should set a user on the application state', testExample(() => {
    const user = { user: '123' }
    return [
      [user, cmds.setState({ user })],
      [null, null]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (user) {
  const result = yield cmds.setState({ user })
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

const user = { id: '123', username: 'foo' }
call({}, handlers, example, user).then((result) => {
  result.success === true //  true, and `user` should be available on the application state using `cmds.getState(['user'])`
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an action of type `setState`.
