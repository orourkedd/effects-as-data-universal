const { invoke } = require("./invoke");
const cmds = require("../cmds");
const { deepEqual } = require("assert");
const { call } = require("effects-as-data");
const { promisify } = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const obj = {
  a1: function() {
    return this.a2();
  },
  a2: function() {
    return Promise.resolve("a");
  },
  b1: function(done) {
    this.b2(done);
  },
  b2: function(done) {
    done(null, "b");
  },
  c1: function(done) {
    done(new Error("oops"));
  }
};

test("invoke() should execute a function", async () => {
  const now = Date.now();
  const expected = "foo";
  function* test() {
    yield cmds.invoke(writeFile, `/tmp/test-${now}.js`, expected, {
      encoding: "utf8"
    });
    return yield cmds.invoke(readFile, `/tmp/test-${now}.js`, {
      encoding: "utf8"
    });
  }

  const actual = await call({}, { invoke }, test);
  expect(actual).toEqual(expected);
});

test("invokeCtx() should execute a function with a ctx", async () => {
  const now = Date.now();
  function* test() {
    return yield cmds.invokeCtx(obj.a1, obj);
  }

  const actual = await call({}, { invoke }, test);
  expect(actual).toEqual("a");
});

test("invokeCallback() should execute a callback", async () => {
  const now = Date.now();
  const expected = "foo";
  function* test() {
    yield cmds.invokeCallback(writeFile, `/tmp/test-${now}.js`, expected, {
      encoding: "utf8"
    });
    return yield cmds.invokeCallback(readFile, `/tmp/test-${now}.js`, {
      encoding: "utf8"
    });
  }

  const actual = await call({}, { invoke }, test);
  expect(actual).toEqual(expected);
});

test("invokeNode() should execute a callback", async () => {
  const now = Date.now();
  const expected = "foo";
  function* test() {
    yield cmds.invokeCallback(writeFile, `/tmp/test-${now}.js`, expected, {
      encoding: "utf8"
    });
    return yield cmds.invokeNode(readFile, `/tmp/test-${now}.js`, {
      encoding: "utf8"
    });
  }

  const actual = await call({}, { invoke }, test);
  expect(actual).toEqual(expected);
});

test("invokeCallbackCtx() should execute a function with a ctx and callback", async () => {
  const now = Date.now();
  function* test() {
    return yield cmds.invokeCallbackCtx(obj.b1, obj);
  }

  const actual = await call({}, { invoke }, test);
  expect(actual).toEqual("b");
});

test("invokeNodeCtx() should execute a function with a ctx and callback", async () => {
  const now = Date.now();
  function* test() {
    return yield cmds.invokeNodeCtx(obj.b1, obj);
  }

  const actual = await call({}, { invoke }, test);
  expect(actual).toEqual("b");
});

test("invokeCallback() should be able to handle errors", async () => {
  const now = Date.now();
  function* test() {
    return yield cmds.invokeCallback(obj.c1);
  }

  try {
    await call({}, { invoke }, test);
  } catch (e) {
    expect(e.message).toEqual("oops");
    return;
  }
  fail("Did not throw");
});
