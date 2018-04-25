const uuid = require("uuid");

function guidFn(v4) {
  return v4();
}

module.exports = {
  guidFn,
  guid: cmd => guidFn(uuid.v4, cmd)
};
