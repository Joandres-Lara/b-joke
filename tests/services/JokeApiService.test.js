import JokeApiJobSchedule from "../../src/jobs/JokeApiJobSchedule";
import DefaultStorage from "../../src/app/Storages/DefaultStorage";
import JokeApiService from "../../src/services/JokeApiService";
import JokeApi from "../../src/app/JokeApi";
import Eris from "eris";

import {
 JOKE_COMMAND,
 JOKE_COMMAND_DESCRIPTION,
} from "../../src/services/JokeApiService/descriptor-commands";

jest.mock("../../src/app/JokeApi/JokeApi");
jest.mock("../../src/app/Storages/DefaultStorage")

beforeEach(() => {
 new JokeApiService(new Eris.CommandClient(), null, { get: () => new DefaultStorage()}).withoutMiddlewares().init();
})

test("Called `JokeApi().getJoke()` when `args.length` is 0", async () => {

 expect(Eris.CommandClient.registerCommand).toHaveBeenCalledWith(
  JOKE_COMMAND,
  expect.any(Function),
  JOKE_COMMAND_DESCRIPTION
 );

 Eris.CommandClient.dispatchCommand("invalid-command");

 expect(Eris.CommandClient.createMessage).not.toHaveBeenCalled();

 const EXPECT_JOKE = "Jajajajajajajaja";
 const EXPECT_ID_CHANNEL = 999999999;

 const promised = Promise.resolve(EXPECT_JOKE);

 JokeApi.getJoke.mockImplementation(() => promised);

 Eris.CommandClient.dispatchCommand(
  JOKE_COMMAND,
  {
   channel: { id: EXPECT_ID_CHANNEL },
  },
  []
 );

 expect(JokeApi.getJoke).toHaveBeenCalled();

 await promised;

 expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(
  EXPECT_ID_CHANNEL,
  expect.objectContaining({
   content: expect.stringContaining(EXPECT_JOKE),
  })
 );
});

test("Insert in storage job a `JokeApiJobSchedule` when args includes `subscribe`", async () => {

 expect(Eris.CommandClient.registerCommand).toHaveBeenCalledWith(
  JOKE_COMMAND,
  expect.any(Function),
  JOKE_COMMAND_DESCRIPTION
 );

 Eris.CommandClient.dispatchCommand("invalid-command");

 expect(Eris.CommandClient.createMessage).not.toHaveBeenCalled();

 const EXPECT_JOKE = "Jajajajajajajaja";
 const EXPECT_ID_CHANNEL = 999999999;

 const promised = Promise.resolve(EXPECT_JOKE);

 JokeApi.getJoke.mockImplementation(() => promised);

 Eris.CommandClient.dispatchCommand(
  JOKE_COMMAND,
  {
   channel: { id: EXPECT_ID_CHANNEL },
  },
  ["subscribe"]
 );

 expect(DefaultStorage.insertIfNotFind).toHaveBeenCalled();
 expect(DefaultStorage.insertIfNotFind).toHaveBeenCalledWith(
  expect.any(JokeApiJobSchedule)
 );

 expect(Eris.CommandClient.createMessage).toHaveBeenCalledWith(
  EXPECT_ID_CHANNEL,
  "Te has suscrito, para que te envíemos, chiste diarios."
 );
});
