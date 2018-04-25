const cmds = require("../cmds/now");
const { nowFn } = require("./now");
const { deepEqual } = require("assert");

describe("now()", () => {
  it("should return a now", () => {
    const cmd = cmds.now();
    const dateNow = () => 123;
    const actual = nowFn(dateNow, cmd);
    const expected = 123;
    deepEqual(actual, expected);
  });
});
