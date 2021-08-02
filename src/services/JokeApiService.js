import JokeApiJobSchedule from "../cron-jobs/JokeApiJobSchedule";
import JokeApi from "../app/JokeApi";
import Storage from "../app/Storage/DefaultStorage"

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
  this.bot.registerCommand("joke", async (msg, args) => {

   const { id: channel_id } = msg.channel;

   if(args.length === 0){
    const joke = await(new JokeApi().getJoke());
    return this.bot.createMessage(channel_id, joke);
   }

   if(args.includes("subscribe")){
    this.storage.insert(new JokeApiJobSchedule(channel_id));
    return this.bot.createMessage(channel_id, "Te has suscrito, para que te envíemos, chiste diarios.");
   }
  }, {
   description: "A joke to make you laugh, type **!help joke** for mor options.",
   fullDescription: `
    Use **!joke** only for get a joke and make you **laugh**.
    use **!joke subscribe**, for get all days to 9:00 am, a joke.
   `
  });
 };
}
