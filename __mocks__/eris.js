const pubSub = require("../util-tests/pattern-publisher-subscriber");

const {
 register: registerOn,
 call: callOn,
 callFilter: callFilterOn,
} = pubSub(
 (event, cb) => ({ event, cb }),
 ({ cb }) => cb
);

const {
 register: registerCommand,
 call: callCommand,
 callFilter: callFilterCommand
} = pubSub(
 (command, cb) => ({ command, cb }),
 ({ cb }) => cb
);

const mockCreateMessage = jest.fn();

const mockRegisterOn = jest.fn(registerOn);

const mocked = jest.fn(() => {
 return {
  on: mockRegisterOn,
  createMessage: mockCreateMessage,
 };
});

mocked.register = mocked.on = mockRegisterOn;
mocked.call = mocked.dispatch = jest.fn((event, ...args) => callFilterOn(({event: e}) => (e === event), ...args));
mocked.createMessage = mockCreateMessage;

const mockRegisterCommand = jest.fn(registerCommand);

const mockedCommandClient = jest.fn(() => {
 return {
  registerCommand: mockRegisterCommand,
  createMessage: mockCreateMessage
 }
});

mockedCommandClient.registerCommand = mockRegisterCommand;
mockedCommandClient.dispatchCommand = jest.fn((command, ...args) => callFilterCommand(({ command: c }) => c === command, ...args));
mockedCommandClient.createMessage = mockCreateMessage;

mocked.CommandClient = mockedCommandClient;

module.exports = mocked;
