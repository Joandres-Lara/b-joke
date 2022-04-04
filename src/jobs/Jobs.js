import JokeApiJob from "./JokeApiJob";
import RecordJobs from "./RecordJobs";
import NewsJob from "./NewsJob";
import ManualJob from "./ManualJob";

export default class Jobs {
 static async configure(...args) {
  await new Jobs(...args).init();
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

 init() {
  return Promise.all(
   this.jobs.map(async (job) => {
    job.useLogger();
    await job.init();
   })
  );
 }
}
