import nodeFetch from "node-fetch";
import XMLParserAdapter from "../xml-parser-adapter";
import NewsItem from "./NewsItem";

export default class NewsRSS{
 /**
  *
  * @var {Array<XMLNodeAdapter>}
  */
 news = [];
 /**
  *
  */
 lastObtain = new Date(0);
 /**
  *
  */
 constructor(){
  this.parserXML = new XMLParserAdapter();
  // TODO Cambiar esto por un FetchAdapter.
  this.fetcher = nodeFetch;
 }
 /**
  *
  * @returns {array}
  */
 requestNews(){
  return [];
 }
 /**
  *
  * @returns {Array<NewsItem>}
  */
 async getNews(){
  if(this.needGetAgain()){
   this.lastObtain = new Date();
   this.news = await this.requestNews();
   this.validateNews();
  }
  return this.news;
 }
 /**
  *
  * @returns {void}
  */
 validateNews(){
  if(!Array.isArray(this.news)){
   throw new Error("Noticies should be array");
  }
 }
 /**
  *
  * @returns {boolean}
  */
 needGetAgain(){
  // Si ha pasado media hora desde la última actualización, vuelva a obtener los datos.
  return (this.lastObtain.getTime() + 1800000) < new Date().getTime();
 }
}
