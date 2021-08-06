import Message from "./Message";

export default class VoidNewsItemMessage extends Message{
 constructor(){
  super();
 }

 toObject(){
  return {
   content: "*Parece que ya estás al día con este tema, vuelve más tarde, o quizás nunca, o mañana, para más noticias.*"
  };
 }
}
