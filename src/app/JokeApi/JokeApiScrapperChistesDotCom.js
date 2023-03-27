import nodeFetch from "node-fetch";
import { Iconv } from "iconv";
import { JSDOM } from "jsdom";

export default class JokeApiScrapperChistesDotCom {
 /** @readonly */
 static URL_CHISTE_AL_AZAR = "http://chistes.com/ChisteAlAzarf4b3.html?n=3";
 /**
  *
  * @returns {string}
  */
 async getJoke() {
  const iconv = new Iconv("iso-8859-1", "utf-8");
  const response = await nodeFetch(JokeApiScrapperChistesDotCom.URL_CHISTE_AL_AZAR);
  const buff = await response.arrayBuffer();
  const text = iconv.convert(Buffer.from(buff)).toString();
  const dom = new JSDOM(text);
  return dom.window.document.querySelector(".chiste").textContent;
 }
}
