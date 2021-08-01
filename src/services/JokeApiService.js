import JokeApi from "../app/JokeApi";
import { MESSAGE_CREATE } from "../app/constants";

export default class JokeApiService {
 /**
  *
  * @param {*} bot
  */
 constructor(bot) {
  this.bot = bot;
 }
 /**
  *
  *
  */
 init = () => {
  this.bot.on(MESSAGE_CREATE, (msg) => {
   if (msg.content === "!joke") {
    return new JokeApi().getJoke(
     (joke) => this.bot.createMessage(msg.channel.id, joke)
    );
   }
  });
 };
}
