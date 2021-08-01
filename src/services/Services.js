import JokeApiService from "./JokeApiService";

export default class Services {
 /**
  *
  * @param {*} bot
  * @returns {Services}
  */
 static configure = (...args) => new Services(...args).init();
 /**
  *
  */
 services = [];
 /**
  *
  * @param {*} bot
  */
 constructor(...args) {
  this.services.push(new JokeApiService(...args));
 }

 init = () => this.services.forEach((service) => service.init());
}
