import appExpress from "./http/app-express";
import bot from "./eris-bot/bot";
import app from "./app";

app(bot, appExpress)

bot.connect();

const PORT = process.env.PORT || 3000;

appExpress.listen(PORT, () => {
 console.log(`Application start on ${PORT}`);
});
