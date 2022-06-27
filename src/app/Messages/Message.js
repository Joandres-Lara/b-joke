export default class Message{
 /**
  * @type {string}
  */
 message = "";
 /**
  *
  * @param {string} message
  */
 constructor(message){
  this.message = message;
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
   return message;
  }
}
