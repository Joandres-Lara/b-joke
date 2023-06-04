import JokeApiJobSchedule from "@jobs/schedule-types/JokeApiJobSchedule";
import JokeStatusMessage from "@app/Messages/JokeStatusMessage";
import JokeMessage from "../app/Messages/JokeMessage";
import ServiceBot from "./service-bot";
import JokeApi from "../app/JokeApi";
import Resolver from "@app/resolver/resolver";

import {
 JOKE_COMMAND,
 JOKE_COMMAND_DESCRIPTION,
} from "./JokeApiService/descriptor-commands";

export default class JokeApiService extends ServiceBot {
 /** @type {import("@app/Storages/StorageJobs/PostgresStorageJobs").default} */
 storageJobs;
 /** @type {import("@app/JokeApi/joke-api").default} */
 api;
 /**
  *
  * @param {import("eris").CommandClient} bot
  * @param {Express.Application} appExpress
  * @param {import("@app/Storages/PostgresStorageManager").default}
  */
 constructor(bot, appExpress, storageManager) {
  super(bot, appExpress, storageManager);
  this.storageJobs = storageManager.get("jobs") || Resolver.get("storage");
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
     await this.subscribeChannel(channel_id);
     return this.sendMessage(
      channel_id,
      "Te has suscrito, para que te envíemos, chistes diarios."
     );
    }

    if(args.includes("unsubscribe")){
     await this.unsubscribeChannel(channel_id);
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
  * @param {string} channel_id
  * @return {{isSubscribe: boolean}}
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
  * @param {string} channel_id
  */
 subscribeChannel(channel_id) {
  return this.storageJobs.insertIfNotFind(new JokeApiJobSchedule(channel_id));
 }
 /**
  *
  * @param {string} channel_id
  */
 unsubscribeChannel(channel_id){
  return this.storageJobs.findAndDelete(new JokeApiJobSchedule(channel_id));
 }
}
