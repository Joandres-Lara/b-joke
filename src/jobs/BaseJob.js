import Logger from "@app/Logger";
import Message from "@app/Messages/Message";
import randomNumberBetween from "@app/util/random-number-between";
import nodeSchedule, { RecurrenceRule } from "node-schedule";
import { addDays } from "date-fns";

export default class BaseJob {
 /** @type {import("eris").CommandClient} */
 bot;
 /** @type {import("express").Application} */
 appExpress;
 /** @type {import("@app/Storages/StorageJobs/PostgresStorageJobs").default|import("@app/Storages/DefaultStorage").default} */
 storageJobs;
 /** @type {import("@app/Logger").default} */
 logger;
 /**
  * Todos los días a las 9 de la mañana, hora de la Ciudad de México.
  *
  * @type {import("node-schedule").RecurrenceRule} SCHEDULE_TIMER
  */
 static DEFAULT_SCHEDULE_TIMER = (() => {
  const config = new nodeSchedule.RecurrenceRule();
  config.hour = 9;
  config.minute = 0;
  config.tz = "America/Mexico_City";
  return config;
 })();
 /**
  *
  * @param {import("eris").CommandClient} bot
  * @param {import("express").Application} appExpress
  * @param {import("@app/Storages/PostgresStorageManager").default}
  */
 constructor(bot, appExpress, storageManager) {
  this.bot = bot;
  this.appExpress = appExpress;
  this.storageJobs = storageManager.get("jobs");
 }
 /**
  *
  * @param {import("@app/Logger").default} logger
  * @return this
  */
 useLogger(logger = new Logger()) {
  this.logger = logger;
  return this;
 }
 /**
  *
  * @param {string} cronExpression
  * @param {() => void} cb
  * @returns {void}
  */
 schedule(cronExpression, cb) {
  nodeSchedule.scheduleJob(cronExpression, cb);
 }
 /**
  *
  * @returns {import("node-schedule").RecurrenceRule}
  */
 createRuleWithDefaultTimezone({
  year,
  month,
  date,
  minute,
  second,
  dayOfWeek,
  hour,
 }) {
  return new RecurrenceRule(
   year,
   month,
   date,
   dayOfWeek,
   hour,
   minute,
   second,
   "America/Mexico_City"
  );
 }
 /**
  *
  * @param {{() => void}} cb
  * @param {boolean=} initial
  */
 randomScheduleOfEachDay(cb, initial = true) {
  const randomDateOfDay = initial ? new Date() : addDays(new Date(), 1);
  const rule = new RecurrenceRule();
  rule.tz = "America/Mexico_City";
  rule.hour = randomNumberBetween(initial ? randomDateOfDay.getHours() : 9, 23);
  rule.minute = randomNumberBetween(
   initial ? randomDateOfDay.getMinutes() : 0,
   59
  );
  rule.second = randomNumberBetween(
   initial ? randomDateOfDay.getSeconds() : 0,
   59
  );

  this.logger.log(`Append schedule to random date ${randomDateOfDay}`);

  this.schedule(randomDateOfDay, async () => {
   try{
    await cb();
   } catch(e){
    console.error(e);
    return;
   }
   this.randomScheduleOfEachDay(cb, false);
  });
 }
 /**
  * //TODO en Service.js, hay otro método parecido, quizás por razones de
  * // portabilidad sea necesario que ambas clases extiendan de alguna
  * // más global.
  *
  * @param {string} channel_id
  * @param {Message|string} message
  */
 sendMessage(channel_id, message) {
  /** @type {string|import("eris").Message} */
  let renderMessage = message;

  if (message instanceof Message) {
   renderMessage = message.toObject();
  }

  if (typeof message !== "string") {
   this.logger.info(`Send message: ${renderMessage.content} to: ${channel_id}`);
  } else {
   this.logger.info(`Send message: ${renderMessage} to: ${channel_id}`);
  }

  this.bot.createMessage(channel_id, renderMessage);
 }
}
