import Logger from "@app/Logger";
import Message from "../app/Messages/Message";
import type { Middleware } from "./middlewares/middleware";
import MiddlewareAttemptRequestsBot from "./middlewares/MiddlewareAttemptRequestsBot";
import Resolver from "@app/resolver/resolver";
import Eris from "eris";
import type PostgresStorageManager from "@app/Storages/PostgresStorageManager";

export default class ServiceBot {
 /** @type {import("eris").CommandClient} */
 bot: Eris.CommandClient;
 /** @type {import("express").Application} */
 appExpress: Express.Application;
 /** @type {import("@app/Storages/PostgresStorageManager").default} */
 storageManager: PostgresStorageManager;
 /** @type {Middleware[]} */
 middlewares: Middleware[];
 /** @type {import("@app/Logger").default} */
 logger?: Logger;
 resolve : typeof Resolver;
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
  this.storageManager = storageManager || Resolver.get("storage");
  this.logger = Resolver.get("logger");
  this.resolve = Resolver;
  // Default middlewares
  this.middlewares = [
   new MiddlewareAttemptRequestsBot(bot, appExpress, storageManager),
  ];
 }

 useLogger(logger = new Logger()) {
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
 async applyMiddlewares(fnDirty, ...args) {
  try {
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
  } catch (e) {
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
  if (message instanceof Message) {
   message = message.toObject();
  }
  this.bot.createMessage(channel_id, message);
 }
}
