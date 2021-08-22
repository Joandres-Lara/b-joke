const mocked = jest.fn(() => ({
 getNewsItem: mockGetNewsItem
}));
const mockGetNewsItem = jest.fn();

mocked.getNewsItem = mockGetNewsItem;

module.exports = mocked;
