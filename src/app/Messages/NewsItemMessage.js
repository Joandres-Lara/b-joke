import Message from "./Message";

export default class NewsItemMessage extends Message {
 /**
  *
  */
 noticie = {};

 constructor(noticie) {
  super();
  this.noticie = noticie;
 }
 /**
  *
  * @returns {object}
  */
 toObject() {
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
