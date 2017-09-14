const { getState, setState } = require("./state");
const { deepEqual } = require("assert");

describe("getState()", () => {
  it("should return a getState cmd with a key field", () => {
    const expected = {
      type: "getState",
      path: "foo"
    };

    const actual = getState("foo");

    deepEqual(actual, expected);
  });
});

describe("setState()", () => {
  it("should return a setState cmd with a key and payload field", () => {
    const expected = {
      type: "setState",
      payload: { foo: "bar" },
      path: "baz"
    };

    const actual = setState("baz", { foo: "bar" });

    deepEqual(actual, expected);
  });
});
