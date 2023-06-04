const mockInsertIfNotFind = jest.fn();
const mockFind = jest.fn();
const mockInsert = jest.fn();
const mockOnCreate = jest.fn();

const mocked = jest.fn(() => ({
 insertIfNotFind: mockInsertIfNotFind,
 find: mockFind,
 insert: mockInsert,
 onCreate: mockOnCreate,
}));

mocked.insertIfNotFind = mockInsertIfNotFind;
mocked.find = mockFind;
mocked.insert = mockInsert;
mocked.onCreate = mockOnCreate;

module.exports = mocked;
