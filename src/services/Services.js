import JokeApiService from "./JokeApiService";
import NewsApiService from "./NewsApiService";
import RecordService from "./RecordService";
import MentionService from "./mention-service";
/**
 * @typedef {Object} Service
 * @property {() => Promise<void>} init
 * @property {(logger: import("@app/Logger").default) => this} useLogger
 */
export default class Services {
 /**
  *
  * @param {*} bot
  * @returns {Promise<Services>}
  */
 static async configure(...args) { 
  return await new Services(...args).init();
 }
 /**
  *
  * @type {Service[]}
  */
 services = [];
 /**
  *
  * @param {*} bot
  */
 constructor(...args) {
  this.services.push(
   new JokeApiService(...args),
   new NewsApiService(...args),
   new RecordService(...args),
   new MentionService(...args),
  );
 }

 async init() {
  await Promise.all(
   this.services.map(async (service) => {
    service.useLogger();
    await service.init();
   })
  );

  return this;
 }
}
