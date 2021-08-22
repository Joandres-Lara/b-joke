import differenceInMinutes from "date-fns/differenceInMinutes";

export default class MiddlewareAttemptRequestsBot{

 constructor(bot){
  this.bot = bot;
  this.users_attempts = {};
 }
 /**
  *
  * @returns {array}
  */
 getUserAttemptById(id){
  return this.users_attempts[id] = this.users_attempts[id] || [];
 }
 /**
  *
  * @param {*} author
  * @returns
  */
 hasMaxAttemptRequests(author){
  const users_attempts = this.getUserAttemptById(author.id);
  // Hasta los 5 intentos empieza a comprobar.
  if(users_attempts.length < 5){
   users_attempts.push(new Date());
   return false;
  }

  const [last_request] = users_attempts.concat([]).reverse();

  // Si el tiempo, de baneo ya pasó.
  if(differenceInMinutes(new Date(), last_request) > 5){
   this.users_attempts[author.id] = [];
   return false;
  }

  return true;
 }
 /**
  *
  * @param {Function} next
  * @param {MessageChannel} msg
  * @param {array} args
  * @param {string} command
  * @returns {void}
  */
 handle(next, msg, args, command){
  const { author, channel } = msg;

  if(this.hasMaxAttemptRequests(author)){
   return this.bot.createMessage(channel.id, `Lo siento ${author.username} demasiadas solicitudes para el comando: **!${command}** si sigues así, voy a explotar, así que mejor me protejo. Pero tu tienes que esperar 5 minutos.`);
  }
  next();
 }
}
