const { call, register } = require("../../../../util-tests/pattern-publisher-subscriber")();

const mocked = jest.fn(() => {
	return {
		getJoke: register
	}
});

mocked.getJoke = register;
mocked.callGetJoke = call;
module.exports = mocked;
