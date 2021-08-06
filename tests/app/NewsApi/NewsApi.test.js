import NewsRSSExpansion from "../../../src/app/NewsApi/NewsRSSExpansion";
import NewsItem from "../../../src/app/NewsApi/NewsItem";
import NewsApi from "../../../src/app/NewsApi/NewsApi";

jest.mock("../../../src/app/NewsApi/NewsRSSExpansion");
jest.mock("../../../src/app/Storages/DefaultStorage")

let
 instance_api,
 mockFindFirstNoticieNotSend;

beforeEach(() => {
 mockFindFirstNoticieNotSend = jest.fn();

 const FakeNoticieStorage = jest.fn(() => {
  return {
   insert: jest.fn(),
   findFirstNoticieNotSend: mockFindFirstNoticieNotSend
  }
 })

 instance_api = new NewsApi(null, null, { get: () => new FakeNoticieStorage() });
})

test("Should get news using rss expansion", async () => {
 const GUILD_ID = "09595234523452";
 const newsItem = new NewsItem({});
 const promisedNews = Promise.resolve([newsItem]);
 const promisedNewsItem = Promise.resolve(newsItem);

 NewsRSSExpansion.getNews.mockImplementation(() => (promisedNews));
 mockFindFirstNoticieNotSend.mockImplementation(() => promisedNewsItem);

 instance_api.getNewsItem(GUILD_ID);

 await Promise.all([promisedNews, promisedNewsItem]);

 expect(NewsRSSExpansion.getNews).toHaveBeenCalled();
 expect(mockFindFirstNoticieNotSend).toHaveBeenCalled();
});
