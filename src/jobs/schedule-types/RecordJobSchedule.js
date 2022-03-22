/**
 * @typedef {string} ActionRecordJobSchedule
 * @typedef {string|number|Date} CronJobSchedule
 * @typedef {{action: ActionRecordJobSchedule; cron: CronJobSchedule;}} ConfigRecordJobSchedule
 */

import { isValid } from "date-fns";

export default class RecordJobSchedule {
 /** @type {"bot-job-v1"} */
 static TYPE = "bot-job-v1";
 /** @type {string} */
 #channel_id;
 /** @type {string} */
 #user_id;
 /** @type {ConfigRecordJobSchedule} */
 #config;
 /**
  *
  * @param {string} channel_id
  * @param {string} user_id
  * @param {ConfigRecordJobSchedule} config
  */
 constructor(channel_id, user_id, config) {
  this.#channel_id = channel_id;
  this.#user_id = user_id;
  this.#config = config;
  this.job_type = RecordJobSchedule.TYPE;
 }

 get channel_id() {
  return this.#channel_id;
 }

 get user_id() {
  return this.#user_id;
 }

 get action() {
  return this.#config.action;
 }

 get cron() {
  let cron = this.#config.cron;

  if (typeof cron === "number" || typeof cron === "string") {
   cron = new Date(cron);
   if(isValid(cron)){
    cron = cron.toISOString();
    return `[date-unique],${cron}`;
   }
  }

  throw new Error("Invalid date " + cron);
 }

 get config() {
  return {
   cron: this.cron,
   action: this.action,
  };
 }
}
