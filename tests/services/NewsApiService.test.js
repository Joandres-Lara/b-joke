import NewsApiService from "../../src/services/NewsApiService";
import DefaultStorage from "../../src/app/Storages/DefaultStorage";
import NewsItem from "../../src/app/NewsApi/NewsItem";
import NewsApi from "../../src/app/NewsApi";
import Eris from "eris";

import {
 NEWS_COMMAND,
 NEWS_COMMAND_DESCRIPTION
} from "../../src/services/NewsApiService/descriptor-command";

jest.mock("../../src/app/NewsApi/NewsApi");

beforeEach(() => {
 new NewsApiService(new Eris.CommandClient(), null, { get: () => new DefaultStorage() }).init();
})

test("Called `getNewsItems` when `args.length` is zero and send NewsItemMessage", async () => {

 expect(Eris.CommandClient.registerCommand).toHaveBeenCalledWith(
  NEWS_COMMAND,
  expect.any(Function),
  NEWS_COMMAND_DESCRIPTION
 );

 Eris.CommandClient.dispatchCommand("invalid-command");

 expect(Eris.CommandClient.createMessage).not.toHaveBeenCalled();

 const EXPECT_ID_CHANNEL = "98094805984059";
 const EXPECT_ID_GUILD = "99900009";

 const newsItem = new NewsItem({
  id: 0,
  link: "https://test.com/noticie",
  title: "Test noticie",
  image: "https://test.com/bg-img.jpg",
  author: "Joan Andrés Lara Mora",
  description: "Description test",
  content: "Content test",
  created_at: new Date(),
  rss: "test-rss"
 });

 const promised = Promise.resolve(newsItem);

 NewsApi.getNewsItem.mockImplementation(() => promised);

 Eris.CommandClient.dispatchCommand(
  NEWS_COMMAND,
  {
   channel: { id: EXPECT_ID_CHANNEL, guild: { id: EXPECT_ID_GUILD } }
  },
  []
 );

 expect(NewsApi.getNewsItem).toHaveBeenCalledWith(EXPECT_ID_GUILD);

 await promised;

 expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(
  EXPECT_ID_CHANNEL,
  expect.objectContaining({
   content: "**El mundo estuvo muy movido desde la última vez, mira está noticia**",
   embed: {
    author: {
     name: newsItem.author
    },
    color: 32768,
    description: newsItem.description,
    image: {
     url: newsItem.image
    },
    title: newsItem.title,
    url: newsItem.link
   }
  })
 );
});

test("Called `getNewsItems` when `args.length` is zero and send VoidNewsItemMessage", async () => {
 expect(Eris.CommandClient.registerCommand).toHaveBeenCalledWith(
  NEWS_COMMAND,
  expect.any(Function),
  NEWS_COMMAND_DESCRIPTION
 );

 Eris.CommandClient.dispatchCommand("invalid-command");

 expect(Eris.CommandClient.createMessage).not.toHaveBeenCalled();

 const EXPECT_ID_CHANNEL = "98094805984059";
 const EXPECT_ID_GUILD = "99900009";

 const newsItem = null;

 const promised = Promise.resolve(newsItem);

 NewsApi.getNewsItem.mockImplementation(() => promised);

 Eris.CommandClient.dispatchCommand(
  NEWS_COMMAND,
  {
   channel: { id: EXPECT_ID_CHANNEL, guild: { id: EXPECT_ID_GUILD } }
  },
  []
 );

 expect(NewsApi.getNewsItem).toHaveBeenCalledWith(EXPECT_ID_GUILD);

 await promised;

 expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(
  EXPECT_ID_CHANNEL,
  expect.objectContaining({
   content: "*Parece que ya estás al día con este tema, vuelve más tarde, o quizás nunca, o mañana, para más noticias.*"
  })
 );
})
