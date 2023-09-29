import Message from "./Message";

export default class ErrorContextRequest extends Message{
 constructor(){
  super("No se pudo obtener respuesta del servicio");
 }
}
