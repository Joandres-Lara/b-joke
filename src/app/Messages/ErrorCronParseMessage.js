import Message from "./Message";

export default class ErrorCronParseMessage extends Message
{
 constructor(error){
  super();
  this.error = error;
 }

 toObject(){
  return {
   content: this.error.toString()
  };
 }
}
