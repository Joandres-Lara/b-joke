import ChatGPT from "@app/chat-gpt/chat-gpt";
import configureApp from "@util-tests/configure-app";
import { OpenAIApi } from "openai";

jest.mock("openai");


describe("class Chat GPT", () => {

 beforeEach(() => {
  configureApp();
 })

 test("should not rejected if throw error", async () => {
  OpenAIApi.mockCreateChatCompletion.mockRejectedValueOnce(new Error("402 code"))

  const instance = new ChatGPT();
  expect(instance.chatRequestWithRole([
   {
    role: "user",
    content: "Hello"
   }
  ])).not.toReject();
 });
});