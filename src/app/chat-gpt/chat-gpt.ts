import { Configuration, OpenAIApi } from "openai";
import Resolver from "@app/resolver/resolver";

type MessagesHistory = ({
 role: "user",
 content: string
})[]

export default class ChatGPT {
 /**
  *
  */
 public static readonly DEFAULT_MODEL = process.env.CHAT_GPT_MODEL;
 /**
  *
  * @type {Configuration}
  */
 private configuration: Configuration;
 /**
  *
  * @type
  */
 private instance: OpenAIApi;

 constructor() {
  this.configuration = new Configuration({
   apiKey: process.env.CHAT_GPT_TOKEN
  });

  this.instance = new OpenAIApi(this.configuration)
 }
 /**
  *
  * @param {string} m\
  * @returns {Promise<void>}
  */
 public async chatRequest(message: string) {
  const completion = await this.instance.createChatCompletion({
   model: ChatGPT.DEFAULT_MODEL,
   messages: [{ role: "user", content: message }],
  });

  return completion.data.choices[0].message?.content || "";
 }
 /**
  *
  * @return {string}
  */
 public async chatRequestWithRole(messages: MessagesHistory) {
  try {
   const completion = await this.instance.createChatCompletion({
    model: ChatGPT.DEFAULT_MODEL,
    messages: messages
   });

   const content = completion.data.choices[0].message?.content || "";

   return content;
  } catch (e) {
   Resolver.get("logger")?.warn(e as string);
   return null;
  }
 }
}
