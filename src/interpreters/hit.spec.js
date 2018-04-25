const { hit } = require("./hit");
const cmds = require("../cmds");
const { call } = require("effects-as-data/core");

test("hit()", () => {
  const interpreters = {
    one: () => "foo"
  };
  const testCmds = {
    one: { type: "one" }
  };
  const cmd = cmds.hit(testCmds.one);
  return hit(cmd, { interpreters, context: {}, call }).then(result => {
    expect(result).toEqual("foo");
  });
});

test("hit() should go to next on error", () => {
  const interpreters = {
    one: () => {
      throw new Error("oops");
    },
    two: () => "foo"
  };
  const testCmds = {
    one: { type: "one" },
    two: { type: "two" }
  };
  const cmd = cmds.hit(testCmds.one, testCmds.two);
  return hit(cmd, { interpreters, context: {}, call }).then(result => {
    expect(result).toEqual("foo");
  });
});

test("hit() should go to next on falsey value 1", () => {
  const interpreters = {
    one: () => null,
    two: () => "foo"
  };
  const testCmds = {
    one: { type: "one" },
    two: { type: "two" }
  };
  const cmd = cmds.hit(testCmds.one, testCmds.two);
  return hit(cmd, { interpreters, context: {}, call }).then(result => {
    expect(result).toEqual("foo");
  });
});

test("hit() should go to next on falsey value 2", () => {
  const interpreters = {
    one: () => null,
    two: () => null,
    three: () => "foo"
  };
  const testCmds = {
    one: { type: "one" },
    two: { type: "two" },
    three: { type: "three" }
  };
  const cmd = cmds.hit(testCmds.one, testCmds.two, testCmds.three);
  return hit(cmd, { interpreters, context: {}, call }).then(result => {
    expect(result).toEqual("foo");
  });
});

test("hit() should throw error if no hits", async () => {
  const interpreters = {
    one: () => null,
    two: () => null,
    three: () => null
  };
  const testCmds = {
    one: { type: "one" },
    two: { type: "two" },
    three: { type: "three" }
  };
  const cmd = cmds.hit(testCmds.one, testCmds.two, testCmds.three);
  try {
    await hit(cmd, { interpreters, context: {}, call });
  } catch (e) {
    expect(e.message).toEqual(
      "hit could not return a value because every cmd failed or returned a falsey value."
    );
    return;
  }
  fail("hit did not throw");
});

test("hit() should throw error if no hits and error", async () => {
  const interpreters = {
    one: () => null,
    two: () => null,
    three: () => {
      throw new Error("oops");
    }
  };
  const testCmds = {
    one: { type: "one" },
    two: { type: "two" },
    three: { type: "three" }
  };
  const cmd = cmds.hit(testCmds.one, testCmds.two, testCmds.three);
  try {
    await hit(cmd, { interpreters, context: {}, call });
  } catch (e) {
    expect(e.message).toEqual(
      "hit could not return a value because every cmd failed or returned a falsey value."
    );
    return;
  }
  fail("hit did not throw");
});
