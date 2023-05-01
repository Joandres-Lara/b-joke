import type Message from "@app/Messages/Message";

type MessageInSession = { role: "bot" | "user", message: Message }

export default class BotInteractionUserSesion {
 /**
  * 
  * @type {number}
  */
 private messageLength = 30;
 /**
  * 
  * @type {Set<MessageInSession>}
  */
 private messages: Set<MessageInSession> = new Set();
 /**
  * 
  */
 private validateLength() {
  if (this.messages.size >= this.messageLength) {
   // Delete first message of list
   this.messages.delete([...this.messages][0]);
  }
 }
 /**
  * 
  * @param {Message} message
  */
 public pushBotMessage(message: Message) {

  this.validateLength()

  this.messages.add({
   role: "bot",
   message: message
  })
 }
 /**
  * 
  * @param {Message} message
  */
 public pushUserMessage(message: Message) {

  this.validateLength();

  this.messages.add({
   role: "user",
   message: message
  })
 }
 /**
  * 
  * @returns {Set<MessageInSession}
  */
 public getMessages() {
  return this.messages;
 }
}