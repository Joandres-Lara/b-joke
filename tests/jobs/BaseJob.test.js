import Eris from "eris";
import DefaultStorage from "@app/Storages/DefaultStorage";
import BaseJob from "@jobs/BaseJob";
import nodeSchedule from "node-schedule";

describe("new BaseJob()", () => {
 /** @type {import("@jobs/BaseJob").default} */
 let instanceBaseJob, instanceStorage;

 beforeEach(() => {
  instanceStorage = new DefaultStorage();
  instanceBaseJob = new BaseJob(new Eris.CommandClient(), null, {
   get: () => instanceStorage,
  });
  instanceBaseJob.useLogger();
 });

 test("Test random schedule", () => {
  const mockCallbackSchedule = jest.fn();
  instanceBaseJob.randomScheduleOfDay(mockCallbackSchedule);

  expect(mockCallbackSchedule).not.toHaveBeenCalled();
  expect(nodeSchedule.scheduleJob).toHaveBeenCalledTimes(1);
  expect(nodeSchedule.scheduleJob).toHaveBeenNthCalledWith(
   1,
   expect.any(Date),
   expect.any(Function)
  );

  nodeSchedule.callAll();

  expect(mockCallbackSchedule).toHaveBeenCalledTimes(1);
  expect(nodeSchedule.scheduleJob).toHaveBeenCalledTimes(2);
  expect(nodeSchedule.scheduleJob).toHaveBeenNthCalledWith(
   2,
   expect.any(Date),
   expect.any(Function)
  );

 });
});
