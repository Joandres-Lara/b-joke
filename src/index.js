import bot from "./eris-bot/bot";
import app from "./app";

bot.connect();

app(bot);
