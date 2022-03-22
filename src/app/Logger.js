import chalk from "chalk";

export default class Logger {
 /**
  *
  * @param {...string} msgs
  */
 log(...msgs) {
  console.log(...msgs.map((msg) => chalk.red(msg)));
 }
 /**
  *
  * @param  {...string} msgs
  */
 info(...msgs){
  console.log(...msgs.map((msg) => chalk.green(msg)));
 }
}
