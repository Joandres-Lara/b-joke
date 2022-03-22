import PostgresStorageJobs from "@app/Storages/StorageJobs/PostgresStorageJobs";

let instance_jobs;

beforeAll(() => {
 instance_jobs = new PostgresStorageJobs();
 return instance_jobs.init();
});

afterAll(() => {
 return instance_jobs.destroy();
});

test("Insert ChannelJob and find self", async () => {
 const job_type = "test-job-type";
 const channel_id = "827398789";
 const config = {};

 await expect(
  instance_jobs.insert({ job_type, channel_id, config })
 ).resolves.toBeInstanceOf(instance_jobs.getModelJob());

 await expect(instance_jobs.find({ channel_id, job_type })).resolves.toEqual(
  expect.objectContaining({ job_type, channel_id, config })
 );
});

test("Insert ChannelJob and find in all", async () => {
 const same_job_type = "test-job-type-shared";
 const ignore_job_type = "test-job-type-ignore";

 await instance_jobs.insert({
  job_type: same_job_type,
  channel_id: "7887837847",
  config: {},
 });

 await instance_jobs.insert({
  job_type: same_job_type,
  channel_id: "9092890380",
  config: {},
 });

 await instance_jobs.insert({
  job_type: same_job_type,
  channel_id: "7092730479",
  config: {},
 });

 await instance_jobs.insert({
  job_type: ignore_job_type,
  channel_id: "7092730479",
  config: {},
 });

 const promisedFindAll = await instance_jobs.findAll({
  job_type: same_job_type,
 });

 expect(promisedFindAll).toHaveLength(3);
 expect(promisedFindAll).toEqual(
  expect.not.arrayContaining([
   expect.objectContaining({ job_type: ignore_job_type }),
  ])
 );
});

test("Not insert if find", async () => {
 const same_job_type = "job-type-test-not-insert";

 await instance_jobs.insert({
  job_type: same_job_type,
  channel_id: "9092890380",
  config: {},
 });

 instance_jobs.insertIfNotFind({
  channel_id: "9092890380",
  job_type: same_job_type,
 });

 await expect(
  instance_jobs.findAll({ job_type: same_job_type })
 ).resolves.toHaveLength(1);
});

test("Insert if not find", async () => {
 const same_job_type = "job-type-test-insert-not-find";

 await expect(
  instance_jobs.findAll({ job_type: same_job_type })
 ).resolves.toHaveLength(0);

 await instance_jobs.insertIfNotFind({
  channel_id: "90992890380",
  job_type: same_job_type,
 });

 await expect(
  instance_jobs.findAll({ job_type: same_job_type })
 ).resolves.toHaveLength(1);
});
