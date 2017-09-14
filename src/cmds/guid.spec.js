const { guid } = require("./guid");
const { deepEqual } = require("assert");

describe("#guid", () => {
  it("should return a guid cmd", () => {
    const expected = { type: "guid" };
    const actual = guid();
    deepEqual(actual, expected);
  });
});
