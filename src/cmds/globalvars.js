function globalvars(name) {
  if (!name) throw new Error("name required.");
  return {
    type: "global",
    name
  };
}

module.exports = {
  global: globalvars
};
