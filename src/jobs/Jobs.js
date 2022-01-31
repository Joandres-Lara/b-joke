import JokeApiJob from "./JokeApiJob";

export default class Jobs{

 static configure = (...args) => new Jobs(...args).init();

 jobs = [];

 constructor(...args){
  this.jobs.push(
   new JokeApiJob(...args),
  );
 }

 init = () => this.jobs.forEach((job) => job.init());
}
