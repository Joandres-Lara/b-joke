import Message from "./Message";

export default class ErrorActionParseMessage extends Message {
 constructor(error) {
  super();
  this.error = error;
 }

 toObject() {
  return {
   content: this.error.toString(),
  };
 }
}
