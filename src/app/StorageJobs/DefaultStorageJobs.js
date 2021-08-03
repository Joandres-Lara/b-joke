export default class DefaultStorageJobs{
 /**
  *
  * @param {object} internalConfig
  * @param {object} config
  * @returns
  */
 static shallowEqual = (internalConfig, config) => {
  for(let key in config){
   if(internalConfig[key] !== config[key]){
    return false;
   }
  }
  return true;
 }
 /**
  *
  * @var {Array} arr
  */
 arr = [];
 /**
  *
  */
 constructor(){
 }
 /**
  *
  * @returns {boolean}
  */
 isAsync = () => false;
 /**
  * Encuentra todos los elementos que coinciden con todos los elementos del objeto en `config`.
  *
  * @param {object} config
  * @returns {Array}
  */
 findAll = (config) => {
  return this.arr.filter((_) => DefaultStorageJobs.shallowEqual(_, config));
 }
 /**
  * Encuentra el primer element que coincide con todos los elementos del objeto en `config`.
  *
  * @param {*} config
  */
 find = (config) => {
  return this.arr.find(_ => DefaultStorageJobs.shallowEqual(_, config))
 }
 /**
  *
  * @returns {object}
  */
 insert = (values) => {
  return this.arr.push(values);
 }
}
