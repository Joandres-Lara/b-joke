import JokeApiScrapperChistesDotCom from "./JokeApiScrapperChistesDotCom";
import JokeApiJson from "./JokeApiJson";

export default class JokeApi {
 /**
  *
  * @param {*} options
  */
 constructor() {
  this.joke_api_json = new JokeApiJson();
  this.joke_api_scrapper_chistes_dot_com = new JokeApiScrapperChistesDotCom();
 }
 /**
  *
  * @param {function<void>} cb
  * @returns {Promise<string>}
  */
 getJoke = async (cb, api_type = "es") => {
  let joke;
  switch (api_type) {
   case "en":
    joke = await this.joke_api_json.getJoke();
    break;
   case "es":
   default:
    joke = await this.joke_api_scrapper_chistes_dot_com.getJoke();
    break;
  }

  if(typeof cb === "function"){
   return cb(joke);
  }
  return joke;
 }
}
