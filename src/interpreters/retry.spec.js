const { retry } = require("./retry");
const { echo } = require("effects-as-data");
const cmds = require("../cmds");

test("retry", () => {
  const durations = [10, 20, 30];
  let count = 0;
  // a mock call
  const call = (context, interpreters, fn) => {
    const g = fn();
    g.next();
    count++;
    const e = new Error("foo");
    let v;
    try {
      v = g.throw(e);
    } catch (e2) {
      return Promise.reject(e);
    }
    return Promise.resolve(v.value);
  };
  const cmd = cmds.retry(echo("foo"), durations, "default");
  return retry(cmd, { call }).then(r => {
    expect(r).toEqual("default");
  });
});
