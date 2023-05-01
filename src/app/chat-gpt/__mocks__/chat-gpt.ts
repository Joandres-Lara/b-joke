const mockedChatRequest = jest.fn();
const mockedChatRequestWithRole = jest.fn();

const mocked = jest.fn(() => {
 return {
  chatRequest: mockedChatRequest,
  chatRequestWithRole: mockedChatRequestWithRole
 }
});

mocked.chatRequestMock = mockedChatRequest
mocked.chatRequestWithRoleMock = mockedChatRequestWithRole;

export default mocked;