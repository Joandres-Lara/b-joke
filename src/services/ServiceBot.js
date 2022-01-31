import Message from "../app/Messages/Message";
import MiddlewareAttemptRequestsBot from "./middlewares/MiddlewareAttemptRequestsBot";

export default class ServiceBot {
 bot = null;
 appExpress = null;
 storageManager = null;

 constructor(bot, appExpress, storageManager) {
  this.bot = bot;
  this.appExpress = appExpress;
  this.storageManager = storageManager;
  // Default middlewares
  this.middlewares = [
   new MiddlewareAttemptRequestsBot(bot, appExpress, storageManager),
  ];
 }
 /**
  *
  *
  */
 registerMiddleware = (...middlewares) => this.middlewares.push(...middlewares);
 /**
  *
  * @param {string} fnDirty
  * @param  {...any} args
  */

 applyMiddlewares = (fnDirty, ...args) => {
  let current_index = -1;

  const next = () => {
   current_index++;

   if (current_index in this.middlewares) {
    this.middlewares[current_index].handle(next, ...args);
   } else {
    fnDirty(...args);
   }
  };

  next();
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
  * @param {*} cb
  * @returns
  */
 withMiddlewares =
  (cb, ...extraArgs) =>
  (...args) =>
   this.applyMiddlewares(cb, ...args.concat(...extraArgs));
 /**
  *
  * @param {*} command
  * @param {*} description
  * @param {*} cb
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
  * @param {*} channel_id
  */
 sendMessage(channel_id, message) {
  if(message instanceof Message){
   message = message.toObject();
  }
  this.bot.createMessage(channel_id, message);
 }
}
