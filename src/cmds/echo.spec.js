const { echo } = require("./echo");
const { deepEqual } = require("assert");

describe("echo()", () => {
  it("should return an echo cmd with a payload field", () => {
    const expected = {
      type: "echo",
      payload: "123"
    };

    const actual = echo(123);

    deepEqual(actual, expected);
  });
});
