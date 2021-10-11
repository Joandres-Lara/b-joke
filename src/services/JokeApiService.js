import JokeApiJobSchedule from "../jobs/JokeApiJobSchedule";
import JokeStatusMessage from "../app/Messages/JokeStatusMessage";
import JokeMessage from "../app/Messages/JokeMessage";
import ServiceBot from "./ServiceBot";
import JokeApi from "../app/JokeApi";

import {
 JOKE_COMMAND,
 JOKE_COMMAND_DESCRIPTION,
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
  this.registerCommand(
   JOKE_COMMAND,
   async (msg, args) => {
    const { id: channel_id } = msg.channel;

    if (args.length === 0) {
     return this.sendMessage(
      channel_id,
      new JokeMessage(await this.api.getJoke(), {
       repliedUser: true,
       users: true,
      })
     );
    }

    if (args.includes("subscribe")) {
     this.subscribeChannel(channel_id);
     return this.sendMessage(
      channel_id,
      "Te has suscrito, para que te envíemos, chiste diarios."
     );
    }

    if(args.includes("unsubscribe")){
     this.unsubscribeChannel(channel_id);
     return this.sendMessage(
      channel_id,
      "¿Porqué no quieres que te cuente chistes?"
     );
    }

    if (args.includes("status")) {
     return this.sendMessage(
      channel_id,
      new JokeStatusMessage(await this.getStatusByChannel(channel_id))
     );
    }
   },
   JOKE_COMMAND_DESCRIPTION
  );
 }
 /**
  *
  * @param {*} channel_id
  */
 async getStatusByChannel(channel_id){
  const jobSubscribe = await this.storageJobs.find(new JokeApiJobSchedule(channel_id));
  const isSubscribe = jobSubscribe !== null && jobSubscribe !== undefined;
  let config = {};
  if(isSubscribe){
   config = jobSubscribe.config;
  }
  return {
   isSubscribe,
   config
  };
 }
 /**
  *
  * @param {*} channel_id
  * @returns
  */
 subscribeChannel(channel_id) {
  return this.storageJobs.insertIfNotFind(new JokeApiJobSchedule(channel_id));
 }
 /**
  *
  * @param {*} channel_id
  * @returns
  */
 unsubscribeChannel(channel_id){
  return this.storageJobs.findAndDelete(new JokeApiJobSchedule(channel_id));
 }
}
