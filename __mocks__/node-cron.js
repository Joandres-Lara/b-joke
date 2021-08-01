const { call, register } = require("../util-tests/pattern-publisher-subscriber")();

module.exports = {
 schedule: register,
 call: call
}
