import { exec, exec as execMock } from "child_process";
import { isAfter as isAfterMock } from "date-fns";
import toggleWithHerokuCli from "../bin/toggle-with-heroku-cli";
import readLine from "readline";

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

jest.mock("readline", () => {
 const mockPrompt = {
  question: jest.fn((...[, callback]) => callback()),
  close: jest.fn(),
 };

 return {
  createInterface: jest.fn(() => mockPrompt),
 };
});

jest.useFakeTimers("legacy");
describe("Toggle with heroku cli", () => {
 beforeEach(() => {
  const spierConsoleLog = jest.spyOn(console, "log");
  const spierProcessExit = jest.spyOn(process, "exit");
  // Reset implementation
  spierProcessExit.mockImplementation(() => {});
  spierConsoleLog.mockImplementation(() => {});
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

  await toggleWithHerokuCli();

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

 test("Start bot", async () => {
  execMock.mockImplementation((command, callback) => {
   callback(
    null,
    `
   Free dyno hours quota remaining this month: 426h 30m (77%)
   Free dyno usage for this app: 123h 29m (22%)
   No dynos on
   `
   );
  });

  await toggleWithHerokuCli();

  expect(execMock).toHaveBeenCalledTimes(2);
  expect(execMock).toHaveBeenNthCalledWith(
   2,
   "heroku ps:scale worker=1",
   expect.any(Function)
  );
 });

 test("No stop bot when has enougth hours", async () => {
  const spierInfo = jest.spyOn(console, "info");
  spierInfo.mockImplementation(() => {});

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

  isAfterMock.mockReturnValue(false);

  await toggleWithHerokuCli();

  expect(execMock).toHaveBeenCalledTimes(1);
  expect(spierInfo).toHaveBeenCalledWith(
   "No es necesario apagar el bot, todo estará bien si se queda encendido"
  );
 });

 test("Throw error when excend limit time response Heroku cli", async () => {
  const spierError = jest.spyOn(console, "error");
  spierError.mockImplementation(() => {});
  execMock.mockImplementation(() => {});

  const promiseToggle = toggleWithHerokuCli();
  jest.runAllTimers();
  await promiseToggle;

  expect(spierError).toHaveBeenCalledWith(
   new Error(
    "La petición ha tardado demasiado, revisa si la aplicación no necesita el token para iniciar sesión"
   )
  );
 });
});
