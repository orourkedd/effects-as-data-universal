const { now } = require("./now");
const { deepEqual } = require("assert");

describe("now()", () => {
  it("should return a now cmd", () => {
    const expected = { type: "now" };
    const actual = now();
    deepEqual(actual, expected);
  });
});
