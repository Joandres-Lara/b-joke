import RecordJobs from "@jobs/RecordJobs";
import configureApp from "@util-tests/configure-app";
import { Model } from "sequelize";
import { ChannelProperties } from "src/models/channeljob";
import wait from "@app/util/wait";
import nodeSchedule from "node-schedule";

describe("@jobs/record-jobs", () => {

 let instance: RecordJobs,
  spierGetAllJobs: jest.Spied<InstanceType<typeof RecordJobs>["getAllJobs"]>;

 beforeEach(() => {
  configureApp();
  instance = new RecordJobs();
  spierGetAllJobs = jest.spyOn(instance, "getAllJobs");
 })

 test("should get all jobs and attach create", async () => {
  const storageJobs = instance.storageJobs;
  jest.spyOn(storageJobs, "onCreate");

  await instance.init();

  expect(instance.getAllJobs).toHaveBeenCalledTimes(1);
  expect(storageJobs.onCreate).toHaveBeenCalledTimes(2);
 });

 test("should queue if is date unique", async () => {
  jest.spyOn(instance, "queue");
  jest.spyOn(instance, "schedule");
  jest.spyOn(instance, "sendMessage")

  spierGetAllJobs.mockReturnValue(Promise.resolve(
   [{
    channel_id: 89,
    user_id: 89,
    config: {
     action: "Ir a la tienda",
     cron: "[date-unique],2023-05-05 17:53:00"
    }
   } as unknown as Model<ChannelProperties, ChannelProperties>]
  ));

  await instance.init();
  await wait(1);
  nodeSchedule.callAll();

  expect(instance.queue).toHaveBeenCalledTimes(1);
  expect(instance.schedule).toHaveBeenCalledTimes(1);
  expect(instance.sendMessage).toHaveBeenCalledTimes(1)
 });
});