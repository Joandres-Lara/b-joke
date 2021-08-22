import nodeFetch from "node-fetch";

export default class JokeApiJson {

 static URL_API = "https://v2.jokeapi.dev/joke/Any?type=single";

 constructor(options){
  this.options = options;
 }
 /**
  *
  * @param {function<void>} cb
  * @returns {Promise<string>}
  */
 getJoke = async (cb) => {
  const response = await nodeFetch(JokeApi.URL_API);
  return (await response.json()).joke;
 }
}
