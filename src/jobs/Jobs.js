import JokeApiJob from "./JokeApiJob";
import RecordJobs from "./RecordJobs";
import NewsJob from "./NewsJob";
import ManualJob from "./ManualJob";

export default class Jobs {
 static async configure(...args) {
  return await new Jobs(...args).init();
 }

 jobs = [];

 constructor(...args) {
  this.jobs.push(
   new JokeApiJob(...args),
   new RecordJobs(...args),
   new NewsJob(...args),
   new ManualJob(...args)
  );
 }

 async init() {
  await Promise.all(
   this.jobs.map(async (job) => {
    job.useLogger();
    await job.init();
   })
  );

  return this;
 }
}
