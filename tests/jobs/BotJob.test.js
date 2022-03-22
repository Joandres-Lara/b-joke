import RecordJobs from "@jobs/RecordJobs";
import { advanceTo } from "jest-date-mock";
import DefaultStorageJobs from "@app/Storages/DefaultStorage";
import Eris from "eris";

describe("@jobs/JobBot", () => {
 /** @type {RecordJobs} */
 let jobInstance, instanceStorage;

 beforeEach(() => {
  advanceTo(new Date(2020, 10, 10));
  instanceStorage = new DefaultStorageJobs();
  jobInstance = new RecordJobs(new Eris.CommandClient(), null, {
   get: () => instanceStorage,
  });
 });

 test("Initialize only schedules valids", () => {
 });
});
