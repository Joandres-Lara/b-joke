import JokeApiScrapperChistesDotCom from "./JokeApiScrapperChistesDotCom";
import JokeApiJson from "./JokeApiJson";
import ChatGPT from "@app/chat-gpt/chat-gpt";

export enum LANGUAJES_TYPES {
 es,
 en
};

export enum IMPLEMENTATIONS_TYPES {
 chat_gpt,
 scrapper_chistes_dot_com,
 api_json
}

export default class JokeApi {
 /**
  * 
  * @type {JokeApiJson}
  */
 private joke_api_json: JokeApiJson;
 /**
  * 
  * @type {JokeApiScrapperChistesDotCom}
  */
 private joke_api_scrapper_chistes_dot_com: JokeApiScrapperChistesDotCom;
 /**
  * 
  * @type {ChatGPT}
  */
 private chat_gpt: ChatGPT;
 /**
  *
  * @param {*} options
  */
 constructor() {
  this.joke_api_json = new JokeApiJson();
  this.joke_api_scrapper_chistes_dot_com = new JokeApiScrapperChistesDotCom();
  this.chat_gpt = new ChatGPT();
 }
 /**
  *
  * @param {() => void} [cb]
  * @param {"es"|"en"} [api_languaje="es"]
  * @param {""} [api_type]
  * @param {"scrapper_chiste_dot_com"|""}
  * @returns {Promise<string>}
  */
 async getJoke(cb: (...args : unknown[]) => void, api_languaje: keyof typeof LANGUAJES_TYPES = "es", api_type: keyof typeof IMPLEMENTATIONS_TYPES = "chat_gpt") {

  let joke;

  if (api_type == "chat_gpt") {
   joke = await this.chat_gpt.chatRequest("Cuéntame un chiste");
  } else {
   switch (api_languaje) {
    case "en":
     joke = await this.joke_api_json.getJoke();
     break;
    case "es":
    default:
     joke = await this.joke_api_scrapper_chistes_dot_com.getJoke();
     break;
   }
  }


  if (cb) {
   return cb(joke);
  }

  return joke;
 }
}
