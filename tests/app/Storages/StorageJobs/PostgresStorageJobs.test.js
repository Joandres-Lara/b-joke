import PostgresStorageJobs from "../../../../src/app/Storages/StorageJobs/PostgresStorageJobs";

let instance;

beforeAll(() => {
 instance = new PostgresStorageJobs();
 return instance.init();
});

afterAll(() => {
 return instance.destroy();
});

test("Insert ChannelJob and find same", async () => {
 const job_type = "test-job-type";
 const channel_id = "827398789";
 const config = {};

 await expect(
  instance.insert({ job_type, channel_id, config })
 ).resolves.toBeInstanceOf(instance.getModelJob());

 await expect(instance.find({ channel_id, job_type })).resolves.toEqual(
  expect.objectContaining({ job_type, channel_id, config })
 );
});

test("Insert ChannelJob and find in all", async () => {
 const same_job_type = "test-job-type-shared";
 const ignore_job_type = "test-job-type-ignore";

 await instance.insert({
  job_type: same_job_type,
  channel_id: "7887837847",
  config: {},
 });
 await instance.insert({
  job_type: same_job_type,
  channel_id: "9092890380",
  config: {},
 });
 await instance.insert({
  job_type: same_job_type,
  channel_id: "7092730479",
  config: {},
 });
 await instance.insert({
  job_type: ignore_job_type,
  channel_id: "7092730479",
  config: {},
 });

 const promisedFindAll = await instance.findAll({ job_type: same_job_type });

 expect(promisedFindAll).toHaveLength(3);
 expect(promisedFindAll).toEqual(
  expect.not.arrayContaining([
   expect.objectContaining({ job_type: ignore_job_type }),
  ])
 );
});
