import NewsRSSExpansion from "./NewsApi/NewsRSSExpansion";

export default class NewsApi {
 /**
  *
  * @param {*} options
  */
 constructor(bot, appExpress, storageManager) {
  this.rssExpansion = new NewsRSSExpansion();
  this.storageNews = storageManager.get("news_items");
 }
 /**
  *
  * @returns {Array<Noticies>}
  */
 async getNews() {
  return await this.rssExpansion.getNews();
 }
 /**
  *
  * @param {string} channel_id
  * @returns {Promise}
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
