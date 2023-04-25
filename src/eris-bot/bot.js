import Eris from "eris";

const botOptions = {
 restMode: true,
};

const commandOptions = {
 description: "Un bot hecho para uso de nuestro servidor personal",
 owner: "@creicyguempleys",
 prefix: "!",
};

const bot = new Eris.CommandClient(
 process.env.TOKEN_BOT,
 botOptions,
 commandOptions
);

bot.on("error", (error) => {
 console.log(error);
});

bot.on("ready", () => {
 console.log("Bot ready");
});

export default bot;
