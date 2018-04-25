const interpreters = require("./poll");
const cmds = require("../cmds");
const { call } = require("effects-as-data/core");
const { set } = require("object-path-immutable");

test("poll() should poll until tryCount is reached", () => {
  function* foo(ctx) {
    return set(ctx, "count", (ctx.count || 0) + 1);
  }
  return interpreters
    .poll(cmds.poll(foo, {}, 100, 3), {
      context: {},
      call,
      interpreters: {}
    })
    .then(ctx => {
      expect(ctx.count).toEqual(3);
    });
});

test("poll() should abort if done is true", () => {
  let count = 0;
  function* foo(ctx) {
    count++;
    return set(ctx, "done", true);
  }
  return interpreters
    .poll(cmds.poll(foo, {}, 1), {
      context: {},
      call,
      interpreters: {}
    })
    .then(ctx => {
      expect(count).toEqual(1);
    });
});

test("clearPoll() should clear interval", () => {
  let count = 0;
  function* foo(ctx, id) {
    count++;
    if (count === 5) yield cmds.clearPoll(id);
    return ctx;
  }
  return interpreters
    .poll(cmds.poll(foo, {}, 1, 100), {
      context: {},
      call,
      interpreters
    })
    .then(ctx => {
      expect(count).toEqual(5);
    });
});

test("poll() should handle error in function", () => {
  let count = 0;
  function* foo(ctx) {
    throw new Error("oops");
  }
  return interpreters
    .poll(cmds.poll(foo, {}, 1), {
      context: {},
      call,
      interpreters: {}
    })
    .then(() => {
      fail("should have thrown");
    })
    .catch(e => {
      expect(e.message).toEqual("oops");
    });
});
