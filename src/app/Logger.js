import chalk from "chalk";
import { inspect } from "util";

export default class Logger {
 constructor() {
  this.isActivated = !process.argv.includes("--desactive-log");
 }
 /**
  * 
  * @param {*} obj 
  * @returns 
  */
 object(obj) {
  return inspect(obj, { colors: true, depth: null });
 }
 /**
  *
  * @param {...string} msgs
  */
 log(...msgs) {
  this.isActivated && console.log(...msgs.map((msg) => chalk.red(msg)));
 }
 /**
  * 
  * @param  {...string} msgs 
  */
 warn(...msgs) {
  this.isActivated && console.log(...msgs.map(msg => chalk.yellow(msg)));
 }
 /**
  *
  * @param  {...string} msgs
  */
 info(...msgs) {
  this.isActivated && console.log(...msgs.map((msg) => chalk.green(msg)));
 }
 /**
  *
  * @param  {...any} msgs
  */
 default(...msgs) {
  this.isActivated && console.log(...msgs);
 }
}
