import Logger from "@app/Logger";
import nodeSchedule from "node-schedule";

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
  * @param {import("@app/Storages/PostgresStorageManager")}
  */
 constructor(bot, appExpress, storageManager) {
  this.bot = bot;
  this.appExpress = appExpress;
  this.storageJobs = storageManager.get("jobs");
 }
 /**
  *
  * @param {import("@app/Logger").default} logger
  */
 useLogger(logger = new Logger()){
  this.logger = logger;
  return this;
 }
 /**
  *
  * @param {string} cronExpression
  * @param {() => void} cb
  * @returns {void}
  */
 schedule = (cronExpression, cb) => {
  nodeSchedule.scheduleJob(cronExpression, cb);
 };
}
