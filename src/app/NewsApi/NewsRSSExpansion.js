import NewsRSS from "./NewsRSS";
import NewsItem from "./NewsItem";

export default class NewsRSSExpansion extends NewsRSS {
 /**
  *
  * @var {string} type
  */
 type = "news-expansion-v0";
 /**
  *
  */
 constructor() {
  super();
 }
 /**
  *
  * @returns {Promise<NewsItem>}
  */
 async requestNews() {
  const response = await this.fetcher("https://expansion.mx/rss/tecnologia", {
   headers: {
    "Content-Type": "application/xml; charset=utf-8",
   },
  });

  const xml = await response.text();
  const xmlParsed = await this.parserXML.parse(xml);
  const news = xmlParsed.element("rss").element("channel").element("item");

  return news.map((newsItem) => {
   const id = newsItem.get("guid", true).value();
   const link = newsItem.get("link");
   const title = newsItem.get("title");
   const image = newsItem.get("enclosure", true).attrs();
   const author = newsItem.get("dc:creator");
   const content = newsItem.get("description");
   const created_at = new Date(Date.parse(newsItem.get("pubDate")));
   const description = newsItem.get("description");

   return new NewsItem(
    {
     id,
     link,
     image: image.url,
     author,
     title,
     content,
     description,
     created_at,
     rss: this.type,
    },
    "Expansión"
   );
  });
 }
}
