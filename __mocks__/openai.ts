export const Configuration = jest.fn();
const mockCreateChatCompletion = jest.fn();
export const OpenAIApi = jest.fn(() => ({
 createChatCompletion: mockCreateChatCompletion
}));

OpenAIApi.mockCreateChatCompletion = mockCreateChatCompletion;