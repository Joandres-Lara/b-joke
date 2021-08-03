import JokeApiJobSchedule from "./JokeApiJobSchedule";
import JokeMessageDaily from "../app/JokeMessageDaily";
import JokeApi from "../app/JokeApi";
import Storage from "../app/StorageJobs/DefaultStorageJobs";

import schedule from "node-schedule";

// https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
export default class JokeApiJob{
 /**
  *
  * @var {RecurrenceRule} SCHEDULE_TIMER
  */
 static SCHEDULE_TIMER = (() => {
  const config = new schedule.RecurrenceRule();
  config.hour = 9;
  config.minute = 0;
  config.tz = "America/Mexico_City";
  return config;
 })();
 /**
  *
  * @param {Eris.Client} bot
  * @param {Express.Application} appExpress
  * @param {DefaultStorage}
  */
 constructor(bot, appExpress, storage){
  this.bot = bot;
  this.appExpress = appExpress;
  this.storage = storage || new Storage();
 }
 /**
  *
  * @returns {void}
  */
 init = () => {
  this.initJobs();
 }
 /**
  *
  * @returns {void}
  */
 initJobs = () => {
  this.schedule(JokeApiJob.SCHEDULE_TIMER, async () => {
   const joke = await (new JokeApi().getJoke());
   let jobs = this.getAllJobs();

   const eachJobs = () => {
    jobs.forEach(({ channel_id }) => {
     const message = new JokeMessageDaily(joke);
     this.bot.createMessage(channel_id, message.toObject());
    });
   }

   if(this.storage.isAsync()){
    return (async() => {
     try{
      jobs = await jobs;
      eachJobs();
     } catch(e){
      console.error(e);
     }
    })()
   }

   eachJobs();
  });
 }
 /**
  *
  * @returns {Array}
  */
 getAllJobs = () => {
  return this.storage.findAll({ job_type: JokeApiJobSchedule.TYPE });
 }
 /**
  *
  * @param {string} channel_id
  * @param {object} config
  * @returns {void}
  */
 subscribe = (channel_id, config) => {
  const find = () => this.storage.find({ job_type: JokeApiJobSchedule.TYPE, channel_id });
  const insert = () => this.storage.insert(new JokeApiJobSchedule(channel_id, config));

  if(this.storage.isAsync()){
   return (async () => {
    try{
     if(!(await find())){
      return await insert();
     }
    }catch(e){
     console.error(e);
    }
   })();
  }

  if(!find()){
   return insert();
  }
 }
 /**
  *
  * @param {string} cronExpression
  * @param {function} cb
  * @returns {void}
  */
 schedule = (cronExpression, cb) => {
  // NOTE: Esta implementación podría cambiar
  // ver docs/SCHEDULE_UPGRADE.md para más información.
  schedule.scheduleJob(cronExpression, cb);
 }
}
