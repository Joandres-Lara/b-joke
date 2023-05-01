import Logger from "@app/Logger";
import Message from "../app/Messages/Message";
import MiddlewareAttemptRequestsBot from "./middlewares/MiddlewareAttemptRequestsBot";
import Resolver from "@app/resolver/resolver";

export default class ServiceBot {
 /** @type {import("eris").CommandClient} */
 bot;
 /** @type {import("express").Application} */
 appExpress;
 /** @type {import("@app/Storages/PostgresStorageManager").default} */
 storageManager;
 /** @type {Middleware[]} */
 middlewares;
 /** @type {import("@app/Logger").default} */
 logger;
 /**
  *
  * @param {import("eris").Client} [bot]
  * @param {import("express").Application} [appExpress]
  * @param {import("@app/Storages/PostgresStorageManager").default} [storageManager]
  */
 constructor(bot, appExpress, storageManager) {
  // TODO: Posible deprecation arguments in constructor
  this.bot = bot || Resolver.get("bot");
  this.appExpress = appExpress || Resolver.get("http");
  this.storageManager = storageManager || Resolver.get("storage ");
  // Default middlewares
  this.middlewares = [
   new MiddlewareAttemptRequestsBot(bot, appExpress, storageManager),
  ];
 }

 useLogger(logger = new Logger()){
  this.logger = logger;
 }
 /**
  *
  * @param {...Middleware} middlewares
  */
 registerMiddleware = (...middlewares) => this.middlewares.push(...middlewares);
 /**
  *
  * @param {() => Promise<void>} fnDirty
  * @param  {...any} args
  */
 async applyMiddlewares(fnDirty, ...args){
  try{
   let current_index = -1;

   const next = async () => {
    current_index++;

    if (current_index in this.middlewares) {
     await this.middlewares[current_index].handle(next, ...args);
    } else {
     await fnDirty(...args);
    }
   };

   await next();
  }catch(e){
   this.logger.log(e.toString());
  }
 };
 /**
  *
  * @returns {this}
  */
 withoutMiddlewares = () => {
  this.middlewares = [];
  return this;
 };
 /**
  *
  * @param {() => void} cb
  * @param {string} command
  * @param {string} description
  * @returns {(msg: import("eris").Message, args: []any) => any}
  */
 withMiddlewares =
  (cb, command, description) =>
  (msg, args) =>
   this.applyMiddlewares(cb, msg, args, command, description);
 /**
  *
  * @param {string} command
  * @param {(msg: import("eris").Message, args: []string) => void} cb
  * @param {string} description
  */
 registerCommand = (command, cb, description) => {
  this.bot.registerCommand(
   command,
   this.withMiddlewares(cb, command, description),
   description
  );
 };
 /**
  *
  * @param {string} channel_id
  * @param {Message|string} message
  */
 sendMessage(channel_id, message) {
  if(message instanceof Message){
   message = message.toObject();
  }
  this.bot.createMessage(channel_id, message);
 }
}
