const Eris = require("eris");
const jokeService = require("./services/joke-api");

var bot = new Eris(process.env.TOKEN_BOT);

bot.on("messageCreate", (msg) => { 
 if(msg.content === "!joke"){
  jokeService.getJoke((joke) => bot.createMessage(msg.channel.id, joke));
 }
});

bot.connect();
