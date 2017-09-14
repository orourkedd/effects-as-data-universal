const { httpGetFn, httpDeleteFn, httpPostFn, httpPutFn } = require("./http");
const { deepEqual, equal } = require("assert");
const { stub } = require("sinon");
const cmds = require("../cmds");

const createResponsePromise = (payload, init) =>
  Promise.resolve(new Response(JSON.stringify(payload), init));

describe("httpGetFn", () => {
  it("should make a get request", () => {
    const get = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 200 })
    );
    const cmd = cmds.httpGet(
      "http://www.example.com",
      { test: "header" },
      { credentials: "test" }
    );

    return httpGetFn(get, cmd).then(result => {
      const options = {
        credentials: "test",
        headers: {
          test: "header"
        },
        method: "GET"
      };
      deepEqual(get.firstCall.args[0], "http://www.example.com");
      deepEqual(get.firstCall.args[1], options);
      deepEqual(result, { foo: "bar" });
    });
  });

  it("should make a get request and return meta", () => {
    const get = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 200 })
    );
    const cmd = cmds.httpGet(
      "http://www.example.com",
      { test: "header" },
      { credentials: "test", meta: true }
    );

    return httpGetFn(get, cmd).then(result => {
      const options = {
        credentials: "test",
        headers: {
          test: "header"
        },
        meta: true,
        method: "GET"
      };
      deepEqual(get.firstCall.args[0], "http://www.example.com");
      deepEqual(get.firstCall.args[1], options);
      deepEqual(result.payload, { foo: "bar" });
      deepEqual(result.meta, { status: 200, statusText: "OK", headers: {} });
    });
  });

  it("should make a get request and throw on non 200 status codes", () => {
    const get = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 500 })
    );

    const cmd = cmds.httpGet(
      "http://www.example.com",
      { test: "header" },
      { credentials: "test" }
    );

    return httpGetFn(get, cmd).catch(e => {
      const payload = {
        foo: "bar"
      };

      const meta = {
        status: 500,
        statusText: "Internal Server Error",
        headers: {}
      };
      equal(e instanceof Error, true);
      deepEqual(e.payload, payload);
      deepEqual(e.meta, meta);
    });
  });
});

describe("httpDeleteFn", () => {
  it("should make a delete request", () => {
    const remove = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 200 })
    );

    const cmd = cmds.httpDelete(
      "http://www.example.com",
      { test: "header" },
      { credentials: "test" }
    );

    return httpDeleteFn(remove, cmd).then(result => {
      const options = {
        credentials: "test",
        headers: {
          test: "header"
        },
        method: "DELETE"
      };
      deepEqual(remove.firstCall.args[0], "http://www.example.com");
      deepEqual(remove.firstCall.args[1], options);
      deepEqual(result, { foo: "bar" });
    });
  });

  it("should make a delete request and return meta", () => {
    const remove = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 200 })
    );

    const cmd = cmds.httpDelete(
      "http://www.example.com",
      { test: "header" },
      { credentials: "test", meta: true }
    );

    return httpDeleteFn(remove, cmd).then(result => {
      const options = {
        credentials: "test",
        headers: {
          test: "header"
        },
        meta: true,
        method: "DELETE"
      };
      deepEqual(remove.firstCall.args[0], "http://www.example.com");
      deepEqual(remove.firstCall.args[1], options);
      deepEqual(result.payload, { foo: "bar" });
      deepEqual(result.meta, { status: 200, statusText: "OK", headers: {} });
    });
  });

  it("should make a delete request and throw on non 200 status codes", () => {
    const remove = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 500 })
    );

    const cmd = cmds.httpDelete(
      "http://www.example.com",
      { test: "header" },
      { credentials: "test" }
    );

    return httpDeleteFn(remove, cmd).catch(e => {
      const payload = {
        foo: "bar"
      };
      const meta = {
        status: 500,
        statusText: "Internal Server Error",
        headers: {}
      };

      equal(e instanceof Error, true);
      deepEqual(e.payload, payload);
      deepEqual(e.meta, meta);
    });
  });
});

