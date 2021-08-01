import JokeApiJobSchedule from "./JokeApiJobSchedule";
import JokeApi from "../app/JokeApi";
import Storage from "../app/Storage/DefaultStorage";

import cron from "node-cron";

// https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
export default class JokeApiJob{
 /**
  *
  * @var {string} SCHEDULE_TIMER
  */
 static SCHEDULE_TIMER = "* * 9 * * *";
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
  this.initCronJobs();
 }
 /**
  *
  * @returns {void}
  */
 initCronJobs = () => {
  this.schedule(JokeApiJob.SCHEDULE_TIMER, async () => {
   const joke = await (new JokeApi().getJoke());
   this.getAllJobs().forEach(({ channel_id }) => {
    this.bot.createMessage(channel_id, `This is the joke select of the day: ${joke}`);
   });
  });
 }
 /**
  *
  * @returns {Array}
  */
 getAllJobs = () => {
  return this.storage.findAll({ jobType: JokeApiJobSchedule.TYPE });
 }
 /**
  *
  * @param {string} channel_id
  * @param {object} config
  * @returns {void}
  */
 subscribe = (channel_id, config) => {
  this.storage.insert(new JokeApiJobSchedule(channel_id, config));
 }
 /**
  *
  * @param {string} cronExpression
  * @param {function} cb
  * @returns {void}
  */
 schedule = (cronExpression, cb) => {
  cron.schedule(cronExpression, cb);
 }
}
