import Message from "./Message"

export default class JokeStatusMessage extends Message{
 constructor(status){
  super();
  this.status = status;
 }

 toObject(){

  let msgContent = "";

  if(this.status.isSubscribe){
   msgContent = msgContent + "Actualmente este canal está subscrito para que le envíemos chiste diarios, si quiere desactivarlo use **!joke unsubscribe**, para volverse un aburrido.";
  } else {
   msgContent = msgContent + "Este canal no cuenta con una subscripción, si quieres reírte todos los días usa **!joke subscribe** para recibir chiste diarios.";
  }

  return {
   content: msgContent
  };
 }
}
