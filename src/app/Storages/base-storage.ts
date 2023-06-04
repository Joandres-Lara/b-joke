import type { Model } from "sequelize";

export type CallbackCreate = <M>(model_created: M extends Model<infer P, infer C> ? Model<P, C> : never) => any;

export default class BaseStorage {
 /**
 *  @type {CallbackCreate[]}
 */
 #listeners_create: CallbackCreate[] = [];
 /**
 * @param {CallbackCreate} cb
 */
 onCreate(cb: CallbackCreate) {
  if (!this.#listeners_create.includes(cb)) {
   this.#listeners_create.push(cb);
  }
 }
 /**
  *
  * @param model_created
  */
 dispatchOnCreate<M>(model_created: M extends Model<infer P, infer C> ? Model<P, C> : never) {
  for (let listener of this.#listeners_create) {
   listener(model_created);
  }
 }
}