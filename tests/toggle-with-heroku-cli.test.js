import { exec } from "child_process";
import { isAfter } from "date-fns";
import { resolve } from "path";

/** @type {import("jest").MockedFunction<typeof exec>} */
const execMock = exec;
/** @type {import("jest").MockedFunction<typeof isAfter>} */
const isAfterMock = isAfter;

jest.mock("child_process", () => {
 return {
  exec: jest.fn((command, callback) => callback(null, "")),
 };
});

jest.mock("date-fns", () => {
 const originalEndOfMonth = jest.requireActual("date-fns/endOfMonth");
 return {
  isAfter: jest.fn(() => false),
  endOfMonth: originalEndOfMonth,
 };
});

jest.useFakeTimers("legacy");
describe("Toggle with heroku cli", () => {
 beforeEach(() => {
  const spierProcessExit = jest.spyOn(process, "exit");
  // Reset implementation
  spierProcessExit.mockImplementation(() => {});
 });

 test("Stop bot if need", async () => {
  execMock.mockImplementation((command, callback) => {
   callback(
    null,
    `
   Free dyno hours quota remaining this month: 426h 30m (77%)
   Free dyno usage for this app: 123h 29m (22%)
   For more information on dyno sleeping and how to upgrade, see:
   https://devcenter.heroku.com/articles/dyno-sleeping
   `
   );
  });

  isAfterMock.mockReturnValue(true);

  await (
   await import("../bin/toggle-with-heroku-cli")
  ).default;

  expect(execMock).toHaveBeenCalledTimes(2);
  expect(execMock).toHaveBeenNthCalledWith(
   1,
   "heroku ps",
   expect.any(Function)
  );

  expect(isAfterMock).toHaveBeenCalledTimes(1);

  expect(execMock).toHaveBeenNthCalledWith(
   2,
   "heroku ps:scale worker=0",
   expect.any(Function)
  );
 });
});
