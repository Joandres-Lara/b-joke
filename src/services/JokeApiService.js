import JokeApiJobSchedule from "../jobs/JokeApiJobSchedule";
import JokeMessage from "../app/JokeMessage";
import JokeApi from "../app/JokeApi";
import Storage from "../app/Storage/DefaultStorage"

import {
 JOKE_COMMAND,
 JOKE_COMMAND_DESCRIPTION
} from "./JokeApiService/descriptor-commands";

export default class JokeApiService {
 /**
  *
  * @param {Eris.Client} bot
  * @param {Express.Application} appExpress
  * @param {Storage}
  */
 constructor(bot, appExpress, storage) {
  this.bot = bot;
  this.appExpress = appExpress;
  this.storage = storage || new Storage();
 }
 /**
  *
  * @returns {void}
  */
 init = () => {
  this.bot.registerCommand(JOKE_COMMAND, async (msg, args) => {

   const { id: channel_id } = msg.channel;

   if(args.length === 0){
    const joke = await(new JokeApi().getJoke());
    const message = new JokeMessage(joke, { repliedUser: true, users: true });
    return this.bot.createMessage(channel_id, message.toObject());
   }

   if(args.includes("subscribe")){
    this.storage.insert(new JokeApiJobSchedule(channel_id));
    return this.bot.createMessage(channel_id, "Te has suscrito, para que te envíemos, chiste diarios.");
   }

  }, JOKE_COMMAND_DESCRIPTION);
 };
}
