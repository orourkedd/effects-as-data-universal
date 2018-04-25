const interpreters = require("./sleep");
const cmds = require("../cmds");
const assert = require("assert");

test("sleep() should sleep", () => {
  function* foo(ctx) {
    yield cmds.sleep(100);
  }
  const start = Date.now();
  return interpreters.sleep(cmds.sleep(100)).then(ctx => {
    assert(Date.now() - start >= 100);
  });
});
