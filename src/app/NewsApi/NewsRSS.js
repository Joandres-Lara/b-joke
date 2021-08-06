import nodeFetch from "node-fetch";
import XMLParserAdapter from "../XMLParserAdapter";
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
 currentIndex = 0;
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
  if(this.news.length === 0 && this.needGetAgain()){
   this.lastObtain = new Date();
   this.news = await this.requestNews();
   this.validateNews();
  }
  return this.news;
 }
 /**
  *
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
 /**
  *
  * @returns {NewsItem}
  */
 async getNew(){
  await this.getNews();
  return this.news[this.currentIndex];
 }
 /**
  *
  */
 async next(){
  this.currentIndex++;
  return await this.getNew();
 }
}
