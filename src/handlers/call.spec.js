const { call } = require("./call");
const { stub } = require("sinon");
const cmds = require("../cmds");

test("call handler should run command", () => {
  const callStub = stub().returns(Promise.resolve("foo"));
  const cmd = cmds.call(function*() {}, 1, 2);
  const config = { name: "testfn" };
  const handlers = { test: () => "bar" };
  return call(cmd, { config, call: callStub, handlers }).then(result => {
    expect(callStub.firstCall.args[0]).toEqual(config);
    expect(callStub.firstCall.args[1]).toEqual(handlers);
    expect(callStub.firstCall.args[2]).toEqual(cmd.fn);
    expect(callStub.firstCall.args[3]).toEqual(1);
    expect(callStub.firstCall.args[4]).toEqual(2);
    expect(result).toEqual("foo");
  });
});
