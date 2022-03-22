import JokeApiJobSchedule from "./schedule-types/JokeApiJobSchedule";
import JokeMessageDaily from "../app/Messages/JokeMessageDaily";
import JokeApi from "../app/JokeApi";
import BaseJob from "./BaseJob";

// https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
export default class JokeApiJob extends BaseJob {
 constructor(bot, appExpress, storageManager) {
  super(bot, appExpress, storageManager);
 }
 /**
  *
  * @returns {Promise<void>}
  */
 async init(){
  this.initJobs();
 };
 /**
  *
  * @returns {void}
  */
 async initJobs(){
  this.schedule(JokeApiJob.DEFAULT_SCHEDULE_TIMER, async () => {
   const joke = await new JokeApi().getJoke();
   let jobs = await this.getAllJobs();
   jobs.forEach(({ channel_id }) => {
    const message = new JokeMessageDaily(joke);
    this.bot.createMessage(channel_id, message.toObject());
   });
  });
 };
 /**
  *
  * @returns {Promise<import("src/models/channeljob").ChannelJob[]>}
  */
 getAllJobs() {
  return this.storageJobs.findAll({ job_type: JokeApiJobSchedule.TYPE });
 }
 /**
  *
  * @param {string} channel_id
  * @param {object} config
  */
 async subscribe(channel_id, config) {
  return await this.storageJobs.insertIfNotFind(
   new JokeApiJobSchedule(channel_id, config)
  );
 }
}
