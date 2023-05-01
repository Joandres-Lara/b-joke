import { Configuration, OpenAIApi } from "openai";

type MessagesHistory = ({
 role: "user",
 content: string
})[]

export default class ChatGPT {
 /**
  * 
  */
 public static readonly DEFAULT_MODEL = "gpt-3.5-turbo";
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
  * @param {string} message
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
  */
 public async chatRequestWithRole(messages: MessagesHistory) {

  const completion = await this.instance.createChatCompletion({
   model: ChatGPT.DEFAULT_MODEL,
   messages: messages
  });

  const content = completion.data.choices[0].message?.content || "";

  return content;
 }
}