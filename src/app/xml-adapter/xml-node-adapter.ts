export type NodeAdaptable<T> = T extends Record<infer K, infer P> ? Record<K, P> : T extends Array<infer P> ? Array<P> : never;

export default class XMLNodeAdapter<T> {
 /**
  * @type {string}
  */
 private tagName: string;
 /**
  *
  */
 private current: T;
 /**
  *
  */
 constructor(dirtyNode: T, tagName: string) {
  this.current = dirtyNode;
  this.tagName = tagName;
 }
 /**
  *
  * @param {string} el
  * @returns {this}
  */
 element(el) {

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
 attrs() {
  try {
   return this.current.$;
  } catch (e) {
   console.error(`Can't get attr for ${this.tagName} of ${JSON.stringify(this.current)}`, e);
  }
 }
 /**
  *
  *
  */
 value() {
  try {
   return this.current._
  } catch (e) {
   console.error(`Can't get value for ${this.tagName} of ${JSON.stringify(this.current)}`, e);
  }
 }
 /**
  * 
  */
 get<T>(key: string | number, adapt = false): typeof adapt extends boolean ? XMLNodeAdapter<T> : T {
  let value = this.current[key];

  if (Array.isArray(value) && value.length === 1) {
   value = value[0];
  }

  if (adapt) {
   value = new XMLNodeAdapter(value, key);
  }

  return value;
 }
 /**
  *
  * @param {int} index
  */
 at(index: number) {
  return new XMLNodeAdapter(this.current[index], this.tagName);
 }
 /**
  *
  * @throws {Error}
  */
 validateCurrentAsArray() {
  if (!Array.isArray(this.current)) {
   throw new Error(`${this.tagName} is not array of element`);
  }
 }
 /**
  *
  * @param {function<void>} cb
  * @returns {}
  */
 forEach(cb) {
  this.validateCurrentAsArray();
  this.current.forEach((dirtyNode, ...args) => {
   cb(new XMLNodeAdapter(dirtyNode, this.tagName), ...args);
  }, this);

  return this;
 };
 /**
  *
  * @param {function<any>} cb
  * @returns {array}
  */
 map(cb) {
  this.validateCurrentAsArray();
  return this.current.map((dirtyNode, ...args) => {
   return cb(new XMLNodeAdapter(dirtyNode, this.tagName), ...args);
  }, this)
 }
 /**
  *
  * @returns
  */
 toObject() {

  const reducer = (todo, [key, value]) => {
   if (Array.isArray(value) && value.length === 1) {
    value = value[0];
   } else if (typeof value === "object") {
    value = _(value);
   }

   todo[key] = value;

   return todo;
  }

  const _ = (object) => Object.entries(object).reduce(reducer, {});

  return _(this.current);
 }
}
