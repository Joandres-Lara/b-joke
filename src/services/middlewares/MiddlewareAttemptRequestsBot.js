import differenceInMinutes from "date-fns/differenceInMinutes";
/**
 * @type {Middleware}
 */
/**
 * @implements {Middleware}
 */
export default class MiddlewareAttemptRequestsBot {
 /** @type {import("eris").Client} */
 bot;
 /** @type {{[k : string]: Date[]}} */
 users_attemps;
 /**
  *
  * @param {import("eris").Client} bot
  */
 constructor(bot) {
  this.bot = bot;
  this.users_attempts = {};
 }
 /**
  *
  * @param {number} id
  * @returns {array}
  */
 getUserAttemptById(id) {
  return (this.users_attempts[id] = this.users_attempts[id] || []);
 }
 /**
  *
  * @param {import("eris").User} author
  * @returns {boolean}
  */
 hasMaxAttemptRequests(author) {
  if (process.argv.includes("--desactive-attempt-request")) {
   return false;
  }

  const users_attempts = this.getUserAttemptById(author.id);
  // Hasta los 5 intentos empieza a comprobar.
  if (users_attempts.length < 5) {
   users_attempts.push(new Date());
   return false;
  }

  const [last_request] = users_attempts.concat([]).reverse();

  // Si el tiempo, de baneo ya pasó.
  if (differenceInMinutes(new Date(), last_request) > 5) {
   this.users_attempts[author.id] = [];
   return false;
  }

  return true;
 }
 /**
  *
  * @param {() => void} next
  * @param {import("eris").Message} msg
  * @param {string[]} args
  * @param {string} command
  * @returns {void}
  */
 async handle(next, msg, args, command) {
  const { author, channel } = msg;

  if (this.hasMaxAttemptRequests(author)) {
   return this.bot.createMessage(
    channel.id,
    `Lo siento ${author.username} demasiadas solicitudes para el comando: **!${command}** si sigues así, voy a explotar, así que mejor me protejo. Pero tu tienes que esperar 5 minutos.`
   );
  }

  await next();
 }
}
