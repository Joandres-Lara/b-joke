const pubSub = require("../util-tests/pattern-publisher-subscriber");
const combineFns = require("@app/util/combine-fns").default;

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
 callFilter: callFilterCommand,
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
mocked.call = mocked.dispatch = jest.fn((event, ...args) =>
 callFilterOn(({ event: e }) => e === event, ...args)
);
mocked.createMessage = mockCreateMessage;

const mockRegisterCommand = jest.fn(registerCommand);
/**
 * This return a list channels
 */
const mockRestBuildChannels = jest.fn(() => []);

const mockedCommandClient = jest.fn(() => {
 const mockReturn = {
  registerCommand: mockRegisterCommand,
  createMessage: mockCreateMessage,
  guilds: [897878783],
  getRESTGuildChannels: mockRestBuildChannels,
  on: mockRegisterOn
 };

 Object.defineProperty(mockReturn, "dispatchEvent", {
  configurable: false,
  value: mocked.call
 });

 return mockReturn;
});

mockedCommandClient.registerCommand = mockRegisterCommand;
mockedCommandClient.dispatchCommand = jest.fn((command, ...args) =>
 callFilterCommand(({ command: c }) => c === command, ...args)
);
mockedCommandClient.createMessage = mockCreateMessage;

mocked.CommandClient = mockedCommandClient;

mocked.configureCommandClient = (mock) => {
 mocked.CommandClient = jest.fn(combineFns(mockedCommandClient, mock));
};

module.exports = mocked;
