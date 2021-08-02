const { call, register } = require("../../../../util-tests/pattern-publisher-subscriber")();

const mockRegister = jest.fn(register);

const mocked = jest.fn(() => {
	return {
		getJoke: mockRegister
	}
});

mocked.getJoke = mockRegister;
mocked.callGetJoke = jest.fn(call);
module.exports = mocked;
