import { default as createPattern } from "@util-tests/pattern-publisher-subscriber"

const { call, register } = createPattern();

const mockRegister = jest.fn(register);

const mocked = jest.fn(() => {
 return {
  getJoke: mockRegister
 }
});

mocked.getJoke = mockRegister;
mocked.callGetJoke = jest.fn(call);
module.exports = mocked;
