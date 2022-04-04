import NewsRSSExpansion from "./NewsRSSExpansion";

export default class NewsApi {
 /**
  *
  * @param {import("eris").CommandClient} bot
  * @param {import("express").Application} appExpress
  * @param {import("@app/Storages/PostgresStorageManager").default} storageManager
  */
 constructor(bot, appExpress, storageManager) {
  this.rssExpansion = new NewsRSSExpansion();
  this.storageNews = storageManager.get("news_items");
 }
 /**
  *
  * @returns {NewsItem[]}
  */
 async getNews() {
  return await this.rssExpansion.getNews();
 }
 /**
  *
  * @param {string} channel_id
  */
 async getNewsItem(guild_id){
  const noticie = await this.storageNews.findFirstNoticieNotSend(
   await this.getNews(),
   this.rssExpansion.type,
   guild_id
  );

  if (noticie) {
   await this.storageNews.insert(noticie, guild_id);
   return noticie;
  }
 };
}
