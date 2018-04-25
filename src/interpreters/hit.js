function hit(cmd, { context, interpreters, call }, index = 0) {
  const fn = function*() {
    return yield cmd.cmds[index];
  };
  return call(context, interpreters, fn)
    .then(result => {
      if (result) return result;
      checkForEnd(index, cmd.cmds);
      return hit(cmd, { context, interpreters, call }, index + 1);
    })
    .catch(() => {
      checkForEnd(index, cmd.cmds);
      return hit(cmd, { context, interpreters, call }, index + 1);
    });
}

function checkForEnd(index, cmds) {
  if (index > cmds.length - 1) {
    throw new Error(
      "hit could not return a value because every cmd failed or returned a falsey value."
    );
  }
}

module.exports = {
  hit
};
