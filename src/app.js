import PostgresStorageManager from "./app/Storages/PostgresStorageManager";
import newVersionDetect from "./new-version-detect";
import Services from "./services";
import Jobs from "./jobs/Jobs";

const PRODUCTION = "production";
/**
	* Configura la aplicación después de haberse conectado con el BOT.
	*
	* @param {import("eris").CommandClient} bot
 * @param {Express.Application} appExpress
	*/
export default async function app(bot, appExpress){
 newVersionDetect(bot);
 const storage = new PostgresStorageManager();
 await storage.init();
 const env = process.env.NODE_ENV;

 let activeJobs = false;
 let activeServices = false;

 if(env === PRODUCTION || process.argv.includes("--all")){
  activeJobs = true;
  activeServices = true;
 } else {
  if(process.argv.includes("--jobs")) activeJobs = true;
  if(process.argv.includes("--services")) activeServices = true;
 }

 if(activeJobs) {
  console.log("Jobs active");
  await Jobs.configure(bot, appExpress, storage);
 } else {
  console.log("Job is desactive use --jobs by active");
 }

 if(activeServices) {
  console.log("Services active");
  await Services.configure(bot, appExpress, storage);
 } else {
  console.log("Services is desactive use --services by active")
 }
}
