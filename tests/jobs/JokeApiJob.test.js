import JokeApiJobSchedule from "@jobs/schedule-types/JokeApiJobSchedule";
import JokeApiJob from "@jobs/JokeApiJob";
import JokeApi from "@app/JokeApi";

import DefaultStorageJobs from "@app/Storages/DefaultStorage";

import schedule from "node-schedule";
import Eris from "eris";

jest.mock("@app/JokeApi/JokeApi");

let instanteJokeApiJob,
 todoStorage,
 mockInsertStorage,
 mockFindAll,
 mockFind;

describe("new JokeApiJob()", () => {
 beforeEach(() => {
  const instanceStorage = new DefaultStorageJobs();

  todoStorage = instanceStorage.arr;

  jest.spyOn(instanceStorage, "insert");
  jest.spyOn(instanceStorage, "find");
  jest.spyOn(instanceStorage, "findAll");

  mockInsertStorage = instanceStorage.insert;
  mockFindAll = instanceStorage.findAll;
  mockFind = instanceStorage.find;

  instanteJokeApiJob = new JokeApiJob(new Eris.CommandClient(), null, {
   get: () => instanceStorage,
  });
 });

 test("Insert to storage `JokeApiJobSchedule`", async () => {
  const EXPECT_CHANNEL_ID = "9786397165471652";
  const EXPECT_CONFIG = {
   permissions: true,
  };

  await instanteJokeApiJob.subscribe(EXPECT_CHANNEL_ID, EXPECT_CONFIG);

  expect(mockFind).toHaveBeenCalledTimes(1);
  expect(mockFind).toHaveBeenCalledWith(
   new JokeApiJobSchedule(EXPECT_CHANNEL_ID, EXPECT_CONFIG)
  );

  expect(mockInsertStorage).toHaveBeenCalledTimes(1);
  expect(mockInsertStorage).toHaveBeenCalledWith({
   channel_id: EXPECT_CHANNEL_ID,
   config: EXPECT_CONFIG,
   job_type: JokeApiJobSchedule.TYPE,
  });

  expect(todoStorage).toEqual(
   expect.arrayContaining([
    {
     channel_id: EXPECT_CHANNEL_ID,
     config: EXPECT_CONFIG,
     job_type: JokeApiJobSchedule.TYPE,
    },
   ])
  );
 });

 test("Insert to storage `JokeApiJobSchedule` if not find", async () => {
  const CHANNEL_ID_IN_STORAGE = "0892708734";
  const EXPECT_CHANNEL_ID = "9098898";
  const EXPECT_CONFIG = {};

  const instanceInStorage = new JokeApiJobSchedule(CHANNEL_ID_IN_STORAGE, {});

  todoStorage.push(instanceInStorage);

  await instanteJokeApiJob.subscribe(CHANNEL_ID_IN_STORAGE, EXPECT_CONFIG);

  expect(mockFind).toHaveBeenCalledTimes(1);
  expect(mockFind).toHaveBeenCalledWith(instanceInStorage);

  expect(mockInsertStorage).not.toHaveBeenCalled();

  expect(todoStorage).toHaveLength(1);

  await instanteJokeApiJob.subscribe(EXPECT_CHANNEL_ID, EXPECT_CONFIG);

  expect(mockFind).toHaveBeenCalledTimes(2);
  expect(mockFind).toHaveBeenCalledWith(instanceInStorage);

  expect(mockInsertStorage).toHaveBeenCalledTimes(1);
  expect(mockInsertStorage).toHaveBeenCalledWith({
   channel_id: EXPECT_CHANNEL_ID,
   config: EXPECT_CONFIG,
   job_type: JokeApiJobSchedule.TYPE,
  });

  expect(todoStorage).toHaveLength(2);
  expect(todoStorage).toEqual(
   expect.arrayContaining([
    {
     channel_id: EXPECT_CHANNEL_ID,
     config: EXPECT_CONFIG,
     job_type: JokeApiJobSchedule.TYPE,
    },
   ])
  );
 });

 test("Initialize cron jobs and called when matched with time", async () => {
  const EXPECT_CHANNEL_ID = "0928234340183";
  const EXPECT_JOKE = `
  - ¿Qué es y nada a la vez?
  - El pez
 `;

  todoStorage.push(new JokeApiJobSchedule(EXPECT_CHANNEL_ID, {}));

  expect(schedule.scheduleJob).not.toHaveBeenCalled();

  instanteJokeApiJob.init();

  expect(schedule.scheduleJob).toHaveBeenCalledWith(
   JokeApiJob.DEFAULT_SCHEDULE_TIMER,
   expect.any(Function)
  );

  let promisedJokeString = Promise.resolve(EXPECT_JOKE);

  JokeApi.getJoke.mockImplementation(() => promisedJokeString);

  schedule.call(JokeApiJob.DEFAULT_SCHEDULE_TIMER);

  expect(JokeApi).toHaveBeenCalled();
  expect(JokeApi.getJoke).toHaveBeenCalled();

  await promisedJokeString;

  expect(mockFindAll).toHaveBeenCalled();
  expect(mockFindAll).toHaveBeenCalledWith({
   job_type: JokeApiJobSchedule.TYPE,
  });

  await (new Promise((resolve) => setTimeout(resolve, 100)));

  expect(Eris.CommandClient.createMessage).toHaveBeenCalled();
  expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(
   EXPECT_CHANNEL_ID,
   expect.objectContaining({
    content: expect.stringContaining(EXPECT_JOKE),
   })
  );
 });
});
