import Message from "./Message";

export default class InvalidRecord extends Message
{
 constructor(){
  super();
 }

 toObject(){
  return {
   content: "¿Qué has dicho qué? Creo que no lo he escuchado, o tú eres estúpido."
  };
 }
}
