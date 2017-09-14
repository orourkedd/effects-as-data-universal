function hit(...cmds) {
  // Validation
  if (cmds.length === 0) throw new Error("At least one cmd is required.");
  cmds.forEach(cmd => {
    if (!cmd.type) throw new Error("All cmds must have a type.");
  });
  return {
    type: "hit",
    cmds
  };
}

module.exports = {
  hit
};
