const { jsonParse } = require("./json-parse");
const cmds = require("../cmds");
const { deepEqual } = require("assert");

describe("jsonParse()", () => {
  it("should parsed json", () => {
    const cmd = cmds.jsonParse('{"id":123}');
    const expected = { id: 123 };
    const actual = jsonParse(cmd);
    deepEqual(actual, expected);
  });
});
