const mockGetNews = jest.fn(() => ([]));

const mocked = jest.fn(() => {
 return {
  getNews: mockGetNews
 }
});

mocked.getNews = mockGetNews;

module.exports = mocked;
