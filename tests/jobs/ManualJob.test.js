import DefaultStorage from "@app/Storages/DefaultStorage";
import ManualJob from "@jobs/ManualJob";
import nodeSchedule from "node-schedule";
import Eris from "eris";
import Message from "@app/Messages/Message";

jest.useFakeTimers("legacy");

describe("new ManualJob()", () => {
 /**
  * @type {ManualJob} instanceManualJob
  */
 let instanceManualJob, randomScheduleOfDayMock, sendMessageMock;

 beforeEach(() => {
  Eris.configureCommandClient(() => ({
   guilds: [1],
   getRESTGuildChannels: jest.fn(() => [
    {
     type: 0,
     id: 999999,
    },
   ]),
  }));

  instanceManualJob = new ManualJob(new Eris.CommandClient(), null, {
   get: () => new DefaultStorage(),
  });

  instanceManualJob.useLogger();

  randomScheduleOfDayMock = jest.spyOn(
   instanceManualJob,
   "randomScheduleOfEachDay"
  );
  sendMessageMock = jest.spyOn(instanceManualJob, "sendMessage");
 });

 test("Send a random message in random date", async () => {
  instanceManualJob.initRandomMessagesByCreiciguempleis();

  expect(randomScheduleOfDayMock).toHaveBeenCalled();

  nodeSchedule.callAll();
  await jest.runAllTimers();

  expect(sendMessageMock).toHaveBeenCalledTimes(2);

  expect(sendMessageMock).toHaveBeenNthCalledWith(
   1,
   "779580409884704770",
   expect.any(Message)
  );
  expect(sendMessageMock).toHaveBeenNthCalledWith(
   2,
   "772296886089416727",
   expect.any(Message)
  );
 });

 test("Send messages of Spotify", async () => {
  instanceManualJob.initSpotifyRecord();

  nodeSchedule.callAll();
  await jest.runAllTimers();

  expect(sendMessageMock).toHaveBeenCalled();
 });
});
