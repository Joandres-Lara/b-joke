import Logger from "@app/Logger";
import { inspect } from "util";

jest.mock("util", () => {
 return {
  inspect: jest.fn()
 }
})

describe("logger", () => {
 const methodsLogger = [
  "log",
  "warn",
  "info",
  "default"
 ] as const;

 let spierLog: jest.Spied<typeof console["log"]>;

 beforeEach(() => {
  spierLog = jest.spyOn(console, "log");
 })

 afterEach(() => {
  spierLog.mockRestore();
 });

 test.each(methodsLogger)("not called logger function (%s)", (method) => {
  const spierIncludes = jest.spyOn(process.argv, "includes");
  spierIncludes.mockReturnValue(true);

  const instance = new Logger();
  instance[method]("Hello word");
  expect(spierLog).not.toHaveBeenCalled();
 });

 test.each(methodsLogger)("called logger function (%s)", method => {
  const spierIncludes = jest.spyOn(process.argv, "includes");
  spierIncludes.mockReturnValue(false);

  const instance = new Logger();
  instance[method]("Hello word");
  expect(spierLog).toHaveBeenCalled();
 });

 test("logger object with inspect", () => {
  const spierIncludes = jest.spyOn(process.argv, "includes");
  spierIncludes.mockReturnValue(false);
  const logger = new Logger();
  logger.object({ logger });
  expect(inspect).toHaveBeenCalledTimes(1);
 });
});