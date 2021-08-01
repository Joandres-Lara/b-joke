export default class DefaultStorage{
 arr = [];
 /**
  *
  */
 constructor(){
 }
 /**
  *
  * @param {object} config
  * @returns {Array}
  */
 findAll = (config) => {
  return this.arr.filter((internalConfig) => {
   let iterate = false;

   for(let key in config){
    iterate = true;
    if(internalConfig[key] !== config[key]){
     return false;
    }
   }
   return iterate && true;
  });
 }
 /**
  *
  * @returns {object}
  */
 insert = (values) => {
  return this.arr.push(values);
 }
}
