import JokeApiService from "./JokeApiService";
import NewsApiService from "./NewsApiService";
import RecordService from "./RecordService";
/**
 * @typedef {Object} Service
 * @property {() => void} init
 * @property {(logger: import("@app/Logger").default) => this} useLogger
 */
export default class Services {
 /**
  *
  * @param {*} bot
  * @returns {Services}
  */
 static async configure(...args) {
  await new Services(...args).init();
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
   new RecordService(...args)
  );
 }

 async init() {
  return Promise.all(
   this.services.map(async (service) => {
    service.useLogger();
    await service.init();
   })
  );
 }
}
