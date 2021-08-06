import NewsItemMessage from "../app/Messages/NewsItemMessage";
import NewsItem from "../app/NewsApi/NewsItem";
import NewsApi from "../app/NewsApi";
import {
 NEWS_COMMAND,
 NEWS_COMMAND_DESCRIPTION
} from "./NewsApiService/descriptor-command";

export default class NewsApiService{
 /**
  *
  * @param {*} bot
  * @param {*} appExpress
  * @param {*} storageManager
  */
 constructor(bot, appExpress, storageManager){
  this.bot = bot;
  this.appExpress = appExpress;
  this.api = new NewsApi(bot, appExpress, storageManager);
 }
 /**
  *
  */
 init = () => {
  this.bot.registerCommand(NEWS_COMMAND, async (msg, args) => {
   const { channel } = msg;
   const { id: channel_id } = channel;

   if(args.length === 0){
    const newsItem = await this.api.getNewsItem(channel.guild.id);
    let message;

    if(newsItem){
     message = new NewsItemMessage(newsItem, { repliedUser: true, users: true });
    } else {
     message = new VoidNewsItemMessage();
    }

    return this.bot.createMessage(channel_id, message.toObject());
   }

  }, NEWS_COMMAND_DESCRIPTION);
 }
}
