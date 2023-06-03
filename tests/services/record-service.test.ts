import RecordService from "@services/record-service";
import DefaultStorage from "@app/Storages/DefaultStorage";
import Resolver from "@app/resolver";
import configureApp from "@util-tests/configure-app";
import Eris from "eris";
import PostgresStorageJobs from "@app/Storages/StorageJobs/PostgresStorageJobs";
import ErrorCronParseMessage from "@app/Messages/ErrorCronParseMessage";
import createMessageMock from "@util-tests/create-message-mock";
import ActionParser from "@app/Parsers/ActionParser";
import CronParser from "@app/Parsers/CronParser";
import { jest } from "@jest/globals";
import ErrorActionParseMessage from "@app/Messages/ErrorActionParseMessage";
import PostgresStorageManager from "@app/Storages/PostgresStorageManager";
import InvalidRecordMessage from "@app/Messages/InvalidRecordMessage";
import RecordSuccesfully from "@app/Messages/RecordSuccesfullyMessage";
import wait from "@app/util/wait";

jest.mock("@app/Parsers/ActionParser");
jest.mock("@app/Parsers/CronParser");

describe("new RecordService", () => {

 let
  /** @type {RecordService} */
  recordService: RecordService,
  /** @type {import("@app/Storages/StorageJobs/PostgresStorageJobs").default} */
  storage: PostgresStorageJobs,
  spierSendMessage: jest.Spied<InstanceType<typeof RecordService>["sendMessage"]>;

 beforeEach(() => {
  configureApp();

  storage = new DefaultStorage();

  Resolver.set("storage", {
   get: () => storage
  } as unknown as PostgresStorageManager);

  recordService = new RecordService();
  recordService.init();
  spierSendMessage = jest.spyOn(recordService, "sendMessage");

  ActionParser.mockImplementation(() => ({
   parse: () => "",
   hasError: () => false,
  }));

  CronParser.mockImplementation(() => ({
   parse: () => "",
   hasError: () => false
  }))
 });

 test("should cron parser has error", async () => {

  const parseCronMock = jest.fn();
  const getErrorCronMock = jest.fn().mockReturnValue(new Error(""));
  const resetErrorCronMock = jest.fn();

  CronParser.mockImplementation(() => ({
   hasError: () => true,
   parse: parseCronMock,
   getError: getErrorCronMock,
   resetError: resetErrorCronMock
  }))

  const actionParser = new ActionParser();
  const cronParser = new CronParser();

  recordService.setActionParser(actionParser);
  recordService.setCronParser(cronParser);

  Eris.CommandClient.dispatchCommand("record", createMessageMock(), ["El siguiente fin de semana"]);

  // await wait(1);

  expect(spierSendMessage).toHaveBeenCalledTimes(1);
  expect(spierSendMessage).toHaveBeenCalledWith(createMessageMock.channelId, expect.any(ErrorCronParseMessage))
 });

 test("should action parser has error", () => {

  ActionParser.mockImplementation(() => ({
   hasError: () => true,
   getError: jest.fn(() => new Error("Upss")),
   parse: jest.fn(() => null),
   resetError: jest.fn()
  }))

  CronParser.mockImplementation(() => ({
   hasError: () => false,
   getError: jest.fn(() => new Error("Upss")),
   parse: jest.fn(() => null),
   resetError: jest.fn()
  }));

  const action_parser = new ActionParser();
  const cron_parser = new CronParser();

  recordService.setActionParser(action_parser);
  recordService.setCronParser(cron_parser);

  Eris.CommandClient.dispatchCommand("record", createMessageMock(), ["Hello world"]);

  expect(spierSendMessage).toHaveBeenCalledTimes(1);
  expect(spierSendMessage).toHaveBeenCalledWith(createMessageMock.channelId, expect.any(ErrorActionParseMessage))
 });

 test("should called with not args in message", () => {
  const action_parser = new ActionParser();
  const cron_parser = new CronParser();

  recordService.setActionParser(action_parser);
  recordService.setCronParser(cron_parser);

  Eris.CommandClient.dispatchCommand("record", createMessageMock(), []);

  expect(spierSendMessage).toHaveBeenCalledTimes(1);
  expect(spierSendMessage).toHaveBeenCalledWith(createMessageMock.channelId, expect.any(InvalidRecordMessage))
 });

 test("should send succesfully message", async () => {
  ActionParser.mockImplementation(() => ({
   hasError: () => false,
   getError: jest.fn(() => new Error("Upss")),
   parse: jest.fn(() => "Llevar a la tienda"),
   resetError: jest.fn()
  }))

  CronParser.mockImplementation(() => ({
   hasError: () => false,
   getError: jest.fn(() => new Error("Upss")),
   parse: jest.fn(() => new Date().toJSON()),
   resetError: jest.fn()
  }));

  const action_parser = new ActionParser();
  const cron_parser = new CronParser();

  recordService.setActionParser(action_parser);
  recordService.setCronParser(cron_parser);

  Eris.CommandClient.dispatchCommand("record", createMessageMock(), ["Recuerdame llevar a la tienda las caguamas a las 2"]);

  await wait(1);

  expect(spierSendMessage).toHaveBeenCalledTimes(1);
  expect(spierSendMessage).toHaveBeenCalledWith(createMessageMock.channelId, expect.any(RecordSuccesfully))
 });
});
