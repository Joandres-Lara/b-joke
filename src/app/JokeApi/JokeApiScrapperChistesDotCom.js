import nodeFetch from "node-fetch";
import { Iconv } from "iconv";
import { JSDOM } from "jsdom";

export default class JokeApiScrapperChistesDotCom {
 /**
  *
  * @returns {string}
  */
 async getJoke() {
  const iconv = new Iconv("iso-8859-1", "utf-8");
  const response = await nodeFetch("http://www.chistes.com/ChisteAlAzar.asp?n=3");
  const buff = await response.arrayBuffer();
  const text = iconv.convert(Buffer.from(buff)).toString();
  const dom = new JSDOM(text);
  return dom.window.document.querySelector(".chiste").textContent;
 }
}
