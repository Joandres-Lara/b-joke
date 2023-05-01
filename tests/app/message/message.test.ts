import Message from "@app/Messages/Message";
import { advanceTo } from "jest-date-mock"

describe("class describe", () => {

 beforeEach(() => {
  advanceTo(new Date())
 })

 test("should return message as a key `content`", () => {
  const message = new Message("Hello world");
  expect(message.toObject()).toEqual(
   expect.objectContaining({
    content: "Hello world"
   })
  );
 });

 test("should return text in string", () => {
  const message = new Message("foo is a bar");
  expect("" + message).toEqual("foo is a bar");
 });

 test("should created message is a date and now", () => {
  const message = new Message("foo");
  expect(message.created_at).toEqual(new Date());
 });
});