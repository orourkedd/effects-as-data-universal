const { call } = require("./call");
const { deepEqual } = require("assert");

describe("#call", () => {
  it("should return a call cmd", () => {
    const fn = function*() {};
    const a = call(fn, "foo", "bar");
    deepEqual(a, {
      type: "call",
      args: ["foo", "bar"],
      fn
    });
  });
});
