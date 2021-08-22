import MiddlewareAttemptRequestsBot from "./middlewares/MiddlewareAttemptRequestsBot";

export default class ServiceBot{
 bot = null;
 appExpress = null;
 storageManager = null;

 constructor(bot, appExpress, storageManager){
  this.bot = bot;
  this.appExpress = appExpress;
  this.storageManager = storageManager;
  // Default middlewares
  this.middlewares = [
   new MiddlewareAttemptRequestsBot(bot, appExpress, storageManager)
  ];
 }
 /**
  *
  *
  */
 registerMiddleware = (...middlewares) => this.middlewares.push(...middlewares);
 /**
  *
  * @param {string} cb
  * @param  {...any} args
  */

 applyMiddlewares = (cb, ...args) => {
  let current_index = 0;
  let [middleware] = this.middlewares;

  const next = () => {
   current_index++;

   if(current_index in this.middlewares){
    this.middlewares[current_index].handle(next, ...args);
   } else {
    cb(...args);
   }
  };

  if(middleware){
   middleware.handle(next, ...args);
  } else {
   cb(...args);
  }
 }
 /**
  *
  * @returns {this}
  */
 withoutMiddlewares = () => {
  this.middlewares = [];
  return this;
 }
 /**
  *
  * @param {*} cb
  * @returns
  */
 withMiddlewares = (cb, ...extraArgs) => (...args) => this.applyMiddlewares(cb, ...args.concat(...extraArgs));
 /**
  *
  * @param {*} command
  * @param {*} description
  * @param {*} cb
  */
 registerCommand = (command, cb, description) => {
  this.bot.registerCommand(command, this.withMiddlewares(cb, command, description), description);
 }
}