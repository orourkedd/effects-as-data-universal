function retry(cmd, durations, defaultValue) {
  if (!Array.isArray(durations)) throw new Error("durations must be an array");
  if (durations.length === 0)
    throw new Error("durations must have at least on duration");
  return {
    type: "retry",
    cmd,
    durations,
    defaultValue
  };
}

module.exports = {
  retry
};
