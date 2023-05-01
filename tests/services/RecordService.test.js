import RecordService from "@services/RecordService";
import DefaultStorage from "@app/Storages/DefaultStorage";
import Eris from "eris";

describe("new RecordService", () => {

 let
  /** @type {RecordService} */
 instanceRecordService,
 /** @type {import("@app/Storages/StorageJobs/PostgresStorageJobs").default} */
 storage;

 beforeEach(() => {
  storage = new DefaultStorage();
  instanceRecordService = new RecordService(new Eris.CommandClient(), null, {get: () => storage});
  instanceRecordService.init();
 });
 
 test("Append action job", () => {

 });
});
