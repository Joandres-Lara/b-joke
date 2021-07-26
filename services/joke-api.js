const JokeApi = require("./JokeApi");

module.exports = {
 getJoke: (cb, options = {}) => {
  return new JokeApi(options).getJoke(cb);
 }
}
