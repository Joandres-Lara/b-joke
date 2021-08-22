const mockGetNewsItem = jest.fn();

const mocked = jest.fn(() => ({
 getNewsItem: mockGetNewsItem
}));

mocked.getNewsItem = mockGetNewsItem;

module.exports = mocked;
