const nodeFetch = require("node-fetch");

class JokeApi {

 static URL_API = "https://v2.jokeapi.dev/joke/Any?type=single";

 constructor(options){
  this.options = options;
 }

 getJoke = (cb) => {
  const request = nodeFetch.default(JokeApi.URL_API);
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

module.exports = JokeApi;
