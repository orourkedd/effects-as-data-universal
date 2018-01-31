# Universal Commands and Handlers

Commands and handlers that can be used anywhere Javascript runs.  This module is meant to be used with [effects-as-data](https://github.com/orourkedd/effects-as-data).

## Usage in Node and the Browser (ES6 and ES5)

When using in Node: `require('effects-as-data')`  
When using in the browser (or in an old version of node): `require('effects-as-data/es5')`

### Table of Contents

-   [call](#call)
-   [echo](#echo)
-   [either](#either)
-   [guid](#guid)
-   [hit](#hit)
-   [httpGet](#httpget)
-   [httpPost](#httppost)
-   [httpPut](#httpput)
-   [httpDelete](#httpdelete)
-   [jsonParse](#jsonparse)
-   [logInfo](#loginfo)
-   [logError](#logerror)
-   [now](#now)
-   [randomNumber](#randomnumber)
-   [retry](#retry)
-   [getState](#getstate)
-   [setState](#setstate)
-   [setImmediate](#setimmediate)

## call

Creates a `call` cmd.  `yield` a `call` cmd to call another effects-as-data function.  `call` is used to compose effects-as-data functions in a testible manner.

**Parameters**

-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** an effects-as-data generator function.
-   `payload` **any?** the payload for the effects-as-data function.
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `call` (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')

const testExample = testFn(example)

describe('example()', () => {
  it('should call an effects-as-data function', testExample(() => {
    return args('123')
      .yieldCmd(cmds.call(getUser, '123'))
      .returns({ id: '123', username: 'foo' })
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * getUser (id) {
  return yield cmds.httpGet(`https://example.com/api/v1/users/${id}`)
}

function * example (id) {
  return yield cmds.call(getUser, id)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, '123').then(user => {
  user.id === '123' //  true
  user.username === 'foo' //  true, if a user with an id of '123' has the `username` 'foo'.
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `call`.

## echo

Creates an `echo` cmd.  `yield` an `echo` cmd for the handler to return `payload`.  This is used as a placeholder when multiple are being `yield`-ed and some of the cmds need to be `yield`-ed conditionally.

**Parameters**

-   `payload` **any** the value to be returns from the handler.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return its argument', testExample(() => {
    const value = 'foo'
    return args()
      .yieldCmd(cmds.echo(value))
      .returns(value)
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (value) {
  return yield cmds.echo(value)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, 'foo').then(result => {
  result === 'foo' //  true
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `echo`.

## either

Creates an `either` cmd.  `yield` an `either` cmd to return the result of the cmd OR the default value if the result is falsy.

**Parameters**

-   `command` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an effects-as-data command.
-   `defaultValue` **any?** the fallback value if the command returns a falsy value.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')

const testExample = testFn(example)

describe('example()', () => {
  it('successful call', testExample(() => {
    const httpGetCmd = cmds.httpGet(`https://swapi.co/api/people/${25}`)
    return args(25)
      .yieldCmd(cmds.either(httpGetCmd, { name: 'default' }))
      .returns({ name: 'Foo Bar'})
  }))

  it('default value', testExample(() => {
    const httpGetCmd = cmds.httpGet(`https://swapi.co/api/people/${25}`)
    return args(25)
      .yieldCmd(cmds.either(httpGetCmd, { name: 'default' }))
      .returns({ name: 'default' })
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (id) {
  const httpGet = cmds.httpGet(`https://swapi.co/api/people/${id}`)
  return yield cmds.either(httpGet, { name: 'default' })
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, 1).then(result => {
  result.name === "Luke Skywalker" // true
})

// 10000 will cause a 404 from the API
call({}, handlers, example, 10000).then(result => {
  result.name === "default" // true
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `either`.

## guid

Creates a `guid` cmd.  `yield` a `guid` cmd to get a shiny new guid.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return a guid', testExample(() => {
    return args()
      .yieldCmd(cmds.guid())
      .returns('83feb66e-cf36-40a3-ad23-a150f0b7ed4d')
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  return yield cmds.guid()
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then(result => {
  result === '15270902-2798-4c34-aaa8-9a55726b58af' //  true, if the guid handler returned '15270902-2798-4c34-aaa8-9a55726b58af'
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `guid`.

## hit

Creates a `hit` cmd.  `yield` a `hit` cmd to attempt each command until a non-falsy value is returned.

**Parameters**

-   `...cmds` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Commands to try in order. Pass each command as an argument.

**Examples**

```javascript
//  Test It
const { testFn } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should attempt each command until a truthy value is returned or the end is reached', testExample(() => {
    return [
      [[null], cmds.hit(cmds.echo(false), cmds.echo(0), cmds.echo(5))],
      [5, 5]
    ]
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example ({ url }) {
  const result = yield cmds.hit(cmds.echo(false), cmds.echo(0), cmds.echo(5))
  return result
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then((result) => {
  result // First truthy value of commands
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** a cmd of type `hit`.

## httpGet

Creates a `httpGet` cmd.  `yield` an `httpGet` cmd to do an http GET request.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to GET.
-   `headers` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** request headers. (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `fetch`. (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return a result from GET', testExample(() => {
    return args('http://www.example.com')
      .yieldCmd(cmds.httpGet('http://www.example.com'))
      .returns('html body')
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (url) {
  return yield cmds.httpGet(url)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

const url = 'https://www.example.com/api/v1/something'
call({}, handlers, example, url).then(result => {
  result // HTML body of example.com
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `httpGet`.

## httpPost

Creates a `httpPost` cmd.  `yield` an `httpPost` cmd to do an http POST request.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to POST.
-   `payload` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** the payload to POST.
-   `headers` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** request headers. (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `fetch`. (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should POST payload to url', testExample(() => {
    const url = 'http://www.example.com/api/v1/user'
    const payload = { foo: 'bar' }
    return args(payload)
      .yieldCmd(cmds.httpPost(url, payload))
      .returns() // assuming the api 204's
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (payload) {
  return yield cmds.httpPost('http://www.example.com/api/v1/user', payload)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { foo: 'bar' }).then(result => {
  result // Response payload
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `httpPost`.

## httpPut

Creates a `httpPut` cmd.  `yield` an `httpPut` cmd to do an http PUT request.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to PUT.
-   `payload` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** the payload to PUT.
-   `headers` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** request headers. (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `fetch`. (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should PUT payload to url', testExample(() => {
    const url = 'http://www.example.com/api/v1/user/1'
    const payload = { name: 'John Doe' }
    return args(payload)
      .yieldCmd(cmds.httpPut(url, payload))
      .returns() // assuming the api 204's
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (payload) {
  return yield cmds.httpPut('http://www.example.com/api/v1/user', payload)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, { name: 'John Doe' }).then(result => {
  result // Response payload
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `httpPut`.

## httpDelete

Creates a `httpDelete` cmd.  `yield` an `httpDelete` cmd to do an http DELETE request.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the url to DELETE.
-   `headers` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** request headers. (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** options for `fetch`. (optional, default `{}`)

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return a result from DELETE', testExample(() => {
    return args(32)
      .yieldCmd(cmds.httpDelete('http://www.example.com/api/v1/user/32'))
      .returns() // assuming the api 204's
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (id) {
  return yield cmds.httpDelete(`http://www.example.com/api/v1/user/${id}`)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, '123').then(result => {
  result // Response payload
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `httpDelete`.

## jsonParse

Creates a `jsonParse` cmd.  `yield` a `jsonParse` cmd to parse a JSON string.  Why not just use `JSON.parse()` inline?  Although a successful parsing operation is deterministic, a failed parsing operation is not.

**Parameters**

-   `payload` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the JSON string to parse.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')

const testExample = testFn(example)

describe('example()', () => {
  it('should parse a JSON string', testExample(() => {
    const jsonString = '{"foo": "bar"}'
    return args(jsonString)
      .yieldCmd(cmds.jsonParse(jsonString))
      .returns({ foo: 'bar' })
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (json) {
  return yield cmds.jsonParse(json)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, '{"foo": "bar"}').then(result => {
  result.foo === 'bar' //  true
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `jsonParse`.

## logInfo

Creates a `logInfo` cmd.  `yield` a `logInfo` cmd to log to the console using `console.info`.

**Parameters**

-   `payload` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** the payload to log.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')

const testExample = testFn(example)

describe('example()', () => {
  it('should log a message', testExample(() => {
    return args('foo')
      .yieldCmd(cmds.logInfo('foo'))
      .returns()
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (message) {
  return yield cmds.logInfo(message)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, 'bar').then(result => {
  //  "bar" should have been `console.info`ed
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `logInfo`.

## logError

Creates a `logError` cmd.  `yield` a `logError` cmd to log to the console using `console.error`.

**Parameters**

-   `payload` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** the payload to log.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')

const testExample = testFn(example)

describe('example()', () => {
  it('should log a message', testExample(() => {
    return args('oops!')
      .yieldCmd(cmds.logError('oops!'))
      .returns()
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (message) {
  return yield cmds.logError(message)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example, 'oops!').then(result => {
  //  "oops!" should have been `console.error`ed
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `logError`.

## now

Create an `now` cmd.  `yield` a `now` cmd to get the current timestamp from `Date.now()`.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return the current timestamp', testExample(() => {
    return args()
      .yieldCmd(cmds.now())
      .returns(123456)
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  return yield cmds.now()
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then(timestamp => {
  timestamp === 1490030160103 //  true, if the now handler (which wraps Date.now()) returned 1490030160103
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `now`.

## randomNumber

Create an `randomNumber` cmd.  `yield` a `randomNumber` to get a random number using `Math.random()`.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return the current timestamp', testExample(() => {
    return args()
      .yieldCmd(cmds.randomNumber())
      .returns(0.123)
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  return yield cmds.randomNumber()
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then(n => {
  n === 0.345 //  true, if the randomNumber handler (which wraps Math.random()) returned 0.345
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `randomNumber`.

## retry

Create an `retry` cmd.  `yield` a `retry` to try a command at the given intervals finally falling back to a default value if all tries fail.

**Parameters**

-   `command` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an effects-as-data command.
-   `intervals` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of times in milliseconds to retry the command on if the last try failed
-   `defaultValue` **any?** the fallback value if the command returns a falsy value after all retries.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should retry 3 times then return the default value', testExample(() => {
    const intervals = [100, 500, 1000]
    const defaultValue = []
    const httpGetCmd = cmds.httpGet('https://swapi.co/api/people')
    return args()
      .yieldCmd(cmds.retry(httpGetCmd, intervals, defaultValue))
      .returns(defaultValue)
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  const httpGetCmd = cmds.httpGet('https://swapi.co/api/people')
  return yield cmds.retry(httpGetCmd, [100, 500, 1000], [])
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then(results => {
  results // a list of people from the swapi.co api.  If all retried failed, then []
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `retry`.

## getState

Creates a `getState` cmd.  `yield` a `getState` to get application state.

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a dot notation path on the state to the property.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should return user from application state', testExample(() => {
    return args()
      .yieldCmd(cmds.getState('user.name'))
      .returns('John Doe')
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  return yield cmds.getState('user.name')
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then(result => {
  result === 'Jane Doe' //  if user.name on the state equals 'Jane Doe'
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `getState`.

## setState

Creates a `setState` cmd.  `yield` a `setState` to set application state.

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a dot notation path on the state to the property.
-   `payload` **any?** A value that will be set on the state.


**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should set a user on the application state', testExample(() => {
    const user = { user: '123' }
    return args()
      .yieldCmd(cmds.setState('user', user))
      .returns()
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example (user) {
  return yield cmds.setState('user', user)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

const user = { id: '123', username: 'foo' }
call({}, handlers, example, user).then(result => {
  // the state should now have a user property on it equalling `user`
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `setState`.

## setImmediate

Create an `setImmediate` cmd.  `yield` a `setImmediate` to send the command to the end of the call queue.

**Parameters**

-   `command` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an effects-as-data command.

**Examples**

```javascript
//  Test It
const { testFn, args } = require('effects-as-data/test')
const { cmds } = require('effects-as-data-universal')
const testExample = testFn(example)

describe('example()', () => {
  it('should use setImmediate', testExample(() => {
    const echoCmd = cmds.echo('hello world')
    return args()
      .yieldCmd(cmds.setImmediate(echoCmd))
      .returns()
  }))
})
```

```javascript
//  Write It
const { cmds } = require('effects-as-data-universal')

function * example () {
  const echoCmd = cmds.echo('hello world')
  return yield cmds.setImmediate(echoCmd)
}
```

```javascript
//  Run It
const { handlers } = require('effects-as-data-universal')
const { call } = require('effects-as-data')

call({}, handlers, example).then(result => {
  result === undefined // true.  the echo command will be handled in the next tick
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an cmd of type `setImmediate`.
