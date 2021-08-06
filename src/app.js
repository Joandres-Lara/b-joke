import PostgresStorageManager from "./app/Storages/PostgresStorageManager";
import Services from "./services";
import Jobs from "./jobs/Jobs";

const PRODUCTION = "production";
/**
	* Configura la aplicación después de haberse conectado con el BOT.
	*
	* @param {*} bot
	*/
export default async function app(bot, appExpress){
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
  Jobs.configure(bot, appExpress, storage);
 }

 if(activeServices) {
  console.log("Services active");
  Services.configure(bot, appExpress, storage);
 }
}
