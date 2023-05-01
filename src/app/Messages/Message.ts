export default class Message {
 /**
  * @type {string}
  */
 private message = "";
 /**
  * 
  * @type {Date}
  */
 #created_at;
 /**
  *
  * @param {string} message
  */
 constructor(message: string) {
  this.message = message;
  this.#created_at = new Date();
 }

 get created_at() {
  return this.#created_at;
 }
 /**
  *
  * @returns
  */
 toObject() {
  return {
   content: this.message,
   tts: false
  };
 }
 /**
  *
  * @returns {string}
  */
 toString() {
  return this.message;
 }
}
