import JokeApiJobSchedule from "../jobs/JokeApiJobSchedule";
import JokeMessage from "../app/Messages/JokeMessage";
import ServiceBot from "./ServiceBot";
import JokeApi from "../app/JokeApi";

import {
 JOKE_COMMAND,
 JOKE_COMMAND_DESCRIPTION
} from "./JokeApiService/descriptor-commands";

export default class JokeApiService extends ServiceBot {
 /**
  *
  * @param {Eris.Client} bot
  * @param {Express.Application} appExpress
  * @param {StorageJobs}
  */
 constructor(bot, appExpress, storageManager) {
  super(bot, appExpress, storageManager);
  this.storageJobs = storageManager.get("jobs");
  this.api = new JokeApi();
 }
 /**
  *
  * @returns {void}
  */
 init = () => {
  this.registerCommand(JOKE_COMMAND, async (msg, args) => {
   const { id: channel_id } = msg.channel;

   if(args.length === 0){
    const joke = await(this.api.getJoke());
    const message = new JokeMessage(joke, { repliedUser: true, users: true });
    return this.bot.createMessage(channel_id, message.toObject());
   }

   if(args.includes("subscribe")){
    this.storageJobs.insertIfNotFind(new JokeApiJobSchedule(channel_id));
    return this.bot.createMessage(channel_id, "Te has suscrito, para que te envíemos, chiste diarios.");
   }

  }, JOKE_COMMAND_DESCRIPTION);
 };
}
