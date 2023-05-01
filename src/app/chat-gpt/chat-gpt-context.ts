import type { Context } from "@app/interfaces/context";
import ChatGPT from "./chat-gpt";
import Message from "@app/Messages/Message";
import BotInteractionUserSesion from "@app/bot-interaction-user-sesion/bot-interaction-user-sesion";
import Resolver from "@app/resolver";

export default class ChatGPTContext implements Context {
 /**
  * 
  */
 private chat: ChatGPT;
 /**
  * 
  */
 constructor() {
  this.chat = new ChatGPT();
 }
 /**
  * 
  * @param question 
  * @param session 
  * @returns 
  */
 async request(question: string, session: BotInteractionUserSesion): Promise<Message> {
  const logger = Resolver.get("logger");

  session.pushUserMessage(new Message(question));

  const lastMessages = Array.from(session.getMessages()).map(({ role, message }) => ({
   role: role == "bot" ? "assistant" : "user",
   content: message.toString()
  }));

  const answer = await this.chat.chatRequestWithRole(lastMessages);

  if (!answer) {
   logger?.warn("No se pudo obtener una respuesta de Chat-GPT")
   return new Message("No se encuentra disponible el servicio");
  }

  const answerMessage = new Message(answer);

  session.pushBotMessage(answerMessage);

  return answerMessage;
 }
}