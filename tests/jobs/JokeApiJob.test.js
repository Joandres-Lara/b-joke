import JokeApiJobSchedule from "../../src/jobs/JokeApiJobSchedule";
import JokeApiJob from "../../src/jobs/JokeApiJob";
import JokeApi from "../../src/app/JokeApi";

import DefaultStorageJobs from "../../src/app/Storages/DefaultStorage";

import schedule from "node-schedule";
import Eris from "eris";

jest.mock("../../src/app/JokeApi/JokeApi");

let instance, todoStorage, mockInsertStorage, mockFindAll, mockFind, mockInsertIfNotFind;

beforeEach(() => {
 const instanceStorage = new DefaultStorageJobs();

 todoStorage = instanceStorage.arr;

 jest.spyOn(instanceStorage, "insert");
 jest.spyOn(instanceStorage, "findAll");
 jest.spyOn(instanceStorage, "find");

 mockInsertStorage = instanceStorage.insert;
 mockFindAll = instanceStorage.findAll;
 mockFind = instanceStorage.find;

 instance = new JokeApiJob(new Eris.CommandClient(), null, { get: () => instanceStorage });
});

test("Insert to storage `JokeApiJobSchedule`", () => {
 const EXPECT_CHANNEL_ID = "9786397165471652";
 const EXPECT_CONFIG = {
  permissions: true,
 };

 instance.subscribe(EXPECT_CHANNEL_ID, EXPECT_CONFIG);

 expect(mockFind).toHaveBeenCalledTimes(1);
 expect(mockFind).toHaveBeenCalledWith(new JokeApiJobSchedule(EXPECT_CHANNEL_ID, EXPECT_CONFIG));
 expect(mockFind).toHaveLastReturnedWith(undefined);

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

test("Insert to storage `JokeApiJobSchedule` if not find", () => {
 const CHANNEL_ID_IN_STORAGE = "0892708734";
 const EXPECT_CHANNEL_ID = "9098898";
 const EXPECT_CONFIG = {};

 const instanceInStorage = new JokeApiJobSchedule(CHANNEL_ID_IN_STORAGE, {});

 todoStorage.push(instanceInStorage);

 instance.subscribe(CHANNEL_ID_IN_STORAGE, EXPECT_CONFIG);

 expect(mockFind).toHaveBeenCalledTimes(1);
 expect(mockFind).toHaveBeenCalledWith(instanceInStorage);
 expect(mockFind).toHaveLastReturnedWith(instanceInStorage);

 expect(mockInsertStorage).not.toHaveBeenCalled();

 expect(todoStorage).toHaveLength(1);

 instance.subscribe(EXPECT_CHANNEL_ID, EXPECT_CONFIG);

 expect(mockFind).toHaveBeenCalledTimes(2);
 expect(mockFind).toHaveBeenCalledWith(instanceInStorage);
 expect(mockFind).toHaveLastReturnedWith(undefined);

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

 instance.init();

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

 expect(Eris.CommandClient.createMessage).toHaveBeenCalled();
 expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(
  EXPECT_CHANNEL_ID,
  expect.objectContaining({
   content: expect.stringContaining(EXPECT_JOKE),
  })
 );
});

describe("Use async StorageJobs", () => {

 beforeEach(() => {
  const instanceStorage = new DefaultStorageJobs();

  todoStorage = instanceStorage.arr;

  jest.spyOn(instanceStorage, "insert");
  jest.spyOn(instanceStorage, "find");
  jest.spyOn(instanceStorage, "findAll");
  jest.spyOn(instanceStorage, "isAsync");
  jest.spyOn(instanceStorage, "insertIfNotFind");

  instanceStorage.isAsync.mockReturnValue(true);

  mockInsertIfNotFind = instanceStorage.insertIfNotFind;
  mockInsertStorage = instanceStorage.insert;
  mockFindAll = instanceStorage.findAll;
  mockFind = instanceStorage.find;

  instance = new JokeApiJob(new Eris.CommandClient(), null, {get: () => instanceStorage});
 });

 test("Insert to storage `JokeApiJobSchedule`", async () => {
  const EXPECT_CHANNEL_ID = "9786397165471652";
  const EXPECT_CONFIG = {
   permissions: true,
  };

  instance.subscribe(EXPECT_CHANNEL_ID, EXPECT_CONFIG);

  expect(mockFind).toHaveBeenCalledTimes(1);
  expect(mockFind).toHaveBeenCalledWith(new JokeApiJobSchedule(EXPECT_CHANNEL_ID, EXPECT_CONFIG));

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

  instance.subscribe(CHANNEL_ID_IN_STORAGE, EXPECT_CONFIG);

  expect(mockFind).toHaveBeenCalledTimes(1);
  expect(mockFind).toHaveBeenCalledWith(instanceInStorage);

  expect(mockInsertStorage).not.toHaveBeenCalled();

  expect(todoStorage).toHaveLength(1);

  instance.subscribe(EXPECT_CHANNEL_ID, EXPECT_CONFIG);

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

  instance.init();

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

  expect(Eris.CommandClient.createMessage).toHaveBeenCalled();
  expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(
   EXPECT_CHANNEL_ID,
   expect.objectContaining({
    content: expect.stringContaining(EXPECT_JOKE),
   })
  );
 });
});
