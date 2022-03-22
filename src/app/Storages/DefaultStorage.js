export default class DefaultStorage {
 /**
  *
  * @param {object} internalConfig
  * @param {object} config
  * @returns
  */
 static shallowEqual = (internalConfig, config) => {
  if (internalConfig === config) {
   return true;
  }

  for (let key in config) {
   if (
    internalConfig[key] !== config[key] &&
    JSON.stringify(internalConfig[key]) !== JSON.stringify(config[key])
   ) {
    return false;
   }
  }

  return true;
 };
 /**
  *
  * @var {Array} arr
  */
 arr = [];
 /**
  *
  */
 constructor() {}
 /**
  * Encuentra todos los elementos que coinciden con todos los elementos del objeto en `config`.
  *
  * @param {Record<any, any>} config
  * @returns {Promise<[]any>}
  */
 findAll(config) {
  return Promise.resolve(this.arr.filter((_) => DefaultStorage.shallowEqual(_, config)));
 }
 /**
  * Encuentra el primer element que coincide con todos los elementos del objeto en `config`.
  *
  * @param {Record<any, any>} config
  * @returns {Promise<any>}
  */
 find(config) {
  return Promise.resolve(this.arr.find((_) => DefaultStorage.shallowEqual(_, config)));
 }
 /**
  *
  * @param {any} values
  * @returns {Promise<any>}
  */
 insert(values) {
  this.arr.push(values);
  return Promise.resolve(values);
 }
 /**
  *
  * @param {any} values
  * @returns {Promise<any>}
  */
 async insertIfNotFind(values) {
  if (!(await this.find(values))) {
   return await this.insert(values);
  }
 }
}
