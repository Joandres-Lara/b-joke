const original = jest.requireActual("node-schedule");
const pubSub = require("../util-tests/pattern-publisher-subscriber");

const { call, register, callFilter } = pubSub(
 (cronExpression, cb) => ({ cronExpression, cb }),
 ({ cb }) => (cb)
);

const mockSchedule = jest.fn(register);
const mockCall = jest.fn((cronExpression, ...args) => callFilter(({ cronExpression: c }) => c === cronExpression, ...args))
const callAll = call;

module.exports = {
 scheduleJob: mockSchedule,
 call: mockCall,
 callAll,
 RecurrenceRule: original.RecurrenceRule
}
