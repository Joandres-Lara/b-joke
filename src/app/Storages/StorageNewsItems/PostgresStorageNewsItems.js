import PostgresStorage from "../PostgresStorage";
import { Op } from "sequelize";

export default class PostgresStorageNewsItems extends PostgresStorage {
 constructor(...args) {
  super(...args);
 }
 /**
  *
  * @returns {Noticie}
  */
 getModelNewsItem() {
  return this.orm.getModel("NewsItemVisited");
 }
 /**
  *
  * @param {*} newsItems
  * @param {*} type
  * @returns
  */
 async findFirstNoticieNotSend(newsItems, rss, guild_id) {
  const newsItemsUuids = newsItems.map((noticie) => noticie.id);
  // Encuentra todas las noticias del tipo, y con los uuids
  // que se han enviado.
  const newsItemsVisitedDatabase = await this.getModelNewsItem().findAll({
   where: {
    guild_id,
    rss,
    news_item_uuid: {
     [Op.in]: newsItemsUuids
    }
   },
  });

  if(newsItemsVisitedDatabase.length === 0){
   if(newsItems.length !== 0){
    return newsItems[0];
   }
   return;
  }

  return newsItems.find(({ id }) =>
   !newsItemsVisitedDatabase.find(({ news_item_uuid }) => news_item_uuid === id)
  );
 }
 /**
  *
  * @param {Notice}
  */
 async insert({ id, rss }, guild_id){
  return await this.getModelNewsItem().create({ news_item_uuid: id, rss, guild_id });
 }
}
