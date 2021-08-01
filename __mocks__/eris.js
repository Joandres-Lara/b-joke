const { MESSAGE_CREATE } = require("../src/app/constants");
const pubSub = require("../util-tests/pattern-publisher-subscriber");

const { register, call, callFilter } = pubSub(
	(event, cb) => ({ event, cb }),
	({ cb }) => cb
);

const createMessageMock = jest.fn((...args) => {
 return callFilter(({ event }) => event === MESSAGE_CREATE, ...args);
})

const mocked = jest.fn(() => {
	return {
		on: register,
  createMessage: createMessageMock
	};
});

mocked.register = mocked.on = register;
mocked.call = mocked.dispatch = (_, ...args) => call(...args);
mocked.createMessage = createMessageMock;

module.exports = mocked;
