import PostgresSequelize from "../PostgresSequelize";
import BaseStorage from "./base-storage";

export default class PostgresStorage extends BaseStorage {
 /**
  *
  * @returns {void}
  */
 async init() {
  await this.createORM();
 }
 /**
  *
  * @returns {Promise}
  */
 async destroy() {
  return this.orm.disconnect();
 }
 /**
  *
  * @returns {Sequelize}
  */
 async createORM() {
  this.orm = new PostgresSequelize();
  return await this.orm.connect();
 }
}
