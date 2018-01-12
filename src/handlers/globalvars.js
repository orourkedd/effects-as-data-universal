function globalvars({ name }) {
  if (!name) throw new Error("name required.");
  const g = typeof window === "undefined" ? global : window;
  return g[name];
}

module.exports = {
  global: globalvars
};
