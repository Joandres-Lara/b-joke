import app from "./app";
import appExpress from "./http/app-express";
import bot from "./eris-bot/bot";

(async () => {
 try{
  await app(bot, appExpress);

  await bot.connect();

  const PORT = process.env.PORT || 3000;

  appExpress.listen(PORT, () => {
   console.log(`Application start on ${PORT}`);
  });
 } catch(e){
  console.error(e);
  process.exit(0);
 }
})();
