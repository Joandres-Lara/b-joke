import NewsItem from "../../../src/app/NewsApi/NewsItem";

test.each([
 ["id"],
 ["title"],
 ["link"],
 ["image"],
 ["author"],
 ["content"],
 ["created_at"],
 ["rss"]
])("Throw error when get property: %s in NewsItem required", (property) => {
 expect(() => {
  new NewsItem({})[property];
 }).toThrowError(`Property \`${property}\` is required`);
});

test.each([
 ["id"],
 ["title"],
 ["link"],
 ["image"],
 ["author"],
 ["description"],
 ["content"],
 ["created_at"],
 ["rss"]
])("Get property: %s in NewsItem", (property) => {
 const wrappedObject = {
  title: "Test noticie",
  id: 0,
  link: "https://example.com",
  image: "https://example.com/jpg.jpg",
  author: "Joan Andrés Lara Mora",
  description: "Test description",
  content: "Test content",
  created_at: new Date(),
  rss: "test-rss"
 };
 const instanceNewsItem = new NewsItem(wrappedObject);

 expect(instanceNewsItem[property]).toEqual(wrappedObject[property]);
});
