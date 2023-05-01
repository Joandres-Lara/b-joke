import MentionService from "@services/mention-service";
import configureApp from "@util-tests/configure-app";
import Resolver from "@app/resolver";

describe("Service MentionService", () => {
 let mentionService: MentionService;

 beforeEach(() => {
  configureApp();
  mentionService = new MentionService();
  mentionService.init();
 });

 test("should not called if has't mention", () => {
  const bot = Resolver.get("bot");
  const mockedRequest = jest.fn(async (question, session) => {

  });

  Resolver.set("context", {
   request: mockedRequest,
  });

  bot?.dispatchEvent("messageCreate", { content: "Hello world", mentions: [] })

  expect(mockedRequest).not.toHaveBeenCalled();
 });

 test("should save last message interaction", () => {
  const bot = Resolver.get("bot");
  const mockedRequest = jest.fn(async (question, session) => {

  });

  Resolver.set("context", {
   request: mockedRequest,
  });

  const mockPushBotMessage = jest.fn();
  const mockPushUserMessage = jest.fn();
  // @ts-ignore
  Resolver.set("bot_session", {
   pushBotMessage: mockPushBotMessage,
   pushUserMessage: mockPushUserMessage,
   getMessages: () => new Set(),
   messages: new Set()
  });

  bot?.dispatchEvent("messageCreate", {
   content: "Hello world",
   mentions: [{
    id: process.env.BOT_GUID
   }],
   channel: {
    id: "89"
   }
  })

  expect(mockedRequest).toHaveBeenCalled();
 });
});