import PostgresSequelize from "../PostgresSequelize";

/**
 * @typedef {(model: import("sequelize").Model) => any} CallbackCreate
 */

export default class PostgresStorage {
 /**
  *  @type {CallbackCreate[]}
  */
 #listeners_create = [];
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
 /**
  * @param {CallbackCreate} cb
  */
 onCreate(cb) {
  if (!this.#listeners_create.includes(cb)) {
   this.#listeners_create.push(cb);
  }
 }
 /**
  *
  * @param {import("sequelize").Model} model_created
  */
 dispatchOnCreate(model_created) {
  for (let listener of this.#listeners_create) {
   listener(model_created);
  }
 }
}
