import Message from "./Message";

export default class JokeMessage extends Message {
 /**
  *
  * @param {string} joke
  * @param {object} mentions
  */
 constructor(joke, mentions) {
  super();
  this.joke = joke;
  this.mentions = mentions;
  this.regards = "@here **Aquí hay un chiste para ti**";
 }
 /**
  *
  * @returns
  */
 toObject() {
  return {
   allowedMentions: this.mentions,
   content:
    this.regards +
    "\n" +
    this.joke
  };
 }
 /**
  *
  * @returns {string}
  */
 toString() {
  return this.joke;
 }
}
