const cmds = require("../cmds/guid");
const { guidFn } = require("./guid");
const { deepEqual } = require("assert");

describe("#guid", () => {
  it("should return a guid", () => {
    const cmd = cmds.guid();
    const uuidV4 = () => "70776e6f-8476-4304-bfd2-3bc2e4bdd996";
    const actual = guidFn(uuidV4, cmd);
    const expected = "70776e6f-8476-4304-bfd2-3bc2e4bdd996";
    deepEqual(actual, expected);
  });
});
