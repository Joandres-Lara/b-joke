import Message from "./Message";

export default class RecordActionMessage extends Message {
 /** @type {string} */
 #action;
 /** @type {string} */
 #user_id;
 /**
  *
  * @param {string} action
  * @param {string} user_id
  */
 constructor(action, user_id) {
  super();
  this.#action = action;
  this.#user_id = user_id;
 }
 /**
  *
  * @returns {import("eris").MessageContent}
  */
 toObject() {
  return {
   content: `@here Hey tu imbécil, me dijiste que te recordara ${this.#action}`,
   allowedMentions: {
    users: [this.#user_id]
   }
  };
 }
}
