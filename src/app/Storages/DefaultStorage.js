export default class DefaultStorage{
 /**
  *
  * @param {object} internalConfig
  * @param {object} config
  * @returns
  */
 static shallowEqual = (internalConfig, config) => {
  if(internalConfig === config){
   return true;
  }

  for(let key in config){
   if(internalConfig[key] !== config[key] && JSON.stringify(internalConfig[key]) !== JSON.stringify(config[key])){
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
 findAll(config){
  return this.arr.filter((_) => DefaultStorage.shallowEqual(_, config));
 }
 /**
  * Encuentra el primer element que coincide con todos los elementos del objeto en `config`.
  *
  * @param {*} config
  */
 find(config){
  return this.arr.find(_ => DefaultStorage.shallowEqual(_, config))
 }
 /**
  *
  * @returns {object}
  */
 insert(values){
  return this.arr.push(values);
 }
 /**
  *
  */
 insertIfNotFind(values){
  if(!this.find(values)){
   return this.insert(values);
  }
 }
}
