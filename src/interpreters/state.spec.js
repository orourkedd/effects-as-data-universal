const { getState, setState, getGlobalState } = require("./state");
const cmds = require("../cmds");
const { deepEqual } = require("assert");

describe("getState()", () => {
  it("should return values from state represented by keys", () => {
    const cmd = cmds.getState("foo");
    global.effectsAsDataState = {
      foo: 1
    };
    const expected = 1;
    const actual = getState(cmd);
    deepEqual(actual, expected);
  });
});

describe("setState()", () => {
  it("should return values from state represented by keys", () => {
    const foo = Date.now();
    const cmd = cmds.setState("foo", foo);
    setState(cmd);
    const expected = foo;
    const actual = getGlobalState().foo;
    deepEqual(actual, expected);
  });
});
