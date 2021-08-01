import nodeFetch from "node-fetch";

export default class JokeApi {

 static URL_API = "https://v2.jokeapi.dev/joke/Any?type=single";

 constructor(options){
  this.options = options;
 }

 getJoke = (cb) => {
  const request = nodeFetch(JokeApi.URL_API);
  return request.then(response => {
   return response.json()
  })
  .then((result) => {
   const { joke } = result;
   if(typeof cb === "function"){
    cb(joke);
   }
  })
  .catch(console.error)
 }
}
