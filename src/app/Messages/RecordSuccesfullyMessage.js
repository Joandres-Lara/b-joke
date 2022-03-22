import Message from "./Message";

export default class RecordSuccesfully extends Message{
 /** @type {string} */
 user_id;
 /** @type {string} */
 cron_job;
 /** @type {string} */
 action;

 /**
  *
  * @param {string} user_id
  * @param {string} cron_job
  * @param {string} action
  */
 constructor(user_id, cron_job, action){
  super();
  this.user_id = user_id;
  this.cron_job = cron_job;
  this.action = action;
 }

 toObject(){
  return {
   content: `Anotado, te debo recordar esto: ${this.action}`
  }
 }
}
