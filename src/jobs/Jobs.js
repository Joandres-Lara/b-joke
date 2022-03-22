import JokeApiJob from "./JokeApiJob";
import RecordJobs from "./RecordJobs";
export default class Jobs {
 static async configure(...args) {
  await new Jobs(...args).init();
 }

 jobs = [];

 constructor(...args) {
  this.jobs.push(new JokeApiJob(...args), new RecordJobs(...args));
 }

 init(){
  return Promise.all(this.jobs.map(async (job) => {
   job.useLogger();
   await job.init();
  }))
 };
}
