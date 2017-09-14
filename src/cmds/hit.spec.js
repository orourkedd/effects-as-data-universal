const { hit } = require("./hit");
const { echo } = require("./echo");
const { guid } = require("./guid");
const { now } = require("./now");

test("hit()", () => {
  const actual = hit(guid(), now(), echo("foo"));
  const expected = {
    type: "hit",
    cmds: [guid(), now(), echo("foo")]
  };
  expect(actual).toEqual(expected);
});

test("hit() should throw if no commands", () => {
  expect(() => hit()).toThrow("At least one cmd is required.");
});

test("hit() should throw if invalid cmds", () => {
  expect(() => hit({})).toThrow("All cmds must have a type.");
});
