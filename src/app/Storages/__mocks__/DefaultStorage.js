const mockInsertIfNotFind = jest.fn();

const mocked = jest.fn(() => ({
 insertIfNotFind: mockInsertIfNotFind
}));

mocked.insertIfNotFind = mockInsertIfNotFind;

module.exports = mocked;
