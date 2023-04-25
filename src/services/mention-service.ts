import ServiceBot from "./ServiceBot"

export default class MentionService extends ServiceBot {
 /**
  * 
  */
 constructor(bot, appExpress, storageManager) {
  super(bot, appExpress, storageManager);
 }
 /**
  * 
  */
 public init() {
  this.bot.on("messageCreate", message => {
   if (message.mentions.some((mention) => {
    return mention.id == "869016500135137320";
   })) {
    this.sendMessage(message.channel.id, "¿Qué pajoooooooo?");
   }
  })
 }
}