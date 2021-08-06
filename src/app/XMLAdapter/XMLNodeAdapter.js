export default class XMLNodeAdapter {
 /**
  *
  */
 current = {};
 /**
  *
  * @param {*} dirtyNode
  */
 constructor(dirtyNode){
  this.current = dirtyNode
 }
 /**
  *
  * @param {string} el
  * @returns {this}
  */
 element(el){

  let current = this.get(el);

  if (current === undefined) {
   throw new Error(`Can't get ${el} node`);
  }

  this.tagName = el;
  this.current = current;

  return this;
 }
 /**
  *
  * @returns {object}
  */
 attrs(){
  return this.current.$;
 }
 /**
  *
  *
  */
 value(){
  return this.current._;
 }
 /**
  *
  */
 get(key, adapt = false){
  let value = this.current[key];

  if(Array.isArray(value) && value.length === 1){
   value = value[0];
  }

  if(adapt){
   value = new XMLNodeAdapter(value);
  }

  return value;
 }
 /**
  *
  * @param {int} index
  */
 at(index){
  return new XMLNodeAdapter(this.current[index]);
 }
 /**
  *
  * @throws {Error}
  */
 validateCurrentAsArray(){
  if (!Array.isArray(this.current)) {
   throw new Error(`${this.tagName} is not array of element`);
  }
 }
 /**
  *
  * @param {function<void>} cb
  * @returns {}
  */
 forEach(cb){
  this.validateCurrentAsArray();
  this.current.forEach((dirtyNode, ...args) => {
   cb(new XMLNodeAdapter(dirtyNode), ...args);
  }, this);

  return this;
 };
 /**
  *
  * @param {function<any>} cb
  * @returns {array}
  */
 map(cb){
  this.validateCurrentAsArray();
  return this.current.map((dirtyNode, ...args) => {
   return cb(new XMLNodeAdapter(dirtyNode), ...args);
  }, this)
 }
 /**
  *
  * @returns
  */
 toObject(){

  const reducer = (todo, [key, value]) => {
   if(Array.isArray(value) && value.length === 1){
    value = value[0];
   } else if(typeof value === "object"){
    value = _(value);
   }

   todo[key] = value;

   return todo;
  }

  const _ = (object) => Object.entries(object).reduce(reducer, {});

  return _(this.current);
 }
}
