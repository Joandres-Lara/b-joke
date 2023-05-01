import ChatGPTContext from "@app/chat-gpt/chat-gpt-context";
import ChatGPT from "@app/chat-gpt/chat-gpt";
import BotInteractionUserSesion from "@app/bot-interaction-user-sesion/bot-interaction-user-sesion";
import Message from "@app/Messages/Message";

jest.mock("@app/chat-gpt/chat-gpt");

describe("class ChatGPTContext", () => {
 beforeEach(() => {
  ChatGPT.chatRequestWithRoleMock.mockReturnValue("Soy una IA, no tengo sentimientos");
 });

 test("should request message", async () => {
  const instance = new ChatGPTContext();
  const session = new BotInteractionUserSesion();

  const answer = await instance.request("Hola, ¿cómo estás?", session);

  expect(Array.from(session.getMessages())).toHaveLength(2);
  expect(answer).toBeInstanceOf(Message);
 });

 test("should request with last answers", async () => {
  const instance = new ChatGPTContext();
  const session = new BotInteractionUserSesion();
  await instance.request("Hola, ¿qué es lo más cool que puedes hacer?", session);
  await instance.request("¿Puedes hacer mi tarea?", session);
  await instance.request("Cuéntame un cuento", session);
  await instance.request("Ahora crea una canción para el cuento anterior", session);

  expect(Array.from(session.getMessages())).toHaveLength(8);
 });

 test("should delete first element if oversize message length", async () => {
  const instance = new ChatGPTContext();
  const session = new BotInteractionUserSesion();

  async function* requests() {
   let i = 0;
   while (i < 40) {
    yield await instance.request("Hola", session);
    i++;
   }
  }

  for await (const message of requests()) {
   expect(message).toBeInstanceOf(Message);
  }

  expect(Array.from(session.getMessages())).toHaveLength(30);
 });
});