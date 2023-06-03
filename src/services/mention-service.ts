import Message from "@app/Messages/Message";
import ServiceBot from "./service-bot"
import Resolver from "@app/resolver";

export default class MentionService extends ServiceBot {
 /**
  * 
  */
 public init() {
  this.bot.on("messageCreate", async message => {
   const logger = Resolver.get("logger");
   const hasMention = message.mentions?.some((mention) => mention.id == process.env.BOT_GUID);
   const context = Resolver.get("context");

   if (!context) {
    logger?.warn("Context not found");
    return;
   }

   const botSession = Resolver.get("bot_session");

   if (!botSession) {
    logger?.warn("Bot session is not found");
    return;
   }

   if (hasMention) {
    const answer = await context.request(message.content, botSession);
    this.sendMessage(message.channel.id, answer);
   } else {
    botSession.pushUserMessage(new Message(message.content));
   }
  })
 }
}