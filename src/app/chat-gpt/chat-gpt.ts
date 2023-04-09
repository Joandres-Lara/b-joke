import { Configuration, OpenAIApi } from "openai";

export default class ChatGPT {
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
   model: "gpt-3.5-turbo",
   messages: [{ role: "user", content: message }],
  });

  return completion.data.choices[0].message?.content || "";
 }
}