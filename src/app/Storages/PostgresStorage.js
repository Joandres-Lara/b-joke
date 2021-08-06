import PostgresSequelize from "../PostgresSequelize";

export default class PostgresStorage {
 /**
  *
  * @returns
  */
 isAsync(){
  return true;
 }
 /**
  *
  * @returns {void}
  */
 async init(){
  await this.createORM();
 };
 /**
  *
  * @returns {Promise}
  */
 async destroy(){
  return this.orm.disconnect();
 };
 /**
  *
  * @returns {Sequelize}
  */
 async createORM(){
  this.orm = new PostgresSequelize();
  return await this.orm.connect();
 };
}