describe("httpPostFn", () => {
  it("should make a post request", () => {
    const post = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 200 })
    );

    const cmd = cmds.httpPost(
      "http://www.example.com",
      { pay: "load" },
      { test: "header" },
      { credentials: "test" }
    );

    return httpPostFn(post, cmd).then(result => {
      const options = {
        credentials: "test",
        headers: {
          test: "header",
          "Content-Type": "application/json;charset=UTF-8"
        },
        method: "POST",
        body: JSON.stringify({
          pay: "load"
        })
      };

      deepEqual(post.firstCall.args[0], "http://www.example.com");
      deepEqual(post.firstCall.args[1], options);
      deepEqual(result, { foo: "bar" });
    });
  });

  it("should make a post request and return meta", () => {
    const post = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 200 })
    );

    const cmd = cmds.httpPost(
      "http://www.example.com",
      { pay: "load" },
      { test: "header" },
      { credentials: "test", meta: true }
    );

    return httpPostFn(post, cmd).then(result => {
      const options = {
        credentials: "test",
        headers: {
          test: "header",
          "Content-Type": "application/json;charset=UTF-8"
        },
        meta: true,
        method: "POST",
        body: JSON.stringify({
          pay: "load"
        })
      };

      deepEqual(post.firstCall.args[0], "http://www.example.com");
      deepEqual(post.firstCall.args[1], options);
      deepEqual(result.payload, { foo: "bar" });
      deepEqual(result.meta, { status: 200, statusText: "OK", headers: {} });
    });
  });

  it("should make a post request and throw on non 200 status codes", () => {
    const post = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 500 })
    );

    const cmd = cmds.httpPost(
      "http://www.example.com",
      { pay: "load" },
      { test: "header" },
      { credentials: "test" }
    );

    return httpPostFn(post, cmd).catch(e => {
      const payload = {
        foo: "bar"
      };

      const meta = {
        status: 500,
        statusText: "Internal Server Error",
        headers: {}
      };

      equal(e instanceof Error, true);
      deepEqual(e.payload, payload);
      deepEqual(e.meta, meta);
    });
  });
});

describe("httpPutFn", () => {
  it("should make a put request", () => {
    const put = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 200 })
    );

    const cmd = cmds.httpPut(
      "http://www.example.com",
      { pay: "load" },
      { test: "header" },
      { credentials: "test" }
    );

    return httpPutFn(put, cmd).then(result => {
      const options = {
        credentials: "test",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          test: "header"
        },
        method: "PUT",
        body: JSON.stringify({
          pay: "load"
        })
      };
      deepEqual(put.firstCall.args[0], "http://www.example.com");
      deepEqual(put.firstCall.args[1], options);
      deepEqual(result, { foo: "bar" });
    });
  });

  it("should make a put request and return meta", () => {
    const put = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 200 })
    );

    const cmd = cmds.httpPut(
      "http://www.example.com",
      { pay: "load" },
      { test: "header" },
      { credentials: "test", meta: true }
    );

    return httpPutFn(put, cmd).then(result => {
      const options = {
        credentials: "test",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          test: "header"
        },
        method: "PUT",
        body: JSON.stringify({
          pay: "load"
        }),
        meta: true
      };
      deepEqual(put.firstCall.args[0], "http://www.example.com");
      deepEqual(put.firstCall.args[1], options);
      deepEqual(result.payload, { foo: "bar" });
      deepEqual(result.meta, { status: 200, statusText: "OK", headers: {} });
    });
  });

  it("should make a post request and throw on non 200 status codes", () => {
    const put = stub().returns(
      createResponsePromise({ foo: "bar" }, { status: 500 })
    );

    const cmd = cmds.httpPut(
      "http://www.example.com",
      { pay: "load" },
      { test: "header" },
      { credentials: "test", meta: true }
    );

    return httpPutFn(put, cmd).catch(e => {
      const payload = {
        foo: "bar"
      };

      const meta = {
        status: 500,
        statusText: "Internal Server Error",
        headers: {}
      };

      equal(e instanceof Error, true);
      deepEqual(e.payload, payload);
      deepEqual(e.meta, meta);
    });
  });
});
