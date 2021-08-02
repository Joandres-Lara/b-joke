import JokeMessage from "./JokeMessage";

export default class JokeMessageDaily extends JokeMessage{
 constructor(joke){
  super(joke, {
   everyone: true,
   users: true
  });
  this.regards = "@everyone **Aquí hay un chiste para ustedes**";
 }
}
