import PostgresStorageManager from "./app/Storages/PostgresStorageManager";
import newVersionDetect from "./new-version-detect";
import Services from "./services";
import Resolver from "@app/resolver";
import Jobs from "./jobs/Jobs";
import ChatGPTContext from "@app/chat-gpt/chat-gpt-context";
import Logger from "@app/Logger";
import BotInteractionUserSesion from "@app/bot-interaction-user-sesion/bot-interaction-user-sesion";

const PRODUCTION = "production";
/**
 * Configura la aplicación después de haberse conectado con el BOT.
 *
 * @param {import("eris").CommandClient} bot
 * @param {Express.Application} appExpress
 */
export default async function app(bot, appExpress) {
 Resolver.set("bot", bot);
 Resolver.set("http", appExpress);
 Resolver.set("context", new ChatGPTContext());
 Resolver.set("logger", new Logger());
 Resolver.set("bot_session", new BotInteractionUserSesion());

 newVersionDetect(bot);

 const storage = new PostgresStorageManager();
 Resolver.set("storage", storage);

 await storage.init();
 const env = process.env.NODE_ENV;

 let activeJobs = false;
 let activeServices = false;

 if (env === PRODUCTION || process.argv.includes("--all")) {
  activeJobs = true;
  activeServices = true;
 } else {
  if (process.argv.includes("--jobs")) activeJobs = true;
  if (process.argv.includes("--services")) activeServices = true;
 }

 if (activeJobs) {
  console.log("Jobs active");
  const jobs = await Jobs.configure(bot, appExpress, storage);
  Resolver.set("jobs", jobs);
 } else {
  console.log("Job is desactive use --jobs by active");
 }

 if (activeServices) {
  console.log("Services active");
  const services = await Services.configure(bot, appExpress, storage);
  Resolver.set("services", services);
 } else {
  console.log("Services is desactive use --services by active");
 }
}
