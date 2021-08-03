export default class JokeApiJobSchedule{

 static TYPE = "joke-api-job-v0";

 constructor(channel_id, config){
  this.channel_id = channel_id;
  this.config = config;
  this.job_type = JokeApiJobSchedule.TYPE;
 }
}
