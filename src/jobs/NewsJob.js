import NewsApi from "@app/NewsApi";
import eachFirstTextChannelOfServers from "@app/util/each-first-text-channel-of-servers";
import NewsItemMessage from "@app/Messages/NewsItemMessage";
import VoidNewsItemMessage from "@app/Messages/VoidNewsItemMessage";
import BaseJob from "./BaseJob";

export default class NewsJob extends BaseJob {
 /**
  *
  * @param {import("eris").CommandClient} bot
  * @param {import("express").Application} appExpress
  * @param {import("@app/Storages/PostgresStorageManager").default} storageManager
  */
 constructor(bot, appExpress, storageManager) {
  super(bot, appExpress, storageManager);
  this.api = new NewsApi(bot, appExpress, storageManager);
 }

 async init() {
  this.randomScheduleOfEachDay(this.sendNews.bind(this));
 }

 async sendNews() {
  eachFirstTextChannelOfServers(this.bot, async (channel) => {
   const newsItem = await this.api.getNewsItem(channel.guild.id);
   let message;
   if (newsItem) {
    message = new NewsItemMessage(newsItem);
   } else {
    message = new VoidNewsItemMessage();
   }

   this.logger.log(`[NewsJob]`);
   this.logger.default(
    this.logger.object(message),
    this.logger.object(newsItem)
   );

   this.sendMessage(channel.id, message);
  });
 }
}
