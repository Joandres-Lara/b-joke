import JokeApiJobSchedule from "../../src/jobs/JokeApiJobSchedule";
import JokeApiJob from "../../src/jobs/JokeApiJob";
import JokeApi from "../../src/app/JokeApi";

import schedule from "node-schedule";
import Eris from "eris";

jest.mock("../../src/app/JokeApi/JokeApi");

let instance, MockStorage, todoStorage, mockInsertStorage, mockFindAll;

beforeEach(() => {
 todoStorage = [];

 mockInsertStorage = jest.fn((...args) => todoStorage.push(...args));
 mockFindAll = jest.fn(() => todoStorage);

 MockStorage = jest.fn(() => {
  return {
   insert: mockInsertStorage,
   findAll: mockFindAll,
  };
 });

 instance = new JokeApiJob(new Eris.CommandClient(), null, new MockStorage());
});

test("Insert to storage `JokeApiJobSchedule`", () => {
 const EXPECT_CHANNEL_ID = "9786397165471652";
 const EXPECT_CONFIG = {
  permissions: true,
 };

 instance.subscribe(EXPECT_CHANNEL_ID, EXPECT_CONFIG);

 expect(mockInsertStorage).toHaveBeenCalled();
 expect(mockInsertStorage).toHaveBeenCalledWith({
  channel_id: EXPECT_CHANNEL_ID,
  config: EXPECT_CONFIG,
  jobType: JokeApiJobSchedule.TYPE,
 });

 expect(todoStorage).toEqual(
  expect.arrayContaining([
   {
    channel_id: EXPECT_CHANNEL_ID,
    config: EXPECT_CONFIG,
    jobType: JokeApiJobSchedule.TYPE,
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
  JokeApiJob.SCHEDULE_TIMER,
  expect.any(Function)
 );

 let promisedJokeString = Promise.resolve(EXPECT_JOKE);

 JokeApi.getJoke.mockImplementation(() => promisedJokeString);

 schedule.call(JokeApiJob.SCHEDULE_TIMER);

 expect(JokeApi).toHaveBeenCalled();
 expect(JokeApi.getJoke).toHaveBeenCalled();

 await promisedJokeString;

 expect(mockFindAll).toHaveBeenCalled();
 expect(mockFindAll).toHaveBeenCalledWith({ jobType: JokeApiJobSchedule.TYPE });

 expect(Eris.CommandClient.createMessage).toHaveBeenCalled();
 expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(
  EXPECT_CHANNEL_ID,
  expect.objectContaining({
   content: expect.stringContaining(EXPECT_JOKE),
  })
 );
});
