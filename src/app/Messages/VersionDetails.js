import Message from "./Message";

export default class VersionDetail extends Message{
 /** @type {string} */
 #version;
 /**
  *
  * @param {string} version
  */
 constructor(version){
  super();
  this.#version = version;
 }

 toObject(){
  return {
   content: "Hemos agregado nuevas características, escribe **!help**, para conocerlas"
  };
 }
}
