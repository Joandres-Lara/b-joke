import NewsItem from "../NewsApi/NewsItem";
import Message from "./Message";

export default class NewsItemMessage extends Message {
 /**
  *
  * @var {NewsItem} noticie
  */
 noticie = {};
 /**
  *
  * @param {NewsItem} noticie
  */
 constructor(noticie) {
  super();
  this.noticie = noticie;
 }
 /**
  *
  * @returns {object}
  */
 toObject() {
  if(!(this.noticie instanceof NewsItem)){
   throw new Error("`noticie` should be instance a NewsItem");
  }

  return {
   content: "**El mundo estuvo muy movido desde la última vez, mira está noticia**",
   embed: {
    title: this.noticie.title,
    description: this.noticie.description,
    url: this.noticie.link,
    image: {
     url: this.noticie.image
    },
    author: {
     name: this.noticie.author,
    },
    color: 0x008000,
   },
  };
 }
}
