import MiddlewareAttemptRequestsBot from "../../../src/services/middlewares/MiddlewareAttemptRequestsBot";
import Eris from "eris";
import { advanceTo } from "jest-date-mock";

let instance_middleware;

beforeEach(() => {
 instance_middleware = new MiddlewareAttemptRequestsBot(new Eris.CommandClient());
})

test("Not called `next` if `hasMaxAttemptRequests` return false", () => {
 advanceTo(new Date(2020, 9, 31, 0, 0, 0, 0));

 const AUTHOR_ID = "8279857985";
 const CHANNEL_ID = "98787863018351"
 const COMMAND = "!test";
 const args = [];

 const mockMsg = {
  author: {
   id: AUTHOR_ID,
   username: "Joan Andrés Lara Mora"
  },
  channel: {
   id: CHANNEL_ID
  }
 };

 const mockNext = jest.fn();

 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);
 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);
 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);
 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);
 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);

 expect(mockNext).toHaveBeenCalledTimes(5);

 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);

 expect(Eris.CommandClient.createMessage).toHaveBeenCalled();
 expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(CHANNEL_ID, `Lo siento Joan Andrés Lara Mora demasiadas solicitudes para el comando: **!${COMMAND}** si sigues así, voy a explotar, así que mejor me protejo. Pero tu tienes que esperar 5 minutos.`);
});

test("Remove attempts if diff in minutes is greather than 5", () => {
 advanceTo(new Date(2020, 9, 31, 0, 0, 0, 0));

 const AUTHOR_ID = "8279857985";
 const CHANNEL_ID = "98787863018351"
 const COMMAND = "!test";
 const args = [];

 const mockMsg = {
  author: {
   id: AUTHOR_ID,
   username: "Joan Andrés Lara Mora"
  },
  channel: {
   id: CHANNEL_ID
  }
 };

 const mockNext = jest.fn();

 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);
 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);
 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);
 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);
 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);

 expect(mockNext).toHaveBeenCalledTimes(5);

 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);

 expect(Eris.CommandClient.createMessage).toHaveBeenCalled();
 expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(CHANNEL_ID, `Lo siento Joan Andrés Lara Mora demasiadas solicitudes para el comando: **!${COMMAND}** si sigues así, voy a explotar, así que mejor me protejo. Pero tu tienes que esperar 5 minutos.`);

 advanceTo(new Date(2020, 9, 31, 0, 6, 0, 0));

 instance_middleware.handle(mockNext, mockMsg, args, COMMAND);

 expect(mockNext).toHaveBeenCalledTimes(6);
});
