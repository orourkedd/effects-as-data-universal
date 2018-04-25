function randomNumberFn(random) {
  return random();
}

module.exports = {
  randomNumberFn,
  randomNumber: cmd => randomNumberFn(Math.random, cmd)
};
