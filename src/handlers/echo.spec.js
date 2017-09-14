const { echo } = require("./echo");
const cmds = require("../cmds");
const { deepEqual } = require("assert");

describe("echo()", () => {
  it("should return cmd.payload", () => {
    const cmd = cmds.echo(123);
    const expected = 123;
    const actual = echo(cmd);
    deepEqual(actual, expected);
  });
});
