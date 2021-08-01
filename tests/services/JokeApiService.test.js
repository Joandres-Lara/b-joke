import JokeApiService from "../../src/services/JokeApiService";
import JokeApi from "../../src/app/JokeApi";
import Eris from "eris";

import { MESSAGE_CREATE } from "../../src/app/constants";

jest.mock("../../src/app/JokeApi/JokeApi");

test("Called `createMessage` on trigger `messageCreate`", () => {

	new JokeApiService(new Eris()).init();

	expect(Eris.on).toHaveBeenCalledWith(MESSAGE_CREATE, expect.any(Function));

	Eris.dispatch(MESSAGE_CREATE, { content: "invalid-call" });

	expect(Eris.createMessage).not.toHaveBeenCalled();

	const EXPECT_JOKE = "Jajajajajajajaja";
 const EXPECT_ID_CHANNEL = 999999999;

	Eris.dispatch(MESSAGE_CREATE, { content: "!joke", channel: { id: EXPECT_ID_CHANNEL } });

	expect(JokeApi).toHaveBeenCalled();
	expect(JokeApi.getJoke).toHaveBeenCalled();


	JokeApi.callGetJoke(EXPECT_JOKE);

	expect(Eris.createMessage).toHaveBeenCalledWith(EXPECT_ID_CHANNEL, EXPECT_JOKE);
});
